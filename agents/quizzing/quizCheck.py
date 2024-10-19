from uagents import Agent, Bureau, Context, Model
from uagents.setup import fund_agent_if_low
import os
from groq import Groq

client = Groq(
    api_key = os.environ.get("GROQ_API_KEY")
    )



class checkRequest(Model):
    quiz: str
    answers: str
    notes: str

class QuizResponse(Model):
    check: bool

quizCheckAgent = Agent(name="QuizCheckAgent",
                       seed="quizphrase",
                       port=8001,
                       endpoint="127.0.0.1:8001"
                       )

fund_agent_if_low(quizCheckAgent.wallet.address())

@quizCheckAgent.on_rest_get("/0.0.0.0:8002", QuizResponse)
async def handle_get(ctx: Context) -> dict[str, any]:
    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": "Check if the provided quiz can be answered using the original notes:\nQuiz: \n{msg}\n Notes: \n ",
        }
    ],
    model="llama3-8b-8192",
    )
    return {
        chat_completion.choices[0].message.content
    }


# @quizCheckAgent.on_message(checkRequest)
# async def quizCheckAgent_message_handler(ctx: Context, sender: str, msg: Message):
#     chat_completion = client.chat.completions.create(
#         messages=[
#             {
#                 "role": "user",
#                 "content": "Check if the provided quiz can be answered using the original notes:\nQuiz: \n{msg}\n Notes: \n ",
#             }
#         ],
#         model="llama3-8b-8192",
#     )
#     print(chat_completion.choices[0].message.content)
#     ctx.logger.info(f"Received message from {sender}: {msg.message}")
#     ctx.logger.info(f"Returning generated Quiz from Groq")
 

 


if __name__ == "__main__":
    quizCheckAgent.run()