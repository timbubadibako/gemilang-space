"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { DayTimeTheme, DAYTIME_THEMES, getThemeByHour } from "./daytime-theme";

interface DaytimeContextValue {
  currentTheme: DayTimeTheme;
  simulatedHour: number;
  setSimulatedHour: (hour: number) => void;
  isAutoTime: boolean;
  setIsAutoTime: (auto: boolean) => void;
  mounted: boolean;
}

const DaytimeThemeContext = createContext<DaytimeContextValue | null>(null);

function applyThemeCssVariables(theme: DayTimeTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--theme-accent", theme.accentColor);
  root.style.setProperty("--theme-accent-hover", theme.accentHover);
  root.style.setProperty("--theme-accent-text", theme.accentText);
  root.style.setProperty("--theme-accent-glow", theme.accentGlow);
  root.style.setProperty("--theme-accent-border", theme.accentBorder);
  root.style.setProperty("--theme-accent-bg", theme.accentBg);
}

// Consistent default hour for both SSR and initial client hydration (eliminates hydration mismatch)
const DEFAULT_HOUR = 20;

export function DaytimeThemeProvider({ children }: { children: ReactNode }) {
  const [simulatedHour, setSimulatedHour] = useState<number>(DEFAULT_HOUR);
  const [isAutoTime, setIsAutoTime] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Sync with user's actual local clock only AFTER hydration completes
  useEffect(() => {
    setMounted(true);
    const initialHour = new Date().getHours();
    setSimulatedHour(initialHour);
  }, []);

  const currentTheme = useMemo(() => {
    return getThemeByHour(simulatedHour);
  }, [simulatedHour]);

  // Apply CSS custom properties whenever theme changes
  useEffect(() => {
    applyThemeCssVariables(currentTheme);
  }, [currentTheme]);

  return (
    <DaytimeThemeContext.Provider
      value={{
        currentTheme,
        simulatedHour,
        setSimulatedHour,
        isAutoTime,
        setIsAutoTime,
        mounted,
      }}
    >
      {children}
    </DaytimeThemeContext.Provider>
  );
}

export function useDaytimeTheme(): DaytimeContextValue {
  const ctx = useContext(DaytimeThemeContext);
  if (!ctx) {
    const defaultTheme = DAYTIME_THEMES.night;
    return {
      currentTheme: defaultTheme,
      simulatedHour: DEFAULT_HOUR,
      setSimulatedHour: () => {},
      isAutoTime: true,
      setIsAutoTime: () => {},
      mounted: false,
    };
  }
  return ctx;
}
