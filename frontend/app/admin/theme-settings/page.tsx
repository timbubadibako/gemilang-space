"use client";

import React, { useState } from "react";
import { DAYTIME_THEMES, DayTimeTheme } from "@/lib/daytime-theme";
import { GemilangMark } from "@/components/ui/GemilangLogo";
import { 
  Palette, 
  Sun, 
  Moon, 
  Sunset, 
  Check, 
  Sliders, 
  Eye, 
  RotateCcw
} from "lucide-react";

export default function ThemeSettingsPage() {
  const [selectedThemeId, setSelectedThemeId] = useState<string>("night");
  const [activeTab, setActiveTab] = useState<"preset" | "preview">("preset");
  const [customTosca, setCustomTosca] = useState("#00E1BA");
  const [isSaved, setIsSaved] = useState(false);

  const currentTheme = DAYTIME_THEMES[selectedThemeId] || DAYTIME_THEMES.night;

  const handleSaveTheme = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-teal-100 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] font-black uppercase tracking-wider text-teal-700">
              BRANDING &amp; DESIGN SYSTEM
            </span>
          </div>
          <h2 className="font-black text-2xl text-zinc-900 mt-1 tracking-tight">
            Settings Tema &amp; Aksen Waktu
          </h2>
          <p className="text-xs font-semibold text-zinc-500 mt-1">
            Konfigurasi palet warna tosca neon, waktu adaptif studio (Pagi, Siang, Sore, Malam), dan gradient wave.
          </p>
        </div>

        <button
          onClick={handleSaveTheme}
          className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-500 text-white font-black text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          {isSaved ? <Check className="w-4 h-4" /> : <Palette className="w-4 h-4 stroke-[2.5]" />}
          <span>{isSaved ? "Tersimpan!" : "Simpan Preset Tema"}</span>
        </button>
      </div>

      {/* 4 DAYTIME THEME CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.values(DAYTIME_THEMES).map((th) => {
          const isSelected = selectedThemeId === th.id;
          return (
            <div
              key={th.id}
              onClick={() => setSelectedThemeId(th.id)}
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between bg-white ${
                isSelected
                  ? "border-teal-500 shadow-md shadow-teal-500/10"
                  : "border-zinc-200/80 hover:border-zinc-300 shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center p-1.5 shadow-sm"
                    style={{ backgroundColor: `${th.accentColor}20`, border: `1px solid ${th.accentColor}40` }}
                  >
                    <GemilangMark color={th.accentColor} className="w-full h-full" />
                  </div>
                  {isSelected && (
                    <span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-[9px] font-mono font-bold border border-teal-200">
                      Aktif
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-zinc-900">{th.nameId}</h3>
                <p className="text-[11px] font-mono text-zinc-500">{th.hourRange}</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border border-black/10" style={{ backgroundColor: th.accentColor }} />
                  <span className="text-[10px] font-mono text-zinc-600 font-bold">{th.accentColor}</span>
                </div>
              </div>

              {/* Mini wave color preview bar */}
              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center gap-1">
                {th.waveColors.map((wc, idx) => (
                  <div key={idx} className="flex-1 h-2 rounded-xs" style={{ backgroundColor: wc }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* DETAIL INSPECTION & LIVE PREVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: COLOR TOKEN INSPECTOR */}
        <div className="lg:col-span-2 bg-white border border-teal-100 rounded-2xl p-6 shadow-xs space-y-5">
          <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-teal-600" /> Token Tema Aktif: {currentTheme.name}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Accent Primary Color</span>
              <div className="flex items-center justify-between">
                <span className="text-zinc-900 font-bold">{currentTheme.accentColor}</span>
                <div className="w-6 h-6 rounded-lg border border-black/10 shadow-xs" style={{ backgroundColor: currentTheme.accentColor }} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Accent Glow Spectrum</span>
              <div className="flex items-center justify-between">
                <span className="text-zinc-900 font-bold truncate max-w-[140px]">{currentTheme.accentGlow}</span>
                <div className="w-6 h-6 rounded-lg border border-black/10 shadow-xs" style={{ backgroundColor: currentTheme.accentColor, boxShadow: `0 0 12px ${currentTheme.accentGlow}` }} />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Button Text Color</span>
              <div className="flex items-center justify-between">
                <span className="text-zinc-900 font-bold">{currentTheme.accentText}</span>
                <div className="w-6 h-6 rounded-lg border border-zinc-300 shadow-xs flex items-center justify-center font-black text-[10px]" style={{ backgroundColor: currentTheme.accentColor, color: currentTheme.accentText }}>
                  Aa
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
              <span className="text-[10px] uppercase font-bold text-zinc-500">Hero Card Ambient</span>
              <div className="flex items-center justify-between">
                <span className="text-zinc-900 font-bold">{currentTheme.isNight ? "Malam (Tosca Space)" : "Terang Adaptif"}</span>
                <div className="w-6 h-6 rounded-lg border border-black/10" style={{ backgroundColor: currentTheme.waveColors[3] }} />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <span className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-2">Palet 6-Stop Gradient Wave WebGL</span>
            <div className="flex h-7 rounded-xl overflow-hidden border border-zinc-200">
              {currentTheme.waveColors.map((wc, idx) => (
                <div key={idx} className="flex-1 flex items-center justify-center text-[9px] font-mono text-white/90 font-bold" style={{ backgroundColor: wc }}>
                  #{idx + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: LIVE UI COMPONENT MOCKUP */}
        <div className="bg-[#0A1214] border border-[#1B282A] text-white rounded-2xl p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400">
                Mockup Tampilan Web Publik
              </span>
              <Eye className="w-4 h-4 text-teal-400" />
            </div>

            {/* Mockup Button */}
            <div className="space-y-3 font-sans">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center p-1" style={{ backgroundColor: `${currentTheme.accentColor}25` }}>
                    <GemilangMark color={currentTheme.accentColor} className="w-full h-full" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Preview Logo &amp; Tombol</div>
                    <div className="text-[10px] text-white/50 font-mono">Simulasi aksen tema aktif</div>
                  </div>
                </div>

                <button
                  className="w-full py-2 px-3 rounded-full font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: currentTheme.accentColor,
                    color: currentTheme.accentText,
                    boxShadow: `0 4px 14px ${currentTheme.accentGlow}`,
                  }}
                >
                  <span>Konsultasi WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 text-[10px] font-mono text-white/50 flex items-center justify-between">
            <span>Sinkronisasi Otomatis</span>
            <span className="text-teal-400 font-bold">Live Context</span>
          </div>
        </div>
      </div>
    </div>
  );
}
