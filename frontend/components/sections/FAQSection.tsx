"use client";

import React, { useState } from "react";
import { Plus, ArrowRight, MessageCircle } from "lucide-react";
import { useCMS } from "@/lib/cms-context";

interface FAQSectionProps {
  lang: "id" | "en";
  whatsappNumber?: string;
}

interface FAQItem {
  question: { id: string; en: string };
  answer: { id: string; en: string };
}

const faqData: FAQItem[] = [
  {
    question: {
      id: "Apa saja yang saya dapatkan di Paket Starter UMKM Rp 1.500.000?",
      en: "What do I get in the IDR 1.5M Starter MSME package?",
    },
    answer: {
      id: "Anda mendapatkan website profesional yang responsif (rapi di HP, tablet, laptop), etalase/katalog produk, integrasi tombol order langsung ke nomor WhatsApp, setup domain & hosting berkecepatan tinggi, serta garansi bug-free resmi 30 hari. Sistem siap pakai dalam 3-5 hari kerja.",
      en: "You receive a responsive website, product catalog showcase, direct WhatsApp order checkout, fast domain & hosting configuration, and a 30-day bug-free warranty. Ready in 3-5 business days.",
    },
  },
  {
    question: {
      id: "Bagaimana cara kerja Sistem Kasir (POS) Rp 3.500.000?",
      en: "How does the IDR 3.5M POS & Cashier System work?",
    },
    answer: {
      id: "Sistem kasir kami dapat dioperasikan di tablet, laptop, maupun HP. Mendukung scan barcode produk, cetak nota struk printer thermal (Bluetooth & USB), rekap stok barang otomatis, pembagian hak akses kasir vs owner, dan laporan laba-rugi realtime. Tim kami berikan panduan penggunaan hingga karyawan Anda mahir.",
      en: "Our POS runs on tablets, laptops, and mobile phones. Supports barcode scanning, thermal receipt printing, automated inventory ledger, cashier permissions, and realtime P&L reports.",
    },
  },
  {
    question: {
      id: "Apa itu Dedicated IT Partner Rp 6.500.000 / bulan?",
      en: "What is the IDR 6.5M/mo Dedicated IT Partner model?",
    },
    answer: {
      id: "Ini adalah solusi sewa tim engineer profesional bulanan. Anda memiliki tim IT sendiri tanpa beban rekrutmen kantor, gaji bulanan puluhan juta, atau THR. Anda bebas mengajukan permintaan fitur baru, otomasi WhatsApp, integrasi AI, perbaikan sistem, dan maintenance server 24/7. Fleksibel: bisa jeda (pause) atau stop kapan saja.",
      en: "Hire an on-demand senior engineering squad on a monthly retainer. No recruitment overhead, no full-time payroll burden. Submit unlimited feature backlogs, automation requests, and server upkeep.",
    },
  },
  {
    question: {
      id: "Apakah source code dan database 100% menjadi milik saya?",
      en: "Do I retain 100% ownership of source code and data?",
    },
    answer: {
      id: "Ya, mutlak 100% milik Anda. Kami tidak mengunci (vendor lock-in) bisnis Anda. Seluruh source code, kredensial domain, dan akses database akan diserahterimakan secara transparan dan terdokumentasi rapi.",
      en: "Yes, 100% absolute ownership. No proprietary vendor lock-in. All codebase, credentials, and databases are formally handed over to your ownership.",
    },
  },
  {
    question: {
      id: "Apakah ada garansi jika sistem mengalami error setelah serah terima?",
      en: "Is there a warranty if bugs appear post-launch?",
    },
    answer: {
      id: "Setiap proyek Gemilang Space dilindungi Garansi Resmi 30 Hari Bug-Free. Jika ada kendala teknis atau error yang tidak sesuai spesifikasi awal, tim kami akan memperbaikinya secara prioritas tanpa biaya tambahan.",
      en: "Every project includes a 30-Day Bug-Free Warranty. Any technical discrepancies from initial specs are resolved promptly at zero additional cost.",
    },
  },
  {
    question: {
      id: "Bagaimana alur pembayaran dan mulainya proyek?",
      en: "What is the payment flow and kickoff timeline?",
    },
    answer: {
      id: "Alur sangat sederhana: Konsultasi kebutuhan via WhatsApp → kami kirimkan invoice & rincian pengerjaan → DP 50% untuk mulai pengerjaan → demo & review sistem → pelunasan 50% dan serah terima penuh.",
      en: "Simple transparent flow: Consult requirements via WhatsApp → receive scope invoice → 50% deposit kickoff → prototype review → 50% final balance and formal handover.",
    },
  },
];

