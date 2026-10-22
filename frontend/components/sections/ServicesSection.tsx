"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { GradientWave } from "@/components/ui/gradient-wave";
import { useDaytimeTheme } from "@/lib/daytime-context";

interface ServicesSectionProps {
  lang: "id" | "en";
}

interface ServiceItem {
  number: string;
  title: { id: string; en: string };
  col1: { id: string[]; en: string[] };
  col2: { id: string[]; en: string[] };
  description: { id: string; en: string };
}

const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: {
      id: "Website & Toko Online Cepat",
      en: "Fast Websites & Online Stores",
    },
    col1: {
      id: ["Landing Page Konversi Tinggi", "Katalog Produk & Toko Online", "Setup Domain & Hosting SSL"],
      en: ["High-Converting Landing Pages", "Product Catalogs & Online Stores", "Domain Setup & SSL Hosting"],
    },
    col2: {
      id: ["Integrasi Checkout WhatsApp", "Kecepatan Super Kilat (95+)", "Optimasi SEO & Mobile Friendly"],
      en: ["WhatsApp Checkout Integration", "Lightning Fast (Lighthouse 95+)", "SEO & Mobile Optimization"],
    },
    description: {
      id: "Mulai dari Rp 1.500.000. Website bisnis profesional yang langsung siap jualan dalam 3-5 hari. Tampilan elegan, enteng dibuka di HP pembeli, dan langsung terhubung ke WhatsApp bisnis Anda.",
      en: "Starting at IDR 1,500,000. Professional business websites ready to convert in 3-5 days. Lightweight, responsive, and directly integrated with your WhatsApp sales team.",
    },
  },
  {
    number: "02",
    title: {
      id: "Sistem Kasir (POS) & Inventori Gudang",
      en: "Point-of-Sale (POS) & Inventory Systems",
    },
    col1: {
      id: ["Aplikasi Kasir Toko & Barcode", "Cetak Struk Thermal Bluetooth", "Manajemen Stok Multi-Gudang"],
      en: ["Retail POS & Barcode Scanner", "Bluetooth Thermal Receipt Print", "Multi-Warehouse Stock Ledger"],
    },
    col2: {
      id: ["Rekap Laba-Rugi Realtime", "Hak Akses Multi-Kasir", "Mode Offline-First Tanpa Lag"],
      en: ["Realtime P&L Ledger", "Multi-Cashier Role Access", "Offline-First No-Lag Architecture"],
    },
    description: {
      id: "Rp 3.500.000 sekali bayar. Solusi tuntas bagi pemilik toko retail, kafe, dan gudang untuk menghentikan selisih stok dan mempercepat proses tutup kasir harian dari jam menjadi menit.",
      en: "IDR 3,500,000 one-time investment. Complete operational solution for retail shops, cafes, and warehouses to eliminate stock discrepancies and speed up closing.",
    },
  },
  {
    number: "03",
    title: {
      id: "Aplikasi Web & Mobile Custom",
      en: "Custom Web & Mobile Apps",
    },
    col1: {
      id: ["Frontend Modern Next.js / React", "Aplikasi Mobile Flutter iOS & Android", "Dashboard Admin & Multi-User"],
      en: ["Modern Next.js / React Frontends", "Flutter iOS & Android Mobile Apps", "Admin Multi-User Dashboards"],
    },
    col2: {
      id: ["Database Supabase / Postgres", "API Gateway & Webhook Aman", "Arsitektur Modular & Source Code Penuh"],
      en: ["Supabase / Postgres DB", "Secure API & Webhook Gateways", "Clean Architecture & 100% Code Ownership"],
    },
    description: {
      id: "Sistem khusus bisnis yang dibangun persis sesuai standar proses operasional Anda. Tidak perlu lagi memakai software kaku yang fiturnya tidak cocok. Source code 100% milik Anda.",
      en: "Custom-tailored business software matching your exact operational workflow. Stop forcing rigid SaaS templates. Full source code ownership guaranteed.",
    },
  },
  {
    number: "04",
    title: {
      id: "Otomasi WhatsApp Bisnis",
      en: "WhatsApp Business Automation",
    },
    col1: {
      id: ["Notifikasi Invoice Otomatis", "Broadcast Promo & Pengingat", "Konfirmasi Order & Nomor Resi"],
      en: ["Automated Invoice Notifications", "Promo Broadcasts & Reminders", "Order & Tracking Confirmation"],
    },
    col2: {
      id: ["Integrasi API WhatsApp Resmi", "Sinkronisasi ke Database Toko", "Anti-Banned Safety Mechanism"],
      en: ["Official & Baileys WA Gateways", "Store Database Sync", "Anti-Ban Delivery Safeguards"],
    },
    description: {
      id: "Kirim pesan konfirmasi pesanan, resi pengiriman kurir, dan nota pembayaran ke pembeli secara otomatis tanpa perlu tim Anda mengetik ulang satu per satu di WhatsApp.",
      en: "Deliver automated order receipts, shipping tracking updates, and invoices straight to customer WhatsApp chats without manual copy-pasting.",
    },
  },
  {
    number: "05",
    title: {
      id: "Chatbot AI CS 24/7",
      en: "24/7 AI Customer Service Chatbots",
    },
    col1: {
      id: ["Pelatihan Berdasarkan Katalog Produk", "Menjawab Tanya-Jawab Pembeli Otomatis", "Eskalasi Mulus ke CS Manusia"],
      en: ["Trained on Your Product Catalog", "Automated FAQ Answering", "Seamless Human Agent Handoff"],
    },
    col2: {
      id: ["Integrasi WhatsApp & Website", "Bahasa Indonesia Luwes & Ramah", "Log Percakapan & Insight Konsumen"],
      en: ["WhatsApp & Web Widget Integration", "Natural Indonesian Conversational Flow", "Chat Transcripts & Customer Insights"],
    },
    description: {
      id: "Asisten kecerdasan buatan cerdas yang siaga membalas pertanyaan pembeli tengah malam sekalipun. Paham katalog usaha, ramah, dan sigap merekomendasikan produk yang tepat.",
      en: "Intelligent AI assistant working 24/7 to answer customer inquiries. Understands your product specs, pricing, and guides customers to checkout anytime.",
    },
  },
  {
    number: "06",
    title: {
      id: "Tim IT On-Demand & Maintenance",
      en: "On-Demand Tech Squad & Maintenance",
    },
    col1: {
      id: ["Full-Stack Engineer Khusus", "Unlimited Permintaan Fitur", "Monitoring Server & Backup 24/7"],
      en: ["Dedicated Full-Stack Engineer", "Unlimited Feature Requests", "24/7 Server Monitoring & Backups"],
    },
    col2: {
      id: ["Rp 6.5 Juta / Bulan", "Bisa Jeda / Stop Kapan Saja", "Grup Koordinasi WhatsApp Khusus"],
      en: ["IDR 6.5M / Month Retainer", "Pause or Cancel Anytime", "Dedicated WhatsApp Sprint Channel"],
    },
    description: {
      id: "Punya tim IT sendiri tanpa pusing biaya rekrutmen, BPJS, dan THR kantor. Kami menjadi mitra engineering bulanan yang siap mengeksekusi semua ide dan perbaikan teknis bisnis Anda.",
      en: "Your own senior engineering team without hiring overhead, payroll, or benefits. We act as your monthly tech partner executing roadmaps and ongoing maintenance.",
    },
  },
];

