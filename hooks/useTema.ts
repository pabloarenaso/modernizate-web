"use client";

import { useCallback, useSyncExternalStore } from "react";
import { CLAVE_TEMA, type Tema } from "@/lib/tema";

const suscribir = (aviso: () => void) => {
  const mo = new MutationObserver(aviso);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const leer = (): Tema => (document.documentElement.dataset.theme === "dark" ? "dark" : "light");

/** Tema actual (null en el servidor y antes de hidratar) y función para cambiarlo. */
export function useTema() {
  const tema = useSyncExternalStore(suscribir, leer, () => null);
  const cambiar = useCallback((t: Tema) => {
    try {
      localStorage.setItem(CLAVE_TEMA, t);
    } catch {}
    const html = document.documentElement;
    html.dataset.theme = t;
    html.style.colorScheme = t;
  }, []);
  return { tema, cambiar };
}
