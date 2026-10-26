PERSONAL AI BRANDING WEBSITE

Master Architecture, Product Specification & Technical Case-Study PDF Handbook

Documentation baseline • Decision register through Decision 300 • 25 October 2026

A single source of truth for the approved product direction, architecture, admin workflows, security, accessibility, and evidence-first technical case-study PDF lifecycle.


# Document Control


Document purpose: Consolidated master specification and implementation handoff.

Project: Personal AI Branding Website and Technical Case-Study PDF System.

Status: Documentation complete through Decision 300; implementation not started by this document.

Intended audience: Owner, future development agent, reviewers, and maintainers.

Implementation target: Google Antigravity as the intended future development environment.

Authority: Approved decisions are binding unless explicitly revised by the owner.


# Contents


1. Purpose, Scope & How to Use This Book

2. Product Vision & Brand Positioning

3. Information Architecture & Public Experience

4. Visual Design, Motion & Responsive Behaviour

5. Technical Architecture & Deployment

6. Private Admin Workspace & Content Governance

7. Project Evidence, Media & Accessibility

8. Security, Privacy, Reliability & Operations

9. Technical Case-Study PDF System: Purpose & Content

10. PDF Generation, Approval, Versioning & Recovery

11. SEO, Content Discovery & Sharing

12. Testing, Release & Acceptance

13. Open Decisions & Implementation Boundaries

14. Implementation Roadmap

15. Decision Register & Governance Summary

Appendix A. Decision Register Summary (001–300)

Appendix B. Implementation Readiness Checklist


# 1. Purpose, Scope & How to Use This Book


This book consolidates the approved direction for a premium personal AI engineering brand website and its private content-management workspace. It is a planning and implementation reference for a later Google Antigravity development phase; it does not claim that code, accounts, hosting, deployment, or integrations already exist.

The website serves three goals: employment opportunities, freelance/client work, and long-term public recognition as an AI engineer. The portfolio is the centrepiece of a broader personal brand experience.

Status language used throughout: APPROVED means explicitly selected in the decision process; RECOMMENDED means a sensible implementation approach that should not override an open choice; OPEN means a decision is intentionally not yet fixed; FUTURE means excluded from the initial scope unless later approved.

Implementation agents must read this book before making architecture changes. If a later requirement conflicts with an approved decision, surface the conflict and request a decision rather than silently changing the design.


# 2. Product Vision & Brand Positioning


Positioning: Full-stack AI Engineer. The public identity should communicate practical engineering across AI/ML, generative AI, agentic systems, and intelligent applications. The site should make it easy for recruiters, potential clients, and the AI community to understand the work and contact the owner.

Approved hero headline: “AI Engineer Building Intelligent Systems.” Supporting message: “Designing and engineering practical AI solutions across generative AI, agentic systems, and intelligent applications.” Primary action: “Explore My Projects.” Secondary action: “Contact Me.” The resume remains accessible through navigation and a dedicated section.

Personal branding takes priority over a generic project catalogue. Use the owner’s identity/monogram as the brand anchor, with configurable identity settings. The public site uses a premium futuristic hybrid visual language: dark theme, electric cyan/cool-blue accents, refined typography, restrained glow, and robotics-inspired motion.

Do not fabricate credentials, project outcomes, team roles, metrics, production status, or impact. The website must make uncertainty visible when evidence is missing.


# 3. Information Architecture & Public Experience


Homepage order: Hero → Featured Projects → Skills → Experience → About → Contact. Featured projects are manually selected and ordered in the admin workspace. Follow the featured grid with “Explore All Projects.”

Project library: searchable and filterable, with nine projects per page by default; three columns on wide desktop, two on tablet/smaller desktop, and one on narrow mobile. Cards show a cover image, title, concise summary, lifecycle status where relevant, up to three prioritized technology badges plus “+N more,” and a subtle action arrow. Whole cards are clickable.

Search is case-insensitive and partial, supports multi-word matching across searchable fields, sensible punctuation normalization while preserving meaningful technology names, accent-insensitive comparison, common singular/plural variants, and limited typo tolerance. Search ranking prioritizes exact title, then title/technology, then summary/descriptive content. Search debounce is 250 ms. URL query parameters preserve search, filters, sorting, and pagination.

Filters combine using OR within one filter group and AND across different groups. Active filters appear as removable chips; include Clear all, a result count, current range, and a helpful empty state. Do not silently broaden a failed search.

