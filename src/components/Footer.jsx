import React from 'react';
import { Github, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-[#08090d] border-t border-white/5 text-gray-400 font-mono text-xs">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#45db7d]/20 border border-[#45db7d]/40 flex items-center justify-center font-display font-bold text-[#45db7d] text-xs">
            IF
          </div>
          <div>
            <span className="text-white font-bold tracking-wider">ITZFIZZ CAR SCROLL ANIMATION</span>
            <span className="block text-[11px] text-gray-500">Frontend Engineering Assignment Submission</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-gray-400">
          <span className="flex items-center gap-1.5">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> & GSAP ScrollTrigger
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-[#45db7d]">Ready for GitHub Pages</span>
        </div>
      </div>
    </footer>
  );
}
