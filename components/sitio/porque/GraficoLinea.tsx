"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Punto } from "@/lib/datosTendencia";

type Props = {
  puntos: Punto[];
  /** Rango de años común a los gráficos que se comparan. */
  dominio: [number, number];
  titulo: string;
  descripcion: string;
  formatear: (n: number) => string;
  /** Alto en px; el ancho sigue al contenedor para que el texto no se escale. */
  alto?: number;
};

const M = { izq: 46, der: 20, arr: 26, aba: 28 };

/** Línea de un solo color, escala 0–100 %, valor en cada punto y tooltip al pasar el mouse. */
export function GraficoLinea({ puntos, dominio, titulo, descripcion, formatear, alto = 200 }: Props) {
  const [foco, setFoco] = useState<number | null>(null);
  const caja = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(320);
  const H = alto;
  useLayoutEffect(() => {
    const el = caja.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(200, Math.round(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const x = (anio: number) => M.izq + ((anio - dominio[0]) / (dominio[1] - dominio[0])) * (W - M.izq - M.der);
  const y = (v: number) => M.arr + (1 - v / 100) * (H - M.arr - M.aba);
  const d = puntos.map((p, i) => `${i ? "L" : "M"}${x(p.anio)} ${y(p.valor)}`).join(" ");

  return (
    <figure className="flex min-w-0 flex-col gap-2">
      <figcaption className="text-sm font-semibold">{titulo}</figcaption>
      <div ref={caja} className="relative">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="block w-full" role="img" aria-label={descripcion}>
          {[0, 50, 100].map((t) => (
            <g key={t}>
              <line x1={M.izq} x2={W - M.der} y1={y(t)} y2={y(t)} stroke="var(--linea)" strokeWidth="1" />
              <text x={M.izq - 8} y={y(t) + 4} textAnchor="end" className="fill-texto-sec text-[11px]">
                {formatear(t)}%
              </text>
            </g>
          ))}
          <path d={d} pathLength={1} fill="none" stroke="var(--graf-1)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="trazo-linea" />
          {puntos.map((p, i) => (
            <g key={p.anio}>
              <text x={x(p.anio)} y={y(p.valor) - 12} textAnchor="middle" className="fill-texto text-[12px] font-semibold">
                {formatear(p.valor)}%
              </text>
              <circle cx={x(p.anio)} cy={y(p.valor)} r="5" fill="var(--graf-1)" stroke="var(--superficie)" strokeWidth="2" />
              <text x={x(p.anio)} y={H - 8} textAnchor="middle" className="fill-texto-sec text-[11px]">
                {puntos.length > 5 && W < 420 && i % 2 === 1 ? "" : p.anio}
              </text>
              <circle
                cx={x(p.anio)}
                cy={y(p.valor)}
                r="16"
                fill="transparent"
                onPointerEnter={() => setFoco(i)}
                onPointerLeave={() => setFoco(null)}
              />
            </g>
          ))}
        </svg>
        {foco !== null && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-linea bg-superficie px-2 py-1 text-xs shadow-md"
            style={{ left: `${(x(puntos[foco].anio) / W) * 100}%`, top: `calc(${(y(puntos[foco].valor) / H) * 100}% - 26px)` }}
          >
            <span className="text-texto-sec">{puntos[foco].anio}</span> · <span className="font-semibold">{formatear(puntos[foco].valor)}%</span>
          </div>
        )}
      </div>
    </figure>
  );
}
