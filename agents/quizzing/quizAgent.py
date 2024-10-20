from uagents import Agent, Bureau, Context, Model
from uagents.setup import fund_agent_if_low
from typing import Any, Dict
import os
from groq import Groq

client = Groq(
    api_key = os.environ.get("GROQ_API_KEY")
    )

# class Message(Model):
#     message: str

class quizRequest(Model):
    notes: str

class quizResponse(Model):
    question: str
    answer: str
    incorrectAns: list

quizAgent = Agent(name="QuizAgent",
                  seed="quizphrase",
                  port=8000,
                  endpoint="127.0.0.1:8000"
                  )

fund_agent_if_low(quizAgent.wallet.address())

@quizAgent.on_message(model=quizResponse)
async def contentCheckAgent_message_handler(ctx: Context, sender: str, msg: quizResponse):
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": f"Generate a quiz using the following{msg}\n Notes: \n ",
        }
    ],
    model="llama3-8b-8192",
    )
    print(msg)
    ctx.logger.info(f"Received response from {sender}:")
    ctx.logger.info(f"question: {msg.question}, answer: {msg.answer},inc answer: {msg.incorrectAns}")


 

if __name__ == "__main__":
    QuizAgent.run()