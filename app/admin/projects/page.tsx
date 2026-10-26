import React from 'react';
import Link from 'next/link';
import { getAdminProjects } from '@/lib/data/projects';
import AdminProjectsManager from '@/components/admin/AdminProjectsManager';
import { ArrowLeft, Layers } from 'lucide-react';

export const revalidate = 0; // Dynamic on admin requests

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-1 border-b border-[#1C2536] pb-6">
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#00F2FE]"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        <div className="flex items-center gap-2 pt-1 text-xs font-mono text-[#00F2FE]">
          <Layers className="w-3.5 h-3.5" />
          <span>PROJECT LIFECYCLE GOVERNANCE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Manage Projects & Drafts
        </h1>
        <p className="text-xs font-mono text-gray-400">
          Create, edit, preview, and toggle publication status (Decisions 018, 072, 167)
        </p>
      </div>

      {/* Interactive Manager */}
      <AdminProjectsManager initialProjects={projects} />
    </div>
  );
}
