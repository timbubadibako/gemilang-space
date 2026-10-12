"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Zap, MessageSquare, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { navItems, siteSettings } from "@/data/site-content";

export default function AboutPage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);

  const stats = [
    {
      num: "$30M+",
      label: {
        id: "Total dana yang dihimpun oleh startup yang kami rancang",
        en: "Raised by startups we designed for",
      },
    },
    {
      num: "50+",
      label: {
        id: "Klien & tim global yang berkolaborasi bersama kami",
        en: "Clients & teams worked with",
      },
    },
    {
      num: "120+",
      label: {
        id: "Proyek & peluncuran produk digital yang sukses dikirim",
        en: "Projects & design engagements delivered",
      },
    },
    {
      num: "8+",
      label: {
        id: "Tahun pengalaman mendalam di rekayasa desain produk",
        en: "Years of design experience",
      },
    },
  ];

  const remotePillars = [
    {
      title: "Async first",
      desc: {
        id: "Pembaruan tertulis berkala dan video walkthrough terstruktur daripada rapat berulang tanpa ujung.",
        en: "Written updates and recorded walkthroughs instead of standing meetings.",
      },
    },
    {
      title: "Documented decisions",
      desc: {
        id: "Setiap alasan keputusan desain didokumentasikan, sehingga tidak ada detail penting yang terlupakan setelah call.",
        en: "Reasoning is written down, so nothing depends on remembering a call.",
      },
    },
    {
      title: "Focused calls",
      desc: {
        id: "Kami hanya menjadwalkan meeting saat obrolan langsung jauh lebih cepat memecahkan masalah.",
        en: "We meet when a conversation moves faster than a thread — not weekly by habit.",
      },
    },
    {
      title: "Shared design context",
      desc: {
        id: "Semua file Figma, progres pekerjaan, dan feedback tersimpan di satu ruang kerja terbuka bagi seluruh tim Anda.",
        en: "Files, progress and feedback live in one place your whole team can see.",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 selection:bg-[#335CFF] selection:text-white flex flex-col font-sans">
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
        {/* 1. HERO SECTION (1:1 with Beew About)                                */}
        {/* ==================================================================== */}
        <section className="w-full pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-[880px] mb-12 sm:mb-16">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-3 select-none">
                ABOUT GEMILANG
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-neutral-950 tracking-tight leading-[1.1] mb-6">
                {lang === "id"
                  ? "Studio kecil yang dibangun untuk ide-ide ambisius."
                  : "A small studio built for ambitious ideas."}
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl">
                {lang === "id"
                  ? "Gemilang adalah mitra desain yang dipimpin langsung oleh founder untuk startup yang membangun produk bernilai tinggi. Kami bekerja di ranah produk, web, brand, dan sistem rekayasa, memadukan pemikiran level senior dengan eksekusi nyata tanpa lapisan birokrasi agensi tradisional."
                  : "Gemilang is a founder-led design partner for startups building products that deserve better experiences. We work across product, web, brand and Framer, combining senior thinking with hands-on execution, without the layers of a traditional agency."}
              </p>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-10 border-t border-neutral-200/80">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950 font-mono">
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
        <section className="w-full py-16 sm:py-24 bg-[#FAFAFC] border-t border-neutral-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-[960px] mx-auto bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 lg:p-16 shadow-xs relative overflow-hidden">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[#335CFF] mb-4">
                OUR APPROACH
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-neutral-950 tracking-tight leading-[1.15] mb-8">
                {lang === "id"
                  ? "Berpikir mendalam. Merancang dengan elegan. Merilis lebih cepat."
                  : "Think deeply. Design beautifully. Ship faster."}
              </h2>

              <div className="space-y-6 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                <p>
                  {lang === "id"
                    ? "Desain bukan hanya tentang membuat sesuatu terlihat lebih cantik di layar. Ini tentang memahami mengapa pengguna merasa kesulitan, menentukan apa yang benar-benar esensial, dan mengubah kompleksitas teknis menjadi antarmuka yang dapat dipahami tanpa kebingungan."
                    : "Design is not only about making something look better. It is about understanding why something feels difficult, deciding what actually matters, and turning complexity into something people can follow without effort."}
                </p>
                <p>
                  {lang === "id"
                    ? "Keahlian kerajinan (craft) adalah apa yang membuat pengalaman digital tersebut layak diingat dan dipercaya."
                    : "Then craft is what makes that experience worth remembering."}
                </p>
                <p>
                  {lang === "id"
                    ? "Karya terbaik lahir ketika strategi, desain, dan eksekusi teknis tidak dipisahkan oleh berlapis-lapis orang yang tidak mendesain. Itulah fondasi studio yang kami bangun di Gemilang."
                    : "The best work happens when strategy, design and execution aren’t separated by layers of people. That’s the kind of studio we’re building with Gemilang."}
                </p>
              </div>

              {/* Signature Quote Pill */}
              <div className="mt-10 p-5 rounded-2xl bg-[#F4F4F6] border border-neutral-200 text-neutral-900 font-semibold text-sm sm:text-[15px] italic">
                &ldquo;{lang === "id"
                  ? "Perusahaan hebat tidak seharusnya membutuhkan lima agensi berbeda hanya untuk meluncurkan satu pengalaman produk yang utuh."
                  : "Great companies shouldn't need five different partners to ship one experience."}&rdquo;
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================== */}
        {/* 3. REMOTE BY DEFAULT                                                 */}
        {/* ==================================================================== */}
        <section className="w-full py-16 sm:py-24 bg-white border-t border-neutral-200/80">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
            <div className="max-w-2xl mb-12 sm:mb-14">
              <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-2.5">
                REMOTE BY DEFAULT
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-neutral-950 tracking-tight leading-[1.15]">
                {lang === "id"
                  ? "Dirancang untuk bekerja lintas batas dan zona waktu."
                  : "Designed to work across borders and time zones."}
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-4 leading-relaxed font-normal">
                {lang === "id"
                  ? "Gemilang bermitra dengan startup dan tim teknologi global. Bekerja jarak jauh bukan kompromi di sini — seluruh alur kerja kami dibangun untuk efisiensi remote sejak awal."
                  : "Gemilang works with startups and technology companies worldwide. Remote isn’t a compromise here — the process was built for it from the start."}
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {remotePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FB] border border-neutral-200/80 space-y-3"
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

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
