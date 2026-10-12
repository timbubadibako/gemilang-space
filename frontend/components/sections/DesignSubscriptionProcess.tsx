"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Clock, Loader2, CircleDashed, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientWave } from "@/components/ui/gradient-wave";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface DesignSubscriptionProcessProps {
  lang: "id" | "en";
  whatsappNumber?: string;
}

interface QueueItem {
  status: "review" | "progress" | "queued" | "completed";
  statusLabel: { id: string; en: string };
  task: { id: string; en: string };
}

const queueItems: QueueItem[] = [
  {
    status: "review",
    statusLabel: { id: "Code Review / QA", en: "Code Review / QA" },
    task: { id: "Payment Gateway API", en: "Payment Gateway API" },
  },
  {
    status: "progress",
    statusLabel: { id: "Sprint Active", en: "Sprint Active" },
    task: { id: "Mobile App Flutter v1.2", en: "Mobile App Flutter v1.2" },
  },
  {
    status: "queued",
    statusLabel: { id: "Next Sprint", en: "Next Sprint" },
    task: { id: "AI Agent Automation", en: "AI Agent Automation" },
  },
  {
    status: "queued",
    statusLabel: { id: "Backlog", en: "Backlog" },
    task: { id: "Cloud Migration AWS", en: "Cloud Migration AWS" },
  },
  {
    status: "completed",
    statusLabel: { id: "Production Live", en: "Production Live" },
    task: { id: "Enterprise Auth & RBAC", en: "Enterprise Auth & RBAC" },
  },
  {
    status: "completed",
    statusLabel: { id: "Production Live", en: "Production Live" },
    task: { id: "SaaS Multi-tenant DB", en: "SaaS Multi-tenant DB" },
  },
  {
    status: "completed",
    statusLabel: { id: "Production Live", en: "Production Live" },
    task: { id: "CI/CD Docker Pipeline", en: "CI/CD Docker Pipeline" },
  },
];