Project detail pages tell a guided technical story: problem, solution, architecture, implementation, contribution/ownership, results/evaluation where evidence exists, trade-offs, lessons learned, and optional future improvements. Include related projects, previous/next navigation, share/copy-link, a sticky section navigation for longer pages, reading progress, and active-section highlighting.

Public content may include verified repository, demo, video, documentation, and case-study PDF links. Hide unavailable resources. External links open safely in a new tab. Video embeds are limited to validated YouTube and Vimeo URLs; arbitrary iframe HTML is not accepted.

Homepage sections: skills grouped by AI/ML, Generative & Agentic AI, Backend, Frontend, Data & Databases, and Cloud & DevOps; experience timeline with verified dates and concise responsibilities; authentic About story; secure contact form; resume PDF download; minimal professional footer.


## Implementation notes


Keep the public experience concise at the top and progressively reveal technical depth on project detail pages.

Do not show missing links as broken buttons; hide unavailable resources or explain their absence.


# 4. Visual Design, Motion & Responsive Behaviour


Public visual system: dark theme by default, electric cyan and cool blue accents, modern sans-serif typography with restrained monospace accents, premium depth/glow, and editorial project cards. Exact color tokens, fonts, spacing scale, and line-height values remain implementation details to be validated against contrast and readability.

Hero motion: CSS/SVG robotics-inspired visuals such as a subtle robotic arm or robot motif, autonomous navigation paths, moving nodes, and wireframe particles. Motion should feel alive but remain secondary to the headline and calls to action. Avoid full real-time 3D in the initial release.

Use static fallbacks, system reduced-motion support, and an optional manual motion override. Reduce or disable nonessential robotics motion, parallax, and smooth scrolling when requested. On mobile, reduce visual complexity and preserve performance.

Project cards use consistent 16:9-style cover frames, top-corner image rounding, a slightly lighter dark surface, fine neutral border, soft shadow, and restrained cyan/blue hover/focus glow. Hover lift is approximately 3–5 px; cover zoom approximately 1.03×; transitions about 180–240 ms. Touch interaction uses subtle surface brightening without scale or navigation delay.

Keyboard focus must remain obvious: a 2 px high-contrast cyan/blue outline with a small outer gap and radius aligned to the card. Do not let hover effects replace focus indication. On keyboard activation, focus the destination project heading; returning to the library restores the prior card when possible. Pagination moves focus to the updated results heading; search keeps focus in the input and announces result counts accessibly.

Responsive behaviour includes a compact mobile header with an accessible slide-out drawer, natural badge wrapping, reserved image dimensions, skeleton placeholders, and no horizontal overflow.


# 5. Technical Architecture & Deployment


APPROVED BASELINE: one Next.js full-stack application for the public website, private admin dashboard, project management, and server-side operations. Do not add a separate FastAPI service unless future requirements justify it.

Database: Supabase PostgreSQL as the authoritative structured data store. Authentication: Supabase Auth for private admin access, with no public registration. Enforce authorization server-side and with Row Level Security; public users may access only published content.

Assets: Supabase Storage for architecture diagrams, covers, screenshots, approved PDFs, and related media. Separate storage policies by asset purpose. Validate uploads, restrict file types/sizes/dimensions, and ensure only admins can upload or modify assets. Public users can view only assets intended for published content.

Hosting: Vercel. Expected workflow is GitHub-connected source control, preview deployments, verified production releases, and secure environment variables. No account setup or deployment is implied by this book.

Styling: Tailwind CSS with reusable components and design tokens; accessible component primitives such as shadcn/ui may be used where useful. Public site is futuristic and brand-forward; admin UI is neutral, restrained, and usability-first.

Search: PostgreSQL-native indexed search across titles, summaries, technologies, and selected descriptive fields, with relevance ranking, category/technology filters, pagination, and public-only access rules. Add indexes based on measured query patterns and execution plans.

Use efficient database access and Supabase-supported connection pooling appropriate to a serverless Next.js runtime. Use bounded resource usage, sensible timeouts, query measurement, and version-controlled migrations. Test migrations in preview/staging, back up important data before risky production changes, and plan recovery.

Image handling: generate optimized responsive variants while preserving high-resolution originals for architecture zoom/download. Prioritize profile/hero assets, lazy-load below-the-fold media, reserve dimensions to reduce layout shift, and provide branded fallbacks for failed images.


## Implementation notes


Never rely on client-side hiding alone for private content. Enforce access in server handlers, database policies, and storage policies.

Preserve the published revision while a new draft is being edited or reviewed.


# 6. Private Admin Workspace & Content Governance


