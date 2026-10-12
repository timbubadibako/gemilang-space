"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { blogPosts } from "@/data/blog-posts";
import { navItems, siteSettings } from "@/data/site-content";

export default function BlogArchivePage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Design Philosophy",
    "UX & Emotion",
    "Web3 & Tech",
    "Interface Design",
    "Brand Strategy",
  ];

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#04060A] text-white selection:bg-[#335CFF] selection:text-white flex flex-col">
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
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
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
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-medium px-4 py-2 rounded-full border transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-white text-neutral-950 border-white shadow-sm font-semibold"
                    : "bg-white/[0.04] text-neutral-300 border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Feed */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {filteredPosts.map((post, idx) => (
              <article
                key={post.slug}
                className="py-10 sm:py-12 group transition-all relative"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start"
                >
                  {/* Left Column: Number & Metadata */}
                  <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-3">
                    <span className="text-xs font-mono font-bold text-neutral-500">
                      0{idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase bg-white/[0.06] border border-white/10 text-neutral-300 px-2.5 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Middle Column: Title & Excerpt */}
                  <div className="lg:col-span-7 space-y-3">
                    <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl font-normal">
                      {post.excerpt}
                    </p>
                    <div className="text-[11px] text-neutral-500 font-mono pt-1">
                      {post.date} • By {post.author.name}
                    </div>
                  </div>

                  {/* Right Column: Arrow Action */}
                  <div className="lg:col-span-2 flex justify-end lg:pt-2">
                    <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300">
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              </article>
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
