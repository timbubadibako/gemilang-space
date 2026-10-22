"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, MessageCircle, Mail, HelpCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { navItems, siteSettings } from "@/data/site-content";

interface FAQItem {
  q: { id: string; en: string };
  a: { id: string; en: string };
}

interface FAQCategory {
  id: string;
  label: { id: string; en: string };
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "working-with-us",
    label: { id: "Bekerja Bersama Gemilang", en: "Working With Gemilang" },
    items: [
      {
        q: {
          id: "Apa itu Gemilang Space?",
          en: "What is Gemilang Space?",
        },
        a: {
          id: "Gemilang Space adalah studio desain produk dan rekayasa teknologi independen yang dipimpin langsung oleh founder senior. Kami membantu UMKM hingga enterprise membangun website kilat, sistem POS timbangan offline-first, e-commerce, dan otomatisasi WhatsApp bisnis.",
          en: "Gemilang Space is an independent digital engineering and product studio led directly by senior engineers. We build high-converting websites, offline-first scale POS systems, e-commerce platforms, and WhatsApp business automation.",
        },
      },
      {
        q: {
          id: "Bagaimana cara kerja sama dengan Gemilang?",
          en: "How does working with Gemilang work?",
        },
        a: {
          id: "Ada dua model utama: Proyek Spesifik (Fixed-Scope) untuk deliverables terdefinisi seperti pembuatan website baru atau sistem POS, dan Dedicated Squad IT bulanan (Rp 6.500.000/bln) untuk bantuan tim engineer berkelanjutan.",
          en: "We offer two models: Defined Fixed-Scope Projects for specific deliverables like a website build or POS system, and Dedicated Squad Retainers (Rp 6.5M/mo) for ongoing engineering support.",
        },
      },
      {
        q: {
          id: "Berapa lama rata-rata pengerjaan proyek?",
          en: "How long does a typical project take?",
        },
        a: {
          id: "Website Starter UMKM selesai dalam 3-5 hari kerja. Sistem Web POS timbangan atau platform kustom umumnya membutuhkan 2 hingga 4 minggu.",
          en: "Starter business websites ship within 3-5 business days. Scale POS systems or custom platforms typically take 2 to 4 weeks.",
        },
      },
    ],
  },
  {
    id: "confidentiality",
    label: { id: "Kerahasiaan & Hak Cipta", en: "Confidentiality & Ownership" },
    items: [
      {
        q: {
          id: "Apakah Gemilang bersedia menandatangani NDA?",
          en: "Do you sign Non-Disclosure Agreements (NDAs)?",
        },
        a: {
          id: "Tentu. Kami menghormati kerahasiaan kekayaan intelektual bisnis Anda dan rutin menandatangani NDA sebelum diskusi teknis sensitif dimulai.",
          en: "Absolutely. We respect your intellectual property and routinely sign mutual NDAs before reviewing sensitive technical roadmaps.",
        },
      },
      {
        q: {
          id: "Siapa pemilik hak cipta dari hasil desain dan kode?",
          en: "Who owns the intellectual property and code?",
        },
        a: {
          id: "100% milik Anda. Setelah pelunasan, seluruh repositori Git, database, aset desain, dan akses hosting diserahterimakan sepenuhnya kepada Anda tanpa vendor lock-in.",
          en: "100% belongs to you. Upon completion, all Git repositories, databases, design assets, and cloud access are handed over with zero lock-in.",
        },
      },
    ],
  },
  {
    id: "pricing-support",
    label: { id: "Biaya & Maintenance", en: "Pricing & Support" },
    items: [
      {
        q: {
          id: "Apakah ada biaya bulanan tersembunyi?",
          en: "Are there hidden recurring fees?",
        },
        a: {
          id: "Tidak ada. Biaya proyek satu kali (one-time fee) bersifat final. Biaya cloud infrastruktur (seperti domain atau hosting VPS) dibayarkan langsung ke penyedia (Vercel/Hetzner/Cloudflare) dengan profil ultra-lean yang sangat murah (seringkali Rp 0 - Rp 60rb/bln).",
          en: "Zero hidden fees. One-time project fees are strictly fixed. Infrastructure costs are paid directly to providers under ultra-lean setups (often free to minimal).",
        },
      },
      {
        q: {
          id: "Bagaimana jika ada bug setelah sistem dirilis?",
          en: "What if bugs appear after release?",
        },
        a: {
          id: "Setiap proyek fixed-scope mencakup garansi perbaikan bug gratis selama 30 hari setelah serah terima. Klien paket Squad mendapatkan pemeliharaan dan audit teknis rutin tanpa henti.",
          en: "Every fixed project includes 30 days of complimentary bug-fix warranty. Squad clients receive continuous maintenance and monitoring.",
        },
      },
    ],
  },
];

