"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { navItems, siteSettings } from "@/data/site-content";

interface WorkProject {
  id: string;
  client: string;
  title: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  category: "Industrial IoT" | "E-Commerce" | "Civic Tech" | "EdTech & AI" | "Creative Agency";
  tags: string[];
  techStack: string[];
  imageUrl: string;
  impact: {
    id: string;
    en: string;
  };
  slug: string;
}

const workProjects: WorkProject[] = [
  {
    id: "david-beckham",
    client: "PT DAVID BECKHAM",
    category: "Industrial IoT",
    title: {
      id: "Sistem Web POS Timbangan Sawit & Integrasi Hardware RS232",
      en: "Palm Oil Weighing Web POS & RS232 Hardware Scale Integration",
    },
    description: {
      id: "Aplikasi POS offline-first dengan sinkronisasi WebSerial RS232 untuk timbangan truk pabrik kelapa sawit, pencetakan struk termal otomatis, dan sinkronisasi cloud real-time.",
      en: "Offline-first POS application with WebSerial RS232 hardware scale synchronization for palm oil weighing stations, thermal receipts, and real-time cloud sync.",
    },
    tags: ["OFFLINE-FIRST", "HARDWARE RS232", "INDUSTRIAL POS"],
    techStack: ["Next.js", "WebSerial API", "Dexie.js (IndexedDB)", "Supabase", "Tailwind CSS"],
    impact: {
      id: "100% tanpa delay input manual, zero-data-loss saat internet pabrik padam",
      en: "Zero manual data-entry delays, 100% resilient during factory network drops",
    },
    imageUrl: "https://framerusercontent.com/images/vXAw0vDR2T0nBNxyGAT7m8yEDrs.jpg?width=3200&height=2400",
    slug: "david-beckham",
  },
  {
    id: "fermion-roastery",
    client: "FERMION ROASTERY",
    category: "E-Commerce",
    title: {
      id: "Platform E-Commerce Specialty Coffee & Subscription Engine",
      en: "Specialty Coffee E-Commerce Platform & Subscription Engine",
    },
    description: {
      id: "Toko daring specialty coffee berkecepatan tinggi dengan kalkulator grind size interaktif, langganan biji kopi otomatis bulanan, dan integrasi payment gateway Xendit.",
      en: "High-speed specialty coffee storefront with interactive grind selector, automated monthly bean subscriptions, and seamless payment gateway integration.",
    },
    tags: ["SPECIALTY COMMERCE", "SUBSCRIPTION ENGINE", "TRANSACTIONAL EMAIL"],
    techStack: ["Next.js 15", "Tailwind CSS v4", "Resend API", "Xendit", "Supabase"],
    impact: {
      id: "Skor PageSpeed 98+, konversi pesanan kopi naik 2.4x lipat dalam 30 hari",
      en: "98+ PageSpeed score, 2.4x customer order conversion within 30 days",
    },
    imageUrl: "https://framerusercontent.com/images/glIJQjGjPLjFvclK2dzCQMcXXU.jpg?width=3200&height=2400",
    slug: "fermion-roastery",
  },
  {
    id: "desa-digital",
    client: "PEMERINTAH DESA & DISKOMINFO",
    category: "Civic Tech",
    title: {
      id: "Portal Pelayanan Mandiri Warga & Kependudukan Cerdas Desa",
      en: "Smart Village Citizen Self-Service & Population Registry Platform",
    },
    description: {
      id: "Sistem administrasi desa modern dengan pembuatan surat keterangan instan ber-QR code legalitas, pemetaan bansos transparan, dan database kependudukan terenkripsi.",
      en: "Modern civic service portal with instant QR-verified legal letters, transparent welfare distribution mapping, and encrypted citizen records.",
    },
    tags: ["CIVIC TECH", "E-GOVERNMENT", "PUBLIC SERVICES"],
    techStack: ["Next.js", "PostgreSQL (Supabase)", "Tailwind CSS", "PDF Engine", "Cloudflare"],
    impact: {
      id: "Waktu pembuatan surat warga dipersingkat dari 2 hari menjadi 3 menit",
      en: "Citizen document issuance time reduced from 2 days to under 3 minutes",
    },
    imageUrl: "https://framerusercontent.com/images/f2TBOrrRIY5dcoWQ72exps1cHlo.jpg?width=3200&height=2400",
    slug: "desa-digital",
  },
  {
    id: "pesantren-os",
    client: "YAYASAN PONDOK PESANTREN & EDTECH",
    category: "EdTech & AI",
    title: {
      id: "Sistem Manajemen Pesantren & Asisten Murajaah Voice AI",
      en: "Islamic Education Management OS & Voice-AI Murajaah Assistant",
    },
    description: {
      id: "Platform operasional santri terpadu mencakup buku kas SPP virtual, izin santri realtime via WhatsApp bot Baileys, serta engine AI murajaah pengenal makhraj suara.",
      en: "Unified boarding school management OS featuring virtual tuition ledgers, Baileys WhatsApp parent notifications, and speech-AI murajaah recitation verification.",
    },
    tags: ["EDTECH OS", "VOICE AI", "WHATSAPP AUTOMATION"],
    techStack: ["React Native / Flutter", "Next.js", "Whisper AI", "PocketBase", "Baileys"],
    impact: {
      id: "Membantu 500+ santri belajar mandiri dengan verifikasi tajwid otomatis",
      en: "Empowering 500+ students with automated voice tajweed checks & grading",
    },
    imageUrl: "https://framerusercontent.com/images/Nu0cRFLjMAItqhIVN0g649mMTM.jpg?width=3200&height=2400",
    slug: "pesantren-os",
  },
  {
    id: "fourjective",
    client: "FOURJECTIVE CREATIVE",
    category: "Creative Agency",
    title: {
      id: "Platform Showcase Agensi Kreatif & Production House",
      en: "Creative Production House Showcase & Agency Portfolio",
    },
    description: {
      id: "Website portofolio beranimasi sinematik ultra-fluid dengan pemutaran showreel 60fps tanpa lagging, micro-interaction GSAP, dan katalog karya visual resolusi tinggi.",
      en: "Cinematic ultra-fluid portfolio with stutter-free 60fps showreel streaming, tailored GSAP micro-interactions, and high-density visual media galleries.",
    },
    tags: ["CREATIVE STUDIO", "CINEMATIC WEB", "GSAP MOTION"],
    techStack: ["Next.js", "GSAP ScrollTrigger", "Tailwind CSS", "Cloudflare Stream"],
    impact: {
      id: "Presentasi pitch agensi profesional dengan waktu muat halaman < 0.8 detik",
      en: "Professional client pitch presentation tool with < 0.8s load times",
    },
    imageUrl: "https://framerusercontent.com/images/SvJuN95HnCUIYI9jnQM94YpDs.jpg?width=3200&height=2400",
    slug: "fourjective",
  },
  {
    id: "qiyar-media",
    client: "QIYAR MEDIA GROUP",
    category: "E-Commerce",
    title: {
      id: "Platform Penerbitan Media Digital & Otomasi Distribusi Konten",
      en: "Digital Media Publishing Platform & Content Distribution Automation",
    },
    description: {
      id: "Portal berita dan multimedia berkinerja tinggi dengan sistem caching edge global Cloudflare, optimasi Google Core Web Vitals, dan integrasi monetisasi iklan bersih.",
      en: "High-throughput digital publishing portal with global Cloudflare edge caching, perfect Google Core Web Vitals, and clean non-intrusive monetization blocks.",
    },
    tags: ["DIGITAL MEDIA", "HIGH CONCURRENCY", "EDGE CACHING"],
    techStack: ["Next.js App Router", "Cloudflare R2", "Tailwind CSS", "Postgres"],
    impact: {
      id: "Mampu menangani 50,000+ pembaca bersamaan tanpa lonjakan biaya server",
      en: "Seamlessly handles 50,000+ concurrent readers with near-zero infra costs",
    },
    imageUrl: "https://framerusercontent.com/images/vmp26uS1fzAEOVbdH19mrf2bnw.jpg?width=3200&height=2400",
    slug: "qiyar-media",
  },
];

