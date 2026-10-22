"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowRight,
  Check,
  Crown,
  Maximize2,
  Code2,
  Gauge,
  Sparkles,
  Award,
  Layers,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { navItems, siteSettings } from "@/data/site-content";
import { servicesData, ServiceItemData } from "@/data/services-data";

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "design-systems";
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);

  // Fallback to design-systems or product-design if unknown
  const service: ServiceItemData = servicesData[slug] || servicesData["design-systems"];

  const clientLogos = [
    "PT DAVID BECKHAM",
    "FERMION ROASTERY",
    "DESA DIGITAL",
    "PESANTREN OS",
    "FOURJECTIVE",
    "QIYAR MEDIA",
    "SUPABASE",
    "CLOUDFLARE",
  ];

  return (
    <div className="min-h-screen bg-[#04060A] text-white selection:bg-[#00E1BA] selection:text-neutral-950 flex flex-col font-sans">
      {/* Dark Navbar */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
      />

      <main className="w-full flex-1">
        {/* ==================================================================== */}
        {/* 1. HERO SECTION                                                      */}
        {/* ==================================================================== */}
        <section className="w-full pt-8 sm:pt-12 pb-16 sm:pb-20">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            {/* Giant Dark Card */}
            <div className="relative rounded-3xl bg-[#080C14] border border-white/10 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
              {/* Subtle stipple background */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

              {/* Engineering Studio Badge on Top-Right */}
              <div className="hidden sm:flex absolute top-8 right-8 lg:top-12 lg:right-12 flex-col items-center bg-white/[0.04] backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center select-none w-40">
                <div className="text-[9px] font-mono font-bold tracking-widest text-[var(--theme-accent)] uppercase mb-1.5">
                  ENGINEERING STUDIO
                </div>
                <div className="font-sans font-bold text-base text-white">
                  Gemilang Space
                </div>
                <div className="mt-1 bg-white/[0.08] text-neutral-300 text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold">
                  DIRECT ACCESS
                </div>
              </div>

              {/* Hero Content */}
              <div className="relative z-10 max-w-2xl">
                <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[var(--theme-accent)] mb-4">
                  {service.eyebrow}
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.12] mb-6">
                  {service.title[lang]}
                </h1>

                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal mb-8 max-w-xl">
                  {service.description[lang]}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 bg-[var(--theme-accent)] hover:brightness-110 text-neutral-950 text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-200 shadow-md active:scale-95 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-black/10 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span>{lang === "id" ? "Mulai Proyek" : "Start a Project"}</span>
                  </Link>

                  <Link
                    href="/works"
                    className="inline-flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-200"
                  >
                    {lang === "id" ? "Lihat Portofolio" : "Works Portfolio"}
                  </Link>
                </div>
              </div>
            </div>

            {/* 4-Column Value Props Below Hero Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pt-12 sm:pt-16 pb-12 border-b border-white/10">
              <div className="space-y-2">
                <Crown className="w-5 h-5 text-[var(--theme-accent)]" />
                <h2 className="text-sm sm:text-[15px] font-bold text-white">
                  Founder-Led
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === "id"
                    ? "Keterlibatan langsung founder senior dari audit sistem hingga arsitektur final."
                    : "Direct senior involvement from audit to system architecture."}
                </p>
              </div>

              <div className="space-y-2">
                <Maximize2 className="w-5 h-5 text-[var(--theme-accent)]" />
                <h2 className="text-sm sm:text-[15px] font-bold text-white">
                  Built for Scale
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === "id"
                    ? "Dirancang untuk mendukung produk yang berkembang pesat, tim multidisiplin, dan fitur baru."
                    : "Designed to support growing products, teams and feature sets."}
                </p>
              </div>

              <div className="space-y-2">
                <Code2 className="w-5 h-5 text-[var(--theme-accent)]" />
                <h2 className="text-sm sm:text-[15px] font-bold text-white">
                  Design + Dev Mindset
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === "id"
                    ? "Sistem dirancang sesuai cara desainer dan developer benar-benar mengeksekusi kode di produksi."
                    : "Systems shaped around how designers and engineers actually work."}
                </p>
              </div>

              <div className="space-y-2">
                <Gauge className="w-5 h-5 text-[var(--theme-accent)]" />
                <h2 className="text-sm sm:text-[15px] font-bold text-white">
                  Faster Delivery
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === "id"
                    ? "Fondasi komponen siap pakai memotong keputusan repetitif dan menghilangkan eksekusi inkonsisten."
                    : "Reusable foundations reduce repetitive decisions and inconsistent execution."}
                </p>
              </div>
            </div>

            {/* Client Logos Row */}
            <div className="pt-8 pb-4 select-none overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8 opacity-70">
                {clientLogos.map((logo, idx) => (
                  <span
                    key={idx}
                    className="text-xs sm:text-[12px] font-mono tracking-widest text-neutral-400 uppercase"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 2. SELECTED WORK / SHOWCASE FOR THIS SERVICE                         */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#06080E] border-t border-white/10">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-12">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[var(--theme-accent)] mb-2.5">
                {service.selectedWorkEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {service.selectedWorkTitle[lang]}
              </h2>
            </div>

            {/* 3 Preview Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
              {service.selectedWorkImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group"
                >
                  <Image
                    src={img}
                    alt="System work preview"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
              ))}
            </div>

            {/* View All Works Button */}
            <div className="flex justify-center pt-2">
              <Link
                href="/works"
                className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/10 text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200 active:scale-95 group"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-[var(--theme-accent)] group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span>{lang === "id" ? "Lihat Semua Karya" : "View All Works"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 3. BEST FIT SECTION                                                  */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#04060A] border-t border-white/10">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-14">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[var(--theme-accent)] mb-2.5">
                {service.bestFitEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
                {service.bestFitTitle[lang]}
              </h2>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8">
              {service.bestFitCards.map((card) => (
                <div
                  key={card.num}
                  className="p-6 sm:p-7 rounded-2xl bg-[#080C14] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-colors"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-[var(--theme-accent)] mb-4">
                      {card.num}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2.5">
                      {card.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                      {card.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-neutral-400 font-normal">
              {lang === "id"
                ? "Sangat berguna ketika produk sudah berfungsi, tetapi pengalamannya belum mencerminkan potensi sebenarnya."
                : "Especially useful when the product works, but the experience no longer reflects its potential."}
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 4. WHY IT MATTERS (DARK SECTION)                                     */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#06080E] text-white border-t border-white/10">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[var(--theme-accent)] mb-2.5">
                {service.whyMattersEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
                {service.whyMattersTitle[lang]}
              </h2>
            </div>

            {/* 3 Problem / Outcome Cards */}
            <div className="space-y-4 sm:space-y-5">
              {service.problems.map((item) => (
                <div
                  key={item.num}
                  className="p-6 sm:p-8 rounded-2xl bg-[#080C14] border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
                >
                  {/* Left: Problem */}
                  <div className="md:col-span-6 space-y-2 pr-0 md:pr-6 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0">
                    <div className="text-[11px] font-mono font-bold tracking-widest text-neutral-400 uppercase">
                      PROBLEM {item.num}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {item.problem[lang]}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                      {item.problemDetail[lang]}
                    </p>
                  </div>

                  {/* Right: Outcome */}
                  <div className="md:col-span-6 space-y-2 pl-0 md:pl-2">
                    <div className="text-[11px] font-mono font-bold tracking-widest text-[var(--theme-accent)] uppercase">
                      OUTCOME
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
                      {item.outcome[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 5. PROCESS                                                           */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#04060A] border-t border-white/10">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[var(--theme-accent)] mb-2.5">
                {service.processEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
                {service.processTitle[lang]}
              </h2>
            </div>

            {/* Numbered Steps */}
            <div className="divide-y divide-white/10 border-y border-white/10 mb-10">
              {service.processSteps.map((step) => (
                <div
                  key={step.num}
                  className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start"
                >
                  <div className="md:col-span-4 flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-[var(--theme-accent)]">
                      {step.num}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {step.step[lang]}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                      {step.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-neutral-400 font-normal">
              {lang === "id"
                ? "Perlu produk ditranslasikan ke design system terukur atau handoff siap develop? Gemilang siap mendampingi hingga fase implementasi dan QA desain."
                : "Need the product translated into a scalable design system or developer-ready handoff? Gemilang can continue through implementation support and design QA."}
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 6. WHAT YOU GET (DELIVERABLES PILLS)                                 */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#06080E] border-t border-white/10">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-12">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[var(--theme-accent)] mb-2.5">
                {service.whatYouGetEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
                {service.whatYouGetTitle[lang]}
              </h2>
            </div>

            {/* Deliverables Checklist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 mb-8">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-[#080C14] border border-white/10 text-xs sm:text-[13px] font-medium text-neutral-200"
                >
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0 stroke-[2.5]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-neutral-400 font-normal">
              {lang === "id"
                ? "Deliverable aktual disesuaikan secara presisi dengan tahap produk, cakupan, dan kompleksitas teknis tim Anda."
                : "Exact deliverables are tailored to the product stage, scope and technical complexity."}
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 7. WHY GEMILANG                                                      */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#04060A] border-t border-white/10">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-14">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[var(--theme-accent)] mb-2.5">
                WHY GEMILANG
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
                {lang === "id"
                  ? "Pemikiran brand dengan pengalaman rekayasa riil di baliknya."
                  : "Brand thinking with real engineering depth behind it."}
              </h2>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#080C14] border border-white/10 space-y-3">
                <Crown className="w-5 h-5 text-[var(--theme-accent)]" />
                <h3 className="text-base font-bold text-white">Founder-Led</h3>
                <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Bekerja langsung dengan engineer senior berpengalaman dari obrolan pertama hingga pengiriman akhir."
                    : "Work directly with senior engineers from first conversation to final delivery."}
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#080C14] border border-white/10 space-y-3">
                <Layers className="w-5 h-5 text-[var(--theme-accent)]" />
                <h3 className="text-base font-bold text-white">Product Thinking</h3>
                <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Kami memahami bahwa brand teknologi harus hidup di UI produk, sistem offline, dan kecepatan nyata."
                    : "We understand that tech brands live in fast interfaces, robust offline modes, and real-world reliability."}
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#080C14] border border-white/10 space-y-3">
                <Sparkles className="w-5 h-5 text-[var(--theme-accent)]" />
                <h3 className="text-base font-bold text-white">Exceptional Craft</h3>
                <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Tipografi, komposisi, sistem desain, dan detail mikro diperlakukan sebagai esensi pengalaman produk."
                    : "Typography, composition, systems and detail are treated as part of the product experience."}
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#080C14] border border-white/10 space-y-3">
                <Gauge className="w-5 h-5 text-[var(--theme-accent)]" />
                <h3 className="text-base font-bold text-white">Faster Turnaround</h3>
                <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Proses langsung yang memangkas presentasi bertele-tele, hambatan birokrasi, dan lapisan agensi tradisional."
                    : "A focused process removes unnecessary presentations, handoffs and agency layers."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 8. WAYS TO WORK TOGETHER                                             */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#06080E] border-t border-white/10">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-14">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[var(--theme-accent)] mb-2.5">
                OPSI KERJASAMA
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.15]">
                {lang === "id"
                  ? "Satu proyek terdefinisi atau mitra tim IT berkelanjutan."
                  : "One defined project or an ongoing engineering partner."}
              </h2>
            </div>

            {/* 2 Big Cards: Custom Project vs Dedicated Squad */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1: Custom Project */}
              <div className="rounded-3xl bg-[#080C14] border border-white/10 p-8 sm:p-10 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-3">
                    CUSTOM PROJECT
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {lang === "id" ? "Butuh satu kali proyek?" : "Need this once?"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-8">
                    {lang === "id"
                      ? "Paling cocok untuk keterlibatan produk terdefinisi dengan ruang lingkup, jadwal, dan deliverable yang jelas."
                      : "Best for a defined product engagement with a clear scope, timeline and outcome."}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-medium mb-10">
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span>Ruang lingkup terdefinisi (Fixed scope)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span>Timeline pasti (2-6 minggu)</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span>100% kepemilikan kode sumber</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span>Runbook & dokumentasi lengkap</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs sm:text-sm font-semibold px-7 py-4 rounded-full transition-all duration-200 self-start group shadow-sm active:scale-95 border border-white/10"
                >
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-[var(--theme-accent)] group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span>{lang === "id" ? "Mulai Proyek Spesifik" : "Start a Project"}</span>
                </Link>
              </div>

              {/* Card 2: Dedicated Squad */}
              <div className="rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#0E1E38] to-[#004B49] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-xl border border-white/15">
                <div className="relative z-10">
                  <div className="text-xs font-mono uppercase tracking-wider text-[var(--theme-accent)] font-bold mb-3">
                    DEDICATED SQUAD IT
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {lang === "id" ? "Butuh tim teknis bulanan?" : "Need ongoing engineering?"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-8">
                    {lang === "id"
                      ? "Paling cocok untuk bisnis yang memerlukan maintenance berkelanjutan, ekspansi fitur, dan respons cepat tanpa hire tim internal mahal."
                      : "Best for teams that need continuous feature delivery, maintenance, and rapid response without costly internal hiring."}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-neutral-200 font-medium mb-10">
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span>Mulai Rp 6.500.000 / bulan</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span>Fleksibel, bisa jeda (pause) kapan saja</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span>Akses langsung WhatsApp ke Lead Engineer</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                      <span>Dukungan Web, Mobile, POS, & Otomasi</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="relative z-10 inline-flex items-center gap-2.5 bg-[var(--theme-accent)] hover:brightness-110 text-neutral-950 text-xs sm:text-sm font-semibold px-7 py-4 rounded-full transition-all duration-200 self-start group shadow-md active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full bg-neutral-900/10 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span>{lang === "id" ? "Ambil Slot Squad IT" : "Secure IT Squad Slot"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 9. TESTIMONIALS */}
        <TestimonialsSection lang={lang} />

        {/* 10. FAQ */}
        <FAQSection lang={lang} />

        {/* 11. CALL TO ACTION */}
        <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />
      </main>

      {/* 12. FOOTER */}
      <Footer lang={lang} />
    </div>
  );
}