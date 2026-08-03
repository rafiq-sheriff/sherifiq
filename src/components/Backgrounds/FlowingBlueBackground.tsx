'use client';

import { useEffect, useRef } from 'react';

/**
 * FlowingBlueBackground
 *
 * Animated dark background with vibrant blue flowing/morphing blobs
 * that visibly move, pulse, and swirl across the canvas.
 * Uses HTML Canvas for smooth 60fps animation.
 */
export default function FlowingBlueBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.parentElement?.getBoundingClientRect() || canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Blob definitions with enhanced movement parameters
    interface Blob {
      baseX: number;
      baseY: number;
      baseRadius: number;
      r: number; g: number; b: number; baseAlpha: number;
      // Primary orbit
      orbitSpeedX: number;
      orbitSpeedY: number;
      orbitRadiusX: number;
      orbitRadiusY: number;
      phaseX: number;
      phaseY: number;
      // Secondary wobble (smaller, faster)
      wobbleSpeed: number;
      wobbleRadius: number;
      wobblePhase: number;
      // Pulsing radius
      pulseSpeed: number;
      pulseAmount: number; // fraction of baseRadius
      pulsePhase: number;
      // Alpha breathing
      breatheSpeed: number;
      breatheAmount: number;
      breathePhase: number;
    }

    const blobs: Blob[] = [
      // LEFT EDGE: Large blue glow covering the entire left side, curving from top-left toward center
      {
        baseX: -0.15, baseY: 0.3, baseRadius: 0.6,
        r: 0, g: 20, b: 255, baseAlpha: 1.0,
        orbitSpeedX: 0.12, orbitSpeedY: 0.1,
        orbitRadiusX: 0.06, orbitRadiusY: 0.08,
        phaseX: 0, phaseY: 0.5,
        wobbleSpeed: 0.8, wobbleRadius: 0.015, wobblePhase: 0,
        pulseSpeed: 0.3, pulseAmount: 0.06, pulsePhase: 0,
        breatheSpeed: 0.25, breatheAmount: 0.08, breathePhase: 0,
      },
      // TOP-LEFT: Blue arc sweeping from left edge toward top-center
      {
        baseX: 0.15, baseY: -0.1, baseRadius: 0.5,
        r: 0, g: 15, b: 230, baseAlpha: 0.9,
        orbitSpeedX: 0.1, orbitSpeedY: 0.08,
        orbitRadiusX: 0.08, orbitRadiusY: 0.05,
        phaseX: 1.2, phaseY: 0.3,
        wobbleSpeed: 0.7, wobbleRadius: 0.012, wobblePhase: 1.5,
        pulseSpeed: 0.25, pulseAmount: 0.05, pulsePhase: 1.0,
        breatheSpeed: 0.2, breatheAmount: 0.06, breathePhase: 0.8,
      },
      // TOP-RIGHT: Subtle dark blue tint in top-right corner
      {
        baseX: 0.85, baseY: -0.05, baseRadius: 0.35,
        r: 0, g: 10, b: 180, baseAlpha: 0.5,
        orbitSpeedX: 0.08, orbitSpeedY: 0.06,
        orbitRadiusX: 0.05, orbitRadiusY: 0.04,
        phaseX: 2.5, phaseY: 1.8,
        wobbleSpeed: 0.6, wobbleRadius: 0.01, wobblePhase: 3.0,
        pulseSpeed: 0.2, pulseAmount: 0.04, pulsePhase: 2.0,
        breatheSpeed: 0.18, breatheAmount: 0.06, breathePhase: 1.5,
      },
      // BOTTOM-LEFT: Bright white/pale blue glow spot (the distinctive bright corner)
      {
        baseX: 0.0, baseY: 0.88, baseRadius: 0.28,
        r: 180, g: 210, b: 255, baseAlpha: 0.85,
        orbitSpeedX: 0.1, orbitSpeedY: 0.08,
        orbitRadiusX: 0.04, orbitRadiusY: 0.03,
        phaseX: 3.8, phaseY: 2.1,
        wobbleSpeed: 0.9, wobbleRadius: 0.01, wobblePhase: 2.0,
        pulseSpeed: 0.35, pulseAmount: 0.08, pulsePhase: 3.0,
        breatheSpeed: 0.3, breatheAmount: 0.1, breathePhase: 2.5,
      },
      // BOTTOM-LEFT: Inner white core of the bright glow
      {
        baseX: -0.02, baseY: 0.95, baseRadius: 0.15,
        r: 230, g: 240, b: 255, baseAlpha: 0.75,
        orbitSpeedX: 0.08, orbitSpeedY: 0.06,
        orbitRadiusX: 0.03, orbitRadiusY: 0.02,
        phaseX: 4.0, phaseY: 2.5,
        wobbleSpeed: 1.0, wobbleRadius: 0.008, wobblePhase: 4.0,
        pulseSpeed: 0.4, pulseAmount: 0.1, pulsePhase: 1.5,
        breatheSpeed: 0.35, breatheAmount: 0.12, breathePhase: 3.0,
      },
      // BOTTOM: Wide blue glow across the full bottom edge
      {
        baseX: 0.5, baseY: 1.15, baseRadius: 0.55,
        r: 0, g: 30, b: 255, baseAlpha: 0.95,
        orbitSpeedX: 0.09, orbitSpeedY: 0.06,
        orbitRadiusX: 0.1, orbitRadiusY: 0.04,
        phaseX: 0.8, phaseY: 4.0,
        wobbleSpeed: 0.5, wobbleRadius: 0.015, wobblePhase: 2.5,
        pulseSpeed: 0.22, pulseAmount: 0.05, pulsePhase: 3.5,
        breatheSpeed: 0.2, breatheAmount: 0.06, breathePhase: 0.5,
      },
      // BOTTOM-RIGHT: Blue glow in bottom-right area
      {
        baseX: 0.9, baseY: 1.0, baseRadius: 0.45,
        r: 0, g: 40, b: 255, baseAlpha: 0.9,
        orbitSpeedX: 0.11, orbitSpeedY: 0.08,
        orbitRadiusX: 0.07, orbitRadiusY: 0.05,
        phaseX: 1.8, phaseY: 3.2,
        wobbleSpeed: 0.7, wobbleRadius: 0.012, wobblePhase: 1.0,
        pulseSpeed: 0.28, pulseAmount: 0.06, pulsePhase: 0.5,
        breatheSpeed: 0.22, breatheAmount: 0.07, breathePhase: 1.0,
      },
      // LEFT-MID: Reinforcing the left edge blue
      {
        baseX: -0.1, baseY: 0.6, baseRadius: 0.45,
        r: 0, g: 50, b: 255, baseAlpha: 0.9,
        orbitSpeedX: 0.1, orbitSpeedY: 0.12,
        orbitRadiusX: 0.05, orbitRadiusY: 0.08,
        phaseX: 5.0, phaseY: 0.7,
        wobbleSpeed: 0.8, wobbleRadius: 0.012, wobblePhase: 0.3,
        pulseSpeed: 0.3, pulseAmount: 0.07, pulsePhase: 2.5,
        breatheSpeed: 0.25, breatheAmount: 0.08, breathePhase: 4.0,
      },
    ];

    let time = 0;

    const draw = () => {
      // Faster time progression for visible animation
      time += 0.012;

      // Fill with deep black
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const maxDim = Math.max(width, height);

      // Draw each blob with layered movement
      for (const blob of blobs) {
        const t = time;

        // Primary orbital movement
        const orbitX = Math.sin(t * blob.orbitSpeedX * Math.PI * 2 + blob.phaseX) * blob.orbitRadiusX;
        const orbitY = Math.cos(t * blob.orbitSpeedY * Math.PI * 2 + blob.phaseY) * blob.orbitRadiusY;

        // Secondary fast wobble
        const wobbleX = Math.sin(t * blob.wobbleSpeed * Math.PI * 2 + blob.wobblePhase) * blob.wobbleRadius;
        const wobbleY = Math.cos(t * blob.wobbleSpeed * Math.PI * 2 + blob.wobblePhase + 1.3) * blob.wobbleRadius;

        // Final position
        const cx = (blob.baseX + orbitX + wobbleX) * width;
        const cy = (blob.baseY + orbitY + wobbleY) * height;

        // Pulsing radius
        const pulseScale = 1 + Math.sin(t * blob.pulseSpeed * Math.PI * 2 + blob.pulsePhase) * blob.pulseAmount;
        const r = blob.baseRadius * maxDim * pulseScale;

        // Breathing alpha
        const alphaBreath = blob.baseAlpha * (1 - blob.breatheAmount * 0.5 + Math.sin(t * blob.breatheSpeed * Math.PI * 2 + blob.breathePhase) * blob.breatheAmount * 0.5);
        const alpha = Math.max(0, Math.min(1, alphaBreath));

        // Create gradient
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        gradient.addColorStop(0, `rgba(${blob.r}, ${blob.g}, ${blob.b}, ${alpha})`);
        gradient.addColorStop(0.3, `rgba(${blob.r}, ${blob.g}, ${blob.b}, ${alpha * 0.7})`);
        gradient.addColorStop(0.6, `rgba(${blob.r}, ${blob.g}, ${blob.b}, ${alpha * 0.3})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      // Subtle vignette overlay for depth
      ctx.globalCompositeOperation = 'multiply';
      const vignette = ctx.createRadialGradient(
        width * 0.5, height * 0.5, maxDim * 0.15,
        width * 0.5, height * 0.5, maxDim * 0.75
      );
      vignette.addColorStop(0, 'rgba(255, 255, 255, 1)');
      vignette.addColorStop(1, 'rgba(40, 40, 40, 1)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      // Reset composite
      ctx.globalCompositeOperation = 'source-over';

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
}
