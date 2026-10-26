import json
import urllib.request
import urllib.error
import os
import time

os.makedirs("docs/repo_inspections", exist_ok=True)

with open("docs/audit/project_access_results.json", encoding="utf-8") as f:
    projects = json.load(f)

headers = {"User-Agent": "Mozilla/5.0"}

def get_json(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            return json.loads(resp.read().decode())
    except Exception as e:
        return None

def get_text(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as resp:
            return resp.read().decode(errors="replace")
    except Exception as e:
        return None

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
    if os.path.exists(out_file):
        continue
        
    print(f"Fetching inspection for {pid}: {repo}...")
    
    # Get repo info
    repo_data = get_json(f"https://api.github.com/repos/{owner}/{repo}")
    if not repo_data:
        print(f"  Failed repo info for {repo}")
        continue
    
    default_branch = repo_data.get("default_branch", "main")
    
    # Get tree
    tree_data = get_json(f"https://api.github.com/repos/{owner}/{repo}/git/trees/{default_branch}?recursive=1")
    file_list = []
    if tree_data and "tree" in tree_data:
        file_list = [item["path"] for item in tree_data["tree"] if item["type"] == "blob"]
    
    # Try fetching raw README or requirements if present
    readme_content = None
    for r_name in ["README.md", "readme.md", "README.MD"]:
        if r_name in file_list:
            readme_content = get_text(f"https://raw.githubusercontent.com/{owner}/{repo}/{default_branch}/{r_name}")
            break
            
    reqs_content = None
    for req_name in ["requirements.txt", "pyproject.toml", "package.json"]:
        if req_name in file_list:
            reqs_content = get_text(f"https://raw.githubusercontent.com/{owner}/{repo}/{default_branch}/{req_name}")
            break
            
    inspection = {
        "project_id": pid,
        "title": title,
        "owner": owner,
        "repo": repo,
        "description": repo_data.get("description"),
        "default_branch": default_branch,
        "created_at": repo_data.get("created_at"),
        "updated_at": repo_data.get("updated_at"),
        "language": repo_data.get("language"),
        "topics": repo_data.get("topics", []),
        "files_count": len(file_list),
        "files": file_list[:60], # first 60 files
        "readme_snippet": (readme_content[:1500] if readme_content else None),
        "dependencies_snippet": (reqs_content[:1000] if reqs_content else None)
    }
    
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(inspection, f, indent=2)
        
    time.sleep(0.4)

print("All repository inspections completed.")
