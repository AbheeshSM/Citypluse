import { useTheme } from "@/hooks/use-theme";
import { useMemo } from "react";

export function useThemeChartStyles() {
  const { theme } = useTheme();

  return useMemo(() => {
    const isDark = theme === "dark";
    return {
      grid: isDark ? "hsl(220, 30%, 18%)" : "hsl(214, 20%, 90%)",
      text: isDark ? "hsl(215, 20%, 65%)" : "hsl(215, 16%, 47%)",
      tooltip: {
        backgroundColor: isDark ? "hsl(222, 47%, 10%)" : "hsl(0, 0%, 100%)",
        border: `1px solid ${isDark ? "hsl(220, 30%, 25%)" : "hsl(214, 20%, 88%)"}`,
        borderRadius: "8px",
        color: isDark ? "hsl(210, 40%, 98%)" : "hsl(222, 47%, 11%)",
      },
    };
  }, [theme]);
}
