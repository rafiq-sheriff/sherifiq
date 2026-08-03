'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
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

/* ──────────────────────────────────────────────
   Animated Counter Component
   ────────────────────────────────────────────── */
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

/* ──────────────────────────────────────────────
   Bento & Projects Portal Transition Component
   ────────────────────────────────────────────── */
export default function Bento() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const projectsLayerRef = useRef<HTMLDivElement>(null);
  const bentoLayerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const glassBorderRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const projectCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (
      !sectionRef.current ||
      !pinnedStageRef.current ||
      !bentoLayerRef.current ||
      !gridRef.current ||
      !centerCardRef.current ||
      !cardContentRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // 1. Initial positions for Project cards in Layer 1 (Underneath, ALWAYS 1:1 Scale)
      projectCardRefs.current.forEach((cardEl, idx) => {
        if (!cardEl) return;
        if (idx === 0) {
          gsap.set(cardEl, { y: 0, opacity: 1, scale: 1 });
        } else {
          gsap.set(cardEl, { y: 700, opacity: 0, scale: 1 });
        }
      });

      // Target scale for Bento window frame expansion to reveal full 1:1 Projects section behind it
      const gridTargetScale = 5.2;

      // Master Timeline pinned over sectionRef by GSAP ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* ─────────────────────────────────────────────────────────────
         PHASE 1: BENTO WINDOW FRAME EXPANSION (0.0 -> 0.35)
         Bento section zooms slightly FIRST (0.0 -> 0.07).
         THEN center card cover dissolves (0.07 -> 0.19) to reveal
         Layer 1 (Projects Section) fixed at 1:1 scale behind it!
         ───────────────────────────────────────────────────────────── */

      // A. The ENTIRE Bento Grid window frame scales up (zoom begins immediately)
      tl.to(
        gridRef.current,
        {
          scale: gridTargetScale,
          duration: 0.35,
          ease: 'power3.inOut',
        },
        0
      );

      // B. Morph center card border-radius to 0px as window frame expands past screen
      tl.to(
        centerCardRef.current,
        {
          borderRadius: '0px',
          duration: 0.35,
          ease: 'power3.inOut',
        },
        0
      );

      // C. Fade out center card video & stat box AFTER A LITTLE ZOOM (0.07 -> 0.19)
      tl.to(
        cardContentRef.current,
        {
          opacity: 0,
          duration: 0.12,
          ease: 'power2.out',
        },
        0.07
      );

      // D. Glass border highlight glow fades out as portal expands fully
      if (glassBorderRef.current) {
        tl.to(
          glassBorderRef.current,
          {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
          },
          0.14
        );
      }

      /* ─────────────────────────────────────────────────────────────
         PHASE 2: PROJECT CARDS STACKING SEQUENCE (0.35 -> 0.88)
         ───────────────────────────────────────────────────────────── */
      const cardStep = 0.13;
      const stackStart = 0.35;

      for (let i = 1; i < projects.length; i++) {
        const cardEl = projectCardRefs.current[i];
        if (!cardEl) continue;

        const entryTime = stackStart + (i - 1) * cardStep;

        // Slide current card up into view
        tl.to(
          cardEl,
          {
            y: 0,
            opacity: 1,
            duration: cardStep,
            ease: 'power2.out',
          },
          entryTime
        );

        // Scale down previous cards slightly as new card stacks over them
        for (let j = 0; j < i; j++) {
          const prevCardEl = projectCardRefs.current[j];
          if (!prevCardEl) continue;
          const cardTargetScale = 1 - (i - j) * 0.035;

          tl.to(
            prevCardEl,
            {
              scale: Math.max(0.86, cardTargetScale),
              y: -(i - j) * 16,
              duration: cardStep,
              ease: 'power2.out',
            },
            entryTime
          );
        }
      }

      /* ─────────────────────────────────────────────────────────────
         PHASE 3: EXIT TRANSITION INTO NEXT SECTION (0.88 -> 1.00)
         Scales down stage into rounded card floating over white page,
         enabling a clean, continuous transition directly into HowWeWork!
         ───────────────────────────────────────────────────────────── */
      const exitStart = 0.88;

      tl.to(
        pinnedStageRef.current,
        {
          scale: 0.95,
          borderRadius: '28px',
          duration: 0.12,
          ease: 'power2.out',
        },
        exitStart
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="selected-projects"
      className="relative w-full text-white select-none bg-white"
    >
      {/* Viewport Stage Container (Pinned by GSAP ScrollTrigger on White Page) */}
      <div
        ref={pinnedStageRef}
        className="relative h-screen w-full overflow-hidden select-none transform-gpu origin-center bg-white"
      >
        {/* ========================================================= */}
        {/* LAYER 1 (BOTTOM - Z-INDEX 10): PROJECTS SECTION           */}
        {/* Rendered at ALWAYS 1:1 FULL SCALE directly underneath      */}
        {/* ========================================================= */}
        <div
          ref={projectsLayerRef}
          className="absolute inset-0 z-10 w-full h-full bg-[#05030a] text-white flex flex-col items-center justify-start pt-8 sm:pt-12 pb-8 overflow-hidden transform-gpu select-none"
        >
          {/* Color Bends Background */}
          <SavedColorBendsBackground />

          {/* Section Heading */}
          <h2 className="relative z-50 text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight text-center drop-shadow-lg mb-6 sm:mb-10">
            Selected Projects
          </h2>

          {/* Card Stage Area */}
          <div className="relative w-full max-w-[1020px] flex-1 flex items-start justify-center z-10 px-4 sm:px-8 pt-2 sm:pt-4">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  projectCardRefs.current[index] = el;
                }}
                style={{ zIndex: index + 1 }}
                className="absolute w-full max-w-[1020px] bg-white rounded-[24px] sm:rounded-[28px] p-6 sm:p-8 lg:p-10 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border border-neutral-200 select-none overflow-hidden text-neutral-900 origin-top transform-gpu"
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
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* LAYER 2 (TOP - Z-INDEX 20): BENTO SECTION FRAME           */}
        {/* Center Card has shadow-[0_0_0_9999px_#ffffff] to create    */}
        {/* a solid white backdrop with a center window cutout!       */}
        {/* ========================================================= */}
        <div
          ref={bentoLayerRef}
          className="absolute inset-0 z-20 w-full h-full flex items-center justify-center overflow-hidden transform-gpu select-none bg-transparent"
        >
          {/* Main Bento Grid Container — ENTIRE GRID WINDOW FRAME ZOOMS */}
          <div
            ref={gridRef}
            className="w-full max-w-[1080px] mx-auto px-5 sm:px-10 lg:px-16 select-none relative z-10 origin-center transform-gpu"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
              {/* LEFT CARD — Websites Built */}
              <div
                ref={leftCardRef}
                className="md:col-span-4 md:row-span-2 relative z-10 overflow-hidden rounded-3xl flex flex-col justify-between p-7 min-h-[460px] md:min-h-[500px] shadow-lg transform-gpu origin-center"
                style={{ backgroundImage: 'linear-gradient(to bottom, #ace6ff, #b5edfe, #bff3fe, #cbf9fe, #d7ffff)' }}
              >
                <div>
                  <span className="text-[#181538] text-[18px] font-bold tracking-wide block">
                    Websites Built
                  </span>
                  <div className="text-[56px] sm:text-[68px] font-bold text-[#181538] tracking-tight leading-none mt-3 sm:mt-4">
                    <AnimatedCounter value={10} />
                    <span>+</span>
                  </div>
                </div>
                <p className="text-[13px] text-[#181538]/80 font-medium leading-relaxed max-w-[260px]">
                  High-performance, responsive websites designed for speed, engagement, and conversions.
                </p>
              </div>

              {/* MIDDLE CARD — Projects Delivered (WINDOW CUTOUT TO LAYER 1) */}
              <div
                ref={centerCardRef}
                className="md:col-span-4 md:row-span-2 relative z-0 overflow-hidden rounded-3xl min-h-[440px] md:min-h-[500px] shadow-[0_0_0_9999px_#ffffff] origin-center transform-gpu bg-transparent"
              >
                {/* Cover Content (Video, Title, Stat Box - Fades after a little zoom) */}
                <div ref={cardContentRef} className="absolute inset-0 z-20 w-full h-full transform-gpu bg-[#05030a]">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/assets/cleanstoneimg.webp"
                    className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                  >
                    <source src="/assets/video/about/sherifiq.mp4" type="video/mp4" />
                    <img
                      src="/assets/cleanstoneimg.webp"
                      alt="Projects Delivered"
                      className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 z-[1] rounded-3xl" />
                  <div className="absolute top-6 left-6 z-[2]">
                    <span className="text-white text-[18px] font-bold tracking-wide">
                      Projects Delivered
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 z-[2]">
                    <div className="bg-white rounded-2xl p-5 shadow-lg">
                      <div className="text-[56px] sm:text-[68px] font-bold text-[#181538] tracking-tight leading-none">
                        <AnimatedCounter value={16} />
                        <span>+</span>
                      </div>
                      <p className="mt-1.5 text-[13px] text-gray-500 font-medium leading-snug">
                        Successfully delivered digital products tailored to business growth and innovation
                      </p>
                    </div>
                  </div>
                </div>

                {/* Glass Border Glow Highlight */}
                <div
                  ref={glassBorderRef}
                  className="absolute inset-0 z-30 pointer-events-none rounded-3xl border border-white/40 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                />
              </div>

              {/* RIGHT COLUMN — SaaS Products & Web Applications */}
              <div
                ref={rightColRef}
                className="md:col-span-4 md:row-span-2 relative z-10 flex flex-col gap-5 min-h-[460px] md:min-h-[500px] transform-gpu origin-center"
              >
                {/* SaaS Products */}
                <div
                  className="relative overflow-hidden rounded-3xl flex flex-col justify-between p-7 flex-[65] min-h-[280px] shadow-lg"
                  style={{ backgroundImage: 'linear-gradient(to bottom, #adb2ff, #9a9fff, #888cff, #7678ff, #6464ff)' }}
                >
                  <div>
                    <span className="text-white text-[18px] font-bold tracking-wide block">
                      SaaS Products
                    </span>
                    <div className="text-[56px] sm:text-[68px] font-bold text-white tracking-tight leading-none mt-3 sm:mt-4">
                      <AnimatedCounter value={4} />
                      <span>+</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-white/85 font-medium leading-relaxed max-w-[270px]">
                    Scalable SaaS platforms built to streamline operations and support long-term growth.
                  </p>
                </div>

                {/* Web Applications */}
                <div
                  className="relative overflow-hidden rounded-3xl flex items-center justify-between p-7 flex-[35] min-h-[140px] shadow-lg"
                  style={{ backgroundImage: 'linear-gradient(to bottom, #242155, #211e4e, #1e1b46, #1b183f, #181538)' }}
                >
                  <span className="text-white text-[18px] font-bold tracking-wide">
                    Web Applications
                  </span>
                  <div className="text-[56px] sm:text-[68px] font-bold text-white tracking-tight leading-none">
                    <AnimatedCounter value={2} />
                    <span>+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
