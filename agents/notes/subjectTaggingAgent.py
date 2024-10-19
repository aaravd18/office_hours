from uagents import Agent, Bureau, Context, Model
import os
from groq import Groq

client = Groq(
    api_key = os.environ.get("GROQ_API_KEY")
    )

# class Message(Model):
#     message: str

class QuizRequest(Model):
    notes: str

class subjectResponse(Model):
    college: str
    subject: str


subjectTaggingAgent = Agent(name="subjectTaggingAgent",
                            seed="subjectphrase",
                            port=8003,
                            endpoint="127.0.0.1:8003")
print(subjectTaggingAgent.address)

@subjectTaggingAgent.on_message(model=subjectResponse)
async def subjectTaggingAgent_message_handler(ctx: Context, sender: str, msg: subjectResponse):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": "Determine which academic college the provided notes fall under. Ensure that these are generalized to a high level. For example: Marketing is under the Business school. :\n{msg}",
            }
        ],
        model="llama3-8b-8192",
    )
    print(chat_completion.choices[0].message.content)
    await ctx.send(sender.address, Message(message=chat_completion.choices[0].message.content))
    ctx.logger.info(f"Received message from {sender}: {msg.message}")
 

 


if __name__ == "__main__":
    bureau.run()