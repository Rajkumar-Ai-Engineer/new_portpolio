# Requirements Traceability Matrix
## Rajkumar V. — Personal AI Branding Website & AI Systems Portfolio
*Authoritative Baseline: Personal AI Branding Website Master Book (Decisions 001–300)*

---

## 1. Product Vision & Brand Positioning (MB Ch. 2, Dec 001–010, 055–056)

| Req ID | Requirement Description | Implementation Target | Verification Method | Status |
|---|---|---|---|---|
| **REQ-BRD-01** | Full-stack AI Engineer brand identity: practical engineering across AI/ML, GenAI, Agentic AI, Intelligent Apps | Homepage Hero, Meta Tags, About Section | Content audit & visual review | In Progress |
| **REQ-BRD-02** | Hero Headline: "AI Engineer Building Intelligent Systems." | `components/home/Hero.tsx` | Visual check / DOM inspection | In Progress |
| **REQ-BRD-03** | Supporting Message: "Designing and engineering practical AI solutions across generative AI, agentic systems, and intelligent applications." | `components/home/Hero.tsx` | Visual check / DOM inspection | In Progress |
| **REQ-BRD-04** | Primary CTA: "Explore My Projects" (links to `/projects` or `#projects`) | `components/home/Hero.tsx` | Click test / URL route test | In Progress |
| **REQ-BRD-05** | Secondary CTA: "Contact Me" (links to `#contact` or `/contact`) | `components/home/Hero.tsx` | Click test / Scroll test | In Progress |
| **REQ-BRD-06** | Profile photo integration with authentic image asset (`resources/profile/profile-photo.png`) | `public/images/profile-photo.png`, `Hero.tsx` | Image load test, visual check | In Progress |
| **REQ-BRD-07** | Evidence over invention rule: no fabricated metrics, testimonials, or claims | Content review & DB constraints | Audit vs Resume & Repositories | Verified Policy |

---

## 2. Information Architecture & Public Experience (MB Ch. 3, Dec 011–040, 051–070)

| Req ID | Requirement Description | Implementation Target | Verification Method | Status |
|---|---|---|---|---|
| **REQ-IA-01** | Homepage Section Order: 1. Hero → 2. Featured Projects → 3. Skills → 4. Experience → 5. About → 6. Contact | `app/page.tsx` | Section sequence DOM audit | In Progress |
| **REQ-IA-02** | Curated Featured Grid: admin-selected featured projects followed by "Explore All Projects" CTA | `components/home/FeaturedProjects.tsx` | DB query `is_featured = true`, DOM check | In Progress |
| **REQ-IA-03** | Grouped Skills: AI/ML, Generative & Agentic AI, Backend, Frontend, Data & Databases, Cloud & DevOps (no fake percentages) | `components/home/SkillsSection.tsx` | Visual check, resume cross-reference | In Progress |
| **REQ-IA-04** | Verified Experience Timeline: Chettinad Tech (B.Tech AI&DS), Freelance GenAI Engineer, Tech Academy Founder, Hackathon Winner, LeetCode 50+ | `components/home/ExperienceSection.tsx` | Visual check, resume cross-reference | In Progress |
| **REQ-IA-05** | Authentic About Story: background, engineering philosophy, problem-solving passion | `components/home/AboutSection.tsx` | Text audit | In Progress |
| **REQ-IA-06** | Contact Form: inquiry types, validation, honeypot, durable DB persistence | `components/home/ContactSection.tsx`, `app/api/contact/route.ts` | Form submission test, DB verification | In Progress |
| **REQ-IA-07** | Resume PDF Download: direct download of approved `RajkumarV_Resume_Updated.pdf` | `app/api/resume/route.ts`, Header & Hero links | File download test & header check | In Progress |
| **REQ-IA-08** | Minimal Professional Footer: links to GitHub, LinkedIn, Email, legal copyright | `components/layout/Footer.tsx` | Visual check & external link test | In Progress |

---

## 3. Project Discovery & Detail Pages (MB Ch. 3 & 4, Dec 091–170, 201–215)