export function ServicesSection({ lang }: ServicesSectionProps) {
  const { currentTheme } = useDaytimeTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#F4F4F6] text-neutral-950 py-16 sm:py-24 lg:py-28 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* ============================================================== */}
        {/* TOP BANNER: Living Dynamic GradientWave Card                   */}
        {/* ============================================================== */}
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-14 bg-[#090C15] text-white shadow-2xl border border-white/10 select-none">
          
          {/* Living WebGL Dynamic GradientWave matching Daytime Theme */}
          <GradientWave
            colors={currentTheme.waveColors}
            shadowPower={4}
            noiseSpeed={0.00003}
            deform={{ incline: 0.4, noiseAmp: 260, noiseFlow: 4, noiseSpeed: 10 }}
            className="opacity-95 pointer-events-none"
          />

          {/* Ambient Dark Gradient Vignette for crisp text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/85 via-black/35 to-transparent pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-12">
            {/* Left: Eyebrow + Headline */}
            <div className="max-w-xl">
              <p className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.08em] text-[#00E1BA] uppercase">
                {lang === "id" ? "KATALOG LAYANAN DIGITAL" : "DIGITAL SERVICES CATALOG"}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] font-bold tracking-[-0.04em] text-white leading-[1.12] mt-3">
                {lang === "id"
                  ? "Solusi teknologi tepat sasaran untuk memajukan bisnis Anda."
                  : "Precise technology solutions to accelerate your business growth."}
              </h2>
            </div>

            {/* Right: Complementary Subtext */}
            <div className="text-neutral-300 text-xs sm:text-[13.5px] leading-relaxed max-w-xs font-normal pb-1">
              <p>
                {lang === "id" ? (
                  <>
                    Fokus kembangkan penjualan dan operasional.
                    <br />
                    Urusan coding, server, kasir, dan otomasi serahkan pada tim kami.
                  </>
                ) : (
                  <>
                    Focus on scaling your revenue.
                    <br />
                    Leave software, servers, POS, and automation to our squad.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SERVICES ACCORDION LIST                                       */}
        {/* ============================================================== */}
        <div className="mt-10 sm:mt-14 divide-y divide-neutral-300/80 border-t border-b border-neutral-300/80">
          {servicesData.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={service.number}
                className="w-full transition-colors duration-200"
              >
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-7 sm:py-9 flex items-center justify-between text-left cursor-pointer group select-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8 flex-1 min-w-0 pr-4">
                    {/* Service Number (01, 02, etc.) */}
                    <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-400 w-8 sm:w-12 shrink-0 transition-colors group-hover:text-neutral-900">
                      {service.number}
                    </span>

                    {/* Service Title */}
                    <h3 className="text-xl sm:text-3xl lg:text-[36px] font-bold tracking-[-0.035em] text-neutral-950 transition-colors group-hover:text-neutral-700 truncate">
                      {service.title[lang]}
                    </h3>
                  </div>

                  {/* Plus / Minus Toggle Icon */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 text-neutral-900">
                    <Plus
                      className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isOpen ? "rotate-45 text-[#00E1BA]" : "group-hover:scale-110"
                      }`}
                    />
                  </div>
                </button>

                {/* Accordion Content (Smooth height transition) */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-8 sm:pb-10"
                      : "grid-rows-[0fr] opacity-0 pb-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Aligned under the title, offset past the number */}
                    <div className="pl-12 sm:pl-20 pr-4 sm:pr-8 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 pt-1">
                      
                      {/* Sub-offerings: Column 1 */}
                      <div className="md:col-span-3 flex flex-col gap-2">
                        {service.col1[lang].map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs sm:text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Sub-offerings: Column 2 */}
                      <div className="md:col-span-3 flex flex-col gap-2">
                        {service.col2[lang].map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs sm:text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Detailed Description: Column 3 */}
                      <div className="md:col-span-6">
                        <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-600 font-normal max-w-xl">
                          {service.description[lang]}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
