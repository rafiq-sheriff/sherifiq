'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import StaggeredMenu from '../components/navigator/staggered-menu/StaggeredMenu';
import ContactFormSection from '../components/sections/ContactFormSection';
import Footer from '../components/navigator/footer/Footer';

export default function ContactPage() {
  const lenisRef = useRef<Lenis | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll Driven Animation: Blue Container transitions from Full Screen -> Current Card Size
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ['start end', 'start center'],
  });

  const cardScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const cardBorderRadius = useTransform(scrollYProgress, [0, 1], ['0px', '44px']);

  return (
    <main className="relative min-h-screen bg-[#F5F5F5] text-neutral-900 font-sans selection:bg-[#5b72ff] selection:text-white overflow-x-hidden">
      {/* ── Global Fixed Staggered Menu ── */}
      <StaggeredMenu
        isRevealed={true}
        isFixed={true}
        position="right"
        colors={['#05030a', '#181538', '#28106f', '#5B72FF']}
        accentColor="#8b5cf6"
        wordmarkColor="#ffffff"
        displayDownloadCv={false}
        onMenuOpen={() => lenisRef.current?.stop()}
        onMenuClose={() => lenisRef.current?.start()}
        items={[
          { label: 'Home', ariaLabel: 'Go to Home page', link: '/' },
          { label: 'About', ariaLabel: 'Go to About page', link: '/about' },
          { label: 'Project', ariaLabel: 'Go to Project page', link: '/project' },
          { label: 'Forms', ariaLabel: 'Go to Forms page', link: '/forms' },
          { label: 'Contact', ariaLabel: 'Current page: Contact', link: '/contact' },
        ]}
        socialItems={[
          { label: 'Instagram', link: 'https://www.instagram.com/the.sherifiq' },
          { label: 'LinkedIn', link: 'https://www.linkedin.com/company/sherifiq' },
        ]}
      />

      {/* ── Screen-Height Hero Section (Title & Specs Aligned Left Bottom) ── */}
      <section className="relative z-10 min-h-[85vh] sm:min-h-screen w-full flex flex-col justify-end overflow-hidden">
        {/* Background Billboard Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/contact/contact.webp"
            alt="Contact Hero Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Legibility and smooth section transition overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5]/30 to-black/30 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 pt-24 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-sora font-semibold text-5xl sm:text-7xl lg:text-7xl tracking-tight text-[#181538] mb-10 sm:mb-14"
            >
              Let's get in
              <br />
              touch
            </motion.h1>

            {/* 3 Content-Based Width Spec Containers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col sm:flex-row items-start gap-10 sm:gap-16 lg:gap-20 text-neutral-800"
            >
              {/* Column 1: Located */}
              <div className="w-auto shrink-0">
                <h3 className="font-sora font-semibold text-lg sm:text-xl text-[#181538] mb-2">
                  Located
                </h3>
                <p className="font-sans text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
                  Chennai
                </p>
                <p className="font-sans text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
                  India
                </p>
              </div>

              {/* Column 2: Contact */}
              <div className="w-auto shrink-0">
                <h3 className="font-sora font-semibold text-lg sm:text-xl text-[#181538] mb-2">
                  Contact
                </h3>
                <p className="font-sans text-base sm:text-lg text-neutral-600 font-normal leading-relaxed">
                  Rafiq Sheriff S
                </p>
                <a
                  href="mailto:rafiqsheriffs@gmail.com"
                  className="font-sans text-base sm:text-lg text-neutral-600 hover:text-[#5b72ff] font-normal leading-relaxed transition-colors block whitespace-nowrap"
                >
                  rafiqsheriffs@gmail.com
                </a>
              </div>

              {/* Column 3: Follow */}
              <div className="w-auto shrink-0">
                <h3 className="font-sora font-semibold text-lg sm:text-xl text-[#181538] mb-2">
                  Follow
                </h3>
                <a
                  href="https://www.instagram.com/the.sherifiq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-base sm:text-lg text-neutral-600 hover:text-[#5b72ff] font-normal leading-relaxed transition-colors block whitespace-nowrap"
                >
                  Instagram
                </a>
                <a
                  href="https://www.linkedin.com/company/sherifiq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-base sm:text-lg text-neutral-600 hover:text-[#5b72ff] font-normal leading-relaxed transition-colors block whitespace-nowrap"
                >
                  Linkedin
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Blue Showcase Card Section with Scroll Transition (Full Screen -> Current Card Size) ── */}
      <section
        ref={showcaseRef}
        className="relative z-10 pt-8 pb-16 sm:pb-24 px-4 sm:px-12 lg:px-16 max-w-7xl mx-auto overflow-visible"
      >
        <motion.div
          style={{
            scale: cardScale,
            borderRadius: cardBorderRadius,
          }}
          className="relative w-full bg-[#5b72ff] p-6 sm:p-12 lg:p-14 text-white min-h-fit lg:min-h-[560px] flex flex-col justify-between items-center lg:items-start transform-gpu origin-center will-change-transform overflow-visible"
        >
          {/* 1. Title inside Blue Box (Centered in Mobile) */}
          <div className="relative z-10 w-full lg:max-w-sm text-center lg:text-left mb-4 lg:mb-0">
            <h2 className="font-sora font-semibold text-3xl sm:text-4xl lg:text-[42px] leading-tight tracking-tight text-white mb-2">
              Follow us on
            </h2>
            <div className="space-y-1">
              <p className="font-sora font-semibold text-2xl sm:text-3xl lg:text-4xl text-white/70 block">
                Instagram
              </p>
              <p className="font-sora font-semibold text-2xl sm:text-3xl lg:text-4xl text-white/70 block">
                Linkedin
              </p>
            </div>
          </div>

          {/* 2. Mockup Artwork (Centered in Middle on Mobile, Popping Top Right on Desktop) */}
          <div className="relative lg:absolute lg:-top-36 xl:-top-48 lg:-right-4 w-[108%] -mx-[4%] sm:w-[98%] sm:mx-0 lg:w-[88%] xl:w-[90%] max-w-[1300px] pointer-events-none select-none z-20 my-2 lg:my-0 flex justify-center">
            <img
              src="/assets/contact/contact_mockup.webp"
              alt="Sherifiq Showcase Mockup"
              className="w-full h-auto object-contain drop-shadow-2xl scale-105 sm:scale-105 lg:scale-100"
            />
          </div>

          {/* 3. Bottom Action Pill Buttons (Instagram & LinkedIn) */}
          <div className="relative z-30 flex flex-wrap items-center justify-center gap-4 pt-4 lg:pt-8 w-full">
            {/* Instagram Button in Signature White Pill Style */}
            <a
              href="https://www.instagram.com/the.sherifiq"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-4 bg-white text-[#181538] hover:bg-neutral-100 transition-all duration-300 pl-6 sm:pl-7 pr-2 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-lg active:scale-95 cursor-pointer"
            >
              <span className="font-sans font-medium tracking-tight text-[#181538]">
                Instagram
              </span>
              <span className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5b72ff] group-hover:bg-[#435bff] transition-colors duration-300 flex items-center justify-center text-white shrink-0 overflow-hidden shadow-inner">
                {/* Outgoing Primary Icon */}
                <svg
                  className="w-4 h-4 text-white fill-current transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-7 group-hover:translate-x-7 group-hover:opacity-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {/* Incoming Roll-In Icon */}
                <svg
                  className="w-4 h-4 text-white fill-current absolute transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-7 -translate-x-7 opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
            </a>

            {/* LinkedIn Button in Signature White Pill Style */}
            <a
              href="https://www.linkedin.com/company/sherifiq"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-between gap-4 bg-white text-[#181538] hover:bg-neutral-100 transition-all duration-300 pl-6 sm:pl-7 pr-2 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-lg active:scale-95 cursor-pointer"
            >
              <span className="font-sans font-medium tracking-tight text-[#181538]">
                LinkedIn
              </span>
              <span className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#5b72ff] group-hover:bg-[#435bff] transition-colors duration-300 flex items-center justify-center text-white shrink-0 overflow-hidden shadow-inner">
                {/* Outgoing Primary Icon */}
                <svg
                  className="w-4 h-4 text-white fill-current transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-7 group-hover:translate-x-7 group-hover:opacity-0"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.239-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                {/* Incoming Roll-In Icon */}
                <svg
                  className="w-4 h-4 text-white fill-current absolute transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-7 -translate-x-7 opacity-0 group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.239-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Collaborations Section: Creating Together. Growing Together. ── */}
      <section className="relative z-10 pb-16 sm:pb-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          {/* Section Title */}
          <h2 className="font-sora font-semibold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#181538] mb-12 sm:mb-16">
            Creating Together,
            <br />
            Growing Together
          </h2>

          {/* Collaborators List Table */}
          <div className="w-full divide-y divide-neutral-200/90 border-t border-b border-neutral-200/90">
            {/* Row 1: Director of Design */}
            <div className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8">
              <div className="w-full sm:w-1/3">
                <span className="font-sora font-semibold text-xl sm:text-2xl text-[#181538] block">
                  Director of Design
                </span>
              </div>
              <div className="w-full sm:w-1/3">
                <span className="font-sora font-medium text-xl sm:text-2xl text-neutral-800 flex items-center gap-2">
                  Rafiq Sheriff S
                </span>
              </div>
              <div className="w-full sm:w-auto flex sm:justify-end">
                <a
                  href="mailto:rafiqsheriffs@gmail.com"
                  className="inline-flex items-center px-6 py-2.5 rounded-full border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 font-sans text-sm sm:text-base font-medium active:scale-95 cursor-pointer"
                >
                  rafiqsheriffs@gmail.com
                </a>
              </div>
            </div>

            {/* Row 2: Development */}
            <div className="py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-8">
              <div className="w-full sm:w-1/3">
                <span className="font-sora font-semibold text-xl sm:text-2xl text-[#181538] block">
                  Director of Development
                </span>
              </div>
              <div className="w-full sm:w-1/3">
                <span className="font-sora font-medium text-xl sm:text-2xl text-neutral-800 flex items-center gap-2">
                  Dilipan D.G
                </span>
              </div>
              <div className="w-full sm:w-auto flex sm:justify-end">
                <a
                  href="mailto:dilipangopal@gmail.com"
                  className="inline-flex items-center px-6 py-2.5 rounded-full border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 font-sans text-sm sm:text-base font-medium active:scale-95 cursor-pointer"
                >
                  dilipangopal@gmail.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Professional Contact Form Section ── */}
      <ContactFormSection />

      {/* ── Footer Section ── */}
      <div className="relative z-10 w-full bg-white">
        <Footer />
      </div>
    </main>
  );
}
