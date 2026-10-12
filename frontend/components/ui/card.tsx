"use client";

import React from "react";

export type CardVariant = "surface" | "subtle" | "dark" | "cosmic";
export type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  surface: "bg-white text-neutral-950 border border-neutral-200/80 shadow-sm",
  subtle: "bg-[#F7F7F8] text-neutral-950 border border-neutral-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.02)]",
  dark: "bg-[#0D1017] text-white border border-white/10 shadow-2xl",
  cosmic: "bg-gradient-to-b from-[#1C1642] via-[#14142E] to-[#0A0C14] text-white border border-white/10 shadow-2xl relative overflow-hidden",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-7",
  lg: "p-7 sm:p-9",
  xl: "p-7 sm:p-10 lg:p-11",
};

export function Card({
  children,
  variant = "surface",
  padding = "md",
  className = "",
  ...props
}: CardProps) {
  // Standardized radius: rounded-xl (default clean curve, non-bulky, sharp-yet-smooth modern standard)
  return (
    <div
      className={`rounded-xl transition-all ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={`text-xl sm:text-2xl font-bold tracking-tight text-inherit leading-snug ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`text-xs sm:text-[13px] opacity-70 leading-relaxed ${className}`} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-6 pt-4 border-t border-inherit/10 flex items-center justify-between ${className}`} {...props}>
      {children}
    </div>
  );
}
