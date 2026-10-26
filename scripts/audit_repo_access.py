import json
import csv
import urllib.request
import urllib.error
import time

with open("docs/audit/raw_projects_inventory.json", encoding="utf-8") as f:
    projects = json.load(f)

# Keep only the 34 valid projects
valid_projects = [p for p in projects if p.get("Project title") and p.get("ID")]

print(f"Valid projects to check: {len(valid_projects)}")

results = []

headers = {"User-Agent": "Mozilla/5.0"}

for p in valid_projects:
    pid = p.get("ID")
    title = p.get("Project title").strip()
    raw_tech = p.get("Technology") or "Unspecified"
    tier = p.get("Tier") or "Standard"
    status = p.get("Status") or "Done"
    year = p.get("Year") or "2025-2026"
    link = (p.get("Link") or "").strip()
    
    # Check repo accessibility
    repo_status = "No Link"
    primary_lang = ""
    stars = 0
    forks = 0
    is_accessible = False
    notes = ""
    
    if link.startswith("https://github.com/"):
        parts = link.replace("https://github.com/", "").strip("/").split("/")
        if len(parts) >= 2:
            owner, repo = parts[0], parts[1]
            api_url = f"https://api.github.com/repos/{owner}/{repo}"
            try:
                req = urllib.request.Request(api_url, headers=headers)
                with urllib.request.urlopen(req, timeout=5) as resp:
                    data = json.loads(resp.read().decode())
                    repo_status = "Accessible (Public)"
                    primary_lang = data.get("language") or ""
                    stars = data.get("stargazers_count", 0)
                    forks = data.get("forks_count", 0)
                    is_accessible = True
                    notes = f"Default branch: {data.get('default_branch')}"
            except urllib.error.HTTPError as e:
                if e.code == 404:
                    repo_status = "Inaccessible (404/Private)"
                    notes = "Repository not found or private"
                elif e.code == 403:
                    repo_status = "Rate Limited"
                    notes = "GitHub API rate limit reached"
                else:
                    repo_status = f"HTTP Error {e.code}"
            except Exception as e:
                repo_status = "Connection Error"
                notes = str(e)
            
            time.sleep(0.3) # Avoid aggressive rate limiting
    
    # Standardize category
    std_category = raw_tech
    if raw_tech in ["Gen AI", "Generative AI"]:
        std_category = "Generative AI"
    elif raw_tech in ["Agentic AI"]:
        std_category = "Agentic AI"
    elif raw_tech in ["Computer Vision", "CV"]:
        std_category = "Computer Vision"
    elif raw_tech in ["DL", "Deep Learning"]:
        std_category = "Deep Learning"
    elif raw_tech in ["ML", "Machine Learning"]:
        std_category = "Machine Learning"
    elif raw_tech in ["Data Analytics"]:
        std_category = "Data Analytics"
    elif raw_tech in ["AI"]:
        std_category = "Artificial Intelligence"
    
    results.append({
        "project_id": pid,
        "title": title,
        "raw_technology": raw_tech,
        "standardized_category": std_category,
        "tier": tier,
        "status": status,
        "year": year,
        "github_url": link,
        "repo_status": repo_status,
        "is_accessible": "Yes" if is_accessible else "No",
        "primary_language": primary_lang,
        "notes": notes
    })

csv_file = "docs/audit/project-access-inventory.csv"
fieldnames = ["project_id", "title", "standardized_category", "raw_technology", "tier", "status", "year", "github_url", "repo_status", "is_accessible", "primary_language", "notes"]

with open(csv_file, "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(results)

print(f"Saved {csv_file} with {len(results)} rows.")

with open("docs/audit/project_access_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)
