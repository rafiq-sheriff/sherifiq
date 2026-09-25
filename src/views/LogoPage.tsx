import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '../components/ui/BrandLogo';

type LogoSelection = 'navbar' | 'full' | 'menu' | 'all';
type LayoutOption = 'row' | 'col' | 'logo-only' | 'text-only';
type TextCaseOption = 'title' | 'upper';
type ExportTarget = 'all' | 'text-only' | 'logo-only';
type ExportFormat = 'png' | 'webp' | 'svg';
type ExportQuality = '2k' | '4k' | '8k';

interface ThemePreset {
  name: string;
  bgColor: string;
  logoColor: string;
  textColor: string;
  badgeBgColor?: string;
}

const PRESET_THEMES: ThemePreset[] = [
  { name: 'Brand Royal', bgColor: '#5b72ff', logoColor: '#ffffff', textColor: '#ffffff', badgeBgColor: '#181538' },
  { name: 'Onyx Dark', bgColor: '#09090b', logoColor: '#ffffff', textColor: '#ffffff', badgeBgColor: '#5b72ff' },
  { name: 'Clean Light', bgColor: '#ffffff', logoColor: '#5b72ff', textColor: '#09090b', badgeBgColor: '#09090b' },
  { name: 'Monochrome', bgColor: '#ffffff', logoColor: '#000000', textColor: '#000000', badgeBgColor: '#f4f4f5' },
  { name: 'Cyber Emerald', bgColor: '#051c14', logoColor: '#10b981', textColor: '#ecfdf5', badgeBgColor: '#064e3b' },
  { name: 'Deep Indigo', bgColor: '#1e1b4b', logoColor: '#818cf8', textColor: '#e0e7ff', badgeBgColor: '#312e81' },
  { name: 'Midnight Gold', bgColor: '#0a0a0c', logoColor: '#f59e0b', textColor: '#fbbf24', badgeBgColor: '#1e1b4b' },
];

const SWATCHES = [
  '#5b72ff',
  '#09090b',
  '#ffffff',
  '#000000',
  '#1e1b4b',
  '#064e3b',
  '#f59e0b',
  '#ec4899',
  '#8b5cf6',
  '#38bdf8',
];

function isLightColor(hex: string): boolean {
  if (hex === 'transparent') return true;
  const c = hex.replace('#', '');
  if (c.length !== 6) return false;
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.65;
}

