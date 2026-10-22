"use client";

import React, { useState } from "react";
import { X, Check, Calculator, ArrowRight, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EstimateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  defaultTier?: string;
  lang?: "id" | "en";
}

interface ServiceOption {
  id: string;
  name: string;
  basePrice: number;
  priceLabel: string;
  description: string;
  badge?: string;
}

const serviceOptions: ServiceOption[] = [
  {
    id: "landing",
    name: "Starter UMKM (Website / Toko Online)",
    basePrice: 1500000,
    priceLabel: "Rp 1.500.000",
    description: "Landing page cepat, katalog produk / profil usaha, domain & hosting siap pakai.",
    badge: "HEMAT",
  },
  {
    id: "pos",
    name: "Sistem Kasir (POS) & Inventori Gudang",
    basePrice: 3500000,
    priceLabel: "Rp 3.500.000",
    description: "Kasir toko, scan barcode, cetak nota struk, stok produk, & laporan laba-rugi realtime.",
    badge: "POPULER",
  },
  {
    id: "app",
    name: "Aplikasi Web / Mobile Custom",
    basePrice: 4500000,
    priceLabel: "Mulai Rp 4.500.000",
    description: "Sistem khusus bisnis, dashboard multi-user, web app Next.js atau mobile app Flutter.",
  },
  {
    id: "dedicated",
    name: "Dedicated IT Partner (Tim On-Demand)",
    basePrice: 6500000,
    priceLabel: "Rp 6.500.000 / bln",
    description: "Langganan tim engineer bulanan, unlimited task prioritas, maintenance server & AI.",
    badge: "RETAINER",
  },
];

interface AddonOption {
  id: string;
  name: string;
  price: number;
  priceLabel: string;
  description: string;
}

const addonOptions: AddonOption[] = [
  {
    id: "wa-notif",
    name: "Otomasi Notifikasi WhatsApp",
    price: 500000,
    priceLabel: "+Rp 500.000",
    description: "Kirim invoice, konfirmasi order, dan resi otomatis ke nomor WhatsApp pelanggan.",
  },
  {
    id: "ai-cs",
    name: "Chatbot AI Customer Service 24/7",
    price: 1000000,
    priceLabel: "+Rp 1.000.000",
    description: "Asisten AI pintar yang paham katalog & menjawab tanya-jawab pembeli tanpa henti.",
  },
  {
    id: "payment-gateway",
    name: "Integrasi QRIS & Pembayaran Otomatis",
    price: 750000,
    priceLabel: "+Rp 750.000",
    description: "Terima bayar QRIS, Virtual Account, & transfer bank dengan verifikasi mutasi otomatis.",
  },
];