| Req ID | Requirement Description | Implementation Target | Verification Method | Status |
|---|---|---|---|---|
| **REQ-LIB-01** | Responsive 3/2/1 Grid: 3 cols desktop, 2 tablet, 1 mobile. Default 9 projects per page | `app/projects/page.tsx`, `components/projects/ProjectGrid.tsx` | Responsive viewport tests (1280px, 768px, 375px) | In Progress |
| **REQ-LIB-02** | Project Card Design: 16:9 cover, title, 20–30 word summary, max 3 prioritized tech badges + "+N more", action arrow | `components/projects/ProjectCard.tsx` | UI unit tests & visual inspection | In Progress |
| **REQ-LIB-03** | Indexed Search: partial & case-insensitive matching across title, summary, tech stack, ~250ms debounce | `components/projects/SearchBar.tsx`, `app/api/projects/route.ts` | Search test queries with debounce check | In Progress |
| **REQ-LIB-04** | Search Semantics: OR matching within filter category, AND matching across categories; active filter chips & "Clear all" | `components/projects/FilterBar.tsx` | Multi-filter selection test | In Progress |
| **REQ-LIB-05** | URL Synchronization: search query, active filters, page number reflected in URL searchParams | `app/projects/page.tsx` hook | Browser navigation & bookmarking test | In Progress |
| **REQ-LIB-06** | Honest Empty State: clear messaging and reset button when no projects match | `components/projects/EmptyState.tsx` | Filter mismatch test | In Progress |
| **REQ-DET-01** | Project Detail Narrative: Problem, Solution, Architecture Diagram, Data Flow, Tech Stack, Contribution, Results, Limitations | `app/projects/[slug]/page.tsx` | Slug rendering test & content audit | In Progress |
| **REQ-DET-02** | Architecture Diagram Viewer: pan/zoom support, fitted-view reset, high-res download, accessible alt text | `components/projects/ArchitectureViewer.tsx` | Pan/zoom interaction test | In Progress |
| **REQ-DET-03** | Verified External Links: repository, demo (if available), external links safe (`rel="noopener noreferrer"`) | `app/projects/[slug]/page.tsx` | Link integrity check | In Progress |
| **REQ-DET-04** | Share & Copy Link: native navigator.share with fallback copy-to-clipboard and user feedback | `components/projects/ShareButton.tsx` | Clipboard API test | In Progress |
| **REQ-DET-05** | Related Projects & Prev/Next navigation | `components/projects/ProjectNavigation.tsx` | Detail page navigation check | In Progress |

---

## 4. Visual Design, Motion & Accessibility (MB Ch. 4 & 7, Dec 117–200)

| Req ID | Requirement Description | Implementation Target | Verification Method | Status |
|---|---|---|---|---|
| **REQ-DES-01** | Dark Theme Foundation: deep dark background (`#0A0D14` / `#0D1117`), electric cyan (`#00F2FE` / `#00E5FF`) & cool blue accents | `tailwind.config.ts`, `globals.css` | Color palette inspection | In Progress |
| **REQ-DES-02** | Modern Sans-serif + Monospace: Geist Sans / Inter for body and Geist Mono / JetBrains Mono for code | `app/layout.tsx`, `globals.css` | Font inspection & rendering check | In Progress |
| **REQ-DES-03** | Robotics Hero Motion: lightweight CSS/SVG animations (nodes, grid paths, robotic accents), static fallback | `components/home/RoboticsAnimation.tsx` | CSS animation inspection, performance check | In Progress |
| **REQ-DES-04** | Reduced Motion Support: `prefers-reduced-motion` media query disables non-essential animations | `globals.css`, animation components | Emulated reduced-motion browser test | In Progress |
| **REQ-DES-05** | Card Interaction: 3–5px lift, 1.03x image zoom, 180–240ms transition, 2px high-contrast cyan focus outline | `components/projects/ProjectCard.tsx` | Hover & keyboard focus inspection | In Progress |
| **REQ-A11Y-01** | Keyboard Navigation: full tab order, visible focus rings, Enter/Space activation, Esc closes modals | Global UI components | Full keyboard audit (No mouse) | In Progress |
| **REQ-A11Y-02** | Semantic Landmarks & Headings: `main`, `nav`, `section`, `h1`-`h4` proper hierarchy | All page templates | Lighthouse Accessibility / axe audit | In Progress |
| **REQ-A11Y-03** | Image Accessibility: informative alt text on diagrams, decorative images use empty alt | Image components | Alt text audit across 45 assets | In Progress |

---

## 5. Technical Architecture & Database (MB Ch. 5 & 8, Dec 133–150, Supabase Integration)

| Req ID | Requirement Description | Implementation Target | Verification Method | Status |
|---|---|---|---|---|
| **REQ-ARC-01** | Next.js App Router full-stack architecture with TypeScript and Tailwind CSS | Root Next.js project structure | `npm run build` production check | In Progress |
| **REQ-DB-01** | Supabase PostgreSQL Schema: `projects`, `project_images`, `project_documents`, `skills`, `experience`, `contact_submissions`, `admin_audit_logs` | `supabase/migrations/001_initial_schema.sql` | SQL migration check & DB execution | In Progress |
| **REQ-DB-02** | Row Level Security (RLS): anonymous users can only read published projects (`status = 'published'`); drafts private | `supabase/migrations/002_rls_policies.sql` | RLS policy verification | In Progress |
| **REQ-DB-03** | Idempotent Project Inventory Importer: imports verified 34 projects, resolves 34 vs 33 discrepancy | `scripts/import_inventory.ts` / `.py` | Import execution & reconciliation report | In Progress |
| **REQ-DB-04** | Supabase Storage Buckets: `project-assets` (public read for published), `private-drafts` (admin only) | `supabase/storage_setup.sql` | Storage policy audit | In Progress |
| **REQ-SEC-01** | Environment Secret Safety: `.env` never exposed; server secrets separate from `NEXT_PUBLIC_` | `.env.example`, Next.js server actions | Code scanning & git status check | In Progress |
| **REQ-SEC-02** | Contact Form Protection: server-side validation, rate limiting, honeypot field | `app/api/contact/route.ts` | Bot spam test, rate limit test | In Progress |

