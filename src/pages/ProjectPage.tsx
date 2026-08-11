import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import BrandLogo from '../components/ui/BrandLogo';
import StaggeredMenu from '../components/navigator/staggered-menu/StaggeredMenu';
import Footer from '../components/navigator/footer/Footer';

export interface ProjectArchiveItem {
  id: number;
  title: string;
  year: string;
  industry: string;
  category: string;
  image: string;
  link: string;
}

export const projectArchiveData: ProjectArchiveItem[] = [
  {
    id: 1,
    title: 'Lumiere',
    year: '2026',
    industry: 'E-Commerce',
    category: 'Website',
    image: '/assets/projects/lumiere.webp',
    link: 'https://lumiere-sherifiq.vercel.app',
  },
  {
    id: 2,
    title: 'Forma',
    year: '2026',
    industry: 'Interior Design',
    category: 'Website',
    image: '/assets/projects/forma.webp',
    link: 'https://interior-design-sherifiq.vercel.app',
  },
  {
    id: 3,
    title: 'Helix AI',
    year: '2025',
    industry: 'IT',
    category: 'Website',
    image: '/assets/projects/helix.webp',
    link: 'https://helix-ai.ascodelabs.com',
  },
  {
    id: 4,
    title: 'S H Health Centre',
    year: '2026',
    industry: 'Healthcare',
    category: 'Website',
    image: '/assets/projects/s-h-health-center.webp',
    link: 'https://shhealthcentre.com',
  },
  {
    id: 5,
    title: 'AMS Platform',
    year: '2026',
    industry: 'Enterprise',
    category: 'SaaS',
    image: '/assets/projects/ams.webp',
    link: 'https://attendance-fixed-frontend.vercel.app',
  },
  {
    id: 6,
    title: 'Personal Portfolio v2',
    year: '2026',
    industry: 'Personal',
    category: 'Website',
    image: '/assets/projects/portfolio.webp',
    link: 'https://rafiqsheriff-portfolio.vercel.app',
  },
  {
    id: 7,
    title: 'Personal Portfolio',
    year: '2025',
    industry: 'Personal',
    category: 'Website',
    image: '/assets/projects/personal-portfolio-2.webp',
    link: 'https://rafiq-sheriff-portfolio.vercel.app',
  },
  {
    id: 8,
    title: 'Habit Trace',
    year: '2026',
    industry: 'Productivity',
    category: 'Web Application',
    image: '/assets/projects/habit-trace.webp',
    link: 'https://habit-trace.vercel.app',
  },
  {
    id: 9,
    title: 'AS Codelabs',
    year: '2026',
    industry: 'IT',
    category: 'Website',
    image: '/assets/projects/a-s-codelabs.webp',
    link: 'https://ascodelabs.com',
  },
  {
    id: 10,
    title: 'Analytics Avenue',
    year: '2026',
    industry: 'EdTech',
    category: 'Website',
    image: '/assets/projects/analytics-avenue.webp',
    link: 'https://analyticsavenue.in',
  },
];

const FILTER_CATEGORIES = [
  'All',
  'E-Commerce',
  'Portfolio',
  'Healthcare',
  'IT',
  'Web Application',
  'SaaS',
  'Interior Design',
  'EdTech',
];

