'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { LuSearch, LuCompass, LuPalette, LuCode, LuRocket } from 'react-icons/lu';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understanding your business, users, and objectives.',
    icon: <LuSearch className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Creating a clear roadmap for successful execution.',
    icon: <LuCompass className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
  },
  {
    number: '03',
    title: 'Design',
    description: 'Designing intuitive and impactful digital experiences.',
    icon: <LuPalette className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
  },
  {
    number: '04',
    title: 'Develop',
    description: 'Building scalable, secure, and high-performing solutions.',
    icon: <LuCode className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
  },
  {
    number: '05',
    title: 'Launch',
    description: 'Delivering, optimizing, and supporting your product for long-term success.',
    icon: <LuRocket className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
  },
];

function WorkCard({
  step,
  index,
  total,
  progress,
}: {
  step: ProcessStep;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const bufferStart = 0.04;
  const bufferEnd = 0.85;
  const activeRange = bufferEnd - bufferStart;
  const cardStep = activeRange / total;

  const entryStart = bufferStart + index * cardStep;
  const entryEnd = entryStart + cardStep;

  // Each card is pinned at index * 72px top offset so their top headers stack vertically
  const topOffset = index * 72;

  // Y Position:
  // All cards (including Card 0) slide up sequentially from 600px down to topOffset
  const y = useTransform(
    progress,
    [0, entryStart, entryEnd, 1],
    [600, 600, 0, 0]
  );

  // Opacity fade in as card slides up
  const opacity = useTransform(
    progress,
    [0, entryStart, entryStart + cardStep * 0.35, 1],
    [0, 0, 1, 1]
  );

  return (
    <motion.div
      style={{
        y,
        opacity,
        top: `${topOffset}px`,
        zIndex: (index + 1) * 10,
        background: 'linear-gradient(135deg, #3c1d96 0%, #28106f 100%)',
      }}
      className="absolute left-0 right-0 w-full max-w-[580px] mx-auto rounded-[22px] sm:rounded-[26px] p-6 sm:p-7 shadow-[0_15px_40px_rgba(40,16,111,0.4)] border border-white/10 select-none overflow-hidden origin-top"
    >
      <div className="flex items-start gap-5 sm:gap-6">
        {/* Big Translucent Number */}
        <div className="text-4xl sm:text-5xl font-bold text-white/30 tracking-tight select-none font-['Plus_Jakarta_Sans',sans-serif] min-w-[50px] sm:min-w-[60px] pt-0.5">
          {step.number}
        </div>

        {/* Right Content */}
        <div className="flex-1">
          {/* Header Line (Icon + Title) */}
          <div className="flex items-center gap-3">
            <div className="p-1.5 sm:p-2 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              {step.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {step.title}
            </h3>
          </div>

          {/* Description Text */}
          <p className="text-white/80 text-xs sm:text-sm font-normal leading-relaxed mt-3 max-w-[420px]">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      id="how-we-work"
      className="relative w-full bg-white"
      style={{ height: `${(steps.length + 2) * 100}vh` }}
    >
      {/* Pinned Sticky Stage: Stays 100% stationary in fullscreen until all cards finish stacking */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-white select-none px-6 sm:px-12 lg:px-20">
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ═══════════════════════════════════════
              LEFT COLUMN — Stationary Title & Intro
              ═══════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-5xl sm:text-6xl lg:text-[68px] font-bold text-[#181538] leading-[1.05] tracking-tight mb-6 sm:mb-8">
              How <br />
              We <br />
              Work
            </h2>

            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-[440px]">
              Our process is built around collaboration, strategy, and precision ensuring every project is thoughtfully planned, expertly executed, and delivered with measurable impact.
            </p>
          </div>

          {/* ═══════════════════════════════════════
              RIGHT COLUMN — Stacked Cards Stage
              ═══════════════════════════════════════ */}
          <div className="lg:col-span-7 relative h-[440px] sm:h-[480px] flex items-start justify-center pt-2">
            {steps.map((step, index) => (
              <WorkCard
                key={step.number}
                step={step}
                index={index}
                total={steps.length}
                progress={scrollYProgress}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
