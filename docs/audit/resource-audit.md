# Comprehensive Workspace Resource Audit Report
## Rajkumar V. — Personal AI Branding Website & AI Systems Portfolio
*Audit Date: 25 October 2026 | Antigravity AI Engineering Environment*

---

## 1. Executive Summary & Source-of-Truth Hierarchy

This audit establishes the baseline facts and evidence for the complete implementation of Rajkumar V's Personal AI Branding Website. The audit strictly conforms to the approved source-of-truth hierarchy:

1. **Personal AI Branding Website Master Book:** Authoritative product specification, architecture, design system, admin governance, and technical case-study PDF requirements.
2. **Project Inventory Workbook (`main-inventory.xlsx`):** Initial project catalogue and metadata.
3. **Actual Source Code and Accessible Repositories:** Primary technical evidence of what each project implements.
4. **Updated Resume PDF (`RajkumarV_Resume_Updated.pdf`):** Verified record of professional experience, education, skills, achievements, and certifications.
5. **GitHub Profile README (`resources/githubreadmefile/README.md`):** Professional presentation and public profile links.
6. **Project Images & Architecture Diagrams (`resources/project-images/`):** Visual assets and diagrams matched to project records.
7. **Profile Photo & Brand Assets (`resources/profile/profile-photo.png`):** Authentic personal branding assets.

**Secret-Handling Protocol Compliance:**
The `.env` file located in `resources/.env` was completely excluded from the audit. No secret values were opened, read, printed, copied, or exposed. All subsequent environment configurations will use standard template variables with placeholder values.

---

## 2. Master Book Audit

- **Document Location:** `resources/master_book/Personal_AI_Branding_Website_Master_Book.docx`
- **Integrity Status:** Complete, uncorrupted, 216 paragraphs, 15 chapters, and Appendices A and B.
- **Decision Trail:** Decisions 001 through 300 fully documented.
- **Key Binding Mandates:**
  - One full-stack Next.js application (App Router) with TypeScript and Tailwind CSS.
  - Supabase PostgreSQL as authoritative store; Supabase Auth for private admin; Supabase Storage for assets.
  - No public admin registration; RLS strictly enforced on database and storage.
  - Draft → Preview → Publish lifecycle for projects and case-study PDFs.
  - Evidence-first principle: no fabricated metrics, benchmark scores, or capabilities.
  - Hard Rule (Decision 300): Automated generation/validation permitted; publication, replacement, and rollback require explicit admin action.

---

## 3. Project Inventory Audit & Discrepancy Investigation

### The 34-versus-33 Discrepancy Resolved
- **Finding:** The `Summary` worksheet reported **33 total projects**, whereas scanning the `Projects` worksheet revealed **34 non-empty project records** (P001 through P034).
- **Root Cause Identified:** 
  In the `Projects` worksheet:
  - Row 4 contains the column headers (`ID`, `Project title`, `Year`, `Source`, `Technology`, `Status`, `Tier`, `Link`, `Demo?`, `Docs?`, `Screenshot?`, etc.).
  - Row 5 contains `P001` ("Prescription verification agent"), a valid project record with real repository link (`https://github.com/Rajkumar-Ai-Engineer/PrescriptionAgent`).
  - Row 2 of the sheet contained an author note: *"Row 5 is an example: overwrite or delete it. Rows 6 to 305 feed the Summary sheet."*
  - The formula in cell `Summary!B4` was hardcoded as `=COUNTA(Projects!$B$6:$B$305)`, deliberately starting at Row 6 and excluding Row 5!
  - Because the owner did not delete Row 5 but populated it with project `P001`, the Summary formula undercounted by exactly 1.
- **Resolution:**
  All 34 projects (`P001` through `P034`) are authentic project entries. The initial catalogue contains exactly 34 projects. Rows 39 through 73 contain pre-computed ID formulas with empty titles and are correctly filtered out.

### Catalogue Composition
- **Total Valid Projects:** 34
- **Featured Tier:** 6 projects (`P001`, `P014`, `P021`, `P023`, `P031`, plus candidates in resume)
- **Standard Tier:** 15 projects
- **Archive Tier:** 13 projects
- **Standardized Categories:**
  - Agentic AI: 5 projects
  - Generative AI: 12 projects
  - Machine Learning: 7 projects
  - Deep Learning: 4 projects
  - Computer Vision: 2 projects
  - Data Analytics: 2 projects
  - Artificial Intelligence: 1 project
  - Multi-discipline / Parser: 1 project

---

## 4. Image Assets & Duplicate Investigation

