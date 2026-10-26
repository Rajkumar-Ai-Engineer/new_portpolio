import React from 'react';
import { verifiedSkills } from '@/lib/data/projects';
import { Cpu, Terminal, GitBranch, Database, Globe, Brain } from 'lucide-react';

export default function SkillsSection() {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Generative AI & Agentic AI':
        return <Brain className="w-5 h-5 text-[#00F2FE]" />;
      case 'Machine Learning & Deep Learning':
        return <Cpu className="w-5 h-5 text-[#2D7FF9]" />;
      case 'MLOps, Cloud & DevOps':
        return <GitBranch className="w-5 h-5 text-[#00D2E0]" />;
      case 'Databases & Storage':
        return <Database className="w-5 h-5 text-indigo-400" />;
      case 'Deployment & Web Technologies':
        return <Globe className="w-5 h-5 text-emerald-400" />;
      default:
        return <Terminal className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="py-20 border-t border-[#1C2536] bg-[#07090E]/60 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE]">
            <Terminal className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineering & Technology Stack
          </h2>
          <p className="text-sm text-gray-400">
            Categorized skills grounded in verified production architectures, models, and real-world implementations.
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verifiedSkills.map((cat) => (
            <div
              key={cat.category}
              className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] hover:border-[#1C2536]/80 space-y-4 transition-all duration-200"
            >
              <div className="flex items-center gap-3 border-b border-[#1C2536]/60 pb-3">
                <div className="p-2 rounded-lg bg-[#121824] border border-[#1C2536]">
                  {getCategoryIcon(cat.category)}
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {cat.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-2.5 py-1 rounded-[6px] text-xs font-mono transition-colors ${
                      skill.highlighted
                        ? 'bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30'
                        : 'bg-[#121824] text-gray-300 border border-[#1C2536]'
                    }`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
