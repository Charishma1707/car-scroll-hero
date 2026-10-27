import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MetricCard from './MetricCard';
import { soundEngine } from '../audio/engineSound';
import { ChevronDown, Zap, Gauge, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Headline text letters array for individual staggered reveal & scroll lighting
const HEADLINE_LETTERS = [
  { char: 'W', id: 0 },
  { char: 'E', id: 1 },
  { char: 'L', id: 2 },
  { char: 'C', id: 3 },
  { char: 'O', id: 4 },
  { char: 'M', id: 5 },
  { char: 'E', id: 6 },
  { char: ' ', id: 7, isSpace: true },
  { char: 'I', id: 8 },
  { char: 'T', id: 9 },
  { char: 'Z', id: 10 },
  { char: 'F', id: 11 },
  { char: 'I', id: 12 },
  { char: 'Z', id: 13 },
  { char: 'Z', id: 14 },
];

const METRICS_DATA = [
  {
    id: 'box1',
    number: '58%',
    numericVal: 58,
    label: 'Increase in pick up point use',
    bgColor: '#def54f', // Neon Lime
    textColor: '#0f172a',
    glowShadow: 'shadow-glow-lime',
    positionClasses: 'top-[4%] sm:top-[6%] md:top-[8%] right-[22%] sm:right-[26%] md:right-[30%]',
    threshold: 0.22,
  },
  {
    id: 'box2',
    number: '23%',
    numericVal: 23,
    label: 'Decreased in customer phone calls',
    bgColor: '#6ac9ff', // Sky Cyan
    textColor: '#0f172a',
    glowShadow: 'shadow-glow-cyan',
    positionClasses: 'bottom-[4%] sm:bottom-[6%] md:bottom-[8%] right-[28%] sm:right-[32%] md:right-[36%]',
    threshold: 0.44,
  },
  {
    id: 'box3',
    number: '27%',
    numericVal: 27,
    label: 'Increase in route speed efficiency',
    bgColor: '#1e2029', // Dark Carbon
    textColor: '#ffffff',
    glowShadow: 'shadow-[0_0_25px_rgba(255,255,255,0.15)]',
    positionClasses: 'top-[4%] sm:top-[6%] md:top-[8%] right-[4%] sm:right-[7%] md:right-[9%]',
    threshold: 0.68,
  },
  {
    id: 'box4',
    number: '40%',
    numericVal: 40,
    label: 'Decreased turnaround dispatch time',
    bgColor: '#fa7328', // Hyper Orange
    textColor: '#0f172a',
    glowShadow: 'shadow-glow-orange',
    positionClasses: 'bottom-[4%] sm:bottom-[6%] md:bottom-[8%] right-[6%] sm:right-[10%] md:right-[13%]',
    threshold: 0.88,
  },
];

export default function HeroScrollSection({ onScrollUpdate }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const roadRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);
  const headlineRef = useRef(null);
  const lettersRef = useRef([]);
  const cardRefs = useRef([]);
  const headlightsRef = useRef(null);

  const [activeCards, setActiveCards] = useState({
    box1: false,
    box2: false,
    box3: false,
    box4: false,
  });

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const road = roadRef.current;
    const car = carRef.current;
    const trail = trailRef.current;
    const headline = headlineRef.current;
    const letters = lettersRef.current.filter(Boolean);

    if (!section || !track || !road || !car || !trail) return;

    // Cache layout dimensions to prevent layout thrashing on scroll
    let roadWidth = road.offsetWidth;
    let carWidth = car.offsetWidth || 180;
    let maxTravel = roadWidth - carWidth + 40;
    let letterPositions = [];

    const calculatePositions = () => {
      roadWidth = road.offsetWidth;
      carWidth = car.offsetWidth || 180;
      maxTravel = roadWidth - carWidth + 40;

      const roadRect = road.getBoundingClientRect();
      letterPositions = letters.map((letterEl) => {
        if (!letterEl) return 0;
        const rect = letterEl.getBoundingClientRect();
        return rect.left - roadRect.left + rect.width / 2;
      });
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);

    // ==========================================
    // 1. INITIAL LOAD ANIMATION (Timeline)
    // ==========================================
    const introTl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      delay: 0.2,
    });

    // Animate road entrance with slight scale
    introTl.fromTo(
      road,
      { opacity: 0, scaleY: 0.85 },
      { opacity: 1, scaleY: 1, duration: 0.8 }
    );

    // Car glides onto the starting grid with headlights powering up
    introTl.fromTo(
      car,
      { x: -160, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: 'power2.out' },
      '-=0.5'
    );

    if (headlightsRef.current) {
      introTl.fromTo(
        headlightsRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 0.85, scale: 1, duration: 0.7 },
        '-=0.4'
      );
    }

    // Headline letters staggered initial entry (fade + slight movement)
    introTl.fromTo(
      letters,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 0.22,
        stagger: 0.04,
        duration: 0.75,
        ease: 'power3.out',
      },
      '-=0.7'
    );

    // Statistics animate in one by one with a subtle delay (Requirement 2)
    const validCards = cardRefs.current.filter(Boolean);
    if (validCards.length > 0) {
      introTl.fromTo(
        validCards,
        { y: 25, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 0.95,
          scale: 1,
          stagger: 0.16, // Animate one by one with a subtle delay
          duration: 0.65,
          ease: 'back.out(1.3)',
        },
        '-=0.4'
      );
    }

    // ==========================================
    // 2. SCROLL-BASED ANIMATION (Core Feature)
    // ==========================================
    let lastCarX = 0;
    let lastTime = performance.now();

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=160%', // 1.6x screen scroll distance for comfortable pacing
      pin: track,
      scrub: 0.8, // Buttery smooth interpolation / inertia
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentCarX = progress * maxTravel;

        // Performant GPU transform for car position
        gsap.set(car, { x: currentCarX, force3D: true });

        // Trail follows precisely behind the car's mid-front axle
        const trailWidth = Math.max(0, currentCarX + carWidth * 0.45);
        gsap.set(trail, { width: trailWidth, force3D: true });

        // Letter illumination logic based on car X position
        const carFrontX = currentCarX + carWidth * 0.75;
        letters.forEach((letterEl, i) => {
          if (!letterEl) return;
          const letterX = letterPositions[i];
          if (carFrontX >= letterX) {
            letterEl.classList.add('letter-active');
          } else {
            letterEl.classList.remove('letter-active');
          }
        });

        // Metric Card milestone triggers
        setActiveCards({
          box1: progress >= METRICS_DATA[0].threshold,
          box2: progress >= METRICS_DATA[1].threshold,
          box3: progress >= METRICS_DATA[2].threshold,
          box4: progress >= METRICS_DATA[3].threshold,
        });

        // Calculate scroll velocity for audio engine and speedometer
        const now = performance.now();
        const deltaTime = Math.max(now - lastTime, 16);
        const deltaX = Math.abs(currentCarX - lastCarX);
        const instantaneousVelocity = Math.min((deltaX / deltaTime) * 1.8, 1);
        lastCarX = currentCarX;
        lastTime = now;

        soundEngine.updateVelocity(instantaneousVelocity);

        if (onScrollUpdate) {
          onScrollUpdate({
            progress,
            velocity: instantaneousVelocity,
          });
        }
      },
    });

    // Individual GSAP tweens for metric card dynamic reveals
    METRICS_DATA.forEach((metric, index) => {
      const cardEl = cardRefs.current[index];
      if (!cardEl) return;

      ScrollTrigger.create({
        trigger: section,
        start: () => `top+=${metric.threshold * 100}% top`,
        end: () => `top+=${(metric.threshold + 0.15) * 100}% top`,
        scrub: 0.5,
        onEnter: () => {
          gsap.to(cardEl, {
            opacity: 1,
            scale: 1.05,
            duration: 0.3,
            ease: 'back.out(1.5)',
          });
        },
        onLeaveBack: () => {
          gsap.to(cardEl, {
            opacity: 0.35,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.out',
          });
        },
      });
    });

    return () => {
      window.removeEventListener('resize', calculatePositions);
      scrollTriggerInstance.kill();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === section) t.kill();
      });
      introTl.kill();
    };
  }, [onScrollUpdate]);

  return (
    <div ref={sectionRef} className="relative w-full bg-[#0b0c10]" id="hero-section">
      {/* Sticky Pinned Track Container */}
      <div
        ref={trackRef}
        className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden bg-gradient-to-b from-[#0b0c10] via-[#12131a] to-[#0b0c10]"
      >
        {/* Ambient background glow and grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(69,219,125,0.06),transparent_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

        {/* Top Header Eyebrow (Above Fold) */}
        <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-30 pointer-events-none px-4 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs font-mono text-[#45db7d] tracking-wider uppercase backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#45db7d] animate-ping" />
            Interactive Scroll Experience
          </span>
          <span className="hidden md:inline-flex text-xs text-gray-400 font-mono">
            Scroll down to accelerate
          </span>
        </div>

        {/* 4 Metric Cards positioned in upper and lower zones */}
        {METRICS_DATA.map((metric, idx) => (
          <MetricCard
            key={metric.id}
            id={metric.id}
            cardRef={(el) => (cardRefs.current[idx] = el)}
            number={metric.number}
            numericVal={metric.numericVal}
            label={metric.label}
            bgColor={metric.bgColor}
            textColor={metric.textColor}
            glowShadow={metric.glowShadow}
            positionClasses={`absolute ${metric.positionClasses}`}
            isPassed={activeCards[metric.id]}
          />
        ))}

        {/* The Road Surface */}
        <div
          ref={roadRef}
          id="road"
          className="relative w-full h-[180px] sm:h-[220px] md:h-[250px] road-texture shadow-2xl flex items-center overflow-hidden border-y-2 border-white/10"
        >
          {/* Top Race Curb (Red & White FIA Curb) */}
          <div className="absolute top-0 left-0 right-0 h-2 sm:h-2.5 curb-marking-top z-10 opacity-80" />

          {/* Road Asphalt Center Markings */}
          <div className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2 asphalt-marking z-0 opacity-40 pointer-events-none" />

          {/* Kinetic Neon Energy Trail following behind the car */}
          <div
            ref={trailRef}
            id="trail"
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-[#45db7d]/80 to-[#45db7d] z-1 shadow-glow-green"
            style={{ width: '0px' }}
          >
            {/* Trail inner light sweep */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-pulse" />
          </div>

          {/* The High-Impact Letter-Spaced Headline */}
          <div
            ref={headlineRef}
            className="absolute left-6 sm:left-12 md:left-16 z-10 flex items-center select-none pointer-events-none text-4xl sm:text-6xl md:text-7xl lg:text-[6.8rem] font-display font-black tracking-[0.2em] sm:tracking-[0.28em] md:tracking-[0.35em]"
          >
            {HEADLINE_LETTERS.map((item, idx) =>
              item.isSpace ? (
                <span key={item.id} className="inline-block w-4 sm:w-8 md:w-12">
                  &nbsp;
                </span>
              ) : (
                <span
                  key={item.id}
                  ref={(el) => (lettersRef.current[idx] = el)}
                  className="value-letter inline-block text-white transition-all duration-200 transform-gpu opacity-15"
                >
                  {item.char}
                </span>
              )
            )}
          </div>

          {/* Sports Car Element (McLaren 720S Top View) */}
          <div
            ref={carRef}
            id="car"
            className="absolute top-1/2 -translate-y-1/2 left-0 z-20 h-[140px] sm:h-[170px] md:h-[200px] w-[140px] sm:w-[170px] md:w-[200px] flex items-center justify-center gpu-layer pointer-events-none"
          >
            {/* Headlights Beam Projecting Ahead */}
            <div
              ref={headlightsRef}
              className="absolute left-[70%] top-1/2 -translate-y-1/2 w-[180px] sm:w-[260px] h-[100px] sm:h-[130px] bg-gradient-to-r from-cyan-300/40 via-cyan-400/15 to-transparent rounded-r-full blur-md pointer-events-none transform -rotate-1 origin-left"
            />
            {/* Headlights Beam Second Layer */}
            <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-[120px] sm:w-[180px] h-[60px] sm:h-[80px] bg-gradient-to-r from-white/70 via-cyan-200/20 to-transparent rounded-r-full blur-sm pointer-events-none" />

            {/* Car Image Asset */}
            <img
              src="./car.png"
              alt="McLaren 720S Supercar"
              className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] z-20"
              loading="eager"
            />

            {/* Rear Exhaust / Afterburner Glow */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#45db7d] rounded-full blur-md opacity-70" />
          </div>

          {/* Bottom Race Curb */}
          <div className="absolute bottom-0 left-0 right-0 h-2 sm:h-2.5 curb-marking-bottom z-10 opacity-80" />
        </div>

        {/* Scroll Indicator Prompt (at bottom of hero) */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30 pointer-events-none">
          <span className="text-[11px] font-mono tracking-widest text-gray-400 uppercase flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[#45db7d]" /> Scroll to Accelerate
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 rounded-full bg-[#45db7d] animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
