"use client";

import React, { useState } from "react";
import { 
  Printer, 
  Copy, 
  Check, 
  Layers, 
  TrendingUp, 
  DollarSign,
  Plus,
  Trash2
} from "lucide-react";

interface EstimatorTask {
  id: number;
  name: string;
  points: number;
  hours: number;
}

export default function AdminEstimatorPage() {
  const [activeTab, setActiveTab] = useState<"weight" | "valuation">("weight");
  const [rateMode, setRateMode] = useState<"points" | "hours">("points");

  // Project Context
  const [projectName, setProjectName] = useState("BOS Custom ERP & POS Hub");
  const [clientName, setClientName] = useState("PT Mitra Gemilang Abadi");
  const [copied, setCopied] = useState(false);

  // Rate parameters
  const [ratePerPoint, setRatePerPoint] = useState(1250000);
  const [ratePerHour, setRatePerHour] = useState(175000);
  const [bufferPercent, setBufferPercent] = useState(20);
  const [overheadPercent, setOverheadPercent] = useState(15);
  const [devPayoutRatePerPoint, setDevPayoutRatePerPoint] = useState(550000);

  // Tasks
  const [tasks, setTasks] = useState<EstimatorTask[]>([
    { id: 1, name: "Arsitektur Database, RBAC & Multi-Tenant", points: 3, hours: 16 },
    { id: 2, name: "Sistem Kasir POS Offline & WebSerial RS232", points: 5, hours: 32 },
    { id: 3, name: "Inventory Ledger, Stok Opname & SKU Barcode", points: 4, hours: 24 },
    { id: 4, name: "Double-Entry Accounting & Financial Reports", points: 4, hours: 28 },
    { id: 5, name: "Payment Gateway (QRIS, VA) & Webhook Ledger", points: 3, hours: 18 },
    { id: 6, name: "Automasi Notifikasi WhatsApp (Baileys/Resend)", points: 2, hours: 12 },
    { id: 7, name: "QA Testing, Security Audit & Cloud Deployment", points: 3, hours: 18 },
  ]);

  // Tab 2 Valuation states
  const [currentRevenue, setCurrentRevenue] = useState(1200000000);
  const [upliftPct, setUpliftPct] = useState(15);
  const [costSavingsMonthly, setCostSavingsMonthly] = useState(8500000);
  const [lossPrevention, setLossPrevention] = useState(25000000);
  const [capturePct, setCapturePct] = useState(12);

  // Math: Tab 1 Weight
  const totalPoints = tasks.reduce((acc, t) => acc + t.points, 0);
  const totalHours = tasks.reduce((acc, t) => acc + t.hours, 0);

  const baseEngineeringCost = rateMode === "points" 
    ? totalPoints * ratePerPoint 
    : totalHours * ratePerHour;

  const bufferCost = (baseEngineeringCost * bufferPercent) / 100;
  const overheadCost = (baseEngineeringCost * overheadPercent) / 100;
  const totalClientPrice = baseEngineeringCost + bufferCost + overheadCost;

  // Math: Dev Payout & Margin
  const totalDevPayout = totalPoints * devPayoutRatePerPoint;
  const estimatedMargin = totalClientPrice - totalDevPayout;
  const marginPct = totalClientPrice > 0 ? (estimatedMargin / totalClientPrice) * 100 : 0;

  // Math: Tab 2 Valuation
  const addedRevenue = (currentRevenue * upliftPct) / 100;
  const totalSavings = costSavingsMonthly * 12 + lossPrevention;
  const grandEconomicValue = addedRevenue + totalSavings;
  const valueBasedPrice = (grandEconomicValue * capturePct) / 100;

  const formatIDR = (val: number) => {
    return "Rp " + Math.round(val).toLocaleString("id-ID");
  };

  const addTask = () => {
    const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    setTasks([...tasks, { id: newId, name: "Modul Baru", points: 2, hours: 10 }]);
  };

  const removeTask = (id: number) => {
    if (tasks.length <= 1) return;
    setTasks(tasks.filter(t => t.id !== id));
  };

  const updateTask = (id: number, field: keyof EstimatorTask, val: any) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, [field]: val } : t)));
  };

  const copyProposalToClipboard = () => {
    const text = `PROPOSAL PENAWARAN TEKNOLOGI — GEMILANG
Proyek: ${projectName}
Klien: ${clientName}
Tanggal: ${new Date().toLocaleDateString("id-ID")}
------------------------------------------------
RINCIAN MODUL & RUANG LINGKUP:
${tasks.map((t, idx) => `${idx + 1}. ${t.name} (${t.points} Bobot Poin / ${t.hours} Jam)`).join("\n")}

TOTAL MODUL UTAMA : ${tasks.length} Modul Terintegrasi
TOTAL BOBOT FITUR : ${totalPoints} Poin Kompleksitas
REKOMENDASI ANCHOR INVESTASI : ${formatIDR(totalClientPrice)} (Net Managed Deployment)

Nilai Efisiensi Bisnis Tahunan: ${formatIDR(grandEconomicValue)} / tahun.
Garansi & Support: SLA 99.9% + Free Maintenance Sprint 30 Hari.
------------------------------------------------
Hubungi Tim Engineer Gemilang: +62 857-2204-5801`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-teal-100 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-teal-700">
              PRICING &amp; VALUE ENGINE
            </span>
          </div>
          <h2 className="font-black text-2xl text-zinc-900 mt-1 tracking-tight">
            Kalkulator Bobot &amp; Penawaran Klien
          </h2>
          <p className="text-xs font-semibold text-zinc-500 mt-1">
            Hitung harga jual, upah dev, dan proyeksi kas studio sebelum mengirim proposal resmi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-mono font-bold border border-zinc-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Cetak / PDF
          </button>
          <button
            onClick={copyProposalToClipboard}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-600/20 flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Tersalin!" : "Salin Penawaran"}
          </button>
        </div>
      </div>

      {/* CONTEXT BAR */}
      <div className="bg-white border border-teal-100 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-xs">
        <div>
          <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">Nama Proyek</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
        <div>
          <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">Klien Perusahaan</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
          />
        </div>
        <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-mono font-bold text-teal-800">Total Anchor Penawaran</div>
            <div className="text-xl font-black text-zinc-900 font-mono tabular-nums">{formatIDR(totalClientPrice)}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono font-bold text-zinc-500">Kas Studio</div>
            <div className="text-xs font-black text-teal-700 font-mono tabular-nums">+{formatIDR(estimatedMargin)}</div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
        <button
          onClick={() => setActiveTab("weight")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === "weight"
              ? "bg-zinc-900 text-white shadow-sm"
              : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
          }`}
        >
          1. Bobot Task &amp; Rate Studio
        </button>
        <button
          onClick={() => setActiveTab("valuation")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeTab === "valuation"
              ? "bg-zinc-900 text-white shadow-sm"
              : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
          }`}
        >
          2. Valuasi Nilai Bisnis Klien
        </button>
      </div>

      {/* TAB CONTENT: WEIGHT & MARGIN */}
      {activeTab === "weight" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TASK BREAKDOWN TABLE */}
          <div className="lg:col-span-2 bg-white border border-teal-100 rounded-2xl p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-zinc-900 flex items-center gap-2 uppercase">
                  <Layers className="w-4 h-4 text-teal-600" /> Work Breakdown &amp; Story Points
                </h3>
                <p className="text-[11px] text-zinc-500">Daftar task teknis dan alokasi poin pengerjaan.</p>
              </div>
              <button
                onClick={addTask}
                className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Tambah Task
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-teal-50/40 text-zinc-500 text-[10px] font-mono uppercase font-bold">
                    <th className="py-2.5 px-3">Modul / Fitur</th>
                    <th className="py-2.5 px-2 text-center">Bobot (Pts)</th>
                    <th className="py-2.5 px-2 text-center">Est. Jam</th>
                    <th className="py-2.5 px-3 text-right">Subtotal Klien</th>
                    <th className="py-2.5 px-2 text-center w-10">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 font-mono">
                  {tasks.map((t) => {
                    const subtotal = rateMode === "points" ? t.points * ratePerPoint : t.hours * ratePerHour;
                    return (
                      <tr key={t.id} className="hover:bg-teal-50/20">
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={t.name}
                            onChange={(e) => updateTask(t.id, "name", e.target.value)}
                            className="w-full bg-transparent border-0 text-zinc-900 font-sans font-bold text-xs focus:ring-1 focus:ring-teal-500 rounded px-1"
                          />
                        </td>
                        <td className="py-2 px-2 text-center">
                          <input
                            type="number"
                            min={1}
                            max={20}
                            value={t.points}
                            onChange={(e) => updateTask(t.id, "points", Number(e.target.value))}
                            className="w-14 bg-zinc-50 border border-zinc-200 rounded px-1.5 py-1 text-center text-xs text-teal-700 font-bold tabular-nums"
                          />
                        </td>
                        <td className="py-2 px-2 text-center">
                          <input
                            type="number"
                            min={1}
                            max={200}
                            value={t.hours}
                            onChange={(e) => updateTask(t.id, "hours", Number(e.target.value))}
                            className="w-14 bg-zinc-50 border border-zinc-200 rounded px-1.5 py-1 text-center text-xs text-zinc-700 font-bold tabular-nums"
                          />
                        </td>
                        <td className="py-2 px-3 text-right font-black text-zinc-900 tabular-nums">
                          {formatIDR(subtotal)}
                        </td>
                        <td className="py-2 px-2 text-center">
                          <button
                            onClick={() => removeTask(t.id)}
                            className="text-zinc-400 hover:text-rose-600 p-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* PARAMETERS & MARGIN SETTINGS */}
          <div className="bg-white border border-teal-100 rounded-2xl p-5 space-y-5 shadow-xs">
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-teal-600" /> Parameter Rate &amp; Fee Dev
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Rate Jual Klien per Poin (IDR)</label>
                <input
                  type="number"
                  step={50000}
                  value={ratePerPoint}
                  onChange={(e) => setRatePerPoint(Number(e.target.value))}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-black tabular-nums focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Fee Penugasan Dev per Poin (IDR)</label>
                <input
                  type="number"
                  step={25000}
                  value={devPayoutRatePerPoint}
                  onChange={(e) => setDevPayoutRatePerPoint(Number(e.target.value))}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-amber-800 font-black tabular-nums focus:outline-none focus:border-teal-500"
                />
                <span className="text-[10px] text-zinc-400">Standar dev: Rp 400k - Rp 650k / poin</span>
              </div>

              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-600 mb-1">
                  <span>Buffer Scope Creep</span>
                  <span className="text-teal-700 tabular-nums">{bufferPercent}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={5}
                  value={bufferPercent}
                  onChange={(e) => setBufferPercent(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>

              <div>
                <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-600 mb-1">
                  <span>PM &amp; DevOps Overhead</span>
                  <span className="text-teal-700 tabular-nums">{overheadPercent}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={5}
                  value={overheadPercent}
                  onChange={(e) => setOverheadPercent(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
              </div>
            </div>

            {/* FINANCIAL SUMMARY BOX */}
            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between text-zinc-600">
                <span>Total Poin:</span>
                <span className="text-zinc-900 font-bold tabular-nums">{totalPoints} Pts ({totalHours} Jam)</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Base Engineering:</span>
                <span className="text-zinc-900 tabular-nums">{formatIDR(baseEngineeringCost)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Buffer + Overhead:</span>
                <span className="text-zinc-900 tabular-nums">{formatIDR(bufferCost + overheadCost)}</span>
              </div>
              <div className="flex justify-between text-zinc-900 font-bold pt-2 border-t border-zinc-200">
                <span>Harga Jual Klien:</span>
                <span className="text-zinc-900 font-black tabular-nums">{formatIDR(totalClientPrice)}</span>
              </div>
              <div className="flex justify-between text-amber-800 font-bold">
                <span>Alokasi Fee Dev:</span>
                <span className="tabular-nums">-{formatIDR(totalDevPayout)}</span>
              </div>
              <div className="flex justify-between text-teal-800 font-black text-sm pt-2 border-t border-zinc-200">
                <span>Net Kas Studio:</span>
                <span className="tabular-nums">{formatIDR(estimatedMargin)} ({marginPct.toFixed(0)}%)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: VALUATION */}
      {activeTab === "valuation" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
          <div className="lg:col-span-2 bg-white border border-teal-100 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-600" /> Economic Value &amp; Efisiensi 1 Tahun
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-600 font-bold text-[10px] uppercase mb-1">Omzet Tahunan Klien (IDR)</label>
                <input
                  type="number"
                  step={50000000}
                  value={currentRevenue}
                  onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold tabular-nums focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-zinc-600 font-bold text-[10px] uppercase mb-1">Estimasi Kenaikan Omzet ({upliftPct}%)</label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={upliftPct}
                  onChange={(e) => setUpliftPct(Number(e.target.value))}
                  className="w-full accent-teal-600 mt-2"
                />
                <span className="text-[10px] text-teal-800 font-bold tabular-nums">+{formatIDR(addedRevenue)} / tahun</span>
              </div>
              <div>
                <label className="block text-zinc-600 font-bold text-[10px] uppercase mb-1">Penghematan Biaya Kerja / Bln (IDR)</label>
                <input
                  type="number"
                  step={500000}
                  value={costSavingsMonthly}
                  onChange={(e) => setCostSavingsMonthly(Number(e.target.value))}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold tabular-nums focus:outline-none focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-zinc-600 font-bold text-[10px] uppercase mb-1">Pencegahan Fraud &amp; Loss / Thn (IDR)</label>
                <input
                  type="number"
                  step={1000000}
                  value={lossPrevention}
                  onChange={(e) => setLossPrevention(Number(e.target.value))}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold tabular-nums focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 flex justify-between items-center">
              <div>
                <div className="text-[10px] uppercase text-teal-900 font-black">Total Nilai Ekonomi Tercipta</div>
                <div className="text-2xl font-black text-teal-800 tabular-nums">{formatIDR(grandEconomicValue)}</div>
              </div>
              <div className="text-right text-[11px] text-zinc-500">
                Nilai riil efisiensi omzet klien
              </div>
            </div>
          </div>

          <div className="bg-white border border-teal-100 rounded-2xl p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider">Value Capture Share</h3>
            <div>
              <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-600 mb-1">
                <span>Capture % (Standar 10-15%)</span>
                <span className="text-teal-700 font-bold tabular-nums">{capturePct}%</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                value={capturePct}
                onChange={(e) => setCapturePct(Number(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>

            <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
              <div className="flex justify-between text-zinc-600">
                <span>Harga Berbasis Nilai:</span>
                <span className="text-teal-800 font-black tabular-nums">{formatIDR(valueBasedPrice)}</span>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>ROI Klien:</span>
                <span className="text-zinc-900 font-black tabular-nums">
                  {valueBasedPrice > 0 ? ((grandEconomicValue / valueBasedPrice)).toFixed(1) : 0}x lipat
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
