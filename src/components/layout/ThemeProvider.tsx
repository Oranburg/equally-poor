"use client";

import { type ReactNode } from "react";
import { ThemeContext, useThemeProvider } from "@/hooks/useTheme";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const themeValue = useThemeProvider();

  return (
    <ThemeContext.Provider value={themeValue}>
      <div suppressHydrationWarning>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
