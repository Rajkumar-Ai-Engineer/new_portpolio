'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  FileText,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Eye,
  Download,
  ShieldAlert,
  GitCompare,
} from 'lucide-react';

export default function AdminPdfManagementPage() {
  const [selectedProject, setSelectedProject] = useState('P001');
  const [selectedAudience, setSelectedAudience] = useState<'recruiter' | 'technical'>('technical');
  const [isGenerating, setIsGenerating] = useState(false);
  const [draftGenerated, setDraftGenerated] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const projects = [
    { id: 'P001', title: 'Prescription verification agent', status: 'Approved Draft Available' },
    { id: 'P003', title: 'E_mail_assistant_(deep_agents)', status: 'Live Published' },
    { id: 'P014', title: 'fake_news_detection_v1', status: 'Live Published' },
    { id: 'P023', title: 'Heltech', status: 'Live Published' },
    { id: 'P031', title: 'AegisAI', status: 'Ready for Generation' },
  ];

  const handleGenerateDraft = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setDraftGenerated(true);
    }, 1200);
  };

  const handleApprovePublish = () => {
    setIsPublished(true);
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2536] pb-6">
        <div className="space-y-1">
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#00F2FE]"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Technical Case-Study PDF Governance
          </h1>
          <p className="text-xs font-mono text-gray-400">
            Lifecycle Decisions 287–300: Snapshots, Pre-Approval Checks, Semantic Diffs, and Atomic Replacement
          </p>
        </div>
      </div>

      {/* Main Grid: Control Panel + Diff / Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Config Panel (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-gray-300">Target Project</label>
            <select
              value={selectedProject}
              onChange={(e) => {
                setSelectedProject(e.target.value);
                setDraftGenerated(false);
                setIsPublished(false);
              }}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs font-mono focus:outline-none focus:border-[#00F2FE]"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.id}: {p.title}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-gray-300">Audience Template Style</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setSelectedAudience('recruiter')}
                className={`py-2 px-3 rounded-lg text-xs font-mono transition-colors ${
                  selectedAudience === 'recruiter'
                    ? 'bg-[#00F2FE] text-[#07090E] font-semibold'
                    : 'bg-[#121824] text-gray-400 border border-[#1C2536]'
                }`}
              >
                Recruiter Style
              </button>
              <button
                onClick={() => setSelectedAudience('technical')}
                className={`py-2 px-3 rounded-lg text-xs font-mono transition-colors ${
                  selectedAudience === 'technical'
                    ? 'bg-[#00F2FE] text-[#07090E] font-semibold'
                    : 'bg-[#121824] text-gray-400 border border-[#1C2536]'
                }`}
              >
                Technical Reviewer
              </button>
            </div>
            <p className="text-[11px] font-mono text-gray-500">
              {selectedAudience === 'recruiter'
                ? 'Outcome-focused, concise metrics, high-level architecture.'
                : 'Deep component topology, data flows, code snippets, trade-offs.'}
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleGenerateDraft}
              disabled={isGenerating}
              className="w-full py-2.5 rounded-lg text-xs font-mono font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] disabled:opacity-50 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{isGenerating ? 'Compiling Snapshot...' : 'Generate New Version Draft'}</span>
            </button>
          </div>

          {/* Hard Rule Badge */}
          <div className="p-3.5 rounded-lg bg-[#121824] border border-[#1C2536] flex items-start gap-2.5 text-[11px] font-mono text-gray-400">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong>Hard Rule (Dec 300):</strong> Generation is automated; publication and rollback always require explicit admin approval.
            </span>
          </div>
        </div>

        {/* Right Inspection & Pre-Approval Checks (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Pre-Approval Validation Checklist (Master Book Dec 291) */}
          <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C2536] pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Pre-Approval Validation Checklist (Decision 291)
              </h3>
              <span className="text-xs font-mono text-emerald-400">All Tests Passed</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-gray-300">
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#121824] border border-[#1C2536]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>PDF Document Opens & Renders</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#121824] border border-[#1C2536]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Architecture Diagram Included</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#121824] border border-[#1C2536]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Page Count Plausible (4 Pages)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#121824] border border-[#1C2536]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Target Size Check Passed (1.42 MB ≤ 5MB)</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#121824] border border-[#1C2536]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Semantic Headings & Alt Text Verified</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded bg-[#121824] border border-[#1C2536]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>External Link Integrity Validated</span>
              </div>
            </div>
          </div>

          {/* Semantic Diff Preview (Decision 287-288) */}
          <div className="p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-4">
            <div className="flex items-center justify-between border-b border-[#1C2536] pb-3">
              <div className="flex items-center gap-2">
                <GitCompare className="w-4 h-4 text-[#00F2FE]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Semantic Content Diff Summary (Decision 288)
                </h3>
              </div>
              <span className="text-xs font-mono text-gray-500">v1.2-draft vs v1.1-live</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                <strong>+ ADDED:</strong> Section 5.3 &quot;Tavily Live Web Search Verification Integration&quot;
              </div>
              <div className="p-3 rounded-lg bg-[#121824] border border-[#1C2536] text-gray-300">
                <strong>~ MODIFIED:</strong> Architecture Diagram updated to high-res WebP format with verified component boxes
              </div>
              <div className="p-3 rounded-lg bg-[#121824] border border-[#1C2536] text-gray-300">
                <strong>~ MODIFIED:</strong> Limitations section updated with GPU memory allocation benchmarks
              </div>
            </div>
          </div>

          {/* Approval & Atomic Publication Control (Decision 292, 295, 299) */}
          <div className="p-6 rounded-[16px] bg-[#121824] border border-[#00F2FE]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">
                {isPublished ? 'Case-Study PDF Published Live' : 'Ready for Exact-Version Approval'}
              </h4>
              <p className="text-xs font-mono text-gray-400">
                {isPublished
                  ? 'Active URL: /docs/case-studies/prescription-verification-agent-technical.pdf'
                  : 'Approves exact snapshot ID: snap_p001_tech_rev3. Atomic URL switch.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {isPublished ? (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Published
                </span>
              ) : (
                <button
                  onClick={handleApprovePublish}
                  className="px-5 py-2.5 rounded-lg text-xs font-mono font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] transition-colors shadow-lg glow-cyan"
                >
                  Approve & Publish Atomically
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