export function DesignSubscriptionProcess({
  lang,
  whatsappNumber = "6281234567890",
}: DesignSubscriptionProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !cardsRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header slide-in
      gsap.fromTo(
        ".workflow-header",
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

      // 2. Staggered reveal for the 3 workflow cards
      const cards = cardsRef.current?.querySelectorAll(".workflow-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Gemilang, kami ingin mendiskusikan kebutuhan dedicated tech team / IT solution untuk perusahaan kami."
      : "Hello Gemilang, we want to discuss a dedicated contract tech team / IT solution for our company."
  )}`;

  return (
    <section
      id="contract-team"
      ref={containerRef}
      className="relative w-full bg-[#04060A] text-white py-20 sm:py-28 lg:py-32 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* ============================================================== */}
        {/* SECTION HEADER                                                 */}
        {/* ============================================================== */}
        <div className="workflow-header flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-12">
          {/* Left: Eyebrow + Headline */}
          <div className="max-w-2xl">
            <p className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.08em] text-[#CAD0DC]/70 uppercase">
              {lang === "id" ? "ALUR KERJA IT SOLUTIONS & CONTRACT TEAM" : "HOW OUR IT & CONTRACT TEAMS WORK"}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold tracking-[-0.04em] text-white leading-[1.12] mt-3">
              {lang === "id" ? (
                <>
                  Rekayasa software tangguh
                  <br />
                  dengan kecepatan sprint tinggi.
                </>
              ) : (
                <>
                  High-velocity engineering
                  <br />
                  without the hiring headache.
                </>
              )}
            </h2>
          </div>

          {/* Right: Subtitle */}
          <div className="text-[#A1A1AA] text-xs sm:text-[14px] leading-relaxed max-w-sm text-left font-normal pb-1">
            <p>
              {lang === "id" ? (
                <>
                  Pilih model kontrak bulanan atau milestone proyek.
                  <br />
                  Tim engineer senior siap langsung deploy ke roadmap Anda.
                </>
              ) : (
                <>
                  Choose monthly contract teams or project milestones.
                  <br />
                  Senior engineers deploy directly to your codebase.
                </>
              )}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3-CARD SUBSCRIPTION WORKFLOW GRID                              */}
        {/* ============================================================== */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-7 mt-12 sm:mt-16 items-stretch">
          
          {/* ------------------------------------------------------------ */}
          {/* CARD 01: Onboard / Contract                                  */}
          {/* ------------------------------------------------------------ */}
          <div className="workflow-card relative bg-[#F4F4F6] text-neutral-950 rounded-xl sm:rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-xl border border-white/20 overflow-hidden min-h-[520px] transition-transform duration-300 hover:-translate-y-1">
            {/* Top Text */}
            <div>
              <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-400">
                01
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-[-0.035em] text-neutral-950 mt-2 mb-2">
                {lang === "id" ? "Pilih Skema" : "Engagement"}
              </h3>
              <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed max-w-xs">
                {lang === "id"
                  ? "Tentukan apakah Anda butuh dedicated contract squad atau pengembangan proyek spesifik."
                  : "Decide whether you need a dedicated contract squad or targeted project development."}
              </p>
            </div>

            {/* Inner Pricing Card */}
            <div className="bg-[#E5E5E8] rounded-xl p-5 sm:p-6 mt-8 flex flex-col justify-between border border-neutral-300/60 shadow-inner">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-bold text-base sm:text-lg text-neutral-950 block">
                    Dedicated Tech Squad
                  </span>
                  <p className="text-xs text-neutral-500 mt-1 leading-normal">
                    {lang === "id"
                      ? "1 Tech Lead + Senior Full-Stack Engineers full-time untuk produk Anda."
                      : "1 Tech Lead + Senior Full-Stack Engineers dedicated to your product."}
                  </p>
                </div>

                {/* Glowing Multi-Color Orb */}
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#2563EB] to-[#0284C7] shadow-[0_0_18px_rgba(37,99,235,0.6)] animate-pulse" />
                </div>
              </div>

              {/* Price Row */}
              <div className="mt-6 mb-5">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                  Custom Contract
                </span>
                <span className="text-xs sm:text-[13px] text-neutral-500 ml-1.5 font-medium">
                  {lang === "id" ? "/bulan atau milestone" : "/month or milestone"}
                </span>
              </div>

              {/* Join Today Pill Button */}
              <Button
                variant="expand"
                size="md"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                {lang === "id" ? "Konsultasi Tim" : "Hire Tech Squad"}
              </Button>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* CARD 02: Requests Queue                                      */}
          {/* ------------------------------------------------------------ */}
          <div className="workflow-card relative bg-[#F4F4F6] text-neutral-950 rounded-xl sm:rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-xl border border-white/20 overflow-hidden min-h-[520px] transition-transform duration-300 hover:-translate-y-1">
            {/* Top Text */}
            <div>
              <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-400">
                02
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-[-0.035em] text-neutral-950 mt-2 mb-2">
                {lang === "id" ? "Sprint & Backlog" : "Sprint & Backlog"}
              </h3>
              <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed max-w-xs">
                {lang === "id"
                  ? "Atur prioritas fitur produk ke dalam sprint mingguan yang transparan dan terukur."
                  : "Organize feature requirements into transparent, predictable weekly engineering sprints."}
              </p>
            </div>

            {/* Queue List Items */}
            <div className="space-y-2 mt-6">
              {queueItems.map((item, idx) => {
                // Determine styling based on status
                let icon = null;
                let badgeClass = "";
                let rowOpacity = "opacity-100";
                let textClass = "font-medium text-neutral-950";

                if (item.status === "review") {
                  icon = <Clock className="w-3.5 h-3.5 text-[#D97706] shrink-0" />;
                  badgeClass = "text-[#D97706] font-medium";
                } else if (item.status === "progress") {
                  icon = <Loader2 className="w-3.5 h-3.5 text-[#2563EB] animate-spin shrink-0" />;
                  badgeClass = "text-[#2563EB] font-medium";
                } else if (item.status === "queued") {
                  icon = <CircleDashed className="w-3.5 h-3.5 text-neutral-500 shrink-0" />;
                  badgeClass = "text-neutral-500 font-medium";
                } else {
                  icon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600/70 shrink-0" />;
                  badgeClass = "text-emerald-700/60 font-medium";
                  textClass = "text-neutral-500 font-normal";
                  if (idx === 4) rowOpacity = "opacity-75";
                  if (idx === 5) rowOpacity = "opacity-55";
                  if (idx === 6) rowOpacity = "opacity-35";
                }

                return (
                  <div
                    key={idx}
                    className={`bg-[#E5E5E8]/85 hover:bg-[#DDDDE0] rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-[13px] transition-all duration-150 ${rowOpacity}`}
                  >
                    <div className="flex items-center gap-2.5">
                      {icon}
                      <span className={`text-[11px] sm:text-xs ${badgeClass}`}>
                        {item.statusLabel[lang]}
                      </span>
                    </div>
                    <span className={`text-right truncate ml-3 ${textClass}`}>
                      {item.task[lang]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* CARD 03: Review & Receive (Living GradientWave with Dot Grid) */}
          {/* ------------------------------------------------------------ */}
          <div className="workflow-card relative rounded-xl sm:rounded-2xl p-7 sm:p-9 flex flex-col justify-between shadow-2xl border border-white/20 overflow-hidden min-h-[520px] transition-transform duration-300 hover:-translate-y-1 bg-[#090C15] text-white select-none">
            
            {/* Living WebGL Gradient Wave matching Hero */}
            <GradientWave
              colors={["#080C1E", "#1D2B64", "#2563EB", "#38BDF8", "#60A5FA", "#0284C7"]}
              shadowPower={4}
              noiseSpeed={0.00004}
              deform={{ incline: 0.5, noiseAmp: 300, noiseFlow: 5, noiseSpeed: 12 }}
              className="opacity-95 pointer-events-none"
            />

            {/* Ambient Dark Gradient Vignette for crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/85 via-black/25 to-transparent pointer-events-none z-0" />

            {/* Crisp Dot Matrix Overlay in front of the dynamic gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:20px_20px] opacity-25 pointer-events-none z-0" />

            {/* Top Text */}
            <div className="relative z-10">
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#8B98D9]">
                03
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-[-0.035em] text-white mt-2 mb-2">
                {lang === "id" ? "Deploy & Skalabilitas" : "Deploy & Scale"}
              </h3>
              <p className="text-xs sm:text-[13.5px] text-white/85 leading-relaxed max-w-xs">
                {lang === "id"
                  ? "Kode teruji otomatis, ditinjau ketat, dan dideploy ke server produksi dengan SLA keandalan tinggi."
                  : "Automated tests, strict code reviews, and zero-downtime deployment to production servers."}
              </p>
            </div>

            {/* Bottom Translucent Glass Pill Button */}
            <div className="relative z-10 pt-10">
              <Button
                variant="translucent"
                size="md"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                {lang === "id" ? "Mulai Diskusi Proyek" : "Start Project Consultation"}
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
