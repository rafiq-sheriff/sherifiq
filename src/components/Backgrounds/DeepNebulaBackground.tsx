'use client';

import { useEffect, useRef } from 'react';

/**
 * DeepNebulaBackground
 *
 * Cinematic dark background featuring morphing, glowing purple/violet/indigo
 * nebula blobs and subtle floating ambient particle dust.
 * Perfectly complements the hero section aesthetic while running at silky 60fps.
 */
export default function DeepNebulaBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // Glowing Nebula Orbs matching Hero section color palette (#8b5cf6, #6366f1, #3c1d96, #28106f)
    interface Orb {
      xRatio: number;
      yRatio: number;
      radiusRatio: number;
      color: string;
      alpha: number;
      speedX: number;
      speedY: number;
      phase: number;
      pulseSpeed: number;
    }

    const orbs: Orb[] = [
      {
        xRatio: 0.3,
        yRatio: 0.25,
        radiusRatio: 0.38,
        color: '139, 92, 246', // #8b5cf6 (violet)
        alpha: 0.32,
        speedX: 0.0003,
        speedY: 0.0002,
        phase: 0,
        pulseSpeed: 0.001,
      },
      {
        xRatio: 0.7,
        yRatio: 0.65,
        radiusRatio: 0.42,
        color: '99, 102, 241', // #6366f1 (indigo)
        alpha: 0.28,
        speedX: -0.0002,
        speedY: 0.0003,
        phase: Math.PI / 2,
        pulseSpeed: 0.0012,
      },
      {
        xRatio: 0.5,
        yRatio: 0.8,
        radiusRatio: 0.35,
        color: '60, 29, 150', // #3c1d96 (deep purple)
        alpha: 0.35,
        speedX: 0.00025,
        speedY: -0.0002,
        phase: Math.PI,
        pulseSpeed: 0.0008,
      },
      {
        xRatio: 0.2,
        yRatio: 0.7,
        radiusRatio: 0.32,
        color: '168, 85, 247', // #a855f7 (purple glow)
        alpha: 0.25,
        speedX: -0.00015,
        speedY: -0.00025,
        phase: Math.PI * 1.5,
        pulseSpeed: 0.0009,
      },
    ];

    // Floating dust particles
    const particleCount = 35;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.4 + 0.1,
      speedY: Math.random() * 0.0003 + 0.0001,
      phase: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Base dark background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#05030a');
      bgGrad.addColorStop(0.5, '#0a0514');
      bgGrad.addColorStop(1, '#05030a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render morphing nebula orbs
      orbs.forEach((orb) => {
        orb.phase += orb.speedX;
        const currentX = (orb.xRatio + Math.sin(orb.phase) * 0.12) * width;
        const currentY = (orb.yRatio + Math.cos(orb.phase * 0.8) * 0.1) * height;
        const pulse = Math.sin(time * orb.pulseSpeed) * 0.08 + 1;
        const currentRadius = orb.radiusRatio * Math.min(width, height) * pulse;

        const grad = ctx.createRadialGradient(
          currentX,
          currentY,
          0,
          currentX,
          currentY,
          currentRadius
        );
        grad.addColorStop(0, `rgba(${orb.color}, ${orb.alpha})`);
        grad.addColorStop(0.4, `rgba(${orb.color}, ${orb.alpha * 0.5})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(currentX, currentY, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Render subtle dust particles
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = 1;

        const pX = p.x * width;
        const pY = p.y * height;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(time * 0.02 + p.phase));

        ctx.fillStyle = `rgba(216, 180, 254, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(pX, pY, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