Admin dashboard overview focuses on pending inquiries, recent messages, project publication status, and quick actions: Add Project, Manage Projects, Update Resume. Project list supports search, sorting, status filters, pagination when needed, and columns for title/category/status/last updated/actions.

Authentication requires password plus MFA, rate limiting, security logging, secure recovery, protected cookies, session validation, inactivity timeout, and clear sign-out. MFA should support authenticator apps (TOTP) and passkeys/security keys, with carefully controlled recovery. Password reset uses time-limited single-use links to the verified admin email and invalidates existing sessions after reset.

Project content is managed through a structured form and section-based editor: Overview, Technical Details, Architecture, Media, Results, and SEO. Required-field validation gives clear guidance; incomplete drafts are allowed.

Publication workflow: Draft → Preview → Publish. Drafts remain private. Editing a published project creates a separate draft revision; the currently published version stays live until the new draft has been previewed, validated, and explicitly republished.

Every published project requires an architecture image. Upload validation checks actual file type, approved format, size/dimensions, and preview. Optimized display versions are generated while the original high-resolution diagram is retained. Image replacement validates and uploads the new asset before updating the project reference; old assets are cleaned only when safe and not needed elsewhere or for recovery.

Project deletion is soft deletion into a private Trash. The item immediately disappears from public pages; admins may restore it or permanently delete it after confirmation. Project slugs are readable and unique; title changes must not break old links, and prior published slugs redirect safely.

Audit logs record authentication events, project edits/publication changes, resume replacements, inquiry status changes, settings changes, timestamps, and action summaries. Logs are access-controlled and must exclude secrets and sensitive content. Retention duration remains open for policy review.

Contact inquiries are validated and stored in a private admin inbox. Immediate email notification is attempted, but email delivery failure must never lose the inquiry. Inbox statuses: New, In Progress, Resolved. Admins can search/filter inquiries, review details, and add private follow-up notes.


# 7. Project Evidence, Media & Accessibility


Project lifecycle statuses are limited to Completed, In Progress, Prototype, and Archived. Publication does not imply production readiness. Avoid generic beginner/intermediate/advanced labels and numeric complexity ratings; show technical depth through architecture, integrations, evaluation, security, scalability, and trade-offs.

Every project includes a truthful contribution statement: role, personally implemented components, responsibilities, team/collaborator contributions, and whether the work was solo, collaborative, hackathon, freelance, or another context. Do not exaggerate ownership.

Results must be evidence-first. Separate measured outcomes from qualitative observations and expected value. Include evaluation methodology, datasets/test cases, metrics, limitations, and testing gaps only where known. Do not invent benchmark scores or claim tests were performed if they were not.

Architecture diagrams must be accessible. Admin supplies meaningful alt text, captions, and descriptions. Informative images need meaningful descriptions; decorative images may use empty alt text. Complex diagrams should have a textual explanation of key components and relationships.

Project screenshots use a responsive gallery/lightbox with navigation and optional captions. Architecture diagrams have a dedicated zoom/pan viewer, fitted-view reset, and original download. Code blocks support syntax highlighting, language labels, copy action, and responsive layout. Rich text uses controlled formatting rather than arbitrary HTML.

Accessibility target: WCAG 2.2 AA. Include logical keyboard order, visible focus, Enter/Space activation, Escape to close overlays, accessible menus/dialogs, skip-to-content, keyboard-operable filters/gallery/diagram viewer, and managed focus transitions. Test with automated checks and manual keyboard/assistive-technology review. Do not claim conformance without actual evaluation.


# 8. Security, Privacy, Reliability & Operations


Security is layered: server-side authorization, Supabase RLS, private admin-only uploads, input validation, upload inspection, rate limits, spam controls, secure session handling, dependency/secret scanning, authorization tests, database-policy tests, and pre-release security review.

Contact protection combines server validation, rate limiting, honeypot, and conditional challenge when appropriate. Show success only after the server confirms receipt. If a request fails, show a clear error and retry option where appropriate; never claim an operation succeeded without confirmation.

Privacy-first analytics: collect minimal useful engagement events and avoid nonessential tracking. Provide a privacy notice explaining actual data processing and consent controls if optional tracking/cookies are introduced. Error monitoring should avoid passwords, tokens, private inquiry content, and sensitive data.

Operational resilience includes graceful network-failure handling, bounded retries for transient errors, public uptime checks, alerts for confirmed outages/recovery, incident severity levels, investigation, containment, controlled rollback/recovery, verification, communication, and post-incident review.

