# Portfolio Resources — Build Guide

This folder contains all source assets needed to build **Rajkumar V's** AI Engineer portfolio website.

---

## 📁 Folder Structure

```
resources/
├── .env                        # Supabase environment variables
├── githubreadmefile/
│   └── README.md               # GitHub profile README (copy to GitHub profile repo)
├── master_book/
│   └── Personal_AI_Branding_Website_Master_Book.docx   # Full content & copy guide
├── profile/
│   └── profile-photo.png       # Profile photo for hero section
├── project_details_file/
│   └── main-inventory.xlsx     # Full project list with metadata
├── project_readme/             # (empty — project-level READMEs go here)
├── project-images/             # All project screenshot/architecture images
└── resume/
    └── RajkumarV_Resume_Updated.pdf   # Downloadable resume
```

---

## ⚙️ Environment Setup

Copy `.env` values into your Next.js project root:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key for client-side queries |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Publishable key |
| `NEXT_PUBLIC_SUPABASE_SECRET_KEY` | Secret key — **server-side only, never expose to client** |

> ⚠️ Never commit `.env` to a public repository. Add it to `.gitignore`.

---

## 🖼️ Project Images

All architecture diagrams and screenshots are in `project-images/`. Key images:

| Image | Used For |
|---|---|
| `aegisai-system-overview.webp` | AegisAI security project |
| `agentic-rag.webp` / `end-to-end-rag.webp` | RAG pipeline projects |
| `multi-agent-streamlit.webp` | Multi-agent orchestration |
| `healthcare-orchestration-layers.webp` | Patient Navigation System |
| `fake_news_detection_v1.png` | Hackathon winner project |
| `face-recognition-attendance.webp` | Freelance gym attendance system |
| `dvc-git-ml-pipeline.webp` | MLOps pipeline projects |
| `email-assistant-architecture.webp` | Email/Calendar MCP agent |
| `devbot-app-architecture.webp` | DevBot CLI tool |

Reference images using relative paths from your `public/` folder after copying them in.

---

## 📄 Content Sources

| Source | What to extract |
|---|---|
| `master_book/Personal_AI_Branding_Website_Master_Book.docx` | Page copy, section text, taglines, project descriptions |
| `project_details_file/main-inventory.xlsx` | Project titles, tech stack, GitHub links, categories |
| `githubreadmefile/README.md` | Tech stack badges, bio, stats widgets, social links |
| `resume/RajkumarV_Resume_Updated.pdf` | Experience, education, certifications for About/Resume page |

---

## 🚀 Build Checklist

- [ ] Copy `project-images/` → `public/images/projects/`
- [ ] Copy `profile/profile-photo.png` → `public/images/`
- [ ] Copy `resume/RajkumarV_Resume_Updated.pdf` → `public/`
- [ ] Set up `.env` with Supabase credentials
- [ ] Populate Supabase DB with project data from `main-inventory.xlsx`
- [ ] Use `master_book` for all page copy and section content
- [ ] Deploy GitHub profile README from `githubreadmefile/README.md`
- [ ] Add project-level READMEs to `project_readme/` as they are created

---

## 🛠️ Tech Stack (Portfolio Site)

- **Framework:** Next.js (App Router)
- **Database:** Supabase (PostgreSQL)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel / AWS

---

*Owner: Rajkumar V — rajk7361206@gmail.com*
