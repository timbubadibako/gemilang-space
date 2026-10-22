"use client";

import React, { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceComparisonProps {
  lang: "id" | "en";
}

type CellStatus = "check" | "cross" | "question";

interface ComparisonRow {
  label: { id: string; en: string };
  saas: CellStatus;
  softwareHouse: CellStatus;
  gemilangLabs: CellStatus;
}

const comparisonData: ComparisonRow[] = [
  {
    label: {
      id: "Biaya awal terjangkau (Mulai Rp 1.5 Jt)",
      en: "Affordable upfront cost (From IDR 1.5M)",
    },
    saas: "question",
    softwareHouse: "cross",
    gemilangLabs: "check",
  },
  {
    label: {
      id: "Sistem siap pakai & cepat (3 - 5 hari kerja)",
      en: "Fast delivery (3 - 5 business days)",
    },
    saas: "check",
    softwareHouse: "cross",
    gemilangLabs: "check",
  },
  {
    label: {
      id: "Managed deployment (Server & teknis 100% diurus)",
      en: "Fully managed deployment (Zero server hassle)",
    },
    saas: "check",
    softwareHouse: "cross",
    gemilangLabs: "check",
  },
  {
    label: {
      id: "Kustomisasi fleksibel sesuai alur bisnis nyata",
      en: "Custom-tailored to real business workflows",
    },
    saas: "cross",
    softwareHouse: "check",
    gemilangLabs: "check",
  },
  {
    label: {
      id: "Tanpa biaya bulanan fitur terkunci",
      en: "No recurring paywalls for core features",
    },
    saas: "cross",
    softwareHouse: "check",
    gemilangLabs: "check",
  },
  {
    label: {
      id: "Fleksibel hosting & domain (Bebas lanjut atau stop)",
      en: "Flexible domain & hosting (Zero penalty if stopped)",
    },
    saas: "cross",
    softwareHouse: "question",
    gemilangLabs: "check",
  },
  {
    label: {
      id: "Pendampingan staf & garansi bug-free 30 hari",
      en: "Staff onboarding & 30-day bug-free warranty",
    },
    saas: "cross",
    softwareHouse: "question",
    gemilangLabs: "check",
  },
];

export function ServiceComparison({ lang }: ServiceComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !rowsRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header fade & slide up
      gsap.fromTo(
        ".comparison-header",
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

      // 2. Staggered reveal for comparison rows
      const rows = rowsRef.current?.querySelectorAll(".comparison-row");
      if (rows && rows.length > 0) {
        gsap.fromTo(
          rows,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // 3. Subtle glow pulse on Gemilang column capsules
      const gemilangCells = rowsRef.current?.querySelectorAll(".gemilang-cell");
      if (gemilangCells && gemilangCells.length > 0) {
        gsap.fromTo(
          gemilangCells,
          { scale: 0.95, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 75%",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  // Render status icon helper
  const renderStatusIcon = (status: CellStatus, isGemilang: boolean = false) => {
    if (isGemilang) {
      return (
        <Check
          className="w-5 h-5 text-[var(--theme-accent)] drop-shadow-[0_0_10px_var(--theme-accent-glow)]"
          strokeWidth={2.8}
        />
      );
    }

    switch (status) {
      case "check":
        return (
          <Check
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-neutral-300"
            strokeWidth={2.4}
          />
        );
      case "cross":
        return (
          <X
            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#505464]"
            strokeWidth={2.2}
          />
        );
      case "question":
        return (
          <div className="w-5 h-5 rounded-full border border-[#444758] text-[#868A9E] flex items-center justify-center text-[11px] font-semibold select-none">
            ?
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="comparison"
      ref={containerRef}
      className="relative w-full bg-[#04060A] text-white py-20 sm:py-28 lg:py-32 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="comparison-header flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-12">
          {/* Left: Eyebrow + Headline */}
          <div className="max-w-2xl">
            <p className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.08em] text-[var(--theme-accent)] uppercase">
              {lang === "id" ? "PERBANDINGAN SOLUSI DIGITAL BISNIS" : "DIGITAL SOLUTION COMPARISON"}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold tracking-[-0.04em] text-white leading-[1.12] mt-3">
              {lang === "id" ? (
                <>
                  Mengapa memilih Gemilang
                  <br />
                  dibanding SaaS kaku atau software house mahal?
                </>
              ) : (
                <>
                  Why choose Gemilang
                  <br />
                  over rigid SaaS or expensive software houses?
                </>
              )}
            </h2>
          </div>

          {/* Right: Subtitle */}
          <div className="text-xs sm:text-[13.5px] text-[#A1A1AA] font-normal pb-1 max-w-sm">
            <p>
              {lang === "id" ? (
                <>
                  Solusi praktis dan hemat biaya. Anda fokus pada penjualan dan operasional,{" "}
                  seluruh deployment dan infrastruktur teknis <span className="font-semibold text-white">kami yang kelola penuh</span>.
                </>
              ) : (
                <>
                  A practical and cost-effective approach. Focus on sales and operations while{" "}
                  deployment and technical infrastructure are <span className="font-semibold text-white">fully managed by us</span>.
                </>
              )}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COMPARISON TABLE CONTAINER (Horizontally scrollable on mobile) */}
        {/* ============================================================== */}
        <div className="mt-12 sm:mt-16 overflow-x-auto pb-4 scrollbar-none">
          <div className="min-w-[760px] lg:min-w-0">
            
            {/* Table Header: Column Labels */}
            <div className="grid grid-cols-12 items-center pl-6 pr-2 pb-4">
              {/* Column 1: Criteria */}
              <div className="col-span-5 pr-3">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  {lang === "id" ? "Kriteria Kebutuhan" : "Criteria"}
                </span>
              </div>

              {/* Column 2: SaaS Langganan */}
              <div className="col-span-2 text-center">
                <span className="text-xs sm:text-sm font-medium text-neutral-400">
                  {lang === "id" ? "SaaS Langganan" : "Subscription SaaS"}
                </span>
              </div>

              {/* Column 3: Software House Konvensional */}
              <div className="col-span-2 text-center">
                <span className="text-xs sm:text-sm font-medium text-neutral-400">
                  {lang === "id" ? "Software House" : "Software House"}
                </span>
              </div>

              {/* Column 4: Gemilang (Highlighted Pill matching exact cell width) */}
              <div className="col-span-3 text-center">
                <div className="bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/40 text-[var(--theme-accent)] font-semibold text-center rounded-lg sm:rounded-xl py-2 px-3 text-xs sm:text-sm tracking-tight shadow-md flex items-center justify-center">
                  Gemilang (Managed)
                </div>
              </div>
            </div>

            {/* Table Body: Comparison Rows with GSAP animation */}
            <div ref={rowsRef} className="space-y-2.5">
              {comparisonData.map((row, index) => (
                <div
                  key={index}
                  className="comparison-row grid grid-cols-12 items-center bg-[#0D1017] hover:bg-[#121622] border border-white/10 hover:border-white/20 rounded-xl sm:rounded-2xl pl-6 pr-2 py-2 transition-all duration-200"
                >
                  {/* Criteria Label */}
                  <div className="col-span-5 pr-3 py-1.5">
                    <span className="text-xs sm:text-[14px] font-medium text-white/95">
                      {row.label[lang]}
                    </span>
                  </div>

                  {/* SaaS Column */}
                  <div className="col-span-2 flex items-center justify-center py-1.5">
                    {renderStatusIcon(row.saas)}
                  </div>

                  {/* Software House Column */}
                  <div className="col-span-2 flex items-center justify-center py-1.5">
                    {renderStatusIcon(row.softwareHouse)}
                  </div>

                  {/* Gemilang Column (Flush Capsule inside Row) */}
                  <div className="gemilang-cell col-span-3 flex items-center justify-center py-2.5 bg-[var(--theme-accent)]/10 rounded-lg sm:rounded-xl border border-[var(--theme-accent)]/30 shadow-[0_0_16px_var(--theme-accent-glow)]">
                    {renderStatusIcon(row.gemilangLabs, true)}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default ServiceComparison;
