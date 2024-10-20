from uagents import Agent, Bureau, Context, Model
from uagents.setup import fund_agent_if_low
from typing import Any, Dict
import os
from groq import Groq
import re
import json

CONTENT_CHECKER_ADDRESS = "agent1q0yv9g9ry0gz3dqvxyvgpqrywd43v6285e9m8yqd98m3m86lxht4xpk7lv6"

class ShortAnswerMessage(Model):
    message: str

class TrueOrFalseMessage(Model):
    message: str

def output_parser(llm_output):
    json_string = re.search(r'\{.*\}', llm_output, re.DOTALL).group(0)
    quiz_data = json.loads(json_string)
    create_txt(quiz_data)
    return quiz_data

def create_txt(quiz_data):
    # File path to save the quiz in a .txt file
    file_path = 'quiz.txt'

    # Writing to the .txt file
    with open(file_path, 'w') as file:
        # Writing all questions with numbering
        file.write("Questions:\n")
        for idx, question in enumerate(quiz_data['questions'], 1):
            file.write(f"{idx}. {question}\n")
        
        # Adding a separator between questions and answers
        file.write("\nAnswers:\n")
        
        # Writing all answers with numbering
        for idx, answer in enumerate(quiz_data['answers'], 1):
            file.write(f"{idx}. {answer}\n")

quiz_generator = Agent(
    name="quizGenerator",
    seed="quizGenerator",
    port=8004,
    endpoint="http://127.0.0.1:8004/submit"
)

fund_agent_if_low(quiz_generator.wallet.address())

client = Groq(
    api_key = os.environ.get("GROQ_API_KEY")
)

def quiz_generator_prompt(short_answer, true_false):
    return f"""
    Quiz 1: {short_answer}

    Quiz 2: {true_false}
    You have been given two JSONs: one containing a true/false quiz and another containing a short answer quiz. Combine the questions from both quizzes into a new quiz consisting of 6 to 12 questions. Ensure that the questions do not overlap in content. Output only the following JSON format:

    {{
    "questions": [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5",
        "Question 6"
    ],
    "answers": [
        "Answer 1",
        "Answer 2",
        "Answer 3",
        "Answer 4",
        "Answer 5",
        "Answer 6"
    ]
    }}
    Use questions from BOTH quizzes while ensuring there is no duplication or overlap in the subject matter. Use at least 3 questions of each type. NEVER include any additional comments or explanation in the output. Return ONLY the JSON format above.
    """

@quiz_generator.on_event("startup")
async def start(ctx: Context):
    ctx.logger.info(f"generator address is {quiz_generator.address}")
    quiz_generator.responses = []

@quiz_generator.on_message(model=TrueOrFalseMessage)
async def message_handler(ctx: Context, sender: str, msg: TrueOrFalseMessage):
    quiz_generator.responses.append(msg.message)
    ctx.logger.info(f"Quiz Generator: Received True/False Quiz from {sender}")

    if len(quiz_generator.responses) == 2:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": quiz_generator_prompt(quiz_generator.responses[0], quiz_generator.responses[1]),
                }
            ],
            model="llama3-8b-8192",
        )
        ctx.logger.info(f"Final Quiz: {output_parser(chat_completion.choices[0].message.content)}")

@quiz_generator.on_message(model=ShortAnswerMessage)
async def message_handler(ctx: Context, sender: str, msg: ShortAnswerMessage):
    quiz_generator.responses.append(msg.message)
    ctx.logger.info(f"Quiz Generator: Received Short Answer Quiz from {sender}")

    if len(quiz_generator.responses) == 2:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": quiz_generator(quiz_generator.responses[0], quiz_generator.responses[1]),
                }
            ],
            model="llama3-8b-8192",
        )
        ctx.logger.info(f"Final Quiz: {output_parser(chat_completion.choices[0].message.content)}")
    # await ctx.send(CONTENT_CHECKER_ADDRESS, QuizMessage(message=chat_completion.choices[0].message.content))


if __name__ == "__main__":
    quiz_generator.run()