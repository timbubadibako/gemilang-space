"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { GradientWave } from "@/components/ui/gradient-wave";

interface ServicesSectionProps {
  lang: "id" | "en";
}

interface ServiceItem {
  number: string;
  title: { id: string; en: string };
  col1: { id: string[]; en: string[] };
  col2: { id: string[]; en: string[] };
  description: { id: string; en: string };
}

const servicesData: ServiceItem[] = [
  {
    number: "01",
    title: {
      id: "Custom Software & Web Development",
      en: "Custom Software & Web Development",
    },
    col1: {
      id: ["Web App Enterprise", "Platform SaaS Skalabel", "Portal Internal & ERP"],
      en: ["Enterprise Web Apps", "Scalable SaaS Platforms", "Internal Portals & ERP"],
    },
    col2: {
      id: ["Full-Stack Next.js / Node", "API Gateway & Integrasi", "Modern Database Architecture"],
      en: ["Full-Stack Next.js / Node", "API Gateway & Integrations", "Modern Database Architecture"],
    },
    description: {
      id: "Kami merekayasa sistem software khusus dan aplikasi web berkinerja tinggi yang dirancang tangguh untuk kebutuhan bisnis unik Anda. Mulai dari sistem ERP kustom, SaaS multi-tenant, hingga portal data interaktif.",
      en: "We engineer custom high-performance software systems and web platforms designed to solve complex business operations. From custom enterprise ERPs and multi-tenant SaaS to mission-critical portals.",
    },
  },
  {
    number: "02",
    title: {
      id: "Mobile App Development",
      en: "Mobile App Development",
    },
    col1: {
      id: ["Aplikasi iOS & Android", "Cross-Platform (Flutter / React Native)", "Native Performance Optimization"],
      en: ["iOS & Android Apps", "Cross-Platform (Flutter / React Native)", "Native Performance Optimization"],
    },
    col2: {
      id: ["Offline-first Architecture", "Push Notification & Realtime", "App Store & Play Store Deployment"],
      en: ["Offline-first Architecture", "Push Notification & Realtime", "App Store & Play Store Deployment"],
    },
    description: {
      id: "Aplikasi mobile yang responsif, mulus, dan kaya fitur untuk pengguna consumer maupun operasional enterprise. Dibangun dengan kode bersih, arsitektur modular, dan integrasi backend tanpa celah.",
      en: "Fast, sleek, and feature-rich mobile applications for consumers and enterprise field operations. Engineered with clean architecture, offline synchronization, and seamless backend integration.",
    },
  },
  {
    number: "03",
    title: {
      id: "AI Solutions & Workflow Automation",
      en: "AI Solutions & Workflow Automation",
    },
    col1: {
      id: ["Integrasi LLM & Agentik AI", "Automasi Proses Bisnis (RPA)", "Custom RAG & Knowledge Base"],
      en: ["LLM & Agentic AI Integration", "Business Workflow Automation", "Custom RAG & Knowledge Bases"],
    },
    col2: {
      id: ["Computer Vision & OCR", "AI Assistant Internal", "Model Fine-tuning & Deployment"],
      en: ["Computer Vision & OCR", "Internal AI Assistants", "Model Fine-tuning & Deployment"],
    },
    description: {
      id: "Otomatisasi alur kerja manual dan integrasikan kecerdasan buatan terapan ke dalam operasional perusahaan. Kami membangun bot asisten cerdas, sistem dokumen berbasis RAG, dan otomasi alur data otomatis.",
      en: "Automate repetitive manual operations and integrate practical generative AI into your core business. We build intelligent agent assistants, enterprise RAG knowledge engines, and autonomous data pipelines.",
    },
  },
  {
    number: "04",
    title: {
      id: "Cloud, DevOps & Infrastructure",
      en: "Cloud, DevOps & Infrastructure",
    },
    col1: {
      id: ["Cloud Architecture (AWS / GCP / VPS)", "CI/CD Pipeline Otomatis", "Docker & Kubernetes Container"],
      en: ["Cloud Architecture (AWS / GCP / VPS)", "Automated CI/CD Pipelines", "Docker & Kubernetes Container"],
    },
    col2: {
      id: ["Supabase / Postgres Optimization", "Keamanan & OWASP Hardening", "Monitoring & 99.9% Uptime SLA"],
      en: ["Supabase / Postgres Optimization", "Security & OWASP Hardening", "Monitoring & 99.9% Uptime SLA"],
    },
    description: {
      id: "Fondasi server, cloud, dan arsitektur data yang aman, hemat biaya, dan mampu menahan lonjakan trafik tinggi. Otomasi deployment dari kode ke produksi dengan zero downtime.",
      en: "Robust, cost-efficient, and secure cloud infrastructure designed to sustain traffic spikes without downtime. Complete with automated deployment pipelines, proactive monitoring, and enterprise hardening.",
    },
  },
  {
    number: "05",
    title: {
      id: "IT Consulting & Tech Modernization",
      en: "IT Consulting & Tech Modernization",
    },
    col1: {
      id: ["Audit Kode & Keamanan Sistem", "Refactoring Legacy System", "Desain Arsitektur Solusi"],
      en: ["Code & Security Audits", "Legacy System Modernization", "Solution Architecture Design"],
    },
    col2: {
      id: ["Tech Stack Migration", "Rekomendasi Skalabilitas", "Technical Due Diligence"],
      en: ["Tech Stack Migration", "Scalability Roadmapping", "Technical Due Diligence"],
    },
    description: {
      id: "Bimbingan strategis bagi para pemimpin teknologi dan manajemen bisnis. Kami mengaudit kode lama, mendesain ulang arsitektur monolit ke modular mikro, dan menyusun roadmap digital terukur.",
      en: "Strategic engineering advisory for business and technical leaders. We audit legacy codebases, refactor monolithic architectures, ensure strict cybersecurity compliance, and map technical roadmaps.",
    },
  },
];

