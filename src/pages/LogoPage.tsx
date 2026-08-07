import { useState } from 'react';
import { motion } from 'framer-motion';
import BrandLogo from '../components/ui/BrandLogo';

export default function LogoPage() {
  const [copied, setCopied] = useState(false);
  const [textCase, setTextCase] = useState<'title' | 'upper'>('title');
  const [layout, setLayout] = useState<'row' | 'col'>('row');

  const handleCopyColor = () => {
    navigator.clipboard.writeText('#5b72ff');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-screen h-screen min-h-screen bg-[#5b72ff] text-white flex flex-col justify-between p-6 sm:p-10 select-none overflow-hidden font-sans">
      {/* Top Header / Navigation */}
      <header className="relative z-20 flex items-center justify-between w-full max-w-7xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-sm font-medium transition-all duration-300 active:scale-95 cursor-pointer"
        >
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Home
        </a>

        {/* Brand Utility Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setTextCase(textCase === 'title' ? 'upper' : 'title')}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer"
          >
            Font Case: {textCase === 'title' ? 'Title Case (Sherifiq)' : 'UPPERCASE (SHERIFIQ)'}
          </button>
          <button
            onClick={() => setLayout(layout === 'row' ? 'col' : 'row')}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer"
          >
            Layout: {layout === 'row' ? 'Row' : 'Column'}
          </button>
          <button
            onClick={handleCopyColor}
            className="px-4 py-2 rounded-full bg-white text-[#5b72ff] hover:bg-neutral-100 text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
          >
            {copied ? 'Color Copied!' : 'Copy Hex (#5b72ff)'}
          </button>
        </div>
      </header>

      {/* Main Center Logo Presentation (Matches Image) */}
      <main className="relative z-10 flex-1 flex items-center justify-center w-full max-w-6xl mx-auto px-4">
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-center justify-center ${
            layout === 'row'
              ? 'flex-row gap-6 sm:gap-10 md:gap-14'
              : 'flex-col gap-4 sm:gap-6 md:gap-8'
          }`}
        >
          {/* White Brand Logo Icon */}
          <motion.div layout className="shrink-0 flex items-center justify-center">
            <BrandLogo
              className={`text-white transition-all duration-300 ${
                layout === 'row'
                  ? 'w-24 h-36 sm:w-32 sm:h-48 md:w-44 md:h-64 lg:w-52 lg:h-76'
                  : 'w-16 h-24 sm:w-24 sm:h-36 md:w-32 md:h-48 lg:w-36 lg:h-54'
              }`}
              fill="#ffffff"
              useGradient={false}
            />
          </motion.div>

          {/* White Sherifiq Typography in Rosnoc Font */}
          <motion.div layout className="flex items-center text-center">
            <h1 className="font-rosnoc text-6xl sm:text-7xl md:text-8xl lg:text-[130px] leading-none text-white tracking-[0.04em] select-none">
              {textCase === 'title' ? 'Sherifiq' : 'SHERIFIQ'}
            </h1>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer Spec Bar */}
      <footer className="relative z-20 flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-7xl mx-auto text-xs font-light text-white/70">
        <div>
          <span>Brand Identity Showcase &bull; SHERIFIQ</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Primary: #5b72ff</span>
          <span>Accent: #ffffff</span>
          <span>Font: Rosnoc</span>
        </div>
      </footer>
    </div>
  );
}
