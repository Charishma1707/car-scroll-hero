import React, { useState } from 'react';
import { Volume2, VolumeX, Gauge, Sparkles, Github, RotateCcw } from 'lucide-react';
import { soundEngine } from '../audio/engineSound';

export default function Navbar({ scrollProgress = 0, velocity = 0, onResetScroll }) {
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const calculatedSpeed = Math.round(velocity * 340); // 0 to 340 km/h

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand & Badge */}
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-2xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#def54f] to-[#45db7d] flex items-center justify-center font-display font-black text-black text-sm shadow-glow-lime">
            IF
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black tracking-wider text-xs sm:text-sm text-white flex items-center gap-1.5">
              ITZFIZZ <span className="text-[#45db7d]">LABS</span>
            </span>
            <span className="text-[10px] text-gray-400 font-mono hidden sm:inline-block">
              MCLAREN 720S TELEMETRY
            </span>
          </div>
        </div>

        {/* Real-time Telemetry & Controls HUD */}
        <div className="flex items-center gap-2 sm:gap-3 bg-black/70 backdrop-blur-lg border border-white/10 px-3 sm:px-5 py-2 rounded-full shadow-2xl">
          {/* Speedometer telemetry */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 border-r border-white/10 text-xs font-mono">
            <Gauge className="w-3.5 h-3.5 text-[#def54f]" />
            <span className="text-gray-400 hidden md:inline">SPEED:</span>
            <span className="font-bold text-white min-w-[54px]">
              {calculatedSpeed} <span className="text-[10px] text-gray-400 font-normal">KM/H</span>
            </span>
          </div>

          {/* Scroll progress */}
          <div className="flex items-center gap-1.5 px-2 py-0.5 border-r border-white/10 text-xs font-mono">
            <span className="text-gray-400 hidden sm:inline">TRACK:</span>
            <span className="font-bold text-[#45db7d] min-w-[36px]">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>

          {/* Sound Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-full transition-all flex items-center gap-1.5 text-xs font-mono ${
              !muted
                ? 'bg-[#45db7d]/20 text-[#45db7d] border border-[#45db7d]/40 shadow-glow-green'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
            title={muted ? "Unmute supercar V8 engine audio" : "Mute engine audio"}
            aria-label="Toggle engine sound"
          >
            {!muted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden lg:inline text-[11px]">{muted ? "ENGINE OFF" : "V8 ACTIVE"}</span>
          </button>

          {/* Reset scroll button */}
          <button
            onClick={onResetScroll}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Return to start of track"
            aria-label="Restart animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