export default function LogoPage() {
  const [bgColor, setBgColor] = useState('#5b72ff');
  const [logoColor, setLogoColor] = useState('#ffffff');
  const [menuBadgeBg, setMenuBadgeBg] = useState('#5b72ff');
  const [textColor, setTextColor] = useState('#ffffff');
  const [syncColors, setSyncColors] = useState(true);

  const [logoVariant, setLogoVariant] = useState<LogoSelection>('menu');
  const [layout, setLayout] = useState<LayoutOption>('row');
  const [textCase, setTextCase] = useState<TextCaseOption>('title');
  const [showControls, setShowControls] = useState(true);

  // Download Modal state
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [exportTarget, setExportTarget] = useState<ExportTarget>('all');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('png');
  const [exportQuality, setExportQuality] = useState<ExportQuality>('4k');
  const [exportTransparentBg, setExportTransparentBg] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const isTransparent = bgColor === 'transparent';
  const isBgLight = isLightColor(bgColor);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2400);
  };

  const handleLogoColorChange = (color: string) => {
    setLogoColor(color);
    if (syncColors) {
      setTextColor(color);
    }
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    if (syncColors) {
      setLogoColor(color);
    }
  };

  const applyPreset = (preset: ThemePreset) => {
    setBgColor(preset.bgColor);
    setLogoColor(preset.logoColor);
    setTextColor(preset.textColor);
    if (preset.badgeBgColor) {
      setMenuBadgeBg(preset.badgeBgColor);
    }
    setSyncColors(preset.logoColor === preset.textColor);
    showToast(`Applied ${preset.name} theme`);
  };

  const copyHex = (hex: string, label: string) => {
    navigator.clipboard.writeText(hex);
    showToast(`Copied ${label} (${hex})`);
  };


  // Ultra High-Resolution Export Handler
  const handleDownloadAsset = async (
    target: ExportTarget = exportTarget,
    format: ExportFormat = exportFormat,
    transparentBg: boolean = exportTransparentBg,
    quality: ExportQuality = exportQuality
  ) => {
    setIsExporting(true);
    try {
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn('Font load timeout:', e);
      }

      const displayText = textCase === 'title' ? 'Sherifiq' : 'SHERIFIQ';

      // SVG Export (Vector = Infinite Scale)
      if (format === 'svg') {
        let svgContent = '';
        const bgRect = transparentBg || bgColor === 'transparent'
          ? ''
          : `<rect width="100%" height="100%" fill="${bgColor}"/>`;

        const navbarPath = `<path d="M0.56926 26.5283L26.2157 0.576049C27.4317 -0.654514 29.511 0.217021 29.511 1.9573V29.8629H1.93424C0.214465 29.8629 -0.646802 27.7588 0.56926 26.5283Z" fill="${logoColor}"/><path d="M42.4301 38.4713L16.7836 64.4236C15.5676 65.6541 13.4883 64.7826 13.4883 63.0424V35.1367H41.0651C42.7848 35.1367 43.6461 37.2408 42.4301 38.4713Z" fill="${logoColor}"/>`;

        const fullPath = `<g transform="translate(60, 60)"><path d="M4.95817 229.292L228.347 4.9789C238.939 -5.65705 257.051 1.87572 257.051 16.917V258.114H16.8477C1.86818 258.114 -5.63372 239.928 4.95817 229.292Z" fill="${logoColor}"/><path d="M369.588 332.533L146.199 556.847C135.607 567.482 117.496 559.95 117.496 544.908V303.711H357.699C372.678 303.711 380.18 321.897 369.588 332.533Z" fill="${logoColor}"/></g>`;

        const menuBadgePath = `<g><rect width="200" height="280" rx="100" ry="100" fill="${menuBadgeBg}"/><g transform="translate(42, 75) scale(2.7)">${navbarPath}</g></g>`;

        const logoSvgInner = logoVariant === 'menu'
          ? menuBadgePath
          : logoVariant === 'full'
          ? fullPath
          : navbarPath;

        if (target === 'logo-only') {
          const vbW = logoVariant === 'menu' ? 200 : logoVariant === 'full' ? 495 : 43;
          const vbH = logoVariant === 'menu' ? 280 : logoVariant === 'full' ? 682 : 65;
          const scale = logoVariant === 'menu' ? 4 : 4;
          svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="${vbW * scale}" height="${vbH * scale}">${bgRect}${logoSvgInner}</svg>`;
        } else if (target === 'text-only') {
          svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 500" width="1600" height="500">
            <style>
              @font-face {
                font-family: 'Rosnoc';
                src: url('/assets/font/Rosnoc.otf') format('opentype');
              }
              .text { font-family: 'Rosnoc', sans-serif; font-size: 220px; fill: ${textColor}; dominant-baseline: central; text-anchor: middle; }
            </style>
            ${bgRect}
            <text x="50%" y="50%" class="text">${displayText}</text>
          </svg>`;
        } else {
          if (layout === 'col') {
            svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 900" width="1400" height="900">
              <style>
                @font-face {
                  font-family: 'Rosnoc';
                  src: url('/assets/font/Rosnoc.otf') format('opentype');
                }
                .text { font-family: 'Rosnoc', sans-serif; font-size: 170px; fill: ${textColor}; dominant-baseline: central; text-anchor: middle; }
              </style>
              ${bgRect}
              <g transform="translate(600, 80) scale(1.5)">${logoSvgInner}</g>
              <text x="50%" y="700" class="text">${displayText}</text>
            </svg>`;
          } else {
            svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1800 650" width="1800" height="650">
              <style>
                @font-face {
                  font-family: 'Rosnoc';
                  src: url('/assets/font/Rosnoc.otf') format('opentype');
                }
                .text { font-family: 'Rosnoc', sans-serif; font-size: 190px; fill: ${textColor}; dominant-baseline: central; text-anchor: start; }
              </style>
              ${bgRect}
              <g transform="translate(150, 160) scale(1.6)">${logoSvgInner}</g>
              <text x="540" y="325" class="text">${displayText}</text>
            </svg>`;
          }
        }

        const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sherifiq-${target}${transparentBg ? '-transparent' : ''}.svg`;
        a.click();
        URL.revokeObjectURL(url);
        showToast(`Downloaded ${target} as Ultra-Vector SVG!`);
        setShowDownloadModal(false);
        setIsExporting(false);
        return;
      }

      // Ultra High-Res Canvas Exporter (2K / 4K / 8K)
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const scaleFactor = quality === '8k' ? 3.5 : quality === '4k' ? 2.0 : 1.0;

      let baseW = 2600;
      let baseH = 1300;

      if (target === 'logo-only') {
        baseW = logoVariant === 'menu' ? 1200 : logoVariant === 'full' ? 1400 : 1000;
        baseH = logoVariant === 'menu' ? 1500 : logoVariant === 'full' ? 1800 : 1400;
      } else if (target === 'text-only') {
        baseW = 2800;
        baseH = 1000;
      } else {
        baseW = layout === 'col' ? 2400 : 3200;
        baseH = layout === 'col' ? 1800 : 1200;
      }

      const width = Math.round(baseW * scaleFactor);
      const height = Math.round(baseH * scaleFactor);

      canvas.width = width;
      canvas.height = height;

      // Anti-aliasing quality flags
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Background
      if (!transparentBg && bgColor !== 'transparent') {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      const pNavbar1 = new Path2D(
        'M0.56926 26.5283L26.2157 0.576049C27.4317 -0.654514 29.511 0.217021 29.511 1.9573V29.8629H1.93424C0.214465 29.8629 -0.646802 27.7588 0.56926 26.5283Z'
      );
      const pNavbar2 = new Path2D(
        'M42.4301 38.4713L16.7836 64.4236C15.5676 65.6541 13.4883 64.7826 13.4883 63.0424V35.1367H41.0651C42.7848 35.1367 43.6461 37.2408 42.4301 38.4713Z'
      );

      const pFull1 = new Path2D(
        'M4.95817 229.292L228.347 4.9789C238.939 -5.65705 257.051 1.87572 257.051 16.917V258.114H16.8477C1.86818 258.114 -5.63372 239.928 4.95817 229.292Z'
      );
      const pFull2 = new Path2D(
        'M369.588 332.533L146.199 556.847C135.607 567.482 117.496 559.95 117.496 544.908V303.711H357.699C372.678 303.711 380.18 321.897 369.588 332.533Z'
      );

      const drawLogo = (x: number, y: number, scale: number) => {
        ctx.save();

        if (logoVariant === 'menu') {
          const bw = 240 * scale;
          const bh = 320 * scale;
          const br = bw / 2; // Exact 100% semicircular top & bottom capsule!
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(x, y, bw, bh, br);
          } else {
            ctx.arc(x + br, y + br, br, Math.PI, 0);
            ctx.arc(x + br, y + bh - br, br, 0, Math.PI);
            ctx.closePath();
          }
          ctx.fillStyle = menuBadgeBg;
          ctx.fill();

          ctx.translate(x + 50 * scale, y + 80 * scale);
          ctx.scale(scale * 3.2, scale * 3.2);
          ctx.fillStyle = logoColor;
          ctx.fill(pNavbar1);
          ctx.fill(pNavbar2);
        } else if (logoVariant === 'full') {
          ctx.translate(x, y);
          ctx.scale(scale, scale);
          ctx.fillStyle = logoColor;
          ctx.translate(60, 60);
          ctx.fill(pFull1);
          ctx.fill(pFull2);
        } else {
          ctx.translate(x, y);
          ctx.scale(scale, scale);
          ctx.fillStyle = logoColor;
          ctx.fill(pNavbar1);
          ctx.fill(pNavbar2);
        }

        ctx.restore();
      };

      const drawText = (x: number, y: number, fontSize: number, align: CanvasTextAlign = 'center') => {
        ctx.save();
        ctx.font = `${fontSize}px Rosnoc, sans-serif`;
        ctx.fillStyle = textColor;
        ctx.textAlign = align;
        ctx.textBaseline = 'middle';
        ctx.fillText(displayText, x, y);
        ctx.restore();
      };

      const finalScale = scaleFactor;

      if (target === 'logo-only') {
        if (logoVariant === 'menu') {
          drawLogo(width / 2 - (240 * 2.2 * finalScale) / 2, height / 2 - (320 * 2.2 * finalScale) / 2, 2.2 * finalScale);
        } else if (logoVariant === 'full') {
          drawLogo(width / 2 - (495 * 1.8 * finalScale) / 2, height / 2 - (682 * 1.8 * finalScale) / 2, 1.8 * finalScale);
        } else {
          drawLogo(width / 2 - (43 * 11 * finalScale) / 2, height / 2 - (65 * 11 * finalScale) / 2, 11 * finalScale);
        }
      } else if (target === 'text-only') {
        drawText(width / 2, height / 2, Math.round(300 * finalScale), 'center');
      } else {
        // Combo
        if (layout === 'col') {
          if (logoVariant === 'menu') {
            drawLogo(width / 2 - (240 * 1.6 * finalScale) / 2, 140 * finalScale, 1.6 * finalScale);
          } else if (logoVariant === 'full') {
            drawLogo(width / 2 - (495 * 1.1 * finalScale) / 2, 180 * finalScale, 1.1 * finalScale);
          } else {
            drawLogo(width / 2 - (43 * 6.5 * finalScale) / 2, 220 * finalScale, 6.5 * finalScale);
          }
          drawText(width / 2, height - 380 * finalScale, Math.round(260 * finalScale), 'center');
        } else {
          // Row
          const fontPx = Math.round(280 * finalScale);
          ctx.font = `${fontPx}px Rosnoc, sans-serif`;
          const textMetrics = ctx.measureText(displayText);
          const textW = textMetrics.width;

          const logoW = logoVariant === 'menu' ? 240 * 1.5 * finalScale : logoVariant === 'full' ? 495 * 1.1 * finalScale : 43 * 7.5 * finalScale;
          const logoH = logoVariant === 'menu' ? 320 * 1.5 * finalScale : logoVariant === 'full' ? 682 * 1.1 * finalScale : 65 * 7.5 * finalScale;
          const gap = 160 * finalScale;
          const totalW = logoW + gap + textW;
          const startX = (width - totalW) / 2;

          drawLogo(startX, (height - logoH) / 2, logoVariant === 'menu' ? 1.5 * finalScale : logoVariant === 'full' ? 1.1 * finalScale : 7.5 * finalScale);
          drawText(startX + logoW + gap, height / 2, fontPx, 'left');
        }
      }

      const mimeType = format === 'webp' ? 'image/webp' : 'image/png';
      const dataUrl = canvas.toDataURL(mimeType, 1.0); // Maximum 100% losslessness
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `sherifiq-${target}-${quality.toUpperCase()}${transparentBg ? '-transparent' : ''}.${format}`;
      a.click();
      showToast(`Downloaded ${target} as Ultra-Crisp ${quality.toUpperCase()} .${format.toUpperCase()}!`);
      setShowDownloadModal(false);
    } catch (err) {
      console.error('Export error:', err);
      showToast('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Dynamic header and panel styles
  const headerBgClass = isBgLight
    ? 'bg-neutral-900/10 border-neutral-900/15 text-neutral-900'
    : 'bg-white/10 border-white/20 text-white';

  const controlPanelClass = isBgLight
    ? 'bg-white/90 text-neutral-900 border-neutral-200/80 shadow-2xl backdrop-blur-xl'
    : 'bg-neutral-900/90 text-white border-white/15 shadow-2xl backdrop-blur-xl';

  const buttonClass = isBgLight
    ? 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 text-neutral-800'
    : 'bg-white/10 hover:bg-white/20 border-white/20 text-white';

  const activeBtnClass = isBgLight
    ? 'bg-neutral-900 text-white border-neutral-900'
    : 'bg-white text-neutral-900 border-white font-semibold';

  return (
    <div
      className={`relative w-screen h-screen min-h-screen flex flex-col justify-between p-4 sm:p-8 select-none overflow-hidden font-sans transition-colors duration-500 ${
        isTransparent
          ? 'bg-[linear-gradient(45deg,#1f1f23_25%,transparent_25%),linear-gradient(-45deg,#1f1f23_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1f1f23_75%),linear-gradient(-45deg,transparent_75%,#1f1f23_75%)] bg-[size:24px_24px] bg-[position:0_0,0_12px,12px_-12px,-12px_0px] bg-[#141417]'
          : ''
      }`}
      style={{ backgroundColor: isTransparent ? undefined : bgColor }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-neutral-950 text-white text-xs sm:text-sm font-medium shadow-2xl border border-neutral-800 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Navigation */}
      <header className="relative z-30 flex items-center justify-between w-full max-w-7xl mx-auto gap-3 flex-wrap">
        <a
          href="/"
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border text-xs sm:text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer ${headerBgClass}`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Home
        </a>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Quick Download Buttons */}
          <button
            onClick={() => handleDownloadAsset('text-only', 'png', true, '4k')}
            className="px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer shadow-md flex items-center gap-1.5 border border-emerald-400"
            title="Download Text as Ultra 4K Transparent PNG"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Text 4K PNG
          </button>

          <button
            onClick={() => handleDownloadAsset('text-only', 'webp', true, '4k')}
            className="px-3.5 py-2 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-all duration-300 active:scale-95 cursor-pointer shadow-md flex items-center gap-1.5 border border-teal-400"
            title="Download Text as Ultra 4K Transparent WEBP"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Text 4K WEBP
          </button>

          <button
            onClick={() => setShowDownloadModal(true)}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 cursor-pointer shadow-lg flex items-center gap-2 border border-blue-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Options
          </button>

          <button
            onClick={() => setShowControls(!showControls)}
            className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 ${headerBgClass}`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h97.5M10.5 6a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 6h97.5M10.5 12a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 6h97.5M10.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            {showControls ? 'Hide Panel' : 'Customizer'}
          </button>
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-6">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center w-full"
        >
          {layout === 'row' && (
            <div className="flex flex-row items-center justify-center gap-6 sm:gap-10 md:gap-14 flex-wrap">
              {(logoVariant === 'menu' || logoVariant === 'all') && (
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-[72px] h-[100px] sm:w-[96px] sm:h-[132px] md:w-[124px] md:h-[170px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300"
                    style={{ backgroundColor: menuBadgeBg }}
                  >
                    <BrandLogo
                      variant="navbar"
                      fill={logoColor}
                      className="w-10 h-16 sm:w-14 sm:h-22 md:w-18 md:h-28 transition-all duration-300"
                    />
                  </div>
                  {logoVariant === 'all' && (
                    <span
                      className="text-[11px] font-mono tracking-wider opacity-60 uppercase"
                      style={{ color: logoColor }}
                    >
                      Menu Pill Badge
                    </span>
                  )}
                </div>
              )}

              {(logoVariant === 'navbar' || logoVariant === 'all') && (
                <div className="flex flex-col items-center gap-2">
                  <BrandLogo
                    variant="navbar"
                    fill={logoColor}
                    className="w-24 h-36 sm:w-32 sm:h-48 md:w-44 md:h-64 lg:w-48 lg:h-72 transition-all duration-300 drop-shadow-md"
                  />
                  {logoVariant === 'all' && (
                    <span
                      className="text-[11px] font-mono tracking-wider opacity-60 uppercase"
                      style={{ color: logoColor }}
                    >
                      Navbar Symbol (43×65)
                    </span>
                  )}
                </div>
              )}

              {(logoVariant === 'full' || logoVariant === 'all') && (
                <div className="flex flex-col items-center gap-2">
                  <BrandLogo
                    variant="full"
                    fill={logoColor}
                    className="w-24 h-36 sm:w-32 sm:h-48 md:w-44 md:h-64 lg:w-48 lg:h-72 transition-all duration-300 drop-shadow-md"
                  />
                  {logoVariant === 'all' && (
                    <span
                      className="text-[11px] font-mono tracking-wider opacity-60 uppercase"
                      style={{ color: logoColor }}
                    >
                      Full Logo.svg (495×682)
                    </span>
                  )}
                </div>
              )}

              <h1
                className="font-rosnoc text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-none tracking-[0.04em] select-none transition-colors duration-300 drop-shadow-sm"
                style={{ color: textColor }}
              >
                {textCase === 'title' ? 'Sherifiq' : 'SHERIFIQ'}
              </h1>
            </div>
          )}

          {layout === 'col' && (
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
              <div className="flex items-center justify-center gap-8">
                {(logoVariant === 'menu' || logoVariant === 'all') && (
                  <div
                    className="w-[60px] h-[84px] sm:w-[80px] sm:h-[110px] md:w-[100px] md:h-[138px] rounded-full flex items-center justify-center shadow-xl transition-all duration-300"
                    style={{ backgroundColor: menuBadgeBg }}
                  >
                    <BrandLogo
                      variant="navbar"
                      fill={logoColor}
                      className="w-8 h-12 sm:w-11 sm:h-18 md:w-14 md:h-22 transition-all duration-300"
                    />
                  </div>
                )}
                {(logoVariant === 'navbar' || logoVariant === 'all') && (
                  <BrandLogo
                    variant="navbar"
                    fill={logoColor}
                    className="w-16 h-24 sm:w-24 sm:h-36 md:w-32 md:h-48 transition-all duration-300 drop-shadow-md"
                  />
                )}
                {(logoVariant === 'full' || logoVariant === 'all') && (
                  <BrandLogo
                    variant="full"
                    fill={logoColor}
                    className="w-16 h-24 sm:w-24 sm:h-36 md:w-32 md:h-48 transition-all duration-300 drop-shadow-md"
                  />
                )}
              </div>
              <h1
                className="font-rosnoc text-6xl sm:text-7xl md:text-8xl lg:text-[120px] leading-none tracking-[0.04em] select-none transition-colors duration-300 text-center drop-shadow-sm"
                style={{ color: textColor }}
              >
                {textCase === 'title' ? 'Sherifiq' : 'SHERIFIQ'}
              </h1>
            </div>
          )}

          {layout === 'logo-only' && (
            <div className="flex items-center justify-center gap-12 flex-wrap">
              {(logoVariant === 'menu' || logoVariant === 'all') && (
                <div className="flex flex-col items-center gap-3">
                  <div
                    className="w-[110px] h-[150px] sm:w-[140px] sm:h-[190px] md:w-[170px] md:h-[230px] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300"
                    style={{ backgroundColor: menuBadgeBg }}
                  >
                    <BrandLogo
                      variant="navbar"
                      fill={logoColor}
                      className="w-14 h-22 sm:w-18 sm:h-28 md:w-22 md:h-36 transition-all duration-300"
                    />
                  </div>
                  <span
                    className="text-xs font-mono tracking-wider opacity-60 uppercase"
                    style={{ color: logoColor }}
                  >
                    Menu Navigation Pill Badge
                  </span>
                </div>
              )}
              {(logoVariant === 'navbar' || logoVariant === 'all') && (
                <div className="flex flex-col items-center gap-3">
                  <BrandLogo
                    variant="navbar"
                    fill={logoColor}
                    className="w-32 h-48 sm:w-44 sm:h-64 md:w-56 md:h-80 transition-all duration-300 drop-shadow-xl"
                  />
                  <span
                    className="text-xs font-mono tracking-wider opacity-60 uppercase"
                    style={{ color: logoColor }}
                  >
                    Navbar Icon (navbar-logo.svg)
                  </span>
                </div>
              )}
              {(logoVariant === 'full' || logoVariant === 'all') && (
                <div className="flex flex-col items-center gap-3">
                  <BrandLogo
                    variant="full"
                    fill={logoColor}
                    className="w-32 h-48 sm:w-44 sm:h-64 md:w-56 md:h-80 transition-all duration-300 drop-shadow-xl"
                  />
                  <span
                    className="text-xs font-mono tracking-wider opacity-60 uppercase"
                    style={{ color: logoColor }}
                  >
                    Full Emblem (logo.svg)
                  </span>
                </div>
              )}
            </div>
          )}

          {layout === 'text-only' && (
            <h1
              className="font-rosnoc text-7xl sm:text-8xl md:text-9xl lg:text-[160px] leading-none tracking-[0.04em] select-none transition-colors duration-300 text-center drop-shadow-sm"
              style={{ color: textColor }}
            >
              {textCase === 'title' ? 'Sherifiq' : 'SHERIFIQ'}
            </h1>
          )}
        </motion.div>
      </main>

      {/* Floating Comprehensive Customizer Bar / Drawer */}
      <AnimatePresence>
        {showControls && (
          <motion.aside
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className={`relative z-30 w-full max-w-6xl mx-auto rounded-3xl p-4 sm:p-6 mb-2 border ${controlPanelClass}`}
          >
            {/* Control Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              {/* 1. Theme Presets */}
              <div className="flex flex-col gap-2.5">
                <span className="font-semibold uppercase tracking-wider text-[11px] opacity-75">
                  Theme Presets
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESET_THEMES.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => applyPreset(preset)}
                      className="group flex items-center gap-2 p-1.5 rounded-xl border border-neutral-500/20 hover:border-blue-500 transition-all cursor-pointer text-left"
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-black/20 shrink-0 relative overflow-hidden"
                        style={{ backgroundColor: preset.bgColor }}
                      >
                        <div
                          className="absolute right-0 top-0 w-2 h-4"
                          style={{ backgroundColor: preset.logoColor }}
                        />
                      </div>
                      <span className="truncate font-medium text-[11px]">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Background & Invisible Option */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold uppercase tracking-wider text-[11px] opacity-75">
                    Background Color
                  </span>
                  <button
                    onClick={() => copyHex(bgColor, 'Background')}
                    className="text-[10px] font-mono hover:underline opacity-80"
                  >
                    {isTransparent ? 'Transparent (None)' : bgColor}
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  {/* Invisible / Transparent Button */}
                  <button
                    onClick={() => {
                      setBgColor('transparent');
                      showToast('Set Transparent (Invisible) Background');
                    }}
                    className={`w-8 h-8 rounded-full border shrink-0 transition-transform cursor-pointer relative overflow-hidden flex items-center justify-center ${
                      isTransparent ? 'scale-110 ring-2 ring-blue-500 border-white' : 'border-neutral-400/40 hover:scale-105'
                    }`}
                    title="Transparent / Invisible Background"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,#404040_25%,transparent_25%),linear-gradient(-45deg,#404040_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#404040_75%),linear-gradient(-45deg,transparent_75%,#404040_75%)] bg-[size:8px_8px] bg-[#18181b]" />
                  </button>

                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-400 shrink-0 cursor-pointer shadow-sm">
                    <input
                      type="color"
                      value={!isTransparent && bgColor.startsWith('#') ? bgColor : '#5b72ff'}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer border-0 p-0"
                    />
                  </div>

                  <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-full">
                    {SWATCHES.map((hex) => (
                      <button
                        key={`bg-${hex}`}
                        onClick={() => setBgColor(hex)}
                        style={{ backgroundColor: hex }}
                        className={`w-6 h-6 rounded-full border shrink-0 transition-transform cursor-pointer ${
                          bgColor === hex ? 'scale-110 ring-2 ring-blue-500 border-white' : 'border-neutral-400/40 hover:scale-105'
                        }`}
                        title={hex}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={syncColors}
                      onChange={(e) => setSyncColors(e.target.checked)}
                      className="rounded border-neutral-400 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    />
                    <span className="text-[11px] font-medium opacity-90">
                      Link Logo & Text Color
                    </span>
                  </label>
                </div>
              </div>

              {/* 3. Logo, Menu Badge & Text Colors */}
              <div className="flex flex-col gap-3">
                {/* Logo Icon Color */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold uppercase tracking-wider text-[11px] opacity-75">
                      Logo Icon Color
                    </span>
                    <button
                      onClick={() => copyHex(logoColor, 'Logo Icon')}
                      className="text-[10px] font-mono hover:underline opacity-80"
                    >
                      {logoColor}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-neutral-400 shrink-0 cursor-pointer shadow-sm">
                      <input
                        type="color"
                        value={logoColor.startsWith('#') ? logoColor : '#ffffff'}
                        onChange={(e) => handleLogoColorChange(e.target.value)}
                        className="absolute -top-2 -left-2 w-11 h-11 cursor-pointer border-0 p-0"
                      />
                    </div>
                    <div className="flex items-center gap-1 overflow-x-auto max-w-full">
                      {SWATCHES.map((hex) => (
                        <button
                          key={`logo-${hex}`}
                          onClick={() => handleLogoColorChange(hex)}
                          style={{ backgroundColor: hex }}
                          className={`w-5 h-5 rounded-full border shrink-0 transition-transform cursor-pointer ${
                            logoColor === hex ? 'scale-110 ring-2 ring-blue-500 border-white' : 'border-neutral-400/40'
                          }`}
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Menu Badge Pill Background Color */}
                {logoVariant === 'menu' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold uppercase tracking-wider text-[11px] opacity-75">
                        Menu Badge Pill BG
                      </span>
                      <button
                        onClick={() => copyHex(menuBadgeBg, 'Menu Pill Badge')}
                        className="text-[10px] font-mono hover:underline opacity-80"
                      >
                        {menuBadgeBg}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-neutral-400 shrink-0 cursor-pointer shadow-sm">
                        <input
                          type="color"
                          value={menuBadgeBg.startsWith('#') ? menuBadgeBg : '#5b72ff'}
                          onChange={(e) => setMenuBadgeBg(e.target.value)}
                          className="absolute -top-2 -left-2 w-11 h-11 cursor-pointer border-0 p-0"
                        />
                      </div>
                      <div className="flex items-center gap-1 overflow-x-auto max-w-full">
                        {SWATCHES.map((hex) => (
                          <button
                            key={`badge-${hex}`}
                            onClick={() => setMenuBadgeBg(hex)}
                            style={{ backgroundColor: hex }}
                            className={`w-5 h-5 rounded-full border shrink-0 transition-transform cursor-pointer ${
                              menuBadgeBg === hex ? 'scale-110 ring-2 ring-blue-500 border-white' : 'border-neutral-400/40'
                            }`}
                            title={hex}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Text Color */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold uppercase tracking-wider text-[11px] opacity-75">
                      Text Color
                    </span>
                    <button
                      onClick={() => copyHex(textColor, 'Text')}
                      className="text-[10px] font-mono hover:underline opacity-80"
                    >
                      {textColor}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-7 h-7 rounded-full overflow-hidden border border-neutral-400 shrink-0 cursor-pointer shadow-sm">
                      <input
                        type="color"
                        value={textColor.startsWith('#') ? textColor : '#ffffff'}
                        onChange={(e) => handleTextColorChange(e.target.value)}
                        className="absolute -top-2 -left-2 w-11 h-11 cursor-pointer border-0 p-0"
                      />
                    </div>
                    <div className="flex items-center gap-1 overflow-x-auto max-w-full">
                      {SWATCHES.map((hex) => (
                        <button
                          key={`text-${hex}`}
                          onClick={() => handleTextColorChange(hex)}
                          style={{ backgroundColor: hex }}
                          className={`w-5 h-5 rounded-full border shrink-0 transition-transform cursor-pointer ${
                            textColor === hex ? 'scale-110 ring-2 ring-blue-500 border-white' : 'border-neutral-400/40'
                          }`}
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 4. Logo Type, Layout & Font Case */}
              <div className="flex flex-col gap-3">
                {/* Logo Type */}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold uppercase tracking-wider text-[11px] opacity-75">
                    Logo Variant
                  </span>
                  <div className="grid grid-cols-4 gap-1">
                    {(
                      [
                        { id: 'menu', label: 'Menu Badge' },
                        { id: 'navbar', label: 'Navbar' },
                        { id: 'full', label: 'Full SVG' },
                        { id: 'all', label: 'All Logos' },
                      ] as { id: LogoSelection; label: string }[]
                    ).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setLogoVariant(item.id)}
                        className={`py-1.5 px-1 text-center rounded-xl text-[10px] font-medium border transition-all cursor-pointer ${
                          logoVariant === item.id ? activeBtnClass : buttonClass
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Layout Mode */}
                <div className="flex flex-col gap-1">
                  <span className="font-semibold uppercase tracking-wider text-[11px] opacity-75">
                    Display Layout
                  </span>
                  <div className="grid grid-cols-4 gap-1">
                    {(
                      [
                        { id: 'row', label: 'Row' },
                        { id: 'col', label: 'Column' },
                        { id: 'logo-only', label: 'Logo Only' },
                        { id: 'text-only', label: 'Text Only' },
                      ] as { id: LayoutOption; label: string }[]
                    ).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setLayout(item.id)}
                        className={`py-1.5 px-1 text-center rounded-xl text-[10px] sm:text-[11px] font-medium border transition-all cursor-pointer ${
                          layout === item.id ? activeBtnClass : buttonClass
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Case */}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-semibold uppercase tracking-wider text-[11px] opacity-75">
                    Font Case
                  </span>
                  <button
                    onClick={() => setTextCase(textCase === 'title' ? 'upper' : 'title')}
                    className={`py-1 px-3 rounded-full text-[11px] font-medium border transition-all cursor-pointer ${buttonClass}`}
                  >
                    {textCase === 'title' ? 'Title Case (Sherifiq)' : 'UPPERCASE (SHERIFIQ)'}
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Download Modal */}
      <AnimatePresence>
        {showDownloadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setShowDownloadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-neutral-900 border border-neutral-800 text-white p-6 sm:p-8 rounded-3xl max-w-md w-full shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors cursor-pointer p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Export High-Quality Asset
              </h2>
              <p className="text-xs text-neutral-400 mb-6">
                Select target asset, resolution quality, format, and background preference.
              </p>

              <div className="flex flex-col gap-5 text-xs">
                {/* Target Selection */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Select Asset Target
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'text-only', label: 'Text Only', desc: 'Sherifiq Typography' },
                      { id: 'logo-only', label: 'Logo Only', desc: `${logoVariant === 'menu' ? 'Menu Badge' : 'Symbol Badge'}` },
                      { id: 'all', label: 'Logo + Text', desc: 'Full Combo' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setExportTarget(item.id as ExportTarget)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col gap-1 ${
                          exportTarget === item.id
                            ? 'bg-blue-600/20 border-blue-500 text-white font-medium shadow-md'
                            : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        <span className="font-semibold text-xs">{item.label}</span>
                        <span className="text-[10px] text-neutral-400">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resolution / Quality Selection */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Resolution Quality
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: '4k', label: '4K Ultra HD', desc: 'Razor Sharp (Default)' },
                      { id: '8k', label: '8K Super-Res', desc: 'Maximum Vector Quality' },
                      { id: '2k', label: '2K Standard', desc: 'Standard Web HD' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setExportQuality(item.id as ExportQuality)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                          exportQuality === item.id
                            ? 'bg-blue-600 border-blue-500 text-white font-semibold shadow-md'
                            : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        <span className="text-xs font-bold">{item.label}</span>
                        <span className="text-[10px] opacity-75">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Selection */}
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Select File Format
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'png', label: 'PNG Image', ext: '.png (High Res)' },
                      { id: 'webp', label: 'WEBP Image', ext: '.webp (Lossless)' },
                      { id: 'svg', label: 'SVG Vector', ext: '.svg (Infinite Scale)' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setExportFormat(item.id as ExportFormat)}
                        className={`p-2.5 rounded-xl border text-center font-medium transition-all cursor-pointer ${
                          exportFormat === item.id
                            ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                            : 'bg-neutral-800/60 border-neutral-700/60 text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        <span className="block text-xs font-semibold">{item.label}</span>
                        <span className="block text-[10px] opacity-75">{item.ext}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background Transparency */}
                <div className="p-3.5 rounded-2xl bg-neutral-800/40 border border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="block font-semibold text-neutral-200">Transparent Background</span>
                    <span className="block text-[10px] text-neutral-400">
                      Remove background fill (Invisible / Alpha channel)
                    </span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exportTransparentBg}
                      onChange={(e) => setExportTransparentBg(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setShowDownloadModal(false)}
                    className="flex-1 py-3 rounded-2xl border border-neutral-700 text-neutral-300 font-medium hover:bg-neutral-800 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={isExporting}
                    onClick={() => handleDownloadAsset()}
                    className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 border border-blue-400 disabled:opacity-50"
                  >
                    {isExporting ? (
                      <span>Generating Ultra-HD...</span>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <span>Download {exportQuality.toUpperCase()} .{exportFormat.toUpperCase()}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Spec Bar */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-3 w-full max-w-7xl mx-auto text-[11px] font-medium opacity-80 pt-2">
        <div className="flex items-center gap-2">
          <span>Brand Identity Showcase &bull; SHERIFIQ</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-[10px] sm:text-[11px] flex-wrap justify-center">
          <span className="cursor-pointer hover:underline" onClick={() => copyHex(isTransparent ? 'Transparent' : bgColor, 'BG')}>
            BG: {isTransparent ? 'Transparent' : bgColor}
          </span>
          <span className="cursor-pointer hover:underline" onClick={() => copyHex(logoColor, 'Logo')}>
            Logo: {logoColor}
          </span>
          <span className="cursor-pointer hover:underline" onClick={() => copyHex(menuBadgeBg, 'Menu Badge BG')}>
            Badge BG: {menuBadgeBg}
          </span>
          <span className="cursor-pointer hover:underline" onClick={() => copyHex(textColor, 'Text')}>
            Text: {textColor}
          </span>
          <span>Font: Rosnoc</span>
          <span>Variant: {logoVariant}</span>
        </div>
      </footer>
    </div>
  );
}
