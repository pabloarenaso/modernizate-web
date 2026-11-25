"use client";

import { useState } from "react";

type Parte = { nombre: string; valor: number; color: string };
type Props = { titulo: string; partes: Parte[]; formatear: (n: number) => string };

/** Barra apilada horizontal (un todo dividido en partes) con etiquetas directas bajo cada parte. */
export function BarraSegmentada({ titulo, partes, formatear }: Props) {
  const [foco, setFoco] = useState<number | null>(null);
  const total = partes.reduce((a, p) => a + p.valor, 0);
  const descripcion = `${titulo}: ${partes.map((p) => `${p.nombre} ${formatear(p.valor)}%`).join(", ")}`;

  return (
    <figure className="flex flex-col gap-3">
      <figcaption className="text-sm font-semibold">{titulo}</figcaption>
      <div role="img" aria-label={descripcion} className="relative">
        <div className="flex h-7 gap-[2px]">
          {partes.map((p, i) => (
            <div
              key={p.nombre}
              className="segmento rounded-[4px]"
              style={{ width: `${(p.valor / total) * 100}%`, background: p.color, transitionDelay: `${i * 120}ms` }}
              onPointerEnter={() => setFoco(i)}
              onPointerLeave={() => setFoco(null)}
            />
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2" aria-hidden="true">
          {partes.map((p) => (
            <li key={p.nombre} className="flex flex-col">
              <span className="flex items-center gap-1.5 text-xs text-texto-sec">
                <span className="size-2 shrink-0 rounded-sm" style={{ background: p.color }} />
                {p.nombre}
              </span>
              <span className="font-display text-xl font-bold">{formatear(p.valor)}%</span>
            </li>
          ))}
        </ul>
        {foco !== null && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-9 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-linea bg-superficie px-2 py-1 text-xs shadow-md"
            style={{
              left: `${((partes.slice(0, foco).reduce((a, p) => a + p.valor, 0) + partes[foco].valor / 2) / total) * 100}%`,
            }}
          >
            {partes[foco].nombre} · <span className="font-semibold">{formatear(partes[foco].valor)}%</span>
          </div>
        )}
      </div>
    </figure>
  );
}
