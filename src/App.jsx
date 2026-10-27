import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroScrollSection from './components/HeroScrollSection';
import FeatureSection from './components/FeatureSection';
import Footer from './components/Footer';

export default function App() {
  const [telemetry, setTelemetry] = useState({
    progress: 0,
    velocity: 0,
  });

  const handleScrollUpdate = useCallback(({ progress, velocity }) => {
    setTelemetry({ progress, velocity });
  }, []);

  const handleResetScroll = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex flex-col selection:bg-[#45db7d] selection:text-black">
      {/* Floating Telemetry & Navigation Header */}
      <Navbar
        scrollProgress={telemetry.progress}
        velocity={telemetry.velocity}
        onResetScroll={handleResetScroll}
      />

      {/* Core Hero Scroll Section (Above Fold + Pinned Scroll Animation) */}
      <main className="flex-1 w-full">
        <HeroScrollSection onScrollUpdate={handleScrollUpdate} />

        {/* Feature Specs & Evaluation Breakdown */}
        <FeatureSection
          currentProgress={telemetry.progress}
          currentSpeed={telemetry.velocity}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
