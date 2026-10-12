"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  lang: "id" | "en";
  whatsappNumber?: string;
}

export function PricingSection({
  lang,
  whatsappNumber = "6281234567890",
}: PricingSectionProps) {
  const [modelType, setModelType] = useState<"project" | "contract">("contract");

  const getWaUrl = (plan: string) => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lang === "id"
        ? `Halo Gemilang, saya ingin berkonsultasi mengenai model kerjasama: ${plan}.`
        : `Hello Gemilang, I want to discuss the engagement model: ${plan}.`
    )}`;
  };

  const clientLogos = [
    "screenloop",
    "uptech",
    "5u",
    "polygon",
    "codeaweb",
    "efficense",
    "hostware",
    "hospitable",
  ];

  return (
    <section
      id="pricing"
      className="relative w-full bg-white text-neutral-950 py-20 sm:py-28 lg:py-32 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* ============================================================== */}
        {/* HEADER AREA                                                    */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-8">
          {/* Left: Eyebrow + Headline */}
          <div className="min-w-0">
            <p className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.06em] text-neutral-400 uppercase">
              {lang === "id" ? "MODEL KERJASAMA & BIAYA" : "ENGAGEMENT MODELS & PRICING"}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold tracking-[-0.04em] text-neutral-950 leading-tight mt-2 whitespace-nowrap">
              {lang === "id"
                ? "Dua skema fleksibel untuk kebutuhan IT Anda."
                : "Flexible engagement models built for your scale."}
            </h2>
          </div>

          {/* Right: Subtitle */}
          <div className="text-neutral-600 text-xs sm:text-[13.5px] leading-relaxed max-w-sm lg:text-right font-normal pb-0.5">
            <p>
              {lang === "id"
                ? "Pilih kontrak bulanan untuk tim engineering berkelanjutan, atau project-based dengan milestone terukur."
                : "Choose monthly dedicated contract squads or fixed-scope project development."}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* MODEL TOGGLE SWITCHER                                          */}
        {/* ============================================================== */}
        <div className="mt-10 sm:mt-12">
          <div className="w-full max-w-[500px] bg-[#E4E4E8] p-1 sm:p-1.5 rounded-full grid grid-cols-2 gap-1 select-none">
            <button
              type="button"
              onClick={() => setModelType("contract")}
              className={`py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                modelType === "contract"
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {lang === "id" ? "Dedicated Contract Team" : "Dedicated Contract Team"}
            </button>
            <button
              type="button"
              onClick={() => setModelType("project")}
              className={`py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                modelType === "project"
                  ? "bg-white text-neutral-950 shadow-xs"
                  : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {lang === "id" ? "Project-Based Solution" : "Project-Based Solution"}
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2 COMPREHENSIVE CARDS (Contract Squad vs Project-Based)        */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-8 items-stretch">
          
          {/* ------------------------------------------------------------ */}
          {/* CARD 1: Dedicated Contract Team (Light Slate Card)           */}
          {/* ------------------------------------------------------------ */}
          <div className={`rounded-xl bg-[#F7F7F8] p-7 sm:p-8 flex flex-col justify-between border ${modelType === "contract" ? "border-blue-500/50 ring-2 ring-blue-500/20" : "border-neutral-200/60"} shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-all`}>
            <div>
              {/* Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-blue-600">
                    {lang === "id" ? "RETAINER BULANAN" : "MONTHLY RETAINER"}
                  </span>
                  <h3 className="text-2xl font-bold text-neutral-950 mt-1">
                    Dedicated Contract Squad
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-500 mt-1.5 leading-relaxed max-w-md">
                    {lang === "id"
                      ? "Tim engineer senior penuh waktu yang bertindak sebagai perpanjangan tim in-house Anda, siap sprint setiap minggu tanpa beban rekrutmen."
                      : "A dedicated senior engineering team working as an extension of your company with weekly agile sprints and zero hiring friction."}
                  </p>
                </div>
                {/* Glowing Blue Orb */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#2563EB] to-[#38BDF8] shadow-[0_0_20px_rgba(37,99,235,0.45)] shrink-0 animate-pulse" />
              </div>

              {/* Price */}
              <div className="mt-8 mb-6">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950">
                  {lang === "id" ? "Kontrak Fleksibel" : "Flexible Monthly"}
                </span>
                <span className="text-xs sm:text-[13px] text-neutral-500 ml-2 font-medium">
                  {lang === "id" ? "/bulan (Sesuai jumlah engineer)" : "/month (Scoped by squad size)"}
                </span>
              </div>

              {/* CTA Pill Button with expanding animation */}
              <div className="mb-8">
                <Button
                  variant="expand"
                  size="md"
                  href={getWaUrl("Dedicated Contract Squad")}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                >
                  {lang === "id" ? "Hire Dedicated Squad" : "Hire Dedicated Squad"}
                </Button>
              </div>

              {/* Features List */}
              <div className="pt-6 border-t border-neutral-200/60 space-y-3.5 text-xs sm:text-[13.5px] text-neutral-700 font-normal">
                <div className="flex items-center gap-2.5 font-semibold text-neutral-950">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{lang === "id" ? "Senior Full-Stack Engineers & Tech Lead" : "Senior Full-Stack Engineers & Tech Lead"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{lang === "id" ? "Siklus Sprint mingguan dengan demo langsung" : "Weekly sprint cycles & live demo reviews"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{lang === "id" ? "Standup harian & integrasi Slack/Discord privat" : "Daily standups & private Slack/Discord integration"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{lang === "id" ? "Akses repository langsung (GitHub/GitLab Anda)" : "Direct commit access to your GitHub/GitLab repo"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{lang === "id" ? "Bebas atur prioritas backlog & pivoting cepat" : "Flexible backlog priority & fast pivoting"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{lang === "id" ? "Jeda atau sesuaikan kapasitas tim tiap bulan" : "Pause or scale squad capacity monthly"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* CARD 2: Project-Based Solution (Dark Card)                   */}
          {/* ------------------------------------------------------------ */}
          <div className={`rounded-xl bg-[#0A0D14] text-white p-7 sm:p-8 flex flex-col justify-between border ${modelType === "project" ? "border-cyan-500/50 ring-2 ring-cyan-500/20" : "border-white/10"} shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all`}>
            <div>
              {/* Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#38BDF8]">
                    {lang === "id" ? "FIXED SCOPE & MILESTONE" : "FIXED SCOPE & MILESTONE"}
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">
                    Project-Based Solution
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-400 mt-1.5 leading-relaxed max-w-md">
                    {lang === "id"
                      ? "Untuk pembuatan software, aplikasi mobile, sistem AI, atau perombakan sistem lama dengan target output, tenggat waktu, dan anggaran terdefinisi."
                      : "For custom software, mobile apps, AI automation, or infrastructure overhaul with clearly defined scopes, timelines, and budgets."}
                  </p>
                </div>
                {/* Glowing White-Cyan Orb */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0284C7] to-white shadow-[0_0_20px_rgba(56,189,248,0.5)] shrink-0" />
              </div>

              {/* Price */}
              <div className="mt-8 mb-6">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  {lang === "id" ? "Milestone-Based" : "Milestone-Based"}
                </span>
                <span className="text-xs sm:text-[13px] text-neutral-400 ml-2 font-medium">
                  {lang === "id" ? "(Berdasarkan ruang lingkup PRD)" : "(Scoped per project PRD)"}
                </span>
              </div>

              {/* CTA White Pill Button with expanding animation */}
              <div className="mb-8">
                <Button
                  variant="expand"
                  size="md"
                  href={getWaUrl("Project-Based Solution")}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  className="bg-neutral-800"
                >
                  {lang === "id" ? "Diskusikan Scope Proyek" : "Scope Your Project"}
                </Button>
              </div>

              {/* Features List */}
              <div className="pt-6 border-t border-neutral-800 space-y-3.5 text-xs sm:text-[13.5px] text-neutral-300 font-normal">
                <div className="flex items-center gap-2.5 font-semibold text-white">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{lang === "id" ? "Spesifikasi Teknis (PRD & Arsitektur) lengkap" : "Complete PRD & Architecture specifications"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{lang === "id" ? "Jaminan garansi bug fixing & masa pemeliharaan" : "Guaranteed bug-fixing & post-launch warranty"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{lang === "id" ? "Pembayaran bertahap berbasis approval milestone" : "Milestone-based staged milestone payments"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{lang === "id" ? "Serah terima source code 100% hak milik klien" : "100% full IP & source code ownership transfer"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{lang === "id" ? "Setup server produksi & CI/CD zero-downtime" : "Production server setup & CI/CD deployment"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{lang === "id" ? "Dokumentasi API & manual operasional sistem" : "API documentation & system operations handbook"}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* CLIENT LOGOS RUNNING MARQUEE (with smooth white edge fades)    */}
        {/* ============================================================== */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-neutral-100 relative overflow-hidden select-none">
          {/* Left Smooth White Fade Gradient */}
          <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 lg:w-48 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-20" />

          {/* Right Smooth White Fade Gradient */}
          <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 lg:w-48 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />

          {/* Infinite Running Marquee Track */}
          <div className="animate-marquee gap-8 sm:gap-14 lg:gap-20 items-center py-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-opacity">
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <span
                key={`${logo}-${idx}`}
                className="font-sans font-bold text-sm sm:text-base tracking-tight text-neutral-800 uppercase shrink-0 px-4"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default PricingSection;
