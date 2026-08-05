import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from './BrandLogo';

interface CinematicLoaderProps {
  onComplete?: () => void;
  oncePerSession?: boolean;
}

// Module-level flag ensuring CinematicLoader strictly runs ONLY ONCE per page load
let globalLoaderHasRun = false;

// 5 Columns x 2 Rows Grid Panels matching reference image
const GRID_PANELS = [
  // Top Row (Row 1 - Slides UP)
  { id: 'top-col-1', left: '0%', top: '0%', width: '20%', height: '50%', exitX: '0%', exitY: '-105%', delay: 0.12 },
  { id: 'top-col-2', left: '20%', top: '0%', width: '20%', height: '50%', exitX: '0%', exitY: '-105%', delay: 0.06 },
  { id: 'top-col-3', left: '40%', top: '0%', width: '20%', height: '50%', exitX: '0%', exitY: '-105%', delay: 0.00 },
  { id: 'top-col-4', left: '60%', top: '0%', width: '20%', height: '50%', exitX: '0%', exitY: '-105%', delay: 0.06 },
  { id: 'top-col-5', left: '80%', top: '0%', width: '20%', height: '50%', exitX: '0%', exitY: '-105%', delay: 0.12 },
  
  // Bottom Row (Row 2 - Slides DOWN)
  { id: 'bottom-col-1', left: '0%', top: '50%', width: '20%', height: '50%', exitX: '0%', exitY: '105%', delay: 0.12 },
  { id: 'bottom-col-2', left: '20%', top: '50%', width: '20%', height: '50%', exitX: '0%', exitY: '105%', delay: 0.06 },
  { id: 'bottom-col-3', left: '40%', top: '50%', width: '20%', height: '50%', exitX: '0%', exitY: '105%', delay: 0.00 },
  { id: 'bottom-col-4', left: '60%', top: '50%', width: '20%', height: '50%', exitX: '0%', exitY: '105%', delay: 0.06 },
  { id: 'bottom-col-5', left: '80%', top: '50%', width: '20%', height: '50%', exitX: '0%', exitY: '105%', delay: 0.12 },
];

const STAGES = [
  { time: 0, val: 0 },
  { time: 400, val: 15 },
  { time: 800, val: 32 },
  { time: 1300, val: 58 },
  { time: 1750, val: 74 },
  { time: 2150, val: 91 },
  { time: 2500, val: 100 },
];

export default function CinematicLoader({ onComplete, oncePerSession = false }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'complete' | 'exiting' | 'finished'>(() => {
    return globalLoaderHasRun ? 'finished' : 'loading';
  });

  useEffect(() => {
    if (globalLoaderHasRun) {
      if (onComplete) onComplete();
      return;
    }

    if (oncePerSession && typeof window !== 'undefined') {
      const hasLoaded = sessionStorage.getItem('cinematic_loader_seen');
      if (hasLoaded === 'true') {
        globalLoaderHasRun = true;
        setPhase('finished');
        if (onComplete) onComplete();
        return;
      }
    }

    document.body.style.overflow = 'hidden';

    let animationFrameId: number;
    let startTime: number | null = null;

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const totalDuration = STAGES[STAGES.length - 1].time;

      if (elapsed >= totalDuration) {
        setProgress(100);
        setPhase('complete');
        return;
      }

      let currentProgress = 0;
      for (let i = 0; i < STAGES.length - 1; i++) {
        const s1 = STAGES[i];
        const s2 = STAGES[i + 1];
        if (elapsed >= s1.time && elapsed <= s2.time) {
          const ratio = (elapsed - s1.time) / (s2.time - s1.time);
          const smoothRatio = ratio * ratio * (3 - 2 * ratio);
          currentProgress = s1.val + (s2.val - s1.val) * smoothRatio;
          break;
        }
      }

      setProgress(Math.min(100, Math.floor(currentProgress)));
      animationFrameId = requestAnimationFrame(animateProgress);
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [oncePerSession, onComplete]);

  useEffect(() => {
    if (phase === 'complete') {
      const pauseTimer = setTimeout(() => {
        setPhase('exiting');
      }, 300);
      return () => clearTimeout(pauseTimer);
    }

    if (phase === 'exiting') {
      const exitTimer = setTimeout(() => {
        globalLoaderHasRun = true;
        setPhase('finished');
        document.body.style.overflow = '';
        if (oncePerSession && typeof window !== 'undefined') {
          sessionStorage.setItem('cinematic_loader_seen', 'true');
        }
        if (onComplete) onComplete();
      }, 1200);
      return () => clearTimeout(exitTimer);
    }
  }, [phase, oncePerSession, onComplete]);

  if (phase === 'finished' || globalLoaderHasRun) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {/* 
        5 Columns x 2 Rows Grid Panels Layer
        Pristine solid white panels (#ffffff) sliding UP (top row) and DOWN (bottom row)
      */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-auto overflow-hidden">
        {GRID_PANELS.map((panel) => (
          <motion.div
            key={panel.id}
            initial={{ x: '0%', y: '0%' }}
            animate={
              phase === 'exiting'
                ? {
                    x: panel.exitX,
                    y: panel.exitY,
                  }
                : { x: '0%', y: '0%' }
            }
            transition={{
              duration: 1.1,
              delay: panel.delay,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              position: 'absolute',
              left: panel.left,
              top: panel.top,
              width: panel.width,
              height: panel.height,
              backgroundColor: '#ffffff',
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* Center Content: Brand Logo with Bottom-to-Top Liquid Fill Animation */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none">
        <AnimatePresence>
          {phase !== 'exiting' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.84,
                filter: 'blur(8px)',
                transition: { duration: 0.45, ease: [0.32, 0, 0.67, 0] },
              }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center justify-center gap-5"
            >
              {/* Logo container displaying liquid fill synced with loading progress */}
              <div className="flex items-center justify-center p-3">
                <BrandLogo
                  className="w-14 h-auto sm:w-16 md:w-20"
                  baseFill="rgba(91, 114, 255, 0.15)"
                  fill="#5b72ff"
                  animatedFill={true}
                  progress={progress}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Percentage Display - Bottom Right */}
      <AnimatePresence>
        {phase !== 'exiting' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
              opacity: 0,
              y: 12,
              transition: { duration: 0.35, ease: 'easeIn' },
            }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-8 right-8 sm:bottom-10 sm:right-12 z-40 flex items-baseline pointer-events-none"
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tighter text-[#181538] tabular-nums select-none">
              {progress}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
