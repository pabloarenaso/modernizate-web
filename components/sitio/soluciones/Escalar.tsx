"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** Dibuja el contenido a un tamaño fijo (ancho × alto) y lo escala al ancho del contenedor. */
export function Escalar({ ancho, alto, children, className = "" }: { ancho: number; alto: number; children: ReactNode; className?: string }) {
  const caja = useRef<HTMLDivElement>(null);
  const [escala, setEscala] = useState(1);
  useLayoutEffect(() => {
    const el = caja.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setEscala(e.contentRect.width / ancho));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ancho]);
  return (
    <div ref={caja} className={`relative w-full overflow-hidden ${className}`} style={{ aspectRatio: `${ancho} / ${alto}` }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width: ancho, height: alto, transform: `scale(${escala})` }}>
        {children}
      </div>
    </div>
  );
}
