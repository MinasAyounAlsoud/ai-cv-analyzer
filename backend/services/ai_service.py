from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)


def analyze_cv(text):

      prompt = f"""
You are a strict HR CV parser.

Return ONLY valid JSON in this EXACT structure:

{{
  "skills": [],
  "strengths": [],
  "education": [
    {{
      "degree": "",
      "institution": "",
      "location": "",
      "duration": ""
    }}
  ],
  "projects": [
    {{
      "name": "",
      "description": "",
      "tech": []
    }}
  ],
"ats_score": number between 20 and 95 based on CV quality
  "summary": ""
}}

Rules:
- ATS score MUST be between 20 and 95
- NEVER return 0
- Base score on skills, experience, and education
- Always return arrays in this structure
- If data not found, return empty strings inside objects
- Never change keys

CV:
{text}
"""

      response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "user", "content": prompt}
        ],
            temperature=0.2,

        response_format={"type": "json_object"}
    )

      return response.choices[0].message.content