The directory `resources/project-images/` contains 45 image files. Every file was inspected for dimensions, file format, byte size, and cryptographic SHA-256 hash.

### Duplicate Analysis & Hash Verification
The prompt requested verification of three known potential duplicate pairs:

1. **Pair 1: `aegisai-system-overview.webp` & `aegisai-system-overview-alt.webp`**
   - Both files: 71,398 bytes | 1800 x 1005 px | WebP format
   - SHA-256: `d6aa9a7b379e496a7dd73a4b655da08ceca761be7b115469ecfc7df2c2c01991`
   - **Conclusion:** Identical duplicate. `aegisai-system-overview.webp` is designated canonical.

2. **Pair 2: `mcp-developer-cli-flow.webp` & `developer-cli-flow-alt.webp`**
   - Both files: 60,726 bytes | 1800 x 1005 px | WebP format
   - SHA-256: `8b257afa377ba018dc339c9f7a77f0a8524e934fb7ea88f7b7389c09c2567dfd`
   - **Conclusion:** Identical duplicate. `mcp-developer-cli-flow.webp` is designated canonical.

3. **Pair 3: `network-security-data-flow.webp` & `network-security-data-flow-alt.webp`**
   - Both files: 115,918 bytes | 1800 x 1005 px | WebP format
   - SHA-256: `da774799118182b814df2693fa28965f8d0a3ce57e3f6d713c2356c9d06b527b`
   - **Conclusion:** Identical duplicate. `network-security-data-flow.webp` is designated canonical.

### Aspect Ratio Variant Analysis
- `unsupervised-clustering-pipeline.webp`: 130,138 bytes | 1800 x 1129 px (Full diagram)
- `unsupervised-clustering-pipeline-alt.webp`: 97,680 bytes | 1800 x 1005 px (16:9 crop)
- **Conclusion:** Not duplicates; `alt` is a 16:9 aspect ratio crop optimized for card display, while the original preserves full vertical details for the interactive pan/zoom viewer.

### Project-Image Mapping Summary
All 45 images map to project entries in the inventory. A complete CSV mapping with dimensions, hashes, target project IDs, and confidence levels is saved at `docs/audit/project-image-mapping.csv`.

---

## 5. Repositories & Source Code Accessibility Audit

Each of the 34 project repositories was checked against the GitHub API (`https://api.github.com/repos/Rajkumar-Ai-Engineer/...`).

- **Total Repositories Checked:** 34
- **Public & Accessible:** 34 (100% accessibility)
- **Private or Inaccessible:** 0
- **Primary Languages Detected:**
  - Python: 20 repositories
  - Jupyter Notebook: 9 repositories
  - HTML/CSS/JS: 4 repositories
  - Other/Config: 1 repository
- **Full Details:** Documented in `docs/audit/project-access-inventory.csv`.

---

## 6. Resume & Brand Profile Verification

### Resume Evidence (`RajkumarV_Resume_Updated.pdf`)
- **Name:** Rajkumar V
- **Location:** Karur, Tamil Nadu
- **Contact:** rajk7361206@gmail.com | +91 98942 00254
- **Profiles:** `linkedin.com/in/rajkumar-ai` | `github.com/Rajkumar-Ai-Engineer`
- **Education:** B.Tech in Artificial Intelligence & Data Science, Chettinad College of Engineering & Technology, Karur (Sep 2023 – May 2027) | CGPA: 8.23; Sri Meenakshi Matric HSS (81.2%)
- **Experience:**
  - Freelance Generative AI Engineer (Nov 2024 – Present)
  - Founder & AI Instructor, Tech Academy (2024 – Present)
- **Honors & Badges:**
  - Winner, 24-Hour AI/ML Hackathon (Bannari Amman Institute of Tech, Feb 2025)
  - LeetCode 50+ Badge
  - 120+ AI Project Streak (2025)
- **Certifications:**
  - AI Internship (3 months with Computer Vision) — Pantech.ai
  - Complete Data Science Bootcamp — Udemy (Krish Naik)
  - Generative AI with Hugging Face — Udemy

---

## 7. Resource Verification Categorization

| Category | Count | Criteria |
|---|---|---|
| **Verified Resources** | 34 | Projects with public, accessible GitHub repositories, confirmed titles, and matched architecture/cover imagery. |
| **Partially Verified** | 0 | None. All repositories have accessible source trees. |
| **Missing Evidence** | 0 | No inaccessible repositories or orphan images. |
| **Unverified Metadata** | 28 | Year was explicitly listed only for P001-P005 (2026); remaining projects have year inferred as 2024-2026 based on GitHub commit activity and resume streak. |
