import { Project, SkillCategory, ExperienceItem } from '../types';
import portfolioData from '../../docs/audit/verified_portfolio_data.json';
import { createClient } from '@supabase/supabase-js';
import { getLocalDrafts } from './draftsStore';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '';

const getSupabase = () => {
  if (!supabaseUrl || !supabaseKey) return null;
  try {
    return createClient(supabaseUrl, supabaseKey);
  } catch {
    return null;
  }
};

export async function getAdminProjects(): Promise<Project[]> {
  const supabase = getSupabase();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as Project[];
      }
    } catch {}
  }

  // Load verified local data
  const baseProjects = portfolioData as unknown as Project[];

  // Load local drafts
  let drafts: Project[] = [];
  try {
    drafts = getLocalDrafts();
  } catch {}

  // Combine drafts with baseProjects: drafts take precedence if matching ID or slug
  const merged = [...drafts];
  for (const p of baseProjects) {
    if (!merged.some((d) => d.project_id === p.project_id || d.slug === p.slug)) {
      merged.push(p);
    }
  }

  return merged;
}

export async function getAllProjects(): Promise<Project[]> {
  const all = await getAdminProjects();
  return all.filter((p) => p.status === 'published');
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const all = await getAllProjects();
  return all
    .filter((p) => p.is_featured)
    .sort((a, b) => a.featured_order - b.featured_order);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const all = await getAdminProjects();
  const match = all.find(
    (p) =>
      p.slug.toLowerCase() === slug.toLowerCase() ||
      p.project_id.toLowerCase() === slug.toLowerCase()
  );
  return match || null;
}

export async function getRelatedProjects(currentSlug: string, category: string, limit = 3): Promise<Project[]> {
  const all = await getAllProjects();
  return all
    .filter((p) => p.slug !== currentSlug && (p.category === category || p.is_featured))
    .slice(0, limit);
}

// Verified Skills
export const verifiedSkills: SkillCategory[] = [
  {
    category: 'Generative AI & Agentic AI',
    skills: [
      { name: 'LangChain', highlighted: true },
      { name: 'LangGraph', highlighted: true },
      { name: 'CrewAI', highlighted: true },
      { name: 'DeepAgents', highlighted: true },
      { name: 'RAG Architectures', highlighted: true },
      { name: 'AGNO Framework' },
      { name: 'Prompt Engineering' },
      { name: 'Ollama & LiteLLM' },
      { name: 'Hugging Face' },
      { name: 'LLM Fine-Tuning (LoRA / QLoRA)' },
    ],
  },
  {
    category: 'Machine Learning & Deep Learning',
    skills: [
      { name: 'TensorFlow', highlighted: true },
      { name: 'PyTorch' },
      { name: 'Scikit-Learn', highlighted: true },
      { name: 'OpenCV' },
      { name: 'YOLOv11 Object Detection' },
      { name: 'InsightFace' },
      { name: 'Data Preprocessing & Feature Engineering' },
      { name: 'Model Evaluation & Validation' },
    ],
  },
  {
    category: 'MLOps, Cloud & DevOps',
    skills: [
      { name: 'MLflow (Experiment Tracking)', highlighted: true },
      { name: 'DVC (Data Version Control)', highlighted: true },
      { name: 'DagsHub' },
      { name: 'AWS Deployment (EC2, S3)' },
      { name: 'Docker' },
      { name: 'GitHub Actions & CI/CD Pipelines' },
      { name: 'Git & Version Control' },
    ],
  },
  {
    category: 'Databases & Storage',
    skills: [
      { name: 'PostgreSQL / Supabase', highlighted: true },
      { name: 'Vector Databases (Chroma, Pinecone, FAISS)', highlighted: true },
      { name: 'MySQL' },
      { name: 'MongoDB' },
    ],
  },
  {
    category: 'Deployment & Web Technologies',
    skills: [
      { name: 'FastAPI', highlighted: true },
      { name: 'Streamlit', highlighted: true },
      { name: 'Next.js & React' },
      { name: 'Tailwind CSS' },
      { name: 'Flask' },
      { name: 'Gradio' },
    ],
  },
  {
    category: 'Programming & Problem Solving',
    skills: [
      { name: 'Python (Primary)', highlighted: true },
      { name: 'SQL', highlighted: true },
      { name: 'Data Structures & Algorithms' },
      { name: 'LeetCode 50+ Badge', highlighted: true },
      { name: 'TypeScript / JavaScript' },
    ],
  },
];

