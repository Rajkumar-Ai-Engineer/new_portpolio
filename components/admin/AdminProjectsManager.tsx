'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Project } from '@/lib/types';
import {
  Plus,
  Search,
  Eye,
  CheckCircle,
  Clock,
  Trash2,
  X,
  Loader2,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';

interface AdminProjectsManagerProps {
  initialProjects: Project[];
}

export default function AdminProjectsManager({
  initialProjects,
}: AdminProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'published' | 'draft' | 'trash'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // New Draft Form State
  const [formData, setFormData] = useState({
    project_id: '',
    title: '',
    category: 'Agentic AI & LLMs',
    tier: 'Standard',
    status: 'draft',
    year: '2026',
    short_summary: '',
    problem_statement: '',
    solution_narrative: '',
    technologies: 'Python, LangChain, FastAPI',
    repository_url: '',
    demo_url: '',
    cover_image_url: '/images/projects/aegisai-system-overview.webp',
    architecture_image_url: '/images/projects/aegisai-system-overview.webp',
  });

  const categories = [
    'Agentic AI & LLMs',
    'RAG & Knowledge Systems',
    'Computer Vision & Multimodal',
    'MLOps & Platform Engineering',
    'NLP & Text Processing',
    'Edge AI & Embedded Systems',
  ];

  // Open modal and compute next project ID
  const handleOpenCreateModal = () => {
    const maxNum = projects.reduce((max, p) => {
      const match = p.project_id.match(/P(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        return num > max ? num : max;
      }
      return max;
    }, 34);
    const nextId = `P${String(maxNum + 1).padStart(3, '0')}`;

    setFormData({
      project_id: nextId,
      title: '',
      category: 'Agentic AI & LLMs',
      tier: 'Standard',
      status: 'draft',
      year: '2026',
      short_summary: '',
      problem_statement: '',
      solution_narrative: '',
      technologies: 'Python, LangGraph, FastAPI',
      repository_url: '',
      demo_url: '',
      cover_image_url: '/images/projects/aegisai-system-overview.webp',
      architecture_image_url: '/images/projects/aegisai-system-overview.webp',
    });
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleCreateDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to create project draft.');
        return;
      }

      setProjects([data.project, ...projects]);
      setActionMessage(`Draft ${data.project.project_id} ("${data.project.title}") created successfully.`);
      setIsModalOpen(false);

      setTimeout(() => setActionMessage(null), 5000);
    } catch {
      setErrorMessage('Network error while saving project draft.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (p: Project) => {
    const nextStatus = p.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch('/api/admin/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: p.project_id, status: nextStatus }),
      });

      if (res.ok) {
        setProjects(
          projects.map((item) =>
            item.project_id === p.project_id ? { ...item, status: nextStatus } : item
          )
        );
        setActionMessage(
          `Project ${p.project_id} status changed to ${nextStatus.toUpperCase()}.`
        );
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch {
      setActionMessage('Failed to update project status.');
    }
  };

  const handleDeleteProject = async (p: Project) => {
    if (!confirm(`Are you sure you want to move ${p.project_id} ("${p.title}") to Trash?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects?project_id=${p.project_id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProjects(
          projects.map((item) =>
            item.project_id === p.project_id ? { ...item, status: 'trash' } : item
          )
        );
        setActionMessage(`Project ${p.project_id} moved to Trash.`);
        setTimeout(() => setActionMessage(null), 4000);
      }
    } catch {
      setActionMessage('Failed to delete project.');
    }
  };

  // Filter projects
  const filteredProjects = projects.filter((p) => {
    if (statusFilter !== 'All' && p.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchId = p.project_id.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      const matchTech = p.technologies?.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchId || matchCategory || matchTech;
    }
    return true;
  });

  const publishedCount = projects.filter((p) => p.status === 'published').length;
  const draftCount = projects.filter((p) => p.status === 'draft').length;
  const trashCount = projects.filter((p) => p.status === 'trash').length;

  return (
    <div className="space-y-6">
      {/* Top Banner Message */}
      {actionMessage && (
        <div className="p-3.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionMessage}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 p-1 bg-[#0D111A] border border-[#1C2536] rounded-lg">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
              statusFilter === 'All'
                ? 'bg-[#00F2FE] text-[#07090E] font-semibold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All ({projects.length})
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
              statusFilter === 'published'
                ? 'bg-emerald-500 text-[#07090E] font-semibold'
                : 'text-gray-400 hover:text-emerald-400'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
              statusFilter === 'draft'
                ? 'bg-amber-500 text-[#07090E] font-semibold'
                : 'text-gray-400 hover:text-amber-400'
            }`}
          >
            Drafts ({draftCount})
          </button>
          {trashCount > 0 && (
            <button
              onClick={() => setStatusFilter('trash')}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                statusFilter === 'trash'
                  ? 'bg-red-500 text-white font-semibold'
                  : 'text-gray-400 hover:text-red-400'
              }`}
            >
              Trash ({trashCount})
            </button>
          )}
        </div>

        {/* Create Draft Button */}
        <button
          onClick={handleOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] transition-colors shadow-md glow-cyan"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project Draft</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
        <input
          type="text"
          placeholder="Filter projects by title, ID (e.g. P001), category, or technology..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#0D111A] border border-[#1C2536] text-white text-xs font-mono placeholder-gray-500 focus:outline-none focus:border-[#00F2FE]"
        />
      </div>

      {/* Projects Table */}
      <div className="rounded-[16px] bg-[#0D111A] border border-[#1C2536] overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#121824] text-gray-400 uppercase tracking-wider border-b border-[#1C2536]">
              <tr>
                <th className="px-6 py-3.5">ID</th>
                <th className="px-6 py-3.5">Project Title</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Tier</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1C2536]/60 text-gray-300">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No projects found matching the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => (
                  <tr key={p.project_id} className="hover:bg-[#121824]/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#00F2FE]">{p.project_id}</td>
                    <td className="px-6 py-4">
                      <span className="font-sans font-medium text-white block">{p.title}</span>
                      <span className="text-[11px] text-gray-500 font-mono">/{p.slug}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{p.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] ${
                          p.tier === 'Featured'
                            ? 'bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30 font-semibold'
                            : 'bg-[#121824] text-gray-400 border border-[#1C2536]'
                        }`}
                      >
                        {p.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {p.status === 'published' ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Published</span>
                        </span>
                      ) : p.status === 'draft' ? (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-amber-950/40 border border-amber-500/30 text-amber-400">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Draft</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] bg-red-950/40 border border-red-500/30 text-red-400">
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Trash</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/projects/${p.slug}`}
                        target="_blank"
                        className="p-1.5 inline-flex rounded bg-[#121824] border border-[#1C2536] text-gray-400 hover:text-[#00F2FE]"
                        title="View Project Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleToggleStatus(p)}
                        className={`p-1.5 inline-flex rounded border ${
                          p.status === 'published'
                            ? 'bg-[#121824] border-[#1C2536] text-gray-400 hover:text-amber-400'
                            : 'bg-[#121824] border-[#1C2536] text-gray-400 hover:text-emerald-400'
                        }`}
                        title={p.status === 'published' ? 'Switch to Draft' : 'Publish Live'}
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteProject(p)}
                        className="p-1.5 inline-flex rounded bg-[#121824] border border-[#1C2536] text-gray-400 hover:text-red-400"
                        title="Move to Trash"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Draft Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-[#0D111A] border border-[#1C2536] rounded-[16px] shadow-2xl overflow-hidden">
            {/* Pinned Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C2536] bg-[#0D111A] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center text-[#00F2FE] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-tight">Create New Project Draft</h3>
                  <p className="text-[11px] font-mono text-gray-400">
                    Draft → Preview → Publish Architecture Workflow
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#121824] transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Form Body */}
            <form onSubmit={handleCreateDraft} className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {errorMessage && (
                  <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/30 text-xs text-red-300">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Project ID */}
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-300">Project ID</label>
                    <input
                      type="text"
                      required
                      value={formData.project_id}
                      onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs font-mono focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-xs font-mono text-gray-300">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs focus:outline-none focus:border-[#00F2FE]"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-300">
                    Project Title <span className="text-[#00F2FE]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Autonomous Multimodal Consensus Sentinel"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-sm focus:outline-none focus:border-[#00F2FE]"
                  />
                </div>

                {/* Short Summary */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-mono text-gray-300">
                      Short Summary (20-30 words) <span className="text-[#00F2FE]">*</span>
                    </label>
                    <span className="text-[10px] font-mono text-gray-500">
                      {formData.short_summary.trim().split(/\s+/).filter(Boolean).length} words
                    </span>
                  </div>
                  <textarea
                    required
                    rows={2}
                    placeholder="Concise overview of problem solved, architecture design, and system impact..."
                    value={formData.short_summary}
                    onChange={(e) => setFormData({ ...formData, short_summary: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs focus:outline-none focus:border-[#00F2FE]"
                  />
                </div>

                {/* Technologies */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-300">
                    Technologies (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Python, LangGraph, Ollama, Docker, PostgreSQL"
                    value={formData.technologies}
                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs font-mono focus:outline-none focus:border-[#00F2FE]"
                  />
                </div>

                {/* Problem & Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-300">Problem Statement</label>
                    <textarea
                      rows={3}
                      placeholder="Engineering challenge addressed..."
                      value={formData.problem_statement}
                      onChange={(e) => setFormData({ ...formData, problem_statement: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-300">Solution Narrative</label>
                    <textarea
                      rows={3}
                      placeholder="Architectural implementation..."
                      value={formData.solution_narrative}
                      onChange={(e) => setFormData({ ...formData, solution_narrative: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs focus:outline-none focus:border-[#00F2FE]"
                    />
                  </div>
                </div>

                {/* Tier, Status, Year */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-300">Tier</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs"
                    >
                      <option value="Standard">Standard</option>
                      <option value="Featured">Featured</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-300">Initial Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs"
                    >
                      <option value="draft">Draft (Private)</option>
                      <option value="published">Published (Live)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-mono text-gray-300">Year</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs font-mono"
                    />
                  </div>
                </div>

                {/* GitHub Repo */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-gray-300">Repository URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/Rajkumar-Ai-Engineer/..."
                    value={formData.repository_url}
                    onChange={(e) => setFormData({ ...formData, repository_url: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-xs font-mono focus:outline-none focus:border-[#00F2FE]"
                  />
                </div>
              </div>

              {/* Pinned Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1C2536] bg-[#0D111A] shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-mono text-gray-400 hover:text-white hover:bg-[#121824] transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] disabled:opacity-50 transition-colors shadow-md"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving Draft...</span>
                    </>
                  ) : (
                    <span>Save Project Draft</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
