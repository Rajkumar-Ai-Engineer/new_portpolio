'use client';

import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, Github, Linkedin, ExternalLink } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    sender_name: '',
    sender_email: '',
    inquiry_type: 'Recruitment',
    message: '',
    honeypot: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        setFormData({
          sender_name: '',
          sender_email: '',
          inquiry_type: 'Recruitment',
          message: '',
          honeypot: '',
        });
      } else {
        setError(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      setError('Network communication failed. Please email rajk7361206@gmail.com directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 border-t border-[#1C2536] bg-[#07090E] scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00F2FE]">
            <Mail className="w-3.5 h-3.5" />
            <span>DIRECT COMMUNICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Start a Conversation
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mx-auto">
            Available for full-time AI engineering positions, contract AI systems design, and research collaborations.
          </p>
        </div>

        {/* Direct Connect Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="https://github.com/Rajkumar-Ai-Engineer"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#0D111A] border border-[#1C2536] hover:border-[#00F2FE] hover:bg-[#121824] transition-all group flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-[#161F30] text-[#00F2FE] group-hover:scale-105 transition-transform">
              <Github className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-white">GitHub</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#00F2FE] transition-colors" />
              </div>
              <p className="text-xs text-gray-400 truncate mt-0.5">Rajkumar-Ai-Engineer</p>
              <span className="text-[11px] text-gray-500">Repositories & Code</span>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/rajkumar-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-[#0D111A] border border-[#1C2536] hover:border-[#00F2FE] hover:bg-[#121824] transition-all group flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-[#161F30] text-[#00F2FE] group-hover:scale-105 transition-transform">
              <Linkedin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-white">LinkedIn</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#00F2FE] transition-colors" />
              </div>
              <p className="text-xs text-gray-400 truncate mt-0.5">rajkumar-ai</p>
              <span className="text-[11px] text-gray-500">Professional Network</span>
            </div>
          </a>

          <a
            href="mailto:rajk7361206@gmail.com"
            className="p-4 rounded-xl bg-[#0D111A] border border-[#1C2536] hover:border-[#00F2FE] hover:bg-[#121824] transition-all group flex items-start gap-3"
          >
            <div className="p-2.5 rounded-lg bg-[#161F30] text-[#00F2FE] group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-white">Direct Email</span>
                <ExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#00F2FE] transition-colors" />
              </div>
              <p className="text-xs text-gray-400 truncate mt-0.5">rajk7361206@gmail.com</p>
              <span className="text-[11px] text-gray-500">Fast Response</span>
            </div>
          </a>
        </div>

        {/* Contact Form Card */}
        <div className="p-8 rounded-[16px] bg-[#0D111A] border border-[#1C2536] shadow-xl">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center mx-auto text-[#00F2FE]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto">
                Thank you for reaching out. Your message has been logged securely in my private inbox. I will review and follow up shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-4 px-5 py-2 text-xs font-mono text-[#00F2FE] hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" suppressHydrationWarning>
              {/* Honeypot field (hidden from real users, caught by bots) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                />
              </div>

              {error && (
                <div className="p-4 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center gap-3 text-sm text-red-300">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Sender Name */}
                <div className="space-y-2">
                  <label htmlFor="sender_name" className="block text-xs font-mono text-gray-300">
                    Your Name <span className="text-[#00F2FE]">*</span>
                  </label>
                  <input
                    id="sender_name"
                    type="text"
                    required
                    placeholder="e.g. Dr. Alex Morgan"
                    value={formData.sender_name}
                    onChange={(e) => setFormData({ ...formData, sender_name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#121824] border border-[#1C2536] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00F2FE]"
                    suppressHydrationWarning
                  />
                </div>

                {/* Sender Email */}
                <div className="space-y-2">
                  <label htmlFor="sender_email" className="block text-xs font-mono text-gray-300">
                    Email Address <span className="text-[#00F2FE]">*</span>
                  </label>
                  <input
                    id="sender_email"
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={formData.sender_email}
                    onChange={(e) => setFormData({ ...formData, sender_email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#121824] border border-[#1C2536] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00F2FE]"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div className="space-y-2">
                <label htmlFor="inquiry_type" className="block text-xs font-mono text-gray-300">
                  Inquiry Purpose
                </label>
                <select
                  id="inquiry_type"
                  value={formData.inquiry_type}
                  onChange={(e) => setFormData({ ...formData, inquiry_type: e.target.value as any })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-sm focus:outline-none focus:border-[#00F2FE]"
                  suppressHydrationWarning
                >
                  <option value="Recruitment">Employment / Engineering Hiring</option>
                  <option value="Consulting / Freelance">Freelance / AI Systems Consulting</option>
                  <option value="Collaboration">Open Source / Research Collaboration</option>
                  <option value="General">General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-xs font-mono text-gray-300">
                  Message Details <span className="text-[#00F2FE]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder="Outline the opportunity, project requirements, or questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#121824] border border-[#1C2536] text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00F2FE]"
                  suppressHydrationWarning
                />
              </div>

              {/* Submit CTA */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-mono text-gray-500">
                  Protected by honeypot & server-side validation
                </span>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] disabled:opacity-50 transition-colors shadow-md glow-cyan"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
