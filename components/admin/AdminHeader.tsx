'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '@/components/ui/ThemeToggle';
import {
  Shield,
  Layers,
  FileText,
  Inbox,
  LogOut,
  ExternalLink,
  ChevronRight,
  Loader2,
  Menu,
  X,
} from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If currently on login page, don't show admin header
  if (pathname === '/admin/login') {
    return null;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
      window.location.href = '/admin/login';
    } finally {
      setLoggingOut(false);
    }
  };

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: Shield },
    { name: 'Projects', href: '/admin/projects', icon: Layers },
    { name: 'Case-Study PDFs', href: '/admin/pdf', icon: FileText },
    { name: 'Inquiries', href: '/admin/inquiries', icon: Inbox },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#07090E]/95 backdrop-blur-md border-b border-[#1C2536]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Badge */}
          <div className="flex items-center gap-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#00F2FE]/10 border border-[#00F2FE]/30 flex items-center justify-center text-[#00F2FE]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm text-white block leading-none">
                  Rajkumar V.
                </span>
                <span className="text-[10px] font-mono text-[#00F2FE]">
                  ADMIN CONSOLE
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono transition-colors ${
                      isActive
                        ? 'bg-[#161F30] text-[#00F2FE] border border-[#00F2FE]/30'
                        : 'text-gray-400 hover:text-white hover:bg-[#121824]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D111A] border border-[#1C2536] text-[11px] font-mono text-gray-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>admin@rajkumar-ai.com</span>
            </div>

            <ThemeToggle />

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded text-xs font-mono text-gray-400 hover:text-white hover:bg-[#121824] transition-colors border border-transparent hover:border-[#1C2536]"
              title="Open public portfolio website in new tab"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-transparent hover:border-red-500/30 transition-colors"
            >
              {loggingOut ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <LogOut className="w-3.5 h-3.5" />
              )}
              <span>Log Out</span>
            </button>
          </div>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#0D111A] border border-[#1C2536] text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D111A] border-b border-[#1C2536] px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-mono ${
                  isActive ? 'bg-[#161F30] text-[#00F2FE]' : 'text-gray-300 hover:bg-[#121824]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
              </Link>
            );
          })}

          <div className="pt-2 border-t border-[#1C2536] flex items-center justify-between">
            <Link
              href="/"
              target="_blank"
              className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
