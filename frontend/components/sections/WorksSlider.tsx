"use client";

import React from "react";
import Image from "next/image";
import { useCMS } from "@/lib/cms-context";

export interface ProjectCard {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const defaultProjects: ProjectCard[] = [
  {
    id: "p-1",
    title: "Fermion Roastery E-Commerce & Stok",
    category: "E-Commerce & Specialty Coffee",
    imageUrl: "/images/portfolio/fermion-screen.png",
  },
  {
    id: "p-2",
    title: "Desa Kadurama Portal & Layanan Surat",
    category: "GovTech & Pelayanan Warga",
    imageUrl: "/images/portfolio/desa.png",
  },
  {
    id: "p-3",
    title: "Green Cycle ERP & Multi-Gudang",
    category: "Enterprise ERP & Logistik",
    imageUrl: "/images/portfolio/gc.png",
  },
  {
    id: "p-4",
    title: "AHASS AS Putra Rahmat Honda",
    category: "Katalog Part & Booking Servis",
    imageUrl: "/images/portfolio/asputra-dealer.png",
  },
  {
    id: "p-5",
    title: "Fourjective Creative Studio",
    category: "Creative Agency • Dalam Pengerjaan",
    imageUrl: "/images/portfolio/fermion-og.jpg",
  },
  {
    id: "p-6",
    title: "Qiyar Media Production Platform",
    category: "Media Production • Dalam Pengerjaan",
    imageUrl: "/images/portfolio/kadurama-og.png",
  },
  {
    id: "p-7",
    title: "Pesantren OS & Murajaah Voice AI",
    category: "EdTech & Voice AI • Dalam Pengerjaan",
    imageUrl: "/crafted-poster.png",
  },
];

interface WorksSliderProps {
  projects?: ProjectCard[];
}

export function WorksSlider({ projects }: WorksSliderProps) {
  const { cms } = useCMS();
  const displayProjects = projects || (cms.worksSlider && cms.worksSlider.length > 0 ? cms.worksSlider : defaultProjects);
  return (
    <div id="works" className="relative w-full overflow-hidden py-3 sm:py-5 bg-[#04060A]">
      {/* 
        Container synchronized 1:1 with Navbar & Hero Section:
        - Exact same max-w-[1440px] and px-5 sm:px-7 lg:px-8
        - Outside this width, everything is 100% solid pitch black (#04060A) "gelap mutlak"
        - The shadow gradient starts right at the outer edge of the hero cards and fades inward
      */}
      <div className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        
        {/* Marquee Viewport: Clipped to exact hero width */}
        <div className="relative overflow-hidden w-full">
          
          {/* Left Shadow Gradient: Ultra smooth multi-stop cubic fade */}
          <div
            className="absolute top-0 bottom-0 left-0 w-28 sm:w-44 lg:w-60 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(to right, #04060A 0%, rgba(4,6,10,0.95) 20%, rgba(4,6,10,0.75) 45%, rgba(4,6,10,0.4) 70%, rgba(4,6,10,0.1) 88%, transparent 100%)",
            }}
          />

          {/* Right Shadow Gradient: Ultra smooth multi-stop cubic fade */}
          <div
            className="absolute top-0 bottom-0 right-0 w-28 sm:w-44 lg:w-60 pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(to left, #04060A 0%, rgba(4,6,10,0.95) 20%, rgba(4,6,10,0.75) 45%, rgba(4,6,10,0.4) 70%, rgba(4,6,10,0.1) 88%, transparent 100%)",
            }}
          />

          {/* Infinite Running Marquee Track */}
          <div className="animate-marquee gap-4 sm:gap-5 items-center py-2">
            {/* Double list for smooth seamless infinite loop */}
            {[...displayProjects, ...displayProjects].map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="relative w-[300px] sm:w-[380px] lg:w-[400px] h-[200px] sm:h-[240px] lg:h-[260px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#0D1017] border border-white/10 group flex-shrink-0 cursor-pointer shadow-xl"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 300px, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />

                {/* Hover Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-white font-semibold text-sm sm:text-base tracking-tight">
                    {item.title}
                  </span>
                  <span className="text-neutral-300 text-xs mt-0.5 font-mono">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
