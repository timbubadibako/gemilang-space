"use client";

import React, { useState } from "react";
import {
  Check,
  ChevronDown,
  Clock,
  Video,
  Globe,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageSquare,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactSectionProps {
  lang: "id" | "en";
  whatsappNumber: string;
}

type ContactMode = "project" | "subscription" | "call";

const subscriptionNeedOptions = [
  "Web POS Timbangan RS232",
  "Website Konversi / UMKM",
  "E-Commerce & Subscriptions",
  "Otomasi WhatsApp (Bot/API)",
  "Sistem Informasi Desa / Civic",
  "Mobile Apps (Flutter)",
  "Cloud & DevOps (VPS/Coolify)",
  "Custom Software Lainnya",
];

const timeSlots = [
  "09:00 WIB",
  "10:00 WIB",
  "11:00 WIB",
  "13:30 WIB",
  "14:30 WIB",
  "16:00 WIB",
  "19:30 WIB",
  "20:30 WIB",
];

const techBadges = [
  "Next.js 15",
  "Supabase (PostgreSQL)",
  "Tailwind CSS v4",
  "TypeScript",
  "WebSerial (RS232)",
  "Dexie.js (Offline-First)",
  "Flutter / React Native",
  "Docker & Coolify",
  "Resend Email API",
  "Cloudflare Edge",
];

export function ContactSection({ lang, whatsappNumber }: ContactSectionProps) {
  const [mode, setMode] = useState<ContactMode>("project");

  // Project Form State
  const [pName, setPName] = useState("");
  const [pEmail, setPEmail] = useState("");
  const [pCompany, setPCompany] = useState("");
  const [pWebsite, setPWebsite] = useState("");
  const [pService, setPService] = useState("");
  const [pBudget, setPBudget] = useState("");
  const [pTimeline, setPTimeline] = useState("");
  const [pMessage, setPMessage] = useState("");

  // Subscription Form State
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPlan, setSPlan] = useState("");
  const [sFrequency, setSFrequency] = useState("");
  const [sStartDate, setSStartDate] = useState("");
  const [sNeeds, setSNeeds] = useState<string[]>([]);
  const [sMessage, setSMessage] = useState("");

  // Book a Call State
  const [selectedDate, setSelectedDate] = useState<number>(23);
  const [selectedSlot, setSelectedSlot] = useState<string>("10:00 WIB");
  const [callBooked, setCallBooked] = useState(false);

  const toggleNeed = (need: string) => {
    setSNeeds((prev) =>
      prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]
    );
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Inquiry Proyek Baru - Gemilang Space*
• Nama: ${pName || "N/A"}
• Email / Kontak: ${pEmail || "N/A"}
• Perusahaan / Bisnis: ${pCompany || "N/A"} (${pWebsite || "-"})
• Layanan: ${pService || "Custom Project"}
• Perkiraan Budget: ${pBudget || "Belum ditentukan"}
• Target Timeline: ${pTimeline || "Fleksibel"}
• Detail Kebutuhan: ${pMessage || "Tidak ada catatan tambahan"}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleSubscriptionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Permintaan Dedicated Squad / Retainer - Gemilang Space*
• Nama: ${sName || "N/A"}
• Email / Kontak: ${sEmail || "N/A"}
• Paket Pilihan: ${sPlan || "Dedicated Squad (Rp 6.5jt/bln)"}
• Durasi Kerjasama: ${sFrequency || "Berkelanjutan"}
• Waktu Mulai: ${sStartDate || "Segera"}
• Lingkup Pekerjaan: ${sNeeds.join(", ") || "Rekayasa Software"}
• Deskripsi Singkat: ${sMessage || "N/A"}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleCallConfirm = () => {
    const text = `*Booking Konsultasi Teknis - Gemilang Space*
• Topik: 20 Menit Konsultasi Arsitektur Sistem bersama Seeva (Lead Engineer)
• Tanggal: Oktober ${selectedDate}, 2026
• Slot Waktu: ${selectedSlot}
• Media: Google Meet / WhatsApp Call`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
    setCallBooked(true);
  };

  return (
    <section id="contact" className="w-full bg-[#04060A] text-white pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-24 border-t border-white/10">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* Eyebrow & Title */}
        <div className="max-w-[760px] mx-auto text-center mb-10 sm:mb-12 select-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-medium text-neutral-300 uppercase mb-4 tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
            {lang === "id" ? "Kontak & Konsultasi" : "Contact & Consult"}
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.12]">
            {lang === "id"
              ? "Ceritakan sistem apa yang ingin Anda bangun."
              : "Tell us what system you want to build."}
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed max-w-xl mx-auto font-normal">
            {lang === "id"
              ? "Baik proyek POS offline-first, website UMKM cepat, integrasi WhatsApp, maupun dedicated tim IT bulanan. Form ini langsung terhubung ke WhatsApp resmi kami."
              : "Whether offline-first POS hardware, high-converting websites, WhatsApp automation, or dedicated monthly squads. This form connects directly to our official WhatsApp."}
          </p>
        </div>

        {/* Big Dark Card with 3-Tab Header */}
        <div className="w-full rounded-2xl bg-[#080C14] border border-white/10 shadow-2xl overflow-hidden">
          
          {/* Top 3-Tab Mode Switcher Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-b border-white/10">
            {/* Tab 1: Start a Project */}
            <button
              type="button"
              onClick={() => setMode("project")}
              className={`p-5 sm:p-6 text-left flex items-start gap-3.5 transition-colors cursor-pointer select-none sm:rounded-tl-2xl ${
                mode === "project"
                  ? "bg-[#0B0F19] text-white ring-1 ring-inset ring-white/10"
                  : "bg-[#05070B] text-neutral-400 hover:text-white hover:bg-[#07090F]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                  mode === "project"
                    ? "border-2 border-[var(--theme-accent)] ring-4 ring-[var(--theme-accent)]/20 bg-[var(--theme-accent)]"
                    : "border border-neutral-600 bg-transparent"
                }`}
              >
                {mode === "project" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                )}
              </div>
              <div>
                <div className="text-sm sm:text-[15px] font-bold tracking-tight text-white">
                  {lang === "id" ? "Mulai Proyek Spesifik" : "Start a Project"}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {lang === "id"
                    ? "Untuk sistem web, POS, atau modul kustom"
                    : "For defined systems, POS, or web builds"}
                </div>
              </div>
            </button>

            {/* Tab 2: Start a Subscription */}
            <button
              type="button"
              onClick={() => setMode("subscription")}
              className={`p-5 sm:p-6 text-left flex items-start gap-3.5 transition-colors cursor-pointer select-none border-t sm:border-t-0 sm:border-x border-white/10 ${
                mode === "subscription"
                  ? "bg-[#0B0F19] text-white ring-1 ring-inset ring-white/10"
                  : "bg-[#05070B] text-neutral-400 hover:text-white hover:bg-[#07090F]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                  mode === "subscription"
                    ? "border-2 border-[var(--theme-accent)] ring-4 ring-[var(--theme-accent)]/20 bg-[var(--theme-accent)]"
                    : "border border-neutral-600 bg-transparent"
                }`}
              >
                {mode === "subscription" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                )}
              </div>
              <div>
                <div className="text-sm sm:text-[15px] font-bold tracking-tight text-white">
                  {lang === "id" ? "Dedicated IT Squad" : "Dedicated IT Squad"}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {lang === "id"
                    ? "Tim engineer bulanan (Rp 6.5jt/bln)"
                    : "Monthly engineering partner (Rp 6.5M/mo)"}
                </div>
              </div>
            </button>

            {/* Tab 3: Book a Call */}
            <button
              type="button"
              onClick={() => setMode("call")}
              className={`p-5 sm:p-6 text-left flex items-start gap-3.5 transition-colors cursor-pointer select-none border-t sm:border-t-0 border-white/10 sm:rounded-tr-2xl ${
                mode === "call"
                  ? "bg-[#0B0F19] text-white ring-1 ring-inset ring-white/10"
                  : "bg-[#05070B] text-neutral-400 hover:text-white hover:bg-[#07090F]"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full mt-0.5 shrink-0 flex items-center justify-center transition-all ${
                  mode === "call"
                    ? "border-2 border-[var(--theme-accent)] ring-4 ring-[var(--theme-accent)]/20 bg-[var(--theme-accent)]"
                    : "border border-neutral-600 bg-transparent"
                }`}
              >
                {mode === "call" && (
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-950" />
                )}
              </div>
              <div>
                <div className="text-sm sm:text-[15px] font-bold tracking-tight text-white">
                  {lang === "id" ? "Jadwalkan Konsultasi Teknis" : "Schedule Technical Call"}
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  {lang === "id"
                    ? "20 menit call bersama lead engineer"
                    : "20-min intro with lead engineer"}
                </div>
              </div>
            </button>
          </div>

          {/* Content Area Inside Dark Card */}
          <div className="p-6 sm:p-10 lg:p-12">
            
            {/* TAB 1: START A PROJECT */}
            {mode === "project" && (
              <form onSubmit={handleProjectSubmit} className="space-y-4 sm:space-y-5">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      required
                      value={pName}
                      onChange={(e) => setPName(e.target.value)}
                      placeholder="Budi Santoso"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Nomor WhatsApp / Email *
                    </label>
                    <input
                      type="text"
                      required
                      value={pEmail}
                      onChange={(e) => setPEmail(e.target.value)}
                      placeholder="0812xxxx atau email@bisnis.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Company & Website */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Nama Bisnis / Instansi
                    </label>
                    <input
                      type="text"
                      value={pCompany}
                      onChange={(e) => setPCompany(e.target.value)}
                      placeholder="PT Gemilang Abadi / Koperasi"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Website / Sosial Media
                    </label>
                    <input
                      type="text"
                      value={pWebsite}
                      onChange={(e) => setPWebsite(e.target.value)}
                      placeholder="https://instagram.com/bisnisanda"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: 3 Dropdowns (Service, Budget, Timeline) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Jenis Layanan
                    </label>
                    <select
                      value={pService}
                      onChange={(e) => setPService(e.target.value)}
                      className="w-full appearance-none bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all cursor-pointer"
                    >
                      <option value="" disabled>Pilih Layanan</option>
                      <option value="Web POS & Timbangan Hardware RS232">Web POS & Timbangan RS232</option>
                      <option value="Website Cepat UMKM (Mulai Rp 1.5jt)">Website Cepat UMKM</option>
                      <option value="E-Commerce & Subscriptions">E-Commerce & Pembayaran</option>
                      <option value="Sistem Informasi Desa / Civic Tech">Sistem Informasi Desa</option>
                      <option value="Otomasi WhatsApp Bisnis">Otomasi WhatsApp Bisnis</option>
                      <option value="Custom Web / Mobile Platform">Custom Web / Mobile App</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 bottom-3.5 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Alokasi Budget
                    </label>
                    <select
                      value={pBudget}
                      onChange={(e) => setPBudget(e.target.value)}
                      className="w-full appearance-none bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all cursor-pointer"
                    >
                      <option value="" disabled>Rentang Budget</option>
                      <option value="Rp 1.5jt - Rp 3.5jt">Rp 1.5jt - Rp 3.5jt (Starter)</option>
                      <option value="Rp 3.5jt - Rp 7jt">Rp 3.5jt - Rp 7jt (POS / Web)</option>
                      <option value="Rp 7jt - Rp 15jt">Rp 7jt - Rp 15jt (Sistem Komplit)</option>
                      <option value="Rp 15jt - Rp 30jt+">Rp 15jt - Rp 30jt+ (Enterprise)</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 bottom-3.5 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Target Peluncuran
                    </label>
                    <select
                      value={pTimeline}
                      onChange={(e) => setPTimeline(e.target.value)}
                      className="w-full appearance-none bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all cursor-pointer"
                    >
                      <option value="" disabled>Target Waktu</option>
                      <option value="Segera (1-2 minggu)">Segera (1-2 minggu)</option>
                      <option value="3-4 minggu">3-4 minggu</option>
                      <option value="1-2 bulan">1-2 bulan</option>
                      <option value="Fleksibel / Tahap Riset">Fleksibel / Riset</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 bottom-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Row 4: Textarea */}
                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                    Deskripsi Kebutuhan & Problem yang Dihadapi
                  </label>
                  <textarea
                    rows={4}
                    value={pMessage}
                    onChange={(e) => setPMessage(e.target.value)}
                    placeholder="Contoh: Kami butuh sistem kasir yang bisa baca timbangan digital via kabel serial dan cetak struk otomatis tanpa koneksi internet..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-transparent transition-all resize-y"
                  />
                </div>

                {/* Row 5: Footer Info & Submit Button */}
                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                  <div className="text-xs text-neutral-400 font-normal">
                    <span>Langsung terhubung ke engineer: </span>
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[var(--theme-accent)] hover:underline"
                    >
                      +{whatsappNumber}
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[var(--theme-accent)] hover:brightness-110 text-neutral-950 text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-200 shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
                  >
                    <span>KIRIM KE WHATSAPP</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: START A SUBSCRIPTION */}
            {mode === "subscription" && (
              <form onSubmit={handleSubscriptionSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Nama Anda / PIC *
                    </label>
                    <input
                      type="text"
                      required
                      value={sName}
                      onChange={(e) => setSName(e.target.value)}
                      placeholder="Budi Santoso"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Kontak WhatsApp *
                    </label>
                    <input
                      type="text"
                      required
                      value={sEmail}
                      onChange={(e) => setSEmail(e.target.value)}
                      placeholder="0812xxxxxxxx"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Pilihan Paket Squad
                    </label>
                    <select
                      value={sPlan}
                      onChange={(e) => setSPlan(e.target.value)}
                      className="w-full appearance-none bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all cursor-pointer"
                    >
                      <option value="" disabled>Pilih Paket</option>
                      <option value="Dedicated Squad IT (Rp 6.500.000 / bln)">Dedicated Squad IT (Rp 6.500.000 / bln)</option>
                      <option value="Web Starter UMKM (Rp 1.500.000 sekali bayar)">Web Starter UMKM (Rp 1.500.000)</option>
                      <option value="Custom Retainer Maintenance">Custom Retainer Maintenance</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 bottom-3.5 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Komitmen Waktu
                    </label>
                    <select
                      value={sFrequency}
                      onChange={(e) => setSFrequency(e.target.value)}
                      className="w-full appearance-none bg-[#0B0F19] border border-white/10 rounded-lg px-4 py-3 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] transition-all cursor-pointer"
                    >
                      <option value="" disabled>Durasi Retainer</option>
                      <option value="Bulanan (Bisa jeda / pause kapan saja)">Bulanan (Fleksibel, bisa jeda)</option>
                      <option value="Kontrak 3 Bulan">Kontrak 3 Bulan</option>
                      <option value="Kontrak 6+ Bulan (Dedicated)">Kontrak 6+ Bulan</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-neutral-400 absolute right-3.5 bottom-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Scope Selection Checkboxes */}
                <div className="pt-2">
                  <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                    Modul / Bantuan yang Diperlukan:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                    {subscriptionNeedOptions.map((opt) => {
                      const checked = sNeeds.includes(opt);
                      return (
                        <label
                          key={opt}
                          onClick={() => toggleNeed(opt)}
                          className={`flex items-center gap-2.5 text-xs p-2.5 rounded-lg border transition-all cursor-pointer select-none ${
                            checked
                              ? "bg-[var(--theme-accent)]/10 border-[var(--theme-accent)] text-white font-medium"
                              : "bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded flex items-center justify-center transition-colors ${
                              checked
                                ? "bg-[var(--theme-accent)] text-neutral-950"
                                : "border border-neutral-600 bg-transparent"
                            }`}
                          >
                            {checked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                    Catatan Tambahan
                  </label>
                  <textarea
                    rows={3}
                    value={sMessage}
                    onChange={(e) => setSMessage(e.target.value)}
                    placeholder="Ceritakan prioritas sprint pertama Anda..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)] focus:border-transparent transition-all resize-y"
                  />
                </div>

                <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                  <div className="text-xs text-neutral-400">
                    Slot Squad terbatas untuk menjaga kualitas eksekusi senior.
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-[var(--theme-accent)] hover:brightness-110 text-neutral-950 text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-200 shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
                  >
                    <span>AMBIL SLOT SQUAD</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: BOOK A CALL */}
            {mode === "call" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Meeting Info */}
                  <div className="md:col-span-4 space-y-5 pr-0 md:pr-4 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-[var(--theme-accent)] text-neutral-950 font-bold flex items-center justify-center text-sm shadow-md">
                        GS
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-[var(--theme-accent)] uppercase tracking-wider font-semibold">
                          Lead Architect
                        </div>
                        <div className="text-base font-bold text-white">
                          Konsultasi Bersama Seeva
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-neutral-400">
                      <div className="font-semibold text-white mb-1">Agenda Diskusi 20 Menit:</div>
                      <ul className="space-y-1.5 pl-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                          <span>Bedah kebutuhan sistem & arsitektur</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                          <span>Rekomendasi stack lean & hemat biaya</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                          <span>Estimasi transparan waktu & biaya</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--theme-accent)]" />
                          <span>Langkah kickoff & serah terima</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2 pt-2 text-xs text-neutral-300 font-mono border-t border-white/10">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                        <span>20 Menit Sesi Fokus</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                        <span>Google Meet / WhatsApp Call</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
                        <span>WIB (Asia/Jakarta)</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Calendar Month Picker */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="flex items-center justify-between px-1">
                      <div className="text-sm font-bold text-white font-mono">
                        Oktober <span className="text-neutral-500 font-normal">2026</span>
                      </div>
                      <div className="text-xs text-neutral-400 font-mono">Pilih Tanggal</div>
                    </div>

                    {/* Days Grid */}
                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="grid grid-cols-7 gap-1 text-center text-[10.5px] font-mono font-semibold text-neutral-500 uppercase mb-2">
                        <span>SEN</span>
                        <span>SEL</span>
                        <span>RAB</span>
                        <span>KAM</span>
                        <span>JUM</span>
                        <span>SAB</span>
                        <span>MIN</span>
                      </div>

                      <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-mono">
                        {[19, 20, 21, 22].map((d) => (
                          <span key={d} className="p-2 text-neutral-600">{d}</span>
                        ))}

                        {[23, 24, 25, 26, 27, 28, 29, 30, 31].map((d) => {
                          const isSelected = selectedDate === d;
                          return (
                            <button
                              key={d}
                              type="button"
                              onClick={() => setSelectedDate(d)}
                              className={`p-2 rounded-lg font-medium transition-all cursor-pointer ${
                                isSelected
                                  ? "bg-[var(--theme-accent)] text-neutral-950 font-bold shadow-md"
                                  : "bg-white/[0.04] hover:bg-white/[0.08] text-white"
                              }`}
                            >
                              {d}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Time Slots Picker */}
                  <div className="md:col-span-3 space-y-3">
                    <div className="text-xs font-mono font-bold text-white pb-1">
                      Slot Waktu ({selectedDate} Okt):
                    </div>

                    <div className="space-y-1.5 max-h-[260px] overflow-y-auto pr-1">
                      {timeSlots.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className={`w-full py-2 px-3 rounded-lg text-xs font-mono text-center transition-all cursor-pointer ${
                              isSelected
                                ? "border border-[var(--theme-accent)] text-[var(--theme-accent)] bg-[var(--theme-accent)]/10 font-bold"
                                : "border border-white/10 hover:border-white/25 bg-white/[0.02] text-neutral-300"
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleCallConfirm}
                        className="w-full bg-[var(--theme-accent)] hover:brightness-110 text-neutral-950 text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer"
                      >
                        KONFIRMASI {selectedSlot}
                      </button>
                    </div>
                  </div>
                </div>

                {callBooked && (
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      Jadwal untuk {selectedSlot} (Oktober {selectedDate}) telah disiapkan dan dibuka di WhatsApp!
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Tech Stack Pills Bar at bottom */}
        <div className="w-full mt-12 sm:mt-16 select-none overflow-hidden">
          <div className="text-center text-[11px] font-mono text-neutral-500 uppercase tracking-widest mb-4">
            Standar Arsitektur & Teknologi Gemilang Space
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
            {techBadges.map((badge, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
