"use client";

import React, { useState } from "react";
import { 
  Network, 
  Database, 
  Cloud, 
  GitBranch, 
  Globe, 
  Server, 
  ShieldCheck, 
  Zap, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  HardDrive,
  RefreshCw,
  Lock,
  Radio
} from "lucide-react";

interface ServiceNode {
  id: string;
  name: string;
  provider: "Vercel" | "Supabase" | "Cloudflare" | "GitHub" | "Hetzner/VPS";
  role: string;
  status: "healthy" | "active" | "standby";
  costTier: string;
  specs: string;
  url?: string;
  connectedTo: string[];
}

const infraNodes: ServiceNode[] = [
  {
    id: "node-cf",
    name: "Cloudflare Edge & WAF",
    provider: "Cloudflare",
    role: "DNS Anycast, DDoS Guard, SSL Edge & Caching",
    status: "healthy",
    costTier: "Free ($0)",
    specs: "Proxied (Orange Cloud ON), Hide Origin IP, 0ms TLS Handshake",
    url: "https://dash.cloudflare.com",
    connectedTo: ["node-vercel", "node-r2"],
  },
  {
    id: "node-vercel",
    name: "Vercel Next.js 16 Host",
    provider: "Vercel",
    role: "Frontend Rendering & Global Edge CDN",
    status: "healthy",
    costTier: "Hobby ($0)",
    specs: "React 19, Turbopack, Global Edge Routing, Auto CI/CD from Git",
    url: "https://vercel.com",
    connectedTo: ["node-supabase", "node-gh"],
  },
  {
    id: "node-supabase",
    name: "Supabase Cloud Database",
    provider: "Supabase",
    role: "PostgreSQL 16, Row Level Security (RLS) & Auth",
    status: "healthy",
    costTier: "Free Tier ($0)",
    specs: "Postgres 16, Realtime WebSocket, Vault Secrets, pg_vector ready",
    url: "https://supabase.com/dashboard",
    connectedTo: ["node-vercel", "node-r2"],
  },
  {
    id: "node-gh",
    name: "GitHub Repository & Actions",
    provider: "GitHub",
    role: "Version Control, Git Ops & Automated Deploy Triggers",
    status: "healthy",
    costTier: "Free ($0)",
    specs: "Single Source of Truth, Turbo Build Cache, Branch Protection",
    url: "https://github.com",
    connectedTo: ["node-vercel"],
  },
  {
    id: "node-r2",
    name: "Cloudflare R2 Object Storage",
    provider: "Cloudflare",
    role: "Media Assets, Nota PDF & Off-Site Database Backup",
    status: "healthy",
    costTier: "Free (10GB, Zero Egress)",
    specs: "S3-Compatible API, Zero Egress Fees, Encrypted Daily Dump",
    url: "https://dash.cloudflare.com",
    connectedTo: ["node-supabase"],
  },
  {
    id: "node-tunnel",
    name: "Cloudflare Tunnel (cloudflared)",
    provider: "Cloudflare",
    role: "Local POS Testing & RS232 Hardware Gateway",
    status: "standby",
    costTier: "Free ($0)",
    specs: "Expose local testing POS tanpa IP publik statis",
    connectedTo: ["node-cf"],
  },
];

