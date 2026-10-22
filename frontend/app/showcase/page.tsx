"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LayoutGrid, Columns, Smartphone } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { navItems, siteSettings } from "@/data/site-content";

interface ShowcaseItem {
  id: string;
  title: string;
  client: string;
  type: string;
  category: "Web3" | "AI" | "SaaS" | "Fintech" | "eCommerce";
  imageUrl: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: "sc-1",
    title: "B2B Product Detail",
    client: "ENORM TECHNOLOGY",
    type: "WEB",
    category: "SaaS",
    imageUrl: "https://framerusercontent.com/images/f2TBOrrRIY5dcoWQ72exps1cHlo.jpg?width=3200&height=2400",
  },
  {
    id: "sc-2",
    title: "Web3 Reward System Component",
    client: "KEOM PROTOCOL",
    type: "WEB",
    category: "Web3",
    imageUrl: "https://framerusercontent.com/images/SvJuN95HnCUIYI9jnQM94YpDs.jpg?width=3200&height=2400",
  },
  {
    id: "sc-3",
    title: "B2B Landing Page Sections",
    client: "EFFICENSE",
    type: "WEB",
    category: "SaaS",
    imageUrl: "https://framerusercontent.com/images/vXAw0vDR2T0nBNxyGAT7m8yEDrs.jpg?width=3200&height=2400",
  },
  {
    id: "sc-4",
    title: "Autonomous AI Dispatching UI",
    client: "5U LOGISTICS",
    type: "AI & WEB",
    category: "AI",
    imageUrl: "https://framerusercontent.com/images/UmsGTar3Kym230FQvHG4LGFfnE.jpg?width=3200&height=2400",
  },
  {
    id: "sc-5",
    title: "Real-Time Cyber Security Radar",
    client: "SPEX DEFENSE",
    type: "PLATFORM",
    category: "SaaS",
    imageUrl: "https://framerusercontent.com/images/vmp26uS1fzAEOVbdH19mrf2bnw.jpg?width=3200&height=2400",
  },
  {
    id: "sc-6",
    title: "DeFi Cross-Chain Asset Swap",
    client: "GUARD PROTOCOL",
    type: "MOBILE",
    category: "Fintech",
    imageUrl: "https://framerusercontent.com/images/Nu0cRFLjMAItqhIVN0g649mMTM.jpg?width=3200&height=2400",
  },
  {
    id: "sc-7",
    title: "Gamified Onboarding Flow",
    client: "GIGCEP APP",
    type: "PRODUCT & MOBILE",
    category: "eCommerce",
    imageUrl: "https://framerusercontent.com/images/BChAdDd106KgPBNGpEuF9W1Px8.jpg?width=3200&height=2400",
  },
  {
    id: "sc-8",
    title: "Enterprise Pipeline Monitor",
    client: "CLOUDRIVER",
    type: "CLOUD WEB",
    category: "SaaS",
    imageUrl: "https://framerusercontent.com/images/glIJQjGjPLjFvclK2dzCQMcXXU.jpg?width=3200&height=2400",
  },
  {
    id: "sc-9",
    title: "Decentralized AI Agent Console",
    client: "MINDSPHERE",
    type: "AI & WEB3",
    category: "Web3",
    imageUrl: "https://framerusercontent.com/images/khoFnued04hLkd3MGQ5lafIfAbA.jpg?width=3200&height=2400",
  },
];

const categories = ["All (95)", "Web3", "AI", "SaaS", "Fintech", "eCommerce"] as const;

export default function ShowcasePage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);
  const [selectedCategory, setSelectedCategory] = useState<string>("All (95)");
  const [columnsCount, setColumnsCount] = useState<2 | 3>(3);

  const filteredItems = selectedCategory === "All (95)"
    ? showcaseItems
    : showcaseItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#04060A] text-white selection:bg-[#00E1BA] selection:text-neutral-950 flex flex-col font-sans">
      {/* Dark Navbar */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
      />

      {/* Main Showcase Hero & Feed */}
      <main className="w-full flex-1 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
          {/* Eyebrow & Title */}
          <div className="max-w-[760px] mx-auto text-center mb-10 sm:mb-14 select-none">
            <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-[var(--theme-accent)] mb-3">
              SHOWCASE
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.12]">
              {lang === "id" ? "Eksplorasi lebih dekat karya kami." : "A closer look at our craft."}
            </h1>

            <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed max-w-xl mx-auto font-normal">
              {lang === "id"
                ? "Koleksi antarmuka, interaksi, visual, dan eksperimen yang diciptakan untuk menjelajahi rasa dan potensi produk digital modern."
                : "A collection of interfaces, interactions, visuals and experiments created to explore what modern digital products can feel like."}
            </p>
          </div>

          {/* Filter Pills Bar & View Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 sm:mb-12 max-w-[880px] mx-auto">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-sm">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer select-none ${
                      isActive
                        ? "bg-[var(--theme-accent)] text-neutral-950 font-bold shadow-xs"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Layout Toggles */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10">
              <button
                type="button"
                onClick={() => setColumnsCount(3)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  columnsCount === 3 ? "bg-white/[0.12] text-white" : "text-neutral-500 hover:text-white"
                }`}
                title="3 Columns Grid"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setColumnsCount(2)}
                className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                  columnsCount === 2 ? "bg-white/[0.12] text-white" : "text-neutral-500 hover:text-white"
                }`}
                title="2 Columns Grid"
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Responsive Showcase Grid */}
          <div
            className={`grid gap-6 sm:gap-8 ${
              columnsCount === 3
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 md:grid-cols-2"
            }`}
          >
            {filteredItems.map((item) => (
              <article key={item.id} className="group flex flex-col cursor-pointer">
                {/* Visual Card Box */}
                <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 group-hover:border-[var(--theme-accent)]/50 transition-all duration-300">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized
                  />
                </div>

                {/* Typography below image */}
                <div className="mt-4 flex flex-col">
                  <h3 className="text-base sm:text-[17px] font-bold text-white tracking-tight group-hover:text-[var(--theme-accent)] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mt-1 font-semibold">
                    {item.client} • {item.type}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Integrated Contact Section (Per user request) */}
      <ContactSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Aurora Call To Action Banner */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Signature Dark Footer */}
      <Footer lang={lang} />
    </div>
  );
}
