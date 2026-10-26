import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, Home, Layers } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#0D111A] border border-[#1C2536] flex items-center justify-center mx-auto text-[#00F2FE]">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono text-[#00F2FE]">HTTP 404 // RESOURCE_NOT_FOUND</span>
          <h1 className="text-3xl font-extrabold text-white">Project or Route Missing</h1>
          <p className="text-sm text-gray-400">
            The requested architecture case study, document, or path does not exist or has been relocated safely.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-semibold text-[#07090E] bg-[#00F2FE] hover:bg-[#00D2E0] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono text-gray-300 bg-[#0D111A] border border-[#1C2536] hover:text-[#00F2FE] transition-colors"
          >
            <Layers className="w-4 h-4" />
            <span>Browse 34 Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
