"use client";

import React from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface BlogSectionProps {
  lang: "id" | "en";
}

interface Article {
  category: { id: string; en: string };
  date: string;
  readTime: { id: string; en: string };
  title: { id: string; en: string };
  tags: string[];
  href: string;
}

const articlesData: Article[] = [
  {
    category: { id: "PERSPEKTIF", en: "PERSPECTIVE" },
    date: "Aug 20, 2025",
    readTime: { id: "6 MENIT BACA", en: "6 MIN READ" },
    title: {
      id: "Slow Design: Mengapa Ketergesaan Mematikan Kreativitas",
      en: "Slow Design: Why Rushing Kills Creativity",
    },
    tags: ["CREATIVE PROCESS", "PRODUCTIVITY"],
    href: "#",
  },
  {
    category: { id: "PANDUAN", en: "GUIDE" },
    date: "Aug 20, 2025",
    readTime: { id: "7 MENIT BACA", en: "7 MIN READ" },
    title: {
      id: "Membuat Website Anda Terasa Manusiawi & Hidup",
      en: "Making Your Website Feel Human",
    },
    tags: ["UX DESIGN", "PSYCHOLOGY"],
    href: "#",
  },
  {
    category: { id: "WAWASAN", en: "INSIGHTS" },
    date: "Aug 20, 2025",
    readTime: { id: "9 MENIT BACA", en: "9 MIN READ" },
    title: {
      id: "Web3 untuk Kreator: Pendekatan Berpusat pada Pengguna",
      en: "Web3 for Creatives: A Human-Centered Approach",
    },
    tags: ["WEB3", "DESIGN THINKING"],
    href: "#",
  },
];

export function BlogSection({ lang }: BlogSectionProps) {
  return (
    <section
      id="blog"
      className="relative w-full bg-[#04060A] text-white py-20 sm:py-28 lg:py-32 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* ============================================================== */}
        {/* HEADER AREA                                                    */}
        {/* ============================================================== */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-12 pb-12 sm:pb-16 border-b border-[#23242B]">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-[-0.04em] text-white leading-[1.14]">
              {lang === "id" ? (
                <>
                  Apa Yang Kami Pelajari,
                  <br />
                  Bangun, dan Bagikan
                </>
              ) : (
                <>
                  What We&apos;re Learning,
                  <br />
                  Building, and Sharing
                </>
              )}
            </h2>
            <p className="text-[#A1A1AA] text-xs sm:text-[13.5px] leading-relaxed mt-4 font-normal">
              {lang === "id"
                ? "Dari identitas brand hingga website dan rekayasa web modern, kami membantu tim visioner merancang, membangun, dan merilis produk digital dengan cepat."
                : "From branding to websites and no-code development, we help visionary teams design, build, and launch digital products—fast."}
            </p>
          </div>

          {/* All Articles Pill Button (Exact Match to User Reference) */}
          <div className="shrink-0">
            <a
              href="#blog"
              className="inline-flex items-center gap-3 bg-[#F2F2F5] hover:bg-black text-neutral-950 hover:text-white border-2 border-transparent hover:border-white p-1 pl-1 pr-4 sm:pr-5 rounded-[16px] text-xs sm:text-[13.5px] font-semibold transition-all duration-300 group/btn cursor-pointer shadow-sm select-none"
            >
              <div className="w-8 h-8 rounded-[10px] bg-black group-hover/btn:bg-transparent text-white flex items-center justify-center shrink-0 transition-colors duration-300">
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
              </div>
              <span className="font-semibold tracking-tight">
                {lang === "id" ? "Semua Artikel" : "All Articles"}
              </span>
            </a>
          </div>
        </div>

        {/* ============================================================== */}
        {/* ARTICLES LIST (Hover Line Glow & Title Shift)                 */}
        {/* ============================================================== */}
        <div className="border-t border-[#23242B]">
          {articlesData.map((art, idx) => (
            <div key={idx} className="relative group border-b border-[#23242B] group-hover:border-white transition-colors duration-300">
              <a
                href={art.href}
                className="py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 px-2 sm:px-4 transition-colors"
              >
                {/* Category */}
                <div className="w-36 shrink-0">
                  <span className="font-mono text-xs font-semibold text-[#8B909D] tracking-[0.08em] uppercase">
                    {art.category[lang]}
                  </span>
                </div>

                {/* Main Info */}
                <div className="flex-1 min-w-0 pr-4">
                  <div className="flex items-center gap-2 text-xs text-[#8B909D] mb-2.5 font-mono">
                    <span>{art.date}</span>
                    <span>•</span>
                    <span>{art.readTime[lang]}</span>
                  </div>

                  {/* Title with smooth slide transition */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:translate-x-2.5 transition-transform duration-300 ease-out leading-snug">
                    {art.title[lang]}
                  </h3>

                  {/* Tags */}
                  <div className="flex items-center gap-2 mt-4 flex-wrap">
                    {art.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] sm:text-[11px] font-mono font-medium text-neutral-300 bg-white/[0.06] border border-white/10 px-2.5 py-1 rounded-full uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Read Link */}
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-400 group-hover:text-white transition-colors shrink-0">
                  <span>{lang === "id" ? "BACA" : "READ"}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
