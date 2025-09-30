import os
import sys
from openai import OpenAI
import shutil

# ✅ Decide whether to use GPT-5 or keep manual edits
use_ai = "--ai" in sys.argv

# Always ensure _site exists
os.makedirs("_site", exist_ok=True)

if use_ai:
    print("🤖 Regenerating index.html with GPT-5...")

    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    prompt = """
    Rebuild the DivvyFi MVP landing page with:
    - Dark hero section (WLFI-inspired) with sticky nav bar.
    - Nav: Logo + Properties / Calculator / Dashboard / Connect Wallet.
    - Hero call-to-action: "Sign Up" button.
    - Investor Dashboard section (reads from properties.json placeholder).
    - Simple ROI Calculator section.
    - Footer with © DivvyFi 2025.

    Return full HTML5 with inline TailwindCSS classes. No explanations, just code.
    """

    response = client.chat.completions.create(
        model="gpt-5",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
    )

    html_code = response.choices[0].message.content.strip()

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html_code)
else:
    print("✍️ Skipping GPT-5 regeneration. Using manual index.html.")

# ✅ Always copy final index.html (AI or manual) into _site for deployment
shutil.copy("index.html", "_site/index.html")

print("✅ index.html deployed to _site/")
