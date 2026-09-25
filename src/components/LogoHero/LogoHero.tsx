'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ShinyText from '../ui/ShinyText';
import BrandLogo from '../ui/BrandLogo';
import Logo3D from './Logo3D';
import HeroLightBeam from '../Backgrounds/HeroLightBeam';
// Saved previous background component for future use:
import SavedColorBendsBackground from '../Backgrounds/SavedColorBendsBackground';

interface LogoHeroProps {
  useSavedBackground?: boolean;
  isRevealed?: boolean;
  onLogoSettled?: () => void;
  isContentRevealed?: boolean;
}

export default function LogoHero({
  useSavedBackground = false,
  isRevealed = true,
  onLogoSettled,
  isContentRevealed = true,
}: LogoHeroProps) {
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

  // Direct GPU transforms synchronized with Lenis scroll (no double-spring lag)
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.93]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ['0px', '32px']);

  // Downward scroll motion for 3D metal logo when scrolling away from hero
  const logoY = useTransform(scrollYProgress, [0, 0.85], [0, 650]);

  return (
    <div id="hero" ref={containerRef} className="relative w-full bg-white">
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
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1,
            }}
            onAnimationComplete={() => {
              if (isRevealed) {
                setIsInteractive(true);
                onLogoSettled?.();
              }
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none lg:pointer-events-auto select-none"
          >
            <motion.div
              style={{
                y: logoY,
              }}
              className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] flex items-center justify-center aspect-square select-none"
            >
              {/* Three.js 3D Logo */}
              <div className="w-full h-full">
                <Logo3D tintColor={tintColor} interactive={isInteractive && typeof window !== 'undefined' && window.innerWidth > 1024} />
              </div>
            </motion.div>
          </motion.div>

          {/* Grid Content Overlay */}
          <div className="relative z-20 flex-1 flex flex-col lg:grid lg:grid-cols-2 justify-between gap-6 lg:gap-0 pt-16 sm:pt-20 lg:pt-16 items-center lg:items-stretch w-full pointer-events-none text-center lg:text-left">
            {/* Left Column / Mobile Top Portion: Badge + Title */}
            <div className="flex flex-col justify-start lg:justify-between h-auto lg:h-full pt-4 pb-2 lg:pt-8 lg:pb-2 pointer-events-none w-full items-center lg:items-start text-center lg:text-left">
              {/* Top-Left: Eyebrow / Badge */}
              <motion.div
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={
                  isContentRevealed
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 24, filter: 'blur(8px)' }
                }
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  delay: isContentRevealed ? 0.10 : 0,
                }}
                className="pointer-events-auto mx-auto lg:mx-0 lg:ml-0 lg:mr-auto flex justify-center lg:justify-start"
              >
                <div className="relative overflow-hidden inline-flex items-center border border-white/20 bg-white/[0.05] backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-medium tracking-wide shadow-sm">
                  {/* Animated Shimmer Flare Bar */}
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={isContentRevealed ? { x: '200%' } : { x: '-100%' }}
                    transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none"
                  />
                  <ShinyText
                    text="Digital Product Studio • Development • AI Automation"
                    speed={3}
                    color="rgba(255, 255, 255, 0.65)"
                    shineColor="#ffffff"
                    spread={120}
                  />
                </div>
              </motion.div>

              {/* Title (Top area on mobile) */}
              <div className="pointer-events-auto mt-4 lg:mt-auto pt-4 lg:pt-0 w-full flex justify-center lg:justify-start">
                <h1 className="font-sora font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.15] tracking-tight max-w-xl text-center lg:text-left lg:ml-0">
                  {[
                    'We Build Digital',
                    'Products That Drive',
                    'Business Growth',
                  ].map((line, idx) => (
                    <div key={line} className="overflow-hidden py-0.5">
                      <motion.div
                        initial={{ y: '110%', rotateX: 20, opacity: 0, filter: 'blur(10px)' }}
                        animate={
                          isContentRevealed
                            ? { y: '0%', rotateX: 0, opacity: 1, filter: 'blur(0px)' }
                            : { y: '110%', rotateX: 20, opacity: 0, filter: 'blur(10px)' }
                        }
                        transition={{
                          duration: 0.95,
                          ease: [0.22, 1, 0.36, 1],
                          delay: isContentRevealed ? 0.20 + idx * 0.08 : 0,
                        }}
                        style={{
                          backgroundImage: 'linear-gradient(to right, #ffffff, #eaeaf3, #d1d7e7, #b5c5dc, #96b4cf)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          transformOrigin: '0% 100%',
                        }}
                        className="bg-clip-text text-transparent"
                      >
                        {line}
                      </motion.div>
                    </div>
                  ))}
                </h1>
              </div>
            </div>

            {/* Right Column / Mobile Bottom Portion: Description + Button */}
            <div className="flex flex-col justify-end lg:justify-between h-auto lg:h-full pt-2 lg:pt-8 pb-2 items-center lg:items-end text-center lg:text-right pointer-events-none w-full mt-auto lg:mt-0">
              {/* Description (Positioned down above the button on mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={
                  isContentRevealed
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 24, filter: 'blur(8px)' }
                }
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  delay: isContentRevealed ? 0.36 : 0,
                }}
                className="pointer-events-auto lg:max-w-md text-center lg:text-right mx-auto lg:ml-auto lg:mr-0 mb-4 lg:mb-0"
              >
                <p className="text-white text-sm sm:text-base md:text-[16px] leading-relaxed font-normal text-center lg:text-right">
                  From modern websites and SaaS platforms to AI automation and brand identity, we design and build digital experiences that help businesses scale faster
                </p>
              </motion.div>

              {/* Action Button (Positioned right below description on mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={
                  isContentRevealed
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 24, filter: 'blur(8px)' }
                }
                transition={{
                  duration: 0.85,
                  ease: [0.22, 1, 0.36, 1],
                  delay: isContentRevealed ? 0.44 : 0,
                }}
                className="pointer-events-auto flex items-center justify-center lg:justify-end w-full lg:w-auto lg:ml-auto lg:mr-0"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center justify-between gap-4 sm:gap-6 bg-white text-black hover:bg-neutral-100 transition-all duration-300 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-[18px] active:scale-95 cursor-pointer shadow-lg shadow-white/5 mx-auto lg:mx-0 lg:ml-auto"
                >
                  <span className="font-sans font-medium tracking-tight text-neutral-900">
                    Start your project
                  </span>
                  <motion.span
                    initial={{ scale: 0.7 }}
                    animate={isContentRevealed ? { scale: [0.7, 1.12, 1.0] } : { scale: 0.7 }}
                    transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.52 }}
                    className="w-10 h-10 sm:w-11 sm:h-11 bg-[#5b72ff] rounded-full flex items-center justify-center text-white shrink-0 group-hover:bg-[#4760ff] transition-colors duration-200 shadow-sm overflow-hidden"
                  >
                    <BrandLogo
                      className="h-4 sm:h-5 w-auto text-white transition-transform duration-500 ease-out group-hover:rotate-45"
                      fill="#ffffff"
                      useGradient={false}
                    />
                  </motion.span>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
