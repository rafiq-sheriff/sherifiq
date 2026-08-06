'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import BrandLogo from '../components/ui/BrandLogo';
import StaggeredMenu from '../components/navigator/staggered-menu/StaggeredMenu';
import Footer from '../components/navigator/footer/Footer';

export interface ProjectArchiveItem {
  id: number;
  title: string;
  year: string;
  industry: string;
  category: string;
  image: string;
  link: string;
}

export const projectArchiveData: ProjectArchiveItem[] = [
  {
    id: 1,
    title: 'Helix AI',
    year: '2025',
    industry: 'IT',
    category: 'Website',
    image: '/assets/projects/helix.webp',
    link: 'https://helix-ai.ascodelabs.com',
  },
  {
    id: 2,
    title: 'Personal Portfolio',
    year: '2025',
    industry: 'Personal',
    category: 'Website',
    image: '/assets/projects/portfolio.webp',
    link: 'https://rafiqsheriff-portfolio.vercel.app',
  },
  {
    id: 3,
    title: 'S H Health Centre',
    year: '2026',
    industry: 'Healthcare',
    category: 'Website',
    image: '/assets/projects/s-h-health-center.webp',
    link: 'https://shhealthcentre.com',
  },
  {
    id: 4,
    title: 'Habit Trace',
    year: '2026',
    industry: 'Productivity',
    category: 'Web Application',
    image: '/assets/projects/habit-trace.webp',
    link: 'https://habit-trace.vercel.app',
  },
  {
    id: 5,
    title: 'AMS Platform',
    year: '2026',
    industry: 'Enterprise',
    category: 'SaaS',
    image: '/assets/projects/ams.webp',
    link: 'https://attendance-fixed-frontend.vercel.app',
  },
];

