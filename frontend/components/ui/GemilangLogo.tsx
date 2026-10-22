"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useDaytimeTheme } from "@/lib/daytime-context";

export interface GemilangLogoProps {
  /**
   * "full": Icon G + EMILANG typography (Gemilang)
   * "mark": Only Icon G
   * "type": Only EMILANG typography
   */
  variant?: "full" | "mark" | "type";
  /**
   * Explicit icon color (e.g. "#00E1BA", "#2E51FF", "currentColor").
   * Defaults to daytime theme neon accent.
   */
  iconColor?: string;
  /**
   * Explicit text color for EMILANG typography.
   * Defaults to "#FFFFFF".
   */
  textColor?: string;
  /**
   * Outer container className (e.g. "h-7 sm:h-8", "h-10", "h-20")
   */
  className?: string;
  /**
   * Icon G mark specific className
   */
  markClassName?: string;
  /**
   * Typography specific className
   */
  textClassName?: string;
  /**
   * Accessibility label
   */
  alt?: string;
}

export function GemilangMark({
  color,
  className,
}: {
  color?: string;
  className?: string;
}) {
  const { currentTheme } = useDaytimeTheme();
  const fill = color || currentTheme.accentColor;

  return (
    <svg
      viewBox="143 137 794 785"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-full w-auto aspect-square shrink-0 select-none", className)}
      aria-hidden="true"
    >
      <g fill={fill} className="transition-colors duration-500">
        {/* Upper right curved wing & center connector */}
        <path d="M936.6076,534.5239c0,42.01-6.69,75.84-12.09,97.07-14.96,58.77-41.01,103.38-62.01,132.75-14.27,19.94-47.83,62.74-104.69,100.45-50.36,33.4-98.08,48.9-129.66,56.53,52.4-113.61,104.79-227.22,157.19-340.82H485.9976c30.11-49.34,60.23-98.67,90.34-148h309.85c12.34-.03,24.67-.05,37.01-.08,6.76,25.29,13.41,60.24,13.41,102.1Z" />
        {/* Top diagonal prism */}
        <path d="M833.1776,267.4339c-74.22,35.07-148.45,70.14-222.67,105.21,37.35-63.5,74.7-127,112.05-190.5,18.72,9.83,40.53,23.13,63.2,41.09,19.15,15.16,34.83,30.41,47.42,44.2Z" />
        {/* Main large left arch & sweep */}
        <path d="M690.9876,168.1039L225.2376,776.3239s-15.3-19.49-28.75-43.36c-4.81-8.53-36.73-65.17-46.46-125.64-2.5-15.48-5.46-43.14-6.66-72.52,0-.04-.01-.22-.01-.26,.3-21.91,1.21-65.31,18.09-118.75,37.35-118.24,120.31-182.48,143.06-199.6,50.69-38.13,98.46-54.77,112.29-59.33,25.14-8.28,46.53-12.34,59.56-14.38,39.87-6.26,73.88-5.03,98.1-2.49l-.03,.09c13.2,.85,27.74,2.53,43.3,5.51,28.95,5.53,53.55,14.02,73.26,22.51Z" />
        {/* Bottom base foot block */}
        <path d="M518.5576,648.1539h170.88v1.11c-.23,.81-.5,1.61-.77,2.42l-7.43,21.89c-29.07,84.48-58.14,168.95-87.21,253.42-16.82,2.49-38.31,4.54-63.26,4.12-22.42-.37-40.17-2.61-50.12-4.09-12.18-1.82-44.65-7.27-84.49-22.75-23.75-9.23-41.02-18.47-47.49-22.03-9.98-5.48-36.04-20.39-65.59-45.51-16.87-14.36-37.42-34.19-57.84-60.41,65.84-3.64,106.65-24.06,131.89-42.3,34.04-24.61,52.97-54.83,101.81-73.38,24.03-9.13,45.5-11.71,59.62-12.49Z" />
      </g>
    </svg>
  );
}

export function GemilangType({
  color = "#FFFFFF",
  className,
}: {
  color?: string;
  className?: string;
}) {
  const isDefaultWhite = !color || color.toLowerCase() === "#ffffff" || color.toLowerCase() === "white";

  if (isDefaultWhite) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/type-emilang.png"
        alt="EMILANG"
        className={cn(
          "h-[48%] w-auto object-contain shrink-0 select-none pointer-events-none mb-[2px]",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative h-[48%] shrink-0 select-none pointer-events-none mb-[2px] transition-colors duration-500",
        className
      )}
      style={{
        aspectRatio: "1440 / 160",
        backgroundColor: color,
        maskImage: 'url("/type-emilang.png")',
        WebkitMaskImage: 'url("/type-emilang.png")',
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "left center",
        WebkitMaskPosition: "left center",
      }}
      aria-hidden="true"
    />
  );
}

export function GemilangLogo({
  variant = "full",
  iconColor,
  textColor = "#FFFFFF",
  className,
  markClassName,
  textClassName,
  alt = "Gemilang",
}: GemilangLogoProps) {
  if (variant === "mark") {
    return (
      <div className={cn("inline-flex items-center h-[29px] sm:h-8", className)} role="img" aria-label={alt}>
        <GemilangMark color={iconColor} className={markClassName} />
      </div>
    );
  }

  if (variant === "type") {
    return (
      <div className={cn("inline-flex items-center h-[29px] sm:h-8", className)} role="img" aria-label={alt}>
        <GemilangType color={textColor} className={textClassName} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-end gap-1.5 sm:gap-2 select-none h-[29px] sm:h-8",
        className
      )}
      role="img"
      aria-label={alt}
    >
      <GemilangMark color={iconColor} className={markClassName} />
      <GemilangType color={textColor} className={textClassName} />
    </div>
  );
}

export default GemilangLogo;