Release process: preview environment, required automated checks, critical workflow review, explicit production approval, deployment, and post-deployment verification. Database migrations are version-controlled and tested before production.

Backup/recovery: keep independent backups of database data and assets; define encryption, retention, schedule, recovery objectives, and restore-test cadence before production. Git history is part of code recovery but does not replace data/asset backups.

Performance targets for Core Web Vitals at the 75th percentile when sufficient field data exists: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Use lab tests before field data is sufficient and label evidence honestly. Support current and previous major browser versions, with periodic review.


## Implementation notes


The PDF is a technical communication artifact, not proof of independent certification or production readiness.

All generated content remains a draft until an authorized admin approves the exact version.


# 9. Technical Case-Study PDF System: Purpose & Content


The site may provide optional downloadable technical case-study PDFs for selected projects. Admin uploads or approves the source material; PDFs appear publicly only when an approved version is available. Direct download and browser preview are both supported where practical.

Two audience styles: a concise outcome-focused recruiter version and a deeper technical-reviewer version. Both share verified facts but adapt optional sections to the audience. Public filenames follow the project slug and audience style, e.g. `agentic-rag-platform-recruiter.pdf` and `agentic-rag-platform-technical.pdf`.

Design: minimal branded cover with title, subtitle, owner identity/monogram, suitable project visual, version/date; branded dark cover and clean light content pages; readable sans-serif body text, consistent heading hierarchy, monospace code, comfortable line spacing, readable tables, restrained cyan/blue accents, and adaptive headers/footers.

Longer PDFs include clickable table of contents and hierarchical bookmarks. Architecture diagrams appear near relevant explanation and in a larger view where useful. Wide diagrams/tables may use landscape pages when necessary. Figures are numbered with meaningful captions and narrative references. Non-obvious symbols receive contextual definitions; add a legend only when it helps.

Content is evidence-aware and context-sensitive. It may include: abstract/overview, problem and users, solution, architecture, component/dependency relationships, data flow, integrations, model/algorithm rationale, implementation, reproducibility checklist, evaluation methodology/results, tests, performance/scalability, security/privacy, responsible AI, accessibility, stakeholder workflows, deployment/operations, risks/trade-offs, lessons, contribution, maturity/readiness, impact/value, glossary, references, and future improvements.

Optional sections should be omitted when irrelevant or unsupported. Important missing evidence should be flagged for admin review; publication is blocked only for essential missing information or failed required checks. Clearly distinguish implemented, planned, optional, and unverified details.

PDFs may include selected approved code snippets and an appendix when useful, excluding secrets and private information. External sources that materially support claims receive clickable citations near claims and a concise reference section when appropriate. Further reading is separate from evidence references.

Include a concise evidence/limitations summary and context-specific AI-assistance disclosure only when AI materially assisted with document content, code, diagrams, or evaluation. Any human-review claim must be true. Include authorship/rights notice, verified resource links, a link to the public portfolio contact page, and professional metadata. Do not embed private contact details.

Accessibility checks before publication cover structure, heading hierarchy, selectable text, link labels, image descriptions, and basic contrast. These checks are not proof of full accessibility conformance. Target file size is ≤5 MB when practical; preserve essential diagram readability even if a file must be larger.


# 10. PDF Generation, Approval, Versioning & Recovery


Approved source content and relevant generation settings are captured in an immutable versioned snapshot for each published PDF. Later edits must not silently change the source for a historical version.

Generation produces a draft only. The system validates that the file opens, expected content is present, required images render, links and metadata are checked, page count is plausible, and file-size/accessibility checks run. Failures block publication until fixed or handled under an explicitly permitted and recorded exception.

Admin can compare the current published PDF and the new draft side by side where practical, with a concise change summary covering sections, figures, links, and metadata. Semantic content comparison is primary; visual/page-layout comparison is offered for high-impact layout changes. Additions, removals, and modifications are flagged.

Approval applies to the exact draft version. If that draft changes after review, its approval is invalidated and the new generated version must be reviewed. Keep draft previews and snapshots private until publication.

Replacement is atomic: validate and approve the new PDF, then switch the stable public URL to the new approved file. If switching fails, keep the prior published version active. After switching, verify the public URL. Public endpoints serve only explicitly approved published versions.

Keep the immediately previous published PDF and its snapshot available for a default 90-day recovery window, configurable by admin policy. Do not delete versions still required for audit, legal, or backup obligations. Authorized rollback verifies the target file before switching and records actor, timestamp, reason, and selected version in the private audit log.

