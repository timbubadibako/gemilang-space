"use client";

import React, { useState, useRef } from "react";
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
      setIsVisible(true);
    });
  };

  const handleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIsRendered(false);
        setActiveMenu(null);
      }, 150);
    }, 100);
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
      className={`relative w-full border-b transition-colors z-50 shrink-0 ${
        isLight
          ? "border-neutral-200/80 bg-[#F3F3F5]/95 text-neutral-950 backdrop-blur-md"
          : "border-[#28282B] bg-[#04060A]/95 text-white backdrop-blur-md"
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
                  className={`inline-flex items-center gap-1.5 transition-colors duration-150 py-2 cursor-pointer ${
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
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
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
          className={`hidden md:block absolute left-0 right-0 top-full w-full border-b backdrop-blur-2xl z-40 transition-all duration-150 ease-out ${
            isVisible
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-1 pointer-events-none"
          }`}
          style={{
            backgroundColor: isLight ? "rgba(255, 255, 255, 0.96)" : "rgba(8, 10, 15, 0.96)",
            borderColor: isLight ? "rgba(229, 231, 235, 0.9)" : "rgba(255, 255, 255, 0.08)",
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
                          className={`group/lnk inline-flex items-center gap-2 text-[13px] font-medium transition-colors ${
                            isLight
                              ? "text-neutral-700 hover:text-black"
                              : "text-neutral-300 hover:text-white"
                          }`}
                        >
                          <span className="group-hover/lnk:text-[var(--theme-accent)] transition-colors">
                            {lnk.label[currentLang]}
                          </span>
                          {lnk.tag && (
                            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                              {lnk.tag}
                            </span>
                          )}
                          <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/lnk:opacity-100 group-hover/lnk:translate-x-0 transition-all text-[var(--theme-accent)]" />
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
        <div className="md:hidden w-full bg-[#0D1017] border-b border-white/10 px-6 py-6 shadow-2xl flex flex-col gap-4 text-sm font-medium text-neutral-300 animate-in fade-in duration-200">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 hover:text-white border-b border-white/5"
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
