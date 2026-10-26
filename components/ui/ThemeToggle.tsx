'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check initial class on documentElement
    const isLight = document.documentElement.classList.contains('light');
    setTheme(isLight ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    if (nextTheme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      try {
        localStorage.setItem('rajkumar_theme', 'light');
      } catch {}
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('rajkumar_theme', 'dark');
      } catch {}
    }
  };

  if (!mounted) {
    // Render placeholder with same dimensions to avoid layout shift
    return (
      <div className={`p-2 w-8 h-8 rounded-lg bg-[#0D111A] border border-[#1C2536] ${className}`} />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-all duration-200 flex items-center justify-center group focus:outline-none ${className}`}
      aria-label={theme === 'dark' ? 'Switch to Day Mode (Light Theme)' : 'Switch to Dark Mode'}
      title={theme === 'dark' ? 'Switch to Day Mode' : 'Switch to Dark Mode'}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-300 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-500 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
