export type ThemeName = "light" | "dark";

export interface ThemePalette {
  background: string;
  foreground: string;

  primary: string;
  primaryForeground: string;

  secondary: string;
  secondaryForeground: string;

  accent: string;
  accentForeground: string;

  muted: string;
  mutedForeground: string;

  card: string;
  cardForeground: string;

  border: string;
  input: string;
  ring: string;

  success: string;
  warning: string;
  danger: string;
}

export const themeColors: Record<ThemeName, ThemePalette> = {
  light: {
    background: "#f0f0f0", // 0 0% 94.1176%
    foreground: "#333333", // 0 0% 20%

    primary: "#606060", // 0 0% 37.6471%
    primaryForeground: "#ffffff", // 0 0% 100%

    secondary: "#e0e0e0", // 0 0% 87.8431%
    secondaryForeground: "#333333", // 0 0% 20%

    accent: "#c0c0c0", // 0 0% 75.2941%
    accentForeground: "#333333", // 0 0% 20%

    muted: "#d9d9d9", // 0 0% 85.098%
    mutedForeground: "#666666", // 0 0% 40%

    card: "#f5f5f5", // 0 0% 96.0784%
    cardForeground: "#333333", // 0 0% 20%

    border: "#d0d0d0", // 0 0% 81.5686%
    input: "#e0e0e0", // 0 0% 87.8431%
    ring: "#606060", // 0 0% 37.6471%

    success: "#16a34a", // keeping green for success
    warning: "#d97706", // keeping amber for warning
    danger: "#800000", // 0 60% 50% - destructive
  },
  dark: {
    background: "#1a1a1a", // 0 0% 10.1961%
    foreground: "#d9d9d9", // 0 0% 85.098%

    primary: "#a0a0a0", // 0 0% 62.7451%
    primaryForeground: "#1a1a1a", // 0 0% 10.1961%

    secondary: "#303030", // 0 0% 18.8235%
    secondaryForeground: "#d9d9d9", // 0 0% 85.098%

    accent: "#404040", // 0 0% 25.098%
    accentForeground: "#d9d9d9", // 0 0% 85.098%

    muted: "#2a2a2a", // 0 0% 16.4706%
    mutedForeground: "#808080", // 0 0% 50.1961%

    card: "#202020", // 0 0% 12.549%
    cardForeground: "#d9d9d9", // 0 0% 85.098%

    border: "#353535", // 0 0% 20.7843%
    input: "#303030", // 0 0% 18.8235%
    ring: "#a0a0a0", // 0 0% 62.7451%

    success: "#22c55e", // keeping green for success
    warning: "#f59e0b", // keeping amber for warning
    danger: "#a16b6b", // 0 66.3043% 63.9216% - destructive
  },
} as const;

export function getThemeColors(
  scheme: ThemeName | null | undefined
): ThemePalette {
  return themeColors[scheme === "dark" ? "dark" : "light"];
}

export default themeColors;
