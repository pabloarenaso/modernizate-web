"use client";

import { useSyncExternalStore } from "react";

const consulta = "(prefers-reduced-motion: reduce)";
const suscribir = (aviso: () => void) => {
  const m = window.matchMedia(consulta);
  m.addEventListener("change", aviso);
  return () => m.removeEventListener("change", aviso);
};

/** true si el sistema pide movimiento reducido (en el servidor se asume que no). */
export function useMovimientoReducido() {
  return useSyncExternalStore(suscribir, () => window.matchMedia(consulta).matches, () => false);
}
