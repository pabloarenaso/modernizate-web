"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/** Modo noche con data-theme; sigue la preferencia del sistema hasta que el usuario elige. */
export function ProveedorTema({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
