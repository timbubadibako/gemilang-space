"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { GemilangLogo } from "@/components/ui/GemilangLogo";
import { NavItem } from "@/types/content";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  navItems: NavItem[];
  currentLang: "id" | "en";
  onLangChange: (lang: "id" | "en") => void;
  whatsappNumber: string;
  theme?: "light" | "dark";
  onOpenEstimator?: () => void;
}

interface LinearMenuSection {
  title?: { id: string; en: string };
  links: {
    label: { id: string; en: string };
    href: string;
    tag?: string;
  }[];
}

export function Navbar({
  navItems,
  currentLang,
  onLangChange,
  whatsappNumber,
  theme = "dark",
  onOpenEstimator,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  // Smart Hide/Show State
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY.current;

          // Always visible at the very top of page
          if (currentScrollY <= 40) {
            setNavVisible(true);
          } else if (delta > 8 && currentScrollY > 80) {
            // Scrolling down -> hide navbar (unless mobile menu or dropdown is open)
            if (!mobileMenuOpen && !activeMenu) {
              setNavVisible(false);
            }
          } else if (delta < -4) {
            // Scrolling up even slightly -> show navbar
            setNavVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Cursor searching towards the top edge of viewport (within 70px) -> show navbar
      if (e.clientY <= 70) {
        setNavVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mobileMenuOpen, activeMenu]);

  const isLight = theme === "light";
  const ctaLabel = currentLang === "id" ? "Konsultasi" : "Let's Talk";
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    currentLang === "id"
      ? "Halo Gemilang, saya ingin berkonsultasi mengenai kebutuhan rekayasa produk & desain kami."
      : "Hello Gemilang, I'd like to talk about our product engineering and design needs."
  )}`;

  const handleOpen = (id: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveMenu(id);
    setIsRendered(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  };

  const handleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsRendered(false);
        setActiveMenu(null);
      }, 300);
    }, 160);
  };

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setIsVisible(true);
  };

  // Apple / Linear Style Clean Link Columns
  const linearData: Record<string, { sections: LinearMenuSection[] }> = {
    work: {
      sections: [
        {
          title: { id: "Koleksi Karya", en: "Portfolio" },
          links: [
            { label: { id: "Semua Karya Terpilih", en: "All Selected Works" }, href: "/works" },
            { label: { id: "Showcase Eksplorasi & Lab", en: "Lab & Experiments" }, href: "/showcase", tag: "LAB" },
          ],
        },
        {
          title: { id: "Studi Kasus", en: "Case Studies" },
          links: [
            { label: { id: "PT DAVID POS (Offline-First)", en: "PT DAVID POS (Offline-First)" }, href: "/works" },
            { label: { id: "Fermion Coffee Roastery", en: "Fermion Coffee Roastery" }, href: "/works" },
            { label: { id: "Desa Digital Cikalahang", en: "Desa Digital Cikalahang" }, href: "/works" },
          ],
        },
      ],
    },
    services: {
      sections: [
        {
          title: { id: "Produk & Sistem", en: "Core Systems" },
          links: [
            { label: { id: "Custom Software & Web Platform", en: "Custom Software & Web" }, href: "/services" },
            { label: { id: "Aplikasi Mobile (iOS & Android)", en: "Mobile Apps (iOS & Android)" }, href: "/services" },
            { label: { id: "Sistem Kasir (POS) & Hardware", en: "POS & Hardware Systems" }, href: "/services" },
          ],
        },
        {
          title: { id: "Inovasi & AI", en: "AI & Automations" },
          links: [
            { label: { id: "Otomasi Workflow & WhatsApp", en: "Workflow & WhatsApp Bots" }, href: "/services", tag: "HOT" },
            { label: { id: "Cloud DevOps & Database Supabase", en: "DevOps & Supabase Setup" }, href: "/services" },
            { label: { id: "Arsitektur Offline-First RS-232", en: "Offline-First Architectures" }, href: "/services" },
          ],
        },
      ],
    },
    company: {
      sections: [
        {
          title: { id: "Tentang Kami", en: "Company" },
          links: [
            { label: { id: "Profil Studio & Engineer", en: "Studio & Team Profile" }, href: "/about" },
            { label: { id: "FAQ & Tanya Jawab", en: "FAQ & Guarantees" }, href: "/faq" },
          ],
        },
        {
          title: { id: "Wawasan & Kontak", en: "Resources" },
          links: [
            { label: { id: "Blog & Devlogs Rekayasa", en: "Engineering Devlogs" }, href: "/blog" },
            { label: { id: "Kontak & Konsultasi Langsung", en: "Contact & Discovery Call" }, href: "/contact" },
          ],
        },
      ],
    },
  };

  return (
    <header
      className={`sticky top-0 w-full border-b transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] z-50 shrink-0 ${
        navVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isLight
          ? "border-neutral-200/80 bg-[#FFFFFF]/95 text-neutral-950 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
          : "border-[#28282B] bg-[#04060A]/95 text-white backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
      }`}
      onMouseLeave={handleClose}
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8 h-20 sm:h-[84px] flex items-center justify-between">
        
        {/* Left: Gemilang Dynamic Brand Logo */}
        <Link href="/" className="flex items-center select-none group py-1" aria-label="Gemilang Home">
          <GemilangLogo
            className="h-[25px] sm:h-[28px]"
            textColor={isLight ? "#0A0D14" : "#FFFFFF"}
            alt="Gemilang"
          />
        </Link>

        {/* Center: Navigation Links */}
        <nav className={`hidden md:flex items-center gap-8 text-[13.5px] font-medium h-full ${
          isLight ? "text-neutral-600" : "text-neutral-300"
        }`}>
          {navItems.map((item) => {
            const hasSub = item.hasDropdown && Boolean(linearData[item.id]);
            const isOpen = isVisible && activeMenu === item.id;

            return (
              <div
                key={item.id}
                className="h-full flex items-center relative"
                onMouseEnter={() => {
                  if (hasSub) handleOpen(item.id);
                  else handleClose();
                }}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 transition-colors duration-200 py-2 cursor-pointer ${
                    isOpen
                      ? isLight ? "text-neutral-950 font-bold" : "text-white font-bold"
                      : isLight ? "hover:text-neutral-950" : "hover:text-white"
                  }`}
                >
                  <span>{item.label[currentLang]}</span>

                  {item.badge && (
                    <span className="bg-[var(--theme-accent)] text-[var(--theme-accent-text)] text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}

                  {item.hasDropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "rotate-180 text-[var(--theme-accent)]" : "opacity-50"
                      }`}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Right Actions: ID/EN Switcher + CTA */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          <div className={`h-10 flex items-center p-1 rounded-full border text-xs font-semibold backdrop-blur-md shadow-xs ${
            isLight ? "bg-neutral-200/80 border-neutral-300/80" : "bg-[#141721] border-white/10"
          }`}>
            <button
              type="button"
              onClick={() => onLangChange("id")}
              className={`h-full px-3 flex items-center justify-center rounded-full transition-all text-[11px] font-mono cursor-pointer ${
                currentLang === "id"
                  ? "bg-white text-neutral-950 font-bold shadow-xs"
                  : isLight ? "text-neutral-600 hover:text-neutral-950" : "text-neutral-400 hover:text-white"
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => onLangChange("en")}
              className={`h-full px-3 flex items-center justify-center rounded-full transition-all text-[11px] font-mono cursor-pointer ${
                currentLang === "en"
                  ? "bg-white text-neutral-950 font-bold shadow-xs"
                  : isLight ? "text-neutral-600 hover:text-neutral-950" : "text-neutral-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          {onOpenEstimator ? (
            <Button
              variant="translucent"
              size="sm"
              onClick={onOpenEstimator}
              className="hidden sm:inline-flex h-10"
            >
              {ctaLabel}
            </Button>
          ) : (
            <Button
              variant="translucent"
              size="sm"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex h-10"
            >
              {ctaLabel}
            </Button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* ============================================================== */}
      {/* LINEAR / APPLE FULL-WIDTH SLIM BAR (Clean Pure Typography)     */}
      {/* ============================================================== */}
      {isRendered && activeMenu && linearData[activeMenu] && (
        <div
          className={`hidden md:block absolute left-0 right-0 top-full w-full border-b backdrop-blur-2xl z-40 origin-top transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-3 scale-[0.99] pointer-events-none"
          } ${
            isLight
              ? "shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)]"
              : "shadow-[0_24px_48px_-12px_rgba(0,0,0,0.55)]"
          }`}
          style={{
            backgroundColor: isLight ? "rgba(255, 255, 255, 0.97)" : "rgba(8, 10, 15, 0.97)",
            borderColor: isLight ? "rgba(229, 231, 235, 0.95)" : "rgba(255, 255, 255, 0.1)",
          }}
          onMouseEnter={cancelClose}
          onMouseLeave={handleClose}
        >
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8 py-7">
            <div className="flex items-start gap-16 lg:gap-24">
              {linearData[activeMenu].sections.map((sec, idx) => (
                <div key={idx} className="flex flex-col gap-3 min-w-[200px]">
                  {sec.title && (
                    <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 font-semibold">
                      {sec.title[currentLang]}
                    </span>
                  )}
                  <ul className="flex flex-col gap-2.5">
                    {sec.links.map((lnk, lIdx) => (
                      <li key={lIdx}>
                        <Link
                          href={lnk.href}
                          onClick={() => {
                            setIsVisible(false);
                            setActiveMenu(null);
                          }}
                          className={`group/lnk inline-flex items-center gap-2 text-[13.5px] font-medium transition-all duration-200 ${
                            isLight
                              ? "text-neutral-700 hover:text-black hover:translate-x-0.5"
                              : "text-neutral-300 hover:text-white hover:translate-x-0.5"
                          }`}
                        >
                          <span className="group-hover/lnk:text-[var(--theme-accent)] transition-colors duration-200">
                            {lnk.label[currentLang]}
                          </span>
                          {lnk.tag && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                              {lnk.tag}
                            </span>
                          )}
                          <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1.5 group-hover/lnk:opacity-100 group-hover/lnk:translate-x-0 transition-all duration-200 text-[var(--theme-accent)]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden w-full border-b px-6 py-6 shadow-2xl flex flex-col gap-4 text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isLight
              ? "bg-white border-neutral-200 text-neutral-800"
              : "bg-[#0D1017] border-white/10 text-neutral-300"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between py-2 border-b ${
                isLight ? "border-neutral-100 hover:text-black" : "border-white/5 hover:text-white"
              }`}
            >
              <span>{item.label[currentLang]}</span>
              {item.badge && (
                <span className="bg-[var(--theme-accent)] text-[var(--theme-accent-text)] text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-3">
            {onOpenEstimator ? (
              <Button
                variant="translucent"
                size="md"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEstimator();
                }}
                fullWidth
              >
                {ctaLabel}
              </Button>
            ) : (
              <Button
                variant="translucent"
                size="md"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                {ctaLabel}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
