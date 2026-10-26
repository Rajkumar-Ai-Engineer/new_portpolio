export type ProjectTier = 'Featured' | 'Standard' | 'Archive';
export type ProjectStatus = 'draft' | 'published' | 'archived' | 'trash';

export interface Project {
  id?: string;
  project_id: string; // e.g. 'P001'
  slug: string;
  title: string;
  short_summary: string;
  problem_statement: string;
  solution_narrative: string;
  data_flow: string;
  evaluation_results: string;
  limitations: string;
  future_work: string;
  category: string;
  technologies: string[];
  status: ProjectStatus;
  tier: ProjectTier;
  is_featured: boolean;
  featured_order: number;
  year?: number;
  repository_url?: string | null;
  demo_url?: string | null;
  documentation_url?: string | null;
  cover_image_url: string;
  architecture_image_url: string;
  created_at?: string;
  updated_at?: string;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; badge?: string; highlighted?: boolean }[];
}

export interface ExperienceItem {
  id: string;
  type: 'experience' | 'education' | 'achievement' | 'certification';
  title: string;
  organization: string;
  location?: string;
  period_start: string;
  period_end?: string;
  is_current?: boolean;
  description?: string;
  bullets?: string[];
  badge?: string;
}

export interface ContactSubmission {
  id?: string;
  sender_name: string;
  sender_email: string;
  inquiry_type: 'Recruitment' | 'Consulting / Freelance' | 'Collaboration' | 'General';
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  private_notes?: string;
  created_at?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  entity_type: string;
  entity_id?: string;
  actor_email: string;
  action_summary: string;
  metadata?: Record<string, any>;
  created_at: string;
}
