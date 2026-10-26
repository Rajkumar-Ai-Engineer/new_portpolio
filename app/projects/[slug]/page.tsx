import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug, getRelatedProjects } from '@/lib/data/projects';
import ArchitectureViewer from '@/components/projects/ArchitectureViewer';
import ShareButton from '@/components/projects/ShareButton';
import ProjectCard from '@/components/projects/ProjectCard';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Layers,
  Terminal,
  AlertTriangle,
  Sparkles,
  GitPullRequest,
  CheckCircle,
} from 'lucide-react';
import type { Metadata } from 'next';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} | Rajkumar V. — AI Systems Builder`,
    description: project.short_summary,
    openGraph: {
      title: `${project.title} — AI Architecture Case Study`,
      description: project.short_summary,
      images: [project.cover_image_url],
    },
  };
}

export const revalidate = 3600;

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(project.slug, project.category, 3);

  return (
    <div className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Top Back Navigation & Action Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-[#1C2536] pb-4">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#00F2FE] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Project Library</span>
        </Link>

        <div className="flex items-center gap-3">
          <ShareButton title={project.title} />

          {project.repository_url && (
            <a
              href={project.repository_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Inspect Code</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </a>
          )}
        </div>
      </div>

      {/* Project Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
          <span className="px-2.5 py-0.5 rounded bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30 font-semibold">
            {project.category}
          </span>
          <span className="px-2 py-0.5 rounded bg-[#121824] border border-[#1C2536] text-gray-400">
            {project.project_id}
          </span>
          {project.year && (
            <span className="px-2 py-0.5 rounded bg-[#121824] border border-[#1C2536] text-gray-400">
              Year: {project.year}
            </span>
          )}
          <span className="px-2 py-0.5 rounded bg-[#121824] border border-[#1C2536] text-emerald-400">
            Status: {project.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl">
          {project.short_summary}
        </p>

        {/* Technology Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-[6px] text-xs font-mono text-gray-300 bg-[#0D111A] border border-[#1C2536]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Problem Statement Card */}
      <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider">
          <AlertTriangle className="w-4 h-4" />
          <span>The Problem & Engineering Challenge</span>
        </div>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {project.problem_statement}
        </p>
      </div>

      {/* Solution Narrative */}
      <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#00F2FE] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Implemented Architecture Solution</span>
        </div>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {project.solution_narrative}
        </p>
      </div>

      {/* Verified Interactive Architecture Diagram Viewer */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
          <Layers className="w-4 h-4 text-[#00F2FE]" />
          <span>System Topology & Component Diagram</span>
        </div>

        <ArchitectureViewer
          imageUrl={project.architecture_image_url}
          altText={`Architecture diagram for ${project.title}`}
          title={project.title}
        />
      </div>

      {/* End-to-End Data Flow */}
      <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#2D7FF9] uppercase tracking-wider">
          <GitPullRequest className="w-4 h-4" />
          <span>End-to-End Execution Flow</span>
        </div>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-mono text-xs sm:text-sm bg-[#07090E] p-4 rounded-lg border border-[#1C2536]">
          {project.data_flow}
        </p>
      </div>

      {/* Verified Outputs & Evaluation */}
      <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <CheckCircle className="w-4 h-4" />
          <span>Verified Evaluation & Results</span>
        </div>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {project.evaluation_results}
        </p>
      </div>

      {/* Engineering Limitations & Future Proposals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-2">
          <h3 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
            Limitations & Boundaries
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            {project.limitations}
          </p>
        </div>

        <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-2">
          <h3 className="text-xs font-mono font-semibold text-gray-400 uppercase tracking-wider">
            Proposed Future Improvements
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            {project.future_work}
          </p>
        </div>
      </div>

      {/* Related Projects */}
      {related.length > 0 && (
        <div className="pt-12 border-t border-[#1C2536] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Related Systems in {project.category}
            </h2>
            <Link
              href="/projects"
              className="text-xs font-mono text-[#00F2FE] hover:underline"
            >
              View all 34 projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rel) => (
              <ProjectCard key={rel.project_id} project={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