---

## 6. Private Admin Workspace & Content Governance (MB Ch. 6, Dec 071–085, 161–175)

| Req ID | Requirement Description | Implementation Target | Verification Method | Status |
|---|---|---|---|---|
| **REQ-ADM-01** | Private Admin Authentication: Supabase Auth sign-in, public registration disabled | `app/admin/login/page.tsx`, `middleware.ts` | Auth barrier test, registration block check | In Progress |
| **REQ-ADM-02** | Admin Dashboard Overview: inquiry count, project publication status, quick actions | `app/admin/page.tsx` | Dashboard UI and metrics audit | In Progress |
| **REQ-ADM-03** | Project CRUD & Revisions: Draft → Preview → Publish lifecycle. Edits create draft revisions; published stays live | `app/admin/projects/` | Revision transition test | In Progress |
| **REQ-ADM-04** | Architecture Diagram Pipeline: mandatory diagram validation before publish, format/size checks | `components/admin/DiagramUpload.tsx` | Validation upload test | In Progress |
| **REQ-ADM-05** | Soft Delete & Trash: deleted items move to Trash, can be restored or purged permanently | `app/admin/trash/page.tsx` | Soft delete and restore test | In Progress |
| **REQ-ADM-06** | Contact Submissions Inbox: statuses New, In Progress, Resolved; private follow-up notes | `app/admin/inquiries/page.tsx` | Status change and note update test | In Progress |
| **REQ-ADM-07** | Admin Audit Logging: record auth events, project edits, publish actions, resume updates | `admin_audit_logs` table, helper | Audit log inspection | In Progress |

---

## 7. Technical Case-Study PDF System (MB Ch. 9 & 10, Dec 216–300)

| Req ID | Requirement Description | Implementation Target | Verification Method | Status |
|---|---|---|---|---|
| **REQ-PDF-01** | Dual Audience Styles: Recruiter (outcome-focused, concise) & Technical (deep architecture, code, rationale) | `lib/pdf/templates/` | Template generator test | In Progress |
| **REQ-PDF-02** | Immutable Versioned Snapshot: captures approved content state & generation settings | `project_documents` snapshot json | Snapshot immutability check | In Progress |
| **REQ-PDF-03** | Pre-Approval Validation: verifies file opens, expected content exists, images render, plausible page count | `lib/pdf/validator.ts` | PDF validator execution | In Progress |
| **REQ-PDF-04** | Draft Comparison & Diff: semantic change summary (sections, figures, links) before approval | `components/admin/PdfComparison.tsx` | Diff calculation check | In Progress |
| **REQ-PDF-05** | Atomic Replacement: validate & approve first, then switch stable URL; prior stays live if failed | `lib/pdf/publisher.ts` | Replacement failure rollback test | In Progress |
| **REQ-PDF-06** | 90-Day Recovery & Audited Rollback: rollback verifies target file and logs actor, timestamp, reason | `app/admin/pdf/page.tsx` | Rollback test & audit log check | In Progress |
| **REQ-PDF-07** | Hard Rule MB Dec 300: no automatic publication or rollback; requires explicit admin action | Admin UI & API controls | Verification of authorization gating | In Progress |

---

## 8. Deployment & Operational Readiness (MB Ch. 11–15, Dec 111–130)

| Req ID | Requirement Description | Implementation Target | Verification Method | Status |
|---|---|---|---|---|
| **REQ-DEP-01** | Production Build Verification: Next.js build succeeds with zero type or lint errors | `npm run build` | Next.js build pipeline | In Progress |
| **REQ-DEP-02** | Dynamic Sitemap & Robots.txt: lists only published projects | `app/sitemap.ts`, `app/robots.ts` | URL crawl test | In Progress |
| **REQ-DEP-03** | Branded Error Pages: custom `not-found.tsx` and `error.tsx` with helpful recovery links | `app/not-found.tsx`, `app/error.tsx` | 404 and 500 error route tests | In Progress |
| **REQ-DEP-04** | Operational Runbook: documented migration steps, backup strategy, rollback procedures | `docs/runbook.md` | Documentation review | In Progress |
