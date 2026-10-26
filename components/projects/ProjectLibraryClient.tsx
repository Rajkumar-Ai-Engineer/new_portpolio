'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';
import SearchBar from './SearchBar';
import FilterBar from './FilterBar';
import EmptyState from './EmptyState';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectLibraryClientProps {
  initialProjects: Project[];
}

export default function ProjectLibraryClient({ initialProjects }: ProjectLibraryClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const libraryTopRef = useRef<HTMLDivElement | null>(null);

  const ITEMS_PER_PAGE = 9;

  // Extract unique categories and tech stacks
  const categories = useMemo(() => {
    const set = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [initialProjects]);

  const availableTechs = useMemo(() => {
    const countMap: Record<string, number> = {};
    initialProjects.forEach((p) => {
      p.technologies.forEach((t) => {
        countMap[t] = (countMap[t] || 0) + 1;
      });
    });
    return Object.keys(countMap).sort((a, b) => countMap[b] - countMap[a]);
  }, [initialProjects]);

  // Filter & Search Logic (Master Book Decisions 095, 201-210)
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // 1. Category Filter (Exact match)
      if (selectedCategory && project.category !== selectedCategory) {
        return false;
      }

      // 2. Technology Filter (Array contains)
      if (selectedTech && !project.technologies.includes(selectedTech)) {
        return false;
      }

      // 3. Search Query matching across searchable fields
      if (searchQuery.trim() !== '') {
        const queryWords = searchQuery.toLowerCase().trim().split(/\s+/);
        const searchableCorpus = `
          ${project.title} 
          ${project.short_summary} 
          ${project.problem_statement} 
          ${project.category} 
          ${project.technologies.join(' ')}
          ${project.project_id}
        `.toLowerCase();

        // All query words must match (AND matching across query words)
        const allWordsMatch = queryWords.every((word) => searchableCorpus.includes(word));
        if (!allWordsMatch) return false;
      }

      return true;
    });
  }, [initialProjects, selectedCategory, selectedTech, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE) || 1;

  // Ensure currentPage does not exceed totalPages if filtered results shrink
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  const handleResetAll = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedTech(null);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((cat: string | null) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  }, []);

  const handleTechChange = useCallback((tech: string | null) => {
    setSelectedTech(tech);
    setCurrentPage(1);
  }, []);

  const handleSearchChange = useCallback((q: string) => {
    setSearchQuery((prev) => {
      if (prev !== q) {
        setCurrentPage(1);
      }
      return q;
    });
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage) return;
      setCurrentPage(page);
      if (libraryTopRef.current) {
        libraryTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [currentPage]
  );

  return (
    <div ref={libraryTopRef} className="space-y-10 scroll-mt-28">
      {/* Search and Filters Header */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <SearchBar initialValue={searchQuery} onSearch={handleSearchChange} />
        </div>

        <FilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
          selectedTech={selectedTech}
          onSelectTech={handleTechChange}
          availableTechs={availableTechs}
          totalResults={filteredProjects.length}
          onResetAll={handleResetAll}
        />
      </div>

      {/* Grid or Empty State */}
      {filteredProjects.length === 0 ? (
        <EmptyState onReset={handleResetAll} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProjects.map((project) => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pt-8 border-t border-[#1C2536] flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-white hover:border-[#00F2FE]/50 disabled:opacity-30 disabled:hover:text-gray-300 disabled:hover:border-[#1C2536] disabled:cursor-not-allowed transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => handlePageChange(page)}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={`w-9 h-9 rounded-lg text-xs font-mono font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-[#00F2FE] text-[#07090E] shadow-[0_0_12px_rgba(0,242,254,0.35)]'
                        : 'bg-[#0D111A] text-gray-400 hover:text-white border border-[#1C2536] hover:border-[#00F2FE]/40'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-white hover:border-[#00F2FE]/50 disabled:opacity-30 disabled:hover:text-gray-300 disabled:hover:border-[#1C2536] disabled:cursor-not-allowed transition-all"
                aria-label="Next page"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
