"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, EyeOff } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TestimonialsSectionProps {
  lang: "id" | "en";
}

interface Testimonial {
  id: string;
  brand: string;
  badge?: string;
  quote: { id: string; en: string };
  author: string;
  role: string;
  avatarUrl?: string;
  initials?: string;
  coverImage?: string;
  brandColor?: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: "5u",
    brand: "5U AI",
    badge: "5U AI RAISES US $3.2M",
    quote: {
      id: "Eksekusi arsitektur dan sistem AI yang luar biasa cepat; Gemilang Space menjadi tulang punggung engineering kami sejak tahap awal pendanaan!",
      en: "Outstanding engineering execution and rapid AI architecture; Gemilang Space was the backbone of our early technical delivery!",
    },
    author: "Yagiz Abik",
    role: "Co-Founder / CEO @ 5U AI",
    coverImage: "https://framerusercontent.com/images/Q1nGlUmv7vVS6li66XKTFlMrIbk.png?width=1536&height=1536",
    avatarUrl: "https://framerusercontent.com/images/QBbUeJbAXuYKB99iyxgYpsdqbQ4.png?width=256",
  },
  {
    id: "metamask",
    brand: "Metamask / Consensys",
    quote: {
      id: "Engineer paling produktif dan presisi yang pernah bekerja dengan kami. Output kode sangat bersih, modular, dan selalu siap produksi skala besar. Pengalaman mendalam di Web3 dan sistem terdistribusi.",
      en: "The most prolific and disciplined engineers I know. Clean, modular code shipped directly to production at scale. Deep mastery of Web3 and distributed systems.",
    },
    author: "Michael Lwin",
    role: "Director of Product @ Metamask",
    avatarUrl: "https://framerusercontent.com/images/kY64WfLzLSmJd1nZ2Z1o0q.png?width=256",
    initials: "ML",
    brandColor: "bg-[#E2761B]",
  },
  {
    id: "uptech",
    brand: "Uptech",
    quote: {
      id: "Bekerja bersama squad Gemilang adalah pengalaman luar biasa. Komunikasi teknis sangat jernih, arsitektur microservices kokoh, dan integrasi API selalu tanpa hambatan. Serah terima kode rapi berstandar enterprise.",
      en: "Working with the Gemilang squad was a breath of fresh air. Crystal-clear technical communication, rock-solid microservices, and seamless API integrations throughout.",
    },
    author: "Oran Almog",
    role: "Lead Tech Specialist @ Uptech",
    initials: "O",
    brandColor: "bg-[#1E65FF]",
  },
  {
    id: "nda",
    brand: "Under NDA",
    quote: {
      id: "Keamanan tingkat perbankan, performa latensi ultra-rendah, dan dedikasi penuh. Squad inti mereka memimpin refactor seluruh arsitektur backend kami dalam hitungan minggu tanpa downtime sama sekali.",
      en: "Bank-grade security, ultra-low latency, and relentless dedication. Their core squad re-engineered our backend infrastructure in weeks with zero downtime.",
    },
    author: "Simon Watson",
    role: "COO @ Stealth FinTech",
    initials: "SW",
  },
  {
    id: "mention",
    brand: "Mention",
    quote: {
      id: "Kolaborasi engineering yang luar biasa! Setiap rilis milestone selalu tepat waktu, kode teruji otomatis, dan sistem mampu menahan lonjakan jutaan request real-time.",
      en: "Exceptional engineering collaboration! Every milestone delivered on time, thoroughly covered by tests, and scaled effortlessly to millions of real-time requests.",
    },
    author: "Jeenu Lee",
    role: "Co-Founder, CEO @ Mention",
    avatarUrl: "https://framerusercontent.com/images/9KxV0j4U7q91O0wP7e5sR.png?width=256",
    initials: "JL",
    brandColor: "bg-[#04060A]",
  },
  {
    id: "scania",
    brand: "Scania Group",
    quote: {
      id: "Kemampuan membedah alur operasional armada yang kompleks menjadi platform perangkat lunak yang andal, intuitif, dan responsif di lapangan sangat mengesankan.",
      en: "Their capacity to translate intricate fleet operations into high-performance, fault-tolerant enterprise software was second to none.",
    },
    author: "Nima Boustanian",
    role: "Product Manager @ Scania Group",
    initials: "NB",
    brandColor: "bg-[#041E42]",
  },
  {
    id: "keom",
    brand: "KEOM Protocol",
    quote: {
      id: "Pemahaman mendalam tentang smart contracts, keamanan konsensus, dan arsitektur data real-time. Performa aplikasi web tanpa lag pada transaksi finansial berkecepatan tinggi.",
      en: "Deep command of DeFi protocols and real-time event streaming. Delivered an ultra-fast, zero-lag platform under heavy transactional volume.",
    },
    author: "Hossam Saraya",
    role: "CTO @ KEOM Protocol",
    initials: "HS",
    brandColor: "bg-[#00E1BA]",
  },
  {
    id: "gizatech",
    brand: "Gizatech AG",
    quote: {
      id: "Partner IT ideal bagi startup AI. Pemahaman mendalam tentang pipeline data, deployment model, dan integrasi cloud yang efisien menghemat waktu riset kami berbulan-bulan.",
      en: "The ideal IT partner for AI systems. Fast model deployment pipelines and cost-efficient cloud engineering saved us months of R&D runway.",
    },
    author: "Jakub Warmuz",
    role: "AI Engineer @ Gizatech AG",
    avatarUrl: "https://framerusercontent.com/images/eQIZVxjuyQTy54O1JFMsLsd5380.png?width=256",
    initials: "JW",
    brandColor: "bg-[#5B21B6]",
  },
  {
    id: "caddi",
    brand: "Caddi",
    quote: {
      id: "Pengiriman kode berkaliber tinggi secara konsisten dengan alur kerja agile yang sangat efisien. Hasil kerjanya menjadi pondasi utama ekosistem teknologi kami.",
      en: "Consistent delivery of high-caliber software with a remarkably efficient engineering workflow. A true technical pillar for our product expansion.",
    },
    author: "Sujin Kingselin",
    role: "Founding Engineer @ Caddi",
    avatarUrl: "https://framerusercontent.com/images/fwFbmWItRkFtw0HyZdhrohpbwM.png?width=256",
    initials: "SK",
    brandColor: "bg-[#0D9488]",
  },
];