Version IDs are immutable and separate from public filenames/URLs. Admin can see current public version and private history. Generation status and actionable failure messages are shown in the admin UI; detailed diagnostics remain private, exclude secrets/sensitive content, and allow bounded retries for transient failures.

Publication acceptance criteria: explicit authorized admin approval for the exact version; approved snapshot exists; required checks pass or a permitted exception is recorded; links/assets/metadata validated; file opens and is readable; publication switch succeeds; post-publication URL verified.

Hard rule: generation and validation may be automated, but publication, replacement, and rollback never happen automatically. They require an explicit authorized admin action.


## Implementation notes


A passing automated check is not equivalent to a complete manual accessibility or security audit.

A deployment is complete only after the live URL, assets, and critical workflows are verified.


# 11. SEO, Content Discovery & Sharing


SEO is generated automatically with optional manual overrides. Sitemap includes published projects only. Canonical detail URLs remain clean; query parameters are used for library state, not private data. Missing URLs and general errors use branded helpful pages with explanation, home/project links, and retry where appropriate.

Project dates or completion periods appear only when verified and meaningful. Publication/edit timestamps remain private. Resume is a direct PDF download managed through the private admin dashboard; only the current approved version is public.

Share action copies the project URL and uses native sharing when supported, with copy-link fallback and clear feedback. Do not add favorites, recently viewed sections, or project comparison in the current scope.


# 12. Testing, Release & Acceptance


Testing is layered: code quality/type checks, unit tests, integration tests, end-to-end tests for critical workflows, security checks, accessibility checks, responsive browser checks, and PDF-specific validation. Exact test frameworks and coverage thresholds remain open implementation choices.

Critical end-to-end workflows include: public project browsing/search/filtering; draft creation and preview; publication and safe edit revision; architecture image upload/replacement; resume replacement; contact submission and inbox storage; admin authentication/MFA; PDF generation, comparison, approval, replacement, and rollback.

Production release requires preview validation, required automated checks, explicit human approval, controlled deployment, and post-deployment verification. No untested claim should be presented as a completed quality result.

Definition of done for a feature: requirements traced to this book; permissions enforced; loading/empty/error/success states covered; responsive and keyboard interactions checked; data changes audited where required; privacy/security implications reviewed; tests added; documentation updated.


## Implementation notes


The decision register summarizes the approved direction; implementation-level values explicitly marked open must remain open until decided.

Do not treat recommendations as permission to expand scope.


# 13. Open Decisions & Implementation Boundaries


Do not silently invent exact font families, final hex tokens, detailed spacing values, database schema fields, retention policy durations beyond the stated PDF default, monitoring vendors, test frameworks, branch policy, backup provider/frequency, exact performance measurement tools, or production recovery objectives. These are open implementation-level choices.

Before production, explicitly finalize backup encryption/retention/schedule and restore testing; audit-log retention; repository visibility and branch protections; exact CI checks and test tooling; final design tokens; alert thresholds; incident contacts and communication procedures; data-retention/privacy wording; and applicable legal requirements.

Initial release excludes a separate FastAPI backend, full real-time 3D hero, public admin registration, automatic PDF publication, arbitrary HTML/iframe content, invented project metrics, and unsupported production-readiness claims.

Google Antigravity is the intended future development environment, not an implementation already performed. A later implementation agent should work from this book, preserve approved decisions, create a plan and testable milestones, and ask before changing architecture or scope.


# 14. Implementation Roadmap


Phase 1 — Foundation: repository and environment, Next.js app, Supabase project/schema/auth, RLS/storage policies, design tokens, base layout, preview workflow, migration strategy.

Phase 2 — Public portfolio: responsive hero, featured grid, project library, search/filter/sort/pagination, project detail pages, skills/experience/about/contact, resume download, SEO and error states.

Phase 3 — Admin and governance: secure login/MFA, dashboard, project CRUD and revisions, architecture image pipeline, media manager, resume manager, inquiry inbox, audit log, Trash and restore.

Phase 4 — Technical case-study PDFs: content model, recruiter/technical templates, versioned snapshots, generation, structural/accessibility checks, draft comparison, approval, stable URL publication, recovery and rollback.

Phase 5 — Quality hardening: automated/unit/integration/E2E tests, manual accessibility review, security review, browser/responsive testing, performance validation, backup/restore test, incident/monitoring setup.

Phase 6 — Release: verify all critical flows in preview, approve production release, deploy, verify live routes and assets, confirm backups and alerts, document operational handoff.

