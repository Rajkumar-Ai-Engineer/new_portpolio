import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Mail, Terminal, Award, Sparkles, Github, Linkedin } from 'lucide-react';
import RoboticsAnimation from './RoboticsAnimation';
import Tilt3D from '@/components/ui/Tilt3D';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-cyber-grid">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#00F2FE]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Brand Copy & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Engineering Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D111A]/90 border border-[#00F2FE]/30 shadow-[0_0_15px_-4px_rgba(0,242,254,0.15)] text-xs font-mono text-slate-100">
              <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
              <span className="font-medium text-white">Full-Stack AI Engineer</span>
              <span className="text-gray-400">|</span>
              <span className="text-[#00F2FE] font-semibold">120+ AI Projects Built in 2025</span>
            </div>

            {/* Approved Hero Headline (Master Book Section 2) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              AI Engineer Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] via-[#00D2E0] to-[#2D7FF9]">
                Intelligent Systems.
              </span>
            </h1>

            {/* Approved Supporting Message */}
            <p className="text-lg sm:text-xl text-[#F1F5F9] max-w-2xl font-normal leading-relaxed">
              Designing and engineering practical AI solutions across generative AI, agentic systems, and intelligent applications.
            </p>

            {/* Quick Metrics Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D111A]/90 border border-[#1C2536] text-xs font-mono text-slate-200">
                <Award className="w-3.5 h-3.5 text-[#00F2FE]" />
                <span>1st Place AI/ML Hackathon Winner</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D111A]/90 border border-[#1C2536] text-xs font-mono text-slate-200">
                <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
                <span>LeetCode 50+ Badge</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D111A]/90 border border-[#1C2536] text-xs font-mono text-slate-200">
                <Terminal className="w-3.5 h-3.5 text-[#00F2FE]" />
                <span>B.Tech AI & Data Science (CGPA: 8.23)</span>
              </div>
            </div>

            {/* Approved Hero Action Buttons & Connect Links */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] rounded-lg shadow-lg glow-cyan transition-all transform active:scale-[0.98]"
              >
                <span>Explore My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#0D111A]/90 hover:bg-[#121824] hover:text-[#00F2FE] border border-[#00F2FE]/40 hover:border-[#00F2FE] hover:shadow-[0_0_20px_-3px_rgba(0,242,254,0.3)] rounded-lg transition-all"
              >
                <Mail className="w-4 h-4 text-[#00F2FE]" />
                <span>Contact Me</span>
              </Link>

              <div className="flex items-center gap-2 sm:ml-2">
                <a
                  href="https://github.com/Rajkumar-Ai-Engineer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
                  aria-label="GitHub Profile"
                  title="Connect on GitHub (Rajkumar-Ai-Engineer)"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href="https://linkedin.com/in/rajkumar-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
                  aria-label="LinkedIn Profile"
                  title="Connect on LinkedIn (rajkumar-ai)"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Anchor & Robotics Animation (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[340px] sm:min-h-[400px] lg:min-h-[460px] py-4">
            {/* Robotics animation backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <RoboticsAnimation />
            </div>

            {/* Profile Photo Frame with Cyber Accents & 3D Interactive Parallax */}
            <Tilt3D maxTilt={10} className="relative z-10">
              <div className="w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-2xl p-1 bg-gradient-to-b from-[#00F2FE]/40 via-[#1C2536] to-transparent shadow-2xl">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0D111A] border border-[#1C2536]">
                  <Image
                    src="/images/profile-photo.png"
                    alt="Rajkumar V. — AI Systems Builder"
                    fill
                    priority
                    className="object-cover object-top hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                </div>
              </div>
            </Tilt3D>
          </div>
        </div>
      </div>
    </section>
  );
}
