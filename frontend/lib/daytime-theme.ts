export interface DayTimeTheme {
  name: string;
  nameId: string;
  hourRange: string;
  colorBottom: string;
  colorMid: string;
  colorTop: string;
  speed: number;
  isNight?: boolean;
}

export const DAYTIME_THEMES: Record<string, DayTimeTheme> = {
  morning: {
    name: "Morning (Fajar Lembut)",
    nameId: "Pagi",
    hourRange: "05:00 - 10:59",
    colorBottom: "#3B82F6", // Fresh morning royal-blue horizon
    colorMid: "#FDE68A",    // Soft warm golden-amber sunlight beam
    colorTop: "#FFFFFF",    // Pure clean white cloud puffs
    speed: 0.65,
    isNight: false,
  },
  noon: {
    name: "Noon (Siang Terik)",
    nameId: "Siang",
    hourRange: "11:00 - 15:59",
    colorBottom: "#0284C7", // Deep vivid cerulean sky
    colorMid: "#7DD3FC",    // Crystal blue sky tint
    colorTop: "#FFFFFF",    // Pure white cumulus cloud highlight
    speed: 0.7,
    isNight: false,
  },
  afternoon: {
    name: "Golden Sunset (Sore)",
    nameId: "Sore",
    hourRange: "16:00 - 18:59",
    colorBottom: "#0F1E3D", // Biru senja gelap elegan (Dark twilight navy)
    colorMid: "#EA580C",    // Awan oranye senja pekat (Sunset crimson orange)
    colorTop: "#FB923C",    // Puncak awan oranye terang bersinar (Glowing warm amber)
    speed: 0.6,
    isNight: false,
  },
  night: {
    name: "Night (Malam Bertabur Bintang)",
    nameId: "Malam",
    hourRange: "19:00 - 04:59",
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
