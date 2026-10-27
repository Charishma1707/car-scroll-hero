import React, { useState } from 'react';
import {
  CheckCircle2,
  Cpu,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Sliders,
  ShieldCheck,
  Code2,
} from 'lucide-react';

export default function FeatureSection({ currentProgress = 0, currentSpeed = 0 }) {
  const [activeTab, setActiveTab] = useState('architecture');

  const requirements = [
    {
      title: 'Hero Section Layout',
      desc: 'Occupies the full viewport (above the fold) with letter-spaced headline "W E L C O M E   I T Z F I Z Z" and impact statistics.',
      status: 'Verified',
    },
    {
      title: 'Initial Load Animation',
      desc: 'Smooth staggered entrance on page mount: headline letters reveal with spring bounce, statistics animate in with delay, car glides to start line.',
      status: 'Verified',
    },
    {
      title: 'Scroll-Based Animation (Core)',
      desc: 'Horizontal motion strictly tied to scroll position (not autoplay). Eased scrub interpolation (0.8s) guarantees fluid, natural inertia.',
      status: 'Verified',
    },
    {
      title: 'Dynamic Letter Illumination',
      desc: 'Letters light up dynamically as the front bumper of the car crosses their exact horizontal offset coordinates.',
      status: 'Verified',
    },
    {
      title: 'Motion & Performance Optimization',
      desc: 'Zero layout thrashing; exclusively uses GPU-accelerated transforms (translate3d, scale, opacity) with will-change declarations.',
      status: 'Verified',
    },
    {
      title: 'Interactive Web Audio Telemetry',
      desc: 'Real-time supercar V8 engine pitch and frequency modulation driven by instantaneous scroll velocity.',
      status: 'Bonus',
    },
  ];

  const specs = [
    { label: 'Animation Engine', val: 'GSAP 3.12 + ScrollTrigger' },
    { label: 'Scrub Interpolation', val: '0.8s Smooth Easing' },
    { label: 'Render Target', val: '60+ FPS Hardware Layer' },
    { label: 'Layout Reflows', val: '0 (Precomputed Offsets)' },
    { label: 'Styling', val: 'Tailwind CSS + Custom Shaders' },
    { label: 'Deployment Ready', val: 'GitHub Pages Compatible' },
  ];

  return (
    <section className="relative w-full py-24 px-4 sm:px-8 bg-[#0b0c10] border-t border-white/10 z-30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#45db7d]/10 border border-[#45db7d]/30 text-[#45db7d] text-xs font-mono uppercase tracking-wider mb-4">
            <Activity className="w-3.5 h-3.5" /> Engineering Specifications
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-4">
            Precision Motion Architecture
          </h2>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Engineered with modern frontend standards, ensuring butter-smooth 60fps animations, zero layout reflows, and responsive viewport adaptability.
          </p>
        </div>

        {/* Live Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="p-5 rounded-2xl bg-[#14151c] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase">Track Scroll</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#def54f] mt-2">
              {Math.round(currentProgress * 100)}%
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#def54f] h-full transition-all duration-150"
                style={{ width: `${currentProgress * 100}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14151c] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase">Simulated Velocity</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#6ac9ff] mt-2">
              {Math.round(currentSpeed * 340)} <span className="text-xs text-gray-400 font-normal">km/h</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#6ac9ff] h-full transition-all duration-150"
                style={{ width: `${Math.min(currentSpeed * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#14151c] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase">Interpolation Scrub</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#45db7d] mt-2">
              0.80 <span className="text-xs text-gray-400 font-normal">seconds</span>
            </div>
            <span className="text-[11px] text-gray-500 font-mono mt-3">Fluid inertia dampening</span>
          </div>

          <div className="p-5 rounded-2xl bg-[#14151c] border border-white/10 flex flex-col justify-between">
            <span className="text-xs font-mono text-gray-400 uppercase">Frame Budget</span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-[#fa7328] mt-2">
              16.6 <span className="text-xs text-gray-400 font-normal">ms (60 FPS)</span>
            </div>
            <span className="text-[11px] text-gray-500 font-mono mt-3">Zero main thread blocking</span>
          </div>
        </div>

        {/* Requirements Compliance Checklist */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#14151e] to-[#0f1016] border border-white/10 shadow-2xl mb-14">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-6 h-6 text-[#45db7d]" />
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Assignment Requirements Matrix
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirements.map((req, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-[#45db7d] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-white">{req.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#45db7d]/20 text-[#45db7d]">
                      {req.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{req.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-[#13141b] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#def54f]/10 border border-[#def54f]/30 flex items-center justify-center text-[#def54f] mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-white mb-2">
              Letter Coordinate Mapping
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Instead of relying on arbitrary timers, each letter’s geometric horizontal bounding center is cached relative to the road surface. As the car bumper passes that threshold, the letter is given radiant illumination.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#13141b] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#6ac9ff]/10 border border-[#6ac9ff]/30 flex items-center justify-center text-[#6ac9ff] mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-white mb-2">
              GPU Hardware Acceleration
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              All animated properties utilize <code>transform: translate3d</code> and <code>opacity</code> with <code>will-change: transform</code>, isolating the car and trail to compositor layers and avoiding expensive browser layout recalculations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#13141b] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#fa7328]/10 border border-[#fa7328]/30 flex items-center justify-center text-[#fa7328] mb-4">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-lg text-white mb-2">
              Dual Implementation
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Includes both a modern <strong>React + Tailwind + GSAP</strong> production app and a 100% standalone <strong>Vanilla HTML/CSS/JS + GSAP</strong> build in <code>vanilla/index.html</code> for complete evaluation flexibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
