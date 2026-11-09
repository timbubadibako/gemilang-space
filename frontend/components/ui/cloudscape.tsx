"use client";

import React, { useEffect, useRef } from "react";
import { useDaytimeTheme } from "@/lib/daytime-context";

export interface CloudscapeProps extends React.HTMLAttributes<HTMLDivElement> {
  colorBottom?: string;
  colorMid?: string;
  colorTop?: string;
  speed?: number;
  theme?: "morning" | "noon" | "afternoon" | "night";
}

export function Cloudscape({
  colorBottom: _colorBottom,
  colorMid: _colorMid,
  colorTop: _colorTop,
  speed: _speed,
  theme = "night",
  className = "",
  style,
  children,
  ...props
}: CloudscapeProps) {
  // Lock to signature Gemilang Tosca video (night) by default
  const themeId = theme || "night";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [themeId]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={style}
      {...props}
    >
      <video
        ref={videoRef}
        key={themeId}
        src={`/videos/hero-${themeId}.webm`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover pointer-events-none"
      />
      {children}
    </div>
  );
}

