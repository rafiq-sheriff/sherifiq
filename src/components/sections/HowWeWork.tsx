'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  LuSearch,
  LuPalette,
  LuCode,
  LuRocket,
  LuArrowUpRight,
  LuCheck,
  LuSparkles,
  LuPlay,
  LuPause,
  LuChevronRight,
  LuChevronLeft,
} from 'react-icons/lu';

interface Step {
  id: number;
  number: string;
  title: string;
  subtitle: string;
  storyTagline: string;
  storyDescription: string;
  colorAccent: string;
}

const stepsData: Step[] = [
  {
    id: 1,
    number: '01',
    title: 'Discover',
    subtitle: 'We understand your goals, requirements, and vision to define the right direction.',
    storyTagline: 'Phase 01 — Understanding & Alignment',
    storyDescription:
      'We begin by diving deep into your business goals, audience expectations, and functional requirements. Through collaborative discovery, we define a strategic roadmap that grounds your project in clarity and purpose.',
    colorAccent: 'from-[#8b5cf6] to-[#a78bfa]',
  },
  {
    id: 2,
    number: '02',
    title: 'Design',
    subtitle: 'We craft intuitive, visually engaging designs focused on usability and brand identity.',
    storyTagline: 'Phase 02 — Visuals & UX Experience',
    storyDescription:
      'We transform vision into intuitive visual experiences. From high-fidelity UI layouts to interactive design systems, we craft every detail to reflect your brand identity while ensuring flawless user experience.',
    colorAccent: 'from-[#a78bfa] to-[#c084fc]',
  },
  {
    id: 3,
    number: '03',
    title: 'Develop',
    subtitle: 'We build fast, scalable, and reliable digital solutions using modern technologies.',
    storyTagline: 'Phase 03 — Engineering & Scalability',
    storyDescription:
      'We translate designs into clean, production-ready code. Utilizing modern web stacks like React, TypeScript, and Tailwind CSS, we build bulletproof digital products optimized for speed, accessibility, and growth.',
    colorAccent: 'from-[#c084fc] to-[#e879f9]',
  },
  {
    id: 4,
    number: '04',
    title: 'Launch',
    subtitle: 'We test, deploy, and optimize your product to ensure a smooth and successful launch.',
    storyTagline: 'Phase 04 — Optimization & Deployment',
    storyDescription:
      'Before going live, we conduct rigorous multi-device testing, SEO optimization, and speed tuning. We execute a smooth deployment and provide ongoing support to keep your product performing at its peak.',
    colorAccent: 'from-[#e879f9] to-[#8b5cf6]',
  },
];

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.25 });

  // Auto-advance storytelling mode (every 3 seconds)
  useEffect(() => {
    if (!isPlaying || !isInView) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPlaying, isInView]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative w-full bg-white text-neutral-900 py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
    >
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-r from-purple-100/40 via-indigo-100/30 to-pink-100/40 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-[1320px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-700 tracking-wide uppercase mb-4 shadow-sm"
          >
            <LuSparkles className="w-3.5 h-3.5 text-[#8b5cf6]" />
            <span>Our Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-avalance font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#181538]"
          >
            How we work?
          </motion.h2>

          {/* Storyteller Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center flex-wrap gap-2.5 mt-8"
          >
            {stepsData.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStep(s.id);
                  setIsPlaying(false);
                }}
                className={`relative px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${activeStep === s.id
                    ? 'bg-[#181538] text-white shadow-lg shadow-neutral-900/20 scale-105'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-200/80 hover:scale-102'
                  }`}
              >
                <span>{s.number}. {s.title}</span>
                {activeStep === s.id && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full border-2 border-[#8b5cf6]/70 pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            ))}

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Story' : 'Play Story'}
              className="p-2.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-all active:scale-95 cursor-pointer border border-neutral-200/80 ml-1"
            >
              {isPlaying ? <LuPause className="w-4 h-4" /> : <LuPlay className="w-4 h-4" />}
            </button>
          </motion.div>
        </div>

        {/* Workflow Diagram Stage with Connected Curved Dotted Line */}
        <div className="relative mb-16 lg:mb-20">
          {/* Curved Dotted Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 240"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="hero-purple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="33%" stopColor="#a78bfa" />
                  <stop offset="66%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
              </defs>

              {/* Background Base Dotted Path spanning 4 cards */}
              <path
                d="M 150,100 C 250,25 350,25 450,100 C 550,175 650,175 750,100 C 850,25 950,25 1050,100"
                stroke="#E5E7EB"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />

              {/* Active Animated Highlighted Path */}
              <motion.path
                d="M 150,100 C 250,25 350,25 450,100 C 550,175 650,175 750,100 C 850,25 950,25 1050,100"
                stroke="url(#hero-purple-gradient)"
                strokeWidth="3.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
                initial={{ pathLength: 0.05 }}
                animate={{
                  pathLength: activeStep === 1 ? 0.05 : activeStep === 2 ? 0.333 : activeStep === 3 ? 0.666 : 1,
                }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </div>

          {/* 4 Step Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-start relative z-10">

            {/* ═════════════════════════════════════════════════════════
                STEP 1: DISCOVER
               ═════════════════════════════════════════════════════════ */}
            <div
              onClick={() => {
                setActiveStep(1);
                setIsPlaying(false);
              }}
              className="cursor-pointer flex flex-col items-center text-center group"
            >
              {/* Graphic Card */}
              <motion.div
                animate={{
                  y: activeStep === 1 ? -10 : 0,
                  scale: activeStep === 1 ? 1.04 : 1,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className={`relative w-full max-w-[280px] h-[200px] rounded-3xl p-5 flex flex-col justify-between border transition-all duration-500 ${activeStep === 1
                    ? 'border-[#8b5cf6]/50 shadow-[0_20px_40px_rgba(139,92,246,0.18)] bg-white'
                    : 'border-neutral-200/80 bg-neutral-50/80 shadow-md shadow-neutral-200/40 hover:border-neutral-300 hover:bg-white'
                  }`}
              >
                {/* Top Blueprint / Wireframe Lines */}
                <div className="bg-neutral-100/90 rounded-2xl p-3 border border-neutral-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#8b5cf6]" />
                      <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-wider">Discovery</span>
                    </div>
                    <motion.div
                      animate={{ scale: activeStep === 1 ? [1, 1.3, 1] : 1 }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                      className="w-2 h-2 rounded-full bg-emerald-500"
                    />
                  </div>
                  <div className="h-2 w-3/4 bg-neutral-300/80 rounded-full" />
                  <div className="h-1.5 w-1/2 bg-neutral-200 rounded-full" />
                </div>

                {/* Overlapping Bottom Floating Dark Pill */}
                <motion.div
                  animate={{
                    y: activeStep === 1 ? [-2, 2, -2] : 0,
                  }}
                  transition={{ repeat: activeStep === 1 ? Infinity : 0, duration: 3, ease: 'easeInOut' }}
                  className="bg-[#181538] rounded-2xl p-2.5 shadow-xl flex items-center gap-2.5 border border-neutral-800 text-white"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#8b5cf6] to-[#a78bfa] flex items-center justify-center shadow-inner text-white flex-shrink-0">
                    <LuSearch className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-left space-y-0.5 min-w-0">
                    <div className="text-[11px] font-bold text-white tracking-wide truncate">Goals & Vision</div>
                    <div className="text-[9px] text-neutral-400 truncate">Requirement Scope</div>
                  </div>
                  {activeStep === 1 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      className="w-4 h-4 rounded-full bg-[#8b5cf6] text-white flex items-center justify-center text-[9px] flex-shrink-0"
                    >
                      <LuCheck className="w-2.5 h-2.5 stroke-[3]" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* Step Text Info */}
              <div className="mt-6 max-w-[250px]">
                <h3 className="font-avalance font-bold text-lg text-[#181538] mb-1.5 group-hover:text-[#8b5cf6] transition-colors duration-300">
                  01. Discover
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  We understand your goals, requirements, and vision to define the right direction.
                </p>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                STEP 2: DESIGN
               ═════════════════════════════════════════════════════════ */}
            <div
              onClick={() => {
                setActiveStep(2);
                setIsPlaying(false);
              }}
              className="cursor-pointer flex flex-col items-center text-center group"
            >
              {/* Graphic Card */}
              <motion.div
                animate={{
                  y: activeStep === 2 ? -10 : 0,
                  scale: activeStep === 2 ? 1.04 : 1,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className={`relative w-full max-w-[280px] h-[200px] rounded-3xl p-5 flex items-center justify-center border transition-all duration-500 ${activeStep === 2
                    ? 'border-[#a78bfa]/50 shadow-[0_20px_40px_rgba(167,139,250,0.18)] bg-white'
                    : 'border-neutral-200/80 bg-neutral-50/80 shadow-md shadow-neutral-200/40 hover:border-neutral-300 hover:bg-white'
                  }`}
              >
                {/* Visual UI Layout & Color Swatches Preview */}
                <div className="w-full flex flex-col gap-2.5">
                  <div className="bg-neutral-100/90 rounded-2xl p-3 border border-neutral-200/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-neutral-700">UI System</span>
                      <div className="flex items-center gap-1">
                        <motion.div
                          animate={{ scale: activeStep === 2 ? [1, 1.25, 1] : 1 }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0 }}
                          className="w-2.5 h-2.5 rounded-full bg-[#8b5cf6]"
                        />
                        <motion.div
                          animate={{ scale: activeStep === 2 ? [1, 1.25, 1] : 1 }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                          className="w-2.5 h-2.5 rounded-full bg-[#a78bfa]"
                        />
                        <motion.div
                          animate={{ scale: activeStep === 2 ? [1, 1.25, 1] : 1 }}
                          transition={{ repeat: Infinity, duration: 2, delay: 0.4 }}
                          className="w-2.5 h-2.5 rounded-full bg-[#c084fc]"
                        />
                      </div>
                    </div>
                    <div className="h-2 w-full bg-neutral-200 rounded-full" />
                    <div className="h-1.5 w-2/3 bg-neutral-200/80 rounded-full" />
                  </div>

                  <div className="flex items-center justify-between px-2">
                    <span className="text-[9px] font-mono font-semibold text-neutral-400 uppercase">UX Wireframe</span>
                    <span className="text-[9px] font-bold text-[#8b5cf6]">100% Brand Fit</span>
                  </div>
                </div>

                {/* Top Right Floating Design Palette Badge */}
                <motion.div
                  animate={{
                    y: activeStep === 2 ? [-3, 3, -3] : 0,
                  }}
                  transition={{ repeat: activeStep === 2 ? Infinity : 0, duration: 3.5, ease: 'easeInOut' }}
                  className="absolute top-3.5 right-3.5 bg-white rounded-xl p-1.5 shadow-lg border border-neutral-200/80 flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#181538] text-white flex items-center justify-center shadow-sm">
                    <LuPalette className="w-3.5 h-3.5 text-[#a78bfa]" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Step Text Info */}
              <div className="mt-6 max-w-[250px]">
                <h3 className="font-avalance font-bold text-lg text-[#181538] mb-1.5 group-hover:text-[#a78bfa] transition-colors duration-300">
                  02. Design
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  We craft intuitive, visually engaging designs focused on usability and brand identity.
                </p>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                STEP 3: DEVELOP
               ═════════════════════════════════════════════════════════ */}
            <div
              onClick={() => {
                setActiveStep(3);
                setIsPlaying(false);
              }}
              className="cursor-pointer flex flex-col items-center text-center group"
            >
              {/* Graphic Card */}
              <motion.div
                animate={{
                  y: activeStep === 3 ? -10 : 0,
                  scale: activeStep === 3 ? 1.04 : 1,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className={`relative w-full max-w-[280px] h-[200px] rounded-3xl p-5 flex items-center justify-center border transition-all duration-500 ${activeStep === 3
                    ? 'border-[#c084fc]/50 shadow-[0_20px_40px_rgba(192,132,252,0.18)] bg-white'
                    : 'border-neutral-200/80 bg-neutral-50/80 shadow-md shadow-neutral-200/40 hover:border-neutral-300 hover:bg-white'
                  }`}
              >
                {/* Tech Stack Bar Chart */}
                <div className="w-full flex flex-col gap-2 pt-1">
                  <div className="flex items-center justify-between px-1 text-[10px] font-mono font-semibold text-neutral-500">
                    <span>Clean Code</span>
                    <span className="text-[#8b5cf6] font-bold">&lt;JSX / TS&gt;</span>
                  </div>
                  <div className="flex items-end gap-2.5 h-16 px-1">
                    {[
                      { height: 'h-8', label: 'React', delay: 0 },
                      { height: 'h-12', label: 'TS', delay: 0.08 },
                      { height: 'h-10', label: 'CSS', delay: 0.16 },
                      { height: 'h-16', label: 'API', delay: 0.24 },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <motion.div
                          initial={{ scaleY: 0.3 }}
                          animate={{
                            scaleY: activeStep === 3 ? 1 : 0.82,
                            height: bar.height,
                          }}
                          transition={{
                            duration: 0.6,
                            delay: bar.delay,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`w-full rounded-md transition-colors duration-300 origin-bottom ${activeStep === 3 && i === 3
                              ? 'bg-gradient-to-t from-[#8b5cf6] to-[#c084fc] shadow-md'
                              : 'bg-[#181538]'
                            }`}
                        />
                        <span className="text-[8px] font-bold text-neutral-400 uppercase">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Right Floating Code QA Badge */}
                <motion.div
                  animate={{
                    y: activeStep === 3 ? [-3, 3, -3] : 0,
                  }}
                  transition={{ repeat: activeStep === 3 ? Infinity : 0, duration: 3.5, ease: 'easeInOut' }}
                  className="absolute top-3.5 right-3.5 bg-white rounded-xl p-1.5 shadow-lg border border-neutral-200/80 flex items-center justify-center"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#181538] text-white flex items-center justify-center shadow-sm">
                    <LuCode className="w-3.5 h-3.5 text-[#c084fc]" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Step Text Info */}
              <div className="mt-6 max-w-[250px]">
                <h3 className="font-avalance font-bold text-lg text-[#181538] mb-1.5 group-hover:text-[#c084fc] transition-colors duration-300">
                  03. Develop
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  We build fast, scalable, and reliable digital solutions using modern technologies.
                </p>
              </div>
            </div>

            {/* ═════════════════════════════════════════════════════════
                STEP 4: LAUNCH
               ═════════════════════════════════════════════════════════ */}
            <div
              onClick={() => {
                setActiveStep(4);
                setIsPlaying(false);
              }}
              className="cursor-pointer flex flex-col items-center text-center group"
            >
              {/* Graphic Card */}
              <motion.div
                animate={{
                  y: activeStep === 4 ? -10 : 0,
                  scale: activeStep === 4 ? 1.04 : 1,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                className={`relative w-full max-w-[280px] h-[200px] rounded-3xl p-5 flex items-center justify-center border transition-all duration-500 ${activeStep === 4
                    ? 'border-[#e879f9]/50 shadow-[0_20px_40px_rgba(232,121,249,0.18)] bg-white'
                    : 'border-neutral-200/80 bg-neutral-50/80 shadow-md shadow-neutral-200/40 hover:border-neutral-300 hover:bg-white'
                  }`}
              >
                {/* Main Dark Card Widget */}
                <div className="w-44 bg-[#181538] text-white rounded-2xl p-3.5 shadow-2xl border border-neutral-800 relative flex flex-col justify-between h-[145px]">
                  {/* Top Stats */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-[#8b5cf6]/20 text-[#a78bfa] flex items-center justify-center">
                        <LuArrowUpRight className="w-3 h-3" />
                      </div>
                      <span className="text-[10px] text-neutral-400 font-medium">Performance</span>
                    </div>
                    <div className="text-lg font-bold tracking-tight text-white pl-6">
                      100% Score
                    </div>
                  </div>

                  {/* Bottom Stats */}
                  <div className="pt-1.5 border-t border-neutral-800/80 flex items-center justify-between">
                    <div className="text-[9px] text-neutral-400 font-mono tracking-wider">
                      Optimized
                    </div>
                    <div className="text-[10px] font-bold text-[#e879f9] tracking-tight flex items-center gap-1">
                      <span>Live</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e879f9] animate-pulse" />
                    </div>
                  </div>

                  {/* Protruding Floating "+ Launch" Button on Left */}
                  <motion.div
                    animate={{
                      scale: activeStep === 4 ? [1, 1.06, 1] : 1,
                    }}
                    transition={{ repeat: activeStep === 4 ? Infinity : 0, duration: 2.5, ease: 'easeInOut' }}
                    className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white text-[#181538] px-2.5 py-1 rounded-full shadow-xl border border-neutral-200 font-semibold text-[11px] flex items-center gap-1 hover:bg-neutral-50 transition-all"
                  >
                    <LuRocket className="w-3 h-3 text-[#8b5cf6]" />
                    <span>Launch</span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Step Text Info */}
              <div className="mt-6 max-w-[250px]">
                <h3 className="font-avalance font-bold text-lg text-[#181538] mb-1.5 group-hover:text-[#e879f9] transition-colors duration-300">
                  04. Launch
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed font-normal">
                  We test, deploy, and optimize your product to ensure a smooth and successful launch.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Storytelling Narrative Banner at Bottom */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {stepsData.map((step) => {
              if (step.id !== activeStep) return null;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#181538] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
                >
                  <div className="space-y-2 relative z-10 max-w-xl">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#a78bfa]">
                      {step.storyTagline}
                    </span>
                    <h4 className="font-avalance font-semibold text-lg sm:text-xl text-white tracking-tight">
                      Step {step.number}. {step.title} — Value & Execution
                    </h4>
                    <p className="text-sm text-neutral-300 leading-relaxed">
                      {step.storyDescription}
                    </p>
                  </div>

                  {/* Step Switcher Arrows */}
                  <div className="flex items-center gap-2 relative z-10 self-end md:self-center">
                    <button
                      onClick={() => {
                        setActiveStep((prev) => (prev === 1 ? 4 : prev - 1));
                        setIsPlaying(false);
                      }}
                      className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-all active:scale-90 cursor-pointer border border-neutral-700"
                    >
                      <LuChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveStep((prev) => (prev % 4) + 1);
                        setIsPlaying(false);
                      }}
                      className="p-3 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-all active:scale-90 cursor-pointer border border-neutral-700"
                    >
                      <LuChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Decorative Subtle Background Glow */}
                  <div className={`absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-gradient-to-br ${step.colorAccent} opacity-20 blur-2xl pointer-events-none`} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}






