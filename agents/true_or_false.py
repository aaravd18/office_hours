from uagents import Agent, Bureau, Context, Model
from uagents.setup import fund_agent_if_low
from typing import Any, Dict
import os
from groq import Groq

CONTENT_CHECKER_ADDRESS = "agent1q0yv9g9ry0gz3dqvxyvgpqrywd43v6285e9m8yqd98m3m86lxht4xpk7lv6"
GENERATOR_ADDRESS = "agent1qvnvmnxd8ed5gkgpr690jcq729e57n0tdm523qp3fa7nl8pt8f9kqh3pw3e"

class SummaryMessage(Model):
    message: str

class TrueOrFalseMessage(Model):
    message: str

true_or_false = Agent(
    name="trueOrFalseAagent",
    seed="trueorfalse",
    port=8003,
    endpoint="http://127.0.0.1:8003/submit"
)

fund_agent_if_low(true_or_false.wallet.address())

client = Groq(
    api_key = os.environ.get("GROQ_API_KEY")
)

def summary_to_tf_prompt(notes):
    return f"""
    You are given the following summarized notes:

    {notes}

    Based on these notes, generate a quiz consisting of 5 to 10 true or false questions. Each question should be answerable by reading the notes. Output only the following JSON format:
    {{
    "questions": [
        "Question 1",
        "Question 2",
        "Question 3",
        "Question 4",
        "Question 5"
    ],
    "answers": [
        "True",
        "False",
        "True",
        "True",
        "False"
    ]
    }}
    Ensure that the questions are clear and the answers are directly linked to the content of the notes. Do not include any additional text or explanation in the output—only the JSON format above.
    """

@true_or_false.on_event("startup")
async def start(ctx: Context):
    ctx.logger.info(f"trueOrFalse address is {true_or_false.address}")

@true_or_false.on_message(model=SummaryMessage)
async def message_handler(ctx: Context, sender: str, msg: SummaryMessage):
    ctx.logger.info(f"True or False: Received message from {sender}")

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": summary_to_tf_prompt(msg.message),
            }
        ],
        model="llama3-8b-8192",
    )
    ctx.logger.info(f"True/False Output: {chat_completion.choices[0].message.content}")
    await ctx.send(GENERATOR_ADDRESS, TrueOrFalseMessage(message=chat_completion.choices[0].message.content))


if __name__ == "__main__":
    true_or_false.run()