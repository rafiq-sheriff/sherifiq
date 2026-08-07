'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BrandLogo from '../ui/BrandLogo';

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
  link?: string;
  disabled?: boolean;
}

export const worksData: WorkItem[] = [
  {
    id: 1,
    title: 'Helix Ai',
    category: '2025 • IT • Website',
    image: '/assets/projects/helix.webp',
    link: 'https://helix-ai.ascodelabs.com',
  },
  {
    id: 2,
    title: 'Personal Portfolio',
    category: '2025 • Personal • Website',
    image: '/assets/projects/portfolio.webp',
    link: 'https://rafiqsheriff-portfolio.vercel.app',
  },
  {
    id: 3,
    title: 'S H Health Centre',
    category: '2026 • Healthcare • Platform',
    image: '/assets/projects/s-h-health-center.webp',
    link: 'https://shhealthcentre.com',
  },
  {
    id: 4,
    title: 'Habit Trace',
    category: '2026 • Product • Mobile & Web',
    image: '/assets/projects/habit-trace.webp',
    link: 'https://habit-trace.vercel.app',
  },
  {
    id: 5,
    title: 'AMS Platform',
    category: '2026 • Enterprise • SaaS',
    image: '/assets/projects/ams.webp',
    link: 'https://attendance-fixed-frontend.vercel.app',
  },
];

export function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  // 5 boxes 2-1-2 Wireframe layout:
  // Index 0, 1: 1 col each (Row 1: 2 boxes)
  // Index 2: lg:col-span-2 (Row 2: 1 wide box)
  // Index 3, 4: 1 col each (Row 3: 2 boxes)
  const isWide = index === 2;
  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax target per individual card
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  });

  // Smooth Y translation as user scrolls up & down past the card
  const imageY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <div
      ref={cardRef}
      className={`relative group overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-3xl min-h-[390px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[620px] ${isWide ? 'lg:col-span-2' : ''
        } bg-neutral-900/60 border border-white/10 cursor-pointer transform-gpu`}
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        href={item.link || '#'}
      >
        {/* Parallax Image Container (Scroll-driven up & down movement) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl sm:rounded-2xl lg:rounded-3xl">
          <motion.img
            style={{ y: imageY, scale: 1.18 }}
            alt={item.title}
            loading="lazy"
            decoding="async"
            src={item.image}
            className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
          />
          {/* Dark Overlay for crisp text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 z-[1] rounded-xl sm:rounded-2xl lg:rounded-3xl pointer-events-none" />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 h-full flex flex-col justify-between p-5 sm:p-6 md:p-8">
          <p className="font-sora font-semibold text-[32.45px] lg:text-[43.5px] text-white tracking-[-0.05em] max-w-[400px] whitespace-pre-line leading-[45px] sm:leading-[50px] md:leading-[60px]">
            {item.title}
          </p>
          <h3 className="font-normal text-white tracking-tight text-base sm:text-lg md:text-xl lg:text-2xl xl:text-[28px] px-1 sm:px-6 py-2">
            {item.category}
          </h3>
        </div>
      </a>
    </div>
  );
}

export default function Project() {
  return (
    <section
      id="selected-projects"
      className="relative w-full bg-white text-neutral-900 py-16 lg:py-24 px-4 sm:px-8 lg:px-12 overflow-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto">
        {/* Section Heading */}
        <div className="mb-8 lg:mb-12 px-2 text-center">
          <h2 className="font-sora font-semibold text-[36px] sm:text-[50px] lg:text-[68px] text-[#181538] tracking-tight leading-tight">
            Selected Projects
          </h2>
        </div>

        {/* 5 Boxes 2-1-2 Grid Layout */}
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 mt-6 lg:mt-10 gap-5 md:gap-10 lg:gap-5">
          {worksData.map((item, index) => (
            <WorkCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-12 lg:mt-16 flex justify-center">
          <a
            href="/project"
            className="group inline-flex items-center justify-between gap-4 sm:gap-6 bg-[#5b72ff] text-white hover:bg-[#4760ff] transition-all duration-300 pl-6 sm:pl-7 pr-2 sm:pr-2.5 py-2 sm:py-2.5 rounded-full font-medium text-base sm:text-[18px] active:scale-95 cursor-pointer shadow-lg shadow-blue-500/20"
          >
            <span className="font-sans font-medium tracking-tight text-white">
              View All Projects
            </span>
            <span className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-full flex items-center justify-center text-[#5b72ff] shrink-0 group-hover:bg-neutral-100 transition-colors duration-200 shadow-sm overflow-hidden">
              <BrandLogo
                className="h-4 sm:h-5 w-auto text-[#5b72ff] transition-transform duration-500 ease-out group-hover:rotate-45"
                fill="#5b72ff"
                useGradient={false}
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
