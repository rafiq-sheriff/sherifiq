'use client';

import { motion } from 'framer-motion';

export default function CapabilitiesMarquee() {
  const row1Items = [
    'WEBSITE DEVELOPMENT',
    'SAAS DEVELOPMENT',
    'CRM SOLUTIONS',
    'AI AUTOMATION',
    'UI/UX DESIGN',
    'BRAND IDENTITY',
    'WEB APPLICATIONS',
    'DIGITAL PRODUCTS',
  ];

  const row2Items = [
    'DIGITAL PRODUCTS',
    'WEB APPLICATIONS',
    'BRAND IDENTITY',
    'UI/UX DESIGN',
    'AI AUTOMATION',
    'CRM SOLUTIONS',
    'SAAS DEVELOPMENT',
    'WEBSITE DEVELOPMENT',
  ];

  const row1Text = row1Items.map((item) => `${item} ✦ `).join('');
  const row2Text = row2Items.map((item) => `${item} ✦ `).join('');

  return (
    <div className="relative w-full bg-white py-6 sm:py-8 overflow-hidden select-none flex flex-col gap-4 sm:gap-5">
      {/* Edge gradient blur overlays */}
      <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Row 1: Right to Left marquee */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            ease: 'linear',
            duration: 60,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap font-bold text-lg sm:text-xl md:text-[22px] tracking-wider text-[#181538]/50"
        >
          <span className="pr-2">{row1Text.repeat(2)}</span>
          <span className="pr-2">{row1Text.repeat(2)}</span>
        </motion.div>
      </div>

      {/* Row 2: Left to Right marquee */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{
            ease: 'linear',
            duration: 60,
            repeat: Infinity,
          }}
          className="flex whitespace-nowrap font-bold text-lg sm:text-xl md:text-[22px] tracking-wider text-[#181538]/50"
        >
          <span className="pr-2">{row2Text.repeat(2)}</span>
          <span className="pr-2">{row2Text.repeat(2)}</span>
        </motion.div>
      </div>
    </div>
  );
}
