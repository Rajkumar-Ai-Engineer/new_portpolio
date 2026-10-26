import json

with open("docs/audit/images_audit.json") as f:
    data = json.load(f)

for img in data:
    if "alt" in img["filename"] or "unsupervised" in img["filename"]:
        print(f"{img['filename']}: size={img['size_bytes']}, dim={img['width']}x{img['height']}, sha={img['sha256'][:10]}")
