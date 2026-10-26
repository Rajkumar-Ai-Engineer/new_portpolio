'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Hide the public footer when inside the private admin workspace
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  return (
    <footer className="border-t border-[#1C2536] bg-[#07090E] pt-12 pb-8 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white">Rajkumar V.</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1C2536] text-[#00F2FE]">
                AI Systems
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              Full-stack AI Engineer specializing in Generative AI, LangGraph multi-agent systems, and production MLOps pipelines.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://github.com/Rajkumar-Ai-Engineer"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/rajkumar-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:rajk7361206@gmail.com"
                className="p-2 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
                aria-label="Direct Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/projects" className="hover:text-[#00F2FE] transition-colors">
                  Project Library
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="hover:text-[#00F2FE] transition-colors">
                  Core Technologies
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="hover:text-[#00F2FE] transition-colors">
                  Experience & Education
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#00F2FE] transition-colors">
                  Contact Form
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/RajkumarV_Resume_Updated.pdf"
                  download
                  className="hover:text-[#00F2FE] transition-colors flex items-center gap-1"
                >
                  Download Resume <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Rajkumar-Ai-Engineer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00F2FE] transition-colors flex items-center gap-1"
                >
                  GitHub Profile <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/rajkumar-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00F2FE] transition-colors flex items-center gap-1"
                >
                  LinkedIn Profile <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1C2536] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 Rajkumar V. All rights reserved. Personal AI Branding System.</p>
          <p className="font-mono">Evidence-First • Master Architecture Baseline</p>
        </div>
      </div>
    </footer>
  );
}
