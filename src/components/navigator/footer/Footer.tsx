'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ShinyText from '../../ui/ShinyText';
import BrandLogo from '../../ui/BrandLogo';

export default function Footer() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: card1Scroll } = useScroll({
    target: card1Ref,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: card2Scroll } = useScroll({
    target: card2Ref,
    offset: ['start end', 'end start'],
  });

  // Smooth Y parallax translation as user scrolls up & down past the cards
  const image1Y = useTransform(card1Scroll, [0, 1], ['-12%', '12%']);
  const image2Y = useTransform(card2Scroll, [0, 1], ['-12%', '12%']);

  // Direct smooth transforms matching Project.tsx section animation
  const scale = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1],
    [0.93, 1, 1, 0.93]
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.16, 0.84, 1],
    ['32px', '0px', '0px', '32px']
  );

  return (
    <div ref={containerRef} className="relative w-full bg-white overflow-hidden">
      <motion.footer
        id="footer"
        style={{
          scale,
          borderRadius,
        }}
        className="relative w-full bg-black text-white pt-16 pb-8 px-4 sm:px-8 lg:px-12 overflow-hidden transform-gpu origin-center shadow-none"
      >
        {/* Soft Ambient Glow Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-20 blur-[140px]"
            style={{ background: 'radial-gradient(circle, #25265e 0%, transparent 75%)' }}
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-[1400px] mx-auto">
          {/* Top Dual Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 sm:mb-20">
            {/* Card 1: Collaborations & Billboard */}
            <div
              ref={card1Ref}
              className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 flex flex-col justify-between items-center sm:items-start text-center sm:text-left p-6 sm:p-10 bg-neutral-900/80 transform-gpu"
            >
              {/* Parallax Background Image */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] sm:rounded-[36px]">
                <motion.img
                  style={{ y: image1Y, scale: 1.18 }}
                  src="/assets/footer/sherifiq_branding.webp"
                  alt="Sherifiq Branding Billboard"
                  className="absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-transform"
                />
              </div>

              {/* Top Headline */}
              <div className="relative z-10 max-w-md">
                <h3 className="font-sora font-semibold text-3xl sm:text-4xl lg:text-4xl leading-[1.15] text-white tracking-tight">
                  Let's create something remarkable together
                </h3>
              </div>

              {/* Bottom Contact Us Button */}
              <div className="relative z-10 w-full flex justify-center sm:justify-start">
                <a
                  href="/contact"
                  className="group/btn inline-flex items-center justify-between gap-4 sm:gap-6 border border-white/80 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white transition-all duration-300 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-[18px] active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="font-sans font-medium tracking-tight text-white">
                    Contact Us
                  </span>
                  <span className="w-10 h-10 sm:w-11 sm:h-11 bg-[#5b72ff] rounded-full flex items-center justify-center text-white shrink-0 group-hover/btn:bg-[#4760ff] transition-colors duration-200 shadow-sm overflow-hidden">
                    <BrandLogo
                      className="h-4 sm:h-5 w-auto text-white transition-transform duration-500 ease-out group-hover/btn:rotate-45"
                      fill="#ffffff"
                      useGradient={false}
                    />
                  </span>
                </a>
              </div>
            </div>

            {/* Card 2: Instagram News & Social */}
            <div
              ref={card2Ref}
              className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/10 flex flex-col justify-between items-center sm:items-start text-center sm:text-left p-6 sm:p-10 bg-neutral-950/80 transform-gpu"
            >
              {/* Parallax Background Image */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px] sm:rounded-[36px]">
                <motion.img
                  style={{ y: image2Y, scale: 1.18 }}
                  src="/assets/footer/sherifiq_socialmedia.webp"
                  alt="Sherifiq Social Media Billboard"
                  className="absolute inset-0 w-full h-full object-cover object-center transform-gpu will-change-transform"
                />
              </div>

              {/* Top Headline */}
              <div className="relative z-10 max-w-md">
                <h3 className="font-sora font-semibold text-3xl sm:text-4xl lg:text-4xl leading-[1.15] text-white tracking-tight">
                  Explore our latest work and insights
                </h3>
              </div>

              {/* Bottom Go to Insta Button */}
              <div className="relative z-10 w-full flex justify-center sm:justify-start">
                <a
                  href="https://www.instagram.com/the.sherifiq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center justify-between gap-4 sm:gap-6 border border-white/80 bg-black/30 hover:bg-black/50 backdrop-blur-md text-white transition-all duration-300 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-[18px] active:scale-95 cursor-pointer shadow-lg"
                >
                  <span className="font-sans font-medium tracking-tight text-white">
                    Go to Insta
                  </span>
                  <span className="w-10 h-10 sm:w-11 sm:h-11 bg-[#5b72ff] rounded-full flex items-center justify-center text-white shrink-0 group-hover/btn:bg-[#4760ff] transition-colors duration-200 shadow-sm overflow-hidden">
                    <BrandLogo
                      className="h-4 sm:h-5 w-auto text-white transition-transform duration-500 ease-out group-hover/btn:rotate-45"
                      fill="#ffffff"
                      useGradient={false}
                    />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation & Copyright Bar */}
          <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-4 pt-4 pb-4 text-xs sm:text-sm font-light text-neutral-400 text-center md:text-left">
            {/* Nav Links */}
            <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="/project" className="hover:text-white transition-colors">
                Project
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>

            {/* Copyright Text */}
            <div className="text-center md:text-right">
              <span>&copy; Copyrights Sherifiq</span>
            </div>
          </div>

          {/* Giant Brand Typography: Sherifiq in Rosnoc font */}
          <div className="w-full text-center overflow-hidden py-2 sm:py-4">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full text-center block"
            >
              <ShinyText
                text="Sherifiq"
                speed={3.5}
                color="rgba(255, 255, 255, 0.65)"
                shineColor="#ffffff"
                spread={120}
                className="font-rosnoc text-[12vw] sm:text-[13vw] leading-none tracking-[0.18em] text-center block w-full whitespace-nowrap pl-[0.18em]"
              />
            </motion.h1>
          </div>

          {/* Bottom Bar: Left Socials (LinkedIn, Instagram) & Right Legal (Privacy Policy, Terms & Conditions) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 text-xs sm:text-sm font-light text-neutral-400 text-center">
            {/* Left side: Social Links */}
            <div className="flex items-center justify-center gap-6">
              <a
                href="https://www.linkedin.com/company/sherifiq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/the.sherifiq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>

            {/* Right side: Legal Links */}
            <div className="flex items-center justify-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
