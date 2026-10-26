-- ==============================================================================
-- Migration: 001_initial_schema.sql
-- Description: Core Schema for Rajkumar V. Personal AI Branding Website
-- Baseline: Master Book Decisions 001–300
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id VARCHAR(20) UNIQUE NOT NULL, -- e.g. 'P001'
    slug VARCHAR(120) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    short_summary TEXT NOT NULL,
    problem_statement TEXT,
    solution_narrative TEXT,
    data_flow TEXT,
    evaluation_results TEXT,
    limitations TEXT,
    future_work TEXT,
    category VARCHAR(60) NOT NULL,
    technologies TEXT[] NOT NULL DEFAULT '{}',
    status VARCHAR(30) NOT NULL DEFAULT 'published', -- 'draft', 'published', 'archived', 'trash'
    tier VARCHAR(30) NOT NULL DEFAULT 'Standard', -- 'Featured', 'Standard', 'Archive'
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    featured_order INT DEFAULT 999,
    year INT,
    repository_url TEXT,
    demo_url TEXT,
    documentation_url TEXT,
    cover_image_url TEXT,
    architecture_image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- Search Index on Projects
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON public.projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON public.projects(is_featured, featured_order);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_title_trgm ON public.projects USING gin (title gin_trgm_ops);

-- 2. Project Images Table
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    caption TEXT,
    image_type VARCHAR(40) NOT NULL DEFAULT 'screenshot', -- 'cover', 'architecture', 'screenshot', 'workflow'
    dimensions VARCHAR(30),
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_images_project_id ON public.project_images(project_id);

-- 3. Project Documents (Case-Study PDFs & Snapshots) Table
CREATE TABLE IF NOT EXISTS public.project_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    document_type VARCHAR(40) NOT NULL, -- 'recruiter_pdf', 'technical_pdf'
    version_id VARCHAR(50) NOT NULL, -- Immutable version string e.g. 'v1.0.0-snapshot-hash'
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    page_count INT,
    status VARCHAR(30) NOT NULL DEFAULT 'draft', -- 'draft', 'published', 'archived', 'superseded'
    approved_by VARCHAR(255),
    approved_at TIMESTAMPTZ,
    content_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
    validation_results JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_project_documents_project_id ON public.project_documents(project_id);
CREATE INDEX IF NOT EXISTS idx_project_documents_status ON public.project_documents(status);

-- 4. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(60) NOT NULL, -- 'AI/ML', 'Generative & Agentic AI', 'Deployment & CI/CD', etc.
    name VARCHAR(100) NOT NULL,
    badge_label VARCHAR(100),
    display_order INT DEFAULT 0,
    is_highlighted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Professional Experience & Education Table
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(30) NOT NULL, -- 'experience', 'education', 'achievement', 'certification'
    title VARCHAR(255) NOT NULL,
    organization VARCHAR(255) NOT NULL,
    location VARCHAR(120),
    period_start VARCHAR(50) NOT NULL,
    period_end VARCHAR(50),
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    bullets TEXT[] DEFAULT '{}',
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Resumes Management Table
CREATE TABLE IF NOT EXISTS public.resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version_label VARCHAR(60) NOT NULL,
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    is_active BOOLEAN NOT NULL DEFAULT FALSE,
    uploaded_by VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Contact Submissions Inbox Table
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_name VARCHAR(150) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    inquiry_type VARCHAR(60) NOT NULL DEFAULT 'General', -- 'Recruitment', 'Consulting / Freelance', 'Collaboration', 'General'
    message TEXT NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'New', -- 'New', 'In Progress', 'Resolved'
    private_notes TEXT,
    ip_hash VARCHAR(64),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON public.contact_submissions(status);

-- 8. Admin Audit Logs Table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL, -- 'PROJECT_PUBLISH', 'PDF_APPROVAL', 'RESUME_UPDATE', etc.
    entity_type VARCHAR(60) NOT NULL,
    entity_id VARCHAR(100),
    actor_email VARCHAR(255) NOT NULL,
    action_summary TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON public.admin_audit_logs(created_at DESC);
