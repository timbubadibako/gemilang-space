"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Globe, CheckSquare2, Gauge, Zap, PauseCircle, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WhyTeamsChooseUsProps {
  lang: "id" | "en";
}

// 5 Squad Member Profiles (No Interns, 100% Core Senior Builders)
const squadMembers = [
  {
    role: "Founder & Lead Architect",
    name: "Chatto",
    tag: "@itschatto",
    image: "/founder.png",
    pos: "col-1-top", // Kiri Atas
  },
  {
    role: "Principal Backend & DevOps",
    name: "Devon",
    tag: "Go / Cloud / Security",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    pos: "col-1-bottom", // Kiri Bawah
  },
  {
    role: "Full-Stack & Web Architect",
    name: "Alex",
    tag: "Next.js / TypeScript",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    pos: "col-2-center", // Tengah
  },
  {
    role: "Mobile & Core Systems",
    name: "Rian",
    tag: "Flutter / iOS / Android",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    pos: "col-3-top", // Kanan Atas
  },
  {
    role: "AI & Data Engineer",
    name: "Maya",
    tag: "Python / LLMs / Agents",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    pos: "col-3-bottom", // Kanan Bawah
  },
];

// Exact Beew ticker items
const tickerItems = [
  {
    icon: Gauge,
    title: "Senior",
    subtitle: { id: "Sejak hari pertama.", en: "From day one." },
  },
  {
    icon: Zap,
    title: "Fast",
    subtitle: { id: "Secara bawaan.", en: "By default." },
  },
  {
    icon: PauseCircle,
    title: "Pause",
    subtitle: { id: "Atau batalkan kapan saja.", en: "or cancel anytime." },
  },
  {
    icon: Award,
    title: "Top-notch",
    subtitle: { id: "Kualitas software terdepan.", en: "Software quality." },
  },
];

