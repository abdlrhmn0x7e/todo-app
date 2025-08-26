import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getThemeColors, ThemeName } from "~/utils/constants/colors";

export const ThemeContext = createContext({
  theme: getThemeColors("light"),
  themeName: "light" as ThemeName,
  setThemeName: (t: ThemeName) => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme(); // 'light' | 'dark' | null
  const [themeName, setThemeName] = useState<ThemeName>("light");

  useEffect(() => {
    AsyncStorage.getItem("themeName").then((v) => {
      if (v === "light" || v === "dark") setThemeName(v);
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("themeName", themeName);
  }, [themeName]);

  const theme = useMemo(() => {
    const resolved = system === "dark" ? "dark" : themeName;
    return resolved === "dark"
      ? getThemeColors("dark")
      : getThemeColors("light");
  }, [system, themeName]);

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return ctx;
}
