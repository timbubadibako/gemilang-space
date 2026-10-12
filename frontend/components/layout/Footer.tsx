"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteSettings } from "@/data/site-content";

interface FooterProps {
  lang: "id" | "en";
}

export function Footer({ lang }: FooterProps) {
  const categories = [
    "ARTIFICIAL INTELLIGENCE",
    "WEB3 & BLOCKCHAIN",
    "FINTECH",
    "SAAS",
    "B2B",
    "ECOMMERCE",
    "IT",
    "TECH",
  ];

  const caseStudies = [
    { title: "5U AI — Freight B2B UI/UX Design.", highlight: "(Raised $3.2M)" },
    { title: "Efficense — B2B Web Design and Framer Development", highlight: "" },
    { title: "Enorm — B2B Web Design and Framer Development", highlight: "" },
    { title: "Defendzero — SaaS Web Design and Framer Development", highlight: "" },
    { title: "Mindsphere — AI Web Design, Brand Design and Framer Development", highlight: "" },
    { title: "Spex Software — Development & Cyber Security Landing Page Design", highlight: "" },
  ];

  const socialPills = [
    { name: "X.COM", href: "https://x.com" },
    { name: "LINKEDIN", href: "https://linkedin.com" },
    { name: "FRAMER", href: "https://framer.com" },
    { name: "BEHANCE", href: "https://behance.net" },
    { name: "DRIBBBLE", href: "https://dribbble.com" },
    { name: "CLUTCH", href: "https://clutch.co" },
    { name: "INSTAGRAM", href: "https://instagram.com" },
  ];

  const waUrl = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Gemilang Space, saya ingin mendiskusikan proyek digital."
      : "Hello Gemilang Space, I would like to discuss a digital project."
  )}`;

  return (
    <footer className="relative w-full text-white pt-12 sm:pt-16 lg:pt-20 pb-0 overflow-hidden z-30 -mt-24 sm:-mt-32 lg:-mt-44 bg-gradient-to-b from-[#04060A]/30 via-[#04060A]/90 to-[#04060A] backdrop-blur-[6px]">
      
      {/* Top subtle feathered fade to completely remove sharp line cuts */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#04060A]/40 pointer-events-none" />

      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#335CFF]/15 to-transparent blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8 relative z-10">
        
        {/* ============================================================== */}
        {/* ROW 1: BRAND LOGO + ABOUT + START A PROJECT & 3 NAV COLUMNS    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 sm:pb-16 border-b border-white/10 items-start">
          
          {/* Left Column: Brand, Description, CTA Button */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Logo: Icon + Brand Name */}
            <Link href="/" className="flex items-center gap-2.5 group mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-white via-neutral-200 to-neutral-400 flex items-center justify-center p-1 shadow-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-black"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-['Brockmann_Medium',sans-serif]">
                gemilang
              </span>
            </Link>

            {/* Studio Narrative Description */}
            <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed max-w-sm mb-8 font-normal">
              {lang === "id"
                ? "Gemilang Space adalah studio desain produk dan rekayasa digital founder-led yang membantu startup membangun produk digital, website, brand, dan design system melalui kemitraan langganan dan proyek kustom."
                : "Gemilang Space is a founder-led product design and engineering studio helping startups build digital products, websites, brands and design systems through subscription-based partnerships and custom projects."}
            </p>

            {/* Start a Project Pill Button (1:1 with reference) */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#F2F2F5] hover:bg-black text-neutral-950 hover:text-white border-2 border-transparent hover:border-white p-1 pl-1 pr-5 rounded-[16px] text-xs sm:text-[13.5px] font-semibold transition-all duration-300 group/btn cursor-pointer shadow-sm select-none"
            >
              <div className="w-8 h-8 rounded-[10px] bg-black group-hover/btn:bg-transparent text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </div>
              <span className="font-semibold tracking-tight">
                {lang === "id" ? "Mulai Proyek" : "Start a Project"}
              </span>
            </a>
          </div>

          {/* Column 1: Gemilang Space Nav */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight mb-4">
              Gemilang Space
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300 font-normal">
              <div>
                <a href="#about" className="hover:text-white transition-colors">
                  {lang === "id" ? "Tentang Kami" : "About"}
                </a>
              </div>
              <div>
                <a href="#careers" className="hover:text-white transition-colors">
                  {lang === "id" ? "Karir" : "Careers"}
                </a>
              </div>
              <div>
                <a href="#works" className="hover:text-white transition-colors">
                  {lang === "id" ? "Karya (Studi Kasus)" : "Works (Case)"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a href="#showcase" className="hover:text-white transition-colors">
                  Showcase
                </a>
                <span className="text-[9px] font-mono uppercase bg-[#335CFF] text-white px-1.5 py-0.5 rounded font-bold leading-none">
                  NEW
                </span>
              </div>
              <div>
                <a href="#testimonials" className="hover:text-white transition-colors">
                  {lang === "id" ? "Testimoni Klien" : "Testimonials"}
                </a>
              </div>
              <div>
                <a href="#blog" className="hover:text-white transition-colors">
                  Blog
                </a>
              </div>
              <div>
                <a href="#deck" className="hover:text-white transition-colors">
                  Studio Deck
                </a>
              </div>
              <div>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {lang === "id" ? "Kontak" : "Contact"}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services Nav */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight mb-4">
              {lang === "id" ? "Layanan" : "Services"}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300 font-normal">
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Product Design
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Landing Page Design
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  UI/UX Design
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Website Design
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Design System Setup
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  UX Audit and Optimization
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Mobile App Design
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Design Subscription Nav */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight">
                {lang === "id" ? "Langganan" : "Design Subscription"}
              </h4>
              <span className="text-[9px] font-mono uppercase bg-[#335CFF] text-white px-1.5 py-0.5 rounded font-bold leading-none">
                NEW
              </span>
            </div>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300 font-normal">
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Brand Identity Design
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Logo Design
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Framer Development
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Growth &amp; Launch
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Pitch Deck Design
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Sales Deck Design
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ROW 2: WE DESIGN FOR / POPULAR CASE STUDIES / RESOURCES        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 py-12 sm:py-16 border-b border-white/10">
          
          {/* We Design For */}
          <div className="lg:col-span-4">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white mb-5 tracking-tight">
              {lang === "id" ? "Bidang Desain Mitra" : "We Design For"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-mono font-medium text-neutral-300 bg-white/[0.05] border border-white/10 px-3 py-1.5 rounded-full uppercase hover:bg-white/10 transition-colors"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Popular Case Studies */}
          <div className="lg:col-span-5">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white mb-5 tracking-tight">
              {lang === "id" ? "Studi Kasus Populer" : "Popular Case Studies"}
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-neutral-300 font-normal">
              {caseStudies.map((cs, idx) => (
                <li key={idx} className="flex items-baseline gap-1.5 hover:text-white transition-colors">
                  <span>{cs.title}</span>
                  {cs.highlight && (
                    <span className="font-bold text-white">{cs.highlight}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-3">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white mb-5 tracking-tight">
              {lang === "id" ? "Sumber Daya" : "Resources"}
            </h4>
            <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed max-w-xs font-normal">
              Create UI — World&apos;s largest design system &amp; react component library.
            </p>
          </div>

        </div>

        {/* ============================================================== */}
        {/* ROW 3: SOCIAL PILLS                                            */}
        {/* ============================================================== */}
        <div className="py-8 border-b border-white/10 flex flex-wrap items-center gap-2">
          {socialPills.map((p, idx) => (
            <a
              key={idx}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-mono font-medium text-neutral-300 hover:text-white bg-white/[0.04] hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full transition-all"
            >
              {p.name}
            </a>
          ))}
        </div>

        {/* ============================================================== */}
        {/* ROW 4: LEGAL & CREDITS BAR                                     */}
        {/* ============================================================== */}
        <div className="pt-8 pb-10 sm:pb-14 flex flex-col md:flex-row md:items-center justify-between gap-6 text-xs text-neutral-400 font-normal">
          <div>
            <p className="font-semibold text-white text-[13px] sm:text-sm">
              © 2026 Gemilang Space LLC | All rights reserved.
            </p>
            <p className="text-[11px] text-neutral-400 mt-1.5">
              Sudirman Central Business District, Jakarta, Indonesia • Worldwide Remote
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-2 text-[11px]">
            <p className="font-semibold text-white flex items-center gap-1.5">
              Crafted with precision &amp; pixel love <span className="text-[#38bdf8]">🩵</span>
            </p>
            <div className="flex items-center gap-4 text-neutral-400">
              <Link href="#terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#cookie" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="#privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* ROW 5: GIANT SIGNATURE DISPLAY: "gemilang space" (1:1 Beew)      */}
      {/* ============================================================== */}
      <div 
        className="w-full max-w-[1400px] mx-auto select-none overflow-hidden flex justify-center items-start aspect-[8.24615] relative -mb-1"
      >
        <svg
          viewBox="0 0 1708 260"
          className="w-full h-auto select-none pointer-events-none"
          style={{
            maskImage: "linear-gradient(0deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 85%)",
            WebkitMaskImage: "linear-gradient(0deg, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 85%)",
          }}
        >
          <text
            x="50%"
            y="198"
            textAnchor="middle"
            fill="#FFFFFF"
            style={{
              fontFamily: "'Brockmann Medium', 'Brockmann Medium Placeholder', sans-serif",
              fontSize: "216px",
              fontWeight: 500,
              letterSpacing: "-0.03em",
            }}
          >
            gemilang space
          </text>
        </svg>
      </div>

    </footer>
  );
}
