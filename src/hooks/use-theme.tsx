import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark";
type AccentColor = "coral" | "blue" | "purple" | "orange" | "teal";

interface AccentConfig {
  label: string;
  light: { accent: string; "accent-foreground": string };
  dark: { accent: string; "accent-foreground": string };
  preview: string; // tailwind gradient for preview swatch
}

export const ACCENT_COLORS: Record<AccentColor, AccentConfig> = {
  coral: {
    label: "Coral",
    light: { accent: "358 76% 59%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "358 80% 66%", "accent-foreground": "222 34% 8%" },
    preview: "bg-[#E84A5F]",
  },
  blue: {
    label: "Harbor",
    light: { accent: "199 78% 45%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "199 78% 58%", "accent-foreground": "222 34% 8%" },
    preview: "bg-[#1995AD]",
  },
  purple: {
    label: "Iris",
    light: { accent: "259 62% 59%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "259 70% 70%", "accent-foreground": "222 34% 8%" },
    preview: "bg-[#7C5CE6]",
  },
  orange: {
    label: "Amber",
    light: { accent: "24 92% 55%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "29 92% 61%", "accent-foreground": "30 92% 9%" },
    preview: "bg-[#F28C28]",
  },
  teal: {
    label: "Teal",
    light: { accent: "171 78% 34%", "accent-foreground": "0 0% 100%" },
    dark: { accent: "168 72% 52%", "accent-foreground": "222 34% 8%" },
    preview: "bg-[#13A88E]",
  },
};

interface ThemeContextType {
  theme: Theme;
  accentColor: AccentColor;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("cityos-theme") as Theme) || "light";
    }
    return "light";
  });

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("cityos-accent") as AccentColor) || "coral";
    }
    return "coral";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("cityos-theme", theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    const config = ACCENT_COLORS[accentColor];
    const values = theme === "dark" ? config.dark : config.light;
    root.style.setProperty("--accent", values.accent);
    root.style.setProperty("--accent-foreground", values["accent-foreground"]);
    localStorage.setItem("cityos-accent", accentColor);
  }, [accentColor, theme]);

  const toggleTheme = () => setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  const setTheme = (t: Theme) => setThemeState(t);
  const setAccentColor = (c: AccentColor) => setAccentColorState(c);

  return (
    <ThemeContext.Provider value={{ theme, accentColor, toggleTheme, setTheme, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}
