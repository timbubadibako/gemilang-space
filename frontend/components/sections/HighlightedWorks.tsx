"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface HighlightedWorksProps {
  lang: "id" | "en";
  whatsappNumber: string;
}

interface ProjectPanelData {
  id: string;
  client: string;
  category: string;
  title: { id: string; en: string };
  badge: { id: string; en: string };
  tags: string[];
  imageUrl: string;
  bgColor: string;
  caseUrl: string;
}

const projects: ProjectPanelData[] = [
  {
    id: "5u-ai",
    client: "5U AI",
    category: "SAAS / B2B",
    title: {
      id: "Tenaga kerja AI untuk industri kargo & logistik",
      en: "AI workforce for freight teams",
    },
    badge: {
      id: "5U AI RAIH US $3.2M",
      en: "5U AI RAISES US $3.2M",
    },
    tags: ["UI/UX DESIGN", "LANDING PAGE", "ANIMATION & MICRO INTERACTION"],
    imageUrl: "https://framerusercontent.com/images/UmsGTar3Kym230FQvHG4LGFfnE.jpg?width=3200&height=2400",
    bgColor: "#FFFFFF",
    caseUrl: "#works",
  },
  {
    id: "mindsphere",
    client: "MINDSPHERE",
    category: "AI / WEB3",
    title: {
      id: "Platform agen kecerdasan buatan terdesentralisasi",
      en: "Blockchain AI agent platform",
    },
    badge: {
      id: "RAIH $4.5M PRE-SEED",
      en: "RAISED $4.5M PRE-SEED",
    },
    tags: ["AI AGENTS", "WEB3 PLATFORM", "LANDING PAGE"],
    imageUrl: "https://framerusercontent.com/images/SvJuN95HnCUIYI9jnQM94YpDs.jpg?width=3200&height=2400",
    bgColor: "#F3F5F9",
    caseUrl: "#works",
  },
  {
    id: "efficense",
    client: "EFFICENSE",
    category: "ENTERPRISE SAAS",
    title: {
      id: "Alat optimasi performa dan analitik sistem IT",
      en: "IT performance optimization tools",
    },
    badge: {
      id: "DIPAKAI 500+ PERUSAHAAN",
      en: "500+ ENTERPRISE CLIENTS",
    },
    tags: ["B2B SAAS", "DASHBOARD DESIGN", "FRAMER DEVELOPMENT"],
    imageUrl: "https://framerusercontent.com/images/vXAw0vDR2T0nBNxyGAT7m8yEDrs.jpg?width=3200&height=2400",
    bgColor: "#FFFFFF",
    caseUrl: "#works",
  },
  {
    id: "spex",
    client: "SPEX",
    category: "CYBER SECURITY",
    title: {
      id: "Platform otomasi kepatuhan dan keamanan siber",
      en: "Automated cybersecurity compliance platform",
    },
    badge: {
      id: "MITRA KEAMANAN GLOBAL",
      en: "GLOBAL SECURITY PARTNER",
    },
    tags: ["CYBERSECURITY", "UI/UX DESIGN", "ANIMATION INTERACTION"],
    imageUrl: "https://framerusercontent.com/images/vmp26uS1fzAEOVbdH19mrf2bnw.jpg?width=3200&height=2400",
    bgColor: "#EFF1F6",
    caseUrl: "#works",
  },
  {
    id: "enorm",
    client: "ENORM",
    category: "ENTERPRISE IT",
    title: {
      id: "Penyedia solusi IT enterprise dan infrastruktur",
      en: "Enterprise IT solution provider",
    },
    badge: {
      id: "TERPILIH DI PRODUCT HUNT #1",
      en: "FEATURED ON PRODUCT HUNT #1",
    },
    tags: ["BRAND IDENTITY", "DESIGN SYSTEM", "PRODUCT STRATEGY"],
    imageUrl: "https://framerusercontent.com/images/f2TBOrrRIY5dcoWQ72exps1cHlo.jpg?width=3200&height=2400",
    bgColor: "#FFFFFF",
    caseUrl: "#works",
  },
];

