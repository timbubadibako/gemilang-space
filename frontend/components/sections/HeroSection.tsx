"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { HeroContent } from "@/types/content";
import { Button } from "@/components/ui/button";
import { RotatingSolutionsText } from "@/components/ui/RotatingSolutionsText";
import { Cloudscape } from "@/components/ui/cloudscape";
import { GradientWave } from "@/components/ui/gradient-wave";
import { getThemeByHour, DAYTIME_THEMES } from "@/lib/daytime-theme";
import { Clock, Sun, Moon, Sunrise, Sunset } from "lucide-react";

interface HeroSectionProps {
  content: HeroContent;
  lang: "id" | "en";
  whatsappNumber: string;
}

const solutionsId = [
  "Custom Software & Web",
  "Aplikasi Mobile iOS & Android",
  "Solusi AI & Automasi",
  "Cloud & DevOps Terukur",
  "Dedicated Contract Team",
];

const solutionsEn = [
  "Custom Software & Web",
  "Mobile Apps (iOS & Android)",
  "Applied AI & Automation",
  "Scalable Cloud & DevOps",
  "Dedicated Contract Teams",
];

export function HeroSection({
  content,
  lang,
  whatsappNumber,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Animation mode: "slide" (naik atas bawah) or "typewriter" (ketik hapus)
  const [animEffect, setAnimEffect] = useState<"slide" | "typewriter">("slide");

  // Day-time logic state (default to real client hour, with interactive slider override)
  const [isAutoTime, setIsAutoTime] = useState(true);
  const [simulatedHour, setSimulatedHour] = useState<number>(() => {
    return new Date().getHours();
  });
  const [showTimeController, setShowTimeController] = useState(false);

  // Sync with real-time clock when auto mode is enabled
  useEffect(() => {
    if (!isAutoTime) return;
    const updateRealHour = () => {
      setSimulatedHour(new Date().getHours());
    };
    updateRealHour();
    const interval = setInterval(updateRealHour, 60000);
    return () => clearInterval(interval);
  }, [isAutoTime]);

  // Derived current daytime theme based on hour
  const currentTheme = useMemo(() => {
    return getThemeByHour(simulatedHour);
  }, [simulatedHour]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Gemilang Space, saya ingin mendiskusikan roadmap produk dan kebutuhan solusi teknologi kami."
      : "Hello Gemilang Space, I'd like to talk about our product engineering and solutions roadmap."
  )}`;

  // Icon for time of day
  const TimeIcon =
    simulatedHour >= 5 && simulatedHour < 11
      ? Sunrise
      : simulatedHour >= 11 && simulatedHour < 16
      ? Sun
      : simulatedHour >= 16 && simulatedHour < 19
      ? Sunset
      : Moon;

  return (
    <section className="w-full flex-1 flex flex-col justify-stretch py-2 min-h-0 relative">
      {/* 
        Hero Grid Proportions:
        - Dominant Left White Card: 1fr (takes ~75%-77% width on desktop)
        - Sleek Right Column: ~310px - 340px (takes ~23%-25% width, reduced visual weight)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_310px] xl:grid-cols-[1fr_335px] 2xl:grid-cols-[1fr_360px] gap-3.5 lg:gap-4 items-stretch h-full flex-1 min-h-0">
        
        {/* ============================================================== */}
        {/* LEFT COLUMN: Main Signature Card with Living Cloudscape Shader  */}
        {/* ============================================================== */}
        <div
          className={`rounded-xl sm:rounded-2xl p-7 sm:p-10 lg:p-11 xl:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden h-full border transition-colors duration-700 group/herocard ${
            currentTheme.isNight
              ? "text-white border-white/15 bg-[#080B12]"
              : "text-neutral-950 border-neutral-300/80 bg-neutral-100"
          }`}
        >
          {/* Cloudscape WebGL Ambient Cloud Canvas as Living Background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Cloudscape
              colorBottom={currentTheme.colorBottom}
              colorMid={currentTheme.colorMid}
              colorTop={currentTheme.colorTop}
              speed={currentTheme.speed}
              className="w-full h-full"
            />
            {/* Ambient vignette wash that blends seamlessly with day/night palette */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                currentTheme.isNight
                  ? "bg-gradient-to-t from-[#02040A]/85 via-[#02040A]/40 to-transparent"
                  : "bg-gradient-to-t from-white/70 via-white/20 to-transparent"
              }`}
            />
          </div>

          {/* Top Section: Eyebrow + Headline with Rotating Solutions + CTA Buttons */}
          <div className="relative z-10">
            {/* Eyebrow and Interactive Animation Switcher */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#335CFF]" />
                <p
                  className={`text-xs sm:text-[12.5px] font-semibold tracking-[0.06em] uppercase font-sans ${
                    currentTheme.isNight ? "text-neutral-300" : "text-[#8E8E93]"
                  }`}
                >
                  {content.eyebrow[lang]}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Time Indicator & Controller Trigger Button */}
                <button
                  type="button"
                  onClick={() => setShowTimeController(!showTimeController)}
                  className={`inline-flex items-center gap-1.5 text-[10.5px] font-mono border px-2.5 py-1 rounded-full transition-all cursor-pointer select-none shadow-2xs group ${
                    currentTheme.isNight
                      ? "text-neutral-200 hover:text-white bg-white/10 hover:bg-white/20 border-white/20"
                      : "text-neutral-700 hover:text-neutral-950 bg-white/80 hover:bg-white border-neutral-300/80"
                  }`}
                  title="Atur suasana langit berdasarkan jam (Pagi / Siang / Sore / Malam)"
                >
                  <TimeIcon className="w-3.5 h-3.5 text-[#335CFF] group-hover:rotate-12 transition-transform" />
                  <span className="font-semibold">{String(Math.floor(simulatedHour)).padStart(2, "0")}:00</span>
                  <span
                    className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-sans font-medium ${
                      currentTheme.isNight ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"
                    }`}
                  >
                    {lang === "id" ? currentTheme.nameId : currentTheme.name.split(" ")[0]}
                  </span>
                </button>

                {/* Subtle effect switcher (Slide ↕ / Type ⌨) */}
                <button
                  type="button"
                  onClick={() => setAnimEffect(animEffect === "slide" ? "typewriter" : "slide")}
                  className={`hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full transition-colors cursor-pointer select-none ${
                    currentTheme.isNight
                      ? "text-neutral-300 hover:text-white bg-white/10 hover:bg-white/20"
                      : "text-neutral-500 hover:text-neutral-800 bg-neutral-200/80 hover:bg-neutral-300/80"
                  }`}
                  title="Ganti mode animasi teks (Naik Atas Bawah / Ketik Hapus)"
                >
                  <span>Mode:</span>
                  <span className="font-bold text-[#335CFF]">
                    {animEffect === "slide" ? "↕ Naik-Turun" : "⌨ Ketik-Hapus"}
                  </span>
                </button>
              </div>
            </div>

            {/* Giant Headline with dynamic rotating solution narrative */}
            <h1
              className={`text-3xl sm:text-5xl lg:text-[44px] xl:text-[50px] 2xl:text-[54px] font-bold tracking-[-0.04em] leading-[1.12] mt-3.5 sm:mt-4 mb-6 transition-colors duration-500 ${
                currentTheme.isNight ? "text-white" : "text-neutral-950"
              }`}
            >
              {lang === "id" ? (
                <>
                  Mitra rekayasa{" "}
                  <span className={currentTheme.isNight ? "text-neutral-400 font-normal" : "text-[#8E8E93] font-normal"}>
                    untuk solusi
                  </span>{" "}
                  <br />
                  <RotatingSolutionsText
                    words={solutionsId}
                    effect={animEffect}
                    interval={3000}
                    className={currentTheme.isNight ? "text-white drop-shadow-sm" : "text-[#04060A]"}
                  />
                  <br />
                  <span className={currentTheme.isNight ? "text-neutral-400 font-normal" : "text-[#8E8E93] font-normal"}>
                    bagi perusahaan &
                  </span>{" "}
                  pertumbuhan bisnis.
                </>
              ) : (
                <>
                  Engineering partner{" "}
                  <span className={currentTheme.isNight ? "text-neutral-400 font-normal" : "text-[#8E8E93] font-normal"}>
                    delivering
                  </span>{" "}
                  <br />
                  <RotatingSolutionsText
                    words={solutionsEn}
                    effect={animEffect}
                    interval={3000}
                    className={currentTheme.isNight ? "text-white drop-shadow-sm" : "text-[#04060A]"}
                  />
                  <br />
                  <span className={currentTheme.isNight ? "text-neutral-400 font-normal" : "text-[#8E8E93] font-normal"}>
                    for enterprises &
                  </span>{" "}
                  high-growth businesses.
                </>
              )}
            </h1>

            {/* Action Buttons: Signature Fill-Expand and Outline Pill */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                variant="expand"
                size="md"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {content.ctaPrimary[lang]}
              </Button>

              <Button
                variant={currentTheme.isNight ? "translucent" : "outline"}
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
                ? "Gemilang Space adalah studio rekayasa produk dan desain founder-led. Kami menghadirkan solusi menyeluruh: dari platform SaaS terukur, integrasi AI cerdas terapan, hingga design system berstandar enterprise untuk mempercepat pertumbuhan produk Anda."
                : "Gemilang Space is a founder-led engineering and design studio delivering comprehensive digital solutions: from scalable SaaS platforms and applied AI to enterprise-grade design systems built to accelerate product roadmaps and drive growth."}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              {/* Client Brand Logos */}
              <div
                className={`flex items-center gap-5 sm:gap-7 transition-all ${
                  currentTheme.isNight
                    ? "opacity-85 text-white invert"
                    : "opacity-75 grayscale hover:grayscale-0 text-neutral-800"
                }`}
              >
                {/* Screenloop */}
                <div className="flex items-center gap-1.5 font-bold tracking-tighter text-sm sm:text-base text-neutral-800">
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-neutral-900 inline-block" />
                  <span>screenloop</span>
                </div>

                {/* Uptech */}
                <div className="flex items-center gap-1 font-semibold tracking-tight text-sm sm:text-base text-neutral-800">
                  <span className="font-mono text-xs font-bold text-neutral-500">▲</span>
                  <span>uptech</span>
                </div>

                {/* 5U */}
                <div className="flex items-center font-black tracking-tighter text-base sm:text-lg text-neutral-900">
                  <span>5U</span>
                </div>

                {/* Polygon */}
                <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-neutral-800">
                  <svg className="w-4 h-4 text-neutral-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                  <span>polygon</span>
                </div>
              </div>

              {/* Dribbble SELECT Ribbon Badge (Verbatim from uploaded screenshot) */}
              <div className="bg-[#0D1017] text-white px-3.5 py-2 rounded-xl shadow-md flex flex-col items-center justify-center border border-neutral-800/80 min-w-[95px] text-center select-none">
                <div className="flex items-center gap-1.5 pb-1 border-b border-white/10 w-full justify-center">
                  <svg className="w-3 h-3 text-pink-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.71 6.54a7.97 7.97 0 011.29 4.1c-.26-.05-2.5-.47-4.81.5-.06-.15-.12-.3-.19-.44a17.4 17.4 0 00-1.89-3.32c2.72-1.07 5.25-.92 5.6.16zm-7.61-4.47c2.09 0 4 .82 5.43 2.15-.31.06-2.5.54-5.07 1.63-1.18-2.18-2.26-3.6-2.48-3.9 1.48-.56 2.76-.88 3.12-.88zM6.92 5.89c.21.28 1.25 1.69 2.41 3.82-3.23 1.05-6.07 1.07-6.52 1.07.69-2.3 2.19-4.22 4.11-5.49zM4.1 13.06c.4 0 2.87-.04 6.13-1.12.33.65.63 1.33.89 2.03-3.69 1.15-6.57 3.51-6.84 3.74a7.96 7.96 0 01-.18-4.65zm8.9 6.84c-1.92 0-3.68-.7-5.06-1.88.24-.22 2.74-2.33 6.27-3.48 1.13 2.92 1.6 5.16 1.7 5.67-.93.44-1.97.69-3.08.69zm4.61-1.87c-.12-.47-.57-2.61-1.63-5.38 2.06-.92 4.02-.55 4.31-.49-.41 2.5-1.95 4.62-4.14 5.92z" />
                  </svg>
                  <span className="text-[7.5px] font-mono tracking-widest text-neutral-400 uppercase leading-none font-semibold">
                    TOP STUDIO
                  </span>
                </div>
                <div className="pt-1 flex items-baseline gap-1">
                  <span className="text-[8.5px] font-mono text-neutral-400">Dribbble</span>
                  <span className="text-[10px] font-bold tracking-tight text-white uppercase">SELECT</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* RIGHT COLUMN: Stack of 2 Dark Cards (Top is tall, bottom ~1x1) */}
        {/* ============================================================== */}
        <div className="flex flex-col gap-3.5 lg:gap-4 justify-between h-full min-h-0">
          
          {/* Top Card: Gemilang Space Club with Living GradientWave */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl border border-white/10 bg-[#090C15] flex-[1.8] min-h-0 group select-none">
            
            {/* Living WebGL Gradient Wave with Gemilang Navy-Indigo-Electric palette */}
            <GradientWave
              colors={["#080C1E", "#1D2B64", "#2563EB", "#38BDF8", "#60A5FA", "#0284C7"]}
              shadowPower={4}
              noiseSpeed={0.00004}
              deform={{ incline: 0.5, noiseAmp: 300, noiseFlow: 5, noiseSpeed: 12 }}
              className="opacity-95 pointer-events-none"
            />
            
            {/* Ambient Dark Gradient Vignette for crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/80 via-transparent to-transparent pointer-events-none z-0" />

            <div className="relative z-10">
              <span className="text-[#38BDF8] font-mono text-[11px] sm:text-xs font-bold tracking-widest uppercase inline-block">
                {content.clubCard.badge}
              </span>
              <h2 className="text-2xl sm:text-[27px] font-bold text-white tracking-[-0.03em] mt-1.5 leading-[1.14]">
                {content.clubCard.title[lang]}
              </h2>
              <p className="text-neutral-300/85 text-xs sm:text-[13px] mt-2 leading-relaxed max-w-[240px] font-normal">
                {content.clubCard.description[lang]}
              </p>
            </div>

            <div className="relative z-10 mt-4">
              <Button
                variant="translucent"
                size="sm"
                href={content.clubCard.href}
                className="w-full justify-between"
              >
                {content.clubCard.buttonText[lang]}
              </Button>
            </div>
          </div>

          {/* Bottom Card: 5U AI Case Study Card (1:1 with image.png reference) */}
          <Link
            href="/works"
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#181B25] p-1 flex flex-col justify-between shadow-2xl flex-1 min-h-[220px] group transition-all duration-300 hover:border-white/20 select-none cursor-pointer"
          >
            {/* Top Photo Container: Compact 4px outer margin matching image.png */}
            <div className="relative w-full h-[155px] sm:h-[175px] rounded-[18px] overflow-hidden bg-neutral-900 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://framerusercontent.com/images/Q1nGlUmv7vVS6li66XKTFlMrIbk.png?width=1536&height=1536"
                alt="5U AI Team"
                className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-700 ease-out"
              />

              {/* Dark subtle vignette over photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

              {/* Center/Bottom Overlay: CORE SQUAD tag + 5 SENIOR BUILDERS + Tagline */}
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-3 text-center pointer-events-none">
                <span className="text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold mb-1">
                  CORE SQUAD
                </span>
                <span className="text-2xl sm:text-[28px] font-black tracking-tight text-white leading-none">
                  5 SENIOR
                </span>
                <span className="text-[9.5px] text-neutral-300 tracking-tight mt-1 font-medium">
                  {lang === "id" ? "Dedicated Tech Squad" : "Dedicated Engineering Squad"}
                </span>
              </div>
            </div>

            {/* Bottom Text Content Area */}
            <div className="pt-2.5 pb-2 px-3 flex flex-col justify-center">
              <h4 className="text-sm sm:text-[14.5px] font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors leading-snug">
                Gemilang Space Team
              </h4>
              <p className="text-xs sm:text-[12.5px] text-neutral-400 font-normal mt-0.5 leading-snug">
                {lang === "id"
                  ? "Squad inti 5 engineer senior yang mengeksekusi langsung produk Anda."
                  : "Core squad of 5 senior engineers shipping directly to production."}
              </p>
            </div>
          </Link>

        </div>

      </div>

      {/* ============================================================== */}
      {/* FLOATING TIME-OF-DAY SCROLL / SLIDER CONTROLLER                */}
      {/* ============================================================== */}
      {showTimeController && (
        <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#0D1017]/95 text-white border border-white/15 p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-xl w-[310px] sm:w-[350px]">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <TimeIcon className="w-4 h-4 text-[#38BDF8]" />
                <h4 className="text-xs font-bold tracking-tight text-white uppercase font-mono">
                  {lang === "id" ? "Pengaturan Jam & Langit" : "Sky & Time Controller"}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowTimeController(false)}
                className="text-neutral-400 hover:text-white text-xs font-mono p-1 rounded-md hover:bg-white/10 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Current Active Theme Info */}
            <div className="mt-3 bg-white/5 border border-white/10 rounded-xl p-2.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-400 block uppercase">
                  {lang === "id" ? "Suasana Aktif" : "Active Palette"}
                </span>
                <span className="text-xs font-bold text-white">
                  {lang === "id" ? currentTheme.nameId : currentTheme.name}
                </span>
              </div>
              <span className="text-lg font-mono font-bold text-[#38BDF8]">
                {String(Math.floor(simulatedHour)).padStart(2, "0")}:00
              </span>
            </div>

            {/* Interactive Scroll / Slider */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] font-mono text-neutral-400 mb-1.5">
                <span>00:00 (Malam)</span>
                <span>12:00 (Siang)</span>
                <span>23:00</span>
              </div>
              <input
                type="range"
                min="0"
                max="23"
                step="1"
                value={simulatedHour}
                onChange={(e) => {
                  setIsAutoTime(false);
                  setSimulatedHour(Number(e.target.value));
                }}
                className="w-full accent-[#38BDF8] h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-4 gap-1.5 mt-3.5">
              <button
                type="button"
                onClick={() => {
                  setIsAutoTime(false);
                  setSimulatedHour(7);
                }}
                className={`py-1.5 px-1 rounded-lg text-[10.5px] font-medium border text-center transition-all cursor-pointer ${
                  simulatedHour >= 5 && simulatedHour < 11
                    ? "bg-[#FF9A76]/25 border-[#FF9A76] text-white font-bold"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                🌅 Pagi
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAutoTime(false);
                  setSimulatedHour(13);
                }}
                className={`py-1.5 px-1 rounded-lg text-[10.5px] font-medium border text-center transition-all cursor-pointer ${
                  simulatedHour >= 11 && simulatedHour < 16
                    ? "bg-[#38BDF8]/25 border-[#38BDF8] text-white font-bold"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                ☀️ Siang
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAutoTime(false);
                  setSimulatedHour(17);
                }}
                className={`py-1.5 px-1 rounded-lg text-[10.5px] font-medium border text-center transition-all cursor-pointer ${
                  simulatedHour >= 16 && simulatedHour < 19
                    ? "bg-[#F97316]/25 border-[#F97316] text-white font-bold"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                🌇 Sore
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAutoTime(false);
                  setSimulatedHour(22);
                }}
                className={`py-1.5 px-1 rounded-lg text-[10.5px] font-medium border text-center transition-all cursor-pointer ${
                  simulatedHour >= 19 || simulatedHour < 5
                    ? "bg-[#9333EA]/25 border-[#9333EA] text-white font-bold"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                🌙 Malam
              </button>
            </div>

            {/* Auto Real-Time Sync Toggle */}
            <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-neutral-400 text-[11px]">
                {lang === "id" ? "Sinkron Jam Nyata" : "Sync Real-time Clock"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsAutoTime(true);
                  setSimulatedHour(new Date().getHours());
                }}
                className={`text-[11px] font-mono px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                  isAutoTime
                    ? "bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/40"
                    : "bg-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                {isAutoTime ? "● Auto ON" : "Auto OFF"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
