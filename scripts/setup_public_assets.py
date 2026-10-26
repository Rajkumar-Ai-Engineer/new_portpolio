import os
import shutil

# Target directories
os.makedirs("public/images/projects", exist_ok=True)
os.makedirs("public/images", exist_ok=True)

# 1. Copy profile photo
src_profile = "resources/profile/profile-photo.png"
dst_profile = "public/images/profile-photo.png"
if os.path.exists(src_profile):
    shutil.copy2(src_profile, dst_profile)
    print("Copied profile photo to", dst_profile)

# 2. Copy resume PDF
src_resume = "resources/resume/RajkumarV_Resume_Updated.pdf"
dst_resume = "public/RajkumarV_Resume_Updated.pdf"
if os.path.exists(src_resume):
    shutil.copy2(src_resume, dst_resume)
    print("Copied resume to", dst_resume)

# 3. Copy project images
src_img_dir = "resources/project-images"
dst_img_dir = "public/images/projects"

copied = 0
for fname in os.listdir(src_img_dir):
    sf = os.path.join(src_img_dir, fname)
    df = os.path.join(dst_img_dir, fname)
    if os.path.isfile(sf):
        shutil.copy2(sf, df)
        copied += 1

print(f"Copied {copied} project images to {dst_img_dir}")
