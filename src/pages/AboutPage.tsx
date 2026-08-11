import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import StaggeredMenu from '../components/navigator/staggered-menu/StaggeredMenu';
import AboutBento from '../components/sections/AboutBento';
import Bento from '../components/sections/Bento';
import Footer from '../components/navigator/footer/Footer';

export default function AboutPage() {
  const lenisRef = useRef<Lenis | null>(null);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);

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

  // Ending scroll animation from hero section 1 (scale down + border radius transition)
  const { scrollYProgress } = useScroll({
    target: heroContainerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.93]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ['0px', '32px']);

  return (
    <main className="relative min-h-screen bg-white text-white font-sans selection:bg-[#5b72ff] selection:text-white overflow-x-hidden">
      {/* ── Global Staggered Menu Navigation ── */}
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
          { label: 'About', ariaLabel: 'Current page: About', link: '/about' },
          { label: 'Project', ariaLabel: 'Go to Project page', link: '/project' },
          { label: 'Contact', ariaLabel: 'Go to Contact page', link: '/contact' },
        ]}
        socialItems={[
          { label: 'Instagram', link: 'https://www.instagram.com/the.sherifiq' },
          { label: 'LinkedIn', link: 'https://www.linkedin.com/company/sherifiq' },
        ]}
      />

      {/* ── Video Hero Section 1 with Ending Scroll-Scale & Border-Radius Animation ── */}
      <div id="hero" ref={heroContainerRef} className="relative w-full bg-white select-none">
        <div className="sticky top-0 h-[70vh] sm:h-screen w-full flex items-center justify-center p-0 overflow-hidden bg-white">
          <motion.section
            style={{
              scale,
              borderRadius,
            }}
            className="relative w-full h-full bg-[#05030a] text-white flex flex-col justify-end p-6 sm:p-12 overflow-hidden transform-gpu origin-center"
          >
            {/* Raw Unfiltered Video Background (about.mp4) */}
            <video
              src="/assets/video/about-section/about.mp4"
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            />

            {/* Scroll indicator prompt at bottom of video hero */}
            <div className="relative z-20 w-full flex justify-center pb-6">
              <div className="flex flex-col items-center gap-2 text-white/80 opacity-80 hover:opacity-100 transition-opacity">
                <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
                <div className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center p-1">
                  <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* ── About Bento Section ── */}
      <div className="relative z-10 w-full bg-white">
        <AboutBento />
      </div>

      {/* ── Bento Grid Section ── */}
      <div id="bento" className="relative z-10 w-full bg-white">
        <Bento />
      </div>

      {/* ── Founder Section (Next to Bento) ── */}
      {/* <div className="relative z-10 w-full bg-white">
        <FounderSection />
      </div> */}

      {/* ── How We Work Section ── */}
      {/* <div className="relative z-10 w-full bg-white">
        <HowWeWork />
      </div> */}

      {/* ── Footer ── */}
      <div className="relative z-10 w-full bg-white">
        <Footer />
      </div>
    </main>
  );
}