export function FAQSection({
  lang,
  whatsappNumber = "6285722045801",
}: FAQSectionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { cms } = useCMS();
  const faqs = cms.faqs && cms.faqs.length > 0 ? cms.faqs : faqData;

  const toggle = (idx: number) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  };

  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Gemilang Space, saya ingin bertanya lebih lanjut mengenai paket sistem digital."
      : "Hello Gemilang Space, I have questions regarding your digital packages."
  )}`;

  return (
    <section
      id="faq"
      className="relative w-full bg-[#F4F4F6] text-neutral-950 py-20 sm:py-28 lg:py-32 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: Header at Top & Contact Box at Bottom Corner    */}
          {/* ============================================================ */}
          <div className="lg:col-span-4 self-stretch flex flex-col justify-between">
            {/* Top Area: Title, Description, and Main FAQ Button */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.06em] text-neutral-400 uppercase">
                  FAQ
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-[-0.04em] text-neutral-950 leading-[1.14] mt-3">
                  {lang === "id" ? (
                    <>
                      Pertanyaan Yang
                      <br />
                      Sering Diajukan
                    </>
                  ) : (
                    <>
                      Frequently Asked
                      <br />
                      Questions
                    </>
                  )}
                </h2>
                <p className="text-neutral-600 text-xs sm:text-[13.5px] leading-relaxed mt-4 max-w-sm">
                  {lang === "id"
                    ? "Segala hal yang perlu Anda ketahui mengenai paket sistem digital Gemilang Space: biaya transparan, garansi bug-free, hingga alur kerjasama."
                    : "Everything you need to know about Gemilang Space packages: transparent pricing, bug-free warranty, and collaboration workflow."}
                </p>
              </div>

              {/* Main FAQ Pill Button */}
              <div className="pt-1">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#EAEAEF] hover:bg-neutral-200/90 rounded-full p-1.5 pl-2 pr-5 transition-all text-xs sm:text-[13px] font-semibold text-neutral-950 cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-black text-[#00E1BA] flex items-center justify-center shrink-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <span>{lang === "id" ? "Tanya Langsung ke Tim" : "Direct WhatsApp"}</span>
                </a>
              </div>
            </div>

            {/* Bottom Corner Contact Card */}
            <div className="mt-10 lg:mt-0 p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00E1BA]/15 text-[#008B7A] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-950">
                    {lang === "id" ? "Punya Kebutuhan Spesifik?" : "Have a Custom Scope?"}
                  </h4>
                  <p className="text-[11px] text-neutral-500">
                    {lang === "id" ? "Respon WhatsApp < 15 menit" : "WhatsApp reply < 15 mins"}
                  </p>
                </div>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {lang === "id"
                  ? "Ceritakan alur bisnis Anda. Kami bantu pilihkan solusi teknologi paling hemat dan efektif."
                  : "Tell us about your operations. We'll suggest the most cost-effective architecture."}
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-neutral-950 hover:text-[#008B7A] transition-colors inline-flex items-center gap-1.5 pt-1"
              >
                <span>{lang === "id" ? "Chat Mas Seeva di WA" : "Chat on WhatsApp"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: FAQ ACCORDION LIST                              */}
          {/* ============================================================ */}
          <div className="lg:col-span-8 flex flex-col divide-y divide-neutral-200/80 border-t border-b border-neutral-200/80">
            {faqs.map((item, idx) => {
              const isOpen = openIdx === idx;

              return (
                <div key={idx} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full py-6 sm:py-7 flex items-center justify-between text-left cursor-pointer group select-none transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg lg:text-[19px] font-bold text-neutral-950 group-hover:text-neutral-700 transition-colors pr-6">
                      {item.question[lang]}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-neutral-200/70 flex items-center justify-center shrink-0 text-neutral-800 transition-transform">
                      <Plus
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-[#008B7A]" : ""
                        }`}
                      />
                    </div>
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pb-6 sm:pb-7"
                        : "grid-rows-[0fr] opacity-0 pb-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-600 font-normal max-w-2xl">
                        {item.answer[lang]}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