/* Project Card Row - Mobile order: Title -> Image -> Line -> Badges -> Button */
function ProjectArchiveRow({ item }: { item: ProjectArchiveItem }) {
  const rowRef = useRef<HTMLDivElement | null>(null);

  // Parallax scroll effect target per row
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  // Up and down scroll motion for image inside container
  const imageY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);

  return (
    <div
      ref={rowRef}
      className="relative w-full bg-white rounded-[28px] sm:rounded-[36px] border border-neutral-200/80 p-6 sm:p-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 sm:gap-8 overflow-hidden transform-gpu shadow-sm text-center lg:text-left"
    >
      {/* ── Mobile Layout Container (title -> image -> horizontal line -> badge -> button) ── */}
      <div className="flex flex-col lg:hidden w-full items-center">
        {/* 1. Title */}
        <h3 className="font-sora font-bold text-3xl sm:text-4xl leading-tight text-[#181538] tracking-tight mb-4 text-center">
          {item.title}
        </h3>

        {/* 2. Image */}
        <div className="relative w-full h-[260px] sm:h-[320px] rounded-[20px] sm:rounded-[26px] overflow-hidden bg-neutral-100 border border-neutral-200/80 shrink-0 transform-gpu my-2">
          <motion.img
            style={{ y: imageY, scale: 1.2 }}
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 3. Horizontal Line */}
        <div className="w-full border-t border-neutral-100 my-4" />

        {/* 4. Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
          <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
            {item.year}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
            {item.industry}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
            {item.category}
          </span>
        </div>

        {/* 5. Button */}
        <div className="flex justify-center w-full pt-1">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center justify-between gap-4 border border-[#181538]/20 bg-[#181538] text-white hover:bg-[#5b72ff] transition-all duration-300 pl-6 pr-2 py-2 rounded-full font-medium text-sm sm:text-base active:scale-95 cursor-pointer shadow-md w-fit mx-auto"
          >
            <span className="font-sans font-medium tracking-tight text-white">
              View Project
            </span>
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#181538] shrink-0 group-hover/btn:bg-white transition-colors duration-200 shadow-sm overflow-hidden">
              <BrandLogo
                className="h-3.5 w-auto text-[#181538] transition-transform duration-500 ease-out group-hover/btn:rotate-45"
                fill="#181538"
                useGradient={false}
              />
            </span>
          </a>
        </div>
      </div>

      {/* ── Desktop Layout Container (Left Column + Right Column) ── */}
      <div className="hidden lg:flex flex-col justify-between flex-1 py-1 min-h-[260px] text-left">
        <div>
          <h3 className="font-sora font-bold text-4xl lg:text-[46px] leading-tight text-[#181538] tracking-tight mb-3">
            {item.title}
          </h3>

          <div className="w-full border-t border-neutral-100 my-4" />

          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
              {item.year}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
              {item.industry}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
              {item.category}
            </span>
          </div>
        </div>

        <div className="pt-2 flex justify-start">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center justify-between gap-4 border border-[#181538]/20 bg-[#181538] text-white hover:bg-[#5b72ff] transition-all duration-300 pl-5 sm:pl-6 pr-2 py-2 rounded-full font-medium text-sm sm:text-base active:scale-95 cursor-pointer shadow-md w-fit"
          >
            <span className="font-sans font-medium tracking-tight text-white">
              View Project
            </span>
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#181538] shrink-0 group-hover/btn:bg-white transition-colors duration-200 shadow-sm overflow-hidden">
              <BrandLogo
                className="h-3.5 w-auto text-[#181538] transition-transform duration-500 ease-out group-hover/btn:rotate-45"
                fill="#181538"
                useGradient={false}
              />
            </span>
          </a>
        </div>
      </div>

      {/* Desktop Image Container */}
      <div className="hidden lg:block relative w-[480px] xl:w-[560px] h-[330px] rounded-[26px] overflow-hidden bg-neutral-100 border border-neutral-200/80 shrink-0 transform-gpu">
        <motion.img
          style={{ y: imageY, scale: 1.2 }}
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const lenisRef = useRef<Lenis | null>(null);

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

  return (
    <main className="relative min-h-screen bg-[#F5F5F5] text-neutral-900 font-sans selection:bg-[#5b72ff] selection:text-white overflow-x-hidden">
      {/* ── Global Fixed Staggered Menu ── */}
      <StaggeredMenu
        isRevealed={true}
        isFixed={true}
        position="right"
        colors={['#05030a', '#181538', '#28106f', '#5B72FF']}
        accentColor="#8b5cf6"
        displayDownloadCv={false}
        onMenuOpen={() => lenisRef.current?.stop()}
        onMenuClose={() => lenisRef.current?.start()}
        items={[
          { label: 'Home', ariaLabel: 'Go to Home page', link: '/' },
          { label: 'About', ariaLabel: 'Go to About page', link: '/about' },
          { label: 'Project', ariaLabel: 'Current page: Project', link: '/project' },
          { label: 'Contact', ariaLabel: 'Go to Contact page', link: '/contact' },
        ]}
        socialItems={[
          { label: 'Instagram', link: 'https://instagram.com' },
          { label: 'LinkedIn', link: 'https://linkedin.com' },
        ]}
      />

      {/* ── Page Hero Title Section ── */}
      <section className="relative z-10 pt-20 sm:pt-28 pb-10 sm:pb-14 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-sora font-semibold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#181538] mb-3"
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-sans font-light text-2xl sm:text-3xl lg:text-4xl text-neutral-400 leading-[1.2] max-w-xl whitespace-pre-line"
          >
            Digital experiences{'\n'}built for ambitious brands
          </motion.p>
        </div>
      </section>

      {/* ── Projects Archive List Section ── */}
      <section className="relative z-10 pb-28 px-6 sm:px-12 max-w-7xl mx-auto">
        <div className="space-y-6 sm:space-y-8">
          {projectArchiveData.map((item) => (
            <ProjectArchiveRow key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── Footer Section ── */}
      <div className="relative z-10 w-full bg-white">
        <Footer />
      </div>
    </main>
  );
}