// Verified Experience & Education
export const verifiedExperience: ExperienceItem[] = [
  {
    id: 'exp-1',
    type: 'experience',
    title: 'Freelance Generative AI Engineer',
    organization: 'Self-Employed',
    location: 'Remote',
    period_start: 'Nov 2024',
    period_end: 'Present',
    is_current: true,
    description: 'Engineering and deploying production Generative AI, RAG, and Agentic AI applications for clients.',
    bullets: [
      'Built and deployed end-to-end multi-agent systems using LangChain, LangGraph, OpenCV, FastAPI, and AWS.',
      'Developed commercial gym attendance system using InsightFace for real-time facial recognition member check-in in active commercial use.',
      'Designed vector search pipelines and prompt evaluation guardrails for enterprise inquiries.',
    ],
    badge: 'Current Role',
  },
  {
    id: 'exp-2',
    type: 'experience',
    title: 'Founder & AI Instructor',
    organization: 'Tech Academy (Online AI Platform)',
    location: 'Online',
    period_start: '2024',
    period_end: 'Present',
    is_current: true,
    description: 'Founded an online AI learning platform providing practical training in AI, Machine Learning, and Agentic workflows.',
    bullets: [
      'Authored hands-on instructional curricula in modern Generative AI, LangChain, and Agentic system design.',
      'Mentored aspiring developers and students in practical AI engineering and deployment workflows.',
    ],
  },
  {
    id: 'ach-1',
    type: 'achievement',
    title: '1st Place Winner — AI/ML 24-Hour Hackathon',
    organization: 'Bannari Amman Institute of Technology',
    location: 'Sathyamangalam, Tamil Nadu',
    period_start: 'Feb 2025',
    description: 'Secured 1st Place for architecting TruthGuard, an agentic AI system for real-time fake news and misinformation detection.',
    bullets: [
      'Engineered an autonomous verification agent using LangChain, deployed via GitHub CI/CD to AWS.',
      'Integrated multimodal verification heuristics and live web search validation.',
    ],
    badge: '1st Place Winner',
  },
  {
    id: 'edu-1',
    type: 'education',
    title: 'B.Tech in Artificial Intelligence & Data Science',
    organization: 'Chettinad College of Engineering and Technology',
    location: 'Karur, Tamil Nadu',
    period_start: 'Sep 2023',
    period_end: 'May 2027',
    is_current: true,
    description: 'Specialized undergraduate degree in AI architectures, Machine Learning, and Data Science systems.',
    bullets: [
      'Current Cumulative Grade Point Average (CGPA): 8.23 / 10.0',
      'Completed and documented 120+ AI projects streak across Generative AI, Agentic AI, and RAG in 2025.',
      'Earned LeetCode 50+ Badge demonstrating consistency in algorithmic problem solving.',
    ],
    badge: 'CGPA: 8.23',
  },
  {
    id: 'cert-1',
    type: 'certification',
    title: 'Artificial Intelligence Internship (3 Months) & Computer Vision Track',
    organization: 'Pantech.ai',
    period_start: '2024',
    bullets: ['Hands-on training in OpenCV, CNN architectures, and computer vision deployment.'],
  },
  {
    id: 'cert-2',
    type: 'certification',
    title: 'Complete Data Science Bootcamp & Generative AI with Hugging Face',
    organization: 'Udemy (Krish Naik)',
    period_start: '2024',
    bullets: ['Comprehensive mastery of statistics, ML algorithms, MLOps, and Hugging Face transformer models.'],
  },
];
