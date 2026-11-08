"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteSettings } from "@/data/site-content";
import { GemilangLogo } from "@/components/ui/GemilangLogo";
import { Button } from "@/components/ui/button";
import { useCMS } from "@/lib/cms-context";

interface FooterProps {
  lang: "id" | "en";
}

export function Footer({ lang }: FooterProps) {
  const { cms } = useCMS();
  const footerData = cms.footer || {
    address: "Jl. Karya Bakti, Kec. Jalaksana, Kabupaten Kuningan, Jawa Barat 45554, Indonesia",
    copyrightYear: "2026",
    badgeText: "Dibangun dengan presisi rekayasa & integritas ⚡",
    socials: [
      { name: "INSTAGRAM", href: "https://instagram.com/gemilang_space" },
      { name: "WHATSAPP", href: `https://wa.me/${siteSettings.whatsappNumber}` },
      { name: "EMAIL", href: `mailto:${siteSettings.contactEmail}` },
      { name: "GOOGLE MAPS", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Jl. Karya Bakti, Kec. Jalaksana, Kabupaten Kuningan, Jawa Barat 45554, Indonesia")}` },
      { name: "GITHUB", href: "https://github.com/timbubadibako/gemilang-space" },
    ],
  };
  const categories = [
    "SISTEM KASIR (POS)",
    "WEBSITE TOKO CEPAT",
    "PORTAL DESA DIGITAL",
    "SISTEM ERP INTERNAL",
    "OTOMASI WHATSAPP",
    "TIM IT ON-DEMAND",
    "SUPABASE & POSTGRES",
    "NEXT.JS & FLUTTER",
  ];

  const caseStudies = [
    { title: "Fermion Roastery — E-Commerce Specialty Coffee & Web Store", highlight: "(Live)" },
    { title: "Desa Kadurama — Portal Desa Digital & Pelayanan Surat Warga", highlight: "(Kuningan)" },
    { title: "Green Cycle Kuningan — Sistem ERP Internal & Daur Ulang", highlight: "(Enterprise)" },
    { title: "AHASS AS Putra Rahmat — Portal Bengkel & Dealer Motor Honda", highlight: "(Segera)" },
    { title: "Fourjective — Creative Agency & Visual Brand Showcase", highlight: "(In Dev)" },
    { title: "Qiyar Media — Media Agency & Production Collaboration Hub", highlight: "(In Dev)" },
    { title: "Pesantren OS — EdTech & Asisten Suara Hafalan Qur'an AI", highlight: "(In Dev)" },
  ];

  const socialPills = [
    { name: "INSTAGRAM", href: "https://instagram.com/gemilang_space" },
    { name: "WHATSAPP", href: `https://wa.me/${siteSettings.whatsappNumber}` },
    { name: "EMAIL", href: `mailto:${siteSettings.contactEmail}` },
    { name: "GOOGLE MAPS", href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Jl. Karya Bakti, Kec. Jalaksana, Kabupaten Kuningan, Jawa Barat 45554, Indonesia")}` },
    { name: "GITHUB", href: "https://github.com/timbubadibako/gemilang-space" },
  ];

  const waUrl = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Gemilang, saya ingin mendiskusikan proyek digital."
      : "Hello Gemilang, I would like to discuss a digital project."
  )}`;

  return (
    <footer className="relative w-full text-white pt-12 sm:pt-16 lg:pt-20 pb-0 overflow-hidden z-30 -mt-24 sm:-mt-32 lg:-mt-44 bg-gradient-to-b from-[#04060A]/30 via-[#04060A]/90 to-[#04060A] backdrop-blur-[6px]">
      
      {/* Top subtle feathered fade to completely remove sharp line cuts */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#04060A]/40 pointer-events-none" />

      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[var(--theme-accent)]/15 to-transparent blur-[140px] pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8 relative z-10">
        
        {/* ============================================================== */}
        {/* ROW 1: BRAND LOGO + ABOUT + START A PROJECT & 3 NAV COLUMNS    */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 sm:pb-16 border-b border-white/10 items-start">
          
          {/* Left Column: Brand, Description, CTA Button */}
          <div className="lg:col-span-4 flex flex-col items-start">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group mb-6" aria-label="Gemilang Home">
              <GemilangLogo className="h-[34px] sm:h-[40px]" alt="Gemilang" />
            </Link>

            {/* Studio Narrative Description */}
            <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed max-w-sm mb-8 font-normal">
              {lang === "id"
                ? "Gemilang adalah studio rekayasa teknologi dan produk digital founder-led. Kami membangun website toko cepat, sistem kasir (POS), integrasi WhatsApp, dan menyediakan tim IT on-demand bulanan untuk UMKM & bisnis berkembang."
                : "Gemilang is a founder-led engineering studio delivering fast web stores, retail POS systems, WhatsApp automation, and dedicated on-demand tech squads for growing businesses."}
            </p>

            {/* Start a Project Pill Button */}
            <div className="pt-1">
              <Button
                variant="expand-primary"
                size="md"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {lang === "id" ? "Diskusi WhatsApp" : "Discuss on WhatsApp"}
              </Button>
            </div>
          </div>

          {/* Column 1: Gemilang Nav */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight mb-4">
              Gemilang
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300 font-normal">
              <div>
                <a href="#about" className="hover:text-white transition-colors">
                  {lang === "id" ? "Tentang Studio" : "About Us"}
                </a>
              </div>
              <div>
                <a href="#works" className="hover:text-white transition-colors">
                  {lang === "id" ? "Karya & Portofolio" : "Works & Case Studies"}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a href="#why-us" className="hover:text-white transition-colors">
                  {lang === "id" ? "Squad Inti 6 Engineer" : "6-Engineer Squad"}
                </a>
                <span className="text-[9px] font-mono uppercase bg-[var(--theme-accent)] text-[var(--theme-accent-text)] px-1.5 py-0.5 rounded font-bold leading-none">
                  TEAM
                </span>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  {lang === "id" ? "Layanan Solusi" : "Services"}
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  {lang === "id" ? "Biaya & Paket" : "Pricing"}
                </a>
              </div>
              <div>
                <a href="#faq" className="hover:text-white transition-colors">
                  {lang === "id" ? "Tanya Jawab (FAQ)" : "FAQ"}
                </a>
              </div>
              <div>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-[#00E1BA] hover:underline transition-all">
                  {lang === "id" ? "Konsultasi WhatsApp ↗" : "WhatsApp Chat ↗"}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services Nav */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight mb-4">
              {lang === "id" ? "Layanan Solusi" : "Solutions"}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300 font-normal">
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Website &amp; Toko Online Cepat
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Sistem Kasir (POS) &amp; Gudang
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Aplikasi Web &amp; Mobile Custom
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Otomasi WhatsApp Bisnis
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Chatbot AI CS 24/7
                </a>
              </div>
              <div>
                <a href="#services" className="hover:text-white transition-colors">
                  Tim IT On-Demand &amp; Maintenance
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: Paket & Retainer */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2 mb-4">
              <h4 className="text-sm sm:text-[15px] font-semibold text-white tracking-tight">
                {lang === "id" ? "Paket & Retainer" : "Pricing & Plans"}
              </h4>
              <span className="text-[9px] font-mono uppercase bg-[var(--theme-accent)] text-[var(--theme-accent-text)] px-1.5 py-0.5 rounded font-bold leading-none">
                POPULER
              </span>
            </div>
            <div className="space-y-2.5 text-xs sm:text-[13px] text-neutral-300 font-normal">
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Dedicated Squad (Rp 6.5 Jt/bln)
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Web Starter UMKM (Rp 1.5 Jt)
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  POS Retail &amp; Kasir (Rp 3.5 Jt)
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Server Ops &amp; Monitoring
                </a>
              </div>
              <div>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Konsultasi Arsitektur Software
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ROW 2: WE DESIGN FOR / POPULAR CASE STUDIES / DIRECT CONTACT   */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 py-12 sm:py-16 border-b border-white/10">
          
          {/* We Design For */}
          <div className="lg:col-span-4">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white mb-5 tracking-tight">
              {lang === "id" ? "Solusi & Standar Teknis" : "Solutions & Tech Stack"}
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
              {lang === "id" ? "Portofolio & Studi Kasus" : "Case Studies & Portfolio"}
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-neutral-300 font-normal">
              {caseStudies.map((cs, idx) => (
                <li key={idx} className="flex items-baseline gap-1.5 hover:text-white transition-colors">
                  <span>{cs.title}</span>
                  {cs.highlight && (
                    <span className="font-bold text-[#00E1BA]">{cs.highlight}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Studio Direct Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-sm sm:text-[15px] font-semibold text-white mb-5 tracking-tight">
              {lang === "id" ? "Kontak Langsung" : "Direct Contact"}
            </h4>
            <div className="space-y-2 text-xs sm:text-[13px] text-neutral-300 font-normal">
              <p className="text-neutral-400">
                {lang === "id"
                  ? "Diskusi cepat kebutuhan software atau optimasi sistem bisnis Anda:"
                  : "Quick consultation for your software needs and system performance:"}
              </p>
              <div className="pt-1.5 space-y-1">
                <a href={`mailto:${siteSettings.contactEmail}`} className="text-white hover:text-[#00E1BA] transition-colors block font-mono">
                  {siteSettings.contactEmail}
                </a>
                <a href={`https://wa.me/${siteSettings.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#00E1BA] transition-colors block font-mono">
                  +62 857-2204-5801
                </a>
                <span className="text-neutral-500 text-[11px] block mt-1">
                  Kuningan, Jawa Barat • Indonesia
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* ROW 3: SOCIAL PILLS                                            */}
        {/* ============================================================== */}
        <div className="py-8 border-b border-white/10 flex flex-wrap items-center gap-2">
          {(footerData.socials || socialPills).map((p, idx) => (
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
              © {footerData.copyrightYear || "2026"} Gemilang | All rights reserved.
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                footerData.address || "Jl. Karya Bakti, Kec. Jalaksana, Kabupaten Kuningan, Jawa Barat 45554, Indonesia"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-neutral-400 hover:text-white transition-colors mt-1.5 inline-flex items-center gap-1.5 group"
              title="Buka lokasi di Google Maps"
            >
              <span className="group-hover:underline underline-offset-2">
                {footerData.address || "Jl. Karya Bakti, Kec. Jalaksana, Kabupaten Kuningan, Jawa Barat 45554, Indonesia"}
              </span>
              <span className="text-[10px] text-neutral-500 group-hover:text-[#00E1BA] transition-colors shrink-0 font-mono">↗ Maps</span>
            </a>
          </div>

          <div className="flex flex-col md:items-end gap-2 text-[11px]">
            <p className="font-semibold text-white flex items-center gap-1.5">
              {footerData.badgeText || "Dibangun dengan presisi rekayasa & integritas ⚡"}
            </p>
            <div className="flex items-center gap-4 text-neutral-400">
              <Link href="#pricing" className="hover:text-white transition-colors">
                Paket Mulai 1.5 Jt
              </Link>
              <Link href="#services" className="hover:text-white transition-colors">
                Layanan
              </Link>
              <Link href="#works" className="hover:text-white transition-colors">
                Portofolio
              </Link>
            </div>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* ROW 5: GIANT SIGNATURE DISPLAY: GEMILANG LOGO                  */}
      {/* ============================================================== */}
      <div 
        className="w-full max-w-[1440px] mx-auto select-none overflow-hidden flex justify-end items-end px-5 sm:px-7 lg:px-8 pt-4 pb-6 relative -mb-1"
      >
        <div
          className="w-full flex justify-end items-center"
          style={{
            maskImage: "linear-gradient(0deg, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 90%)",
            WebkitMaskImage: "linear-gradient(0deg, rgba(0,0,0,0) 5%, rgba(0,0,0,1) 90%)",
          }}
        >
          <GemilangLogo
            className="h-16 sm:h-20 md:h-24 lg:h-28 ml-auto opacity-85 pointer-events-none"
            textColor="rgba(255, 255, 255, 0.75)"
            alt="Gemilang"
          />
        </div>
      </div>

    </footer>
  );
}
