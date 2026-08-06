import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import StaggeredMenu from '../components/navigator/staggered-menu/StaggeredMenu';
import AboutHero2 from '../components/sections/AboutHero2';
import HowWeWork from '../components/sections/HowWeWork';
import Footer from '../components/navigator/footer/Footer';

export default function About2Page() {
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
          { label: 'About', ariaLabel: 'Go to About page', link: '/about' },
          { label: 'About 2', ariaLabel: 'Current page: About 2', link: '/about2' },
          { label: 'How We Work', ariaLabel: 'Go to How We Work section', link: '#how-we-work' },
          { label: 'Stats', ariaLabel: 'Go to Stats section', link: '/#bento' },
          { label: 'Projects', ariaLabel: 'Go to Projects page', link: '/project' },
          { label: 'Logo', ariaLabel: 'Go to Brand Logo showcase page', link: '/logo' },
          { label: 'Contact', ariaLabel: 'Go to Contact section', link: '/#cta' },
        ]}
        socialItems={[
          { label: 'Instagram', link: 'https://instagram.com' },
          { label: 'LinkedIn', link: 'https://linkedin.com' },
        ]}
      />

      {/* ── Video Hero Section 1 with Version 2 Video ── */}
      <div id="hero" ref={heroContainerRef} className="relative w-full bg-white select-none">
        <div className="sticky top-0 h-[55vh] sm:h-screen w-full flex items-center justify-center p-0 overflow-hidden bg-white">
          <motion.section
            style={{
              scale,
              borderRadius,
            }}
            className="relative w-full h-full bg-[#05030a] text-white flex flex-col justify-end p-6 sm:p-12 overflow-hidden transform-gpu origin-center"
          >
            {/* Raw Unfiltered Video Background (Version 2) */}
            <video
              src="/assets/video/about-section/about_version2.mp4"
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

      {/* ── Hero Section 2 ── */}
      <div id="hero-2" className="relative z-10 w-full">
        <AboutHero2 />
      </div>

      {/* ── How We Work Section ── */}
      <div className="relative z-10 w-full bg-white">
        <HowWeWork />
      </div>

      {/* ── Footer ── */}
      <div className="relative z-10 w-full bg-white">
        <Footer />
      </div>
    </main>
  );
}
