-- ==============================================================================
-- Migration: 002_rls_policies.sql
-- Description: Row Level Security (RLS) Policies for Public vs Admin Access
-- Baseline: Master Book Decisions 001–010, 133–140, 197–200, 298–300
-- ==============================================================================

-- 1. Enable RLS on all tables
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- 2. Projects Policies
-- Public: Can only read published projects
CREATE POLICY "Public can view published projects"
    ON public.projects
    FOR SELECT
    USING (status = 'published');

-- Admin: Full access for authenticated administrators
CREATE POLICY "Admin full access on projects"
    ON public.projects
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 3. Project Images Policies
-- Public: Can view images of published projects
CREATE POLICY "Public can view published project images"
    ON public.project_images
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            WHERE p.id = project_images.project_id AND p.status = 'published'
        )
    );

-- Admin: Full access on project images
CREATE POLICY "Admin full access on project images"
    ON public.project_images
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 4. Project Documents (PDFs) Policies
-- Public: Can only view explicitly approved published documents
CREATE POLICY "Public can view approved published documents"
    ON public.project_documents
    FOR SELECT
    USING (status = 'published');

-- Admin: Full access to all document drafts and snapshots
CREATE POLICY "Admin full access on project documents"
    ON public.project_documents
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 5. Skills Policies
-- Public: Can view all skills
CREATE POLICY "Public can view skills"
    ON public.skills
    FOR SELECT
    USING (true);

-- Admin: Full access on skills
CREATE POLICY "Admin full access on skills"
    ON public.skills
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Experience Policies
-- Public: Can view all experience entries
CREATE POLICY "Public can view experience"
    ON public.experience
    FOR SELECT
    USING (true);

-- Admin: Full access on experience
CREATE POLICY "Admin full access on experience"
    ON public.experience
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 7. Resumes Policies
-- Public: Can view active resume
CREATE POLICY "Public can view active resume"
    ON public.resumes
    FOR SELECT
    USING (is_active = true);

-- Admin: Full access on resumes
CREATE POLICY "Admin full access on resumes"
    ON public.resumes
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 8. Contact Submissions Policies
-- Public: Anyone can insert an inquiry (submission)
CREATE POLICY "Public can submit contact form"
    ON public.contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Admin: Only authenticated admins can read, update, or delete inquiries
CREATE POLICY "Admin can view and manage inquiries"
    ON public.contact_submissions
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 9. Admin Audit Logs Policies
-- Admin: Only authenticated admins can read and append audit logs
CREATE POLICY "Admin can view and create audit logs"
    ON public.admin_audit_logs
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);
