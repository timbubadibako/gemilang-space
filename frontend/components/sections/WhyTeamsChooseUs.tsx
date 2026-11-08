"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Globe, CheckSquare2, Gauge, Zap, PauseCircle, Award } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { squadMembers } from "@/data/site-content";
import { useCMS } from "@/lib/cms-context";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WhyTeamsChooseUsProps {
  lang: "id" | "en";
}

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
  const { cms } = useCMS();
  const bento = cms.bentoStats || {
    companiesCount: "40+ Perusahaan",
    companiesLabel: { id: "Mempercayakan infrastruktur ke squad kami.", en: "Trusting their software to our squad." },
    projectsCount: "150+ Proyek IT",
    projectsLabel: { id: "Telah sukses dirilis ke produksi.", en: "Successfully deployed to production." },
  };

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
                  Squad Inti 6 Engineer.
                  <br />
                  Tanpa Magang, Tanpa Alih Daya.
                </>
              ) : (
                <>
                  Dedicated 6-Engineer Squad.
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
                  Orang yang Anda temui di perencanaan adalah yang menulis baris kode produk Anda. 6 spesialis senior yang mengeksekusi langsung bersama.
                </>
              ) : (
                <>
                  The people you scope with are the exact engineers shipping your code. 6 senior specialists deploying directly to production.
                </>
              )}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3-COLUMN BENTO GRID                                            */}
        {/* ============================================================== */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 sm:mt-14 items-stretch lg:h-[840px]">
          
          {/* ============================================================ */}
          {/* COLUMN 1 (KIRI): Member 1 (Atas) & Member 2 (Bawah)          */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-3 h-full min-h-0">
            
            {/* 1.1 Kiri Atas: Founder & Lead Architect */}
            <div className="bento-card flex-[1.25] min-h-[300px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-end border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[0].image}
                  alt={squadMembers[0].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10">
                <span className={`text-[11px] font-mono font-semibold ${squadMembers[0].accentColor || "text-[#00E1BA]"} uppercase tracking-wider block mb-1`}>
                  {squadMembers[0].role[lang]}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {squadMembers[0].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {squadMembers[0].description[lang]}
                </p>
              </div>
            </div>

            {/* 1.2 Kiri Bawah: Principal Backend & Cloud */}
            <div className="bento-card flex-1 min-h-[250px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-end border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[1].image}
                  alt={squadMembers[1].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10">
                <span className={`text-[11px] font-mono font-semibold ${squadMembers[1].accentColor || "text-emerald-400"} uppercase tracking-wider block mb-1`}>
                  {squadMembers[1].role[lang]}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {squadMembers[1].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  {squadMembers[1].description[lang]}
                </p>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* COLUMN 2 (TENGAH): Metrik (2-Col) + Member 3 + Member 4 + Ticker */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-3 h-full min-h-0">
            
            {/* 2.1 Mini-Grid Metrik: 40+ Perusahaan & 150+ Proyek IT */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {/* Stat 1 */}
              <div className="bento-card rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 flex flex-col justify-between border border-neutral-200/80 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <Globe className="w-5 h-5 text-neutral-900 shrink-0" strokeWidth={1.75} />
                </div>
                <div className="mt-3 z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight leading-none">
                    {bento.companiesCount}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-1 leading-snug truncate">
                    {lang === "id" ? bento.companiesLabel.id : bento.companiesLabel.en}
                  </p>
                </div>
                <div className="w-16 h-16 absolute -right-2 -bottom-2 rotate-[-15deg] opacity-10 pointer-events-none">
                  <Globe className="w-full h-full text-neutral-900" strokeWidth={0.8} />
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bento-card rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 flex flex-col justify-between border border-neutral-200/80 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <CheckSquare2 className="w-5 h-5 text-neutral-900 shrink-0" strokeWidth={1.75} />
                </div>
                <div className="mt-3 z-10">
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight leading-none">
                    {bento.projectsCount}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-neutral-500 font-medium mt-1 leading-snug truncate">
                    {lang === "id" ? bento.projectsLabel.id : bento.projectsLabel.en}
                  </p>
                </div>
                <div className="w-16 h-16 absolute -right-2 -bottom-2 rotate-[-15deg] opacity-10 pointer-events-none">
                  <CheckSquare2 className="w-full h-full text-neutral-900" strokeWidth={0.8} />
                </div>
              </div>
            </div>

            {/* 2.2 Member 3: Frontend & Design Systems */}
            <div className="bento-card flex-1 min-h-[220px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-5 sm:p-6 flex flex-col justify-end border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[2].image}
                  alt={squadMembers[2].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10">
                <span className={`text-[10px] sm:text-[11px] font-mono font-semibold ${squadMembers[2].accentColor || "text-purple-400"} uppercase tracking-wider block mb-0.5`}>
                  {squadMembers[2].role[lang]}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {squadMembers[2].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed line-clamp-2">
                  {squadMembers[2].description[lang]}
                </p>
              </div>
            </div>

            {/* 2.3 Member 4: Hardware & POS Specialist */}
            <div className="bento-card flex-1 min-h-[220px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-5 sm:p-6 flex flex-col justify-end border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[3].image}
                  alt={squadMembers[3].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10">
                <span className={`text-[10px] sm:text-[11px] font-mono font-semibold ${squadMembers[3].accentColor || "text-amber-400"} uppercase tracking-wider block mb-0.5`}>
                  {squadMembers[3].role[lang]}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {squadMembers[3].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed line-clamp-2">
                  {squadMembers[3].description[lang]}
                </p>
              </div>
            </div>

            {/* 2.4 Tengah Bawah: Fast by Default ticker */}
            <div className="bento-card shrink-0 rounded-xl sm:rounded-2xl bg-[#F3F3F5] text-neutral-950 p-4 sm:p-5 flex items-center gap-3.5 border border-neutral-200/80 relative overflow-hidden h-[78px]">
              {/* Icon Container with GSAP animated transition */}
              <div 
                ref={tickerIconRef}
                className="w-9 h-9 rounded-xl bg-white border border-neutral-300/80 shadow-2xs flex items-center justify-center shrink-0 will-change-transform"
              >
                <TickerIcon className="w-4.5 h-4.5 text-neutral-950" strokeWidth={1.8} />
              </div>

              {/* Ticker Text Column */}
              <div className="min-w-0 flex-1 overflow-hidden relative h-10 flex flex-col justify-center">
                <div
                  ref={tickerContentRef}
                  className="flex flex-col justify-center will-change-transform"
                >
                  <h4 className="text-base sm:text-lg font-bold tracking-tight text-neutral-950 leading-tight">
                    {activeTicker.title}
                  </h4>
                  <p className="text-xs text-neutral-500 font-medium leading-none mt-0.5 truncate">
                    {activeTicker.subtitle[lang]}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================ */}
          {/* COLUMN 3 (KANAN): Member 5 (Atas) & Member 6 (Bawah)          */}
          {/* ============================================================ */}
          <div className="flex flex-col gap-3 h-full min-h-0 md:col-span-2 lg:col-span-1">
            
            {/* 3.1 Kanan Atas: Mobile & Core Systems */}
            <div className="bento-card flex-[1.25] min-h-[300px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-end border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[4].image}
                  alt={squadMembers[4].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10">
                <span className={`text-[11px] font-mono font-semibold ${squadMembers[4].accentColor || "text-cyan-400"} uppercase tracking-wider block mb-1`}>
                  {squadMembers[4].role[lang]}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  {squadMembers[4].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                  {squadMembers[4].description[lang]}
                </p>
              </div>
            </div>

            {/* 3.2 Kanan Bawah: AI & Automation Systems */}
            <div className="bento-card flex-1 min-h-[250px] lg:min-h-0 relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-950 text-white p-6 sm:p-7 flex flex-col justify-end border border-neutral-300/60 group select-none">
              <div className="absolute inset-0 z-0">
                <Image
                  src={squadMembers[5].image}
                  alt={squadMembers[5].name}
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-103 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />
              </div>

              <div className="relative z-10">
                <span className={`text-[11px] font-mono font-semibold ${squadMembers[5].accentColor || "text-rose-400"} uppercase tracking-wider block mb-1`}>
                  {squadMembers[5].role[lang]}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  {squadMembers[5].name}
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  {squadMembers[5].description[lang]}
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