Prioritize correctness, evidence integrity, accessibility, security, and recovery before decorative polish. Release only what has actually been tested.


# 15. Decision Register & Governance Summary


The documented project has reached Decision 300 in the PDF-specific track. Decisions 1–286 cover the core website, public experience, admin workflows, visual behavior, search, accessibility, security, and the technical case-study PDF content system. Decisions 287–300 complete draft comparison, regeneration, validation, replacement, recovery, and explicit publication control.

Decision 287: side-by-side comparison with change summary. 288: semantic comparison first; visual comparison for high-impact layout changes. 289: regenerate from approved snapshots and recorded settings. 290: disclose missing dependencies; only perform labeled best-effort reconstruction with admin authorization. 291: validate drafts before approval. 292: atomic replacement with prior version kept live if switching fails. 293: default 90-day recovery window, subject to other obligations. 294: authorized rollback with audit trail. 295: approval bound to exact draft version and invalidated by changes. 296: actionable generation status and private diagnostics with bounded retries. 297: immutable version IDs, stable public URL. 298: private drafts/snapshots and published-only public access. 299: explicit publication acceptance checklist. 300: no automatic publication, replacement, or rollback.

Governance rule: the latest approved decision wins only when it is explicitly recorded. Recommendations are not approvals. Unknown facts stay unknown. The admin is the final publication authority. This book is a consolidated specification and should be version-controlled as the implementation evolves.


# Appendix A. Decision Register Summary (001–300)


The following register summarizes the complete 300-decision trail in grouped bands for quick navigation. The detailed chapters above explain the resulting requirements and operating rules. Decisions 287–300 are listed individually in the final band.

Decisions 001–010: Core platform and foundation: Next.js full-stack app; Supabase PostgreSQL; private Supabase Auth; protected storage; Vercel; Tailwind/reusable accessible components; premium futuristic hybrid theme; featured showcase plus searchable library; split hero; profile photo.

Decisions 011–020: Navigation and visual system: minimal sticky nav; editorial project cards; restrained glow/depth; guided project narratives; architecture diagram viewer; grouped technology badges; evidence-first results; Draft → Preview → Publish; admin dashboard workspace; structured validation with incomplete drafts allowed.

Decisions 021–030: Content management: safe readable slugs; database-driven content; responsive image optimization; SEO/sitemap; privacy-friendly analytics; secure contact form; transactional email notification; layered spam protection; admin-managed resume; professional experience timeline.

Decisions 031–040: Skills and homepage: categorized skills without arbitrary proficiency scores; projects-first homepage; manual featured ordering; authentic About; minimal footer; mobile drawer; dark theme; cyan/blue accents; sans-serif with monospace accents; CSS/SVG robotics animation.

Decisions 041–050: Motion and project library: ambient hero motion and fallback; subtle page transitions; separate covers and mandatory diagrams; layered backups; GitHub workflow; layered testing; WCAG 2.2 AA target; integrated security checks; optional verified repository links; text search plus category/technology filters.

Decisions 051–060: Search semantics and homepage sections: OR within filter groups/AND across groups; related projects and prev/next; consistent cover frames; clickable cards; hero headline; primary/secondary CTA; curated featured grid; homepage section order; grouped skills; verified experience timeline.

Decisions 061–070: Content/contact/admin overview: About story; inquiry-type contact form; direct resume PDF; verified LinkedIn/GitHub; professional footer; inline confirmed form success; durable inquiry storage plus email notification; inbox statuses/private notes; action-focused dashboard; neutral admin visual style.

Decisions 071–080: Admin workflow and project detail: searchable/sortable project table; separate draft revision for published edits; soft delete/Trash; secure sessions; password + MFA; TOTP/passkey support; secure reset; audit log; section-based editor; architecture zoom/pan viewer.

Decisions 081–090: Media and technical content: diagram upload validation; safe replacement; cover preview/crop; screenshot gallery/lightbox; optional video; YouTube/Vimeo only; safe external links; controlled rich-text editor; syntax-highlighted code blocks; sticky section navigation.

Decisions 091–100: Accessibility and evidence: reading progress/active section; skeleton loading; branded error pages; privacy-first tracking; English-first localization-ready architecture; stable slugs/redirects; verified project dates; categorized tech stacks; no simplistic complexity rating; explicit contribution statement.

Decisions 101–110: Lifecycle and quality: lifecycle statuses; context-aware resource links; share/copy link; meaningful image descriptions; keyboard accessibility; reduced-motion controls; self-hosted optimized fonts; progressive image loading; graceful network failures; Core Web Vitals targets.

