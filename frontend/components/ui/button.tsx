"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export type ButtonVariant = "expand" | "outline" | "translucent" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "expand",
  size = "md",
  href,
  target,
  rel,
  icon,
  fullWidth = false,
  className = "",
  onClick,
  ...props
}: ButtonProps) {
  const isSm = size === "sm";
  const isLg = size === "lg";

  // Signature Fill-Expand Button: icon circle smoothly stretches horizontally across on hover
  if (variant === "expand") {
    const heightClass = isSm ? "h-10" : isLg ? "h-13" : "h-11 sm:h-12";
    const widthClass = fullWidth ? "w-full justify-between" : "";
    const containerClasses = `relative inline-flex items-center select-none cursor-pointer rounded-full bg-[#E1E4EA] p-1 shadow-xs group/btn overflow-hidden transition-all duration-300 ${heightClass} ${widthClass} ${className}`;

    const innerContent = (
      <>
        {/* Expanding Dark Filler from left to right */}
        <span
          className={`absolute left-1 top-1 bottom-1 bg-[#04060A] rounded-full transition-all duration-350 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0 ${
            isSm
              ? "w-8 group-hover/btn:w-[calc(100%-8px)]"
              : isLg
              ? "w-11 group-hover/btn:w-[calc(100%-8px)]"
              : "w-9 sm:w-10 group-hover/btn:w-[calc(100%-8px)]"
          }`}
        />

        {/* Circular Icon Container */}
        <span
          className={`relative z-10 flex items-center justify-center text-white shrink-0 rounded-full transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 ${
            isSm ? "w-8 h-8" : isLg ? "w-11 h-11" : "w-9 h-9 sm:w-10 sm:h-10"
          }`}
        >
          {icon ?? <ArrowRight className={isSm ? "w-3.5 h-3.5" : isLg ? "w-5 h-5" : "w-4 h-4"} />}
        </span>

        {/* Label transitioning color */}
        <span
          className={`relative z-10 transition-colors duration-300 ease-out text-[#04060A] group-hover/btn:text-white font-medium tracking-tight whitespace-nowrap ${
            isSm
              ? "text-xs sm:text-[13px] pl-2.5 pr-4"
              : isLg
              ? "text-base pl-3.5 pr-7"
              : "text-sm pl-3 pr-6"
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
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <button type="button" className={containerClasses} onClick={onClick} {...props}>
        {innerContent}
      </button>
    );
  }

  // Outline Pill Button
  if (variant === "outline") {
    const heightClass = isSm ? "h-10 px-4 text-xs sm:text-[13px]" : isLg ? "h-13 px-7 text-base" : "h-11 sm:h-12 px-6 text-sm";
    const widthClass = fullWidth ? "w-full" : "";
    const containerClasses = `relative inline-flex items-center justify-center select-none cursor-pointer rounded-full bg-white hover:bg-[#F6F7F9] text-neutral-950 border border-[#D5D7DF] font-medium transition-all duration-200 shadow-2xs ${heightClass} ${widthClass} ${className}`;

    if (href) {
      return (
        <a
          href={href}
          className={containerClasses}
          target={target}
          rel={rel}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          <span>{children}</span>
        </a>
      );
    }

    return (
      <button type="button" className={containerClasses} onClick={onClick} {...props}>
        <span>{children}</span>
      </button>
    );
  }

  // Translucent Glass Pill (with signature expand animation for dark surfaces)
  if (variant === "translucent") {
    const heightClass = isSm ? "h-10" : isLg ? "h-13" : "h-11 sm:h-12";
    const widthClass = fullWidth ? "w-full justify-between" : "";
    const containerClasses = `relative inline-flex items-center select-none cursor-pointer rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/35 font-medium backdrop-blur-md overflow-hidden transition-all duration-300 p-1 group/btn shadow-xs ${heightClass} ${widthClass} ${className}`;

    const innerContent = (
      <>
        {/* Expanding Glass / White Filler from left to right */}
        <span
          className={`absolute left-1 top-1 bottom-1 bg-white rounded-full transition-all duration-350 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0 ${
            isSm
              ? "w-8 group-hover/btn:w-[calc(100%-8px)]"
              : isLg
              ? "w-11 group-hover/btn:w-[calc(100%-8px)]"
              : "w-9 sm:w-10 group-hover/btn:w-[calc(100%-8px)]"
          }`}
        />

        {/* Circular Icon Container */}
        <span
          className={`relative z-10 flex items-center justify-center text-neutral-950 bg-white group-hover/btn:bg-transparent shrink-0 rounded-full transition-all duration-300 ease-out group-hover/btn:translate-x-0.5 ${
            isSm ? "w-8 h-8" : isLg ? "w-11 h-11" : "w-9 h-9 sm:w-10 sm:h-10"
          }`}
        >
          {icon ?? <ArrowRight className={isSm ? "w-3.5 h-3.5" : isLg ? "w-5 h-5" : "w-4 h-4"} />}
        </span>

        {/* Label transitioning color */}
        <span
          className={`relative z-10 transition-colors duration-300 ease-out text-white group-hover/btn:text-neutral-950 font-medium tracking-tight whitespace-nowrap ${
            isSm
              ? "text-xs sm:text-[13px] pl-2.5 pr-4"
              : isLg
              ? "text-base pl-3.5 pr-7"
              : "text-sm pl-3 pr-6"
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
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {innerContent}
        </a>
      );
    }

    return (
      <button type="button" className={containerClasses} onClick={onClick} {...props}>
        {innerContent}
      </button>
    );
  }

  // Ghost Button
  const heightClass = isSm ? "h-9 px-3 text-xs" : "h-10 px-4 text-sm";
  const containerClasses = `inline-flex items-center justify-center rounded-full text-neutral-600 hover:text-neutral-950 hover:bg-black/5 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors ${heightClass} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={containerClasses}
        target={target}
        rel={rel}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type="button" className={containerClasses} onClick={onClick} {...props}>
      <span>{children}</span>
    </button>
  );
}
