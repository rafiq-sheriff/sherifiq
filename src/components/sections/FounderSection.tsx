'use client';

import { motion } from 'framer-motion';
import BrandLogo from '../ui/BrandLogo';

export default function FounderSection() {
  return (
    <section id="founder" className="relative w-full bg-white text-neutral-900 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden select-none">
      {/* Ambient Light Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full opacity-40 blur-[140px]"
          style={{ background: 'radial-gradient(circle, rgba(91, 114, 255, 0.08) 0%, rgba(139, 92, 246, 0.05) 50%, transparent 75%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Founder Image Container (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative w-full"
          >
            <div className="relative w-full rounded-[32px] sm:rounded-[40px] overflow-hidden border border-neutral-200/80 bg-neutral-950 shadow-2xl shadow-[#5b72ff]/10 group aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
              {/* Founder Image */}
              <img
                src="/assets/founder/founder.jpeg"
                alt="Rafiq Sheriff - Founder & Lead"
                className="w-full h-full object-cover object-top transform-gpu transition-transform duration-700 group-hover:scale-105 filter contrast-105"
              />

              {/* Dark Gradient Overlay for Badge Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 pointer-events-none" />

              {/* Bottom Badge inside image container */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white">
                <div>
                  <h4 className="font-sora font-semibold text-base sm:text-lg text-white leading-snug">
                    Rafiq Sheriff
                  </h4>
                  <p className="text-xs text-neutral-300 font-light">Founder &amp; Creative Lead</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#5b72ff] flex items-center justify-center text-white shrink-0 shadow-md">
                  <BrandLogo className="w-4 h-4 text-white" fill="#ffffff" useGradient={false} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Content & Social Icons (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Main Headline */}
            <h2 className="font-sora font-semibold text-3xl sm:text-4xl lg:text-5xl leading-[1.18] text-[#181538] tracking-tight mb-8">
              Founder &amp; Team
            </h2>

            {/* Body Paragraph */}
            <p className="font-sans font-normal text-neutral-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-10">
              Led by Rafiq Sheriff, our team is united by a shared passion for creating meaningful digital experiences that inspire, innovate, and drive real business growth. Together, we combine creativity, strategy, and technology to build solutions that make a lasting impact while continuously learning, evolving, and inspiring the next generation of creators, designers, and developers.
            </p>

            {/* Direct Full-Color SVG Social Icons */}
            <div className="flex items-center gap-5 pt-1">
              <a
                href="https://www.instagram.com/the.sherifiq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="inline-block transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src="/assets/svg/founder/instagram-2-1-logo-svgrepo-com.svg"
                  alt="Instagram"
                  className="w-11 h-11 sm:w-12 sm:h-12 object-contain"
                />
              </a>

              <a
                href="https://www.linkedin.com/company/sherifiq"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-block transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer rounded-xl overflow-hidden shadow-md"
              >
                <img
                  src="/assets/svg/founder/linkedin-svgrepo-com.svg"
                  alt="LinkedIn"
                  className="w-11 h-11 sm:w-12 sm:h-12 object-contain"
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
