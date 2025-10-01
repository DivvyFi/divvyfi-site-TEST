import os
import subprocess
import requests
from openai import OpenAI

# ENV: set these in your shell or GitHub secrets
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
GITHUB_TOKEN = os.environ["GH_PAT"]
REPO = "DivvyFi/divvyfi-site"   # your repo
BRANCH = "main"
WORKFLOW = "update-site.yml"

client = OpenAI(api_key=OPENAI_API_KEY)

# 🔹 Step 1. Generate HTML with GPT-5
prompt = """
Rebuild the DivvyFi MVP landing page with:
- WLFI-inspired dark hero section, sticky navbar.
- Nav: Logo / Properties / Calculator / Dashboard / Connect Wallet.
- Hero CTA button: "Sign Up".
- Investor Dashboard section reading from properties.json.
- Simple ROI Calculator.
- Footer © DivvyFi 2025.
Return full HTML5 with inline TailwindCSS.
"""

print("🤖 Generating new index.html with GPT-5...")
response = client.chat.completions.create(
    model="gpt-5",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.2,
)

html_code = response.choices[0].message.content.strip()

with open("index.html", "w", encoding="utf-8") as f:
    f.write(html_code)

# 🔹 Step 2. Commit & push changes
print("📦 Committing new index.html...")
subprocess.run(["git", "config", "user.name", "divvyfi-bot"])
subprocess.run(["git", "config", "user.email", "bot@divvyfi.com"])
subprocess.run(["git", "add", "index.html"])
subprocess.run(["git", "commit", "-m", "AI regenerated index.html"])
subprocess.run(["git", "push", "origin", BRANCH])

# 🔹 Step 3. Trigger workflow_dispatch via GitHub API
url = f"https://api.github.com/repos/{REPO}/actions/workflows/{WORKFLOW}/dispatches"
headers = {"Authorization": f"Bearer {GITHUB_TOKEN}", "Accept": "application/vnd.github+json"}
resp = requests.post(url, headers=headers, json={"ref": BRANCH})

if resp.status_code == 204:
    print("🚀 Workflow triggered! Pages will redeploy shortly.")
else:
    print("❌ Failed to trigger workflow:", resp.status_code, resp.text)
