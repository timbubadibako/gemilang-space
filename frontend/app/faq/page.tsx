"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight, MessageCircle, Mail, HelpCircle } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
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
          id: "Gemilang Space adalah studio desain produk dan rekayasa teknologi independen yang dipimpin langsung oleh founder. Kami membantu startup dan tim teknologi membangun produk digital, website konversi tinggi, brand, dan design system skala besar melalui kemitraan langganan maupun proyek khusus.",
          en: "Gemilang Space is a founder-led product design and engineering studio. We help startups and ambitious technology teams build digital products, high-converting websites, brands, and enterprise design systems through subscription partnerships and defined custom projects.",
        },
      },
      {
        q: {
          id: "Dengan siapa kami biasanya bekerja sama?",
          en: "Who do you typically work with?",
        },
        a: {
          id: "Klien kami mayoritas adalah founder startup AI, SaaS, Web3, fintech, serta tim produk berkembang yang membutuhkan kecepatan eksekusi tinggi tanpa mengorbankan kualitas standar industri global.",
          en: "Our clients are primarily founders and leaders at AI, SaaS, Web3, fintech startups, and growing product platforms who need senior execution speed without compromising on global quality standards.",
        },
      },
      {
        q: {
          id: "Dengan siapa saya akan berinteraksi langsung?",
          en: "Who will I actually work with?",
        },
        a: {
          id: "Anda bekerja langsung dengan desainer dan teknisi senior studio kami. Tidak ada perantara account manager atau birokrasi perantara yang memperlambat komunikasi.",
          en: "You work directly with senior designers and founders. There are no junior account managers or agency overhead standing between you and the craft.",
        },
      },
    ],
  },
  {
    id: "design-subscription",
    label: { id: "Langganan Desain", en: "Design Subscription" },
    items: [
      {
        q: {
          id: "Bagaimana cara kerja Langganan Desain Gemilang?",
          en: "How does Gemilang's Design Subscription work?",
        },
        a: {
          id: "Anda berlangganan paket bulanan flat-rate. Anda dapat mengajukan request desain tanpa batas ke antrean kerja kami. Permintaan dikerjakan satu per satu (Essential) atau dua sekaligus (Priority) dengan turnaround 2-3 hari kerja.",
          en: "You subscribe to a flat monthly rate. You add unlimited design requests to your queue. Requests are delivered sequentially (Essential) or two in parallel (Priority) with an average 2-3 day turnaround.",
        },
      },
      {
        q: {
          id: "Apakah saya bisa menjeda atau membatalkan langganan?",
          en: "Can I pause or cancel my subscription?",
        },
        a: {
          id: "Ya, fleksibel 100%. Anda dapat menjeda langganan kapan saja saat beban pekerjaan sedang sedikit, dan mengaktifkannya kembali nanti ketika fitur berikutnya siap dikerjakan.",
          en: "Yes, 100% flexible. You can pause your subscription whenever your backlog is clear, and resume when your next batch of features is ready to build.",
        },
      },
      {
        q: {
          id: "Seberapa cepat pekerjaan akan kami terima?",
          en: "How fast will I receive work?",
        },
        a: {
          id: "Rata-rata permintaan dikirim dalam 48 hingga 72 jam kerja untuk cakupan umum. Tugas yang lebih besar dipecah menjadi milestone harian yang transparan.",
          en: "Most requests are delivered within 48 to 72 hours for standard scope. Larger requirements are broken down into transparent daily milestones.",
        },
      },
    ],
  },
  {
    id: "custom-projects",
    label: { id: "Proyek Khusus", en: "Custom Projects" },
    items: [
      {
        q: {
          id: "Kapan sebaiknya memilih Proyek Khusus daripada Langganan?",
          en: "When should we choose a Custom Project over a Subscription?",
        },
        a: {
          id: "Proyek Khusus ideal jika Anda memiliki ruang lingkup terdefinisi, tenggat waktu spesifik yang ketat, atau peluncuran besar (seperti redesign produk lengkap atau website baru) dengan anggaran fixed satu kali.",
          en: "Custom Projects are ideal when you have a well-defined scope, fixed timeline, or a major singular launch (such as a full product redesign or new flagship website) with a single milestone budget.",
        },
      },
      {
        q: {
          id: "Berapa lama durasi tipikal proyek khusus?",
          en: "How long does a typical custom project take?",
        },
        a: {
          id: "Umumnya berkisar antara 2 hingga 6 minggu, tergantung pada kedalaman arsitektur, jumlah modul antarmuka, dan integrasi teknis.",
          en: "Typically between 2 to 6 weeks, depending on the architectural depth, number of core flows, and technical integration scope.",
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
          id: "Tentu. Kami menghormati kerahasiaan kekayaan intelektual startup Anda dan rutin menandatangani NDA sebelum diskusi proyek mendalam dimulai.",
          en: "Absolutely. We respect your intellectual property and routinely sign mutual NDAs before reviewing sensitive technical or product roadmaps.",
        },
      },
      {
        q: {
          id: "Siapa pemilik hak cipta dari hasil desain dan kode?",
          en: "Who owns the copyright of the deliverables?",
        },
        a: {
          id: "100% milik Anda. Semua file Figma, aset desain, komponen, dan kode produksi sepenuhnya menjadi milik perusahaan Anda begitu diselesaikan.",
          en: "100% yours. All Figma files, source design assets, tokens, and production code belong entirely to your company upon delivery.",
        },
      },
    ],
  },
];

export default function FAQPage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);
  const [activeTab, setActiveTab] = useState<string>("working-with-us");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
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
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 selection:bg-[#335CFF] selection:text-white flex flex-col font-sans">
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
          {/* Eyebrow & Headline (1:1 with Beew FAQ) */}
          <div className="max-w-[780px] mb-12 sm:mb-16">
            <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-3 select-none">
              FAQ
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.12] mb-5">
              {lang === "id"
                ? "Semua yang perlu Anda ketahui sebelum bekerja bersama Gemilang."
                : "Everything you need to know before working with Gemilang."}
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl mb-8">
              {lang === "id"
                ? "Dari langganan desain dan proyek khusus hingga jadwal, biaya, kerahasiaan, dan alur kolaborasi — inilah cara kerja kemitraan kami secara nyata."
                : "From design subscriptions and custom projects to timelines, pricing, Framer, confidentiality and collaboration, here’s how working with Gemilang actually works."}
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
                {lang === "id" ? "Jadwalkan Panggilan" : "Book an Intro Call"}
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

              {/* Have a Different Question Card (1:1 with Beew) */}
              <div className="p-6 rounded-2xl bg-[#F8F9FA] border border-neutral-200/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-400">
                  <HelpCircle className="w-4 h-4 text-[#335CFF]" />
                  <span>{lang === "id" ? "Punya pertanyaan lain?" : "Have a different question?"}</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                  {lang === "id"
                    ? "Hubungi tim kami langsung melalui WhatsApp atau kirim email, kami biasanya merespons dalam hitungan jam."
                    : "Reach out to us directly via WhatsApp or email, we typically respond within a few hours."}
                </p>
                <div className="pt-2 space-y-2 text-xs font-medium">
                  <a
                    href={`https://wa.me/${siteSettings.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-900 hover:text-[#335CFF] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp: +{siteSettings.whatsappNumber}</span>
                  </a>
                  <a
                    href="mailto:hi@gemilangspace.com"
                    className="flex items-center gap-2 text-neutral-900 hover:text-[#335CFF] transition-colors"
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

      {/* Integrated Contact Section */}
      <ContactSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Aurora CTA Banner */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
