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
    category: "E-Commerce & Inventori",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-2",
    title: "David Beckham POS & Kasir Toko",
    category: "POS Kasir & Barcode",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-3",
    title: "Portal Desa Digital & Surat Online",
    category: "Civic Tech & GovTech",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-4",
    title: "Lari App GPS & Leaderboard",
    category: "Mobile & Geospatial",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-5",
    title: "Kopi Nusantara Web & WhatsApp Order",
    category: "Starter Toko Online",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-6",
    title: "Sistem Logistik & Stock Ledger",
    category: "Enterprise System",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "p-7",
    title: "Gigcep Mobile App Landing",
    category: "Product & Mobile",
    imageUrl: "https://framerusercontent.com/images/BChAdDd106KgPBNGpEuF9W1Px8.jpg?width=3200&height=2400",
  },
  {
    id: "p-8",
    title: "Efficense B2B Analytics Platform",
    category: "Enterprise SaaS",
    imageUrl: "https://framerusercontent.com/images/vXAw0vDR2T0nBNxyGAT7m8yEDrs.jpg?width=3200&height=2400",
  },
  {
    id: "p-9",
    title: "Fintech App Design",
    category: "Fintech & Banking",
    imageUrl: "https://framerusercontent.com/images/yq2Mu1o7zAjv11WGoPwg9Dsjc8.jpg?width=3200&height=2400",
  },
  {
    id: "p-10",
    title: "Dryking Analytics Dashboard",
    category: "Enterprise System",
    imageUrl: "https://framerusercontent.com/images/khoFnued04hLkd3MGQ5lafIfAbA.jpg?width=3200&height=2400",
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
