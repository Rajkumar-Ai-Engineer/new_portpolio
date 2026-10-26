'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, ZoomOut, RotateCcw, Download, Maximize2 } from 'lucide-react';

interface ArchitectureViewerProps {
  imageUrl: string;
  altText: string;
  title: string;
}

export default function ArchitectureViewer({ imageUrl, altText, title }: ArchitectureViewerProps) {
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => setScale((s) => Math.min(2.5, s + 0.25));
  const handleZoomOut = () => setScale((s) => Math.max(0.75, s - 0.25));
  const handleReset = () => setScale(1);

  return (
    <div className="rounded-[16px] bg-[#0D111A] border border-[#1C2536] overflow-hidden space-y-3">
      {/* Viewer Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#121824] border-b border-[#1C2536] text-xs font-mono">
        <div className="flex items-center gap-2 text-gray-300">
          <span className="w-2 h-2 rounded-full bg-[#00F2FE]" />
          <span className="font-semibold text-white">System Architecture & Data Flow</span>
          <span className="text-gray-500 hidden sm:inline">| Scale: {Math.round(scale * 100)}%</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleZoomOut}
            className="p-1.5 rounded-md bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
            aria-label="Zoom out diagram"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-md bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
            aria-label="Reset zoom to 100%"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1.5 rounded-md bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors"
            aria-label="Zoom in diagram"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <a
            href={imageUrl}
            download={`${title.toLowerCase().replace(/\s+/g, '-')}-architecture.webp`}
            className="flex items-center gap-1 px-2 py-1 rounded-md bg-[#0D111A] border border-[#1C2536] text-gray-300 hover:text-[#00F2FE] hover:border-[#00F2FE] transition-colors ml-1"
            aria-label="Download original high-resolution architecture diagram"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      {/* Interactive Pan/Zoom Canvas Frame */}
      <div className="relative w-full overflow-auto p-4 flex items-center justify-center min-h-[380px] max-h-[580px] bg-[#07090E]/80">
        <div
          className="transition-transform duration-150 origin-center relative w-full h-[360px] sm:h-[480px]"
          style={{ transform: `scale(${scale})` }}
        >
          <Image
            src={imageUrl}
            alt={altText}
            fill
            className="object-contain"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      </div>

      {/* Caption & Accessibility Context */}
      <div className="px-4 pb-3 text-xs font-mono text-gray-400">
        <p className="line-clamp-1">
          <strong className="text-gray-300">Figure 1.0:</strong> {altText}
        </p>
      </div>
    </div>
  );
}
