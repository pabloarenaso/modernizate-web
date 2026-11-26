"use client";

import { useState } from "react";
import { BotonSorpresa } from "@/components/BotonSorpresa";
import type { Texto as TextoC } from "@/content/tipos";

const ESPACIO_FIJO = String.fromCharCode(160);

/** Easter egg del panel de Soluciones: el botón sorpresa revela una frase letra por letra. */
export function HuevoPanel({ boton, frase }: { boton: TextoC; frase: TextoC }) {
  const [vez, setVez] = useState(0);
  return (
    <div className="flex min-h-9 flex-1 flex-wrap items-center justify-end gap-4">
      {vez > 0 && (
        <p key={vez} aria-live="polite" className="texto-animado font-display text-lg font-bold text-acento-texto" data-estado={frase.estado}>
          {frase.texto.split("").map((l, i) => (
            <span key={i} style={{ animationDelay: `${i * 35}ms` }}>
              {l === " " ? ESPACIO_FIJO : l}
            </span>
          ))}
        </p>
      )}
      <BotonSorpresa etiqueta={boton} onClick={() => setVez((v) => v + 1)} className="ml-auto" />
    </div>
  );
}
