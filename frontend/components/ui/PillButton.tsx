"use client";

import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface PillButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "translucent" | "pill-cta";
  arrowType?: "right" | "up-right";
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

export function PillButton({
  children,
  variant = "primary",
  arrowType = "right",
  href,
  onClick,
  className = "",
  target,
  rel,
}: PillButtonProps) {
  const ArrowIcon = arrowType === "up-right" ? ArrowUpRight : ArrowRight;

  const baseClasses =
    "inline-flex items-center justify-center font-medium text-sm transition-all duration-300 select-none group cursor-pointer";

  let variantClasses = "";
  let iconContainer = null;

  switch (variant) {
    case "primary":
      // Dark pill with left square icon box (like 'Contact now')
      variantClasses =
        "bg-[#111318] hover:bg-[#04060A] text-white pl-2 pr-6 py-2.5 rounded-full shadow-sm hover:shadow-md border border-white/5";
      iconContainer = (
        <span className="w-7 h-7 rounded-[10px] bg-[#22262F] group-hover:bg-[#2C313C] flex items-center justify-center mr-3 transition-transform group-hover:scale-105">
          <ArrowIcon className="w-3.5 h-3.5 text-white" />
        </span>
      );
      break;

    case "secondary":
      // White pill with subtle border (like 'Works')
      variantClasses =
        "bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200/90 px-6 py-2.5 rounded-full shadow-2xs hover:border-neutral-300";
      break;

    case "translucent":
      // Frosted / outline pill with right arrow (like 'Explore Design Club →')
      variantClasses =
        "bg-white/10 hover:bg-white/15 text-white border border-white/20 px-6 py-3 rounded-full justify-between backdrop-blur-md";
      break;

    case "pill-cta":
      // White pill with left black square icon box (like 'Let's Talk' in Navbar)
      variantClasses =
        "bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-semibold pl-1.5 pr-4 py-1.5 rounded-full shadow-sm hover:shadow hover:scale-[1.02]";
      iconContainer = (
        <span className="w-6 h-6 rounded-[8px] bg-black text-white flex items-center justify-center mr-2.5 transition-transform group-hover:scale-105">
          <ArrowIcon className="w-3.5 h-3.5" />
        </span>
      );
      break;
  }

  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses} target={target} rel={rel} onClick={onClick}>
        {iconContainer}
        <span>{children}</span>
        {variant === "translucent" && (
          <ArrowIcon className="w-4 h-4 ml-3 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        )}
      </a>
    );
  }

  return (
    <button type="button" className={combinedClasses} onClick={onClick}>
      {iconContainer}
      <span>{children}</span>
      {variant === "translucent" && (
        <ArrowIcon className="w-4 h-4 ml-3 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
      )}
    </button>
  );
}
