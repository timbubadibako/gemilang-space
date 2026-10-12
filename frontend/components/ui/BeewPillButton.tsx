"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface BeewPillButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "fill-expand" | "outline" | "translucent";
  size?: "sm" | "md";
  className?: string;
  target?: string;
  rel?: string;
}

export function BeewPillButton({
  children,
  href,
  onClick,
  variant = "fill-expand",
  size = "md",
  className = "",
  target,
  rel,
}: BeewPillButtonProps) {
  const isSm = size === "sm";

  if (variant === "fill-expand") {
    // Pure rounded circle that smoothly elongates horizontally into a full pill on hover
    const heightClass = isSm ? "h-10" : "h-11 sm:h-12";
    const containerClasses = `relative inline-flex items-center select-none cursor-pointer rounded-full bg-[#E1E4EA] p-1 shadow-xs group overflow-hidden transition-all duration-300 ${heightClass} ${className}`;

    const content = (
      <>
        {/* Expanding Black Filler: Starts as pure circle (rounded-full) and smoothly stretches horizontally across */}
        <span
          className={`absolute left-1 top-1 bottom-1 bg-[#04060A] rounded-full transition-all duration-350 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0 ${
            isSm
              ? "w-8 group-hover:w-[calc(100%-8px)]"
              : "w-9 sm:w-10 group-hover:w-[calc(100%-8px)]"
          }`}
        />

        {/* Arrow Icon inside circular container */}
        <span
          className={`relative z-10 flex items-center justify-center text-white shrink-0 rounded-full transition-transform duration-300 ease-out group-hover:translate-x-0.5 ${
            isSm ? "w-8 h-8" : "w-9 h-9 sm:w-10 sm:h-10"
          }`}
        >
          <ArrowRight className={isSm ? "w-3.5 h-3.5" : "w-4 h-4"} />
        </span>

        {/* Text transitioning from black to white as the rounded filler expands */}
        <span
          className={`relative z-10 transition-colors duration-300 ease-out text-[#04060A] group-hover:text-white font-medium tracking-tight whitespace-nowrap ${
            isSm ? "text-xs sm:text-[13px] pl-2.5 pr-4" : "text-sm pl-3 pr-6"
          }`}
        >
          {children}
        </span>
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          className={containerClasses}
          target={target}
          rel={rel}
          onClick={onClick}
        >
          {content}
        </a>
      );
    }

    return (
      <button type="button" className={containerClasses} onClick={onClick}>
        {content}
      </button>
    );
  }

  if (variant === "outline") {
    const heightClass = isSm ? "h-10" : "h-11 sm:h-12";
    const containerClasses = `relative inline-flex items-center justify-center select-none cursor-pointer rounded-full bg-white hover:bg-[#F6F7F9] text-neutral-950 border border-[#D5D7DF] px-6 font-medium text-sm transition-all duration-200 shadow-2xs ${heightClass} ${className}`;

    if (href) {
      return (
        <a
          href={href}
          className={containerClasses}
          target={target}
          rel={rel}
          onClick={onClick}
        >
          <span>{children}</span>
        </a>
      );
    }

    return (
      <button type="button" className={containerClasses} onClick={onClick}>
        <span>{children}</span>
      </button>
    );
  }

  // Translucent (like 'Explore Design Club →' on cosmic card)
  const heightClass = isSm ? "h-10" : "h-11 sm:h-12";
  const containerClasses = `relative inline-flex items-center justify-between select-none cursor-pointer rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/35 px-5 text-xs sm:text-sm font-medium backdrop-blur-md transition-all duration-200 group w-full ${heightClass} ${className}`;

  const translucentContent = (
    <>
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={containerClasses}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {translucentContent}
      </a>
    );
  }

  return (
    <button type="button" className={containerClasses} onClick={onClick}>
      {translucentContent}
    </button>
  );
}