export function WhyTeamsChooseUs({ lang }: WhyTeamsChooseUsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Rotating ticker index (switching every 2.8 seconds smoothly via GSAP)
  const [tickerIdx, setTickerIdx] = useState(0);
  const tickerContentRef = useRef<HTMLDivElement>(null);
  const tickerIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!tickerContentRef.current || !tickerIconRef.current) {
        setTickerIdx((prev) => (prev + 1) % tickerItems.length);
        return;
      }

      // GSAP smooth vertical sliding transition
      const tl = gsap.timeline();
      tl.to([tickerContentRef.current, tickerIconRef.current], {
        y: -16,
        opacity: 0,
        duration: 0.28,
        ease: "power2.in",
        onComplete: () => {
          setTickerIdx((prev) => (prev + 1) % tickerItems.length);
        },
      });
      tl.fromTo(
        [tickerContentRef.current, tickerIconRef.current],
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.38,
          ease: "power2.out",
        }
      );
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  // GSAP ScrollTrigger for section entry
  useEffect(() => {
    if (!containerRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        ".why-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Bento cards staggered pop-in
      const cards = gridRef.current?.querySelectorAll(".bento-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  const activeTicker = tickerItems[tickerIdx];
  const TickerIcon = activeTicker.icon;

  return (
    <section
      id="why-us"
      ref={containerRef}
      className="relative w-full bg-white text-neutral-950 py-16 sm:py-24 lg:py-28 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="why-header flex flex-col md:flex-row md:items-end justify-between gap-5 lg:gap-12">
          {/* Left: Eyebrow + Headline */}
          <div className="max-w-2xl">
            <p className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.08em] text-neutral-400 uppercase">
              {lang === "id" ? "MENGAPA TIM MEMILIH GEMILANG" : "WHY TEAMS CHOOSE GEMILANG"}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold tracking-[-0.04em] text-neutral-950 leading-[1.12] mt-2.5">
              {lang === "id" ? (
                <>
                  Squad Inti 5 Engineer.
                  <br />
                  Tanpa Magang, Tanpa Alih Daya.
                </>
              ) : (
                <>
                  Dedicated 5-Engineer Squad.
                  <br />
                  Zero Interns, Zero Outsourcing.
                </>
              )}
            </h2>
          </div>

          {/* Right: Subtitle */}
          <div className="text-neutral-600 text-xs sm:text-[13.5px] leading-relaxed max-w-sm md:text-right font-normal pb-1">
            <p>
              {lang === "id" ? (
                <>
                  Orang yang Anda temui di perencanaan adalah yang menulis baris kode produk Anda. 5 spesialis senior yang mengeksekusi langsung bersama.
                </>
              ) : (
                <>
                  The people you scope with are the exact engineers shipping your code. 5 senior specialists deploying directly to production.
                </>
              )}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3-COLUMN BENTO GRID                                            */}
        {/* ============================================================== */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 sm:mt-14 items-stretch lg:h-[780px]">
          
          {/* ============================================================ */}
          {/* COLUMN 1 (KIRI): Foto 1 (Atas) & Foto 2 (Bawah)              */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-3 h-full min-h-0">
            
            {/* 1.1 Kiri Atas: Founder & Lead Architect */}
            <div className="bento-card flex-[1.4] min-h-[320px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-between border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[0].image}
                  alt={squadMembers[0].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  {squadMembers[0].tag}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">SQUAD 01</span>
              </div>

              <div className="relative z-10">
                <span className="text-[11px] font-mono font-semibold text-[#38BDF8] uppercase tracking-wider block mb-1">
                  {squadMembers[0].role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {squadMembers[0].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {lang === "id" ? "Memimpin arah arsitektur & delivery langsung." : "Leading overall architecture and code delivery."}
                </p>
              </div>
            </div>

            {/* 1.2 Kiri Bawah: Principal Backend & DevOps */}
            <div className="bento-card flex-1 min-h-[260px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-between border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[1].image}
                  alt={squadMembers[1].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {squadMembers[1].tag}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">SQUAD 02</span>
              </div>

              <div className="relative z-10">
                <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                  {squadMembers[1].role}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {squadMembers[1].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  {lang === "id" ? "Arsitektur cloud, skalabilitas server & keamanan." : "Cloud infrastructure, scalability & security."}
                </p>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* COLUMN 2 (TENGAH): Metrik Atas + Foto 3 (Tengah) + Stat Bawah*/}
          {/* ============================================================ */}
          <div className="flex flex-col gap-3 h-full min-h-0">
            
            {/* 2.1 Tengah Atas 1: Dipercaya oleh Brand/Perusahaan */}
            <div className="bento-card shrink-0 rounded-xl sm:rounded-2xl bg-white p-5 sm:p-5.5 flex items-center justify-between border border-neutral-200/80 relative overflow-hidden">
              <div className="flex items-center gap-3.5 z-10">
                <Globe className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-900 shrink-0" strokeWidth={1.75} />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-none">
                    40+ Perusahaan
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-500 font-medium mt-1">
                    {lang === "id" ? "Mempercayakan infrastruktur ke squad kami." : "Trusting their software to our squad."}
                  </p>
                </div>
              </div>
              <div className="w-20 h-20 absolute -right-2 top-1/2 -translate-y-1/2 rotate-[-15deg] opacity-15 pointer-events-none">
                <Globe className="w-full h-full text-neutral-900" strokeWidth={0.8} />
              </div>
            </div>

            {/* 2.2 Tengah Atas 2: Telah mengerjakan ratusan project */}
            <div className="bento-card shrink-0 rounded-xl sm:rounded-2xl bg-white p-5 sm:p-5.5 flex items-center gap-3.5 border border-neutral-200/80">
              <CheckSquare2 className="w-6 h-6 sm:w-7 sm:h-7 text-neutral-900 shrink-0" strokeWidth={1.75} />
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight leading-none">
                  150+ Proyek IT
                </h3>
                <p className="text-xs sm:text-[13px] text-neutral-500 font-medium mt-1">
                  {lang === "id" ? "Telah sukses dirilis ke produksi." : "Successfully deployed to production."}
                </p>
              </div>
            </div>

            {/* 2.3 Tengah: Foto 3 - Full-Stack & Web Architect */}
            <div className="bento-card flex-1 min-h-[220px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-between border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[2].image}
                  alt={squadMembers[2].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  {squadMembers[2].tag}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">SQUAD 03</span>
              </div>

              <div className="relative z-10">
                <span className="text-[11px] font-mono font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                  {squadMembers[2].role}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {squadMembers[2].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  {lang === "id" ? "Rekayasa web enterprise & performa frontend tajam." : "Enterprise web applications & reactive performance."}
                </p>
              </div>
            </div>

            {/* 2.4 Tengah Bawah: Fast by Default (Clean White Card matching Beew with smooth vertical ticker) */}
            <div className="bento-card shrink-0 rounded-xl sm:rounded-2xl bg-[#F3F3F5] text-neutral-950 p-5 sm:p-5.5 flex items-center gap-4 border border-neutral-200/80 relative overflow-hidden h-[88px]">
              {/* Icon Container with GSAP animated transition */}
              <div 
                ref={tickerIconRef}
                className="w-10 h-10 rounded-xl bg-white border border-neutral-300/80 shadow-2xs flex items-center justify-center shrink-0 will-change-transform"
              >
                <TickerIcon className="w-5 h-5 text-neutral-950" strokeWidth={1.8} />
              </div>

              {/* Ticker Text Column: GSAP animated vertical slide */}
              <div className="min-w-0 flex-1 overflow-hidden relative h-11 flex flex-col justify-center">
                <div
                  ref={tickerContentRef}
                  className="flex flex-col justify-center will-change-transform"
                >
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-neutral-950 leading-tight">
                    {activeTicker.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-neutral-500 font-medium leading-none mt-0.5 truncate">
                    {activeTicker.subtitle[lang]}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* COLUMN 3 (KANAN): Foto 4 (Atas) & Foto 5 (Bawah)             */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-3 h-full min-h-0 md:col-span-2 lg:col-span-1">
            
            {/* 3.1 Kanan Atas: Mobile & Core Systems */}
            <div className="bento-card flex-[1.4] min-h-[320px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-between border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[3].image}
                  alt={squadMembers[3].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {squadMembers[3].tag}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">SQUAD 04</span>
              </div>

              <div className="relative z-10">
                <span className="text-[11px] font-mono font-semibold text-cyan-400 uppercase tracking-wider block mb-1">
                  {squadMembers[3].role}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {squadMembers[3].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {lang === "id" ? "Aplikasi mobile lintas platform, offline-sync & native UX." : "Cross-platform mobile apps, offline sync & native UX."}
                </p>
              </div>
            </div>

            {/* 3.2 Kanan Bawah: AI & Data Engineer */}
            <div className="bento-card flex-1 min-h-[260px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-between border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[4].image}
                  alt={squadMembers[4].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  {squadMembers[4].tag}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">SQUAD 05</span>
              </div>

              <div className="relative z-10">
                <span className="text-[11px] font-mono font-semibold text-amber-400 uppercase tracking-wider block mb-1">
                  {squadMembers[4].role}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {squadMembers[4].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  {lang === "id" ? "Integrasi LLM, agen otonom & data pipeline cerdas." : "LLM integrations, autonomous agents & intelligent pipelines."}
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyTeamsChooseUs;
