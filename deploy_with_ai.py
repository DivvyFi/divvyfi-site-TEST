import os
import sys
import subprocess
import requests
from openai import OpenAI

# ENV vars (set these in shell or GitHub secrets)
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
GITHUB_TOKEN = os.environ["GH_PAT"]
REPO = "DivvyFi/divvyfi-site"   # your repo
BRANCH = "main"
WORKFLOW = "update-site.yml"

client = OpenAI(api_key=OPENAI_API_KEY)

def run(cmd):
    subprocess.run(cmd, check=True)

def generate_index():
    """Generate a new index.html using GPT-5"""
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

def commit_and_push():
    """Commit and push index.html changes"""
    print("📦 Committing changes...")
    run(["git", "config", "user.name", "divvyfi-bot"])
    run(["git", "config", "user.email", "bot@divvyfi.com"])
    run(["git", "add", "index.html"])
    run(["git", "commit", "-m", "Site update"])
    run(["git", "push", "origin", BRANCH])

def trigger_workflow():
    """Trigger GitHub Actions workflow_dispatch"""
    print("🚀 Triggering GitHub Pages workflow...")
    url = f"https://api.github.com/repos/{REPO}/actions/workflows/{WORKFLOW}/dispatches"
    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }
    resp = requests.post(url, headers=headers, json={"ref": BRANCH})
    if resp.status_code == 204:
        print("✅ Workflow triggered! Pages redeploying...")
    else:
        print("❌ Failed to trigger workflow:", resp.status_code, resp.text)

if __name__ == "__main__":
    # Usage: python deploy_with_ai.py [--ai | --manual]
    mode = "--manual" if "--manual" in sys.argv else "--ai"

    if mode == "--ai":
        generate_index()  # build new site with GPT-5
    else:
        print("📝 Skipping AI — using your manual index.html edits.")

    commit_and_push()
    trigger_workflow()
