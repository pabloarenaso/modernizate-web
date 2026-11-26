"use client";

import { useRef, type ReactNode } from "react";
import { useEnPantalla } from "@/hooks/useEnPantalla";

/**
 * Contenedor de escena animada: fuera de pantalla (o con la pestaña oculta) marca data-pausado
 * y el CSS congela todas sus animaciones. El movimiento reducido lo resuelve el CSS global (estado final).
 */
export function EscenaViva({ children, className = "", etiqueta }: { children: ReactNode; className?: string; etiqueta?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useEnPantalla(ref);
  return (
    <div ref={ref} role={etiqueta ? "img" : undefined} aria-label={etiqueta} data-pausado={visible ? undefined : ""} className={className}>
      {children}
    </div>
  );
}
