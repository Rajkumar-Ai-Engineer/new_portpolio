import React from 'react';
import { getAllProjects } from '@/lib/data/projects';
import ProjectLibraryClient from '@/components/projects/ProjectLibraryClient';
import { Layers } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Library | Rajkumar V. — AI Systems Builder',
  description:
    'Search and filter all 34 verified AI engineering projects across Generative AI, LangGraph multi-agent architectures, Deep Learning, and MLOps.',
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE]">
          <Layers className="w-3.5 h-3.5" />
          <span>PORTFOLIO DIRECTORY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          AI Engineering Systems
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl">
          Browse, search, and inspect 34 verified projects covering autonomous agents, RAG architectures, computer vision, and end-to-end machine learning.
        </p>
      </div>

      {/* Interactive Library Client Component */}
      <ProjectLibraryClient initialProjects={projects} />
    </div>
  );
}
