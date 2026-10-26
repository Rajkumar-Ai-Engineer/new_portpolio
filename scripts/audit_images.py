import os
import hashlib
from PIL import Image
import json
import csv

img_dir = "resources/project-images"
images = sorted(os.listdir(img_dir))

records = []

for fname in images:
    fpath = os.path.join(img_dir, fname)
    if not os.path.isfile(fpath):
        continue
    
    size_bytes = os.path.getsize(fpath)
    with open(fpath, "rb") as f:
        file_bytes = f.read()
        sha256 = hashlib.sha256(file_bytes).hexdigest()
    
    try:
        with Image.open(fpath) as img:
            width, height = img.size
            fmt = img.format
            mode = img.mode
    except Exception as e:
        width, height = None, None
        fmt = "UNKNOWN"
        mode = "UNKNOWN"
    
    records.append({
        "filename": fname,
        "format": fmt,
        "width": width,
        "height": height,
        "size_bytes": size_bytes,
        "sha256": sha256,
        "mode": mode
    })

print(f"Total images audited: {len(records)}")

# Check duplicate hashes
hash_map = {}
for r in records:
    h = r["sha256"]
    hash_map.setdefault(h, []).append(r["filename"])

duplicates = {k: v for k, v in hash_map.items() if len(v) > 1}
print(f"Identical duplicate hash groups: {len(duplicates)}")
for h, files in duplicates.items():
    print(f"  Hash {h[:12]}... : {files}")

with open("docs/audit/images_audit.json", "w", encoding="utf-8") as f:
    json.dump(records, f, indent=2)

print("Saved docs/audit/images_audit.json")
