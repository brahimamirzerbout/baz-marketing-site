"use client";

/**
 * next-themes ThemeProvider for BAZ — dark mode only.
 * No light mode, no toggle, no system preference. Pure darkness.
 */
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      themes={["dark"]}
      storageKey="baz:theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}