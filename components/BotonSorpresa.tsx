"use client";

import { useEffect, useRef, useState } from "react";
import { Isotipo } from "@/components/Isotipo";
import type { Texto as TextoC } from "@/content/tipos";

/**
 * Disparador único de easter eggs: botón circular pequeño con la tilde de Modernízate.
 * Va siempre en la esquina inferior derecha de su sección (la sección debe ser "relative").
 * Pulsa suave una sola vez la primera vez que entra en pantalla.
 */
export function BotonSorpresa({ etiqueta, onClick, className = "" }: { etiqueta: TextoC; onClick: () => void; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visto, setVisto] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisto(true);
        io.disconnect();
      }
    }, { threshold: 1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={etiqueta.texto}
      title={etiqueta.texto}
      data-estado={etiqueta.estado}
      className={`boton-sorpresa flex size-9 items-center justify-center rounded-full border border-linea bg-superficie/90 text-primario shadow-[0_6px_16px_-8px_rgba(11,21,48,0.5)] backdrop-blur transition-transform hover:scale-110 active:scale-95 ${visto ? "sorpresa-pulso" : ""} ${className}`}
    >
      <Isotipo className="h-3.5" />
    </button>
  );
}
