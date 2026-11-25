"use client";

import { useState } from "react";
import type { Texto as TextoC } from "@/content/tipos";

const ESPACIO_FIJO = String.fromCharCode(160);

/**
 * Easter egg del panel de Soluciones: un botón con chispas eléctricas (Uiverse, Pradeepsaranbishnoi/dull-mole-49,
 * licencia MIT, adaptado a la marca) que revela una frase letra por letra.
 */
export function HuevoPanel({ boton, frase }: { boton: TextoC; frase: TextoC }) {
  const [vez, setVez] = useState(0);
  return (
    <div className="flex flex-wrap items-center gap-4">
      {vez > 0 && (
        <p key={vez} aria-live="polite" className="texto-animado font-display text-lg font-bold text-acento-texto" data-estado={frase.estado}>
          {frase.texto.split("").map((l, i) => (
            <span key={i} style={{ animationDelay: `${i * 35}ms` }}>
              {l === " " ? ESPACIO_FIJO : l}
            </span>
          ))}
        </p>
      )}
      <span className="boton-voltaje">
        <button type="button" onClick={() => setVez((v) => v + 1)} data-estado={boton.estado}>
          {boton.texto}
        </button>
        <svg aria-hidden="true" viewBox="0 0 234.6 61.3" preserveAspectRatio="none">
          <filter id="voltaje-brillo">
            <feGaussianBlur stdDeviation="2" result="borroso" />
            <feTurbulence type="fractalNoise" baseFrequency="0.075" numOctaves="1" result="ruido" />
            <feDisplacementMap in="SourceGraphic" in2="ruido" scale="30" xChannelSelector="R" yChannelSelector="G" result="desplazado" />
            <feMerge>
              <feMergeNode in="borroso" />
              <feMergeNode in="borroso" />
              <feMergeNode in="desplazado" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <path className="voltaje linea-1" d="M216 51c-4 0-4-1-7-1-4 0-4 7-7 7-4 0-4-5-7-5s-4 4-7 4-4-1-7-1-4-3-7-3-4 8-7 8-4-5-7-5-4-8-7-8-4-1-7-1-4 3-7 3-4 11-7 11-4-12-7-12-4 5-7 5-4 4-7 4-4 4-7 4-4-10-7-10-4 0-7 0-4 2-7 2-4 7-7 7-4-11-7-11-4 3-7 3-4 4-7 4-4-3-7-3-4 8-7 8-4-15-7-15-4 6-7 6c-2 0-4 0-5-1-2-1-2-3-3-5-1-2 2-3 2-5 0-3-2-3-2-7s-10-3-10-7 8-3 8-7c0-2 2-2 3-4 1-2 0-4 2-5 2-1 3-8 5-8 4 0 4 1 7 1 4 0 4 7 7 7s4-2 7-2 4-1 7-1 4-8 7-8h7c4 0 4 5 7 5s4-1 7-1 4 12 7 12 4-3 7-3 4-13 7-13 4 11 7 11 4 1 7 1 4-9 7-9 4 12 7 12 4-1 7-1 4-3 7-3 4-6 7-6 4-1 7-1 4 7 7 7 4-9 7-9 4 0 7 0 4 9 7 9 4 0 7 0 4-2 7-2 4 2 7 2 4-5 7-5c2 0 1 10 2 11s4-2 5 0c1 2 10 2 10 4 0 3-11 3-11 7s1 3 1 7 2 3 2 7c0 2 7 8 6 10-1 2-12-7-14-6-2 1 0 6-2 6z" />
          <path className="voltaje linea-2" d="M216 52c-3 0-3 0-6 0s-3 3-6 3-3-2-6-2-3 2-6 2-3 0-6 0-3-1-6-1-3 3-6 3-3-2-6-2-3-3-6-3-3 0-6 0-3 1-6 1-3 5-6 5-3-6-6-6-3 2-6 2-3 2-6 2-3 2-6 2-3-4-6-4-3 0-6 0-3 1-6 1-3 3-6 3-3-5-6-5-3 2-6 2-3 2-6 2-3-1-6-1-3 4-6 4-3-6-6-6-3 3-6 3h-6c-3 0-3-1-6-1s-3-1-6-1-3 1-6 1-3 4-6 4-3-3-6-3c-2 0-3-1-5-2-2-1-4-2-5-3s-4-4-4-6c0-3 0-3 0-7s3-3 3-7-1-3-1-7c0-2 0-4 1-6 1-2 1-6 3-7 2-1 6-2 8-2 3 0 3 2 6 2s3-1 6-1 3 5 6 5 3-1 6-1 3-6 6-6 3 5 6 5 3 1 6 1 3-4 6-4 3 5 6 5 3-1 6-1 3-1 6-1 3-3 6-3 3-1 6-1 3 3 6 3 3-4 6-4 3 0 6 0 3 4 6 4 3 0 6 0 3-1 6-1 3 1 6 1 3-2 6-2 3 4 6 4 3-2 6-2 3-4 6-4 3 5 6 5 3-1 6-1 3-1 6-1 3-4 6-4 3 6 6 6 3-5 6-5 3 2 6 2 3-2 6-2 3 1 6 1c2 0 5-1 7 0 2 1 2 4 3 6 1 2 0 4 0 6 0 3 3 3 3 7s-3 3-3 7 4 3 4 7c0 2-6 3-7 4-1 2 1 7-1 8-2 1-5-1-7-1z" />
        </svg>
        <span aria-hidden="true" className="puntos">
          <span /><span /><span /><span /><span />
        </span>
      </span>
    </div>
  );
}
