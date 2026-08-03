'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Logo3D from './Logo3D';
import HeroLightBeam from '../Backgrounds/HeroLightBeam';
// Saved previous background component for future use:
import SavedColorBendsBackground from '../Backgrounds/SavedColorBendsBackground';

interface LogoHeroProps {
  useSavedBackground?: boolean;
  isRevealed?: boolean;
}

export default function LogoHero({ useSavedBackground = false, isRevealed = true }: LogoHeroProps) {
  const tintColor = '#8b5cf6';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsInteractive(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsInteractive(false);
    }
  }, [isRevealed]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth spring physics for hero section scale & border radius
  const rawScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.93]);
  const rawRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);

  const scale = useSpring(rawScale, { stiffness: 120, damping: 20, mass: 0.2 });
  const borderRadius = useSpring(rawRadius, { stiffness: 120, damping: 20, mass: 0.2 });

  // Downward scroll physics for 3D metal logo when scrolling away from hero
  const rawLogoY = useTransform(scrollYProgress, [0, 0.85], [0, 650]);
  const logoY = useSpring(rawLogoY, { stiffness: 120, damping: 20, mass: 0.2 });

  return (
    <div id="hero" ref={containerRef} className="relative w-full bg-white select-none">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-0 overflow-hidden bg-white">
        <motion.section
          style={{
            scale,
            borderRadius,
          }}
          className="relative w-full h-full min-h-[640px] bg-[#05030a] text-white flex flex-col justify-between p-6 sm:p-8 lg:p-12 overflow-hidden selection:bg-purple-900 selection:text-white transform-gpu origin-center"
        >
          {/* Background ambient lighting */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {/* Active Hero Background */}
            {useSavedBackground ? (
              <SavedColorBendsBackground />
            ) : (
              <HeroLightBeam beamY={-0.15} beamCurve={0} flareAmount={2.2} intensity={0.95} interactive={true} />
            )}

            {/* Glow behind logo */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[500px] sm:h-[500px] rounded-full opacity-[0.35] blur-[120px] transition-all duration-1000 ease-out pointer-events-none z-10"
              style={{ background: `radial-gradient(circle, ${tintColor} 0%, transparent 70%)` }}
            />
          </div>

          {/* Interactive 3D Metal Logo - Entry & Scroll-Down Motion */}
          <motion.div
            initial={{ y: '-80vh', scale: 0.9, opacity: 1 }}
            animate={
              isRevealed
                ? { y: 0, scale: 1, opacity: 1 }
                : { y: '-80vh', scale: 0.9, opacity: 1 }
            }
            transition={{
              type: 'spring',
              stiffness: 75,
              damping: 22,
              mass: 0.35,
              delay: 0.05,
            }}
            onAnimationComplete={() => {
              if (isRevealed) setIsInteractive(true);
            }}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center ${
              isInteractive ? 'pointer-events-auto cursor-pointer' : 'pointer-events-none select-none'
            }`}
          >
            <motion.div
              style={{
                y: logoY,
              }}
              className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] flex items-center justify-center aspect-square select-none rounded-full"
            >
              {/* Decorative glowing boundary ring */}
              <div className="absolute inset-0 rounded-full border border-white/[0.03] scale-[0.85] pointer-events-none" />
              <div className="absolute inset-0 rounded-full border border-dashed border-white/[0.015] scale-[0.98] animate-[spin_120s_linear_infinite] pointer-events-none" />

              {/* Three.js 3D Logo */}
              <div className="w-full h-full">
                <Logo3D tintColor={tintColor} interactive={isInteractive} />
              </div>
            </motion.div>
          </motion.div>

          {/* Grid Content Overlay */}
          <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 pt-20 lg:pt-16 items-center w-full pointer-events-none">
            {/* Left Column */}
            <div className="flex flex-col justify-between h-full pt-4 pb-2 lg:pt-8 lg:pb-2 pointer-events-none">
              {/* Top-Left: Pill Badge */}
              <div className="pointer-events-auto">
                <div className="inline-flex items-center border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-2 rounded-lg text-xs md:text-sm font-light tracking-wide text-neutral-300">
                  Digital Product Studio &bull; Development &bull; AI Automation
                </div>
              </div>

              {/* Bottom-Left: Heading (Avalance font) */}
              <div className="pointer-events-auto mt-auto pt-16 lg:pt-0">
                <h1 className="font-avalance font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.1] tracking-tight text-white max-w-xl">
                  We Build Digital
                  <br />
                  Products That Drive
                  <br />
                  Business Growth
                </h1>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-between h-full pt-4 pb-2 lg:pt-8 lg:pb-2 items-start lg:items-end text-left pointer-events-none">
              {/* Top-Right: Description */}
              <div className="pointer-events-auto lg:max-w-md lg:text-right lg:ml-auto">
                <p className="text-neutral-400 text-sm sm:text-base md:text-[16px] leading-relaxed font-light text-left lg:text-right">
                  From modern websites and SaaS platforms to AI automation and brand identity, we design and build digital experiences that help businesses scale faster
                </p>
              </div>

              {/* Bottom-Right: Action Buttons */}
              <div className="pointer-events-auto flex flex-wrap items-center gap-4 mt-8 lg:mt-auto">
                <a
                  href="#contact"
                  className="bg-white text-black hover:bg-neutral-200 transition-colors px-6 py-3 rounded-lg font-medium text-sm sm:text-base flex items-center justify-center active:scale-95 duration-200 cursor-pointer"
                >
                  Start Your Project
                </a>
                <a
                  href="#work"
                  className="border border-white/25 text-white hover:border-white/50 bg-white/[0.02] hover:bg-white/[0.05] transition-all px-6 py-3 rounded-lg font-medium text-sm sm:text-base flex items-center justify-center active:scale-95 duration-200 cursor-pointer"
                >
                  View Our Work
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
