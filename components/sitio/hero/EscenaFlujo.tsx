"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Texto } from "@/components/Texto";
import type { Contenido } from "@/content/tipos";

type Props = { c: Contenido["hero"]["flujo"]; enMovimiento: boolean; reducido: boolean };
type IdNodo = keyof Contenido["hero"]["flujo"]["nodos"];
type Ruta = "si" | "no";
type Nodo = { id: IdNodo; x: number; y: number; w: number };
type Diseno = {
  vista: string;
  nodos: Nodo[];
  rutas: Record<Ruta, string>;
  etiquetas: { si: [number, number]; no: [number, number] };
  horizontal: boolean;
};

/** Lienzo horizontal (pantallas anchas) y vertical (celular), estilo editor de flujos. */
const disenos: Record<"h" | "v", Diseno> = {
  h: {
    vista: "0 0 760 340",
    horizontal: true,
    nodos: [
      { id: "formulario", x: 122, y: 170, w: 204 },
      { id: "urgente", x: 312, y: 170, w: 150 },
      { id: "avisar", x: 505, y: 78, w: 180 },
      { id: "ficha", x: 505, y: 262, w: 150 },
      { id: "registrar", x: 680, y: 170, w: 140 },
    ],
    rutas: {
      si: "M122 170 L312 170 C372 170 415 78 505 78 C590 78 620 170 680 170",
      no: "M122 170 L312 170 C372 170 415 262 505 262 C590 262 620 170 680 170",
    },
    etiquetas: { si: [392, 108], no: [392, 248] },
  },
  v: {
    vista: "0 0 360 450",
    horizontal: false,
    nodos: [
      { id: "formulario", x: 180, y: 40, w: 212 },
      { id: "urgente", x: 180, y: 140, w: 156 },
      { id: "avisar", x: 92, y: 262, w: 172 },
      { id: "ficha", x: 270, y: 262, w: 150 },
      { id: "registrar", x: 180, y: 384, w: 150 },
    ],
    rutas: {
      si: "M180 40 L180 140 C120 140 92 190 92 262 C92 330 150 335 180 384",
      no: "M180 40 L180 140 C240 140 270 190 270 262 C270 330 210 335 180 384",
    },
    etiquetas: { si: [104, 196], no: [240, 196] },
  },
};
const H = 52;
const nodosRuta: Record<Ruta, IdNodo[]> = { si: ["formulario", "urgente", "avisar", "registrar"], no: ["formulario", "urgente", "ficha", "registrar"] };
const tonos: Record<IdNodo, string> = {
  formulario: "var(--graf-1)",
  urgente: "var(--graf-2)",
  avisar: "var(--graf-4)",
  ficha: "var(--graf-3)",
  registrar: "#12A150",
};
const iconos: Record<IdNodo, string> = {
  formulario: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  urgente: "M12 3v6M12 9l-6 6M12 9l6 6M6 15v6M18 15v6",
  avisar: "M6 9a6 6 0 1 1 12 0c0 6 3 8 3 8H3s3-2 3-8M10 21h4",
  ficha: "M3 4h18v16H3zM3 10h18M9 4v16",
  registrar: "M20 6 9 17l-5-5",
};
const DURACION = 3200;
const PAUSA = 1100;

