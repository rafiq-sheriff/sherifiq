'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SavedColorBendsBackground from '../Backgrounds/SavedColorBendsBackground';
import Logo3D from '../LogoHero/Logo3D';
import BrandLogo from '../ui/BrandLogo';

export default function CTA() {
  const tintColor = '#38bdf8';
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll target for section scaling & 3D metallic logo movement
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Direct GPU transforms synchronized with Lenis scroll
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0.94, 1, 1, 0.94]
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    ['32px', '0px', '0px', '32px']
  );

  // 3D Metallic Logo scroll movement: glides continuously from UP (-550px) -> CENTER (0px at full screen progress 0.5) -> DOWN (+550px) as you scroll
  const logoY = useTransform(scrollYProgress, [0, 0.5, 1], [-550, 0, 550]);

  return (
    <div ref={containerRef} className="relative w-full bg-white overflow-hidden">
      <motion.section
        id="cta"
        style={{
          scale,
          borderRadius,
        }}
        className="relative w-full min-h-screen h-screen bg-[#05030a] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden transform-gpu origin-center shadow-none will-change-transform"
      >
        {/* SavedColorBends Background Canvas - Vibrant Blue/Cyan Flowing Bends */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <SavedColorBendsBackground />

          {/* Ambient Blue/Cyan Radial Glow Overlay */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] sm:w-[700px] sm:h-[700px] rounded-full opacity-40 blur-[150px] pointer-events-none z-[1]"
            style={{ background: 'radial-gradient(circle, #38bdf8 0%, #1d4ed8 40%, transparent 75%)' }}
          />
        </div>

        {/* Center 3D Metallic Logo - Continuous Scroll Movement */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none lg:pointer-events-auto select-none">
          <motion.div
            style={{
              y: logoY,
            }}
            className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] flex items-center justify-center aspect-square select-none opacity-100 transform-gpu"
          >
            {/* Three.js 3D Metal Logo */}
            <div className="w-full h-full">
              <Logo3D tintColor={tintColor} interactive={true} />
            </div>
          </motion.div>
        </div>

        {/* Top-Left Title (Centered on mobile view) */}
        <div className="relative z-20 pointer-events-none text-center sm:text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              backgroundImage: 'linear-gradient(to right, #ffffff, #eaeaf3, #d1d7e7, #b5c5dc, #96b4cf)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
            className="font-sora font-semibold text-3xl sm:text-5xl md:text-[56px] lg:text-[64px] leading-[1.1] tracking-tight bg-clip-text text-transparent max-w-xl pointer-events-auto mx-auto sm:mx-0"
          >
            Let's Build
            <br />
            Something Exceptional
          </motion.h2>
        </div>

        {/* Bottom Bar: Description & Button (Centered on Mobile) */}
        <div className="relative z-20 flex flex-col sm:flex-row items-center sm:items-end justify-between text-center sm:text-left gap-6 w-full pointer-events-none pt-12">
          {/* Bottom Description (White Text, Centered on Mobile) */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-white text-sm sm:text-base md:text-[17px] font-light leading-relaxed max-w-sm pointer-events-auto text-center sm:text-left mx-auto sm:mx-0"
          >
            Transform your ideas into impactful digital experiences with confidence.
          </motion.p>

          {/* Bottom Button (Centered on Mobile) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="pointer-events-auto flex justify-center sm:justify-end w-full sm:w-auto"
          >
            <a
              href="/contact"
              className="group inline-flex items-center justify-between gap-4 sm:gap-6 bg-white text-black hover:bg-neutral-100 transition-all duration-300 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-[18px] active:scale-95 cursor-pointer shadow-lg shadow-white/5 mx-auto sm:mx-0"
            >
              <span className="font-sans font-medium tracking-tight text-neutral-900">
                Let's Connect
              </span>
              <span className="w-10 h-10 sm:w-11 sm:h-11 bg-[#5b72ff] rounded-full flex items-center justify-center text-white shrink-0 group-hover:bg-[#4760ff] transition-colors duration-200 shadow-sm overflow-hidden">
                <BrandLogo
                  className="h-4 sm:h-5 w-auto text-white transition-transform duration-500 ease-out group-hover:rotate-45"
                  fill="#ffffff"
                  useGradient={false}
                />
              </span>
            </a>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
