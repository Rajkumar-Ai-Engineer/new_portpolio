'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText, ChevronRight, Cpu, Github, Linkedin } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Hide the public navigation header entirely when inside the private /admin workspace
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Experience', href: '/#experience' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[#07090E]/95 backdrop-blur-md border-b border-[#1C2536] shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand Monogram */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none shrink-0"
            aria-label="Rajkumar V. Homepage"
          >
            <div className="w-10 h-10 rounded-lg bg-[#0D111A] border border-[#1C2536] flex items-center justify-center group-hover:border-[#00F2FE] transition-colors shrink-0">
              <Cpu className="w-5 h-5 text-[#00F2FE]" />
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-[#00F2FE] transition-colors block leading-tight">
                Rajkumar V.
              </span>
              <span className="block text-[11px] font-mono text-gray-400">
                AI Systems Builder
              </span>
            </div>
          </Link>

          {/* Desktop Navigation (Visible on lg: 1024px+) */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 whitespace-nowrap" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-[#00F2FE] transition-colors py-1"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-4 w-px bg-[#1C2536]" />

            {/* Social Connect Links */}
            <div className="flex items-center gap-1.5">
              <a
                href="https://github.com/Rajkumar-Ai-Engineer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-[#00F2FE] hover:bg-[#121824] rounded-md transition-colors"
                aria-label="GitHub Profile"
                title="GitHub (Rajkumar-Ai-Engineer)"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/rajkumar-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-[#00F2FE] hover:bg-[#121824] rounded-md transition-colors"
                aria-label="LinkedIn Profile"
                title="LinkedIn (rajkumar-ai)"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Day / Dark Mode Toggle */}
            <ThemeToggle />

            {/* Resume Download CTA */}
            <a
              href="/RajkumarV_Resume_Updated.pdf"
              download="RajkumarV_Resume_Updated.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] rounded-md transition-colors shadow-sm glow-cyan shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
          </nav>

          {/* Mobile / Tablet menu button (Visible below lg: 1024px) */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-white hover:border-[#00F2FE] focus:outline-none"
              aria-expanded={isOpen}
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="lg:hidden bg-[#0D111A] border-b border-[#1C2536] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-base font-medium text-gray-200 hover:text-[#00F2FE] py-2 border-b border-[#1C2536]/50"
            >
              <span>{link.name}</span>
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </Link>
          ))}
          <div className="pt-2 flex items-center gap-3">
            <a
              href="https://github.com/Rajkumar-Ai-Engineer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono text-gray-300 bg-[#121824] border border-[#1C2536] rounded-md hover:border-[#00F2FE] hover:text-[#00F2FE] transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://linkedin.com/in/rajkumar-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono text-gray-300 bg-[#121824] border border-[#1C2536] rounded-md hover:border-[#00F2FE] hover:text-[#00F2FE] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
          <div>
            <a
              href="/RajkumarV_Resume_Updated.pdf"
              download="RajkumarV_Resume_Updated.pdf"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-mono font-semibold text-[#07090E] bg-[#00F2FE] rounded-md"
            >
              <FileText className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
