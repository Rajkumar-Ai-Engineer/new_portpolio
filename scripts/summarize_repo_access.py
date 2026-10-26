import json

with open("docs/audit/project_access_results.json", encoding="utf-8") as f:
    res = json.load(f)

accessible = [r for r in res if r["is_accessible"] == "Yes"]
inaccessible = [r for r in res if r["is_accessible"] == "No"]
print(f"Total projects: {len(res)}")
print(f"Accessible repos: {len(accessible)}")
print(f"Inaccessible / 404 repos: {len(inaccessible)}")

print("\n--- Inaccessible / Issues ---")
for r in inaccessible:
    print(f"{r['project_id']} | {r['title']} | Status: {r['repo_status']} | URL: {r['github_url']}")

print("\n--- Accessible Repos (all 34) ---")
for r in accessible:
    print(f"{r['project_id']} | {r['title']} | Lang: {r['primary_language']} | URL: {r['github_url']}")