export function EstimateDrawer({
  isOpen,
  onClose,
  whatsappNumber,
  defaultTier,
  lang = "id",
}: EstimateDrawerProps) {
  const [selectedService, setSelectedService] = useState<string>(() => {
    if (defaultTier === "starter") return "landing";
    if (defaultTier === "bisnis") return "pos";
    if (defaultTier === "dedicated") return "dedicated";
    return "landing";
  });

  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [clientName, setClientName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const currentService = serviceOptions.find((s) => s.id === selectedService) || serviceOptions[0];

  const addonsTotal = selectedAddons.reduce((acc, addonId) => {
    const addon = addonOptions.find((a) => a.id === addonId);
    return acc + (addon ? addon.price : 0);
  }, 0);

  const grandTotal = currentService.basePrice + addonsTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleSendWhatsapp = () => {
    const chosenAddonNames = selectedAddons
      .map((id) => addonOptions.find((a) => a.id === id)?.name)
      .filter(Boolean);

    const message = `Halo Mas Seeva / Tim Gemilang Space,

Saya ingin konsultasi proyek sistem digital:
- Kebutuhan Utama: ${currentService.name}
- Fitur Tambahan: ${chosenAddonNames.length > 0 ? chosenAddonNames.join(", ") : "Tidak ada"}
- Estimasi Biaya: ${formatRupiah(grandTotal)} ${selectedService === "dedicated" ? "/ bulan" : ""}
- Nama Pemesan: ${clientName.trim() || "-"}
- Nama Usaha/Bisnis: ${businessName.trim() || "-"}
- Catatan Tambahan: ${notes.trim() || "-"}

Mohon info ketersediaan slot pengerjaan dan alur mulainya. Terima kasih!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-xl bg-[#090C14] text-white border-l border-white/10 h-full flex flex-col shadow-2xl z-10 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#0B0F1A]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#00E1BA]/10 border border-[#00E1BA]/30 flex items-center justify-center text-[#00E1BA]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Kalkulator Estimasi Proyek
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#00E1BA]/15 text-[#00E1BA] border border-[#00E1BA]/30 uppercase">
                  Langsung WA
                </span>
              </h3>
              <p className="text-xs text-neutral-400">
                Pilih paket kebutuhan usaha Anda, hitung biaya, kirim ke WhatsApp.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step 1: Pilih Paket Layanan */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#00E1BA] text-black font-bold flex items-center justify-center text-[10px]">1</span>
                Pilih Kebutuhan Utama
              </label>
              <span className="text-[11px] text-neutral-500">Mulai Rp 1.5jt</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {serviceOptions.map((opt) => {
                const isSelected = selectedService === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedService(opt.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none flex items-start justify-between gap-3 ${
                      isSelected
                        ? "bg-[#00E1BA]/10 border-[#00E1BA] text-white ring-1 ring-[#00E1BA]"
                        : "bg-white/[0.03] border-white/10 hover:border-white/20 text-neutral-300"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {opt.name}
                        </span>
                        {opt.badge && (
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full uppercase ${
                            isSelected ? "bg-[#00E1BA] text-black" : "bg-white/10 text-neutral-300"
                          }`}>
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-sm font-bold block ${isSelected ? "text-[#00E1BA]" : "text-white"}`}>
                        {opt.priceLabel}
                      </span>
                      <div className={`w-5 h-5 rounded-full border mt-2 ml-auto flex items-center justify-center ${
                        isSelected ? "border-[#00E1BA] bg-[#00E1BA] text-black" : "border-neutral-600"
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Fitur Tambahan (Add-ons) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#00E1BA] text-black font-bold flex items-center justify-center text-[10px]">2</span>
                Fitur Tambahan (Opsional)
              </label>
              <span className="text-[11px] text-neutral-500">Bisa dipilih lebih dari satu</span>
            </div>

            <div className="space-y-2">
              {addonOptions.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer select-none flex items-center justify-between gap-3 ${
                      isChecked
                        ? "bg-[#00E1BA]/10 border-[#00E1BA]/70 text-white"
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 text-neutral-300"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-4 h-4 rounded border shrink-0 flex items-center justify-center ${
                        isChecked ? "bg-[#00E1BA] border-[#00E1BA] text-black" : "border-neutral-600"
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs font-medium text-white block">
                          {addon.name}
                        </span>
                        <span className="text-[11px] text-neutral-400 block truncate">
                          {addon.description}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-semibold text-[#00E1BA] shrink-0">
                      {addon.priceLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Identitas Singkat Pemesan */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#00E1BA] text-black font-bold flex items-center justify-center text-[10px]">3</span>
                Data Diri Singkat
              </label>
              <span className="text-[11px] text-neutral-500">Agar pesan WA terformat rapi</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-neutral-400 mb-1 block">Nama Anda</label>
                <input
                  type="text"
                  placeholder="Contoh: Pak Hendra"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#00E1BA] transition-colors"
                />
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 mb-1 block">Nama Usaha / Toko</label>
                <input
                  type="text"
                  placeholder="Contoh: Kopi Nusantara / Toko Berkah"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#00E1BA] transition-colors"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="text-[11px] text-neutral-400 mb-1 block">Catatan / Kebutuhan Spesifik</label>
              <textarea
                rows={2}
                placeholder="Ceritakan singkat fitur yang diinginkan atau deadline pengerjaan..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#00E1BA] transition-colors resize-none"
              />
            </div>
          </div>

          {/* Jaminan Gemilang */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-neutral-400">
            <ShieldCheck className="w-5 h-5 text-[#00E1BA] shrink-0" />
            <span>
              <strong>Garansi Bug-Free 30 Hari:</strong> Seluruh sistem kami uji hingga tuntas. Source code 100% milik Anda.
            </span>
          </div>
        </div>

        {/* Footer Bar: Total & Send WA */}
        <div className="p-5 border-t border-white/10 bg-[#0B0F1A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-wider block">
              Estimasi Total Biaya
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-bold text-[#00E1BA] tracking-tight">
                {formatRupiah(grandTotal)}
              </span>
              {selectedService === "dedicated" && (
                <span className="text-xs text-neutral-400 font-mono">/ bulan</span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleSendWhatsapp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#00E1BA] hover:bg-[#00F2C8] text-neutral-950 font-bold px-6 py-3 rounded-full text-xs sm:text-[13px] transition-all cursor-pointer shadow-lg shadow-[#00E1BA]/20 select-none"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Kirim ke WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
