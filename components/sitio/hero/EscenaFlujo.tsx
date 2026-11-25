"use client";

import { useEffect, useRef, useState } from "react";
import { Texto } from "@/components/Texto";
import type { Contenido } from "@/content/tipos";

type Props = { c: Contenido["hero"]["flujo"]; enMovimiento: boolean; reducido: boolean };

type IdNodo = keyof Contenido["hero"]["flujo"]["nodos"];
const nodos: { id: IdNodo; x: number; y: number; w: number; tono: string }[] = [
  { id: "formulario", x: 240, y: 46, w: 190, tono: "var(--graf-1)" },
  { id: "urgente", x: 240, y: 132, w: 150, tono: "var(--graf-2)" },
  { id: "avisar", x: 112, y: 244, w: 184, tono: "var(--graf-4)" },
  { id: "ficha", x: 362, y: 244, w: 212, tono: "var(--graf-3)" },
  { id: "registrar", x: 240, y: 344, w: 190, tono: "var(--graf-1)" },
];
const H = 44;
const rutas = {
  si: "M240 46 L240 132 C176 132 112 160 112 244 C112 304 200 304 240 344",
  no: "M240 46 L240 132 C304 132 362 160 362 244 C362 304 280 304 240 344",
};
const nodosRuta = { si: ["formulario", "urgente", "avisar", "registrar"], no: ["formulario", "urgente", "ficha", "registrar"] } as const;
const DURACION = 3200;
const PAUSA = 1100;

/** Escena 2: flujo de automatización hecho en SVG; un punto de luz recorre los conectores y enciende cada nodo. */
export function EscenaFlujo({ c, enMovimiento, reducido }: Props) {
  const [ruta, setRuta] = useState<"si" | "no">("no");
  const [encendidos, setEncendidos] = useState<IdNodo[]>(reducido ? [...nodosRuta.no] : []);
  const [terminado, setTerminado] = useState(reducido);
  const punto = useRef<SVGCircleElement>(null);
  const caminos = useRef<Record<"si" | "no", SVGPathElement | null>>({ si: null, no: null });

  useEffect(() => {
    if (reducido || !enMovimiento) return;
    const camino = caminos.current[ruta];
    if (!camino) return;
    const largo = camino.getTotalLength();
    const centros = nodosRuta[ruta].map((id) => nodos.find((n) => n.id === id)!);
    let inicio: number | null = null;
    let raf = 0;
    let ultimo = -1;
    const cuadro = (t: number) => {
      inicio ??= t;
      const avance = Math.min((t - inicio) / DURACION, 1);
      const p = camino.getPointAtLength(avance * largo);
      punto.current?.setAttribute("cx", String(p.x));
      punto.current?.setAttribute("cy", String(p.y));
      const alcanzados = centros.filter((n) => p.y >= n.y - 2).length;
      if (alcanzados !== ultimo) {
        ultimo = alcanzados;
        setEncendidos(centros.slice(0, alcanzados).map((n) => n.id));
      }
      if (avance < 1) raf = requestAnimationFrame(cuadro);
      else {
        setTerminado(true);
        raf = window.setTimeout(() => {
          setTerminado(false);
          setEncendidos([]);
          setRuta((r) => (r === "si" ? "no" : "si"));
        }, PAUSA) as unknown as number;
      }
    };
    raf = requestAnimationFrame(cuadro);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(raf);
    };
  }, [ruta, enMovimiento, reducido]);

  const fichaLista = encendidos.includes("ficha");

  return (
    <div className="aparecer relative flex min-h-0 flex-1 items-center justify-center bg-suave p-2">
      <svg viewBox="0 0 480 392" className="h-full max-h-full w-full" role="img" aria-labelledby="flujo-desc">
        <desc id="flujo-desc">
          {[c.nodos.formulario, c.nodos.urgente, c.nodos.avisar, c.nodos.ficha, c.nodos.registrar].map((t) => t.texto).join(" → ")}
        </desc>
        {(["si", "no"] as const).map((r) => (
          <path
            key={r}
            ref={(el) => {
              caminos.current[r] = el;
            }}
            d={rutas[r]}
            fill="none"
            stroke={r === ruta || reducido ? "var(--primario)" : "var(--linea)"}
            strokeOpacity={r === ruta || reducido ? 0.45 : 1}
            strokeWidth="2"
            strokeDasharray="5 5"
          />
        ))}
        {!reducido && <circle ref={punto} r="6" cx="240" cy="46" fill="var(--primario)" style={{ filter: "drop-shadow(0 0 6px var(--primario))" }} />}
        <text data-estado={c.si.estado} x="164" y="168" className="fill-texto-sec text-[13px] font-semibold">
          {c.si.texto}
        </text>
        <text data-estado={c.no.estado} x="300" y="168" className="fill-texto-sec text-[13px] font-semibold">
          {c.no.texto}
        </text>
        {nodos.map((n) => {
          const on = encendidos.includes(n.id);
          return (
            <g key={n.id}>
              <rect
                x={n.x - n.w / 2}
                y={n.y - H / 2}
                width={n.w}
                height={H}
                rx="10"
                fill="var(--superficie)"
                stroke={on ? n.tono : "var(--linea)"}
                strokeWidth={on ? 2 : 1}
                style={{ transition: "stroke .3s ease" }}
              />
              <rect x={n.x - n.w / 2 + 10} y={n.y - 9} width="18" height="18" rx="5" fill={n.tono} opacity={on ? 1 : 0.35} style={{ transition: "opacity .3s ease" }} />
              <text data-estado={c.nodos[n.id].estado} x={n.x - n.w / 2 + 36} y={n.y + 5} className="fill-texto text-[14px] font-medium">
                {c.nodos[n.id].texto}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-x-3 top-3 flex flex-col items-end gap-2 text-xs">
        {terminado && (
          <Texto valor={c.ejecutado} className="aparecer rounded-lg border border-burbuja-borde bg-ok-fondo px-3 py-1.5 font-medium text-ok-texto shadow-sm" />
        )}
        {(fichaLista || reducido) && (
          <Texto valor={c.fichaCreada} className="aparecer rounded-lg border border-linea bg-superficie px-3 py-1.5 font-medium text-texto shadow-sm" />
        )}
      </div>
    </div>
  );
}
