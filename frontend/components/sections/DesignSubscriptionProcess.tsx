"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Clock, Loader2, CircleDashed, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientWave } from "@/components/ui/gradient-wave";
import { useDaytimeTheme } from "@/lib/daytime-context";
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
    statusLabel: { id: "Demo Siap", en: "Demo Ready" },
    task: { id: "Review Fitur & Panduan Kasir", en: "Feature Review & Walkthrough" },
  },
  {
    status: "progress",
    statusLabel: { id: "Dikerjakan", en: "In Progress" },
    task: { id: "Testing Struk Thermal Bluetooth", en: "Thermal Bluetooth Receipt Test" },
  },
  {
    status: "queued",
    statusLabel: { id: "Antrean", en: "Queued" },
    task: { id: "Sinkronisasi Stok Multi-Gudang", en: "Multi-Warehouse Stock Sync" },
  },
  {
    status: "queued",
    statusLabel: { id: "Antrean", en: "Queued" },
    task: { id: "Setup Notifikasi WhatsApp Resi", en: "WhatsApp Tracking Notification" },
  },
  {
    status: "completed",
    statusLabel: { id: "Selesai", en: "Completed" },
    task: { id: "Setup Domain & Hosting SSL", en: "Domain & SSL Hosting Setup" },
  },
  {
    status: "completed",
    statusLabel: { id: "Selesai", en: "Completed" },
    task: { id: "Katalog Produk & Kasir POS", en: "Product Catalog & Retail POS" },
  },
  {
    status: "completed",
    statusLabel: { id: "Selesai", en: "Completed" },
    task: { id: "Checkout WhatsApp Otomatis", en: "Automated WhatsApp Checkout" },
  },
];

export function DesignSubscriptionProcess({
  lang,
  whatsappNumber = "6281234567890",
}: DesignSubscriptionProcessProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useDaytimeTheme();

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
            <p className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.08em] text-[#00E1BA] uppercase">
              {lang === "id" ? "ALUR PROYEK & EKSEKUSI PRAKTIS" : "PRACTICAL BUSINESS WORKFLOW"}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold tracking-[-0.04em] text-white leading-[1.12] mt-3">
              {lang === "id" ? (
                <>
                  Bangun sistem bisnis Anda
                  <br />
                  tanpa alur yang rumit.
                </>
              ) : (
                <>
                  Build your business systems
                  <br />
                  without the complicated process.
                </>
              )}
            </h2>
          </div>

          {/* Right: Subtitle */}
          <div className="text-[#A1A1AA] text-xs sm:text-[14px] leading-relaxed max-w-sm text-left font-normal pb-1">
            <p>
              {lang === "id" ? (
                <>
                  Dari konsultasi kebutuhan hingga sistem online siap pakai.
                  <br />
                  Cepat, transparan, dan bergaransi resmi.
                </>
              ) : (
                <>
                  From WhatsApp consultation to production-ready systems.
                  <br />
                  Fast, transparent, with official warranty.
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
                {lang === "id" ? "Pilih Paket & Konsultasi" : "Choose Plan & Consult"}
              </h3>
              <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed max-w-xs">
                {lang === "id"
                  ? "Ceritakan alur bisnis Anda via WhatsApp. Kami berikan rekomendasi paket yang paling pas dan hemat biaya."
                  : "Share your operational flow on WhatsApp. We recommend the best fit and most cost-effective package."}
              </p>
            </div>

            {/* Inner Pricing Card (Themed Gradient Wave Surface with Punch-Through White Dots) */}
            <div
              className="relative rounded-xl p-5 sm:p-6 mt-8 flex flex-col justify-between overflow-hidden shadow-2xl border border-white/20 select-none text-white bg-[#060910]"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.waveColors[0]} 0%, ${currentTheme.waveColors[1]} 30%, ${currentTheme.waveColors[2]} 65%, ${currentTheme.waveColors[3]} 100%)`,
              }}
            >
              {/* Ambient radial glow from theme accent */}
              <div
                className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full blur-2xl opacity-40 pointer-events-none"
                style={{ backgroundColor: currentTheme.waveColors[4] || "var(--theme-accent)" }}
              />

              {/* Ambient Vignette for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-0" />

              {/* Punch-through white dot matrix */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.4px,transparent_1.4px)] [background-size:14px_14px] opacity-35 pointer-events-none z-0 mix-blend-overlay" />

              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <span className="font-bold text-base sm:text-lg text-white block">
                    Starter, POS &amp; Squad
                  </span>
                  <p className="text-xs text-white/85 mt-1 leading-normal font-medium">
                    {lang === "id"
                      ? "Website toko mulai 1.5 Jt, kasir POS 3.5 Jt, atau sewa tim bulanan 6.5 Jt."
                      : "Web stores from 1.5M, POS retail 3.5M, or dedicated squad 6.5M/mo."}
                  </p>
                </div>

                {/* White Check Badge */}
                <div className="relative shrink-0">
                  <div
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-xs shadow-md"
                    style={{ color: currentTheme.waveColors[2] || "#008B7A" }}
                  >
                    ✓
                  </div>
                </div>
              </div>

              {/* Price Row */}
              <div className="relative z-10 mt-6 mb-5">
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                  Transparan &amp; Jelas
                </span>
                <span className="text-xs sm:text-[13px] text-white/80 ml-1.5 font-semibold">
                  {lang === "id" ? "tanpa biaya tersembunyi" : "no hidden fees"}
                </span>
              </div>

              {/* Join Today Pill Button */}
              <div className="relative z-10">
                <Button
                  variant="translucent"
                  size="md"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                >
                  {lang === "id" ? "Konsultasi Sekarang" : "Consult Now"}
                </Button>
              </div>
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
                {lang === "id" ? "Pengerjaan Kilat 3-5 Hari" : "Fast 3-5 Days Delivery"}
              </h3>
              <p className="text-xs sm:text-[13.5px] text-neutral-600 leading-relaxed max-w-xs">
                {lang === "id"
                  ? "Tim engineer langsung membangun sistem (web toko, scan kasir, atau bot WA) dengan standar kode bersih."
                  : "Engineers build your system (web store, cashier scanner, or WA bot) with clean architecture."}
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
                  icon = <Loader2 className="w-3.5 h-3.5 text-[#008B7A] animate-spin shrink-0" />;
                  badgeClass = "text-[#008B7A] font-medium";
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
            
            {/* Living WebGL Gradient Wave matching Daytime Theme */}
            <GradientWave
              colors={currentTheme.waveColors}
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
              <span className="font-mono text-xs sm:text-sm font-semibold text-[#00E1BA]">
                03
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-[-0.035em] text-white mt-2 mb-2">
                {lang === "id" ? "Uji Coba & Terima Beres" : "Test, Launch & Handover"}
              </h3>
              <p className="text-xs sm:text-[13.5px] text-white/85 leading-relaxed max-w-xs">
                {lang === "id"
                  ? "Review langsung sistem Anda, panduan staf hingga mahir, garansi 30 hari bug-free, dan sistem live siap pakai tanpa pusing teknis."
                  : "Live system walkthrough, staff onboarding, 30-day bug-free warranty, and fully managed live systems without server hassles."}
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
