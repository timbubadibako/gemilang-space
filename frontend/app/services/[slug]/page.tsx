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
    "screenloop",
    "housr",
    "codeaweb",
    "efficense",
    "enorm",
    "hostware",
    "uptech",
    "5U AI",
    "polygon",
    "hospitable",
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 selection:bg-[#335CFF] selection:text-white flex flex-col font-sans">
      {/* Light-Themed Navbar */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
        theme="light"
      />

      <main className="w-full flex-1">
        {/* ==================================================================== */}
        {/* 1. HERO SECTION (1:1 with Screenshot 1)                              */}
        {/* ==================================================================== */}
        <section className="w-full pt-8 sm:pt-12 pb-16 sm:pb-20">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            {/* Giant Silver/Noise Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-[#ECECED] via-[#E2E2E6] to-[#D4D4DA] border border-neutral-300/80 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xs">
              {/* Subtle stipple background */}
              <div className="absolute inset-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.03] pointer-events-none" />

              {/* Dribbble Top Agency Badge on Top-Right */}
              <div className="hidden sm:flex absolute top-8 right-8 lg:top-12 lg:right-12 flex-col items-center bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-neutral-200/80 text-center select-none w-36">
                <div className="text-[9px] font-mono font-bold tracking-widest text-neutral-400 uppercase mb-1.5">
                  TOP UI/UX DESIGN AGENCY
                </div>
                <div className="font-serif italic font-bold text-lg text-neutral-950">
                  Dribbble
                </div>
                <div className="mt-1 bg-neutral-950 text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold">
                  SELECT
                </div>
              </div>

              {/* Hero Content */}
              <div className="relative z-10 max-w-2xl">
                <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-500 mb-4">
                  {service.eyebrow}
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-neutral-950 tracking-tight leading-[1.1] mb-6">
                  {service.title[lang]}
                </h1>

                <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-normal mb-8 max-w-xl">
                  {service.description[lang]}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2.5 bg-neutral-950 hover:bg-black text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 group"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <span>{lang === "id" ? "Mulai Proyek" : "Start a Project"}</span>
                  </Link>

                  <Link
                    href="/works"
                    className="inline-flex items-center justify-center bg-white/80 hover:bg-white text-neutral-900 border border-neutral-300 text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-200 shadow-2xs"
                  >
                    {lang === "id" ? "Lihat Karya" : "Works"}
                  </Link>
                </div>
              </div>
            </div>

            {/* 4-Column Value Props Below Hero Card (1:1 with Screenshot 1) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pt-12 sm:pt-16 pb-12 border-b border-neutral-200/80">
              <div className="space-y-2">
                <Crown className="w-5 h-5 text-neutral-900" />
                <h2 className="text-sm sm:text-[15px] font-bold text-neutral-950">
                  Founder-Led
                </h2>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {lang === "id"
                    ? "Keterlibatan langsung founder senior dari audit sistem hingga arsitektur final."
                    : "Direct senior involvement from audit to system architecture."}
                </p>
              </div>

              <div className="space-y-2">
                <Maximize2 className="w-5 h-5 text-neutral-900" />
                <h2 className="text-sm sm:text-[15px] font-bold text-neutral-950">
                  Built for Scale
                </h2>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {lang === "id"
                    ? "Dirancang untuk mendukung produk yang berkembang pesat, tim multidisiplin, dan fitur baru."
                    : "Designed to support growing products, teams and feature sets."}
                </p>
              </div>

              <div className="space-y-2">
                <Code2 className="w-5 h-5 text-neutral-900" />
                <h2 className="text-sm sm:text-[15px] font-bold text-neutral-950">
                  Design + Development Mindset
                </h2>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {lang === "id"
                    ? "Sistem dirancang sesuai cara desainer dan developer benar-benar mengeksekusi kode di produksi."
                    : "Systems shaped around how designers and engineers actually work."}
                </p>
              </div>

              <div className="space-y-2">
                <Gauge className="w-5 h-5 text-neutral-900" />
                <h2 className="text-sm sm:text-[15px] font-bold text-neutral-950">
                  Faster Product Delivery
                </h2>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {lang === "id"
                    ? "Fondasi komponen siap pakai memotong keputusan repetitif dan menghilangkan eksekusi inkonsisten."
                    : "Reusable foundations reduce repetitive decisions and inconsistent execution."}
                </p>
              </div>
            </div>

            {/* Client Logos Monochrome Row */}
            <div className="pt-8 pb-4 select-none overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
                {clientLogos.map((logo, idx) => (
                  <span
                    key={idx}
                    className="text-xs sm:text-[13px] font-bold tracking-tight text-neutral-800 uppercase"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 2. SELECTED WORK / SHOWCASE FOR THIS SERVICE (Screenshot 2)          */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#FAFAFC] border-t border-neutral-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-12">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-2.5">
                {service.selectedWorkEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-950 tracking-tight">
                {service.selectedWorkTitle[lang]}
              </h2>
            </div>

            {/* 3 Preview Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-10">
              {service.selectedWorkImages.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-2xs group"
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

            {/* View All Works Pill Button */}
            <div className="flex justify-center pt-2">
              <Link
                href="/works"
                className="inline-flex items-center gap-2 bg-neutral-950 hover:bg-black text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-sm active:scale-95 group"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span>{lang === "id" ? "Lihat Semua Karya" : "View All Works"}</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 3. BEST FIT SECTION (1:1 with Screenshot 3)                          */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-white border-t border-neutral-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-14">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#335CFF] mb-2.5">
                {service.bestFitEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-neutral-950 tracking-tight leading-[1.15]">
                {service.bestFitTitle[lang]}
              </h2>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8">
              {service.bestFitCards.map((card) => (
                <div
                  key={card.num}
                  className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FB] border border-neutral-200/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="text-xs font-mono font-bold text-neutral-400 mb-4">
                      {card.num}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight mb-2.5">
                      {card.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                      {card.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-neutral-500 font-normal">
              {lang === "id"
                ? "Sangat berguna ketika produk sudah berfungsi, tetapi pengalamannya belum mencerminkan potensi sebenarnya."
                : "Especially useful when the product works, but the experience no longer reflects its potential."}
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 4. WHY IT MATTERS (DARK SECTION) (1:1 with Screenshot 4)             */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#0A0B0E] text-white">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#5577FF] mb-2.5">
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
                  className="p-6 sm:p-8 rounded-2xl bg-[#12141B] border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
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
                    <div className="text-[11px] font-mono font-bold tracking-widest text-[#5577FF] uppercase">
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
        {/* 5. PROCESS (1:1 with Screenshot 5)                                   */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-white border-t border-neutral-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-16">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-2.5">
                {service.processEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-neutral-950 tracking-tight leading-[1.15]">
                {service.processTitle[lang]}
              </h2>
            </div>

            {/* 5 Numbered Steps */}
            <div className="divide-y divide-neutral-200/80 border-y border-neutral-200/80 mb-10">
              {service.processSteps.map((step) => (
                <div
                  key={step.num}
                  className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start"
                >
                  <div className="md:col-span-4 flex items-center gap-4">
                    <span className="text-xs font-mono font-bold text-neutral-400">
                      {step.num}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950">
                      {step.step[lang]}
                    </h3>
                  </div>
                  <div className="md:col-span-8">
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                      {step.desc[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-neutral-500 font-normal">
              {lang === "id"
                ? "Perlu produk ditranslasikan ke design system terukur atau handoff siap develop? Gemilang siap mendampingi hingga fase implementasi dan QA desain."
                : "Need the product translated into a scalable design system or developer-ready handoff? Gemilang can continue through implementation support and design QA."}
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 6. WHAT YOU GET (DELIVERABLES PILLS) (Screenshot 6)                  */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#F8F9FA] border-t border-neutral-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-10 sm:mb-12">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#335CFF] mb-2.5">
                {service.whatYouGetEyebrow}
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-neutral-950 tracking-tight leading-[1.15]">
                {service.whatYouGetTitle[lang]}
              </h2>
            </div>

            {/* Deliverables Checklist Grid (1:1 with Screenshot 6) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 mb-8">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-white border border-neutral-200/80 shadow-2xs text-xs sm:text-[13px] font-medium text-neutral-800"
                >
                  <Check className="w-4 h-4 text-[#335CFF] shrink-0 stroke-[2.5]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-neutral-500 font-normal">
              {lang === "id"
                ? "Deliverable aktual disesuaikan secara presisi dengan tahap produk, cakupan, dan kompleksitas teknis tim Anda."
                : "Exact deliverables are tailored to the product stage, scope and technical complexity."}
            </p>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 7. WHY GEMILANG (Screenshot 7)                                       */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-white border-t border-neutral-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-14">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-2.5">
                WHY GEMILANG
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-neutral-950 tracking-tight leading-[1.15]">
                {lang === "id"
                  ? "Pemikiran brand dengan pengalaman produk di belakangnya."
                  : "Brand thinking with product experience behind it."}
              </h2>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FA] border border-neutral-200/80 space-y-3">
                <Crown className="w-5 h-5 text-neutral-900" />
                <h3 className="text-base font-bold text-neutral-950">Founder-Led</h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Bekerja langsung dengan desainer senior berpengalaman dari obrolan pertama hingga pengiriman akhir."
                    : "Work directly with senior design from the first conversation to final delivery."}
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FA] border border-neutral-200/80 space-y-3">
                <Layers className="w-5 h-5 text-neutral-900" />
                <h3 className="text-base font-bold text-neutral-950">Product Thinking</h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Kami memahami bahwa brand teknologi harus hidup di UI produk, website, peluncuran, bukan sekadar slide deck."
                    : "We understand that a technology brand must work across product UI, websites, launches and investor communication, not just a brand deck."}
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FA] border border-neutral-200/80 space-y-3">
                <Sparkles className="w-5 h-5 text-neutral-900" />
                <h3 className="text-base font-bold text-neutral-950">Exceptional Craft</h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Tipografi, komposisi, sistem desain, dan detail mikro diperlakukan sebagai esensi pengalaman produk."
                    : "Typography, composition, systems and detail are treated as part of the product experience."}
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FA] border border-neutral-200/80 space-y-3">
                <Gauge className="w-5 h-5 text-neutral-900" />
                <h3 className="text-base font-bold text-neutral-950">Faster Turnaround</h3>
                <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Proses langsung yang memangkas presentasi bertele-tele, hambatan birokrasi, dan lapisan agensi tradisional."
                    : "A focused process removes unnecessary presentations, handoffs and agency layers."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 8. WAYS TO WORK TOGETHER (Screenshot 8)                              */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-[#FAFAFC] border-t border-neutral-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-14">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-2.5">
                WAYS TO WORK TOGETHER
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-neutral-950 tracking-tight leading-[1.15]">
                {lang === "id"
                  ? "Satu proyek terdefinisi atau mitra desain berkelanjutan."
                  : "One product project or an ongoing design partner."}
              </h2>
            </div>

            {/* 2 Big Cards: Custom Project vs Design Subscription */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Card 1: Custom Project */}
              <div className="rounded-3xl bg-white border border-neutral-200/90 p-8 sm:p-10 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-3">
                    CUSTOM PROJECT
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-3">
                    {lang === "id" ? "Butuh satu kali proyek?" : "Need this once?"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-8">
                    {lang === "id"
                      ? "Paling cocok untuk keterlibatan produk terdefinisi dengan ruang lingkup, jadwal, dan output yang jelas."
                      : "Best for a defined product engagement with a clear scope, timeline and outcome."}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-neutral-700 font-medium mb-10">
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span>Fixed scope</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span>Defined timeline</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span>Clear deliverables</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span>UX/UI ownership</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span>Prototype & handoff</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
                      <span>Optional design-system extension</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-neutral-950 hover:bg-black text-white text-xs sm:text-sm font-semibold px-7 py-4 rounded-full transition-all duration-200 self-start group shadow-sm active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-white group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span>{lang === "id" ? "Mulai Proyek Produk" : "Start a Product Project"}</span>
                </Link>
              </div>

              {/* Card 2: Design Subscription with Cosmic Gradient */}
              <div className="rounded-3xl bg-gradient-to-br from-[#12131A] via-[#1B1D36] to-[#0A2E6E] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden shadow-md">
                <div className="relative z-10">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#7999FF] font-bold mb-3">
                    DESIGN SUBSCRIPTION
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                    {lang === "id" ? "Butuh desain secara berkelanjutan?" : "Need design continuously?"}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-8">
                    {lang === "id"
                      ? "Paling cocok untuk tim yang memerlukan dukungan berkelanjutan di seluruh produk, web, brand, dan Framer."
                      : "Best for teams that need ongoing support across product, web, brand and Framer."}
                  </p>

                  <ul className="space-y-3 text-xs sm:text-sm text-neutral-200 font-medium mb-10">
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#335CFF]" />
                      <span>Ongoing requests</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#335CFF]" />
                      <span>Flexible priorities</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#335CFF]" />
                      <span>New features</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#335CFF]" />
                      <span>Product improvements</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#335CFF]" />
                      <span>Design system support</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#335CFF]" />
                      <span>Product + marketing design</span>
                    </li>
                  </ul>
                </div>

                <Link
                  href="/contact"
                  className="relative z-10 inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-neutral-950 text-xs sm:text-sm font-semibold px-7 py-4 rounded-full transition-all duration-200 self-start group shadow-sm active:scale-95"
                >
                  <div className="w-5 h-5 rounded-full bg-neutral-900/10 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <span>{lang === "id" ? "Eksplorasi Langganan Desain" : "Explore Design Subscription"}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 9. TESTIMONIALS (Per user instruction: diikuti testimone)             */}
        {/* ==================================================================== */}
        <TestimonialsSection lang={lang} />

        {/* ==================================================================== */}
        {/* 10. FAQ (Per user instruction: faq)                                  */}
        {/* ==================================================================== */}
        <FAQSection lang={lang} />

        {/* ==================================================================== */}
        {/* 11. CALL TO ACTION (Aurora CTA Banner)                               */}
        {/* ==================================================================== */}
        <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />
      </main>

      {/* 12. SIGNATURE BROCKMANN FOOTER (Per user instruction: dan footer) */}
      <Footer lang={lang} />
    </div>
  );
}
