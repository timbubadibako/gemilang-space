"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export type ButtonVariant =
  | "expand"
  | "expand-primary"
  | "translucent"
  | "primary"
  | "dark"
  | "light"
  | "glass"
  | "outline"
  | "ghost";

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

  // ---------------------------------------------------------------------------
  // A. SIGNATURE EXPAND VARIANTS (With Stretching Pill Circle Animation)
  // ---------------------------------------------------------------------------

  // 1. Signature Expand Light (Abu terang -> fill hitam meregang)
  if (variant === "expand") {
    const heightClass = isSm ? "h-10" : isLg ? "h-13" : "h-11 sm:h-12";
    const widthClass = fullWidth ? "w-full" : "";
    const containerClasses = `relative inline-flex items-center select-none cursor-pointer rounded-full bg-[#E1E4EA] p-1 shadow-xs group/btn overflow-hidden transition-all duration-300 ${heightClass} ${widthClass} ${className}`;

    const innerContent = (
      <>
        <span
          className={`absolute left-1 top-1 bottom-1 bg-[#04060A] rounded-full transition-all duration-350 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0 ${
            isSm
              ? "w-8 group-hover/btn:w-[calc(100%-8px)]"
              : isLg
              ? "w-11 group-hover/btn:w-[calc(100%-8px)]"
              : "w-9 sm:w-10 group-hover/btn:w-[calc(100%-8px)]"
          }`}
        />
        <span
          className={`relative z-10 flex items-center justify-center text-white shrink-0 rounded-full transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 ${
            isSm ? "w-8 h-8" : isLg ? "w-11 h-11" : "w-9 h-9 sm:w-10 sm:h-10"
          }`}
        >
          {icon ?? <ArrowRight className={isSm ? "w-3.5 h-3.5" : isLg ? "w-5 h-5" : "w-4 h-4"} />}
        </span>
        <span
          className={`relative z-10 transition-colors duration-300 ease-out text-[#04060A] group-hover/btn:text-white font-medium tracking-tight whitespace-nowrap ${
            fullWidth ? "flex-1 text-center pr-8 sm:pr-10" : ""
          } ${
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
        <a href={href} className={containerClasses} target={target} rel={rel} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
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

  // 2. Signature Expand Primary (Neon Glassy meregang)
  if (variant === "expand-primary") {
    const heightClass = isSm ? "h-10" : isLg ? "h-13" : "h-11 sm:h-12";
    const widthClass = fullWidth ? "w-full" : "";
    const containerClasses = `relative inline-flex items-center select-none cursor-pointer rounded-full backdrop-blur-md bg-[var(--theme-accent)]/15 hover:bg-[var(--theme-accent)]/25 border border-[var(--theme-accent)]/40 hover:border-[var(--theme-accent)]/70 p-1 shadow-lg shadow-[var(--theme-accent-glow)] group/btn overflow-hidden transition-all duration-300 ${heightClass} ${widthClass} ${className}`;

    const innerContent = (
      <>
        <span
          className={`absolute left-1 top-1 bottom-1 rounded-full transition-all duration-350 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0 ${
            isSm
              ? "w-8 group-hover/btn:w-[calc(100%-8px)]"
              : isLg
              ? "w-11 group-hover/btn:w-[calc(100%-8px)]"
              : "w-9 sm:w-10 group-hover/btn:w-[calc(100%-8px)]"
          }`}
          style={{ backgroundColor: "var(--theme-accent)" }}
        />
        <span
          className={`relative z-10 flex items-center justify-center shrink-0 rounded-full transition-transform duration-300 ease-out group-hover/btn:translate-x-0.5 text-[var(--theme-accent-text)] ${
            isSm ? "w-8 h-8" : isLg ? "w-11 h-11" : "w-9 h-9 sm:w-10 sm:h-10"
          }`}
          style={{ backgroundColor: "var(--theme-accent)" }}
        >
          {icon ?? <ArrowRight className={isSm ? "w-3.5 h-3.5" : isLg ? "w-5 h-5" : "w-4 h-4"} />}
        </span>
        <span
          className={`relative z-10 transition-colors duration-300 ease-out text-white group-hover/btn:text-[var(--theme-accent-text)] font-bold tracking-tight whitespace-nowrap ${
            fullWidth ? "flex-1 text-center pr-8 sm:pr-10" : ""
          } ${
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
        <a href={href} className={containerClasses} target={target} rel={rel} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
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

  // 3. Signature Translucent (Frosted glass -> fill putih meregang)
  if (variant === "translucent") {
    const heightClass = isSm ? "h-10" : isLg ? "h-13" : "h-11 sm:h-12";
    const widthClass = fullWidth ? "w-full" : "";
    const containerClasses = `relative inline-flex items-center select-none cursor-pointer rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 hover:border-white/35 font-medium backdrop-blur-md overflow-hidden transition-all duration-300 p-1 group/btn shadow-xs ${heightClass} ${widthClass} ${className}`;

    const innerContent = (
      <>
        <span
          className={`absolute left-1 top-1 bottom-1 bg-white rounded-full transition-all duration-350 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0 ${
            isSm
              ? "w-8 group-hover/btn:w-[calc(100%-8px)]"
              : isLg
              ? "w-11 group-hover/btn:w-[calc(100%-8px)]"
              : "w-9 sm:w-10 group-hover/btn:w-[calc(100%-8px)]"
          }`}
        />
        <span
          className={`relative z-10 flex items-center justify-center text-neutral-950 bg-white group-hover/btn:bg-transparent shrink-0 rounded-full transition-all duration-300 ease-out group-hover/btn:translate-x-0.5 ${
            isSm ? "w-8 h-8" : isLg ? "w-11 h-11" : "w-9 h-9 sm:w-10 sm:h-10"
          }`}
        >
          {icon ?? <ArrowRight className={isSm ? "w-3.5 h-3.5" : isLg ? "w-5 h-5" : "w-4 h-4"} />}
        </span>
        <span
          className={`relative z-10 transition-colors duration-300 ease-out text-white group-hover/btn:text-neutral-950 font-bold tracking-tight whitespace-nowrap ${
            fullWidth ? "flex-1 text-center pr-8 sm:pr-10" : ""
          } ${
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
        <a href={href} className={containerClasses} target={target} rel={rel} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
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

  // ---------------------------------------------------------------------------
  // B. FUNCTIONAL SOLID & UTILITY BUTTONS (Compact, Form-Friendly, Pill Corners)
  // ---------------------------------------------------------------------------

  // Common size tokens for solid buttons (smooth rounded-full pill corners)
  const solidSizeClasses = isSm
    ? "h-10 px-5 text-xs sm:text-[13px] rounded-full font-bold"
    : isLg
    ? "h-13 px-8 text-base rounded-full font-bold"
    : "h-11 sm:h-12 px-6 text-sm rounded-full font-bold";

  const widthClass = fullWidth ? "w-full" : "";

  // 4. Primary Solid (Active Daytime Neon Accent)
  if (variant === "primary") {
    const containerClasses = `inline-flex items-center justify-center select-none cursor-pointer bg-[var(--theme-accent)] hover:bg-[var(--theme-accent-hover)] text-[var(--theme-accent-text)] transition-all duration-200 shadow-md shadow-[var(--theme-accent-glow)] select-none ${solidSizeClasses} ${widthClass} ${className}`;

    if (href) {
      return (
        <a href={href} className={containerClasses} target={target} rel={rel} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
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

  // 5. Dark Solid
  if (variant === "dark") {
    const containerClasses = `inline-flex items-center justify-center select-none cursor-pointer bg-[#0A0D14] hover:bg-black text-white border border-white/10 hover:border-white/25 transition-all duration-200 shadow-md ${solidSizeClasses} ${widthClass} ${className}`;

    if (href) {
      return (
        <a href={href} className={containerClasses} target={target} rel={rel} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
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

  // 6. Light Solid
  if (variant === "light") {
    const containerClasses = `inline-flex items-center justify-center select-none cursor-pointer bg-white hover:bg-neutral-100 text-neutral-950 border border-neutral-200 transition-all duration-200 shadow-xs ${solidSizeClasses} ${widthClass} ${className}`;

    if (href) {
      return (
        <a href={href} className={containerClasses} target={target} rel={rel} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
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

  // 7. Glass Solid (Frosted Surface)
  if (variant === "glass") {
    const containerClasses = `inline-flex items-center justify-center select-none cursor-pointer bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-[var(--theme-accent)]/60 backdrop-blur-md transition-all duration-200 ${solidSizeClasses} ${widthClass} ${className}`;

    if (href) {
      return (
        <a href={href} className={containerClasses} target={target} rel={rel} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
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

  // 8. Outline Pill
  if (variant === "outline") {
    const heightClass = isSm ? "h-10 px-4 text-xs sm:text-[13px]" : isLg ? "h-13 px-7 text-base" : "h-11 sm:h-12 px-6 text-sm";
    const containerClasses = `relative inline-flex items-center justify-center select-none cursor-pointer rounded-full bg-white hover:bg-[#F6F7F9] text-neutral-950 border border-[#D5D7DF] font-medium transition-all duration-200 shadow-2xs ${heightClass} ${widthClass} ${className}`;

    if (href) {
      return (
        <a href={href} className={containerClasses} target={target} rel={rel} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
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

  // 9. Ghost Button
  const ghostHeightClass = isSm ? "h-9 px-3 text-xs" : "h-10 px-4 text-sm";
  const containerClasses = `inline-flex items-center justify-center rounded-full text-neutral-600 hover:text-neutral-950 hover:bg-black/5 dark:text-neutral-400 dark:hover:text-white dark:hover:bg-white/10 transition-colors ${ghostHeightClass} ${widthClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={containerClasses} target={target} rel={rel} onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
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