// Exact category matcher function to prevent false substring matches (e.g., 'it' inside 'website')
function isProjectMatch(item: ProjectArchiveItem, filter: string): boolean {
  if (filter === 'All') return true;
  const f = filter.toLowerCase();
  const titleLower = item.title.toLowerCase();
  const industryLower = item.industry.toLowerCase();
  const categoryLower = item.category.toLowerCase();

  if (f === 'portfolio') {
    return (
      titleLower.includes('portfolio') ||
      industryLower === 'personal' ||
      categoryLower.includes('portfolio')
    );
  }

  if (f === 'it') {
    return industryLower === 'it' || categoryLower === 'it';
  }

  if (f === 'saas') {
    return categoryLower === 'saas' || industryLower === 'enterprise' || industryLower === 'saas';
  }

  if (f === 'edtech') {
    return industryLower === 'edtech' || categoryLower === 'edtech';
  }

  if (f === 'interior design') {
    return industryLower === 'interior design' || categoryLower === 'interior design';
  }

  if (f === 'e-commerce') {
    return industryLower === 'e-commerce' || categoryLower === 'e-commerce';
  }

  if (f === 'healthcare') {
    return industryLower === 'healthcare' || categoryLower === 'healthcare';
  }

  if (f === 'web application') {
    return categoryLower === 'web application' || industryLower === 'productivity';
  }

  return (
    industryLower === f ||
    categoryLower === f ||
    titleLower.includes(f)
  );
}

