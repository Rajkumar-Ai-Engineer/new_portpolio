'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Lock, Mail, Loader2, AlertCircle, ArrowLeft, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@rajkumar-ai.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed. Please verify your credentials.');
        return;
      }

      // Check URL search params for redirection target
      const params = new URLSearchParams(window.location.search);
      const nextUrl = params.get('next') || '/admin';
      window.location.href = nextUrl;
    } catch {
      setError('Communication with authentication endpoint failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-20 bg-cyber-grid">
      <div className="w-full max-w-md p-8 rounded-[16px] bg-[#0D111A] border border-[#1C2536] shadow-2xl space-y-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-[#00F2FE] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Website
          </Link>
          <div className="inline-flex items-center gap-1 text-[11px] font-mono text-gray-500">
            <KeyRound className="w-3 h-3 text-[#00F2FE]" />
            <span>SESSION GATE</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-[#121824] border border-[#1C2536] flex items-center justify-center mx-auto text-[#00F2FE]">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Admin Governance Access
          </h1>
          <p className="text-xs font-mono text-gray-400">
            Authorized administrator authentication only. Public registration is disabled.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/30 flex items-center gap-2.5 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-gray-300">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
              <input
                type="email"
                required
                placeholder="admin@rajkumar-ai.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00F2FE]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-gray-500" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#121824] border border-[#1C2536] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#00F2FE]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-lg text-sm font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] disabled:opacity-50 transition-colors shadow-md flex items-center justify-center gap-2 font-mono"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying Authorization...</span>
              </>
            ) : (
              <span>Sign In to Admin Workspace</span>
            )}
          </button>
        </form>

        {/* Quick Credentials Info Box */}
        <div className="p-3.5 rounded-lg bg-[#121824] border border-[#1C2536] text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="font-semibold text-gray-300">Admin Credentials</span>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@rajkumar-ai.com');
                setPassword('admin123');
              }}
              className="text-[#00F2FE] hover:underline text-[11px]"
            >
              Auto-Fill Credentials
            </button>
          </div>
          <div className="text-gray-400">
            Username / Email: <span className="text-white select-all font-semibold">admin@rajkumar-ai.com</span>
          </div>
          <div className="text-gray-400">
            Password: <span className="text-white select-all font-semibold">admin123</span>
          </div>
        </div>

        <div className="pt-2 border-t border-[#1C2536] text-center text-xs font-mono text-gray-500">
          Enforced by Next.js Middleware Barrier & Secure Session Cookie
        </div>
      </div>
    </div>
  );
}
