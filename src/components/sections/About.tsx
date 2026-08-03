'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, MotionValue } from 'framer-motion';

// Animated Counter component
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

const statistics = [
  {
    label: 'Project Delivered',
    number: 10,
    suffix: '+',
  },
  {
    label: 'Websites Build',
    number: 10,
    suffix: '+',
  },
  {
    label: 'Web Applications',
    number: 2,
    suffix: '+',
  },
  {
    label: 'Saas Products',
    number: 4,
    suffix: '+',
  },
];

// Scroll Word Illumination
function ScrollWordHighlight({ text }: { text: string }) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.88', 'start 0.25'],
  });

  const words = text.split(' ');

  return (
    <h2
      ref={containerRef}
      className="text-2xl sm:text-4xl md:text-5xl lg:text-[44px] xl:text-[48px] font-normal leading-[1.35] tracking-tight text-center max-w-4xl lg:max-w-5xl mx-auto flex flex-wrap justify-center gap-x-[0.28em] gap-y-2 select-none z-10 relative"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 2.2 / words.length);
        return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
      })}
    </h2>
  );
}

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.35, 1]);
  const color = useTransform(
    progress,
    range,
    ['rgba(139, 155, 180, 0.45)', 'rgba(255, 255, 255, 1)']
  );
  const fontWeight = useTransform(progress, range, [400, 700]);

  return (
    <motion.span
      style={{ opacity, color, fontWeight }}
      className="transition-colors duration-150 transform-gpu"
    >
      {word}
    </motion.span>
  );
}

export default function About() {
  const aboutHeadline =
    'We create websites, SaaS platforms, AI solutions, and brand experiences that help ambitious businesses grow with confidence and long-term impact';

  return (
    <section className="relative w-full bg-transparent text-white py-24 sm:py-32 lg:py-20 px-6 sm:px-12 lg:px-16 overflow-hidden select-none border-b border-white/5">

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Top Outline Badge with Black Background & Rotating ColorBends Border Beam */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16"
        >
          <div className="relative inline-flex items-center justify-center overflow-hidden rounded-full p-[1.5px] focus:outline-none">
            {/* Clockwise rotating conic gradient border beam matching SavedColorBendsBackground (#1e40af, #2563eb, #3b82f6, #60a5fa, #ffffff) */}
            <span className="absolute inset-[-1000%] animate-[spin_3.5s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#1e40af_28%,#2563eb_40%,#3b82f6_46%,#ffffff_50%,#3b82f6_54%,#2563eb_60%,#1e40af_72%,transparent_80%)]" />

            {/* Inner Badge Mask Container (relative z-10 ensures solid black background covers interior) */}
            <div className="relative z-10 inline-flex items-center gap-2 rounded-full bg-[#05030a] px-4 py-1.5 text-xs sm:text-sm font-medium text-white border border-white/10">
              {/* Static White Sparkle Star Icon */}
              <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="tracking-wide text-neutral-200 font-light">About Us</span>
            </div>
          </div>
        </motion.div>

        {/* Headline Container with Centered Background Watermark Text using 'font-rosnoc' */}
        <div className="relative w-full flex items-center justify-center py-6 sm:py-12 my-2 text-center">
          {/* Centered Watermark Text 'SHERIFIQ' in Navbar Font (Rosnoc) with Lighter Animated Shiny Shimmer */}
          <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 font-rosnoc text-7xl sm:text-9xl md:text-[140px] lg:text-[180px] xl:text-[220px] tracking-[0.18em] uppercase pointer-events-none select-none whitespace-nowrap z-0 text-center w-full bg-gradient-to-r from-white/[0.025] via-white/[0.20] to-white/[0.025] bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_6s_infinite_linear]">
            SHERIFIQ
          </div>

          {/* Centered Scroll Highlight Headline */}
          <ScrollWordHighlight text={aboutHeadline} />
        </div>

        {/* Bottom Stats Grid (4 columns centered and separated by thin vertical divider lines) */}
        <div className="w-full max-w-6xl mx-auto mt-20 sm:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/15 text-center pt-2">
          {statistics.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-between text-center ${idx !== 0 ? 'pt-6 md:pt-0 md:px-4 lg:px-6' : ''
                }`}
            >
              <span className="text-sm sm:text-base text-neutral-300 font-light block mb-6 sm:mb-10 text-center">
                {stat.label}
              </span>
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-[92px] font-light text-white tracking-tight leading-none flex items-baseline justify-center text-center">
                <AnimatedCounter value={stat.number} />
                <span>{stat.suffix}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
