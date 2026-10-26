import urllib.request
import json
import time

time.sleep(2) # Give server 2s to bind

endpoints = [
    ("/", "Homepage"),
    ("/projects", "Projects Library"),
    ("/projects/p001-prescription-verification-agent", "P001 Detail"),
    ("/projects/p014-fake_news_detection_v1", "P014 Detail"),
    ("/projects/p023-heltech", "P023 Detail"),
    ("/admin", "Admin Dashboard"),
    ("/admin/pdf", "PDF Governance"),
    ("/sitemap.xml", "Sitemap XML"),
    ("/robots.txt", "Robots TXT"),
    ("/RajkumarV_Resume_Updated.pdf", "Static Resume"),
    ("/images/profile-photo.png", "Profile Photo")
]

all_passed = True
for path, label in endpoints:
    url = f"http://localhost:3000{path}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            status = resp.status
            content_type = resp.headers.get("Content-Type", "")
            data_len = len(resp.read())
            print(f"PASS [Status {status}]: {label} ({path}) - {content_type} ({data_len} bytes)")
    except Exception as e:
        all_passed = False
        print(f"FAIL: {label} ({path}) - {e}")

# Test Contact API POST with honeypot
print("\nTesting Contact API POST with honeypot protection...")
try:
    contact_payload = json.dumps({
        "sender_name": "Smoke Test Agent",
        "sender_email": "test@example.com",
        "inquiry_type": "Recruitment",
        "message": "Automated smoke test verification.",
        "honeypot": ""
    }).encode("utf-8")
    
    req = urllib.request.Request(
        "http://localhost:3000/api/contact",
        data=contact_payload,
        headers={"Content-Type": "application/json", "User-Agent": "Mozilla/5.0"}
    )
    with urllib.request.urlopen(req, timeout=5) as resp:
        res_data = json.loads(resp.read().decode())
        print(f"PASS Contact API POST: Status {resp.status} - Response: {res_data}")
except Exception as e:
    all_passed = False
    print(f"FAIL Contact API: {e}")

if all_passed:
    print("\nALL SMOKE TESTS PASSED WITH 100% SUCCESS!")
else:
    print("\nSOME SMOKE TESTS FAILED!")
