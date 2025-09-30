import os
from openai import OpenAI

# Initialize GPT-5 client using API key from GitHub Secrets
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Prompt to regenerate your DivvyFi site
prompt = """
You are a web developer AI. Rebuild the DivvyFi index.html landing page.
Requirements:
- WLFI-style dark hero gradient with headline, subtext, and two buttons (Explore Properties + Sign Up)
- Sticky top navbar: logo left, links center (Properties / Calculator / Dashboard), Connect Wallet right
- Properties section: cards displaying properties from properties.json
- Investment calculator section
- Investor dashboard section with table showing tokens owned, ownership %, annual yield, accrued payout
- Footer with newsletter signup form
- Use Tailwind CSS via Play CDN for styling
- Make it fully static so it can be hosted on GitHub Pages
- Output only the full HTML content (do not include explanations)
"""

# Call GPT-5 to generate HTML
response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.7
)

# Extract the HTML content
html_content = response.choices[0].message["content"]

# Write the new HTML to the root index.html
with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_content)

print("✅ index.html successfully updated by GPT-5")
