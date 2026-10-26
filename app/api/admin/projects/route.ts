import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth/adminAuth';
import { getAdminProjects } from '@/lib/data/projects';
import { saveLocalDraft, updateDraftStatus, deleteLocalDraft } from '@/lib/data/draftsStore';
import { Project } from '@/lib/types';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

// Helper to check admin authentication
function checkAuth(req: NextRequest): boolean {
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const session = verifyAdminToken(token);
  return !!session;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await getAdminProjects();
    return NextResponse.json({ success: true, projects });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body.title || !body.short_summary) {
      return NextResponse.json(
        { success: false, error: 'Title and short summary are required.' },
        { status: 400 }
      );
    }

    const allProjects = await getAdminProjects();

    // Auto-compute project ID if missing
    let projectId = body.project_id?.trim();
    if (!projectId) {
      const maxNum = allProjects.reduce((max, p) => {
        const match = p.project_id.match(/P(\d+)/i);
        if (match) {
          const num = parseInt(match[1], 10);
          return num > max ? num : max;
        }
        return max;
      }, 34);
      projectId = `P${String(maxNum + 1).padStart(3, '0')}`;
    }

    // Auto-compute slug
    let slug = body.slug?.trim();
    if (!slug) {
      const cleanTitle = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      slug = `${projectId.toLowerCase()}-${cleanTitle}`;
    }

    // Normalize technologies
    let techArray: string[] = [];
    if (Array.isArray(body.technologies)) {
      techArray = body.technologies;
    } else if (typeof body.technologies === 'string') {
      techArray = body.technologies
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean);
    }

    const newProject: Project = {
      project_id: projectId,
      slug,
      title: body.title.trim(),
      short_summary: body.short_summary.trim(),
      problem_statement: body.problem_statement?.trim() || 'Custom drafted AI engineering project.',
      solution_narrative: body.solution_narrative?.trim() || 'Architecture and implementation designed for enterprise scale.',
      data_flow: body.data_flow?.trim() || 'Input -> Verification -> Processing -> Output',
      evaluation_results: body.evaluation_results?.trim() || 'Verified in local development test harness.',
      limitations: body.limitations?.trim() || 'Draft revision under active engineering.',
      future_work: body.future_work?.trim() || 'Production deployment and benchmark scaling.',
      category: body.category || 'Agentic AI & LLMs',
      technologies: techArray.length > 0 ? techArray : ['Python', 'LangChain', 'FastAPI'],
      status: body.status || 'draft',
      tier: body.tier || 'Standard',
      is_featured: Boolean(body.is_featured),
      featured_order: body.is_featured ? 10 : 999,
      year: body.year ? parseInt(body.year, 10) : 2026,
      repository_url: body.repository_url?.trim() || null,
      demo_url: body.demo_url?.trim() || null,
      documentation_url: body.documentation_url?.trim() || null,
      cover_image_url: body.cover_image_url || '/images/projects/aegisai-system-overview.webp',
      architecture_image_url: body.architecture_image_url || '/images/projects/aegisai-system-overview.webp',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // 1. Save to Supabase if connected
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from('projects').upsert(newProject, { onConflict: 'project_id' });
      } catch (err) {
        console.warn('Supabase project upsert error:', err);
      }
    }

    // 2. Save to local durable drafts store
    const saved = saveLocalDraft(newProject);

    return NextResponse.json({
      success: true,
      message: `Project draft ${saved.project_id} saved successfully.`,
      project: saved,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { project_id, status } = await req.json();
    if (!project_id || !status) {
      return NextResponse.json(
        { success: false, error: 'project_id and status are required.' },
        { status: 400 }
      );
    }

    // 1. Supabase update if connected
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase
          .from('projects')
          .update({ status, updated_at: new Date().toISOString() })
          .eq('project_id', project_id);
      } catch (err) {
        console.warn('Supabase status update error:', err);
      }
    }

    // 2. Update local drafts store
    const updated = updateDraftStatus(project_id, status);

    return NextResponse.json({
      success: true,
      message: `Project ${project_id} status updated to ${status}.`,
      updated,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('project_id');

    if (!projectId) {
      return NextResponse.json(
        { success: false, error: 'project_id is required.' },
        { status: 400 }
      );
    }

    // 1. Supabase soft delete if connected
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase
          .from('projects')
          .update({ status: 'trash', updated_at: new Date().toISOString() })
          .eq('project_id', projectId);
      } catch (err) {
        console.warn('Supabase delete error:', err);
      }
    }

    // 2. Delete from local drafts
    deleteLocalDraft(projectId);

    return NextResponse.json({
      success: true,
      message: `Project ${projectId} removed.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
