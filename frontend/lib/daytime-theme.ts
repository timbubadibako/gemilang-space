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
    name: "Morning (Fajar Lembut)",
    nameId: "Pagi",
    hourRange: "05:00 - 10:59",
    // Biru Muda Neon (Electric Sky Cyan)
    accentColor: "#00E5FF",
    accentHover: "#38EFFF",
    accentText: "#04060A",
    accentGlow: "rgba(0, 229, 255, 0.35)",
    accentBorder: "rgba(0, 229, 255, 0.4)",
    accentBg: "rgba(0, 229, 255, 0.12)",
    // Cyan Wave Palette
    waveColors: ["#021B24", "#053B47", "#008B9E", "#00E5FF", "#70F3FF", "#036473"],
    // Original cloudscape settings
    colorBottom: "#3B82F6", // Fresh morning royal-blue horizon
    colorMid: "#FDE68A",    // Soft warm golden-amber sunlight beam
    colorTop: "#FFFFFF",    // Pure clean white cloud puffs
    speed: 0.65,
    isNight: false,
  },
  noon: {
    id: "noon",
    name: "Noon (Siang Terik)",
    nameId: "Siang",
    hourRange: "11:00 - 15:59",
    // Biru Neon (Electric Cobalt Blue)
    accentColor: "#2E51FF",
    accentHover: "#5271FF",
    accentText: "#FFFFFF",
    accentGlow: "rgba(46, 81, 255, 0.4)",
    accentBorder: "rgba(46, 81, 255, 0.45)",
    accentBg: "rgba(46, 81, 255, 0.15)",
    // Electric Blue Wave Palette
    waveColors: ["#030B24", "#0C1D54", "#1B3BBB", "#2E51FF", "#7892FF", "#11267D"],
    // Original cloudscape settings
    colorBottom: "#0284C7", // Deep vivid cerulean sky
    colorMid: "#7DD3FC",    // Crystal blue sky tint
    colorTop: "#FFFFFF",    // Pure white cumulus cloud highlight
    speed: 0.7,
    isNight: false,
  },
  afternoon: {
    id: "afternoon",
    name: "Golden Sunset (Sore)",
    nameId: "Sore",
    hourRange: "16:00 - 18:59",
    // Ungu Neon (Electric Neon Violet / Purple)
    accentColor: "#A855F7",
    accentHover: "#C084FC",
    accentText: "#FFFFFF",
    accentGlow: "rgba(168, 85, 247, 0.38)",
    accentBorder: "rgba(168, 85, 247, 0.45)",
    accentBg: "rgba(168, 85, 247, 0.15)",
    // Neon Violet Wave Palette
    waveColors: ["#140520", "#300D4C", "#6B21A8", "#A855F7", "#D8B4FE", "#4C1478"],
    // Original cloudscape settings
    colorBottom: "#0F1E3D", // Biru senja gelap elegan (Dark twilight navy)
    colorMid: "#EA580C",    // Awan oranye senja pekat (Sunset crimson orange)
    colorTop: "#FB923C",    // Puncak awan oranye terang bersinar (Glowing warm amber)
    speed: 0.6,
    isNight: false,
  },
  night: {
    id: "night",
    name: "Night (Malam Bertabur Bintang)",
    nameId: "Malam",
    hourRange: "19:00 - 04:59",
    // Hijau Tosca Neon (Signature Cyber Tosca Gemilang)
    accentColor: "#00E1BA",
    accentHover: "#00F2C8",
    accentText: "#04060A",
    accentGlow: "rgba(0, 225, 186, 0.3)",
    accentBorder: "rgba(0, 225, 186, 0.38)",
    accentBg: "rgba(0, 225, 186, 0.12)",
    // Original Cyber Tosca Wave Palette
    waveColors: ["#041218", "#082F2F", "#008B7A", "#00E1BA", "#4DF5D4", "#026D60"],
    // Original cloudscape settings
    colorBottom: "#030712", // Deep midnight void
    colorMid: "#1E1B4B",    // Deep velvety sapphire indigo
    colorTop: "#6366F1",    // Luminous cosmic neon-indigo cloud highlights
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
