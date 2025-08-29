import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Appearance, useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { ThemeName } from "~/utils/constants/colors";
import { getThemeColors } from "~/utils/constants/colors";

export const ThemeContext = createContext<{
  theme: ReturnType<typeof getThemeColors>;
  themeName: ThemeName;
  changeTheme: (t: ThemeName) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const system = useColorScheme(); // 'light' | 'dark' | null
  const [themeName, setThemeName] = useState<ThemeName>("light");

  useEffect(() => {
    void AsyncStorage.getItem("themeName").then((v) => {
      if (v === "light" || v === "dark") setThemeName(v);
    });
  }, []);

  useEffect(() => {
    void AsyncStorage.setItem("themeName", themeName);
  }, [themeName]);

  const theme = useMemo(() => {
    const resolved = system === "dark" ? "dark" : themeName;
    return resolved === "dark"
      ? getThemeColors("dark")
      : getThemeColors("light");
  }, [system, themeName]);

  function changeTheme(t: ThemeName) {
    setThemeName(t);
    Appearance.setColorScheme(t);
  }

  return (
    <ThemeContext.Provider value={{ theme, themeName, changeTheme }}>
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
