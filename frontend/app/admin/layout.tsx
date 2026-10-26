"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { AdminProvider } from "@/lib/admin-context";
import { GemilangMark } from "@/components/ui/GemilangLogo";
import { 
  LayoutDashboard, 
  Calculator, 
  Layers,
  Network,
  Palette, 
  ExternalLink,
  LogOut,
  FolderGit2,
  ChevronDown,
  ChevronRight,
  Users,
  Sliders,
  ImageIcon,
  Sparkles,
  MessageSquare,
  HelpCircle,
  FileText,
  Layout,
  Menu,
  X
} from "lucide-react";

export const CMS_SUBMENUS = [
  { id: "hero-team", label: "Foto Tim Hero", icon: Users },
  { id: "bento-stats", label: "Metrik Angka Bento", icon: Sliders },
  { id: "works-slider", label: "Marquee Running", icon: ImageIcon },
  { id: "highlighted", label: "Highlighted Works", icon: Sparkles },
  { id: "testimonials", label: "Testimoni Mitra", icon: MessageSquare },
  { id: "faqs", label: "FAQ Tanya Jawab", icon: HelpCircle },
  { id: "blog", label: "Blogger Artikel", icon: FileText },
  { id: "footer", label: "Footer & Alamat", icon: Layout },
];

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "hero-team";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isCmsOpen, setIsCmsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Persist auth status in sessionStorage (survives page refresh during admin session)
  useEffect(() => {
    try {
      const auth = sessionStorage.getItem("gemilang_admin_auth");
      if (auth === "true") setIsAuthenticated(true);
    } catch {}
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === "2026" || pinInput.toLowerCase() === "gemilang") {
      setIsAuthenticated(true);
      setErrorMsg("");
      try {
        sessionStorage.setItem("gemilang_admin_auth", "true");
      } catch {}
    } else {
      setErrorMsg("PIN akses salah. Gunakan PIN default: 2026");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem("gemilang_admin_auth");
    } catch {}
  };

  const isCmsActive = pathname.startsWith("/admin/cms-portfolio");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] text-zinc-900 flex items-center justify-center p-4 selection:bg-teal-500 selection:text-white">
        <div className="w-full max-w-sm bg-white border border-zinc-200/80 rounded-3xl p-8 shadow-xl shadow-zinc-900/5 relative">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center p-2.5">
              <GemilangMark color="#00E1BA" className="w-full h-full" />
            </div>
            <div>
              <h1 className="text-base font-black text-zinc-900 tracking-tight">Gemilang Studio Portal</h1>
              <p className="text-[11px] text-teal-700 font-mono font-semibold">Pusat Kendali Web &amp; Ops Hub</p>
            </div>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-bold mb-2">
                Masukkan PIN Akses Admin
              </label>
              <input
                type="password"
                placeholder="2026"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-zinc-900 font-mono tracking-widest text-center focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-bold"
                autoFocus
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-600 font-mono text-center font-bold">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-zinc-900 hover:bg-teal-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Buka Dashboard
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span>PIN: 2026</span>
            <Link href="/" className="hover:text-teal-700 font-semibold flex items-center gap-1">
              Ke Web Publik <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AdminProvider>
      <div className="flex min-h-screen w-full bg-[#F8FAFB] text-zinc-900 font-sans selection:bg-teal-500 selection:text-white">
        
        {/* SIDEBAR */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-zinc-200/80 bg-white flex flex-col transition-transform duration-200 lg:static lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}>
          {/* Header Brand */}
          <div className="h-14 border-b border-zinc-100 px-4 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 border border-teal-500/20 p-1.5">
                <GemilangMark color="#00E1BA" className="w-full h-full" />
              </div>
              <div>
                <span className="text-xs font-black tracking-wider uppercase text-zinc-900 block leading-tight">
                  GEMILANG
                </span>
                <span className="text-[10px] text-teal-600 font-mono font-bold block leading-none">
                  Studio Hub
                </span>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden text-zinc-400 hover:text-zinc-600 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
            <div>
              <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 mb-2 px-2.5">
                Menu Utama
              </p>
              <nav className="space-y-1">
                {/* 1. Ringkasan */}
                <Link
                  href="/admin"
                  className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                    pathname === "/admin"
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <LayoutDashboard className="h-4 w-4 shrink-0" />
                  <span>Ringkasan Studio</span>
                </Link>

                {/* 2. CMS Landing Page (Parent with Expandable 8 Submenus) */}
                <div>
                  <button
                    onClick={() => setIsCmsOpen(!isCmsOpen)}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition-all cursor-pointer ${
                      isCmsActive
                        ? "bg-teal-50 text-teal-900 font-black border border-teal-200/60"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Layers className={`h-4 w-4 shrink-0 ${isCmsActive ? "text-teal-600" : ""}`} />
                      <span>CMS Landing Page</span>
                    </div>
                    {isCmsOpen ? (
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                    ) : (
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                    )}
                  </button>

                  {/* 8 SUBMENUS TREE */}
                  {isCmsOpen && (
                    <div className="ml-3 pl-3 border-l border-zinc-200 mt-1 space-y-0.5 py-1">
                      {CMS_SUBMENUS.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = isCmsActive && currentTab === sub.id;
                        return (
                          <Link
                            key={sub.id}
                            href={`/admin/cms-portfolio?tab=${sub.id}`}
                            className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-all ${
                              isSubActive
                                ? "bg-zinc-900 text-white font-bold shadow-2xs"
                                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                            }`}
                          >
                            <SubIcon className={`h-3.5 w-3.5 shrink-0 ${isSubActive ? "text-teal-400" : "text-zinc-400"}`} />
                            <span className="truncate">{sub.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3. Kalkulator & Tiket Margin */}
                <Link
                  href="/admin/tasks-calculator"
                  className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                    pathname === "/admin/tasks-calculator"
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <Calculator className="h-4 w-4 shrink-0" />
                  <span>Kalkulator &amp; Tiket</span>
                </Link>

                {/* 4. Peta Ops & Infra */}
                <Link
                  href="/admin/infra-ops"
                  className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                    pathname === "/admin/infra-ops"
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <Network className="h-4 w-4 shrink-0" />
                  <span>Peta Ops &amp; Infra</span>
                </Link>

                {/* 5. Settings Tema */}
                <Link
                  href="/admin/theme-settings"
                  className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition-all ${
                    pathname === "/admin/theme-settings"
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  <Palette className="h-4 w-4 shrink-0" />
                  <span>Settings Tema</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* User & Logout Footer */}
          <div className="border-t border-zinc-100 p-3 space-y-1">
            <Link
              href="/"
              target="_blank"
              className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-mono font-medium text-zinc-600 hover:bg-zinc-100 transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
              <span>Lihat Web Live</span>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-mono font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </aside>

        {/* WORKSPACE AREA */}
        <div className="flex-1 min-w-0 flex flex-col min-h-screen">
          {/* TOPBAR */}
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b border-zinc-200/80 bg-white/90 px-4 sm:px-6 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-100 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 font-bold uppercase tracking-wider">
                <span>Gemilang</span>
                <span className="text-zinc-300">/</span>
                <span className="text-zinc-900 font-black">
                  {pathname === "/admin" && "Ringkasan"}
                  {pathname.startsWith("/admin/cms-portfolio") && "CMS Landing Page"}
                  {pathname === "/admin/tasks-calculator" && "Kalkulator & Tiket"}
                  {pathname === "/admin/infra-ops" && "Peta Ops & Infra"}
                  {pathname === "/admin/theme-settings" && "Settings Tema"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-teal-800 border border-teal-200 bg-teal-50">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                <span>Active Studio State</span>
              </span>
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 bg-zinc-900 hover:bg-teal-600 text-white px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors shadow-xs"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Web Depan</span>
              </Link>
            </div>
          </header>

          {/* MAIN PAGE BODY */}
          <main className="flex-1 p-5 sm:p-7 max-w-6xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center p-4">Memuat panel...</div>}>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </Suspense>
  );
}
