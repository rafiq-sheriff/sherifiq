import React from 'react';
import { motion } from 'framer-motion';

interface BrandLogoProps {
  className?: string;
  fill?: string;
  baseFill?: string;
  progress?: number; // 0 to 100
  animatedFill?: boolean;
  useGradient?: boolean;
}

export function BrandLogo({
  className = 'h-9 w-auto',
  fill = 'currentColor',
  baseFill = '#e4e4e7',
  progress = 0,
  animatedFill = false,
  useGradient = false,
}: BrandLogoProps) {
  const clipId = React.useId().replace(/:/g, '_');
  const gradientId = `brand_logo_gradient_${clipId}`;
  const actualFill = useGradient ? `url(#${gradientId})` : fill;

  if (animatedFill) {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    
    // waterY position:
    // At 0%: 67px (below bottom of logo)
    // At 100%: -5px (above top of logo)
    const waterY = 67 - (72 * clampedProgress) / 100;
    
    // Wave amplitude: 3.5px during filling, flattens at 100%
    const amp = clampedProgress < 100 ? 3.5 : 0;

    return (
      <svg
        width="43"
        height="65"
        viewBox="0 0 43 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#434596" />
            <stop offset="50%" stopColor="#313374" />
            <stop offset="100%" stopColor="#25265E" />
          </linearGradient>
          {/* Logo Geometry Clip Path */}
          <clipPath id={`logo_shape_clip_${clipId}`}>
            <path d="M0.56926 26.5283L26.2157 0.576049C27.4317 -0.654514 29.511 0.217021 29.511 1.9573V29.8629H1.93424C0.214465 29.8629 -0.646802 27.7588 0.56926 26.5283Z" />
            <path d="M42.4301 38.4713L16.7836 64.4236C15.5676 65.6541 13.4883 64.7826 13.4883 63.0424V35.1367H41.0651C42.7848 35.1367 43.6461 37.2408 42.4301 38.4713Z" />
          </clipPath>
        </defs>

        {/* 1. Base Layer: Unfilled Light Grey Logo */}
        <g>
          <path
            d="M0.56926 26.5283L26.2157 0.576049C27.4317 -0.654514 29.511 0.217021 29.511 1.9573V29.8629H1.93424C0.214465 29.8629 -0.646802 27.7588 0.56926 26.5283Z"
            fill={baseFill}
          />
          <path
            d="M42.4301 38.4713L16.7836 64.4236C15.5676 65.6541 13.4883 64.7826 13.4883 63.0424V35.1367H41.0651C42.7848 35.1367 43.6461 37.2408 42.4301 38.4713Z"
            fill={baseFill}
          />
        </g>

        {/* 2. Water Filling Layer (Clipped to the logo shape) */}
        <g clipPath={`url(#logo_shape_clip_${clipId})`}>
          {/* Back Translucent Ripple Wave Layer */}
          <motion.path
            d={`M -43 ${waterY + 1.5} Q -21.5 ${waterY - amp} 0 ${waterY + 1.5} T 43 ${waterY + 1.5} T 86 ${waterY + 1.5} V 80 H -43 Z`}
            fill={actualFill}
            opacity={0.35}
            animate={{ x: [0, -43] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Main Front Water Wave Body Layer */}
          <motion.path
            d={`M -43 ${waterY} Q -21.5 ${waterY + amp} 0 ${waterY} T 43 ${waterY} T 86 ${waterY} V 80 H -43 Z`}
            fill={actualFill}
            animate={{ x: [0, -43] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      width="43"
      height="65"
      viewBox="0 0 43 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#434596" />
          <stop offset="50%" stopColor="#313374" />
          <stop offset="100%" stopColor="#25265E" />
        </linearGradient>
        <clipPath id={`clip0_navbar_logo_${clipId}`}>
          <rect width="43" height="65" fill={actualFill} />
        </clipPath>
      </defs>
      <g clipPath={`url(#clip0_navbar_logo_${clipId})`}>
        <path
          d="M0.56926 26.5283L26.2157 0.576049C27.4317 -0.654514 29.511 0.217021 29.511 1.9573V29.8629H1.93424C0.214465 29.8629 -0.646802 27.7588 0.56926 26.5283Z"
          fill={actualFill}
        />
        <path
          d="M42.4301 38.4713L16.7836 64.4236C15.5676 65.6541 13.4883 64.7826 13.4883 63.0424V35.1367H41.0651C42.7848 35.1367 43.6461 37.2408 42.4301 38.4713Z"
          fill={actualFill}
        />
      </g>
    </svg>
  );
}

export default BrandLogo;
