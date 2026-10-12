"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface PromiseSectionProps {
  lang: "id" | "en";
}

const copyData = {
  en: {
    line1: "Think of us as",
    highlight: "your senior design team.",
    line2: "Without hiring one.",
    sub1: "You bring the priorities.",
    sub2: "We bring the thinking, craft and execution.",
  },
  id: {
    line1: "Anggap kami sebagai",
    highlight: "tim rekayasa & desain senior Anda.",
    line2: "Tanpa repot merekrut.",
    sub1: "Anda tentukan prioritas bisnis.",
    sub2: "Kami hadirkan pemikiran, keahlian teknis, dan eksekusi.",
  },
};

export function PromiseSection({ lang }: PromiseSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentCopy = copyData[lang] || copyData.en;

  useEffect(() => {
    // Register GSAP ScrollTrigger safely inside client lifecycle
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const headlineChars = containerRef.current?.querySelectorAll(".promise-headline-char");
      const subtitleChars = containerRef.current?.querySelectorAll(".promise-sub-char");

      if (!headlineChars || headlineChars.length === 0) return;

      // Responsive scrub trigger: starts immediately as the section scrolls into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%", // Starts immediately when top of 50vh section enters lower screen
          end: "center 45%", // Fully revealed by the time the section reaches center viewport
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });

      // Step 1: Reveal headline character-by-character from blurry silhouette to crisp white & blue
      tl.to(headlineChars, {
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.02,
        ease: "power1.out",
      });

      // Step 2: Reveal subtitle smoothly right after
      if (subtitleChars && subtitleChars.length > 0) {
        tl.to(
          subtitleChars,
          {
            opacity: 0.85,
            filter: "blur(0px)",
            stagger: 0.012,
            ease: "power1.out",
          },
          "-=0.1"
        );
      }
    }, sectionRef);

    // Refresh ScrollTrigger after DOM & layout calculations settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [lang]);

  // Helper to split text into words and individual characters with initial dark blur style
  const renderChars = (
    text: string,
    isHighlight = false,
    className = "promise-headline-char"
  ) => {
    const words = text.trim().split(/\s+/);
    return words.map((word, wIdx) => (
      <span
        key={`w-${word}-${wIdx}`}
        className="inline-block whitespace-nowrap mr-[0.25em] select-none"
      >
        {word.split("").map((char, cIdx) => (
          <span
            key={`c-${char}-${cIdx}`}
            className={`${className} inline-block will-change-[opacity,filter] ${
              isHighlight ? "text-[#335CFF]" : "text-white"
            }`}
            style={{
              opacity: 0.12,
              filter: "blur(8px)",
            }}
          >
            {char}
          </span>
        ))}
      </span>
    ));
  };

  return (
    <section
      id="promise"
      ref={sectionRef}
      className="relative w-full h-[50vh] min-h-[380px] max-h-[620px] bg-[#04060A] text-white flex items-center justify-center px-6 sm:px-8 overflow-hidden z-30 my-8 sm:my-12"
    >
      {/* Subtle ambient glow in center matching Beew deep space background */}
      <div className="absolute w-[450px] h-[260px] bg-[#335CFF]/10 blur-[130px] rounded-full pointer-events-none -z-0" />

      <div
        ref={containerRef}
        className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center justify-center"
      >
        {/* Giant Headline: Character-by-character GSAP ScrollTrigger Scrub Reveal */}
        <h2 className="text-3xl sm:text-5xl lg:text-[48px] xl:text-[52px] font-semibold tracking-[-0.04em] leading-[1.2] text-center font-sans">
          <div className="block">
            {renderChars(currentCopy.line1, false)}
          </div>
          <div className="block mt-1 sm:mt-2">
            {renderChars(currentCopy.highlight, true)}
          </div>
          <div className="block mt-1 sm:mt-2">
            {renderChars(currentCopy.line2, false)}
          </div>
        </h2>

        {/* Subtitle: Revealed sequentially below headline */}
        <p className="mt-6 sm:mt-9 text-sm sm:text-base lg:text-lg text-neutral-400 font-normal tracking-tight leading-relaxed max-w-xl mx-auto text-center font-sans">
          <span className="block">
            {renderChars(currentCopy.sub1, false, "promise-sub-char")}
          </span>
          <span className="block mt-1">
            {renderChars(currentCopy.sub2, false, "promise-sub-char")}
          </span>
        </p>
      </div>
    </section>
  );
}
