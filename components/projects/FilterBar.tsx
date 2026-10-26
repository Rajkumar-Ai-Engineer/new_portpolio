'use client';

import React from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
  availableTechs: string[];
  totalResults: number;
  onResetAll: () => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedTech,
  onSelectTech,
  availableTechs,
  totalResults,
  onResetAll,
}: FilterBarProps) {
  const hasActiveFilters = Boolean(selectedCategory || selectedTech);

  return (
    <div className="space-y-4">
      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
            selectedCategory === null
              ? 'bg-[#00F2FE] text-[#07090E] font-semibold shadow-sm'
              : 'bg-[#0D111A] text-gray-300 border border-[#1C2536] hover:border-gray-500'
          }`}
        >
          All Categories
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(selectedCategory === cat ? null : cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${
              selectedCategory === cat
                ? 'bg-[#00F2FE] text-[#07090E] font-semibold shadow-sm'
                : 'bg-[#0D111A] text-gray-300 border border-[#1C2536] hover:border-gray-500'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Technology Sub-filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#1C2536]/50">
        <span className="text-xs font-mono text-gray-500 flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3 text-[#00F2FE]" /> Tech:
        </span>

        {availableTechs.slice(0, 8).map((tech) => (
          <button
            key={tech}
            onClick={() => onSelectTech(selectedTech === tech ? null : tech)}
            className={`px-2.5 py-1 rounded-[6px] text-[11px] font-mono transition-colors ${
              selectedTech === tech
                ? 'bg-[#2D7FF9] text-white font-semibold'
                : 'bg-[#121824] text-gray-400 border border-[#1C2536] hover:text-gray-200'
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Active Filter Chips & Result Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs font-mono text-gray-400">
        <div className="flex items-center gap-2">
          <span>
            Found <strong className="text-white">{totalResults}</strong> {totalResults === 1 ? 'project' : 'projects'}
          </span>

          {hasActiveFilters && (
            <div className="flex items-center gap-1.5 ml-2">
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/20">
                  <span>{selectedCategory}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-white"
                    onClick={() => onSelectCategory(null)}
                  />
                </span>
              )}
              {selectedTech && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#2D7FF9]/10 text-[#2D7FF9] border border-[#2D7FF9]/20">
                  <span>{selectedTech}</span>
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-white"
                    onClick={() => onSelectTech(null)}
                  />
                </span>
              )}
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetAll}
            className="flex items-center gap-1 text-gray-400 hover:text-[#00F2FE] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear filters</span>
          </button>
        )}
      </div>
    </div>
  );
}
