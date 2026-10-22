"use client";

import React, { useEffect, useRef } from "react";
import { useDaytimeTheme } from "@/lib/daytime-context";

export interface GradientWaveProps {
  colors?: string[];
  isPlaying?: boolean;
  className?: string;
  shadowPower?: number;
  darkenTop?: boolean;
  noiseSpeed?: number;
  noiseFrequency?: [number, number];
  deform?: {
    incline?: number;
    offsetTop?: number;
    offsetBottom?: number;
    noiseFreq?: [number, number];
    noiseAmp?: number;
    noiseSpeed?: number;
    noiseFlow?: number;
    noiseSeed?: number;
  };
}

export function GradientWave({
  isPlaying = true,
  className = "",
}: GradientWaveProps) {
  const { currentTheme } = useDaytimeTheme();
  const themeId = currentTheme?.id || "night";
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && isPlaying) {
      videoRef.current.play().catch(() => {});
    }
  }, [themeId, isPlaying]);

  return (
    <div className={`absolute inset-0 z-0 w-full h-full overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        key={themeId}
        src={`/videos/wave-${themeId}.webm`}
        autoPlay={isPlaying}
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
}