export default function InfraOpsPage() {
  const [selectedNode, setSelectedNode] = useState<ServiceNode>(infraNodes[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-teal-100 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-teal-700">
              INFRASTRUCTURE TOPOLOGY &amp; DEVOPS
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-zinc-900 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              Ultra-Lean Gemilang Stack
            </span>
          </div>
          <h2 className="font-black text-2xl text-zinc-900 mt-1 tracking-tight">
            Peta Arsitektur Ops &amp; Layanan Cloud
          </h2>
          <p className="text-xs font-semibold text-zinc-500 mt-1">
            Topologi layanan cloud production: Cloudflare, Vercel, Supabase, GitHub, dan R2 Object Storage.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          className="inline-flex items-center gap-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-mono font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl border border-zinc-200 transition-all cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-teal-600" : ""}`} />
          <span>Ping Status Infra</span>
        </button>
      </div>

      {/* TOPOLOGY SUMMARY BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-black">
            <Cloud className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">DNS &amp; CDN</div>
            <div className="text-sm font-black text-zinc-900">Cloudflare</div>
            <div className="text-[10px] text-teal-700 font-mono font-bold">100% Proxied</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-black">
            ▲
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Frontend Host</div>
            <div className="text-sm font-black text-zinc-900">Vercel Edge</div>
            <div className="text-[10px] text-teal-700 font-mono font-bold">Next.js 16 Active</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-black">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">Database &amp; RLS</div>
            <div className="text-sm font-black text-zinc-900">Supabase</div>
            <div className="text-[10px] text-teal-700 font-mono font-bold">Postgres 16 Live</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-teal-100 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 font-black">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-zinc-400 font-bold">VCS &amp; CI/CD</div>
            <div className="text-sm font-black text-zinc-900">GitHub</div>
            <div className="text-[10px] text-teal-700 font-mono font-bold">Main Sync Auto</div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE TOPOLOGY MAP & NODE DETAIL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TOPOLOGY NODES GRID (2 COLS) */}
        <div className="lg:col-span-2 bg-white border border-teal-100 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider flex items-center gap-2">
                <Network className="w-4 h-4 text-teal-600" /> Diagram Alur Data &amp; Hosting
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Klik kartu simpul layanan untuk memeriksa spesifikasi konfigurasi, RLS, dan URL console.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              6 Simpul Terpantau
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {infraNodes.map((node) => {
              const isSelected = selectedNode.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-teal-500 bg-teal-50/20 shadow-md shadow-teal-500/10"
                      : "border-zinc-200/80 bg-zinc-50/50 hover:border-zinc-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200/80 text-zinc-800">
                        {node.provider}
                      </span>
                      <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-teal-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                        {node.status}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-zinc-900 mb-1">{node.name}</h4>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{node.role}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-200/60 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="font-bold text-teal-700">{node.costTier}</span>
                    <span>Klik detail &rarr;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SECURITY & BEST PRACTICE ACCORDION */}
          <div className="mt-6 p-4 rounded-2xl bg-teal-50/40 border border-teal-200 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-teal-950 font-black uppercase text-[11px]">
              <ShieldCheck className="w-4 h-4 text-teal-700" />
              <span>Standar Protokol Keamanan Gemilang</span>
            </div>
            <ul className="space-y-1.5 text-zinc-700 font-mono text-[11px] list-disc list-inside">
              <li><strong>Zero Local Disk:</strong> Semua file nota/media dialirkan ke Cloudflare R2 / Supabase Storage (0 egress fee).</li>
              <li><strong>Postgres RLS:</strong> Row Level Security wajib aktif di setiap tabel Supabase untuk isolasi data tenant.</li>
              <li><strong>Cloudflare Proxy:</strong> IP server origin tidak boleh terpapar publik (Orange Cloud ON).</li>
            </ul>
          </div>
        </div>

        {/* RIGHT: SELECTED NODE INSPECTION */}
        <div className="bg-white border border-teal-100 rounded-2xl p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-700">
                Spesifikasi Simpul Aktif
              </span>
              <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[10px] font-mono font-bold border border-teal-200">
                {selectedNode.provider}
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold block mb-0.5">Nama Layanan</label>
                <div className="font-bold text-base text-zinc-900 font-sans">{selectedNode.name}</div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold block mb-0.5">Peran Arsitektur</label>
                <div className="text-zinc-700 font-sans leading-relaxed">{selectedNode.role}</div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold block mb-0.5">Biaya / Kuota</label>
                <div className="font-bold text-teal-700">{selectedNode.costTier}</div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold block mb-0.5">Spesifikasi Teknis</label>
                <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-800 leading-relaxed text-[11px]">
                  {selectedNode.specs}
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase text-zinc-400 font-bold block mb-0.5">Alur Integrasi (Connected To)</label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedNode.connectedTo.map((target) => (
                    <span key={target} className="px-2 py-0.5 rounded bg-teal-50 text-teal-800 text-[10px] border border-teal-200">
                      &rarr; {target.replace("node-", "").toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {selectedNode.url && (
            <div className="pt-4 border-t border-zinc-100">
              <a
                href={selectedNode.url}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-teal-600 text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-md shadow-zinc-900/10"
              >
                <span>Buka Console {selectedNode.provider}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
