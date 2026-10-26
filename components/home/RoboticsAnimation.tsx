import React from 'react';

export default function RoboticsAnimation() {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* 2D Planar SVG Telemetry Grid */}
      <svg
        viewBox="0 0 500 500"
        className="absolute w-full h-full max-w-[460px] max-h-[460px] opacity-70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Orbit Ring */}
        <circle
          cx="250"
          cy="250"
          r="220"
          stroke="#1C2536"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />

        {/* Autonomous Navigation Coordinate Grid */}
        <line x1="250" y1="20" x2="250" y2="480" stroke="#1C2536" strokeWidth="1" />
        <line x1="20" y1="250" x2="480" y2="250" stroke="#1C2536" strokeWidth="1" />

        {/* Corner Precision Reticles */}
        <path d="M 60 70 L 60 60 L 70 60" stroke="#00F2FE" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M 440 70 L 440 60 L 430 60" stroke="#00F2FE" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M 60 430 L 60 440 L 70 440" stroke="#00F2FE" strokeWidth="1.5" strokeOpacity="0.5" />
        <path d="M 440 430 L 440 440 L 430 440" stroke="#00F2FE" strokeWidth="1.5" strokeOpacity="0.5" />
      </svg>

      {/* 3D Gyroscopic Orbit Rings (Hardware 3D Composited) */}
      <div
        className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] flex items-center justify-center"
        style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      >
        {/* Ring 1: Primary Electric Cyan Orbit */}
        <div
          className="absolute inset-0 rounded-full border border-[#00F2FE]/30 animate-gyro-1 shadow-[0_0_15px_rgba(0,242,254,0.15)]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#00F2FE] shadow-[0_0_8px_#00F2FE]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00D2E0] opacity-70" />
        </div>

        {/* Ring 2: Cobalt Telemetry Orbit (Dashed) */}
        <div
          className="absolute inset-3 sm:inset-5 rounded-full border border-[#2D7FF9]/35 border-dashed animate-gyro-2"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#2D7FF9] shadow-[0_0_8px_#2D7FF9]" />
        </div>

        {/* Ring 3: Deep Autonomous Navigation Ring */}
        <div
          className="absolute inset-7 sm:inset-10 rounded-full border border-[#00F2FE]/20 animate-gyro-3"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute top-1/4 right-0 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00F2FE] shadow-[0_0_6px_#00F2FE]" />
        </div>
      </div>
    </div>
  );
}
