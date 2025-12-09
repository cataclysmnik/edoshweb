"use client";

import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  /** Optional image path for the logo. If not provided, `logoText` will be used when present. */
  logo?: string;
  /** Optional text to render as the logo (e.g. site name). Renders when provided instead of the image. */
  logoText?: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  /** When true (default) the nav will use a glassmorphic style (backdrop blur + translucent bg). */
  glass?: boolean;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoText,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  glass = true,
  buttonBgColor,
  buttonTextColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [isInstallPage, setIsInstallPage] = useState(pathname === "/install");
  
  // Smooth animation when pathname changes
  useEffect(() => {
    const newIsInstallPage = pathname === "/install";
    if (newIsInstallPage !== isInstallPage) {
      // Add a small delay for smoother visual transition
      const timer = setTimeout(() => {
        setIsInstallPage(newIsInstallPage);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname, isInstallPage]);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1",
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  // Compute nav inline style. If glass is enabled, use a translucent background with backdrop blur.
  const navInlineStyle: React.CSSProperties = glass
    ? {
        backgroundColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.08)",
      }
    : { backgroundColor: baseColor };

  // Compute effective colors so text and controls remain visible on the glass background.
  // Small color helpers to pick readable colors on top of the glass background.
  const hexToRgb = (hex: string) => {
    const h = hex.replace("#", "").trim();
    if (h.length === 3) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      return { r, g, b };
    }
    if (h.length === 6) {
      const r = parseInt(h.slice(0, 2), 16);
      const g = parseInt(h.slice(2, 4), 16);
      const b = parseInt(h.slice(4, 6), 16);
      return { r, g, b };
    }
    return null;
  };

  const rgbLuminance = (r: number, g: number, b: number) => {
    // relative luminance formula
    const srgb = [r, g, b].map((v) => v / 255).map((c) => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  };

  const parseColorLuminance = (c?: string) => {
    if (!c) return null;
    // handle hex (#fff, #ffffff)
    if (c.startsWith("#")) {
      const rgb = hexToRgb(c);
      if (rgb) return rgbLuminance(rgb.r, rgb.g, rgb.b);
    }
    // handle rgb(...) simple parse
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (m) {
      const parts = m[1].split(",").map((p) => parseFloat(p.trim()));
      if (parts.length >= 3) return rgbLuminance(parts[0], parts[1], parts[2]);
    }
    return null;
  };

  // If glass is enabled we prefer light (white) controls unless the provided color is already light.
  const menuLuminance = parseColorLuminance(menuColor);
  const effectiveMenuColor = (() => {
    if (!glass) return menuColor ?? "#000";
    if (!menuColor) return "#fff";
    if (menuLuminance === null) return "#fff";
    return menuLuminance < 0.5 ? "#fff" : menuColor;
  })();

  const buttonBgLuminance = parseColorLuminance(buttonBgColor);
  const effectiveButtonBg = (() => {
    if (!glass) return buttonBgColor ?? "#111";
    if (!buttonBgColor) return "rgba(0,0,0,0.6)";
    // if provided bg is dark keep it, otherwise use semi-opaque dark to keep contrast
    if (buttonBgLuminance === null) return buttonBgColor;
    return buttonBgLuminance < 0.5 ? buttonBgColor : "rgba(0,0,0,0.6)";
  })();

  const effectiveButtonText = (() => {
    if (buttonTextColor) return buttonTextColor;
    // if button bg is dark, use white text; else use black
    const lum = parseColorLuminance(effectiveButtonBg as string) ?? 0;
    return lum < 0.5 ? "#fff" : "#000";
  })();

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-[800px] z-99 top-[1.2em] md:top-[2em] backdrop-blur-xl bg-[#0a0a0a]/30 ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-[60px] p-0 rounded-xl shadow-md relative overflow-hidden will-change-[height]`}
        style={navInlineStyle}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-2">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group h-full flex flex-col items-center justify-center cursor-pointer gap-1.5 order-2 md:order-0`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
            style={{ color: effectiveMenuColor }}
          >
            <div
              className={`hamburger-line w-[30px] h-0.5 bg-current transition-all duration-300 ease-in-out origin-center ${
                isHamburgerOpen ? "translate-y-[5px] rotate-45" : ""
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[30px] h-0.5 bg-current transition-all duration-300 ease-in-out origin-center ${
                isHamburgerOpen ? "-translate-y-[5px] -rotate-45" : ""
              } group-hover:opacity-75`}
            />
          </div>

          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-0">
            {/** If logoText is provided, render text instead of the image. */}
            {(() => {
              if ((logoText as string | undefined) && logoText?.length) {
                return (
                  <div
                    className="logo-text tracking-[-0.5px] text-[18px] md:text-[20px]"
                    style={{ color: effectiveMenuColor }}
                  >
                    <a href="/">
                      {logoText}
                    </a>
                  </div>
                );
              }

              if (logo) {
                return <img src={logo} alt={logoAlt} className="logo h-7" />;
              }

              return null;
            })()}
          </div>

          <button
            type="button"
            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 items-center h-full font-medium cursor-pointer transition-colors duration-300"
            style={{ backgroundColor: effectiveButtonBg, color: effectiveButtonText }}
            onClick={() => {
              const targetPath = isInstallPage ? "/" : "/install";
              router.push(targetPath);
            }}
          >
            <span className="relative overflow-hidden block" style={{ minWidth: '90px' }}>
              <span
                className={`absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-500 ${!isInstallPage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}
              >
                Get Started
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-500 ${isInstallPage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
              >
                Home
              </span>
              <span className="invisible">Get Started</span>
            </span>
          </button>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-1 ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-3`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[12px_16px] rounded-[calc(0.75rem-0.2rem)] min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-normal tracking-[-0.5px] text-[18px] md:text-[22px]">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-0.5">
                {item.links?.map((lnk, i) => {
                  const isInternal = lnk.href.startsWith("/");
                  const isAnchor = lnk.href.startsWith("#");
                  const isExternal = !isInternal && !isAnchor;
                  
                  if (isInternal || isAnchor) {
                    return (
                      <Link
                        key={`${lnk.label}-${i}`}
                        className="nav-card-link inline-flex items-center gap-1.5 no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                        href={lnk.href}
                        aria-label={lnk.ariaLabel}
                        onClick={(e) => {
                          // Handle hash navigation for smooth scrolling
                          if (lnk.href.includes('#')) {
                            const [path, hash] = lnk.href.split('#');
                            const targetPath = path || '/';
                            
                            // If we're navigating to a different page with a hash
                            if (pathname !== targetPath) {
                              e.preventDefault();
                              router.push(lnk.href);
                              // Wait for navigation to complete, then scroll
                              setTimeout(() => {
                                const element = document.getElementById(hash);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 100);
                            } else if (hash) {
                              // Same page, just scroll to hash
                              e.preventDefault();
                              const element = document.getElementById(hash);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }
                              // Update URL with hash using replaceState for cleaner history
                              window.history.replaceState(null, '', `${targetPath}#${hash}`);
                            }
                          }
                        }}
                      >
                        <GoArrowUpRight
                          className="nav-card-link-icon shrink-0"
                          aria-hidden="true"
                        />
                        {lnk.label}
                      </Link>
                    );
                  } else {
                    return (
                      <a
                        key={`${lnk.label}-${i}`}
                        className="nav-card-link inline-flex items-center gap-1.5 no-underline cursor-pointer transition-opacity duration-300 hover:opacity-75 text-[15px] md:text-[16px]"
                        href={lnk.href}
                        aria-label={lnk.ariaLabel}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {/* <GoArrowUpRight
                          className="nav-card-link-icon shrink-0"
                          aria-hidden="true"
                        /> */}
                        {lnk.label}
                      </a>
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