/** Escena 2: lienzo de automatización. Un punto de luz recorre los conectores y enciende cada nodo al pasar. */
export function EscenaFlujo({ c, enMovimiento, reducido }: Props) {
  const caja = useRef<HTMLDivElement>(null);
  const [orientacion, setOrientacion] = useState<"h" | "v">("h");
  const [ruta, setRuta] = useState<Ruta>("no");
  const [encendidos, setEncendidos] = useState<IdNodo[]>([]);
  const [terminado, setTerminado] = useState(false);
  const punto = useRef<SVGCircleElement>(null);
  const caminos = useRef<Record<Ruta, SVGPathElement | null>>({ si: null, no: null });
  const d = disenos[orientacion];

  useLayoutEffect(() => {
    const el = caja.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setOrientacion(e.contentRect.width >= 700 ? "h" : "v"));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (reducido || !enMovimiento) return;
    const camino = caminos.current[ruta];
    if (!camino) return;
    const largo = camino.getTotalLength();
    // Largo del camino en que el punto alcanza cada nodo (el punto más cercano a su centro).
    const muestras = Array.from({ length: 200 }, (_, i) => {
      const l = (i / 199) * largo;
      return { l, p: camino.getPointAtLength(l) };
    });
    const hitos = nodosRuta[ruta].map((id) => {
      const n = d.nodos.find((x) => x.id === id)!;
      return { id, l: muestras.reduce((a, m) => (Math.hypot(m.p.x - n.x, m.p.y - n.y) < Math.hypot(a.p.x - n.x, a.p.y - n.y) ? m : a)).l };
    });
    let inicio: number | null = null;
    let raf = 0;
    let espera = 0;
    let ultimo = -1;
    const cuadro = (t: number) => {
      inicio ??= t;
      const avance = Math.min((t - inicio) / DURACION, 1);
      const l = avance * largo;
      const p = camino.getPointAtLength(l);
      punto.current?.setAttribute("cx", String(p.x));
      punto.current?.setAttribute("cy", String(p.y));
      const alcanzados = hitos.filter((h) => l >= h.l - 1).length;
      if (alcanzados !== ultimo) {
        ultimo = alcanzados;
        setEncendidos(hitos.slice(0, alcanzados).map((h) => h.id));
      }
      if (avance < 1) raf = requestAnimationFrame(cuadro);
      else {
        setTerminado(true);
        espera = window.setTimeout(() => {
          setTerminado(false);
          setEncendidos([]);
          setRuta((r) => (r === "si" ? "no" : "si"));
        }, PAUSA);
      }
    };
    raf = requestAnimationFrame(cuadro);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(espera);
    };
  }, [ruta, enMovimiento, reducido, d]);

  const activos = reducido ? nodosRuta.no : encendidos;
  const listo = reducido || terminado;

  return (
    <div ref={caja} className="lienzo-flujo aparecer relative flex h-full items-center justify-center overflow-hidden rounded-2xl border border-linea p-3">
      <svg viewBox={d.vista} className="h-full max-h-full w-full" role="img" aria-labelledby="flujo-desc">
        <desc id="flujo-desc">
          {[c.nodos.formulario, c.nodos.urgente, c.nodos.avisar, c.nodos.ficha, c.nodos.registrar].map((t) => t.texto).join(" → ")}
        </desc>
        {(["si", "no"] as const).map((r) => {
          const actual = r === ruta || reducido;
          return (
            <path
              key={r}
              ref={(el) => {
                caminos.current[r] = el;
              }}
              d={d.rutas[r]}
              fill="none"
              stroke={actual ? "var(--primario)" : "var(--texto-sec)"}
              strokeOpacity={actual ? 0.55 : 0.3}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}
        {!reducido && <circle ref={punto} r="7" cx={d.nodos[0].x} cy={d.nodos[0].y} fill="var(--primario)" className="punto-luz" />}
        {(["si", "no"] as const).map((r) => (
          <text key={r} data-estado={c[r].estado} x={d.etiquetas[r][0]} y={d.etiquetas[r][1]} textAnchor="middle" className="fill-texto-sec text-[13px] font-semibold">
            {c[r].texto}
          </text>
        ))}
        {d.nodos.map((n) => {
          const on = activos.includes(n.id);
          const x0 = n.x - n.w / 2;
          const entrada = d.horizontal ? [x0, n.y] : [n.x, n.y - H / 2];
          const salida = d.horizontal ? [x0 + n.w, n.y] : [n.x, n.y + H / 2];
          return (
            <g key={n.id}>
              <rect
                x={x0}
                y={n.y - H / 2}
                width={n.w}
                height={H}
                rx="12"
                fill="var(--superficie)"
                stroke={on ? tonos[n.id] : "var(--linea)"}
                strokeWidth={on ? 2.5 : 1.5}
                className="nodo-flujo"
              />
              <rect x={x0 + 10} y={n.y - 15} width="30" height="30" rx="8" fill={tonos[n.id]} opacity={on ? 1 : 0.85} />
              <svg x={x0 + 16} y={n.y - 9} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d={iconos[n.id]} />
              </svg>
              <text data-estado={c.nodos[n.id].estado} x={x0 + 50} y={n.y + 5} className="fill-texto text-[14px] font-semibold">
                {c.nodos[n.id].texto}
              </text>
              {n.id !== "formulario" && <circle cx={entrada[0]} cy={entrada[1]} r="4" fill="var(--superficie)" stroke="var(--texto-sec)" strokeWidth="1.5" />}
              {n.id !== "registrar" && <circle cx={salida[0]} cy={salida[1]} r="4" fill="var(--texto-sec)" />}
              {n.id === "formulario" && (
                <g transform={d.horizontal ? `translate(${x0 - 14} ${n.y - 9})` : `translate(${x0 - 16} ${n.y - 9})`}>
                  <path d="M10 0 2 10h5l-1 8 8-10H9z" fill="var(--graf-2)" />
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <div className="pointer-events-none absolute bottom-3 right-3 flex flex-col items-end gap-2 text-xs">
        {listo && <Texto valor={c.ejecutado} className="aparecer rounded-lg border border-burbuja-borde bg-ok-fondo px-3 py-1.5 font-medium text-ok-texto shadow-sm" />}
        {(activos.includes("ficha") || reducido) && (
          <Texto valor={c.fichaCreada} className="aparecer rounded-lg border border-linea bg-superficie px-3 py-1.5 font-medium text-texto shadow-sm" />
        )}
      </div>
    </div>
  );
}
