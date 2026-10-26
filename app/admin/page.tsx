import React from 'react';
import Link from 'next/link';
import { getAdminProjects } from '@/lib/data/projects';
import {
  Shield,
  Layers,
  Inbox,
  FileText,
  PlusCircle,
  Clock,
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react';

export const revalidate = 0; // Dynamic on admin requests

export default async function AdminDashboardPage() {
  const projects = await getAdminProjects();
  const publishedCount = projects.filter((p) => p.status === 'published').length;
  const draftCount = projects.filter((p) => p.status === 'draft').length;
  const featuredCount = projects.filter((p) => p.is_featured).length;

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2536] pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE]">
            <Shield className="w-3.5 h-3.5" />
            <span>ADMINISTRATIVE GOVERNANCE</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Portfolio Command Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Manage Projects</span>
          </Link>
          <Link
            href="/admin/pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono text-gray-300 bg-[#0D111A] border border-[#1C2536] hover:text-[#00F2FE] transition-colors"
          >
            <FileText className="w-4 h-4 text-[#00F2FE]" />
            <span>Case-Study PDFs</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <span>TOTAL PROJECTS</span>
            <Layers className="w-4 h-4 text-[#00F2FE]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{projects.length}</div>
          <p className="text-xs text-[#00F2FE] font-mono">
            {publishedCount} Published • {draftCount} Drafts
          </p>
        </div>

        <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <span>PUBLISHED LIVE</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white">{publishedCount}</div>
          <p className="text-xs text-gray-400 font-mono">Publicly Accessible via Library</p>
        </div>

        <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <span>FEATURED SHOWCASE</span>
            <span className="w-2 h-2 rounded-full bg-[#00F2FE]" />
          </div>
          <div className="text-3xl font-extrabold text-white">{featuredCount}</div>
          <p className="text-xs text-gray-400 font-mono">Curated on Homepage Grid</p>
        </div>

        <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-2">
          <div className="flex items-center justify-between text-gray-400 text-xs font-mono">
            <span>INQUIRY INBOX</span>
            <Inbox className="w-4 h-4 text-[#2D7FF9]" />
          </div>
          <div className="text-3xl font-extrabold text-white">0 New</div>
          <Link
            href="/admin/inquiries"
            className="text-xs text-[#00F2FE] hover:underline font-mono flex items-center gap-1"
          >
            Review Inbox Submissions <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quick Workflows Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/admin/projects"
          className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] hover:border-[#00F2FE]/50 space-y-3 transition-colors group"
        >
          <div className="p-2.5 rounded-lg bg-[#121824] w-fit text-[#00F2FE]">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors">
            Project CRUD & Revisions
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Manage projects using the Draft → Preview → Publish lifecycle. Edits preserve the live published version.
          </p>
        </Link>

        <Link
          href="/admin/pdf"
          className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] hover:border-[#00F2FE]/50 space-y-3 transition-colors group"
        >
          <div className="p-2.5 rounded-lg bg-[#121824] w-fit text-[#2D7FF9]">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors">
            Case-Study PDF Engine
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Generate dual audience templates (Recruiter vs Technical), inspect pre-approval semantic diffs, and publish atomically.
          </p>
        </Link>

        <Link
          href="/admin/inquiries"
          className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] hover:border-[#00F2FE]/50 space-y-3 transition-colors group"
        >
          <div className="p-2.5 rounded-lg bg-[#121824] w-fit text-emerald-400">
            <Inbox className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors">
            Contact Inquiries Inbox
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Inspect incoming recruitment and consulting requests, update tracking status, and attach private administrative notes.
          </p>
        </Link>
      </div>

      {/* Audit Log Stream */}
      <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-4">
        <div className="flex items-center justify-between border-b border-[#1C2536] pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Governance Audit Log Stream
            </h3>
          </div>
          <span className="text-xs font-mono text-gray-500">Immutable Trail</span>
        </div>

        <div className="space-y-3 text-xs font-mono text-gray-400">
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#121824] border border-[#1C2536]">
            <span>SYSTEM_AUDIT_COMPLETED: 34 Projects Verified & Catalogued</span>
            <span className="text-gray-500">2026-10-25 16:35 UTC</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#121824] border border-[#1C2536]">
            <span>STORAGE_BUCKETS_PROVISIONED: project-assets (public), private-documents (secure)</span>
            <span className="text-gray-500">2026-10-25 16:44 UTC</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#121824] border border-[#1C2536]">
            <span>DISCREPANCY_RESOLVED: 34 Projects Reconciled vs Spreadsheet Formula</span>
            <span className="text-gray-500">2026-10-25 16:29 UTC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
