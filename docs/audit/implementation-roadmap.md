# Implementation Roadmap
## Rajkumar V. — Personal AI Branding Website & AI Systems Portfolio
*Authoritative Baseline: Master Book Decisions 001–300*

---

## Roadmap Phases Overview

```
Phase 0: Workspace & Resource Audit  [DONE]
Phase 1: Project Inventory Verification & Reconciliation  [DONE]
Phase 2: Project Reverse-Engineering & Documentation Generation  [NEXT]
Phase 3: Image Assets Organization & Public Directory Setup  [PENDING]
Phase 4: Next.js Foundation, Design System & Public Homepage  [PENDING]
Phase 5: Searchable Project Library & Project Detail Pages  [PENDING]
Phase 6: Full-Stack App Architecture & Data Layer  [PENDING]
Phase 7: Supabase Database Schema, RLS, Storage & Idempotent Importer  [PENDING]
Phase 8: Environment Secret Safety & Configuration  [PENDING]
Phase 9: Private Admin Workspace & Governance Workflows  [PENDING]
Phase 10: Technical Case-Study PDF System  [PENDING]
Phase 11: Security, Accessibility (WCAG 2.2 AA) & Performance  [PENDING]
Phase 12: End-to-End Testing & Verification  [PENDING]
Phase 13: Production Deployment Preparation & Operations Runbook  [PENDING]
```

---

## Detailed Milestone Execution Plan

### Milestone 1: Reverse-Engineering & Technical Documentation (Phases 1–3)
- Inspect top representative repositories via GitHub trees and code manifests.
- Generate standard, evidence-based Markdown READMEs for projects in `project_readme/`.
- Validate architecture diagrams and copy project images to `public/images/projects/` and profile photo to `public/images/`.

### Milestone 2: Next.js Full-Stack Application & Public Experience (Phases 4–5)
- Initialize Next.js 15+ App Router application with TypeScript and Tailwind CSS.
- Configure futuristic brand design tokens (cyan `#00F2FE`, deep navy `#0A0D14`, modern typography).
- Implement robotics SVG/CSS animation with reduced-motion static fallback.
- Build Homepage sections in approved order: Hero → Featured Projects → Skills → Experience → About → Contact.
- Build Project Discovery Library: responsive 3/2/1 grid, 250ms debounced search, multi-category filter (OR within group, AND across groups), URL sync, honest empty state.
- Build Project Detail Pages: problem, solution, interactive architecture pan/zoom viewer, data flow, tech stack, contribution, limitations, and related projects.

### Milestone 3: Database, Storage, and Import Pipeline (Phases 6–7)
- Author version-controlled SQL migrations: tables (`projects`, `project_images`, `project_documents`, `skills`, `experience`, `contact_submissions`, `admin_audit_logs`).
- Configure strict Row Level Security (RLS) policies allowing public read of published records only.
- Implement an idempotent import script (`scripts/import_projects.ts` / `.py`) importing all 34 verified projects.
- Prepare Supabase Storage setup for public assets and private draft documents.

### Milestone 4: Admin Governance & Case-Study PDF Engine (Phases 8–10)
- Build private admin dashboard with Supabase Auth (no public registration).
- Implement Draft → Preview → Publish revision lifecycle for projects.
- Implement Soft Delete / Trash and restore functionality.
- Implement Contact Inquiries inbox with status transitions (New, In Progress, Resolved) and private follow-up notes.
- Implement Technical Case-Study PDF generation engine:
  - Recruiter template (concise, business/impact oriented).
  - Technical reviewer template (deep architecture, data flow, code snippets, trade-offs).
  - Pre-approval validation checks.
  - Semantic diff & draft comparison.
  - Atomic URL switching and 90-day recovery/rollback.
  - Enforcement of Decision 300 (no automatic publication).

### Milestone 5: Hardening, Verification & Deployment (Phases 11–13)
- Audit accessibility against WCAG 2.2 AA (keyboard focus, landmarks, color contrast, alt text).
- Implement contact rate limiting and honeypot bot defense.
- Run complete test suite (unit tests, build checks, route verifications).
- Document operational runbook and deployment guidelines.
