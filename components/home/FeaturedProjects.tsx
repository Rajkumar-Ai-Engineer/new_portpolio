import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { Project } from '@/lib/types';
import ProjectCard from '@/components/projects/ProjectCard';

interface FeaturedProjectsProps {
  projects: Project[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section id="featured-projects" className="py-20 border-t border-[#1C2536] bg-[#07090E] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE]">
              <Layers className="w-3.5 h-3.5" />
              <span>CURATED CASE STUDIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured AI Systems
            </h2>
          </div>
          <p className="text-sm text-gray-400 max-w-md">
            Production-grade architectures, autonomous agent workflows, and verified machine learning systems built for real-world impact.
          </p>
        </div>

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.project_id} project={project} priority={idx < 3} />
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="pt-6 flex justify-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-[#0D111A] hover:bg-[#121824] hover:text-[#00F2FE] border border-[#1C2536] hover:border-[#00F2FE]/50 rounded-lg transition-all shadow-md group"
          >
            <span>Explore All 34 Projects</span>
            <ArrowRight className="w-4 h-4 text-[#00F2FE] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
