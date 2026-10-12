"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { NavItem } from "@/types/content";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  navItems: NavItem[];
  currentLang: "id" | "en";
  onLangChange: (lang: "id" | "en") => void;
  whatsappNumber: string;
  theme?: "light" | "dark";
}

export function Navbar({
  navItems,
  currentLang,
  onLangChange,
  whatsappNumber,
  theme = "dark",
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLight = theme === "light";
  const ctaLabel = currentLang === "id" ? "Konsultasi" : "Let's Talk";
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    currentLang === "id"
      ? "Halo Gemilang Space, saya ingin berkonsultasi mengenai kebutuhan rekayasa produk & desain kami."
      : "Hello Gemilang Space, I'd like to talk about our product engineering and design needs."
  )}`;

  return (
    <header className={`w-full border-b transition-colors z-50 shrink-0 ${
      isLight 
        ? "border-neutral-200/80 bg-[#F3F3F5]/95 text-neutral-950 backdrop-blur-md" 
        : "border-[#28282B] bg-[#04060A]/95 text-white backdrop-blur-md"
    }`}>
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8 h-20 sm:h-[84px] flex items-center justify-between">
        
        {/* Left: Pure Typography Logo 'gemilang' (Aligned 1:1 to left edge of hero card) */}
        <Link href="/" className="flex items-center select-none group">
          <span className={`font-sans font-bold text-2xl sm:text-[27px] tracking-[-0.05em] lowercase transition-colors leading-none ${
            isLight ? "text-neutral-950 group-hover:text-neutral-700" : "text-white group-hover:text-neutral-200"
          }`}>
            gemilang
          </span>
        </Link>

        {/* Center: Navigation Links matching Beew structure */}
        <nav className={`hidden md:flex items-center gap-7 lg:gap-8 text-[13.5px] font-medium h-full ${
          isLight ? "text-neutral-600" : "text-neutral-300"
        }`}>
          {navItems.map((item) => {
            const dropdownLinks: Record<string, { label: { id: string; en: string }; href: string }[]> = {
              work: [
                { label: { id: "Karya Terpilih", en: "Selected Works" }, href: "/works" },
                { label: { id: "Showcase Eksplorasi", en: "Showcase" }, href: "/showcase" },
              ],
              services: [
                { label: { id: "Custom Software & Web", en: "Custom Software & Web" }, href: "/services" },
                { label: { id: "Mobile Apps (Flutter/RN)", en: "Mobile Apps" }, href: "/services" },
                { label: { id: "AI & Workflow Automation", en: "AI & Automation" }, href: "/services" },
                { label: { id: "Cloud & DevOps", en: "Cloud & DevOps" }, href: "/services" },
              ],
              company: [
                { label: { id: "Tentang Studio", en: "About Studio" }, href: "/about" },
                { label: { id: "FAQ", en: "FAQ" }, href: "/faq" },
                { label: { id: "Blog & Wawasan", en: "Blog" }, href: "/blog" },
                { label: { id: "Hubungi Kami", en: "Contact" }, href: "/contact" },
              ],
            };

            const subItems = dropdownLinks[item.id];

            return (
              <div key={item.id} className="relative group/nav h-full flex items-center">
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-1 transition-colors duration-200 py-2 ${
                    isLight ? "hover:text-neutral-950" : "hover:text-white"
                  }`}
                >
                  <span>{item.label[currentLang]}</span>

                  {/* Pill badge for NEW */}
                  {item.badge && (
                    <span className="ml-1 bg-[#335CFF] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      {item.badge}
                    </span>
                  )}

                  {/* Dropdown Chevron */}
                  {item.hasDropdown && (
                    <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 group-hover/nav:rotate-180 ${
                      isLight ? "text-neutral-500" : "text-neutral-400"
                    }`} />
                  )}
                </Link>

                {/* Floating Dropdown Popover */}
                {item.hasDropdown && subItems && (
                  <div className="absolute top-[80%] left-1/2 -translate-x-1/2 pt-2 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all duration-200 z-50">
                    <div className={`w-52 p-2 rounded-2xl border shadow-xl backdrop-blur-xl ${
                      isLight 
                        ? "bg-white/95 border-neutral-200/90 text-neutral-900 shadow-neutral-200/50" 
                        : "bg-[#0E1118]/95 border-neutral-800 text-white shadow-black/60"
                    }`}>
                      {subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          className={`block px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                            isLight 
                              ? "hover:bg-neutral-100 text-neutral-800 hover:text-black" 
                              : "hover:bg-white/10 text-neutral-300 hover:text-white"
                          }`}
                        >
                          {sub.label[currentLang]}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right Actions: Equal-Height ID/EN Toggle + Signature 'Let's Talk' Expanding Pill Button */}
        <div className="flex items-center gap-3 sm:gap-3.5">
          {/* Language Switcher Pill - exact h-10 to match Let's Talk button height */}
          <div className={`h-10 flex items-center p-1 rounded-full border text-xs font-semibold backdrop-blur-md shadow-xs ${
            isLight ? "bg-neutral-200/80 border-neutral-300/80" : "bg-[#141721] border-white/10"
          }`}>
            <button
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

          {/* Signature 'Let's Talk' Pill Button with expanding dark filler - exact h-10 */}
          <Button
            variant="expand"
            size="sm"
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex h-10"
          >
            {ctaLabel}
          </Button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

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
                <span className="bg-[#335CFF] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-3">
            <Button
              variant="expand"
              size="md"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center"
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
