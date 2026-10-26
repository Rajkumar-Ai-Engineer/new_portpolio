import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  onReset: () => void;
}

export default function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="py-20 px-4 text-center rounded-[16px] bg-[#0D111A] border border-[#1C2536] max-w-xl mx-auto space-y-4">
      <div className="w-12 h-12 rounded-full bg-[#121824] border border-[#1C2536] flex items-center justify-center mx-auto text-gray-400">
        <SearchX className="w-6 h-6 text-[#00F2FE]" />
      </div>

      <h3 className="text-lg font-bold text-white">No Matching Projects Found</h3>

      <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
        No projects match your current search and filter criteria. You can clear your active filters or search for another technology.
      </p>

      <div className="pt-2">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
}
