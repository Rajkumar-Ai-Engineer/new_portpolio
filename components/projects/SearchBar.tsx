'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  initialValue?: string;
  onSearch: (query: string) => void;
}

export default function SearchBar({ initialValue = '', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const onSearchRef = useRef(onSearch);
  const lastSearchedRef = useRef(initialValue);

  // Keep latest onSearch handler without re-triggering debounce effect
  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  // Synchronize when external reset occurs (e.g. Clear Filters)
  useEffect(() => {
    setQuery(initialValue);
    lastSearchedRef.current = initialValue;
  }, [initialValue]);

  // Debounce 250ms conforming to Master Book Decisions 095, 201
  useEffect(() => {
    // Prevent redundant searches on mount or when query matches what was already searched
    if (query === lastSearchedRef.current) return;

    const handler = setTimeout(() => {
      lastSearchedRef.current = query;
      onSearchRef.current(query);
    }, 250);

    return () => clearTimeout(handler);
  }, [query]);

  const handleClear = () => {
    setQuery('');
    lastSearchedRef.current = '';
    onSearchRef.current('');
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
        <Search className="w-4 h-4" />
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects by title, technology, or problem statement..."
        className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#0D111A] border border-[#1C2536] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00F2FE] transition-colors"
        aria-label="Search projects"
        suppressHydrationWarning
      />

      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
