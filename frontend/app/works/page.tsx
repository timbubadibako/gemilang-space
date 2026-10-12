"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactSection } from "@/components/sections/ContactSection";
import { CallToActionSection } from "@/components/sections/CallToActionSection";
import { navItems, siteSettings } from "@/data/site-content";

interface WorkProject {
  id: string;
  client: string;
  title: {
    id: string;
    en: string;
  };
  tags: string[];
  imageUrl: string;
  slug: string;
}

const workProjects: WorkProject[] = [
  {
    id: "5u-ai",
    client: "5U AI",
    title: {
      id: "Platform Tenaga Kerja AI untuk Industri Kargo & Logistik",
      en: "AI Workforce Platform Built for Freight Teams",
    },
    tags: ["SAAS / B2B", "AI WORKFORCE"],
    imageUrl: "https://framerusercontent.com/images/UmsGTar3Kym230FQvHG4LGFfnE.jpg?width=3200&height=2400",
    slug: "5u-ai",
  },
  {
    id: "gigcep",
    client: "Gigcep",
    title: {
      id: "Aplikasi Mobile Reward & Pengalaman Onboarding Interaktif",
      en: "Reward Winning Mobile Experience & Onboarding Flow",
    },
    tags: ["PRODUCT DESIGN", "MOBILE APP"],
    imageUrl: "https://framerusercontent.com/images/BChAdDd106KgPBNGpEuF9W1Px8.jpg?width=3200&height=2400",
    slug: "gigcep",
  },
  {
    id: "crypto-trading",
    client: "Guard Platform",
    title: {
      id: "Desain Aplikasi Mobile Platform Perdagangan Kripto",
      en: "Crypto Trading Platform Mobile App Design",
    },
    tags: ["CRYPTO APP", "FINTECH APP"],
    imageUrl: "https://framerusercontent.com/images/SvJuN95HnCUIYI9jnQM94YpDs.jpg?width=3200&height=2400",
    slug: "crypto-trading-platform",
  },
  {
    id: "spex",
    client: "Spex Security",
    title: {
      id: "Arsitektur Cyber Security & Dashboard Pertahanan Realtime",
      en: "Cyber Security Architecture & Realtime Defense Dashboard",
    },
    tags: ["SECURITY PLATFORM", "ENTERPRISE"],
    imageUrl: "https://framerusercontent.com/images/vmp26uS1fzAEOVbdH19mrf2bnw.jpg?width=3200&height=2400",
    slug: "spex-security",
  },
  {
    id: "guard-wallet",
    client: "Guard Wallet",
    title: {
      id: "Vault Aset Digital Desentralisasi Generasi Baru",
      en: "Decentralized Next-Gen Digital Asset Vault",
    },
    tags: ["WEB3", "FINTECH APP"],
    imageUrl: "https://framerusercontent.com/images/Nu0cRFLjMAItqhIVN0g649mMTM.jpg?width=3200&height=2400",
    slug: "guard-wallet",
  },
  {
    id: "efficense",
    client: "Efficense",
    title: {
      id: "Optimasi Kinerja IT & Platform Analitik Enterprise",
      en: "IT Performance Optimization & Enterprise Analytics",
    },
    tags: ["B2B SAAS", "DASHBOARD DESIGN"],
    imageUrl: "https://framerusercontent.com/images/vXAw0vDR2T0nBNxyGAT7m8yEDrs.jpg?width=3200&height=2400",
    slug: "efficense",
  },
  {
    id: "enorm",
    client: "Enorm Studio",
    title: {
      id: "Mesin Pertumbuhan & Sistem Pengalaman Pemasaran SaaS",
      en: "Growth Engine & Marketing Experience System",
    },
    tags: ["SAAS & FRAMER", "DESIGN SYSTEM"],
    imageUrl: "https://framerusercontent.com/images/f2TBOrrRIY5dcoWQ72exps1cHlo.jpg?width=3200&height=2400",
    slug: "enorm",
  },
  {
    id: "cloudriver",
    client: "Cloudriver",
    title: {
      id: "Infrastruktur Pipeline Data Cloud & Arsitektur Global",
      en: "Cloud Data Pipelines & Global Infrastructure",
    },
    tags: ["WEB ARCHITECTURE", "CLOUD PLATFORM"],
    imageUrl: "https://framerusercontent.com/images/glIJQjGjPLjFvclK2dzCQMcXXU.jpg?width=3200&height=2400",
    slug: "cloudriver",
  },
];

export default function WorksPage() {
  const [lang, setLang] = useState<"id" | "en">(siteSettings.defaultLanguage);

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-neutral-900 selection:bg-[#335CFF] selection:text-white flex flex-col font-sans">
      {/* Light-Themed Navbar matching Beew Studio */}
      <Navbar
        navItems={navItems}
        currentLang={lang}
        onLangChange={setLang}
        whatsappNumber={siteSettings.whatsappNumber}
        theme="light"
      />

      {/* Main Selected Works Gallery */}
      <main className="w-full flex-1 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
          {/* Eyebrow & Title (1:1 with Screenshot 0) */}
          <div className="max-w-[780px] mx-auto text-center mb-14 sm:mb-20 select-none">
            <div className="text-xs font-mono font-semibold uppercase tracking-[0.25em] text-neutral-400 mb-3">
              SELECTED WORKS
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold text-neutral-950 tracking-tight leading-[1.12]">
              {lang === "id"
                ? "Desain yang menggerakkan produk lebih maju."
                : "Design that moves products forward."}
            </h1>

            <p className="text-sm sm:text-[15px] text-neutral-600 mt-4 leading-relaxed max-w-xl mx-auto font-normal">
              {lang === "id"
                ? "Koleksi produk, website, dan pengalaman brand yang kami rancang untuk startup dan tim ambisius di seluruh dunia."
                : "A collection of products, websites and brand experiences we've designed for startups and ambitious teams around the world."}
            </p>
          </div>

          {/* 2-Column Works Showcase Grid (1:1 with Screenshot 0 & 1) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {workProjects.map((project) => (
              <article key={project.id} className="group flex flex-col">
                {/* Visual Image Preview Box with sleek corner radius */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#F2F3F5] border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500">
                  <Image
                    src={project.imageUrl}
                    alt={project.title[lang]}
                    fill
                    className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  
                  {/* Subtle top-right hover arrow icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 text-neutral-800" />
                  </div>
                </div>

                {/* Project Metadata below card (1:1 with Screenshot 1) */}
                <div className="mt-5 sm:mt-6 flex flex-col">
                  {/* Category Pill Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-2.5">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#F0F0F2] text-neutral-700 border border-neutral-200/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Project Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight group-hover:text-[#335CFF] transition-colors leading-snug">
                    {project.title[lang]}
                  </h2>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      {/* Integrated Contact Section (Directly follows works, exactly as requested) */}
      <ContactSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Aurora Call To Action Banner */}
      <CallToActionSection lang={lang} whatsappNumber={siteSettings.whatsappNumber} />

      {/* Signature Dark Footer */}
      <Footer lang={lang} />
    </div>
  );
}
