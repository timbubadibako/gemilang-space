"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientWave } from "@/components/ui/gradient-wave";
import { useDaytimeTheme } from "@/lib/daytime-context";

interface CallToActionSectionProps {
  lang: "id" | "en";
  whatsappNumber: string;
}

const ctaClients = [
  { name: "FERMION ROASTERY", category: "Specialty Coffee" },
  { name: "DESA KADURAMA", category: "Pemerintahan Desa" },
  { name: "GREEN CYCLE KUNINGAN", category: "Enterprise ERP" },
  { name: "AHASS AS PUTRA RAHMAT", category: "Bengkel Resmi Honda" },
  { name: "GEMILANG SPACE", category: "Engineering Studio" },
];

export function CallToActionSection({ lang, whatsappNumber }: CallToActionSectionProps) {
  const { currentTheme } = useDaytimeTheme();
  const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lang === "id"
      ? "Halo Gemilang, saya ingin berkonsultasi mengenai kebutuhan desain & rekayasa produk kami."
      : "Hello Gemilang, I would like to discuss our product design and engineering backlog."
  )}`;

  return (
    <section className="relative w-full overflow-hidden bg-[#090C15] pt-24 sm:pt-32 lg:pt-36 pb-36 sm:pb-44 lg:pb-52 text-white flex flex-col items-center justify-between select-none">
      {/* 1. Dynamic WebGL GradientWave Background matching Daytime Theme */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <GradientWave
          colors={currentTheme.waveColors}
          shadowPower={4}
          noiseSpeed={0.00004}
          deform={{ incline: 0.5, noiseAmp: 300, noiseFlow: 5, noiseSpeed: 12 }}
          className="opacity-95"
        />
        {/* Subtle dark vignette to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/80 via-black/30 to-[#04060A]/60 pointer-events-none" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8 flex flex-col items-center text-center">
        
        {/* Center Text Wrapper (max-w-[740px]) */}
        <div className="max-w-[740px] mx-auto flex flex-col items-center gap-5 sm:gap-6">
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-white leading-[1.12] sm:leading-[1.15]">
            {lang === "id" ? (
              <>
                Bisnis Anda butuh sistem yang beres,<br className="hidden sm:inline" /> bukan janji manis.
              </>
            ) : (
              <>
                Your business needs reliable systems,<br className="hidden sm:inline" /> not empty promises.
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base lg:text-[17px] text-white/90 font-normal leading-relaxed max-w-xl">
            {lang === "id"
              ? "Dari website toko cepat Rp 1.5 Jt, kasir POS, hingga tim IT on-demand bulanan. Konsultasikan kebutuhan sistem Anda hari ini."
              : "From IDR 1.5M fast web stores to retail POS and monthly tech squads. Consult your system requirements today."}
          </p>

          {/* CTA Pill Button with expanding animation */}
          <div className="pt-2 sm:pt-3">
            <Button
              variant="expand-primary"
              size="lg"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 sm:h-14"
            >
              {lang === "id" ? "Konsultasi WhatsApp Sekarang" : "Consult on WhatsApp Now"}
            </Button>
          </div>
        </div>

        {/* Bottom Client Logos Marquee with Seamless CSS Mask */}
        <div 
          className="w-full mt-16 sm:mt-20 lg:mt-24 relative select-none"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          {/* Running Ticker */}
          <div className="animate-marquee gap-8 sm:gap-12 lg:gap-16 items-center py-2 text-white/80">
            {[...ctaClients, ...ctaClients, ...ctaClients].map((client, idx) => (
              <div
                key={`${client.name}-${idx}`}
                className="shrink-0 flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-white">
                  {client.name}
                </span>
                <span className="text-[10px] sm:text-xs text-white/50 border-l border-white/10 pl-2">
                  {client.category}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Smooth progressive blur & gradient fade at bottom edge to seamless blend with footer */}
      <div className="absolute bottom-0 left-0 right-0 h-40 sm:h-52 lg:h-64 bg-gradient-to-b from-transparent via-[#04060A]/40 to-[#04060A]/90 backdrop-blur-[4px] pointer-events-none z-15" />
    </section>
  );
}
