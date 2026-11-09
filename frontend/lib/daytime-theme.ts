export interface DayTimeTheme {
  id: "morning" | "noon" | "afternoon" | "night";
  name: string;
  nameId: string;
  hourRange: string;
  // Primary neon accent for logo, buttons, badges, glows
  accentColor: string;
  accentHover: string;
  accentText: string;
  accentGlow: string;
  accentBorder: string;
  accentBg: string;
  // Theme-adaptive GradientWave colors (6 stops for dynamic WebGL waves)
  waveColors: string[];
  // Original exact cloudscape settings (Hero Left Card)
  colorBottom: string;
  colorMid: string;
  colorTop: string;
  speed: number;
  isNight?: boolean;
}

export const DAYTIME_THEMES: Record<string, DayTimeTheme> = {
  morning: {
    id: "morning",
    name: "Morning (Fajar)",
    nameId: "Pagi",
    hourRange: "05:00 - 10:59",
    // Official Brand Color Gemilang (2.png)
    accentColor: "#00E1BA",
    accentHover: "#00F2C8",
    accentText: "#04060A",
    accentGlow: "rgba(0, 225, 186, 0.35)",
    accentBorder: "rgba(0, 225, 186, 0.4)",
    accentBg: "rgba(0, 225, 186, 0.12)",
    // Cyan Wave Palette matching 2.png
    waveColors: ["#041218", "#082F2F", "#008B7A", "#00E1BA", "#4DF5D4", "#026D60"],
    colorBottom: "#04151E",
    colorMid: "#062B2B",
    colorTop: "#00E1BA",
    speed: 0.6,
    isNight: false,
  },
  noon: {
    id: "noon",
    name: "Noon (Siang)",
    nameId: "Siang",
    hourRange: "11:00 - 15:59",
    // Official Brand Color Gemilang (2.png)
    accentColor: "#00E1BA",
    accentHover: "#00F2C8",
    accentText: "#04060A",
    accentGlow: "rgba(0, 225, 186, 0.35)",
    accentBorder: "rgba(0, 225, 186, 0.4)",
    accentBg: "rgba(0, 225, 186, 0.12)",
    waveColors: ["#041218", "#082F2F", "#008B7A", "#00E1BA", "#4DF5D4", "#026D60"],
    colorBottom: "#030A14",
    colorMid: "#07202B",
    colorTop: "#00E1BA",
    speed: 0.65,
    isNight: false,
  },
  afternoon: {
    id: "afternoon",
    name: "Sunset (Sore)",
    nameId: "Sore",
    hourRange: "16:00 - 18:59",
    // Official Brand Color Gemilang (2.png)
    accentColor: "#00E1BA",
    accentHover: "#00F2C8",
    accentText: "#04060A",
    accentGlow: "rgba(0, 225, 186, 0.35)",
    accentBorder: "rgba(0, 225, 186, 0.4)",
    accentBg: "rgba(0, 225, 186, 0.12)",
    waveColors: ["#041218", "#082F2F", "#008B7A", "#00E1BA", "#4DF5D4", "#026D60"],
    colorBottom: "#060D1A",
    colorMid: "#0A2830",
    colorTop: "#00E1BA",
    speed: 0.55,
    isNight: false,
  },
  night: {
    id: "night",
    name: "Night (Malam)",
    nameId: "Malam",
    hourRange: "19:00 - 04:59",
    // Official Brand Color Gemilang (2.png)
    accentColor: "#00E1BA",
    accentHover: "#00F2C8",
    accentText: "#04060A",
    accentGlow: "rgba(0, 225, 186, 0.35)",
    accentBorder: "rgba(0, 225, 186, 0.4)",
    accentBg: "rgba(0, 225, 186, 0.12)",
    waveColors: ["#041218", "#082F2F", "#008B7A", "#00E1BA", "#4DF5D4", "#026D60"],
    colorBottom: "#030712",
    colorMid: "#051C24",
    colorTop: "#00E1BA",
    speed: 0.45,
    isNight: true,
  },
};

/**
 * Return theme based on hour of day (0 - 23.99)
 */
export function getThemeByHour(hour: number): DayTimeTheme {
  const h = (hour + 24) % 24;
  if (h >= 5 && h < 11) {
    return DAYTIME_THEMES.morning;
  }
  if (h >= 11 && h < 16) {
    return DAYTIME_THEMES.noon;
  }
  if (h >= 16 && h < 19) {
    return DAYTIME_THEMES.afternoon;
  }
  return DAYTIME_THEMES.night;
}
