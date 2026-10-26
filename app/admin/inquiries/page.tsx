'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Inbox, Mail, CheckCircle, Clock, MessageSquare, AlertCircle } from 'lucide-react';

interface MockInquiry {
  id: string;
  sender_name: string;
  sender_email: string;
  inquiry_type: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  private_notes: string;
  created_at: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<MockInquiry[]>([
    {
      id: 'inq-001',
      sender_name: 'Dr. Marcus Vance',
      sender_email: 'mvance@biomed-ai.org',
      inquiry_type: 'Recruitment',
      message: 'Impressed by your multi-agent patient navigation architecture (Heltech) and prescription verification agent. We are hiring a Senior Generative AI Engineer to lead our clinical decision support agents team.',
      status: 'New',
      private_notes: 'High priority recruiter reach-out. Review Heltech architecture PDF before response.',
      created_at: '2026-10-25 15:42',
    },
    {
      id: 'inq-002',
      sender_name: 'Sarah Chen',
      sender_email: 'schen@venture-scale.io',
      inquiry_type: 'Consulting / Freelance',
      message: 'Looking for a freelance AI Systems Architect to design our LangGraph multi-agent triage system over Gmail & internal ticketing APIs.',
      status: 'In Progress',
      private_notes: 'Sent preliminary scope assessment. Scheduled introductory technical call.',
      created_at: '2026-10-24 11:15',
    },
  ]);

  const [activeInquiry, setActiveInquiry] = useState<MockInquiry>(inquiries[0]);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const handleStatusChange = (id: string, newStatus: 'New' | 'In Progress' | 'Resolved') => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (activeInquiry.id === id) {
      setActiveInquiry({ ...activeInquiry, status: newStatus });
    }
  };

  const handleNotesChange = (id: string, notes: string) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, private_notes: notes } : item))
    );
    if (activeInquiry.id === id) {
      setActiveInquiry({ ...activeInquiry, private_notes: notes });
    }
  };

  const filtered = inquiries.filter((inq) =>
    filterStatus === 'All' ? true : inq.status === filterStatus
  );

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
            Contact Submissions Inbox
          </h1>
          <p className="text-xs font-mono text-gray-400">
            Durable message persistence with New, In Progress, and Resolved status tracking
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-2">
          {['All', 'New', 'In Progress', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                filterStatus === st
                  ? 'bg-[#00F2FE] text-[#07090E] font-semibold'
                  : 'bg-[#0D111A] text-gray-400 border border-[#1C2536] hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout: List and Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Inquiries List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveInquiry(item)}
              className={`p-4 rounded-[14px] border cursor-pointer transition-all ${
                activeInquiry.id === item.id
                  ? 'bg-[#121824] border-[#00F2FE]/60 shadow-md'
                  : 'bg-[#0D111A] border-[#1C2536] hover:border-gray-600'
              }`}
            >
              <div className="flex items-center justify-between gap-2 text-xs font-mono mb-1.5">
                <span className="font-semibold text-white">{item.sender_name}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    item.status === 'New'
                      ? 'bg-amber-400/10 text-amber-400 border border-amber-400/30'
                      : item.status === 'In Progress'
                      ? 'bg-[#00F2FE]/10 text-[#00F2FE] border border-[#00F2FE]/30'
                      : 'bg-emerald-400/10 text-emerald-400 border border-emerald-400/30'
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-2">{item.message}</p>
              <div className="mt-2 text-[10px] font-mono text-gray-500 flex items-center justify-between">
                <span>{item.inquiry_type}</span>
                <span>{item.created_at}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Active Detail & Private Notes (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-[16px] bg-[#0D111A] border border-[#1C2536] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1C2536] pb-4">
            <div>
              <h2 className="text-xl font-bold text-white">{activeInquiry.sender_name}</h2>
              <a
                href={`mailto:${activeInquiry.sender_email}`}
                className="text-xs font-mono text-[#00F2FE] hover:underline"
              >
                {activeInquiry.sender_email}
              </a>
            </div>

            {/* Status Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-gray-400">Status:</span>
              <select
                value={activeInquiry.status}
                onChange={(e) => handleStatusChange(activeInquiry.id, e.target.value as any)}
                className="px-3 py-1.5 rounded-lg bg-[#121824] border border-[#1C2536] text-xs font-mono text-white focus:outline-none focus:border-[#00F2FE]"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">
              Inquiry Message
            </span>
            <div className="p-4 rounded-lg bg-[#07090E] border border-[#1C2536] text-sm text-gray-200 leading-relaxed">
              {activeInquiry.message}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#1C2536]">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-[#00F2FE]" />
              <span>Private Admin Notes (Internal Only)</span>
            </div>
            <textarea
              rows={3}
              value={activeInquiry.private_notes}
              onChange={(e) => handleNotesChange(activeInquiry.id, e.target.value)}
              placeholder="Record follow-up actions, call summaries, or candidate notes..."
              className="w-full p-3 rounded-lg bg-[#121824] border border-[#1C2536] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#00F2FE]"
            />
            <span className="text-[11px] font-mono text-gray-500 block">
              Protected by admin RLS policy. Excluded from public views and logs.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
