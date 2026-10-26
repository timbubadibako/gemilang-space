"use client";

import React from "react";
import Link from "next/link";
import { useAdmin } from "@/lib/admin-context";
import { 
  DollarSign, 
  Wallet, 
  ArrowUpRight, 
  TrendingUp, 
  TicketCheck, 
  Users, 
  ArrowRight
} from "lucide-react";

export default function AdminOverviewPage() {
  const { tickets, developers } = useAdmin();

  // Financial calculations
  const totalClientPipeline = tickets.reduce((acc, t) => acc + t.clientPrice, 0);
  const totalDevCommitment = tickets.reduce((acc, t) => acc + t.devPayout, 0);
  const totalStudioMargin = totalClientPipeline - totalDevCommitment;
  const marginPercentage = totalClientPipeline > 0 ? (totalStudioMargin / totalClientPipeline) * 100 : 0;

  // Realized / Cash in hand
  const clientPaidAmount = tickets.reduce((acc, t) => {
    if (t.clientPaymentStatus === "paid") return acc + t.clientPrice;
    if (t.clientPaymentStatus === "dp_50") return acc + t.clientPrice * 0.5;
    return acc;
  }, 0);

  const devPaidAmount = tickets.reduce((acc, t) => {
    if (t.payoutStatus === "paid") return acc + t.devPayout;
    return acc;
  }, 0);

  const actualCashMargin = clientPaidAmount - devPaidAmount;

  // Task metrics
  const inProgressCount = tickets.filter((t) => t.status === "in_progress").length;
  const reviewCount = tickets.filter((t) => t.status === "review").length;
  const doneCount = tickets.filter((t) => t.status === "done").length;

  const formatIDR = (val: number) => {
    return "Rp " + Math.round(val).toLocaleString("id-ID");
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR (FOURJECTIVE STYLE WITH TOSCA ACCENT) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-teal-100 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-teal-700">
              EXECUTIVE COCKPIT
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-zinc-900 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              Live Pipeline
            </span>
          </div>
          <h2 className="font-black text-2xl text-zinc-900 mt-1 tracking-tight">
            Ringkasan Studio &amp; Arus Kas
          </h2>
          <p className="text-xs font-semibold text-zinc-500 mt-1">
            Pantau arus kas proyek, komitmen upah developer, dan laba bersih kas studio secara presisi.
          </p>
        </div>

        <Link
          href="/admin/tickets"
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 transition-all self-start sm:self-auto"
        >
          <span>Kelola Semua Tiket ({tickets.length})</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>

      {/* 4 METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL PIPELINE REVENUE */}
        <div className="bg-white border border-teal-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Total Billing Klien</span>
              <DollarSign className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-zinc-900 tracking-tight tabular-nums font-mono">
              {formatIDR(totalClientPipeline)}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>Terbayar/DP:</span>
            <span className="text-teal-700 font-bold tabular-nums">{formatIDR(clientPaidAmount)}</span>
          </div>
        </div>

        {/* DEV PAYOUT COMMITMENT */}
        <div className="bg-white border border-teal-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Upah / Fee Dev (COGS)</span>
              <Wallet className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-amber-700 tracking-tight tabular-nums font-mono">
              {formatIDR(totalDevCommitment)}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span>Sudah Ditransfer:</span>
            <span className="text-zinc-700 font-bold tabular-nums">{formatIDR(devPaidAmount)}</span>
          </div>
        </div>

        {/* ESTIMATED STUDIO CASH MARGIN */}
        <div className="bg-white border-2 border-teal-500/40 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-teal-600 mb-2">
              <span className="text-[11px] font-mono font-black uppercase tracking-wider text-teal-700">Target Margin Kas</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="text-2xl font-black text-teal-700 tracking-tight tabular-nums font-mono">
              {formatIDR(totalStudioMargin)}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
            <span className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold tabular-nums">
              {marginPercentage.toFixed(1)}%
            </span>
            <span>Gross margin bersih</span>
          </div>
        </div>

        {/* REALIZED CASH IN VAULT */}
        <div className="bg-white border border-teal-100/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">Kas Riil Masuk</span>
              <ArrowUpRight className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-2xl font-black text-teal-800 tracking-tight tabular-nums font-mono">
              {formatIDR(actualCashMargin)}
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-zinc-100 text-[11px] text-zinc-400 font-mono">
            DP Klien dikurangi Payout Dev
          </div>
        </div>
      </div>

      {/* TWO COLUMN SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT TICKETS TABLE */}
        <div className="lg:col-span-2 bg-white border border-teal-100 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <TicketCheck className="w-4 h-4 text-teal-600" /> Tiket Aktif &amp; Pembagian Margin
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">Daftar alokasi tiket task per proyek dan margin perusahaan.</p>
            </div>
            <Link
              href="/admin/tickets"
              className="text-xs text-teal-700 hover:text-teal-800 font-mono font-bold flex items-center gap-1"
            >
              Lihat Semua &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-teal-50/40 text-zinc-500 text-[10px] font-mono uppercase font-bold">
                  <th className="py-2.5 px-3">Kode / Task</th>
                  <th className="py-2.5 px-2">Dev Assignee</th>
                  <th className="py-2.5 px-2 text-right">Tagih Klien</th>
                  <th className="py-2.5 px-2 text-right">Upah Dev</th>
                  <th className="py-2.5 px-2 text-right text-teal-700">Margin Kas</th>
                  <th className="py-2.5 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {tickets.slice(0, 5).map((t) => {
                  const margin = t.clientPrice - t.devPayout;
                  const marginPct = t.clientPrice > 0 ? ((margin / t.clientPrice) * 100).toFixed(0) : "0";
                  return (
                    <tr key={t.id} className="hover:bg-teal-50/20 transition-colors">
                      <td className="py-3 px-3">
                        <div className="font-bold text-zinc-900 flex items-center gap-1.5">
                          <span className="text-[10px] text-teal-700 font-mono font-black">{t.id}</span>
                          <span className="truncate max-w-[180px]">{t.moduleName}</span>
                        </div>
                        <div className="text-[10px] text-zinc-400 truncate font-mono">{t.projectName}</div>
                      </td>
                      <td className="py-3 px-2 text-zinc-700">
                        <div className="font-semibold">{t.assignedDev}</div>
                        <div className="text-[10px] text-zinc-400 font-mono tabular-nums">{t.estHours} Jam ({t.points} Pts)</div>
                      </td>
                      <td className="py-3 px-2 text-right font-bold text-zinc-900 font-mono tabular-nums">
                        {formatIDR(t.clientPrice)}
                      </td>
                      <td className="py-3 px-2 text-right text-amber-700 font-bold font-mono tabular-nums">
                        {formatIDR(t.devPayout)}
                      </td>
                      <td className="py-3 px-2 text-right font-black text-teal-700 font-mono tabular-nums">
                        {formatIDR(margin)}
                        <span className="block text-[9px] text-zinc-400 font-normal">{marginPct}%</span>
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-mono font-bold border ${
                            t.status === "done"
                              ? "bg-teal-50 text-teal-800 border-teal-200"
                              : t.status === "in_progress"
                              ? "bg-sky-50 text-sky-800 border-sky-200"
                              : t.status === "review"
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-zinc-100 text-zinc-600 border-zinc-200"
                          }`}
                        >
                          {t.status.replace("_", " ")}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* DEVELOPER POOL & HEALTH */}
        <div className="space-y-6">
          <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-600" /> Skuad Dev &amp; Rate Standar
            </h3>
            <div className="space-y-2.5 text-xs">
              {developers.map((dev) => (
                <div key={dev.devName} className="p-3 rounded-xl bg-teal-50/30 border border-teal-100 space-y-1">
                  <div className="flex items-center justify-between text-zinc-900 font-bold">
                    <span>{dev.devName}</span>
                    <span className="text-[10px] text-teal-700 font-mono font-bold">{dev.role}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-500 pt-1 border-t border-teal-100/50 font-mono tabular-nums">
                    <span>Rate: {formatIDR(dev.hourlyRate)}/jam</span>
                    <span>Poin: {formatIDR(dev.pointRate)}/pt</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SPRINT STATUS SUMMARY */}
          <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-xs space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">Status Task Sprint</h4>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-3 rounded-xl bg-sky-50 border border-sky-200">
                <div className="text-xl font-black text-sky-700 tabular-nums">{inProgressCount}</div>
                <div className="text-[10px] text-zinc-600 font-bold">In Progress</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div className="text-xl font-black text-amber-700 tabular-nums">{reviewCount}</div>
                <div className="text-[10px] text-zinc-600 font-bold">Review / QA</div>
              </div>
              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
                <div className="text-xl font-black text-teal-800 tabular-nums">{doneCount}</div>
                <div className="text-[10px] text-zinc-600 font-bold">Done</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
