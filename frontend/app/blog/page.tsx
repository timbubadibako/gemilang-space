"use client";

import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { blogPosts, getLocalizedText } from "@/data/blog-posts";
import { navItems, siteSettings } from "@/data/site-content";

export default function BlogArchivePage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    { id: "Semua", en: "All" },
    { id: "Filosofi Desain", en: "Design Philosophy" },
    { id: "UX & Emosi", en: "UX & Emotion" },
    { id: "Web3 & Tech", en: "Web3 & Tech" },
    { id: "Desain Antarmuka", en: "Interface Design" },
    { id: "Strategi Brand", en: "Brand Strategy" },
  ];

  const filteredPosts =
    activeCategory === "All" || activeCategory === "Semua"
      ? blogPosts
      : blogPosts.filter(
          (p) =>
            getLocalizedText(p.category, "en") === activeCategory ||
            getLocalizedText(p.category, "id") === activeCategory
        );

  return (
    <div className="min-h-screen bg-[#04060A] text-white selection:bg-[#00E1BA] selection:text-white flex flex-col">
      {/* Navbar */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
      />

      {/* Main Blog Archive Header */}
      <main className="w-full flex-1 pt-12 sm:pt-16 lg:pt-20 pb-20">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
          
          {/* Header */}
          <div className="max-w-[760px] mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-medium text-neutral-300 uppercase mb-4 tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              {lang === "id" ? "Wawasan & Esai" : "Perspectives & Essays"}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]">
              {lang === "id"
                ? "Wawasan Desain, Produk & Rekayasa Sistem."
                : "Design, Product & Engineering Insights."}
            </h1>

            <p className="text-sm sm:text-base lg:text-[17px] text-neutral-400 mt-4 leading-relaxed max-w-2xl font-normal">
              {lang === "id"
                ? "Refleksi mendalam mengenai keahlian digital, minimalisme antarmuka, strategi startup, dan kecepatan rekayasa dari founder Gemilang Space."
                : "Deep reflections on digital craft, interface minimalism, startup strategy, and engineering velocity from the founders at Gemilang Space."}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10 sm:mb-14 pb-4 border-b border-white/10">
            {categories.map((catObj) => {
              const label = catObj[lang];
              const isSelected =
                activeCategory === catObj.en || activeCategory === catObj.id;

              return (
                <button
                  key={catObj.en}
                  type="button"
                  onClick={() => setActiveCategory(catObj.en)}
                  className={`text-xs font-medium px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white text-neutral-950 border-white shadow-sm font-semibold"
                      : "bg-white/[0.04] text-neutral-300 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Reusable Articles Feed */}
          <div className="border-t border-white/10">
            {filteredPosts.map((post, idx) => (
              <ArticleCard
                key={post.slug}
                post={post}
                index={idx}
                lang={lang}
                variant="row"
              />
            ))}
          </div>

        </div>
      </main>

      {/* Aurora Call To Action Banner */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
