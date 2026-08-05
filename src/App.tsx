import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LogoHero from './components/LogoHero/LogoHero';
import CapabilitiesMarquee from './components/sections/CapabilitiesMarquee';
import AboutBento from './components/sections/AboutBento';
import Bento from './components/sections/Bento';
import Project from './components/sections/Project';
// import HowWeWork from './components/sections/HowWeWork';
import CTA from './components/sections/CTA';
import FAQ from './components/sections/FAQ';
import Footer from './components/navigator/footer/Footer';
import CinematicLoader from './components/ui/CinematicLoader';
import StaggeredMenu from './components/navigator/staggered-menu/StaggeredMenu';
import LogoPage from './pages/LogoPage';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [logoSettled, setLogoSettled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath === '/logo' || currentPath === '/logo/') {
    return <LogoPage />;
  }

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
          { label: 'About', ariaLabel: 'Go to About section', link: '#about-bento' },
          { label: 'Stats', ariaLabel: 'Go to Stats section', link: '#bento' },
          { label: 'Projects', ariaLabel: 'Go to Selected Projects section', link: '#selected-projects' },
          { label: 'Logo', ariaLabel: 'Go to Brand Logo showcase page', link: '/logo' },
          { label: 'Contact', ariaLabel: 'Go to Contact section', link: '#cta' },
        ]}
        socialItems={[
          { label: 'Instagram', link: 'https://instagram.com' },
          { label: 'LinkedIn', link: 'https://linkedin.com' },
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
        {/* <HowWeWork /> */}
        <CTA />
        <FAQ />
        <Footer />
      </div>
    </main>
  );
}
