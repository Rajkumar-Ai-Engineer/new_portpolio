import React from 'react';
import Hero from '@/components/home/Hero';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import SkillsSection from '@/components/home/SkillsSection';
import ExperienceSection from '@/components/home/ExperienceSection';
import AboutSection from '@/components/home/AboutSection';
import ContactSection from '@/components/home/ContactSection';
import { getFeaturedProjects } from '@/lib/data/projects';

export const revalidate = 3600; // ISR cache 1 hour

export default async function HomePage() {
  const featured = await getFeaturedProjects();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Featured Projects Grid */}
      <FeaturedProjects projects={featured} />

      {/* 3. Skills & Technologies */}
      <SkillsSection />

      {/* 4. Experience & Education Timeline */}
      <ExperienceSection />

      {/* 5. Authentic About Story */}
      <AboutSection />

      {/* 6. Secure Contact Form */}
      <ContactSection />
    </div>
  );
}