export default function FAQPage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);
  const [activeTab, setActiveTab] = useState<string>("working-with-us");
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({
    "working-with-us-0": true,
  });

  const toggleAccordion = (key: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentCategory = faqCategories.find((c) => c.id === activeTab) || faqCategories[0];

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 selection:bg-[#00E1BA] selection:text-white flex flex-col font-sans">
      {/* Light-Themed Navbar */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
        theme="light"
      />

      <main className="w-full flex-1 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
          {/* Eyebrow & Headline */}
          <div className="max-w-[780px] mb-12 sm:mb-16">
            <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-3 select-none">
              FAQ
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.12] mb-5">
              {lang === "id"
                ? "Semua yang perlu Anda ketahui sebelum bermitra bersama Gemilang."
                : "Everything you need to know before working with Gemilang."}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl mb-8">
              {lang === "id"
                ? "Dari dedicated IT squad bulanan, proyek khusus POS offline-first, timeline delivery, hingga kepemilikan kode sumber 100% dan kerahasiaan NDA."
                : "From monthly dedicated squads, custom offline-first POS systems, delivery timelines, to 100% IP ownership and mutual NDAs."}
            </p>

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
                href="/contact"
                className="inline-flex items-center justify-center bg-[#F3F3F5] hover:bg-neutral-200 text-neutral-900 text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-full transition-all duration-200"
              >
                {lang === "id" ? "Jadwalkan Konsultasi Teknis" : "Book a Technical Call"}
              </Link>
            </div>
          </div>

          {/* 2-Column FAQ Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-6 border-t border-neutral-200/80">
            {/* Left Column: Category Tabs & Different Question Card */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Category Nav Pills */}
              <div className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 select-none">
                {faqCategories.map((cat) => {
                  const isActive = activeTab === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveTab(cat.id)}
                      className={`text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap lg:whitespace-normal ${
                        isActive
                          ? "bg-neutral-950 text-white font-semibold shadow-xs"
                          : "text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100"
                      }`}
                    >
                      {cat.label[lang]}
                    </button>
                  );
                })}
              </div>

              {/* Have a Different Question Card */}
              <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-neutral-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                  <HelpCircle className="w-4 h-4 text-[#00E1BA]" />
                  <span>{lang === "id" ? "Punya pertanyaan lain?" : "Have a different question?"}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Hubungi engineer kami langsung via WhatsApp. Kami merespons cepat tanpa perantara admin."
                    : "Reach out to our lead engineer directly via WhatsApp. Fast responses, zero middlemen."}
                </p>
                <div className="pt-2 space-y-2 text-xs font-medium">
                  <a
                    href={`https://wa.me/${siteSettings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-900 hover:text-[#00E1BA] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp: +{siteSettings.whatsappNumber}</span>
                  </a>
                  <a
                    href="mailto:hi@gemilangspace.com"
                    className="flex items-center gap-2 text-neutral-900 hover:text-[#00E1BA] transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-neutral-500" />
                    <span>hi@gemilangspace.com</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Accordion Questions */}
            <div className="lg:col-span-8 space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
                {currentCategory.label[lang]}
              </div>

              <div className="space-y-3">
                {currentCategory.items.map((item, idx) => {
                  const key = `${currentCategory.id}-${idx}`;
                  const isOpen = !!openItems[key];
                  return (
                    <div
                      key={key}
                      className="rounded-2xl border border-neutral-200/80 bg-white overflow-hidden shadow-2xs transition-all"
                    >
                      <button
                        type="button"
                        onClick={() => toggleAccordion(key)}
                        className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/50 transition-colors"
                      >
                        <span className="text-sm sm:text-base font-bold text-neutral-950 tracking-tight">
                          {item.q[lang]}
                        </span>
                        <div
                          className={`w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 bg-neutral-200" : ""
                          }`}
                        >
                          <ChevronDown className="w-4 h-4 text-neutral-600" />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal border-t border-neutral-100">
                          {item.a[lang]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Aurora Call To Action Banner */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Signature Dark Footer */}
      <Footer lang={lang} />
    </div>
  );
}
