'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoHero from './components/LogoHero/LogoHero';
import CapabilitiesMarquee from './components/sections/CapabilitiesMarquee';
import AboutBento from './components/sections/AboutBento';
import Bento from './components/sections/Bento';
import Project from './components/sections/Project';
import CTA from './components/sections/CTA';
import FAQ from './components/sections/FAQ';
import Footer from './components/navigator/footer/Footer';
import CinematicLoader from './components/ui/CinematicLoader';
import StaggeredMenu from './components/navigator/staggered-menu/StaggeredMenu';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logoSettled, setLogoSettled] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    if (isLoading) {
      lenis.stop();
    }

    lenis.on('scroll', ScrollTrigger.update);

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    if (lenisRef.current) {
      lenisRef.current.start();
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }
  };

  return (
    <main className="relative min-h-screen text-white selection:bg-blue-600 selection:text-white bg-white">
      {isLoading && <CinematicLoader onComplete={handleLoaderComplete} />}

      {/* Global Fixed Staggered Menu as seen on portfolio website */}
      <StaggeredMenu
        isRevealed={logoSettled}
        isFixed={true}
        position="right"
        colors={['#05030a', '#181538', '#28106f', '#5B72FF']}
        accentColor="#8b5cf6"
        displayDownloadCv={false}
        onMenuOpen={() => {
          lenisRef.current?.stop();
        }}
        onMenuClose={() => {
          lenisRef.current?.start();
        }}
        items={[
          { label: 'Home', ariaLabel: 'Go to Home section', link: '#hero' },
          { label: 'About', ariaLabel: 'Go to About page', link: '/about' },
          { label: 'Project', ariaLabel: 'Go to Project page', link: '/project' },
          { label: 'Contact', ariaLabel: 'Go to Contact page', link: '/contact' },
        ]}
        socialItems={[
          { label: 'Instagram', link: 'https://www.instagram.com/the.sherifiq' },
          { label: 'LinkedIn', link: 'https://www.linkedin.com/company/sherifiq' },
        ]}
      />

      <div className="relative z-10">
        <LogoHero
          isRevealed={!isLoading}
          isContentRevealed={logoSettled}
          onLogoSettled={() => setLogoSettled(true)}
        />
        <CapabilitiesMarquee />
        <AboutBento />
        <Bento />
        <Project />
        <CTA />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
