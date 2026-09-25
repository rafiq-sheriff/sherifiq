'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import BrandLogo from '../components/ui/BrandLogo';
import StaggeredMenu from '../components/navigator/staggered-menu/StaggeredMenu';
import Footer from '../components/navigator/footer/Footer';

export const googleFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLSeqqW5RrSYDW0OMI-RtAE4wUTt-MBXkYJpgOwvZtbR25IJhBQ/viewform?usp=publish-editor';

export interface FormItem {
  id: string;
  number: string;
  title: string;
  description: string;
  link: string;
}

export const formsList: FormItem[] = [
  {
    id: 'project-inquiry',
    number: '01',
    title: 'Project Inquiry Form',
    description:
      "Tell us about your business, what you need, your project goals, timeline, and estimated budget. We'll review your requirements and get back to you.",
    link: googleFormUrl,
  },
];

export default function FormsPage() {
  const lenisRef = useRef<Lenis | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredForms = formsList.filter(
    (form) =>
      form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="relative min-h-screen bg-[#F5F5F5] text-neutral-900 font-sans selection:bg-[#5b72ff] selection:text-white overflow-x-hidden">
      {/* ── Global Fixed Staggered Menu Navigation ── */}
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
          { label: 'Contact', ariaLabel: 'Go to Contact page', link: '/contact' },
        ]}
        socialItems={[
          { label: 'Instagram', link: 'https://www.instagram.com/the.sherifiq' },
          { label: 'LinkedIn', link: 'https://www.linkedin.com/company/sherifiq' },
        ]}
      />

      {/* ── Screen-Height Hero Section with City Banner Background ── */}
      <section className="relative z-10 min-h-[85vh] sm:min-h-screen w-full flex flex-col justify-end overflow-hidden">
        {/* City Banner Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/forms/Large_City_Banner_Mockup.webp"
            alt="City Banner Hero Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Legibility and smooth section transition overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5]/40 to-black/50 backdrop-blur-[1px]" />
        </div>

        <div className="relative z-10 pt-32 pb-12 sm:pb-16 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            {/* Small Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold tracking-widest uppercase mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#5b72ff] animate-pulse" />
              CLIENT & PROJECT FORMS
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-sora font-semibold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#181538] mb-6 sm:mb-8 leading-[1.08]"
            >
              Everything starts with <br className="hidden sm:inline" />
              the right information.
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-xl text-neutral-800 font-normal max-w-3xl leading-relaxed mb-6"
            >
              Our forms make it easy to share project requirements, business details, onboarding information, feedback, and other important details with the Sherifiq team.
            </motion.p>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xs sm:text-sm font-semibold tracking-wide text-neutral-700 bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-300/80 inline-block"
            >
              Choose a form below and take the next step.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Client Forms Directory Section ── */}
      <section className="relative z-10 w-full py-16 sm:py-24 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="max-w-3xl mb-10 text-left">
          {/* Tag */}
          <span className="text-xs font-bold tracking-widest text-[#5b72ff] uppercase bg-[#5b72ff]/10 px-3.5 py-1.5 rounded-full border border-[#5b72ff]/20 inline-block mb-4">
            AVAILABLE FORMS
          </span>

          {/* Heading */}
          <h2 className="font-sora font-bold text-3xl sm:text-5xl text-[#181538] tracking-tight mb-4">
            Client Forms Directory
          </h2>

          {/* Description */}
          <p className="text-neutral-600 text-base sm:text-lg leading-relaxed">
            Choose a form below to share your requirements and help us understand how we can work together.
          </p>

          {/* Search Bar Input */}
          <div className="relative mt-8 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search forms by name or keyword..."
              className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white border border-neutral-200 text-neutral-900 placeholder-neutral-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#5b72ff]/30 focus:border-[#5b72ff] transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ── Cards Container (Aligned to the Left) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {filteredForms.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group/btn relative w-full"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col justify-between w-full bg-white rounded-[28px] sm:rounded-[36px] border border-neutral-200/90 p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl hover:border-[#5b72ff]/50 transform-gpu hover:-translate-y-1 cursor-pointer overflow-hidden"
              >
                <div>
                  {/* Title Header with Circle Container 01 on Left */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#181538] text-white font-sora font-extrabold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-sm group-hover/btn:bg-[#5b72ff] transition-colors duration-300">
                      {item.number}
                    </span>
                    <h3 className="font-sora font-bold text-2xl sm:text-3xl text-[#181538] tracking-tight group-hover/btn:text-[#5b72ff] transition-colors duration-200">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-neutral-600 text-base leading-relaxed mb-8 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Button Row with BrandLogo Icon & Hover Effect */}
                <div className="pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
                  <span className="font-sora font-semibold text-base text-[#181538] group-hover/btn:text-[#5b72ff] transition-colors">
                    Start Inquiry
                  </span>
                  <span className="w-11 h-11 bg-[#5b72ff] rounded-full flex items-center justify-center text-white shrink-0 group-hover/btn:bg-[#4760ff] transition-colors duration-200 shadow-md overflow-hidden">
                    <BrandLogo
                      className="h-4 sm:h-5 w-auto text-white transition-transform duration-500 ease-out group-hover/btn:rotate-45"
                      fill="#ffffff"
                      useGradient={false}
                    />
                  </span>
                </div>
              </a>
            </motion.div>
          ))}

          {filteredForms.length === 0 && (
            <div className="p-8 bg-white rounded-3xl border border-neutral-200 text-neutral-500 text-sm">
              No forms matching "{searchQuery}". Try a different keyword.
            </div>
          )}
        </div>
      </section>

      {/* ── Global Footer Section ── */}
      <Footer />
    </main>
  );
}
