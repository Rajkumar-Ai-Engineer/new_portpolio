# Operational Runbook & Deployment Guide
## Rajkumar V. — Personal AI Branding Website & AI Systems Portfolio
*Baseline: Personal AI Branding Website Master Book (Decisions 001–300)*

---

## 1. System Architecture Summary

- **Frontend & Full-Stack Core:** Next.js 15+ App Router, TypeScript, React 19, Tailwind CSS.
- **Database:** Supabase PostgreSQL with strict Row Level Security (RLS).
- **Authentication:** Supabase Auth for private administrator access (no public registration).
- **Storage:** Supabase Storage (`project-assets` public bucket, `private-documents` admin bucket).
- **Hosting Target:** Vercel serverless platform.

---

## 2. Environment Variables Configuration

Copy `.env.example` to `.env.local` for local execution or configure in Vercel Project Settings:

| Variable Name | Environment | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Client & Server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client & Server | Public anonymous key for client queries |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Client & Server | Supabase publishable key |
| `SUPABASE_SECRET_KEY` | Server-Only | Service role key for admin operations, storage provisioning, and migrations |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | Canonical site URL (e.g. `https://rajkumar-ai.com`) |

> **Security Mandate:** Never prepend `NEXT_PUBLIC_` to `SUPABASE_SECRET_KEY`. Ensure all `.env*` files are excluded from Git version control.

---

## 3. Database Migration & Provisioning

Migrations are version-controlled in `supabase/migrations/`:

1. `001_initial_schema.sql`: Creates core tables (`projects`, `project_images`, `project_documents`, `skills`, `experience`, `resumes`, `contact_submissions`, `admin_audit_logs`).
2. `002_rls_policies.sql`: Enables RLS and establishes public read vs admin read/write policies.
3. `003_seed_data.sql`: Idempotent seed containing all 34 verified projects, categories, and technical assets.

### Running Migrations
- **Option A (Supabase Dashboard):** Open your Supabase project -> SQL Editor -> Paste and run each migration in numerical sequence (`001`, `002`, `003`).
- **Option B (Supabase CLI):**
  ```bash
  npx supabase db push
  ```

---

## 4. Supabase Storage Buckets

Storage buckets are configured via `scripts/setup_supabase_storage.js`:

- `project-assets` (Public read, max 10MB): Stores project screenshots, covers, and WebP architecture diagrams.
- `private-documents` (Private, max 20MB): Stores unapproved case-study PDF drafts and version snapshots.

---

## 5. Local Development & Production Verification

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Execute production build test
npm run build

# 4. Run local production server
npm run start
```

---

## 6. Case-Study PDF Governance & Rollback Procedure

- **Draft Generation:** Admin triggers draft generation from immutable snapshot in `/admin/pdf`.
- **Pre-Approval Checks:** Automated checks verify file rendering, architecture diagrams, page count, and accessibility.
- **Approval & Atomic Replacement:** Admin explicitly reviews the semantic diff and authorizes publication. The stable public URL (`/docs/case-studies/[slug]-[style].pdf`) is atomically updated.
- **Rollback:** In the event of a regression, the admin selects the prior version from the 90-day snapshot history and performs an audited rollback.

---

## 7. Incident Response & Disaster Recovery

1. **Database Failover / Data Corruption:** Restore from the latest automated Supabase point-in-time recovery (PITR) backup.
2. **Asset Recovery:** All original project diagrams and screenshots are versioned in `resources/project-images/` and can be re-synchronized via `scripts/setup_public_assets.py`.
3. **Rollback Production Deployment:** Use Vercel Instant Rollback to immediately restore the prior verified production deployment SHA.
