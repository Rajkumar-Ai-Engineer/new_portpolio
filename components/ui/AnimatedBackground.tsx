'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseAlpha: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Track mouse coordinates for gentle attraction
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Detect theme
    const isLightMode = () => document.documentElement.classList.contains('light');

    // Generate responsive particle count (fewer on mobile to maximize battery & fps)
    const particleCount = width < 768 ? 24 : 45;
    const particles: Particle[] = [];

    const cyanColors = ['#00F2FE', '#00D2E0', '#2D7FF9'];
    const lightColors = ['#0284C7', '#2563EB', '#0D9488'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        color: cyanColors[Math.floor(Math.random() * cyanColors.length)],
        baseAlpha: Math.random() * 0.4 + 0.25,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const light = isLightMode();
      const connectionDist = width < 768 ? 90 : 130;

      // Draw connecting neural synapse lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * (light ? 0.12 : 0.18);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = light
              ? `rgba(2, 132, 199, ${alpha})`
              : `rgba(0, 242, 254, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Mouse proximity slight repulsion/deflection
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 100) {
            const force = (1 - mdist / 100) * 0.5;
            p.x += (mdx / mdist) * force;
            p.y += (mdy / mdist) * force;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = light
          ? lightColors[i % lightColors.length]
          : p.color;
        ctx.globalAlpha = light ? p.baseAlpha * 0.7 : p.baseAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Ambient Breathing Nebula Blobs */}
      <div className="absolute -top-[15%] left-[20%] w-[550px] h-[550px] rounded-full bg-[#00F2FE]/5 dark:bg-[#00F2FE]/5 blur-[140px] animate-ambient-drift" />
      <div className="absolute top-[50%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[#2D7FF9]/5 dark:bg-[#2D7FF9]/6 blur-[160px] animate-ambient-drift-alt" />
      <div className="absolute -bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#00D2E0]/4 dark:bg-[#00D2E0]/5 blur-[130px] animate-ambient-drift" />

      {/* Interactive Neural Synapse Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70 dark:opacity-85"
      />
    </div>
  );
}
