"use client";

import React, { useState } from "react";
import { useAdmin } from "@/lib/admin-context";
import { Ticket, TicketPriority, TicketStatus, ClientPaymentStatus, PayoutStatus } from "@/types/admin";
import { 
  Plus, 
  Trash2, 
  Filter, 
  Building2,
  X,
  Calculator,
  Layers,
  DollarSign,
  TrendingUp,
  Printer,
  Copy,
  Check
} from "lucide-react";

interface EstimatorTask {
  id: number;
  name: string;
  points: number;
  hours: number;
}

export default function TasksCalculatorPage() {
  const { 
    tickets, 
    developers, 
    addTicket, 
    updateTicketStatus, 
    updateTicketPayout, 
    updateTicketClientPayment, 
    deleteTicket 
  } = useAdmin();

  // Sub-tab: Tiket Aktif vs Kalkulator Estimator
  const [activeView, setActiveView] = useState<"tickets" | "calculator">("tickets");

  // Filter Tiket
  const [filterProject, setFilterProject] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modal State Tambah Tiket
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [clientName, setClientName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(3);
  const [estHours, setEstHours] = useState(16);
  const [clientPrice, setClientPrice] = useState(4500000);
  const [devPayout, setDevPayout] = useState(2000000);
  const [assignedDev, setAssignedDev] = useState(developers[0]?.devName || "");
  const [priority, setPriority] = useState<TicketPriority>("medium");
  const [status, setStatus] = useState<TicketStatus>("backlog");
  const [clientPaymentStatus, setClientPaymentStatus] = useState<ClientPaymentStatus>("unpaid");
  const [payoutStatus, setPayoutStatus] = useState<PayoutStatus>("pending");

  // Kalkulator Estimator State
  const [calcProjectName, setCalcProjectName] = useState("BOS Custom ERP & POS Hub");
  const [calcClientName, setCalcClientName] = useState("PT Mitra Gemilang Abadi");
  const [calcRatePerPoint, setCalcRatePerPoint] = useState(1250000);
  const [calcRatePerHour, setCalcRatePerHour] = useState(175000);
  const [calcRateMode, setCalcRateMode] = useState<"points" | "hours">("points");
  const [calcBufferPct, setCalcBufferPct] = useState(20);
  const [calcOverheadPct, setCalcOverheadPct] = useState(15);
  const [calcDevPayoutPerPoint, setCalcDevPayoutPerPoint] = useState(550000);
  const [copied, setCopied] = useState(false);

  const [calcTasks, setCalcTasks] = useState<EstimatorTask[]>([
    { id: 1, name: "Arsitektur Database, RBAC & Multi-Tenant", points: 3, hours: 16 },
    { id: 2, name: "Sistem Kasir POS Offline & WebSerial RS232", points: 5, hours: 32 },
    { id: 3, name: "Inventory Ledger, Stok Opname & SKU Barcode", points: 4, hours: 24 },
    { id: 4, name: "Double-Entry Accounting & Financial Reports", points: 4, hours: 28 },
    { id: 5, name: "Payment Gateway (QRIS, VA) & Webhook Ledger", points: 3, hours: 18 },
    { id: 6, name: "Automasi Notifikasi WhatsApp (Baileys/Resend)", points: 2, hours: 12 },
    { id: 7, name: "QA Testing, Security Audit & Cloud Deployment", points: 3, hours: 18 },
  ]);

  const handleDevSelect = (devName: string) => {
    setAssignedDev(devName);
    const dev = developers.find((d) => d.devName === devName);
    if (dev) {
      setDevPayout(dev.pointRate * points);
    }
  };

  const handlePointsChange = (pts: number) => {
    setPoints(pts);
    const dev = developers.find((d) => d.devName === assignedDev);
    if (dev) {
      setDevPayout(dev.pointRate * pts);
    }
    setClientPrice(pts * 1250000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName || !moduleName) return;

    const dev = developers.find((d) => d.devName === assignedDev);

    addTicket({
      projectSlug: projectName.toLowerCase().replace(/\s+/g, "-"),
      projectName,
      clientName: clientName || projectName,
      moduleName,
      description,
      points: Number(points),
      estHours: Number(estHours),
      clientPrice: Number(clientPrice),
      devPayout: Number(devPayout),
      assignedDev,
      devRole: dev?.role || "Software Engineer",
      priority,
      status,
      clientPaymentStatus,
      payoutStatus,
    });

    setModuleName("");
    setDescription("");
    setIsModalOpen(false);
  };

  const formatIDR = (val: number) => {
    return "Rp " + Math.round(val).toLocaleString("id-ID");
  };

  // Kalkulator math
  const calcTotalPoints = calcTasks.reduce((acc, t) => acc + t.points, 0);
  const calcTotalHours = calcTasks.reduce((acc, t) => acc + t.hours, 0);
  const calcBaseCost = calcRateMode === "points" ? calcTotalPoints * calcRatePerPoint : calcTotalHours * calcRatePerHour;
  const calcBuffer = (calcBaseCost * calcBufferPct) / 100;
  const calcOverhead = (calcBaseCost * calcOverheadPct) / 100;
  const calcTotalClient = calcBaseCost + calcBuffer + calcOverhead;
  const calcTotalDev = calcTotalPoints * calcDevPayoutPerPoint;
  const calcMargin = calcTotalClient - calcTotalDev;
  const calcMarginPct = calcTotalClient > 0 ? (calcMargin / calcTotalClient) * 100 : 0;

  const copyProposal = () => {
    const text = `PROPOSAL PENAWARAN TEKNOLOGI — GEMILANG
Proyek: ${calcProjectName}
Klien: ${calcClientName}
Tanggal: ${new Date().toLocaleDateString("id-ID")}
------------------------------------------------
RINCIAN MODUL & RUANG LINGKUP:
${calcTasks.map((t, idx) => `${idx + 1}. ${t.name} (${t.points} Poin / ${t.hours} Jam)`).join("\n")}

TOTAL MODUL UTAMA : ${calcTasks.length} Modul Terintegrasi
TOTAL BOBOT FITUR : ${calcTotalPoints} Poin Kompleksitas
REKOMENDASI ANCHOR INVESTASI : ${formatIDR(calcTotalClient)} (Net Managed Deployment)

Garansi & Support: SLA 99.9% + Free Maintenance Sprint 30 Hari.
------------------------------------------------
Hubungi Tim Engineer Gemilang: +62 857-2204-5801`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const uniqueProjects = Array.from(new Set(tickets.map((t) => t.projectName)));
  const filteredTickets = tickets.filter((t) => {
    if (filterProject !== "all" && t.projectName !== filterProject) return false;
    if (filterStatus !== "all" && t.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-teal-100 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-teal-700">
              OPERASIONAL &amp; PRICING ENGINE
            </span>
          </div>
          <h2 className="font-black text-2xl text-zinc-900 mt-1 tracking-tight">
            Tiket &amp; Task Kalkulator
          </h2>
          <p className="text-xs font-semibold text-zinc-500 mt-1">
            Pantau tiket penugasan developer, status bayar klien, dan hitung simulasi margin kas studio.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activeView === "tickets" ? (
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Buat Tiket Baru</span>
            </button>
          ) : (
            <button
              onClick={copyProposal}
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Tersalin!" : "Salin Proposal"}</span>
            </button>
          )}
        </div>
      </div>

      {/* VIEW SWITCH TABS */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-2">
        <button
          onClick={() => setActiveView("tickets")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeView === "tickets"
              ? "bg-zinc-900 text-white shadow-sm"
              : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
          }`}
        >
          Daftar Tiket Task ({tickets.length})
        </button>
        <button
          onClick={() => setActiveView("calculator")}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
            activeView === "calculator"
              ? "bg-zinc-900 text-white shadow-sm"
              : "bg-white text-zinc-600 hover:text-zinc-900 border border-zinc-200"
          }`}
        >
          Mesin Kalkulator &amp; Estimator Poin
        </button>
      </div>

      {/* VIEW 1: TICKETS MANAGEMENT */}
      {activeView === "tickets" && (
        <div className="space-y-4">
          {/* FILTER CONTROLS */}
          <div className="flex flex-wrap items-center gap-3 bg-white border border-teal-100 p-3.5 rounded-2xl shadow-xs">
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono font-bold">
              <Filter className="w-3.5 h-3.5 text-teal-600" />
              <span>Filter:</span>
            </div>

            <select
              value={filterProject}
              onChange={(e) => setFilterProject(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 font-bold focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="all">Semua Proyek ({uniqueProjects.length})</option>
              {uniqueProjects.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-1.5 text-xs text-zinc-800 font-bold focus:outline-none focus:border-teal-500 cursor-pointer"
            >
              <option value="all">Semua Status Task</option>
              <option value="backlog">Backlog</option>
              <option value="in_progress">In Progress</option>
              <option value="review">Review / QA</option>
              <option value="done">Done</option>
            </select>

            <div className="ml-auto text-xs font-mono text-zinc-500">
              Total: <span className="text-zinc-900 font-black tabular-nums">{filteredTickets.length}</span> tiket
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white border border-teal-100 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-teal-50/40 text-zinc-500 text-[10px] font-mono uppercase font-bold">
                    <th className="py-3 px-4">Tiket &amp; Modul</th>
                    <th className="py-3 px-3">Assignee Dev</th>
                    <th className="py-3 px-3 text-right">Tagih Klien</th>
                    <th className="py-3 px-3 text-right">Fee Dev</th>
                    <th className="py-3 px-3 text-right text-teal-700">Kas Studio</th>
                    <th className="py-3 px-3 text-center">Status Task</th>
                    <th className="py-3 px-3 text-center">Bayar Klien</th>
                    <th className="py-3 px-3 text-center">Payout Dev</th>
                    <th className="py-3 px-3 text-center w-12">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {filteredTickets.map((t) => {
                    const margin = t.clientPrice - t.devPayout;
                    const marginPct = t.clientPrice > 0 ? ((margin / t.clientPrice) * 100).toFixed(0) : "0";

                    return (
                      <tr key={t.id} className="hover:bg-teal-50/20 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 font-mono font-bold text-[10px] border border-teal-200">
                              {t.id}
                            </span>
                            <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-mono font-bold ${
                              t.priority === 'urgent' ? 'bg-rose-100 text-rose-700 border border-rose-200' :
                              t.priority === 'high' ? 'bg-amber-100 text-amber-800' : 'bg-zinc-100 text-zinc-600'
                            }`}>
                              {t.priority}
                            </span>
                          </div>
                          <div className="font-bold text-zinc-900 text-xs max-w-xs">{t.moduleName}</div>
                          <div className="text-[10px] text-zinc-400 flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 text-zinc-400" />
                            <span>{t.projectName} ({t.clientName})</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="text-zinc-800 font-bold">{t.assignedDev}</div>
                          <div className="text-[10px] text-zinc-400 font-mono tabular-nums">{t.points} Pts • {t.estHours} Jam</div>
                        </td>

                        <td className="py-3.5 px-3 text-right font-bold text-zinc-900 font-mono tabular-nums">
                          {formatIDR(t.clientPrice)}
                        </td>

                        <td className="py-3.5 px-3 text-right font-bold text-amber-700 font-mono tabular-nums">
                          {formatIDR(t.devPayout)}
                        </td>

                        <td className="py-3.5 px-3 text-right font-black text-teal-700 font-mono tabular-nums">
                          <div>{formatIDR(margin)}</div>
                          <div className="text-[9px] text-zinc-400 font-normal">{marginPct}% margin</div>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <select
                            value={t.status}
                            onChange={(e) => updateTicketStatus(t.id, e.target.value as TicketStatus)}
                            className={`text-[10px] font-bold rounded-lg px-2 py-1 border cursor-pointer focus:outline-none ${
                              t.status === "done"
                                ? "bg-teal-50 border-teal-200 text-teal-800"
                                : t.status === "in_progress"
                                ? "bg-sky-50 border-sky-200 text-sky-800"
                                : t.status === "review"
                                ? "bg-amber-50 border-amber-200 text-amber-800"
                                : "bg-zinc-100 border-zinc-200 text-zinc-700"
                            }`}
                          >
                            <option value="backlog">Backlog</option>
                            <option value="in_progress">In Progress</option>
                            <option value="review">Review</option>
                            <option value="done">Done</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <select
                            value={t.clientPaymentStatus}
                            onChange={(e) => updateTicketClientPayment(t.id, e.target.value as ClientPaymentStatus)}
                            className={`text-[10px] font-bold rounded-lg px-2 py-1 border cursor-pointer focus:outline-none ${
                              t.clientPaymentStatus === "paid"
                                ? "bg-teal-50 border-teal-200 text-teal-800"
                                : t.clientPaymentStatus === "dp_50"
                                ? "bg-sky-50 border-sky-200 text-sky-800"
                                : "bg-zinc-100 border-zinc-200 text-zinc-500"
                            }`}
                          >
                            <option value="unpaid">Belum Bayar</option>
                            <option value="dp_50">DP 50%</option>
                            <option value="paid">Lunas</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <select
                            value={t.payoutStatus}
                            onChange={(e) => updateTicketPayout(t.id, e.target.value as PayoutStatus)}
                            className={`text-[10px] font-bold rounded-lg px-2 py-1 border cursor-pointer focus:outline-none ${
                              t.payoutStatus === "paid"
                                ? "bg-teal-50 border-teal-200 text-teal-800"
                                : t.payoutStatus === "ready"
                                ? "bg-amber-50 border-amber-200 text-amber-800"
                                : "bg-zinc-100 border-zinc-200 text-zinc-500"
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="ready">Siap Payout</option>
                            <option value="paid">Sudah Transfer</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-3 text-center">
                          <button
                            onClick={() => deleteTicket(t.id)}
                            className="text-zinc-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                            title="Hapus tiket"
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
        </div>
      )}

      {/* VIEW 2: ESTIMATOR CALCULATOR */}
      {activeView === "calculator" && (
        <div className="space-y-6">
          <div className="bg-white border border-teal-100 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-xs">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">Nama Proyek</label>
              <input
                type="text"
                value={calcProjectName}
                onChange={(e) => setCalcProjectName(e.target.value)}
                className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 font-bold focus:outline-none focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">Klien Perusahaan</label>
              <input
                type="text"
                value={calcClientName}
                onChange={(e) => setCalcClientName(e.target.value)}
                className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-xs text-zinc-900 font-bold focus:outline-none focus:border-teal-500"
              />
            </div>
            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase font-mono font-bold text-teal-800">Total Anchor Penawaran</div>
                <div className="text-xl font-black text-zinc-900 font-mono tabular-nums">{formatIDR(calcTotalClient)}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono font-bold text-zinc-500">Kas Studio</div>
                <div className="text-xs font-black text-teal-700 font-mono tabular-nums">+{formatIDR(calcMargin)}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* WORK BREAKDOWN */}
            <div className="lg:col-span-2 bg-white border border-teal-100 rounded-2xl p-5 space-y-4 shadow-xs">
              <h3 className="text-sm font-black text-zinc-900 flex items-center gap-2 uppercase">
                <Layers className="w-4 h-4 text-teal-600" /> Work Breakdown &amp; Story Points
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="border-b border-zinc-200 bg-teal-50/40 text-zinc-500 text-[10px] uppercase font-bold">
                      <th className="py-2.5 px-3">Modul / Fitur</th>
                      <th className="py-2.5 px-2 text-center">Bobot (Pts)</th>
                      <th className="py-2.5 px-2 text-center">Est. Jam</th>
                      <th className="py-2.5 px-3 text-right">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {calcTasks.map((t) => (
                      <tr key={t.id} className="hover:bg-teal-50/20">
                        <td className="py-2 px-3 text-zinc-900 font-bold">{t.name}</td>
                        <td className="py-2 px-2 text-center text-teal-700 font-bold tabular-nums">{t.points}</td>
                        <td className="py-2 px-2 text-center text-zinc-700 tabular-nums">{t.hours}</td>
                        <td className="py-2 px-3 text-right font-black text-zinc-900 tabular-nums">
                          {formatIDR(t.points * calcRatePerPoint)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PARAMETERS */}
            <div className="bg-white border border-teal-100 rounded-2xl p-5 space-y-5 shadow-xs font-mono text-xs">
              <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-teal-600" /> Parameter Rate Studio
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Rate Jual Klien / Poin</label>
                  <input
                    type="number"
                    step={50000}
                    value={calcRatePerPoint}
                    onChange={(e) => setCalcRatePerPoint(Number(e.target.value))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-black tabular-nums focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Fee Penugasan Dev / Poin</label>
                  <input
                    type="number"
                    step={25000}
                    value={calcDevPayoutPerPoint}
                    onChange={(e) => setCalcDevPayoutPerPoint(Number(e.target.value))}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-3 py-2 text-amber-800 font-black tabular-nums focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-600 mb-1">
                    <span>Buffer Scope Creep</span>
                    <span className="text-teal-700 tabular-nums">{calcBufferPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    step={5}
                    value={calcBufferPct}
                    onChange={(e) => setCalcBufferPct(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2">
                <div className="flex justify-between text-zinc-600">
                  <span>Harga Jual Klien:</span>
                  <span className="text-zinc-900 font-black tabular-nums">{formatIDR(calcTotalClient)}</span>
                </div>
                <div className="flex justify-between text-amber-800 font-bold">
                  <span>Alokasi Fee Dev:</span>
                  <span className="tabular-nums">-{formatIDR(calcTotalDev)}</span>
                </div>
                <div className="flex justify-between text-teal-800 font-black text-sm pt-2 border-t border-zinc-200">
                  <span>Net Kas Studio:</span>
                  <span className="tabular-nums">{formatIDR(calcMargin)} ({calcMarginPct.toFixed(0)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH TIKET */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-teal-100 w-full max-w-2xl rounded-3xl p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <div>
                <h3 className="text-lg font-black text-zinc-900">Buat Tiket Baru &amp; Alokasi Margin</h3>
                <p className="text-xs text-zinc-500">Tentukan harga tagih ke klien dan alokasi fee untuk dev.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-zinc-400 hover:text-zinc-900 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Nama Proyek</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT David Beckham POS"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Nama Klien Perusahaan</label>
                  <input
                    type="text"
                    placeholder="Contoh: PT David Beckham Abadi"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Nama Modul / Task Teknis</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Integrasi Driver RS232 & Timbangan"
                  value={moduleName}
                  onChange={(e) => setModuleName(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Deskripsi Pengerjaan</label>
                <textarea
                  rows={2}
                  placeholder="Detail teknis..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Bobot Points</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={points}
                    onChange={(e) => handlePointsChange(Number(e.target.value))}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-mono font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Estimasi Jam</label>
                  <input
                    type="number"
                    min={1}
                    max={200}
                    value={estHours}
                    onChange={(e) => setEstHours(Number(e.target.value))}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-mono font-bold focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Pilih Developer</label>
                  <select
                    value={assignedDev}
                    onChange={(e) => handleDevSelect(e.target.value)}
                    className="w-full bg-[#F4F9F8] border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-bold focus:outline-none focus:border-teal-500 focus:bg-white cursor-pointer"
                  >
                    {developers.map((d) => (
                      <option key={d.devName} value={d.devName}>
                        {d.devName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* FINANCIAL SPLIT SECTION */}
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3 font-mono">
                <div className="text-teal-950 font-black uppercase text-[11px] flex items-center justify-between">
                  <span>Kalkulasi Bagi Margin Studio</span>
                  <span className="tabular-nums">Margin Kas: {formatIDR(clientPrice - devPayout)} ({clientPrice > 0 ? (((clientPrice - devPayout) / clientPrice) * 100).toFixed(0) : 0}%)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Harga Tagih ke Klien (IDR)</label>
                    <input
                      type="number"
                      step={50000}
                      value={clientPrice}
                      onChange={(e) => setClientPrice(Number(e.target.value))}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-zinc-900 font-black tabular-nums focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-600 font-bold uppercase text-[10px] mb-1">Fee Penugasan Dev (IDR)</label>
                    <input
                      type="number"
                      step={50000}
                      value={devPayout}
                      onChange={(e) => setDevPayout(Number(e.target.value))}
                      className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-2 text-amber-800 font-black tabular-nums focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 font-bold hover:bg-zinc-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-black rounded-xl uppercase tracking-wider shadow-md shadow-teal-600/20 cursor-pointer"
                >
                  Simpan Tiket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