export function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollability = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScrollability();
    el.addEventListener("scroll", checkScrollability, { passive: true });
    window.addEventListener("resize", checkScrollability);
    return () => {
      el.removeEventListener("scroll", checkScrollability);
      window.removeEventListener("resize", checkScrollability);
    };
  }, []);

  // GSAP ScrollTrigger animation for section header and cards
  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Header fade up
      gsap.fromTo(
        ".testimonials-header",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Initial visible cards stagger
      const cards = scrollRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          Array.from(cards).slice(0, 4),
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: scrollRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [lang]);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 480;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="relative w-full bg-[#F4F4F6] text-neutral-950 py-20 sm:py-28 lg:py-32 z-30 transition-colors overflow-hidden"
    >
      {/* ============================================================== */}
      {/* 1. HEADER AREA                                                 */}
      {/* ============================================================== */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-7 lg:px-8">
        <div className="testimonials-header flex flex-col md:flex-row md:items-end justify-between gap-6 lg:gap-12">
          {/* Left: Eyebrow + Headline */}
          <div className="max-w-2xl">
            <p className="text-xs sm:text-[13px] font-mono font-medium tracking-[0.06em] text-neutral-400 uppercase">
              {lang === "id" ? "100% KEPUASAN KLIEN" : "100% SATISFACTION"}
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold tracking-[-0.04em] text-neutral-950 leading-[1.12] mt-3">
              {lang === "id" ? (
                <>
                  Kisah Dari Rekan Kerja
                  <br />
                  Yang Berkolaborasi Bersama Kami
                </>
              ) : (
                <>
                  Stories From People
                  <br />
                  We&apos;ve Built With
                </>
              )}
            </h2>
          </div>

          {/* Right: Subtitle */}
          <div className="max-w-md">
            <p className="text-neutral-600 text-xs sm:text-[14px] leading-relaxed font-normal">
              {lang === "id" ? (
                <>
                  Dari arsitektur backend, aplikasi mobile, hingga integrasi kecerdasan buatan, kami membantu tech leader membangun dan merilis software mission-critical dengan cepat.
                </>
              ) : (
                <>
                  From cloud architecture and mobile ecosystems to scalable AI pipelines, we empower tech leaders to engineer and deploy mission-critical software—fast.
                </>
              )}
            </p>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. CAROUSEL TRACK WITH MAGNETIC SNAP-TO-CENTER & FADE VIGNETTE */}
        {/* ============================================================== */}
        <div className="relative w-full mt-10 sm:mt-14 group">
          
          {/* Left Smooth Fade Vignette: Ultra-smooth multi-stop cubic gradient (matches #F4F4F6) */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-24 sm:w-36 lg:w-48 pointer-events-none z-20 transition-opacity duration-500 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(to right, #F4F4F6 0%, rgba(244,244,246,0.96) 20%, rgba(244,244,246,0.80) 45%, rgba(244,244,246,0.45) 70%, rgba(244,244,246,0.15) 88%, transparent 100%)",
            }}
          />

          {/* Right Smooth Fade Vignette: Ultra-smooth multi-stop cubic gradient (matches #F4F4F6) */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-24 sm:w-36 lg:w-48 pointer-events-none z-20 transition-opacity duration-500 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "linear-gradient(to left, #F4F4F6 0%, rgba(244,244,246,0.96) 20%, rgba(244,244,246,0.80) 45%, rgba(244,244,246,0.45) 70%, rgba(244,244,246,0.15) 88%, transparent 100%)",
            }}
          />

          {/* Floating Circular Arrow Control (Left - visible when scrolled) */}
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => handleScroll("left")}
              aria-label="Previous testimonial"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-black/35 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}

          {/* Floating Circular Arrow Control (Right - overlaid on top of cards) */}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => handleScroll("right")}
              aria-label="Next testimonial"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/20 hover:bg-black/35 backdrop-blur-md text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          )}

          {/* Scrollable Container with Magnetic Center Snap */}
          <div
            ref={scrollRef}
            className="flex items-stretch gap-3 sm:gap-3.5 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory scroll-smooth"
          >
          {testimonialsData.map((item) => {
            if (item.coverImage) {
              return (
                /* Card 1: 5U AI with Square Photo (Compact 4px padding frame) */
                <div
                  key={item.id}
                  className="snap-center shrink-0 w-[340px] sm:w-[760px] md:w-[820px] h-auto sm:h-[460px] rounded-xl bg-white border-0 p-1 flex flex-col sm:flex-row gap-2 select-none shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-transform duration-300"
                >
                  {/* Photo Inset with 4px margin & rounded-lg corners */}
                  <div className="relative w-full sm:w-[448px] h-[320px] sm:h-full rounded-lg overflow-hidden bg-neutral-900 shrink-0">
                    <Image
                      src={item.coverImage}
                      alt={item.brand}
                      fill
                      sizes="(max-width: 640px) 100vw, 448px"
                      className="object-cover object-center"
                      priority
                      unoptimized
                    />
                  </div>

                  {/* Right Content Column */}
                  <div className="flex flex-col justify-between flex-1 min-w-0 p-6 sm:p-7">
                    <div>
                      {/* Brand Header */}
                      <div className="flex items-center gap-2.5 mb-5">
                        <div className="w-6 h-6 rounded flex items-center justify-center font-black text-xs text-neutral-950 tracking-tighter">
                          5U
                        </div>
                        <span className="font-bold text-sm sm:text-base text-neutral-950 tracking-tight">
                          {item.brand}
                        </span>
                      </div>

                      {/* Quote */}
                      <p className="text-[13.5px] sm:text-[14.5px] text-neutral-800 leading-relaxed font-normal">
                        {item.quote[lang]}
                      </p>

                      {/* Badge */}
                      {item.badge && (
                        <div className="mt-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10.5px] font-mono font-bold bg-[#00E1BA]/15 text-[#008B7A]">
                            {item.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 pt-5 mt-4 border-t border-neutral-100">
                      {item.avatarUrl ? (
                        <div className="relative w-9 h-9 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                          <Image
                            src={item.avatarUrl}
                            alt={item.author}
                            fill
                            sizes="36px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold text-xs shrink-0">
                          {item.initials}
                        </div>
                      )}
                      <div className="truncate">
                        <p className="text-xs sm:text-[13px] font-bold text-neutral-950 leading-tight">
                          {item.author}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            /* Standard Cards 2-9: Pure White Box, No Border, 12px Rounded Corners */
            return (
              <div
                key={item.id}
                className="snap-center shrink-0 w-[300px] sm:w-[350px] md:w-[370px] h-[460px] rounded-xl bg-white border-0 p-7 sm:p-8 flex flex-col justify-between select-none shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-transform duration-300"
              >
                <div>
                  {/* Brand Header */}
                  <div className="flex items-center gap-2.5 mb-5">
                    {item.id === "nda" ? (
                      <EyeOff className="w-5 h-5 text-neutral-400 shrink-0" />
                    ) : item.id === "metamask" ? (
                      <div className="w-6 h-6 rounded-md bg-[#F6851B] flex items-center justify-center text-white text-[11px] font-black shrink-0">
                        🦊
                      </div>
                    ) : item.id === "uptech" ? (
                      <div className="w-6 h-6 rounded-md bg-[#1E65FF] flex items-center justify-center text-white text-xs font-black shrink-0">
                        U
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-md bg-neutral-950 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        {item.brand.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <span className="font-bold text-sm sm:text-base text-neutral-950 tracking-tight">
                      {item.brand}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-[13px] sm:text-[14px] text-neutral-800 leading-relaxed font-normal">
                    {item.quote[lang]}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-5 mt-4 border-t border-neutral-100">
                  {item.avatarUrl ? (
                    <div className="relative w-9 h-9 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                      <Image
                        src={item.avatarUrl}
                        alt={item.author}
                        fill
                        sizes="36px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ) : item.id === "uptech" ? (
                    <div className="w-9 h-9 rounded-full bg-[#C2410C] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      O
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-neutral-200 text-neutral-800 flex items-center justify-center font-bold text-xs shrink-0">
                      {item.initials || item.author.slice(0, 2)}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-xs sm:text-[13px] font-bold text-neutral-950 leading-tight">
                      {item.author}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  </section>
);
}
