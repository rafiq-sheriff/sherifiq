'use client';

import { motion } from 'framer-motion';
import BrandLogo from '../ui/BrandLogo';

export default function AboutSection2() {
  return (
    <section id="about-overview" className="relative w-full bg-white text-neutral-900 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden select-none">
      {/* Soft Light Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full opacity-50 blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(91, 114, 255, 0.08) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 75%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100/80 backdrop-blur-md px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide text-neutral-800 shadow-sm w-fit mb-8">
              <svg className="w-3.5 h-3.5 text-[#5b72ff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="uppercase tracking-wider">DIGITAL EXCELLENCE • OUR MISSION</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-sora font-semibold text-3xl sm:text-4xl lg:text-5xl leading-[1.18] text-[#181538] tracking-tight mb-8">
              We Specialize in Crafting Digital Experiences That Drive Growth
            </h2>

            {/* Body Paragraph */}
            <p className="font-sans font-normal text-neutral-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
              We provide end-to-end digital solutions that help ambitious brands transform ideas into impactful experiences. From strategic branding and modern websites to scalable applications and intelligent automation, every solution is designed to accelerate growth and create lasting value.
            </p>

            {/* Accent Footer Item */}
            <div className="flex items-center gap-4 pt-2">
              <div className="w-10 h-10 rounded-full bg-[#5b72ff] flex items-center justify-center text-white shrink-0 shadow-md">
                <BrandLogo className="w-4 h-4 text-white" fill="#ffffff" useGradient={false} />
              </div>
              <div>
                <span className="font-rosnoc text-lg text-[#181538] block tracking-wider">SHERIFIQ</span>
                <span className="text-xs text-neutral-500 font-normal">Digital Experience Studio</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Video Player Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full rounded-[32px] sm:rounded-[40px] overflow-hidden border border-neutral-200/80 bg-neutral-900 shadow-2xl shadow-[#5b72ff]/10 group"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] overflow-hidden">
              <video
                src="/assets/video/about/sherifiq.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-105"
              />
              {/* Subtle Inner Glass Vignette Border Overlay */}
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[32px] sm:rounded-[40px] pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
