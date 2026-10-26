import json
import urllib.request
import urllib.error
import os
import time

os.makedirs("docs/repo_inspections", exist_ok=True)

with open("docs/audit/project_access_results.json", encoding="utf-8") as f:
    projects = json.load(f)

headers = {"User-Agent": "Mozilla/5.0"}

def fetch_raw(owner, repo, branch, path):
    url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}"
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=6) as resp:
            return resp.read().decode(errors="replace")
    except Exception:
        return None

branches = ["main", "master"]
files_to_check = [
    "README.md", "readme.md", "README.MD",
    "requirements.txt", "pyproject.toml", "package.json",
    "app.py", "main.py", "pipeline.py", "model.py", "train.py"
]

for p in projects:
    pid = p["project_id"]
    title = p["title"]
    link = p.get("github_url", "")
    if not link.startswith("https://github.com/"):
        continue
    
    parts = link.replace("https://github.com/", "").strip("/").split("/")
    if len(parts) < 2:
        continue
    owner, repo = parts[0], parts[1]
    
    out_file = f"docs/repo_inspections/{pid}_{repo}.json"
    existing = {}
    if os.path.exists(out_file):
        with open(out_file, encoding="utf-8") as f:
            existing = json.load(f)
            # If it already has good readme and dependencies, skip
            if existing.get("readme_snippet") and existing.get("dependencies_snippet"):
                print(f"Skipping already inspected: {pid} {repo}")
                continue

    print(f"Fetching raw data for {pid}: {repo}...")
    
    found_readme = existing.get("readme_snippet")
    found_deps = existing.get("dependencies_snippet")
    found_files = existing.get("files", [])
    
    for branch in branches:
        # Check files
        if not found_readme:
            for r_file in ["README.md", "readme.md", "README.MD"]:
                c = fetch_raw(owner, repo, branch, r_file)
                if c:
                    found_readme = c
                    if r_file not in found_files:
                        found_files.append(r_file)
                    break
        
        if not found_deps:
            for d_file in ["requirements.txt", "pyproject.toml", "package.json"]:
                c = fetch_raw(owner, repo, branch, d_file)
                if c:
                    found_deps = c
                    if d_file not in found_files:
                        found_files.append(d_file)
                    break
                    
        for code_file in ["app.py", "main.py", "src/main.py", "src/app.py"]:
            c = fetch_raw(owner, repo, branch, code_file)
            if c and code_file not in found_files:
                found_files.append(code_file)
                
        if found_readme:
            break
            
    record = {
        "project_id": pid,
        "title": title,
        "owner": owner,
        "repo": repo,
        "language": p.get("primary_language") or existing.get("language") or "Python",
        "files_count": len(found_files),
        "files": found_files,
        "readme_snippet": found_readme[:2500] if found_readme else None,
        "dependencies_snippet": found_deps[:1500] if found_deps else None
    }
    
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(record, f, indent=2)
        
    time.sleep(0.2)

print("All raw repo fetches complete!")
