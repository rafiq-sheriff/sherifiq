import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

/* ──────────────────────────────────────────────
   Scroll-reveal headline – each word fades in
   as the user scrolls through the section
   ────────────────────────────────────────────── */
function ScrollRevealHeadline() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.92', 'start 0.35'],
  });

  const fullText =
    'We create websites, SaaS platforms, AI solutions, and brand experiences that help ambitious businesses grow with confidence and long-term impact';
  const words = fullText.split(' ');

  return (
    <h2
      ref={containerRef}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.25] tracking-tight text-center max-w-[1000px] mx-auto flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 select-none"
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 2 / words.length);
        return (
          <ScrollWord
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
            darkColor="#181538"
          />
        );
      })}
    </h2>
  );
}

function ScrollWord({
  word,
  progress,
  range,
  darkColor,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
  darkColor: string;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity, color: darkColor }} className="transform-gpu">
      {word}
    </motion.span>
  );
}



/* ──────────────────────────────────────────────
   AboutBento Section
   ────────────────────────────────────────────── */
export default function AboutBento() {
  return (
    <section
      id="about-bento"
      className="relative w-full pt-24 sm:pt-32 lg:pt-36 pb-8 px-5 sm:px-10 lg:px-16 overflow-hidden select-none"
      style={{ background: '#ffffff' }}
    >
      {/* ── Scroll-reveal Headline ── */}
      <div>
        <ScrollRevealHeadline />
      </div>
    </section>
  );
}