export function ServicesSection({ lang }: ServicesSectionProps) {
  // Default: Item 01 (index 0) is open as requested ("bawaannya nomor satu open bro")
  // Single expand rule: ("saat satu expand satunya close")
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    // If clicking the currently open item, close it; otherwise open this one and close all others
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="services"
      className="relative w-full bg-[#F4F4F6] text-neutral-950 py-16 sm:py-24 lg:py-28 z-30 transition-colors"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* ============================================================== */}
        {/* TOP BANNER: Living Dynamic GradientWave Card                   */}
        {/* ============================================================== */}
        <div className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-14 bg-[#090C15] text-white shadow-2xl border border-white/10 select-none">
          
          {/* Living WebGL Dynamic GradientWave synced with Gemilang palette */}
          <GradientWave
            colors={["#080C1E", "#16204B", "#1D4ED8", "#38BDF8", "#60A5FA", "#0284C7"]}
            shadowPower={4}
            noiseSpeed={0.00003}
            deform={{ incline: 0.4, noiseAmp: 260, noiseFlow: 4, noiseSpeed: 10 }}
            className="opacity-95 pointer-events-none"
          />

          {/* Ambient Dark Gradient Vignette for crisp text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/85 via-black/35 to-transparent pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-12">
            {/* Left: Eyebrow + Headline */}
            <div className="max-w-xl">
              <p className="text-xs sm:text-[13px] font-mono font-semibold tracking-[0.08em] text-[#CAD0DC] uppercase">
                {lang === "id" ? "LAYANAN IT REKAYASA" : "IT ENGINEERING SERVICES"}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold tracking-[-0.04em] text-white leading-[1.12] mt-3">
                {lang === "id"
                  ? "Solusi teknologi komprehensif untuk membangun dan mengembangkan produk."
                  : "Comprehensive technology solutions to engineer and scale your product."}
              </h2>
            </div>

            {/* Right: Complementary Subtext */}
            <div className="text-neutral-300 text-xs sm:text-[13.5px] leading-relaxed max-w-xs font-normal pb-1">
              <p>
                {lang === "id" ? (
                  <>
                    Anda tentukan visi dan target bisnis.
                    <br />
                    Kami hadirkan arsitektur, rekayasa kode, dan deployment tanpa cela.
                  </>
                ) : (
                  <>
                    You define the business roadmap.
                    <br />
                    We deliver the architecture, clean code, and robust deployment.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SERVICES ACCORDION LIST                                       */}
        {/* ============================================================== */}
        <div className="mt-10 sm:mt-14 divide-y divide-neutral-300/80 border-t border-b border-neutral-300/80">
          {servicesData.map((service, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={service.number}
                className="w-full transition-colors duration-200"
              >
                {/* Accordion Row Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-7 sm:py-9 flex items-center justify-between text-left cursor-pointer group select-none transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8 flex-1 min-w-0 pr-4">
                    {/* Service Number (01, 02, etc.) */}
                    <span className="font-mono text-xs sm:text-sm font-semibold text-neutral-400 w-8 sm:w-12 shrink-0 transition-colors group-hover:text-neutral-900">
                      {service.number}
                    </span>

                    {/* Service Title */}
                    <h3 className="text-2xl sm:text-4xl lg:text-[40px] font-bold tracking-[-0.035em] text-neutral-950 transition-colors group-hover:text-neutral-700 truncate">
                      {service.title[lang]}
                    </h3>
                  </div>

                  {/* Plus / Minus Toggle Icon */}
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center shrink-0 text-neutral-900">
                    <Plus
                      className={`w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isOpen ? "rotate-45 text-[#335CFF]" : "group-hover:scale-110"
                      }`}
                    />
                  </div>
                </button>

                {/* Accordion Content (Smooth height transition) */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-8 sm:pb-10"
                      : "grid-rows-[0fr] opacity-0 pb-0 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* Aligned under the title, offset past the number */}
                    <div className="pl-12 sm:pl-20 pr-4 sm:pr-8 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 pt-1">
                      
                      {/* Sub-offerings: Column 1 */}
                      <div className="md:col-span-3 flex flex-col gap-2">
                        {service.col1[lang].map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs sm:text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Sub-offerings: Column 2 */}
                      <div className="md:col-span-3 flex flex-col gap-2">
                        {service.col2[lang].map((item, idx) => (
                          <span
                            key={idx}
                            className="text-xs sm:text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      {/* Detailed Description: Column 3 */}
                      <div className="md:col-span-6">
                        <p className="text-xs sm:text-[13.5px] leading-relaxed text-neutral-600 font-normal max-w-xl">
                          {service.description[lang]}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
