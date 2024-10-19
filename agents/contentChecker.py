import os
from uagents import Agent, Bureau, Context, Model
from uagents.setup import fund_agent_if_low
from groq import Groq
 
class SummaryMessage(Model):
    message: str

class CheckerMessage(Model):
    message: str

agent = Agent(
    name="contentChecker",
    port=8000,
    seed="contentChecker",
    endpoint=["http://127.0.0.1:8000/submit"],
)

fund_agent_if_low(agent.wallet.address())

CONTENT_CLEANER_ADDRESS = "agent1qfhzjrxxajfymejgvke9se5j0pp6f59g88f3gp68xp77tzgdklz6gwdwxt0"

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

with open('economics.txt', 'r') as file:
    notes = file.read()

def content_check_prompt(summarized_notes):
    return f"""
    You are an AI assistant responsible for verifying the accuracy and completeness of a summary by comparing it with the original notes. Your job is to ensure that:

    No information is lost: The summary must include all critical details and key points from the original notes.
    Logical coherence: The summary should follow the logical structure of the original notes, maintaining the proper flow of information.
    Accuracy: The information in the summary must be factually correct and aligned with the original notes without introducing errors or misinterpretations.
    Instructions:
    - First, read the original notes carefully.
    - Then, review the summarized notes.
    - Highlight any areas where information is missing or where the logical flow has been broken. If everything is accurate and logical, confirm that no information is lost.

    Here are the original notes: {notes}

    Here is the summary: {summarized_notes}

    Please compare the two and provide concise feedback on any missing information or errors in the summary. If there are no issues (80% threshold) output "False". Else, write your feedback.
    """

@agent.on_event("startup")
async def start(ctx: Context):
    ctx.logger.info(f"contentChecker address is {agent.address}")

@agent.on_message(model=SummaryMessage)
async def message_handler(ctx: Context, sender: str, msg: SummaryMessage):
    ctx.logger.info(f"Content Checker: Received message from {sender}")

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": content_check_prompt(msg.message),
            }
        ],
        model="llama3-8b-8192",
    )
    ctx.logger.info(f"Content Checker Output: {chat_completion.choices[0].message.content}")
    await ctx.send(sender, CheckerMessage(message=chat_completion.choices[0].message.content))

if __name__ == "__main__":
    agent.run()