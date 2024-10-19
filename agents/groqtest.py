import os

from groq import Groq

client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

with open('economics.txt', 'r') as file:
    notes = file.read()

prompt = f"""
You are an AI assistant tasked with analyzing a set of notes for two purposes: key phrase extraction and topic segmentation.

Key Phrase Extraction: Identify the most important concepts, terms, or phrases from the notes. Focus on key ideas that would be useful for creating flashcards or summarizing the material. The phrases should represent significant points, definitions, or concepts that a student should study.

Topic Segmentation: Break the notes into distinct sections based on their topics. Each section should represent a coherent group of information about a specific subject or theme. For each topic, provide a brief summary (one sentence) explaining what the section is about.

Here are the notes: {notes}

Please first list the key phrases, followed by the topics and their summaries.
"""

chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": prompt,
        }
    ],
    model="llama3-8b-8192",
)

print(chat_completion.choices[0].message.content)