export function HighlightedWorks({ lang, whatsappNumber }: HighlightedWorksProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const panels = containerRef.current?.querySelectorAll<HTMLElement>(".parallax-project-panel");
      if (!panels || panels.length === 0) return;

      panels.forEach((panel, index) => {
        const innerImage = panel.querySelector<HTMLElement>(".parallax-panel-image");

        // Smooth fixed presentation: keep image fixed at 100% scale without shrinking
        if (innerImage) {
          gsap.set(innerImage, { scale: 1, yPercent: 0 });
        }

        // Stacking behavior: panels stay 100% full scale and are cleanly covered as the next panel slides up over it.

      });
    }, containerRef);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [lang]);

  const allProjectsLabel = lang === "id" ? "Semua Proyek" : "All Projects";
  const viewCaseLabel = lang === "id" ? "Lihat Studi Kasus" : "View Case";

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Gemilang Space, saya tertarik dengan studi kasus karya Anda dan ingin berkonsultasi."
      : "Hello Gemilang Space, I'd like to talk about your featured case studies and design solutions."
  )}`;

  return (
    <section
      id="works"
      ref={containerRef}
      className="relative w-full bg-[#F4F4F6] text-neutral-950 z-30 transition-colors"
    >
      {/* ============================================================== */}
      {/* 1. HEADER AREA: Matches uploaded_media_1789830701272.png       */}
      {/* ============================================================== */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8 pt-20 sm:pt-28 pb-16 sm:pb-24 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center justify-center">
          {/* Eyebrow */}
          <p className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.08em] text-neutral-400 uppercase">
            {lang === "id" ? "KARYA KAMI" : "WORKS"}
          </p>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-[-0.04em] text-neutral-950 leading-[1.12] mt-3 sm:mt-4">
            {lang === "id" ? (
              <>
                Karya Unggulan
                <br />
                Yang Memberi Dampak Nyata
              </>
            ) : (
              <>
                Highlighted Projects
                <br />
                That Made a Real Impact
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-sm sm:text-base text-neutral-600 font-normal tracking-tight leading-relaxed max-w-xl mx-auto">
            {lang === "id"
              ? "Dari aplikasi web enterprise, platform mobile, hingga automasi AI terapan, kami membantu perusahaan merancang, membangun, dan merilis solusi IT tangguh berkinerja tinggi."
              : "From enterprise web apps and mobile platforms to applied AI automations, we help companies engineer and deploy mission-critical IT solutions."}
          </p>

          {/* CTA Pill Button: All Projects */}
          <div className="mt-7 sm:mt-8">
            <Button
              variant="expand"
              size="md"
              href="#works"
            >
              {allProjectsLabel}
            </Button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. 100VH STACKING PARALLAX PANELS (Zigzag alternating layout) */}
      {/* ============================================================== */}
      <div className="relative w-full">
        {projects.map((proj, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={proj.id}
              className="parallax-project-panel sticky top-0 w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden border-t border-neutral-300/80 shadow-[0_-30px_70px_rgba(0,0,0,0.12)] will-change-transform"
              style={{
                backgroundColor: proj.bgColor,
                zIndex: idx + 1,
              }}
            >
              <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-16 flex items-center h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center w-full">
                  
                  {/* Text Column: Left on even (0, 2, 4), Right on odd (1, 3) */}
                  <div
                    className={`lg:col-span-5 flex flex-col justify-between space-y-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      {/* Client Name + Category Pill */}
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-mono font-bold tracking-wider text-neutral-800 uppercase">
                          {proj.client}
                        </span>
                        <span className="text-[10px] font-mono font-semibold tracking-wide bg-neutral-100 text-neutral-500 px-2.5 py-1 rounded-full uppercase">
                          {proj.category}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-[-0.035em] text-neutral-950 leading-[1.14] mt-3.5 sm:mt-4 mb-4">
                        {proj.title[lang]}
                      </h3>

                      {/* Impact / Funding Pill Badge */}
                      <div className="inline-block bg-[#2E51FF]/10 text-[#2E51FF] font-bold text-xs sm:text-[13px] px-3.5 py-1.5 rounded-full font-mono">
                        {proj.badge[lang]}
                      </div>
                    </div>

                    {/* View Case Action Button */}
                    <div className="pt-2">
                      <Button
                        variant="expand"
                        size="md"
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {viewCaseLabel}
                      </Button>
                    </div>

                    {/* Tags Pill Row at bottom */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200/80">
                      {proj.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] sm:text-[11px] font-mono font-semibold text-neutral-600 bg-neutral-100/90 hover:bg-neutral-200/90 px-3 py-1 rounded-full transition-colors select-none"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Image Column: Right on even (0, 2, 4), Left on odd (1, 3) */}
                  <div
                    className={`lg:col-span-7 relative w-full aspect-[16/10] max-h-[540px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A0D14] border border-neutral-200/90 shadow-2xl group ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="parallax-panel-image absolute inset-0 w-full h-full">
                      <Image
                        src={proj.imageUrl}
                        alt={proj.title[lang]}
                        fill
                        sizes="(max-width: 768px) 100vw, 850px"
                        className="object-cover object-center group-hover:scale-102 transition-transform duration-700"
                        unoptimized
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
