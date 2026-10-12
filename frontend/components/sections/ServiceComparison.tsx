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
  freelancer: CellStatus;
  traditionalAgency: CellStatus;
  inHouseHire: CellStatus;
  gemilangLabs: CellStatus;
}

const comparisonData: ComparisonRow[] = [
  {
    label: { id: "Mulai cepat (< 48 jam siap sprint)", en: "Start quickly (< 48h sprint-ready)" },
    freelancer: "check",
    traditionalAgency: "cross",
    inHouseHire: "cross",
    gemilangLabs: "check",
  },
  {
    label: { id: "Kualitas engineer senior & tech lead teruji", en: "Vetted senior engineers & tech leads" },
    freelancer: "question",
    traditionalAgency: "question",
    inHouseHire: "check",
    gemilangLabs: "check",
  },
  {
    label: { id: "Cakupan full-stack (Web, Mobile, AI, Cloud)", en: "Full-stack scope (Web, Mobile, AI, Cloud)" },
    freelancer: "question",
    traditionalAgency: "check",
    inHouseHire: "question",
    gemilangLabs: "check",
  },
  {
    label: { id: "100% kepemilikan source code & IP tanpa lock-in", en: "100% source code & IP ownership" },
    freelancer: "check",
    traditionalAgency: "question",
    inHouseHire: "check",
    gemilangLabs: "check",
  },
  {
    label: { id: "Fleksibel scale-up atau pause kapasitas bulanan", en: "Scale-up or pause squad capacity monthly" },
    freelancer: "check",
    traditionalAgency: "cross",
    inHouseHire: "cross",
    gemilangLabs: "check",
  },
  {
    label: { id: "Komunikasi langsung ke engineer (Slack/Discord)", en: "Direct engineer communication (Slack/Discord)" },
    freelancer: "check",
    traditionalAgency: "cross",
    inHouseHire: "check",
    gemilangLabs: "check",
  },
  {
    label: { id: "Jaminan SLA keamanan, audit, & zero-downtime", en: "Security SLA, code audit & zero-downtime" },
    freelancer: "cross",
    traditionalAgency: "question",
    inHouseHire: "question",
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
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rowsRef.current,
              start: "top 75%",
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
          className="w-5 h-5 text-[#38BDF8] drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]"
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
            <p className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.08em] text-[#CAD0DC]/70 uppercase">
              {lang === "id" ? "PERBANDINGAN MODEL EKSEKUSI" : "ENGAGEMENT COMPARISON"}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold tracking-[-0.04em] text-white leading-[1.12] mt-3">
              {lang === "id" ? (
                <>
                  Mengapa harus menanggung
                  <br />
                  beban rekrutmen & manajemen dari nol?
                </>
              ) : (
                <>
                  Why bear the burden of
                  <br />
                  hiring tech teams from scratch?
                </>
              )}
            </h2>
          </div>

          {/* Right: Subtitle */}
          <div className="text-xs sm:text-[13.5px] text-[#717784] font-normal pb-1 max-w-sm">
            <p>
              {lang === "id" ? (
                <>
                  Perbandingan objektif antara opsi rekayasa software tradisional vs keandalan{" "}
                  <span className="font-semibold text-white">Gemilang IT Solutions</span>.
                </>
              ) : (
                <>
                  An objective comparison between traditional engineering setups and{" "}
                  <span className="font-semibold text-white">Gemilang IT Solutions</span>.
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
            <div className="grid grid-cols-12 items-center px-6 pb-4">
              {/* Column 1: Spacer for Criteria */}
              <div className="col-span-4" />

              {/* Column 2: Freelancer */}
              <div className="col-span-2 text-center">
                <span className="text-xs sm:text-sm font-medium text-neutral-400">
                  Freelancer
                </span>
              </div>

              {/* Column 3: Traditional Agency */}
              <div className="col-span-2 text-center">
                <span className="text-xs sm:text-sm font-medium text-neutral-400">
                  {lang === "id" ? "Agensi Tradisional" : "Traditional Agency"}
                </span>
              </div>

              {/* Column 4: In-house hire */}
              <div className="col-span-2 text-center">
                <span className="text-xs sm:text-sm font-medium text-neutral-400">
                  {lang === "id" ? "Rekrut Internal" : "In-house Hire"}
                </span>
              </div>

              {/* Column 5: Gemilang Space (Highlighted Pill) */}
              <div className="col-span-2 text-center">
                <div className="bg-[#0D153A] border border-[#202E6E] text-[#38BDF8] font-semibold text-center rounded-xl py-2 px-3 text-xs sm:text-sm tracking-tight shadow-md flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse" />
                  Gemilang
                </div>
              </div>
            </div>

            {/* Table Body: Comparison Rows with GSAP animation */}
            <div ref={rowsRef} className="space-y-2.5">
              {comparisonData.map((row, index) => (
                <div
                  key={index}
                  className="comparison-row grid grid-cols-12 items-center bg-[#0D1017] hover:bg-[#121622] border border-white/10 hover:border-white/20 rounded-xl sm:rounded-2xl px-6 py-3.5 transition-all duration-200"
                >
                  {/* Criteria Label */}
                  <div className="col-span-4 pr-3">
                    <span className="text-xs sm:text-[14px] font-medium text-white/95">
                      {row.label[lang]}
                    </span>
                  </div>

                  {/* Freelancer Column */}
                  <div className="col-span-2 flex items-center justify-center">
                    {renderStatusIcon(row.freelancer)}
                  </div>

                  {/* Traditional Agency Column */}
                  <div className="col-span-2 flex items-center justify-center">
                    {renderStatusIcon(row.traditionalAgency)}
                  </div>

                  {/* In-house hire Column */}
                  <div className="col-span-2 flex items-center justify-center">
                    {renderStatusIcon(row.inHouseHire)}
                  </div>

                  {/* Gemilang Space Column (Electric Navy Capsule with GSAP pop) */}
                  <div className="gemilang-cell col-span-2 flex items-center justify-center -my-3.5 py-3.5 bg-[#0D153A] rounded-xl border border-[#202E6E]/60 shadow-[0_0_18px_rgba(32,46,110,0.35)]">
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