/* ── Custom Professional Dropdown Filter Component ── */
function ProjectFilterDropdown({
  categories,
  selectedFilter,
  onSelectFilter,
  projectCounts,
}: {
  categories: string[];
  selectedFilter: string;
  onSelectFilter: (category: string) => void;
  projectCounts: Record<string, number>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group inline-flex items-center justify-between gap-3 px-5 py-3 bg-white border border-neutral-200/90 hover:border-neutral-400 rounded-2xl font-medium text-sm sm:text-base text-[#181538] shadow-sm hover:shadow-md transition-all duration-300 active:scale-98 cursor-pointer min-w-[220px]"
      >
        <div className="flex items-center gap-2.5">
          {/* Sliders / Filter Funnel Icon */}
          <span className="w-8 h-8 rounded-xl bg-[#5b72ff]/10 group-hover:bg-[#5b72ff]/20 flex items-center justify-center transition-colors">
            <svg
              className="w-4 h-4 text-[#5b72ff]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </span>
          <div className="flex flex-col text-left">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold leading-none mb-0.5">
              Filter Category
            </span>
            <span className="font-semibold text-neutral-900 text-sm leading-tight">
              {selectedFilter === 'All' ? 'All Projects' : selectedFilter}
            </span>
          </div>
        </div>

        <span className="flex items-center gap-2 ml-1">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-100 text-[#181538]">
            {projectCounts[selectedFilter] ?? 0}
          </span>
          {/* Chevron Icon */}
          <svg
            className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${
              isOpen ? 'rotate-180 text-[#5b72ff]' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {/* Popover Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-72 max-h-[480px] overflow-y-auto bg-white rounded-2xl border border-neutral-200/90 shadow-2xl shadow-indigo-950/20 p-2 z-[100] no-scrollbar"
          >
            <div className="px-3 py-2 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase border-b border-neutral-100 mb-1 flex items-center justify-between">
              <span>Categories</span>
              <span>{categories.length - 1} Filters</span>
            </div>

            <div className="space-y-0.5 py-1">
              {categories.map((category) => {
                const isSelected = selectedFilter === category;
                const count = projectCounts[category] ?? 0;

                return (
                  <button
                    key={category}
                    onClick={() => {
                      onSelectFilter(category);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#181538] text-white shadow-sm'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-black'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 truncate">
                      {isSelected ? (
                        <svg
                          className="w-4 h-4 text-[#5b72ff] shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 shrink-0" />
                      )}
                      <span className="truncate">{category === 'All' ? 'All Projects' : category}</span>
                    </span>

                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold shrink-0 ml-2 ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-100 text-neutral-500 border border-neutral-200/60'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Project Card Row - Mobile order: Title -> Image -> Line -> Badges -> Button */
function ProjectArchiveRow({ item }: { item: ProjectArchiveItem }) {
  const rowRef = useRef<HTMLDivElement | null>(null);

  // Parallax scroll effect target per row
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  // Up and down scroll motion for image inside container
  const imageY = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);

  return (
    <div
      ref={rowRef}
      className="relative w-full bg-white rounded-[28px] sm:rounded-[36px] border border-neutral-200/80 p-6 sm:p-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 sm:gap-8 overflow-hidden transform-gpu shadow-sm text-center lg:text-left z-10"
    >
      {/* ── Mobile Layout Container (title -> image -> horizontal line -> badge -> button) ── */}
      <div className="flex flex-col lg:hidden w-full items-center">
        {/* 1. Title */}
        <h3 className="font-sora font-bold text-3xl sm:text-4xl leading-tight text-[#181538] tracking-tight mb-4 text-center">
          {item.title}
        </h3>

        {/* 2. Image */}
        <div className="relative w-full h-[260px] sm:h-[320px] rounded-[20px] sm:rounded-[26px] overflow-hidden bg-neutral-100 border border-neutral-200/80 shrink-0 transform-gpu my-2">
          <motion.img
            style={{ y: imageY, scale: 1.2 }}
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* 3. Horizontal Line */}
        <div className="w-full border-t border-neutral-100 my-4" />

        {/* 4. Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
          <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
            {item.year}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
            {item.industry}
          </span>
          <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
            {item.category}
          </span>
        </div>

        {/* 5. Button */}
        <div className="flex justify-center w-full pt-1">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center justify-between gap-4 border border-[#181538]/20 bg-[#181538] text-white hover:bg-[#5b72ff] transition-all duration-300 pl-6 pr-2 py-2 rounded-full font-medium text-sm sm:text-base active:scale-95 cursor-pointer shadow-md w-fit mx-auto"
          >
            <span className="font-sans font-medium tracking-tight text-white">
              View Project
            </span>
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#181538] shrink-0 group-hover/btn:bg-white transition-colors duration-200 shadow-sm overflow-hidden">
              <BrandLogo
                className="h-3.5 w-auto text-[#181538] transition-transform duration-500 ease-out group-hover/btn:rotate-45"
                fill="#181538"
                useGradient={false}
              />
            </span>
          </a>
        </div>
      </div>

      {/* ── Desktop Layout Container (Left Column + Right Column) ── */}
      <div className="hidden lg:flex flex-col justify-between flex-1 py-1 min-h-[260px] text-left">
        <div>
          <h3 className="font-sora font-bold text-4xl lg:text-[46px] leading-tight text-[#181538] tracking-tight mb-3">
            {item.title}
          </h3>

          <div className="w-full border-t border-neutral-100 my-4" />

          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
              {item.year}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
              {item.industry}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs sm:text-sm font-medium">
              {item.category}
            </span>
          </div>
        </div>

        <div className="pt-2 flex justify-start">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center justify-between gap-4 border border-[#181538]/20 bg-[#181538] text-white hover:bg-[#5b72ff] transition-all duration-300 pl-5 sm:pl-6 pr-2 py-2 rounded-full font-medium text-sm sm:text-base active:scale-95 cursor-pointer shadow-md w-fit"
          >
            <span className="font-sans font-medium tracking-tight text-white">
              View Project
            </span>
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#181538] shrink-0 group-hover/btn:bg-white transition-colors duration-200 shadow-sm overflow-hidden">
              <BrandLogo
                className="h-3.5 w-auto text-[#181538] transition-transform duration-500 ease-out group-hover/btn:rotate-45"
                fill="#181538"
                useGradient={false}
              />
            </span>
          </a>
        </div>
      </div>

      {/* Desktop Image Container */}
      <div className="hidden lg:block relative w-[480px] xl:w-[560px] h-[330px] rounded-[26px] overflow-hidden bg-neutral-100 border border-neutral-200/80 shrink-0 transform-gpu">
        <motion.img
          style={{ y: imageY, scale: 1.2 }}
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transform-gpu will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const lenisRef = useRef<Lenis | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Compute dynamic project counts per category
  const projectCounts: Record<string, number> = { All: projectArchiveData.length };
  FILTER_CATEGORIES.forEach((cat) => {
    if (cat === 'All') return;
    projectCounts[cat] = projectArchiveData.filter((item) => isProjectMatch(item, cat)).length;
  });

  const filteredProjects = projectArchiveData.filter((item) => isProjectMatch(item, selectedFilter));

  return (
    <main className="relative min-h-screen bg-[#F5F5F5] text-neutral-900 font-sans selection:bg-[#5b72ff] selection:text-white overflow-x-hidden">
      {/* ── Global Fixed Staggered Menu ── */}
      <StaggeredMenu
        isRevealed={true}
        isFixed={true}
        position="right"
        colors={['#05030a', '#181538', '#28106f', '#5B72FF']}
        accentColor="#8b5cf6"
        wordmarkColor="#ffffff"
        displayDownloadCv={false}
        onMenuOpen={() => lenisRef.current?.stop()}
        onMenuClose={() => lenisRef.current?.start()}
        items={[
          { label: 'Home', ariaLabel: 'Go to Home page', link: '/' },
          { label: 'About', ariaLabel: 'Go to About page', link: '/about' },
          { label: 'Project', ariaLabel: 'Current page: Project', link: '/project' },
          { label: 'Contact', ariaLabel: 'Go to Contact page', link: '/contact' },
        ]}
        socialItems={[
          { label: 'Instagram', link: 'https://www.instagram.com/the.sherifiq' },
          { label: 'LinkedIn', link: 'https://www.linkedin.com/company/sherifiq' },
        ]}
      />

      {/* ── Page Hero Title Section ── */}
      <section className="relative z-10 min-h-[65vh] sm:min-h-[75vh] w-full flex flex-col justify-end overflow-hidden mb-8 sm:mb-12">
        {/* Background Billboard / Banner Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/projects/project.webp"
            alt="Project Hero Background"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Subtle gradient overlay to keep signboard vibrant while preserving text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F5F5F5] via-[#F5F5F5]/30 to-black/20" />
        </div>

        <div className="relative z-10 pt-28 sm:pt-36 pb-12 sm:pb-16 px-6 sm:px-12 max-w-7xl mx-auto w-full">
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-sora font-semibold text-5xl sm:text-7xl lg:text-8xl tracking-tight text-[#181538] mb-3 drop-shadow-md"
            >
              Projects
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-sans font-medium text-2xl sm:text-3xl lg:text-4xl text-[#181538]/80 leading-[1.2] max-w-xl whitespace-pre-line drop-shadow-sm"
            >
              Digital experiences{'\n'}built for ambitious brands
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Projects Archive List Section ── */}
      <section className="relative z-20 pb-28 px-6 sm:px-12 max-w-7xl mx-auto">
        {/* Sleek Minimalist Filter Header Bar */}
        <div className="relative z-40 mb-8 sm:mb-12 flex items-center justify-between gap-4 py-2 border-b border-neutral-200/80">
          <div className="flex items-center gap-3">
            <h2 className="font-sora font-bold text-lg sm:text-xl text-[#181538] tracking-tight">
              Selected Works
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-200/70 text-neutral-700">
              Showing {filteredProjects.length} of {projectArchiveData.length}
            </span>
          </div>

          {/* High-end Custom Dropdown Button */}
          <ProjectFilterDropdown
            categories={FILTER_CATEGORIES}
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
            projectCounts={projectCounts}
          />
        </div>

        {/* Animated Project Rows */}
        <motion.div layout className="space-y-6 sm:space-y-8 relative z-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <ProjectArchiveRow item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-neutral-500 font-medium bg-white rounded-3xl border border-neutral-200/80">
            No projects found for "{selectedFilter}".
          </div>
        )}
      </section>

      {/* ── Footer Section ── */}
      <div className="relative z-10 w-full bg-white">
        <Footer />
      </div>
    </main>
  );
}
