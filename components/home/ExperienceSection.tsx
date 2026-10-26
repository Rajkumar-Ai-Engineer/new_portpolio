import React from 'react';
import { verifiedExperience } from '@/lib/data/projects';
import { Briefcase, GraduationCap, Trophy, Award, Calendar, MapPin } from 'lucide-react';

export default function ExperienceSection() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'experience':
        return <Briefcase className="w-4 h-4 text-[#00F2FE]" />;
      case 'education':
        return <GraduationCap className="w-4 h-4 text-[#2D7FF9]" />;
      case 'achievement':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      default:
        return <Award className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <section id="experience" className="py-20 border-t border-[#1C2536] bg-[#07090E] scroll-mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER & ACADEMICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Experience & Achievements
          </h2>
          <p className="text-sm text-gray-400">
            Professional roles, academic milestones, and competitive hackathon achievements.
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l border-[#1C2536] ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
          {verifiedExperience.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline marker icon */}
              <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-8 h-8 rounded-full bg-[#0D111A] border border-[#1C2536] group-hover:border-[#00F2FE] flex items-center justify-center transition-colors">
                {getTypeIcon(item.type)}
              </div>

              {/* Card Surface */}
              <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] group-hover:border-[#1C2536]/80 space-y-3 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-300">
                      {item.organization}
                    </p>
                  </div>

                  {item.badge && (
                    <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#00F2FE]" />
                    <span>
                      {item.period_start} {item.period_end ? `– ${item.period_end}` : ''}
                    </span>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-500" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="text-sm text-gray-300 leading-relaxed pt-1">
                    {item.description}
                  </p>
                )}

                {item.bullets && item.bullets.length > 0 && (
                  <ul className="space-y-1.5 pt-2 text-xs sm:text-sm text-gray-400 list-disc list-inside">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
