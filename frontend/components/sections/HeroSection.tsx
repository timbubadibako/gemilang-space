"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HeroContent } from "@/types/content";
import { Button } from "@/components/ui/button";
import { RotatingSolutionsText } from "@/components/ui/RotatingSolutionsText";
import { GradientWave } from "@/components/ui/gradient-wave";
import { useDaytimeTheme } from "@/lib/daytime-context";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";

interface HeroSectionProps {
  content: HeroContent;
  lang: "id" | "en";
  whatsappNumber: string;
  onOpenEstimator?: (tier?: string) => void;
}

const solutionsId = [
  "Web Platform & SaaS",
  "Sistem Kasir (POS) & Inventori",
  "Aplikasi Mobile iOS & Android",
  "Otomasi Alur Kerja & WhatsApp",
  "Perangkat Lunak Kustom B2B",
];

const solutionsEn = [
  "Web Platforms & SaaS",
  "POS & Inventory Systems",
  "iOS & Android Mobile Apps",
  "Workflow & WhatsApp Automation",
  "Custom Enterprise Software",
];

export function HeroSection({
  content,
  lang,
  whatsappNumber,
  onOpenEstimator,
}: HeroSectionProps) {
  // Day-time context shared across the entire app
  const { currentTheme } = useDaytimeTheme();

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Gemilang, saya ingin mendiskusikan roadmap produk dan kebutuhan solusi teknologi kami."
      : "Hello Gemilang, I'd like to talk about our product engineering and solutions roadmap."
  )}`;

  return (
    <section className="w-full flex-1 flex flex-col justify-stretch py-2 min-h-0 relative">
      {/* 
        Hero Grid Proportions:
        - Dominant Left White Card: 1fr (takes ~75%-77% width on desktop)
        - Sleek Right Column: ~310px - 340px (takes ~23%-25% width, reduced visual weight)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] xl:grid-cols-[1fr_335px] 2xl:grid-cols-[1fr_360px] gap-3.5 lg:gap-4 items-stretch h-full flex-1 min-h-0">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: Main Signature Card */}
        {/* ============================================================== */}
        <div
          className={`rounded-xl sm:rounded-2xl p-7 sm:p-10 lg:p-11 xl:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full border transition-colors duration-700 group/herocard ${
            currentTheme.isNight
              ? "text-white border-white/15 bg-[#080B12]"
              : "text-neutral-950 border-neutral-300/80 bg-neutral-100"
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20 transition-all duration-700"
            style={{ backgroundColor: currentTheme.accentColor }}
          />

          {/* Top Section: Eyebrow + Headline with Rotating Solutions + CTA Buttons */}
          <div className="relative z-10">
            {/* Clean Eyebrow with Theme Adaptive Indicator */}
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ backgroundColor: currentTheme.accentColor }}
                />
                <span
                  className="relative inline-flex rounded-full h-1.5 w-1.5 shadow-xs"
                  style={{ backgroundColor: currentTheme.accentColor }}
                />
              </span>
              <p
                className={`text-xs sm:text-[12.5px] font-semibold tracking-[0.06em] uppercase font-sans transition-colors duration-500 ${
                  currentTheme.isNight ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                {content.eyebrow[lang]}
              </p>
            </div>

            {/* Giant Headline: Interactive Question Structure */}
            <h1
              className={`text-3xl sm:text-5xl lg:text-[44px] xl:text-[50px] 2xl:text-[54px] font-bold tracking-[-0.04em] leading-[1.12] mt-3.5 sm:mt-4 mb-6 transition-colors duration-500 ${
                currentTheme.isNight ? "text-white" : "text-neutral-950"
              }`}
            >
              {lang === "id" ? (
                <>
                  Bisnis Anda butuh{" "}
                  <span className={currentTheme.isNight ? "text-neutral-400 font-normal" : "text-[#8E8E93] font-normal"}>
                    solusi apa?
                  </span>{" "}
                  <br />
                  <RotatingSolutionsText
                    words={solutionsId}
                    effect="slide"
                    interval={2800}
                    className={currentTheme.isNight ? "text-white drop-shadow-sm" : "text-[#04060A]"}
                  />
                  <br />
                  <span className={currentTheme.isNight ? "text-neutral-400 font-normal" : "text-[#8E8E93] font-normal"}>
                    Biar tim engineer kami
                  </span>{" "}
                  yang eksekusi.
                </>
              ) : (
                <>
                  What digital solution{" "}
                  <span className={currentTheme.isNight ? "text-neutral-400 font-normal" : "text-[#8E8E93] font-normal"}>
                    do you need?
                  </span>{" "}
                  <br />
                  <RotatingSolutionsText
                    words={solutionsEn}
                    effect="slide"
                    interval={2800}
                    className={currentTheme.isNight ? "text-white drop-shadow-sm" : "text-[#04060A]"}
                  />
                  <br />
                  <span className={currentTheme.isNight ? "text-neutral-400 font-normal" : "text-[#8E8E93] font-normal"}>
                    Engineered to scale
                  </span>{" "}
                  by our studio squad.
                </>
              )}
            </h1>

            {/* Action Buttons: Solid Primary Pill & Signature Translucent Expand Button */}
            <div className="flex flex-wrap items-center gap-3">
              {onOpenEstimator ? (
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => onOpenEstimator()}
                  className="rounded-full px-6"
                >
                  {content.ctaPrimary[lang]}
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-6"
                >
                  {content.ctaPrimary[lang]}
                </Button>
              )}

              {/* Secondary CTA: Pakai versi Translucent Glass (efek expand signature malam) di SEMUA tema */}
              <Button
                variant="translucent"
                size="md"
                href="#works"
              >
                {content.ctaSecondary[lang]}
              </Button>
            </div>
          </div>

          {/* Bottom Section: Studio Solutions Narrative + Client Logos + Dribbble Badge */}
          <div
            className={`relative z-10 pt-5 mt-5 border-t flex flex-col gap-3.5 transition-colors duration-500 ${
              currentTheme.isNight ? "border-white/10" : "border-neutral-200/80"
            }`}
          >
            <p
              className={`text-xs sm:text-[13.5px] leading-relaxed max-w-xl font-normal transition-colors duration-500 ${
                currentTheme.isNight ? "text-neutral-300" : "text-[#55555D]"
              }`}
            >
              {lang === "id"
                ? "Gemilang adalah studio rekayasa produk dan desain founder-led. Kami menghadirkan solusi menyeluruh: dari platform SaaS terukur, integrasi AI cerdas terapan, hingga design system berstandar enterprise untuk mempercepat pertumbuhan produk Anda."
                : "Gemilang is a founder-led engineering and design studio delivering comprehensive digital solutions: from scalable SaaS platforms and applied AI to enterprise-grade design systems built to accelerate product roadmaps and drive growth."}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              {/* Client Brand Logos */}
              <div
                className={`flex items-center gap-4 sm:gap-6 transition-all ${
                  currentTheme.isNight
                    ? "opacity-90 text-white"
                    : "opacity-80 text-neutral-800"
                }`}
              >
                {/* Fermion Roastery */}
                <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs sm:text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--theme-accent)] inline-block" />
                  <span>Fermion Roastery</span>
                </div>

                {/* PT David */}
                <div className="flex items-center gap-1.5 font-bold tracking-tight text-xs sm:text-sm">
                  <span className="w-2 h-2 rounded-full bg-[var(--theme-accent)] inline-block" />
                  <span>PT DAVID (Industrial POS)</span>
                </div>

                {/* Desa Digital */}
                <div className="flex items-center gap-1 font-bold tracking-tight text-xs sm:text-sm">
                  <span>Desa Digital</span>
                </div>

                {/* Lari App */}
                <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold">
                  <span className="text-[var(--theme-accent)]">⚡</span>
                  <span>Lari App</span>
                </div>
              </div>

              {/* Garansi Resmi 30 Hari Bug Free Ribbon */}
              <div className="bg-[#090D17] text-white px-3.5 py-1.5 rounded-xl shadow-md flex items-center gap-2 border border-[var(--theme-accent)]/30 select-none">
                <div className="w-6 h-6 rounded-lg bg-[var(--theme-accent)]/15 flex items-center justify-center text-[var(--theme-accent)]">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[7.5px] font-mono tracking-widest text-[var(--theme-accent)] uppercase leading-none font-bold">
                    GARANSI RESMI
                  </span>
                  <span className="text-[10px] font-bold tracking-tight text-white mt-0.5">
                    30-Day Bug Free
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Stack of 2 Dark Cards (Top is tall, bottom ~1x1) */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-3.5 lg:gap-4 justify-between h-full min-h-0">
          
          {/* Top Card: Turnkey Sprint & Fast Delivery with Living GradientWave */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl border border-white/10 bg-[#090C15] flex-[1.6] min-h-0 group select-none">
            
            {/* Living WebGL Gradient Wave adaptive to Daytime Accent Palette */}
            <GradientWave
              colors={currentTheme.waveColors}
              shadowPower={4}
              noiseSpeed={0.00004}
              deform={{ incline: 0.5, noiseAmp: 300, noiseFlow: 5, noiseSpeed: 12 }}
              className="opacity-95 pointer-events-none"
            />
            
            {/* Ambient Dark Gradient Vignette for crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/85 via-transparent to-transparent pointer-events-none z-0" />

            <div className="relative z-10">
              <span className="text-[var(--theme-accent)] font-mono text-[10.5px] sm:text-[11px] font-bold tracking-widest uppercase inline-block">
                {lang === "id" ? "PENGERJAAN KILAT" : "RAPID DELIVERY"}
              </span>
              <h2 className="text-2xl sm:text-[26px] font-bold text-white tracking-[-0.03em] mt-1 leading-[1.15]">
                {lang === "id" ? "Rilis Siap Pakai dalam 3-5 Hari" : "Production Ready in 3-5 Days"}
              </h2>
              <p className="text-neutral-300/85 text-xs sm:text-[12.5px] mt-2 leading-relaxed max-w-[260px] font-normal">
                {lang === "id"
                  ? "Dari wireframe hingga deployment live. Source code 100% hak milik Anda dengan arsitektur modern."
                  : "From concept to live production. 100% full source-code ownership with modern scalable tech."}
              </p>
            </div>

            <div className="relative z-10 mt-3 pt-2 border-t border-white/10">
              {onOpenEstimator ? (
                <Button
                  variant="glass"
                  size="sm"
                  onClick={() => onOpenEstimator()}
                  className="w-full justify-between"
                >
                  <span>{lang === "id" ? "Hitung Estimasi Proyek" : "Calculate Estimate"}</span>
                  <span className="text-[var(--theme-accent)] font-bold">→</span>
                </Button>
              ) : (
                <Button
                  variant="translucent"
                  size="sm"
                  href="#pricing"
                  className="w-full justify-between"
                >
                  {lang === "id" ? "Cek Paket & Biaya" : "View Packages & Pricing"}
                </Button>
              )}
            </div>
          </div>

          {/* Bottom Card: The Team Photo Card (Slimmer, tighter caption notch) */}
          <Link
            href="#about"
            className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-[#121622] p-1 flex flex-col justify-between shadow-2xl flex-1 min-h-[175px] sm:min-h-[190px] group transition-all duration-300 hover:border-[var(--theme-accent)]/50 select-none cursor-pointer"
          >
            {/* Top Photo Container - takes full dynamic height */}
            <div className="relative w-full flex-1 min-h-[135px] rounded-[14px] overflow-hidden bg-neutral-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/Q1nGlUmv7vVS6li66XKTFlMrIbk.png?width=1536&height=1536"
                alt="The Team - Gemilang"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Dark subtle vignette over photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

              {/* Center/Bottom Overlay: Clean Name & Role */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-2.5 text-center pointer-events-none">
                <span className="text-lg sm:text-[21px] font-black tracking-tight text-white leading-none">
                  THE TEAM
                </span>
                <span className="text-[9.5px] text-neutral-300 tracking-tight mt-1 font-medium">
                  {lang === "id" ? "100% In-House Engineer • Tanpa Subkontrak" : "100% In-House Engineers • No Outsourcing"}
                </span>
              </div>
            </div>

            {/* Bottom Caption - Slim compact notch */}
            <div className="px-2.5 py-1.5 flex items-center justify-between text-neutral-400 text-xs">
              <span className="text-[11px] text-white font-medium">Gemilang Studio</span>
              <span className="text-[10.5px] text-[var(--theme-accent)] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                {lang === "id" ? "Tentang Kami →" : "About Us →"}
              </span>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
