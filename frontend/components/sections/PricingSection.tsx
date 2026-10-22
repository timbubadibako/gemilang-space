"use client";

import React from "react";
import { Check, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingSectionProps {
  lang: "id" | "en";
  whatsappNumber?: string;
  onOpenEstimator?: (tier?: string) => void;
}

export function PricingSection({
  lang,
  whatsappNumber = "6285722045801",
  onOpenEstimator,
}: PricingSectionProps) {
  const getWaUrl = (plan: string) => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lang === "id"
        ? `Halo Gemilang Space, saya ingin berkonsultasi mengenai paket: ${plan}.`
        : `Hello Gemilang Space, I want to discuss the package: ${plan}.`
    )}`;
  };

  const clientLogos = [
    "Fermion Roastery",
    "David Beckham POS",
    "Desa Digital",
    "Lari App",
    "Kopi Nusantara",
    "Berkah Abadi Retail",
    "Gemilang Space",
  ];

  const handleCardClick = (tier: string) => {
    if (onOpenEstimator) {
      onOpenEstimator(tier);
    } else {
      window.open(getWaUrl(tier), "_blank");
    }
  };

  return (
    <section
      id="pricing"
      className="relative w-full bg-white text-neutral-950 py-20 sm:py-28 lg:py-32 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* ============================================================== */}
        {/* HEADER AREA                                                    */}
        {/* ============================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 lg:gap-8">
          {/* Left: Eyebrow + Headline */}
          <div className="min-w-0 max-w-2xl">
            <p className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.06em] text-neutral-400 uppercase">
              {lang === "id" ? "BIAYA TRANSPARAN & MASUK AKAL" : "TRANSPARENT PRICING"}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-bold tracking-[-0.04em] text-neutral-950 leading-tight mt-2">
              {lang === "id"
                ? "Investasi sistem digital tanpa boncos. Mulai Rp 1.5 Juta."
                : "Honest digital engineering investments. Starting at IDR 1.5M."}
            </h2>
          </div>

          {/* Right: Subtitle */}
          <div className="text-neutral-600 text-xs sm:text-[13.5px] leading-relaxed max-w-sm lg:text-right font-normal pb-0.5">
            <p>
              {lang === "id"
                ? "Pilih paket sekali bayar untuk UMKM & toko, atau sewa tim IT bulanan on-demand tanpa pusing biaya rekrutmen."
                : "Choose one-time delivery for MSMEs & stores, or hire an on-demand monthly tech squad."}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 3 COMPREHENSIVE CARDS (Starter vs Solusi Bisnis vs Dedicated)  */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-12 items-stretch">
          
          {/* ------------------------------------------------------------ */}
          {/* CARD 1: Starter UMKM (Rp 1.500.000)                          */}
          {/* ------------------------------------------------------------ */}
          <div className="rounded-2xl bg-[#0C1019] text-white p-7 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-[var(--theme-accent)]/50 shadow-xl transition-all duration-300">
            <div>
              {/* Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                    {lang === "id" ? "STARTER UMKM" : "STARTER MSME"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
                    Website &amp; Toko Cepat
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-400 mt-1.5 leading-relaxed">
                    {lang === "id"
                      ? "Cocok untuk profil bisnis, etalase produk, atau toko yang ingin mulai jualan online dengan cepat."
                      : "Perfect for business profiles, product showcase, or sellers looking for fast digital presence."}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-7 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                    Rp 1.500.000
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">/sekali</span>
                </div>
                <p className="text-[11px] text-[var(--theme-accent)] font-medium mt-1">
                  ✓ Tanpa biaya tersembunyi. Siap pakai dalam 3-5 hari kerja.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 text-xs sm:text-[13px] text-neutral-300 font-normal">
                <div className="flex items-center gap-2.5 font-semibold text-white">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Landing Page Responsif (Mobile, Tablet, Desktop)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Kecepatan load super kilat (Lighthouse 95+)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Integrasi Tombol Order Langsung ke WhatsApp</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Setup Domain &amp; Hosting Siap Akses</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Garansi Bug-Free 30 Hari Resmi</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4">
              <Button
                variant="translucent"
                size="md"
                onClick={() => handleCardClick("starter")}
                fullWidth
              >
                {lang === "id" ? "Pilih Paket Starter (1.5 Jt)" : "Choose Starter (1.5M)"}
              </Button>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* CARD 2: Solusi Bisnis & POS Kasir (Rp 3.500.000) - FEATURED  */}
          {/* ------------------------------------------------------------ */}
          <div className="rounded-2xl bg-[#090C14] text-white p-7 sm:p-8 flex flex-col justify-between border-2 border-[var(--theme-accent)] shadow-2xl relative transition-all duration-300">
            {/* Top Recommended Tag */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--theme-accent)] text-[var(--theme-accent-text)] text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5 select-none">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>PALING BANYAK DIPILIH</span>
            </div>

            <div>
              {/* Header Row */}
              <div className="flex items-start justify-between gap-4 mt-1">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                    {lang === "id" ? "SISTEM OPERASIONAL" : "OPERATIONAL SYSTEM"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
                    Sistem Kasir &amp; POS Toko
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-400 mt-1.5 leading-relaxed">
                    {lang === "id"
                      ? "Software kasir, scan barcode, rekap stok produk, dan cetak nota struk thermal untuk toko & retail."
                      : "Complete point-of-sale: barcode scan, stock ledger, receipt printing, and daily cashier summary."}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-7 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--theme-accent)]">
                    Rp 3.500.000
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">/sekali</span>
                </div>
                <p className="text-[11px] text-[var(--theme-accent)] font-medium mt-1">
                  ✓ Sudah termasuk pelatihan penggunaan &amp; serah terima kode.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 text-xs sm:text-[13px] text-neutral-300 font-normal">
                <div className="flex items-center gap-2.5 font-semibold text-white">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Aplikasi Kasir (POS) Toko &amp; Scan Barcode</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold text-white">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Cetak Struk Thermal (Bluetooth &amp; USB)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Manajemen Stok Inventori &amp; Peringatan Habis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Rekap Laporan Keuangan &amp; Laba-Rugi Otomatis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Multi-Kasir dengan Pembatasan Hak Akses</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Garansi Resmi 30 Hari + Dukungan Teknis</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => handleCardClick("bisnis")}
                fullWidth
              >
                {lang === "id" ? "Pilih Solusi Bisnis (3.5 Jt)" : "Choose Business POS (3.5M)"}
              </Button>
            </div>
          </div>

          {/* ------------------------------------------------------------ */}
          {/* CARD 3: Dedicated IT Partner (Rp 6.500.000 / bln)            */}
          {/* ------------------------------------------------------------ */}
          <div className="rounded-2xl bg-[#0C1019] text-white p-7 sm:p-8 flex flex-col justify-between border border-white/10 hover:border-[var(--theme-accent)]/50 shadow-xl transition-all duration-300">
            <div>
              {/* Header Row */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] border border-[var(--theme-accent)]/30">
                    {lang === "id" ? "TIM IT BULANAN" : "MONTHLY RETAINER"}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">
                    Dedicated IT Partner
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-400 mt-1.5 leading-relaxed">
                    {lang === "id"
                      ? "Punya tim engineer senior sendiri tanpa beban rekrutmen kantor. Bebas request fitur setiap bulan."
                      : "Your dedicated engineering squad without the overhead of hiring. Request features anytime."}
                  </p>
                </div>
              </div>

              {/* Price */}
              <div className="mt-7 mb-6 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                    Rp 6.500.000
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">/bulan</span>
                </div>
                <p className="text-[11px] text-[var(--theme-accent)] font-medium mt-1">
                  ✓ Kontrak fleksibel. Bisa jeda (pause) atau stop kapan saja.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 text-xs sm:text-[13px] text-neutral-300 font-normal">
                <div className="flex items-center gap-2.5 font-semibold text-white">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Full-Stack Engineer Khusus Menangani Bisnis Anda</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Unlimited Antrean Permintaan Fitur &amp; Bug Fixing</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Integrasi Otomasi AI &amp; Bot WhatsApp Lanjutan</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Monitoring Server 24/7 &amp; Maintenance Rutin</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--theme-accent)] shrink-0" />
                  <span>Grup WhatsApp Khusus &amp; Progres Mingguan</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4">
              <Button
                variant="translucent"
                size="md"
                onClick={() => handleCardClick("dedicated")}
                fullWidth
              >
                {lang === "id" ? "Sewa Tim IT (6.5 Jt/bln)" : "Hire Tech Squad (6.5M/mo)"}
              </Button>
            </div>
          </div>

        </div>

        {/* ============================================================== */}
        {/* CUSTOM ENTERPRISE CALLOUT                                      */}
        {/* ============================================================== */}
        <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-neutral-100 border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-200 flex items-center justify-center text-neutral-800 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-neutral-950">
                Butuh Sistem Multi-Cabang atau Arsitektur Skala Besar?
              </h4>
              <p className="text-xs text-neutral-600 mt-0.5">
                Kami siap bantu audit sistem lama, integrasi API perbankan/logistik, atau custom ERP perusahaan.
              </p>
            </div>
          </div>

          <Button
            variant="expand"
            size="sm"
            onClick={() => handleCardClick("custom")}
            className="shrink-0"
          >
            Konsultasi Custom Enterprise
          </Button>
        </div>

        {/* ============================================================== */}
        {/* CLIENT LOGOS RUNNING MARQUEE                                   */}
        {/* ============================================================== */}
        <div className="mt-14 pt-8 border-t border-neutral-100 relative overflow-hidden select-none">
          <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-20" />

          <div className="animate-marquee gap-8 sm:gap-14 items-center py-2 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-opacity">
            {[...clientLogos, ...clientLogos].map((logo, idx) => (
              <span
                key={`${logo}-${idx}`}
                className="font-sans font-bold text-xs sm:text-sm tracking-tight text-neutral-700 uppercase shrink-0 px-4"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
