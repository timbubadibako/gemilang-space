"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Zap, MessageSquare, CheckCircle2, ShieldCheck, Sparkles, Terminal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { navItems, siteSettings } from "@/data/site-content";

export default function AboutPage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);

  const stats = [
    {
      num: "10+",
      label: {
        id: "Solusi klien, POS offline-first & produk digital sukses dikirim",
        en: "Client solutions, offline-first POS & products successfully shipped",
      },
    },
    {
      num: "99.9%",
      label: {
        id: "Uptime arsitektur ultra-lean dengan biaya server efisien",
        en: "Ultra-lean architecture uptime with ultra-low hosting overhead",
      },
    },
    {
      num: "100%",
      label: {
        id: "Hak cipta & kode sumber penuh milik klien, tanpa vendor lock-in",
        en: "Full IP & source code ownership transferred to client, zero lock-in",
      },
    },
    {
      num: "6+",
      label: {
        id: "Tahun pengalaman rekayasa perangkat lunak, IoT & desain sistem",
        en: "Years of software engineering, IoT & system design experience",
      },
    },
  ];

  const remotePillars = [
    {
      title: "Async First & Transparan",
      desc: {
        id: "Pembaruan progress tertulis harian dan dokumentasi teknis rapi daripada rapat panjang tanpa output nyata.",
        en: "Written daily progress updates and structured documentation over endless unproductive meetings.",
      },
    },
    {
      title: "Arsitektur Teruji",
      desc: {
        id: "Setiap baris kode dibangun di atas fondasi solid (Next.js, Supabase, Tailwind, Dexie) yang mudah dirawat jangka panjang.",
        en: "Every line of code rests on robust foundations (Next.js, Supabase, Tailwind, Dexie) easily maintainable long-term.",
      },
    },
    {
      title: "Direct Access ke Lead Engineer",
      desc: {
        id: "Anda berdiskusi langsung dengan arsitek dan pembangun sistem, tanpa distorsi dari account manager agensi.",
        en: "Direct access to lead engineers and system architects with zero layers of junior account managers.",
      },
    },
    {
      title: "Zero-Bullshit Delivery",
      desc: {
        id: "Estimasi waktu dan biaya yang transparan, testing empiris sebelum serah terima, dan panduan runbook lengkap.",
        en: "Transparent time and cost estimates, empirical test gates before signoff, and comprehensive handover runbooks.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 selection:bg-[#00E1BA] selection:text-white flex flex-col font-sans">
      {/* Light Navbar */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
        theme="light"
      />

      <main className="w-full flex-1">
        {/* ==================================================================== */}
        {/* 1. HERO SECTION                                                      */}
        {/* ==================================================================== */}
        <section className="w-full pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-[880px] mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200/80 text-xs font-mono font-medium text-neutral-600 uppercase mb-4 tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-neutral-800" />
                {lang === "id" ? "Tentang Gemilang Space" : "About Gemilang Space"}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.12] mb-6">
                {lang === "id"
                  ? "Studio rekayasa digital mandiri untuk solusi berdampak nyata."
                  : "An independent digital engineering studio built for real impact."}
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl">
                {lang === "id"
                  ? "Gemilang Space adalah studio digital dan teknologi yang dipimpin langsung oleh founder untuk bisnis yang membutuhkan website berkecepatan tinggi, sistem POS offline-first, aplikasi mobile, dan integrasi WhatsApp otomatis. Kami menggabungkan pemikiran arsitektural senior dengan eksekusi cepat tanpa birokrasi agensi konvensional."
                  : "Gemilang Space is a founder-led digital engineering studio for businesses needing high-speed websites, offline-first POS systems, mobile apps, and automated WhatsApp workflows. We blend senior architectural rigor with rapid execution and zero agency overhead."}
              </p>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-neutral-200/80">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-2 p-5 rounded-2xl bg-[#F8F9FA] border border-neutral-200/80">
                  <div className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 font-mono">
                    {stat.num}
                  </div>
                  <div className="text-xs sm:text-[13px] text-neutral-600 font-normal leading-relaxed">
                    {stat.label[lang]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 2. OUR APPROACH / MANIFESTO CARD                                     */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 border-t border-neutral-200/80 bg-[#FAFAFC]">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-[960px] mx-auto bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 lg:p-16 shadow-sm relative overflow-hidden">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-4">
                PENDEKATAN KAMI
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[38px] font-bold text-neutral-950 tracking-tight leading-[1.2] mb-8">
                {lang === "id"
                  ? "Arsitektur lean. Kode bersih. Kecepatan maksimal."
                  : "Lean architecture. Clean code. Maximum velocity."}
              </h2>

              <div className="space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                <p>
                  {lang === "id"
                    ? "Kami percaya perangkat lunak yang hebat tidak harus rumit dan membebani penggunanya. Kami membangun sistem dengan standar industri (Next.js, Supabase, Tailwind, Dexie) yang mengutamakan kecepatan muat di bawah 1 detik, ketahanan offline di lokasi pabrik atau pedesaan, dan efisiensi biaya hosting."
                    : "We believe great software doesn't need unnecessary complexity. We engineer systems with modern standard frameworks prioritizing sub-second load times, offline resilience in remote operations, and minimal cloud hosting bills."}
                </p>
                <p>
                  {lang === "id"
                    ? "Setiap solusi yang kami bangun diserahkan dengan kepemilikan kode sumber 100% kepada klien. Tanpa lisensi sewa tersembunyi, tanpa ketergantungan sepihak, dan dengan dokumentasi operasional (runbook) yang jelas."
                    : "Every solution we deliver comes with 100% full source code ownership. No hidden proprietary licensing fees, no artificial lock-in, and clear operational runbooks."}
                </p>
              </div>

              {/* Founder Signature Quote */}
              <div className="mt-10 p-5 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-neutral-800 text-sm sm:text-[15px] italic flex items-center gap-3">
                <Terminal className="w-5 h-5 text-neutral-600 shrink-0" />
                <span>
                  &ldquo;{lang === "id"
                    ? "Bisnis Anda tidak membutuhkan 5 agensi berbeda hanya untuk mewujudkan satu sistem yang bekerja lancar setiap hari."
                    : "Your business shouldn't need five different agencies just to ship one reliable digital system that works seamlessly every day."}&rdquo;
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 3. REMOTE BY DEFAULT                                                 */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 border-t border-neutral-200/80 bg-white">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-14">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-2.5">
                CARA KERJA KAMI
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-neutral-950 tracking-tight leading-[1.15]">
                {lang === "id"
                  ? "Kolaborasi efisien, transparan, dan berbasis hasil nyata."
                  : "Efficient, transparent, and outcome-oriented collaboration."}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed font-normal">
                {lang === "id"
                  ? "Gemilang melayani klien dari berbagai wilayah di Indonesia dan regional. Komunikasi kami terstruktur dan cepat via WhatsApp, repositori Git terbuka, dan demo interaktif."
                  : "Gemilang serves clients across Indonesia and regional teams. Structured rapid communication via WhatsApp, transparent Git repositories, and interactive live demos."}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {remotePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FA] border border-neutral-200/80 space-y-3 hover:border-neutral-300 transition-colors"
                >
                  <h3 className="text-base font-bold text-neutral-950">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed font-normal">
                    {pillar.desc[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Integrated Contact Section */}
      <ContactSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Aurora CTA Banner */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Dark Footer */}
      <Footer lang={lang} />
    </div>
  );
}
