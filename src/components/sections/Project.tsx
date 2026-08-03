'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import SavedColorBendsBackground from '../Backgrounds/SavedColorBendsBackground';

interface ProjectItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

const projects: ProjectItem[] = [
  {
    id: 1,
    category: '2025 * IT * Website',
    title: 'Helix Ai',
    description:
      'An award-winning AI-powered website developed for an IT innovation challenge, earning the Honourable Mention Award at the Google Chrome AI Hackathon 2025.',
    image: '/assets/projects/helix.png',
    link: '#',
  },
  {
    id: 2,
    category: '2025 * Personal * Website',
    title: 'Personal Portfolio',
    description:
      'A modern portfolio website crafted to showcase projects, achievements, and a refined digital presence.',
    image: '/assets/projects/portfolio.png',
    link: '#',
  },
  {
    id: 3,
    category: '2025 * Enterprise * SaaS',
    title: 'AMS Platform',
    description:
      'A comprehensive attendance and workforce management system built for high efficiency and real-time operational insights.',
    image: '/assets/projects/ams.png',
    link: '#',
  },
  {
    id: 4,
    category: '2025 * Product * Mobile & Web',
    title: 'Habit Trace',
    description:
      'An intuitive habit tracking web application designed to build consistent routines and empower personal productivity.',
    image: '/assets/projects/habit-trace.png',
    link: '#',
  },
  {
    id: 5,
    category: '2025 * Healthcare * Platform',
    title: 'S-H Health Centre',
    description:
      'A modern healthcare portal for seamless patient bookings, record management, and digital health services.',
    image: '/assets/projects/s-h-health-centre.png',
    link: '#',
  },
];

function Card({
  project,
  index,
  total,
  progress,
}: {
  project: ProjectItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const cardStep = 0.16;
  const entryStart = index === 0 ? 0 : (index - 1) * cardStep + 0.05;
  const entryEnd = index === 0 ? 0 : entryStart + cardStep;

  // Y Position:
  // Card 0 (Helix Ai) is ALREADY seated at y = 0 right at progress = 0.
  // Cards 1..4 slide up sequentially from 800px below as user scrolls.
  const y = useTransform(
    progress,
    index === 0
      ? [0, 1]
      : [entryStart, entryEnd, 1],
    index === 0
      ? [0, -((total - 1) * 16)]
      : [800, 0, -((total - 1 - index) * 16)]
  );

  // Scale down as later cards stack over this card
  const targetScale = 1 - (total - 1 - index) * 0.035;
  const scale = useTransform(
    progress,
    index === 0
      ? [0.05, 1]
      : [entryEnd, 1],
    index === 0
      ? [1, Math.max(0.86, targetScale)]
      : [1, Math.max(0.86, targetScale)]
  );

  // Opacity
  const opacity = useTransform(
    progress,
    index === 0
      ? [0, 1]
      : [entryStart, entryStart + cardStep * 0.3, 1],
    index === 0
      ? [1, 1]
      : [0, 1, 1]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        opacity,
        zIndex: index + 1,
      }}
      className="absolute w-full max-w-[1020px] bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-neutral-200 select-none overflow-hidden text-neutral-900 origin-top"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        {/* Left Text Content */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            <span className="text-[13px] sm:text-[14px] font-normal text-neutral-600 tracking-wide block mb-3">
              {project.category}
            </span>

            <h3 className="text-3xl sm:text-4xl lg:text-[38px] font-bold text-neutral-900 tracking-tight mb-4 leading-tight">
              {project.title}
            </h3>

            <p className="text-neutral-600 text-[14px] sm:text-[15px] font-normal leading-relaxed mb-8 max-w-[400px]">
              {project.description}
            </p>
          </div>

          <div>
            <a
              href={project.link}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-neutral-900 text-neutral-900 text-[14px] font-medium hover:bg-neutral-900 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              View Project
            </a>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="lg:col-span-7 relative">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 shadow-sm border border-neutral-100 flex items-center justify-center max-h-[350px] sm:max-h-[380px]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[350px] sm:max-h-[380px] object-cover rounded-2xl sm:rounded-3xl transform transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Project() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <div
      ref={containerRef}
      id="selected-projects"
      className="relative w-full bg-white select-none"
      style={{ height: `${(projects.length + 3) * 100}vh` }}
    >
      {/* Sticky Stage Container on White Background */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-0 overflow-hidden bg-white">
        <section
          className="relative w-full h-full bg-[#05030a] text-white flex flex-col items-center justify-start pt-10 sm:pt-14 pb-8 overflow-hidden select-none transform-gpu origin-center"
        >
          {/* Color Bends Background */}
          <SavedColorBendsBackground />

          {/* Fixed Section Heading */}
          <h2 className="relative z-50 text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight text-center drop-shadow-lg mb-6 sm:mb-10">
            Selected Projects
          </h2>

          {/* Card Stage Area */}
          <div className="relative w-full max-w-[1020px] flex-1 flex items-start justify-center z-10 px-4 sm:px-8 pt-2 sm:pt-4">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
