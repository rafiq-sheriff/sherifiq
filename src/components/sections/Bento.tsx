'use client';

import { useRef, useState, useEffect } from 'react';

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
   Bento Section Component
   ────────────────────────────────────────────── */
export default function Bento() {
  return (
    <section id="bento" className="relative w-full py-16 lg:py-24 px-5 sm:px-10 lg:px-16 bg-white text-[#181538]">
      <div className="w-full max-w-[1080px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* LEFT CARD — Websites Built */}
          <div
            className="md:col-span-4 md:row-span-2 relative z-10 overflow-hidden rounded-3xl flex flex-col justify-between p-7 min-h-[460px] md:min-h-[500px]"
            style={{ backgroundImage: 'linear-gradient(to bottom, #ace6ff, #b5edfe, #bff3fe, #cbf9fe, #d7ffff)' }}
          >
            <div>
              <span className="font-sora text-[#181538] text-[18px] font-semibold tracking-wide block">
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

          {/* MIDDLE CARD — Projects Delivered */}
          <div
            className="md:col-span-4 md:row-span-2 relative overflow-hidden rounded-3xl min-h-[440px] md:min-h-[500px] bg-[#05030a]"
          >
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
              <span className="font-sora text-white text-[18px] font-semibold tracking-wide">
                Projects Delivered
              </span>
            </div>
            <div className="absolute bottom-5 left-5 right-5 z-[2]">
              <div className="bg-white rounded-2xl p-5">
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

          {/* RIGHT COLUMN — SaaS Products & Web Applications */}
          <div className="md:col-span-4 md:row-span-2 relative z-10 flex flex-col gap-5 min-h-[460px] md:min-h-[500px]">
            {/* SaaS Products */}
            <div
              className="relative overflow-hidden rounded-3xl flex flex-col justify-between p-7 flex-[65] min-h-[280px]"
              style={{ backgroundImage: 'linear-gradient(to bottom, #adb2ff, #9a9fff, #888cff, #7678ff, #6464ff)' }}
            >
              <div>
                <span className="font-sora text-white text-[18px] font-semibold tracking-wide block">
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
              className="relative overflow-hidden rounded-3xl flex items-center justify-between p-7 flex-[35] min-h-[140px]"
              style={{ backgroundImage: 'linear-gradient(to bottom, #242155, #211e4e, #1e1b46, #1b183f, #181538)' }}
            >
              <span className="font-sora text-white text-[18px] font-semibold tracking-wide">
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
    </section>
  );
}