const categories = ["Semua", "Industrial IoT", "E-Commerce", "Civic Tech", "EdTech & AI", "Creative Agency"] as const;

export default function WorksPage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");

  const filteredProjects =
    selectedCategory === "Semua"
      ? workProjects
      : workProjects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 selection:bg-[#00E1BA] selection:text-white flex flex-col font-sans">
      {/* Light Navbar */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
        theme="light"
      />

      {/* Main Selected Works Gallery */}
      <main className="w-full flex-1 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
          
          {/* Eyebrow & Title */}
          <div className="max-w-[820px] mx-auto text-center mb-12 sm:mb-16 select-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-mono font-medium text-neutral-600 uppercase mb-4 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
              {lang === "id" ? "Portofolio Sistem Riil" : "Real Production Systems"}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.12]">
              {lang === "id"
                ? "Sistem digital yang benar-benar beroperasi di lapangan."
                : "Digital systems actually operating in production."}
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed max-w-2xl mx-auto font-normal">
              {lang === "id"
                ? "Dari POS timbangan pabrik industri sawit hingga platform e-commerce dan sistem informasi desa. Dibangun dengan standar rekayasa bersih, kecepatan maksimal, dan arsitektur hemat biaya."
                : "From industrial hardware-integrated POS to high-velocity e-commerce and civic governance platforms. Built with clean engineering, maximum speed, and ultra-lean architecture."}
            </p>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? "bg-neutral-950 text-white font-semibold shadow-xs"
                        : "bg-[#F3F4F6] text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/80 border border-neutral-200/60"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Works Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 sm:gap-9 lg:gap-10">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-400 p-6 sm:p-7 transition-all duration-300 shadow-xs hover:shadow-md relative overflow-hidden"
              >
                {/* Visual Image Preview Box */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/80 mb-6">
                  <Image
                    src={project.imageUrl}
                    alt={project.title[lang]}
                    fill
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  
                  {/* Category Pill Tag on Top Left */}
                  <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[11px] font-mono font-medium text-neutral-800 shadow-xs">
                    {project.category}
                  </div>

                  {/* WhatsApp Quick Inquire Arrow */}
                  <a
                    href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
                      `Halo Gemilang Space, saya tertarik dengan arsitektur proyek "${project.title[lang]}" (${project.client}). Bisa kita diskusikan solusinya untuk kebutuhan kami?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xs hover:scale-110"
                    aria-label="Tanya tentang proyek ini"
                  >
                    <ArrowUpRight className="w-4 h-4 text-neutral-900" />
                  </a>
                </div>

                {/* Client & Title Header */}
                <div className="space-y-2 mb-4">
                  <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-neutral-500 font-semibold">
                    {project.client}
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight group-hover:text-neutral-700 transition-colors leading-snug">
                    {project.title[lang]}
                  </h2>

                  <p className="text-xs sm:text-[13.5px] text-neutral-600 font-normal leading-relaxed">
                    {project.description[lang]}
                  </p>
                </div>

                {/* Impact Highlight Box */}
                <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-700 flex items-start gap-2 mb-5">
                  <span className="text-neutral-950 font-bold shrink-0">✦ Dampak:</span>
                  <span className="leading-relaxed">{project.impact[lang]}</span>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-auto pt-4 border-t border-neutral-200/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10.5px] font-mono px-2.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={`https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(
                      `Halo Gemilang Space, saya ingin konsultasi sistem seperti "${project.title[lang]}" (${project.client}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-950 hover:underline shrink-0"
                  >
                    <span>Konsultasi Pola Ini</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Aurora Call To Action Banner */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Dark Footer */}
      <Footer lang={lang} />
    </div>
  );
}