Decisions 111–120: Operations and search engine: supported browser policy; privacy-conscious error monitoring; uptime checks; incident response; release approval; versioned DB migrations; connection pooling; measured query indexing; PostgreSQL-native indexed search; relevance-ranked search.

Decisions 121–130: Library state and layout: URL-synced search/filters/pagination; filter chips; numbered pagination; sorting options; result counts/ranges; nine projects per page; responsive 3/2/1 grid; balanced card content; cover/status presentation; status badge placement.

Decisions 131–140: Card information design: up to three prioritized technologies +N; 20–30-word summary; two-line title cap; action arrow; layered dark surface; 14–18 px corners; balanced spacing; consistent 16:9 cover; neutral skeleton; branded image fallback.

Decisions 141–150: Card interaction and surfaces: 3–5 px hover/focus lift; 180–240 ms transition; ease-out/ease-in; subtle glow; 1.03× image zoom; no overlay; seamless image/content transition; top-only image corner rounding; surface contrast; 1 px neutral border.

Decisions 151–160: Card layout and badges: subtle shadows; soft under-card shadow; left-aligned content; title→summary→technologies→arrow order; compact muted badges; official technology spelling; natural badge gaps; compact padding; 6–8 px badge corners; fine neutral border.

Decisions 161–170: Badge and grid details: 12–13 px badge text; medium weight; light-neutral text; dark-neutral background; badges stable on hover; +N more badge; mobile wrapping; balanced grid row heights; flexible lower metadata alignment; arrow bottom-right.

Decisions 171–180: Arrow styling: uncontained right arrow; muted rest/cyan hover; 3–4 px movement; 16–18 px size; 1.75–2 px stroke; simple shaft/head; ease-out; smooth return; immediate start on hover/focus; coordinated timing.

Decisions 181–190: Touch and focus: static arrow on touch; subtle pressed brightening; 100–140 ms pressed cue; low intensity; quick restoration; 2 px focus outline; matching radius; 2 px gap; electric cyan/blue focus token; hover never hides focus.

Decisions 191–200: Focus and announcements: retain focus outline during hover; keyboard-aware focus styling; touch focus handling; move outline immediately between focused cards; remove on blur; focus project heading after activation; restore library focus/state; focus results heading after pagination; keep search focus; announce counts after a short pause.

Decisions 201–210: Search behavior: 250 ms debounce; search from first character; empty input restores library; case-insensitive partial matching; all query words must match across searchable fields; normalize punctuation carefully; accent-insensitive matching; common singular/plural matching; limited typo tolerance; relevance-first ranking and honest empty state.

Decisions 211–220: Search extras and PDF foundation: subtle term highlighting; session-only search history; no favorites; no recently viewed; no project comparison; evidence-based takeaways; optional future improvements; existing lifecycle statuses only; optional technical case-study PDFs; draft PDF generation with admin approval.

Decisions 221–230: PDF content and audience: architecture diagrams in narrative and enlarged view; evidence-aware missing information; keep current PDF live until approved replacement; version/date and truthful review status; verified clickable links; adaptive TOC; approved code snippets; evaluation evidence; reviewed glossary; recruiter and technical PDF styles.

Decisions 231–240: PDF visual design and delivery: branded cover; dark cover/light content; adaptive headers/footers; readable typography; adaptive portrait/landscape; admin captions/descriptions; external-link validation; stable audience-specific filenames; public published downloads only; direct download plus browser preview.

Decisions 241–250: PDF identity and references: stable public URLs; accessibility checks; ≤5 MB target where practical; standard metadata; rights/reuse notice; contact-page link; public version/date; context-specific AI disclosure; claim-level citations and references; reviewed glossary of abbreviations.

Decisions 251–260: PDF evidence quality: evidence/limitations summary; bookmarks/TOC for longer docs; contextual architecture legend; reproducibility checklist; numbered figures/captions; verified datasets/models/benchmarks context; evidence-backed timeline; risks and trade-offs; truthful deployment/operations status; security/privacy summary.

Decisions 261–270: PDF system and model evidence: integration overview; end-to-end data flow; model/algorithm rationale; evaluation methodology; verified model identifiers/parameters; environment summary; data provenance; testing summary; performance/scalability; responsible-AI safeguards.

Decisions 271–280: PDF inclusive engineering and decision history: accessibility evidence; change impact; engineering reflections; contribution summary; maturity/readiness; impact/value; stakeholder workflows; architecture decisions/rationale; component/dependency diagram when useful; unified glossary.

