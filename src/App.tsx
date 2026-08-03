import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoHero from './components/LogoHero/LogoHero';
import CapabilitiesMarquee from './components/sections/CapabilitiesMarquee';
import AboutBento from './components/sections/AboutBento';
import Bento from './components/sections/Bento';
import HowWeWork from './components/sections/HowWeWork';
import FAQ from './components/sections/FAQ';
import CinematicLoader from './components/ui/CinematicLoader';
import StaggeredMenu from './components/navigator/staggered-menu/StaggeredMenu';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
    };
  }, []);

  const handleLoaderComplete = () => {
    setIsLoading(false);
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  };

  return (
    <main className="relative min-h-screen text-white selection:bg-blue-600 selection:text-white bg-white">
      {isLoading && <CinematicLoader onComplete={handleLoaderComplete} />}
      
      {/* Global Fixed Staggered Menu as seen on portfolio website */}
      <StaggeredMenu
        isFixed={true}
        position="right"
        colors={['#05030a', '#181538', '#28106f', '#3c1d96']}
        accentColor="#8b5cf6"
        displayDownloadCv={false}
        items={[
          { label: 'Home', ariaLabel: 'Go to Home section', link: '#hero' },
          { label: 'About', ariaLabel: 'Go to About section', link: '#about-bento' },
          { label: 'Archive', ariaLabel: 'Go to Archive section', link: '#bento' },
          { label: 'Contact', ariaLabel: 'Go to Contact section', link: '#faq' },
        ]}
        socialItems={[
          { label: 'Instagram', link: 'https://instagram.com' },
          { label: 'LinkedIn', link: 'https://linkedin.com' },
        ]}
      />

      <div className="relative z-10">
        <LogoHero isRevealed={!isLoading} />
        <CapabilitiesMarquee />
        <AboutBento />
        <Bento />
        <HowWeWork />
        <FAQ />
      </div>
    </main>
  );
}

