import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Project } from '@/lib/types';
import Tilt3D from '@/components/ui/Tilt3D';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const visibleTechs = project.technologies.slice(0, 3);
  const remainingCount = project.technologies.length - visibleTechs.length;

  return (
    <Tilt3D className="h-full">
      <Link
        href={`/projects/${project.slug}`}
        className="group flex flex-col h-full bg-[#0D111A] border border-[#1C2536] hover:border-[#00F2FE]/60 rounded-[16px] overflow-hidden transition-all duration-200 hover:shadow-card-hover focus-visible:outline-2 focus-visible:outline-[#00F2FE]"
      >
        {/* 16:9 Cover Image Frame */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#07090E] border-b border-[#1C2536]">
          <Image
            src={project.cover_image_url}
            alt={`Screenshot or architecture for ${project.title}`}
            fill
            priority={priority}
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Tier / Category Badge overlay */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            {project.is_featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-[#00F2FE] text-[#07090E] shadow-sm">
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#07090E]/80 backdrop-blur-md border border-[#1C2536] text-gray-300">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5 space-y-3">
          {/* Title */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors line-clamp-1">
              {project.title}
            </h3>
            <span className="text-xs font-mono text-gray-500 shrink-0">
              {project.project_id}
            </span>
          </div>

          {/* 20-30 word Summary */}
          <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed flex-1">
            {project.short_summary}
          </p>

          {/* Footer: Tech badges & action arrow */}
          <div className="pt-3 border-t border-[#1C2536]/60 flex items-center justify-between gap-3">
            {/* Tech Badges */}
            <div className="flex flex-wrap items-center gap-1.5 overflow-hidden">
              {visibleTechs.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded-[6px] text-[11px] font-mono text-gray-300 bg-[#121824] border border-[#1C2536]"
                >
                  {tech}
                </span>
              ))}
              {remainingCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono text-gray-500">
                  +{remainingCount}
                </span>
              )}
            </div>

            {/* Action Arrow (Moves 3-4px on hover) */}
            <div className="shrink-0 text-gray-500 group-hover:text-[#00F2FE] group-hover:translate-x-1 transition-all duration-200">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </Tilt3D>
  );
}
