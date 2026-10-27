import React, { useEffect, useState, useRef } from 'react';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

export default function MetricCard({
  id,
  number,
  numericVal = 0,
  label,
  bgColor = '#def54f',
  textColor = '#111111',
  glowShadow = '',
  positionClasses = '',
  style = {},
  isPassed = false,
  cardRef,
}) {
  const [displayNumber, setDisplayNumber] = useState(0);
  const hasAnimated = useRef(false);

  // Animate count on load and update smoothly
  useEffect(() => {
    let animationFrame;
    const duration = 1000; // ms
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(easeOut * numericVal);
      setDisplayNumber(currentVal);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setDisplayNumber(numericVal);
      }
    };

    const timer = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount);
    }, 400);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrame);
    };
  }, [numericVal]);

  const isDecrease = label.toLowerCase().includes('decrease') || label.toLowerCase().includes('decreased');

  return (
    <div
      id={id}
      ref={cardRef}
      style={{
        backgroundColor: bgColor,
        color: textColor,
        ...style,
      }}
      className={`metric-card rounded-2xl p-4 sm:p-6 md:p-7 shadow-2xl flex flex-col justify-center items-start gap-1 transition-all duration-300 will-change-transform z-20 border select-none ${
        isPassed ? 'ring-2 ring-white/50 scale-[1.04] shadow-2xl' : 'border-black/10'
      } ${glowShadow} ${positionClasses}`}
    >
      <div className="flex items-center justify-between w-full gap-4">
        <span className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-tight leading-none">
          {displayNumber}%
        </span>
        <div className={`p-1.5 rounded-full ${isDecrease ? 'bg-black/10' : 'bg-black/10'}`}>
          {isDecrease ? (
            <ArrowDownRight className="w-4 h-4 md:w-5 md:h-5 opacity-80" />
          ) : (
            <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 opacity-80" />
          )}
        </div>
      </div>
      <p className="text-xs sm:text-sm md:text-base font-semibold leading-snug mt-1 opacity-90 max-w-[200px]">
        {label}
      </p>
    </div>
  );
}
