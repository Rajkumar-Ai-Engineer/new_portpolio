import React from 'react';
import Link from 'next/link';
import { User, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 border-t border-[#1C2536] bg-[#07090E]/60 scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE]">
            <User className="w-3.5 h-3.5" />
            <span>BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Rajkumar V.
          </h2>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-8 space-y-5 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am a final-year Artificial Intelligence & Data Science student at Chettinad College of Engineering and Technology (CGPA: 8.23), operating as a freelance Generative AI engineer and educator. My focus is engineering practical, high-reliability AI solutions that move beyond conversational prototypes into structured multi-agent systems and enterprise tools.
            </p>
            <p>
              In 2025, I completed a focused engineering sprint of over <strong className="text-white">120+ documented AI projects</strong> covering Retrieval-Augmented Generation (RAG), agentic decision loops, computer vision pipelines, and MLOps tracking with MLflow and DVC. I believe in verifiable architectures, least-privilege tool access, and deterministic guardrails.
            </p>
            <p>
              My work spans from winning 1st place at the Bannari Amman Institute of Technology 24-Hour AI/ML Hackathon for real-time fake news detection, to deploying a facial recognition attendance system in commercial gym operations.
            </p>

            <div className="pt-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#00F2FE] hover:underline"
              >
                <span>Inspect technical project architectures</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Core Tenets Sidebar */}
          <div className="md:col-span-4 p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-4">
            <h3 className="text-sm font-mono font-semibold text-white uppercase tracking-wider">
              Engineering Principles
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                <span><strong>Evidence Over Claims:</strong> All architectures validated against working codebases.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                <span><strong>Least Privilege:</strong> Subagents restricted to necessary API tools with human confirmation.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                <span><strong>Deterministic Guardrails:</strong> Input/output validation to neutralize prompt injection.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                <span><strong>Reproducible MLOps:</strong> Versioned models, datasets, and CI/CD pipelines.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
