import os
from uagents import Agent, Bureau, Context, Model
from uagents.setup import fund_agent_if_low
from groq import Groq

CONTENT_CHECKER_ADDRESS = "agent1q0yv9g9ry0gz3dqvxyvgpqrywd43v6285e9m8yqd98m3m86lxht4xpk7lv6"
SHORT_ANSWER_ADDRESS = "agent1qwp6lz6hqky6p9ma29tnh497gvdv4tvefr9pf2422snjw9ejffmy5h9ap58"
TRUE_FALSE_ADDRESS = "agent1qggc7ulytwuy8kl30y3a6e4a83cxp0zy8x0462jpk479dr33wxjxsegd0dy"

class SummaryMessage(Model):
    message: str
    filename: str

class CheckerMessage(Model):
    message: str

class Request(Model):
    filename: str

class EmptyMessage(Model):
    pass

content_cleaner = Agent(
    name="contentCleaner",
    port=8001,
    seed="contentCleaner",
    endpoint=["http://127.0.0.1:8001"],
)

fund_agent_if_low(content_cleaner.wallet.address())

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

def read_notes(filename):
    with open(filename, 'r') as file:
        return file.read()

def initial_prompt(notes):
    return f"""
    You are given a set of notes written by a student on a specific topic. Your task is to create a detailed and streamlined outline that logically follows the flow of the notes while retaining all key points and important information. The outline should highlight the main ideas and subpoints, ensuring clarity and organization. Do not add any new information or interpretations—just reorganize the content in a coherent and easy-to-understand format.

    When creating the outline, follow these guidelines:
    - Identify the major themes or sections in the notes.
    - Break down each major theme into subpoints, maintaining the logical progression from general to specific details.
    - Ensure that no key information is omitted, even if it appears less prominent in the original notes.
    - Use clear and concise language for each point in the outline, avoiding long sentences or complex phrasing.

    Here is the student's original input: {notes}

    Now, please generate the corresponding outline based on the provided notes.
    """

def feedback_system_notes(notes, summary, feedback):
    return f"""
    You are an AI assistant responsible for creating an integrated summary by combining the original notes, the summarized notes, and feedback from the content checker. Your goal is to:

    Incorporate missing information: Ensure that all critical details from the original notes are included in the integrated summary.
    Preserve logical flow: The integrated summary should follow a logical sequence of ideas, maintaining the coherence of the original material.
    Enhance clarity: Improve the summary's readability while preserving the key ideas.
    Instructions:
    - Review the original notes.
    - Review the summarized notes.
    - Review the feedback from the content checker, which highlights any missing information or logical inconsistencies.
    - Create a new, integrated summary that corrects any issues, incorporates missing details (but never going outside the scope of the notes), and ensures a logically consistent flow.
    
    Here are the original notes: {notes}

    Here is the summary: {summary}
    
    Here is the feedback from the content checker: {feedback}

    Please create an integrated summary based on the information above, ensuring all key points are included and the summary is clear and logically consistent. Provide only the response without any additional explanation or commentary.
    """

@content_cleaner.on_event("startup")
async def start(ctx: Context):
    ctx.logger.info(f"content_cleaner address is {content_cleaner.address}")
    

@content_cleaner.on_rest_post("/rest/post", Request, EmptyMessage)
async def handle_post(ctx: Context, req: Request) -> EmptyMessage:
    ctx.logger.info(f"Received POST request with filename {req.filename}")
    content_cleaner.notes = read_notes(req.filename)
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": initial_prompt(content_cleaner.notes),
            },
        ],
        model="llama3-8b-8192",
    )
    content_cleaner.summary = chat_completion.choices[0].message.content
    ctx.logger.info(f"Content Cleaner Initial Summary: {content_cleaner.summary}")
    await ctx.send(CONTENT_CHECKER_ADDRESS, SummaryMessage(message=content_cleaner.summary, filename=req.filename))
    return EmptyMessage()

@content_cleaner.on_message(model=CheckerMessage)
async def message_handler(ctx: Context, sender: str, msg: CheckerMessage):
    ctx.logger.info(f"Content Cleaner: Received message from {sender}")
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": feedback_system_notes(content_cleaner.notes, content_cleaner.summary, msg.message),
            }
        ],
        model="llama3-8b-8192",
    )
    content_cleaner.summary = chat_completion.choices[0].message.content
    ctx.logger.info(f"Revised Summary: {content_cleaner.summary}")
    await ctx.send(SHORT_ANSWER_ADDRESS, SummaryMessage(message=content_cleaner.summary, filename=""))
    await ctx.send(TRUE_FALSE_ADDRESS, SummaryMessage(message=content_cleaner.summary, filename=""))

if __name__ == "__main__":
    content_cleaner.run()

