import json

with open("docs/audit/raw_projects_inventory.json", encoding="utf-8") as f:
    projects = json.load(f)

print(f"Total non-empty projects: {len(projects)}")
for p in projects:
    if p.get("Project title"):
        print(f"ID: {p.get('ID')} | Title: {p.get('Project title')} | Year: {p.get('Year')} | Tech: {p.get('Technology')} | Tier: {p.get('Tier')} | Status: {p.get('Status')} | Demo: {p.get('Demo?')} | Docs: {p.get('Docs?')} | Screenshot: {p.get('Screenshot?')} | Link: {p.get('Link')}")
