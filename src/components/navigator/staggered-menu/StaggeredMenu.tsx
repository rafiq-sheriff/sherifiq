'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import BrandLogo from '../../ui/BrandLogo';
import './StaggeredMenu.css';

export type MenuItem = {
  label: string;
  ariaLabel: string;
  link: string;
  action?: string;
};

export type SocialItem = {
  label: string;
  link: string;
};

export type StaggeredMenuProps = {
  position?: 'left' | 'right';
  colors?: string[];
  items?: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  displayDownloadCv?: boolean;
  downloadCvLabel?: string;
  onDownloadCv?: () => void;
  isRevealed?: boolean;
};

const defaultNavItems: MenuItem[] = [
  { label: 'Home', ariaLabel: 'Go to Home section', link: '#hero' },
  { label: 'About', ariaLabel: 'Go to About page', link: '/about' },
  { label: 'Archive', ariaLabel: 'Go to Archive section', link: '#bento' },
  { label: 'Contact', ariaLabel: 'Go to Contact section', link: '#faq' },
];

const defaultSocials: SocialItem[] = [
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' },
];

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = 'right',
  colors = ['#05030a', '#181538', '#28106f', '#5B72FF'],
  items = defaultNavItems,
  socialItems = defaultSocials,
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl,
  menuButtonColor = '#181538',
  openMenuButtonColor = '#181538',
  accentColor = '#8b5cf6',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  displayDownloadCv = false,
  downloadCvLabel = 'Download CV',
  onDownloadCv,
  isRevealed = true,
}) => {
  const [open, setOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLDivElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const textWrapRef = useRef<HTMLSpanElement | null>(null);
  const [textLines] = useState<string[]>(['Menu', 'Close']);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Animation | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLDivElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll<HTMLDivElement>('.sm-prelayer'),
        );
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }

      setIsReady(true);
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll<HTMLSpanElement>('.sm-panel-itemLabel'),
    );
    const numberEls = Array.from(
      panel.querySelectorAll<HTMLLIElement>(
        '.sm-panel-list[data-numbering] .sm-panel-item',
      ),
    );
    const socialTitle = panel.querySelector<HTMLHeadingElement>(
      '.sm-socials-title',
    );
    const socialLinks = Array.from(
      panel.querySelectorAll<HTMLAnchorElement>('.sm-socials-link'),
    );

    const offscreen = position === 'left' ? -100 : 100;

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layers.forEach((layer, i) => {
      tl.fromTo(
        layer,
        { xPercent: offscreen },
        { xPercent: 0, duration: 0.5, ease: 'power4.out' },
        i * 0.07,
      );
    });
    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' },
        },
        itemsStart,
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' },
          },
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          socialsStart,
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll<HTMLSpanElement>('.sm-panel-itemLabel'),
        );
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        const numberEls = Array.from(
          panel.querySelectorAll<HTMLLIElement>(
            '.sm-panel-list[data-numbering] .sm-panel-item',
          ),
        );
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector<HTMLHeadingElement>(
          '.sm-socials-title',
        );
        const socialLinks = Array.from(
          panel.querySelectorAll<HTMLAnchorElement>('.sm-socials-link'),
        );
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) {
          gsap.set(socialLinks, { y: 25, opacity: 0 });
        }
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    if (!plusH || !plusV) return;

    spinTweenRef.current?.kill();

    const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });
    if (opening) {
      tl.to(plusH, { rotate: 45, duration: 0.35, ease: 'power3.out' }, 0);
      tl.to(plusV, { rotate: -45, duration: 0.35, ease: 'power3.out' }, 0);
    } else {
      tl.to(plusH, { rotate: 0, duration: 0.25, ease: 'power3.inOut' }, 0);
      tl.to(plusV, { rotate: 90, duration: 0.25, ease: 'power3.inOut' }, 0);
    }
    spinTweenRef.current = tl;
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current
          ? openMenuButtonColor
          : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const target = opening ? -50 : 0;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: target,
      duration: 0.45,
      ease: 'power3.out',
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

  const handleItemClick = (
    e: ReactMouseEvent<HTMLAnchorElement>,
    item: MenuItem,
  ) => {
    e.preventDefault();
    const { link, ariaLabel } = item;

    const isHash = link.startsWith('#');
    const sectionId = isHash ? link.slice(1) : undefined;

    if (isHash && sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeMenu();
      return;
    }

    if (link.startsWith('/')) {
      window.location.href = link;
      closeMenu();
      return;
    }

    window.open(link, ariaLabel || '_blank');
    closeMenu();
  };

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  const composedClassName =
    (className ? `${className} ` : '') +
    'staggered-menu-wrapper' +
    (isFixed ? ' fixed-wrapper' : '');

  return (
    <div
      className={composedClassName}
      style={accentColor ? { ['--sm-accent' as string]: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
      data-ready={isReady || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw =
            colors && colors.length
              ? colors.slice(0, 4)
              : ['#05030a', '#181538', '#28106f', '#5B72FF'];
          let arr = [...raw];
          if (arr.length >= 3) {
            const mid = Math.floor(arr.length / 2);
            arr.splice(mid, 1);
          }
          return arr.map((c, i) => (
            <div key={c + i} className="sm-prelayer" style={{ background: c }} />
          ));
        })()}
      </div>

      <motion.header
        initial={{ opacity: 0, y: -24, filter: 'blur(8px)' }}
        animate={
          isRevealed
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: -24, filter: 'blur(8px)' }
        }
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: 0,
        }}
        className="staggered-menu-header"
        aria-label="Main navigation header"
      >
        <div className="sm-navbar-container flex items-center justify-between w-full">
          <a href="/" className="flex items-center gap-3.5 group cursor-pointer">
            <div className="sm-logo" aria-label="Logo">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="sm-logo-img"
                  draggable={false}
                />
              ) : (
                <div className="w-[42px] h-[52px] sm:w-[44px] sm:h-[54px] bg-[#5b72ff] rounded-[22px] flex items-center justify-center shadow-md transition-transform duration-500 group-hover:scale-105">
                  <BrandLogo
                    className="h-6 sm:h-7 w-auto text-white"
                    fill="#ffffff"
                    useGradient={false}
                  />
                </div>
              )}
            </div>
            <motion.span
              initial={{ letterSpacing: '0.35em', opacity: 0 }}
              animate={
                isRevealed
                  ? { letterSpacing: '0.18em', opacity: 1 }
                  : { letterSpacing: '0.35em', opacity: 0 }
              }
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className={`font-rosnoc text-2xl md:text-3xl text-white transition-all duration-500 ease-in-out ${
                isScrolled
                  ? 'opacity-0 max-w-0 ml-0 pointer-events-none overflow-hidden'
                  : 'max-w-[200px] ml-1'
              }`}
            >
              SHERIFIQ
            </motion.span>
          </a>

          <div>
            <button
              ref={toggleBtnRef}
              className="sm-toggle"
              data-open={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="staggered-menu-panel"
              onClick={toggleMenu}
              type="button"
            >
              <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
                <span ref={textInnerRef} className="sm-toggle-textInner">
                  {textLines.map((line) => (
                    <span className="sm-toggle-line" key={line}>
                      {line}
                    </span>
                  ))}
                </span>
              </span>
              <span ref={iconRef} className="sm-icon" aria-hidden="true">
                <span ref={plusHRef} className="sm-icon-line" />
                <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <ul
            className="sm-panel-list"
            role="list"
            data-numbering={displayItemNumbering || undefined}
          >
            {items && items.length ? (
              items.map((item) => (
                <li className="sm-panel-itemWrap" key={item.label}>
                  <a
                    className="sm-panel-item"
                    href={item.link}
                    aria-label={item.ariaLabel}
                    onClick={(e) => handleItemClick(e, item)}
                  >
                    <span className="sm-panel-itemLabel">{item.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>

          {displayDownloadCv && (
            <div className="sm-downloadCv">
              <button
                type="button"
                className="sm-downloadCv-btn"
                onClick={() => {
                  onDownloadCv?.();
                  closeMenu();
                }}
              >
                {downloadCvLabel}
              </button>
            </div>
          )}

          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((social) => (
                  <li key={social.label} className="sm-socials-item">
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