Decisions 281–286: PDF diagram and quality governance: verified architecture revision/version; contextual symbol definitions; evidence vs further reading; automated structural/link/format/metadata checks plus admin review; private approval record; immutable approved-source snapshot and generation settings.

Decisions 287–300: Final PDF lifecycle: side-by-side comparison; semantic-first diff; snapshot-based regeneration; honest missing-dependency handling; pre-approval validation; atomic replacement; 90-day default recovery; audited rollback; approval invalidation after edits; generation status/private diagnostics; immutable version IDs; private drafts; publication acceptance checklist; no automatic publication/replacement/rollback.


## Decisions 287–300: Final PDF Lifecycle Decisions


Decision 287 — Side-by-side preview of the current published PDF and new draft where practical, plus a concise change summary for sections, figures, links, and metadata. Replacement requires explicit approval.

Decision 288 — Semantic content comparison is primary; offer visual/page-layout comparison for high-impact layout changes. Flag additions, removals, and modifications without overwhelming routine reviews.

Decision 289 — Regenerate from the approved versioned content snapshot and recorded generation settings, not from the latest editable project state.

Decision 290 — If historical templates, assets, or dependencies are missing, disclose the limitation. A clearly labeled best-effort reconstruction requires admin authorization.

Decision 291 — Validate the generated draft before approval: file opens, expected content exists, links/metadata are checked, required images render, page count is plausible, and file-size/accessibility checks run. Failures block publication unless a permitted exception is recorded.

Decision 292 — Publish replacements atomically. Validate and approve first, then switch the stable public URL. If switching fails, keep the prior published version active.

Decision 293 — Keep the immediately previous published PDF and snapshot for a default 90-day recovery window, configurable by policy; do not delete versions still needed for audit, legal, or backup obligations.

Decision 294 — Authorized rollback verifies the target file before switching and records actor, timestamp, reason, and selected version in the private audit log.

Decision 295 — Approval applies to the exact reviewed draft. Any subsequent draft change invalidates that approval and requires review of the newly generated version.

Decision 296 — Show generation status and actionable errors in admin. Keep diagnostics private, exclude secrets/sensitive content, use bounded retries for transient failures, and never mark failed generation successful.

Decision 297 — Version identifiers are immutable and separate from public filenames/URLs. Admin sees the current public version and private history; public project/audience URL remains stable.

Decision 298 — Draft previews and snapshots remain private until publication. Public endpoints serve only explicitly approved, published versions and never expose private review notes.

Decision 299 — Publication requires exact-version approval, preserved snapshot, passed required checks or recorded permitted exception, validated assets/links/metadata, readable file, successful URL switch, and post-publication verification.

Decision 300 — Generation and validation may be automated; publication, replacement, and rollback always require an explicit authorized admin action.


# Appendix B. Implementation Readiness Checklist


☐ Confirm the owner-provided identity, profile photo, resume, verified links, and approved project inventory.

☐ Create repository and environment configuration; keep secrets out of source control.

☐ Set up Next.js, Supabase, Vercel preview flow, database migrations, RLS, and storage policies.

☐ Implement public layout, hero, project library, project detail template, skills, experience, About, contact, and resume delivery.

☐ Implement private admin authentication with MFA, secure recovery, session controls, and audit logging.

☐ Implement project drafts, previews, explicit publication, versioned edits, Trash/restore, and slug redirects.

☐ Implement validated architecture diagram upload, optimization, original retention, zoom/pan viewer, and accessible descriptions.

☐ Implement inquiry storage, email notification, inbox status workflow, and spam protection.

☐ Implement PDF content schema, audience templates, snapshot capture, generation, checks, comparison, approval, stable URL replacement, recovery, and rollback.

☐ Test security boundaries, keyboard/accessibility flows, mobile responsiveness, current supported browsers, error states, and critical end-to-end workflows.

☐ Set backup schedule/retention/encryption, test restore, configure monitoring/uptime alerts, and document incident response.

☐ Review the production release in preview, explicitly approve deployment, deploy, verify public routes/assets, and confirm operational controls.


# Final Operating Principles


Evidence over invention: unknown facts remain unknown.

Drafts are private; only explicitly approved content is public.

Security is enforced at the server, database, and storage layers.

Accessibility and reduced-motion behaviour are requirements, not polish.

Backups are not complete until restoration has been tested.

Automation may prepare and validate; an authorized human controls publication.

Never claim implementation, testing, deployment, certification, or outcomes that have not actually occurred.