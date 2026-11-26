"use client";

import { useEffect, useRef, useState } from "react";
import { useEnPantalla } from "@/hooks/useEnPantalla";
import { useMovimientoReducido } from "@/hooks/useMovimientoReducido";

/**
 * Línea de tiempo en bucle para escenas con varios actos: devuelve el tiempo actual (ms) dentro del ciclo.
 * Se detiene fuera de pantalla. Con movimiento reducido devuelve siempre "final" (estado final, estático).
 */
export function useLinea(total: number, final = total - 1) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useEnPantalla(ref);
  const reducido = useMovimientoReducido();
  const [t, setT] = useState(0);
  useEffect(() => {
    if (!visible || reducido) return;
    const id = setInterval(() => setT((x) => (x + 100) % total), 100);
    return () => clearInterval(id);
  }, [visible, reducido, total]);
  return { ref, t: reducido ? final : t, reducido };
}
