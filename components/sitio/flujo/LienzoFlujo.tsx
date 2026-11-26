"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Texto } from "@/components/Texto";
import type { Texto as TextoC } from "@/content/tipos";
import { curva, horario, LIENZO, MEDIDAS, TRAMO, type Flujo, type Nodo } from "@/lib/flujos";
import { IconoFlujo } from "./IconoFlujo";

export type EtiquetasFlujo = { si: TextoC; no: TextoC; agente: TextoC; herramientas: TextoC };

type Props = {
  flujo: Flujo;
  nombres: TextoC[];
  e: EtiquetasFlujo;
  /** Sin animación: el flujo se ve ya ejecutado y quieto. */
  animar: boolean;
  /** Escala mínima; si el lienzo no cabe, la cámara sigue al punto de luz. */
  escalaMinima?: number;
};

export const colorTipo: Record<Nodo["tipo"], string> = {
  disparador: "#D9780A",
  si: "#0E9F9A",
  agente: "#6D4AFF",
  accion: "var(--primario)",
  herramienta: "#64748B",
};

/** Lienzo de automatización: nodos, conexiones y un punto de luz que recorre el camino ejecutado. */
export function LienzoFlujo({ flujo, nombres, e, animar, escalaMinima = 0.6 }: Props) {
  const caja = useRef<HTMLDivElement>(null);
  const [ancho, setAncho] = useState(0);
  useLayoutEffect(() => {
    const el = caja.current;
    if (!el) return;
    const ro = new ResizeObserver(([x]) => setAncho(x.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const escala = ancho ? Math.max(escalaMinima, Math.min(1.1, ancho / LIENZO.ancho)) : 0.6;
  const sobra = Math.max(0, LIENZO.ancho * escala - ancho);
  const { salidas, total, herramientas, lit } = encendidos(flujo);

  return (
    <div ref={caja} className={`relative w-full ${!animar && sobra ? "overflow-x-auto" : "overflow-hidden"}`} style={{ height: LIENZO.alto * escala }}>
      <div
        className={animar && sobra ? "paneo" : ""}
        style={{ "--pan": `${-sobra}px`, "--dur-pan": `${total}s`, width: LIENZO.ancho * escala } as CSSProperties}
      >
        <div className="relative origin-top-left" style={{ width: LIENZO.ancho, height: LIENZO.alto, transform: `scale(${escala})` }}>
          <svg aria-hidden="true" width={LIENZO.ancho} height={LIENZO.alto} className="absolute inset-0 overflow-visible">
            {flujo.conexiones.map((c, i) => (
              <path key={i} d={curva(flujo, c)} fill="none" stroke="var(--barra-suave)" strokeWidth={c.herramienta ? 1.6 : 2} strokeDasharray={c.herramienta ? "5 4" : undefined} />
            ))}
            {flujo.camino.map((ci, k) => (
              <path
                key={`c${ci}`}
                d={curva(flujo, flujo.conexiones[ci])}
                pathLength={1}
                fill="none"
                stroke="#12A150"
                strokeWidth="2.4"
                className={animar ? "paso-flujo trazo-ok" : ""}
                style={animar ? { animationDelay: `${salidas[k]}s`, animationDuration: `${TRAMO}s` } : undefined}
              />
            ))}
            {flujo.conexiones.map((c, i) => {
              const d = curva(flujo, c);
              const [, x1, y1] = /M([\d.]+) ([\d.]+)/.exec(d)!.map(Number);
              const fin = d.split(" ").slice(-2).map(Number);
              return (
                <g key={`p${i}`}>
                  <circle cx={x1} cy={y1} r="4" fill="var(--superficie)" stroke="var(--texto-sec)" strokeWidth="1.4" />
                  {!c.herramienta && <circle cx={fin[0]} cy={fin[1]} r="4" fill="var(--superficie)" stroke="var(--texto-sec)" strokeWidth="1.4" />}
                </g>
              );
            })}
          </svg>

          {flujo.nodos.map((n, i) => {
            const tam = n.tipo === "agente" ? { w: MEDIDAS.agenteAncho, h: MEDIDAS.agenteAlto } : n.tipo === "herramienta" ? { w: MEDIDAS.herramienta, h: MEDIDAS.herramienta } : { w: MEDIDAS.nodo, h: MEDIDAS.nodo };
            return (
              <div key={i} data-nodo className="absolute" style={{ left: n.x - tam.w / 2, top: n.y - tam.h / 2, width: tam.w, height: tam.h }}>
                <NodoFlujo n={n} nombre={nombres[i]} e={e} t={lit(i)} animar={animar} />
              </div>
            );
          })}

          {animar &&
            flujo.camino.map((ci, k) => (
              <span
                key={`d${ci}`}
                aria-hidden="true"
                className="punto-flujo"
                style={{ offsetPath: `path("${curva(flujo, flujo.conexiones[ci])}")`, animationDelay: `${salidas[k]}s`, animationDuration: `${TRAMO}s` }}
              />
            ))}
          {animar &&
            flujo.herramientasUsadas.map((ci) => (
              <span
                key={`h${ci}`}
                aria-hidden="true"
                className="punto-flujo punto-herramienta"
                style={{ offsetPath: `path("${curva(flujo, flujo.conexiones[ci])}")`, animationDelay: `${herramientas.get(flujo.conexiones[ci].a)}s`, animationDuration: "0.35s" }}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

/** Dibujo de un nodo (llena su caja). t: segundo en que se enciende; undefined si no se ejecuta. */
export function NodoFlujo({ n, nombre, e, t, animar }: { n: Nodo; nombre: TextoC; e: EtiquetasFlujo; t: number | undefined; animar: boolean }) {
  const estilo = animar && t !== undefined ? { animationDelay: `${t}s` } : undefined;
  const encendido = t !== undefined ? (animar ? "paso-flujo nodo-encender" : "nodo-encendido") : "";
  const insignia = t !== undefined && (
    <span
      className={`absolute -right-2 -top-2 z-10 flex size-5 items-center justify-center rounded-full bg-[#12A150] text-white ${animar ? "paso-flujo insignia-ok" : ""}`}
      style={estilo}
    >
      <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
    </span>
  );
  if (n.tipo === "agente") {
    return (
      <div className={`nodo-flujo relative flex size-full items-center gap-2.5 rounded-xl border-2 border-linea bg-superficie px-3 shadow-sm ${encendido}`} style={estilo}>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-lg" style={{ background: "rgba(109,74,255,.12)", color: colorTipo.agente }}>
          <IconoFlujo icono={n.icono} className="size-6" />
        </span>
        <span className="flex min-w-0 flex-col leading-tight">
          <Texto valor={e.agente} className="text-[11px] text-texto-sec" />
          <Texto valor={nombre} className="text-[13.5px] font-semibold leading-tight" />
        </span>
        {insignia}
        <Texto valor={e.herramientas} className="absolute left-1/2 top-full ml-2 mt-1.5 whitespace-nowrap text-[10.5px] italic text-texto-sec" />
      </div>
    );
  }
  return (
    <div className="relative size-full">
      <div
        className={`nodo-flujo relative flex size-full items-center justify-center border-2 border-linea bg-superficie shadow-sm ${encendido} ${
          n.tipo === "herramienta" ? "rounded-full" : n.tipo === "disparador" ? "rounded-[14px] rounded-l-[34px]" : "rounded-[14px]"
        }`}
        style={{ color: colorTipo[n.tipo], ...estilo }}
      >
        <IconoFlujo icono={n.icono} className={n.tipo === "herramienta" ? "size-6" : "size-8"} />
        {n.tipo === "disparador" && (
          <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute -left-5 top-1/2 size-4 -translate-y-1/2 text-[#D9780A]" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>
        )}
        {insignia}
      </div>
      {n.tipo === "si" && (
        <>
          <Texto valor={e.si} className="absolute left-full top-[8px] ml-2 rounded bg-suave px-1 text-[11.5px] font-medium text-texto-sec" />
          <Texto valor={e.no} className="absolute left-full top-[46px] ml-2 rounded bg-suave px-1 text-[11.5px] font-medium text-texto-sec" />
        </>
      )}
      <Texto
        valor={nombre}
        className={`absolute left-1/2 top-full mt-2 w-[112px] -translate-x-1/2 text-center font-medium leading-tight ${n.tipo === "herramienta" ? "text-[12px] text-texto-sec" : "text-[13px]"}`}
      />
    </div>
  );
}

/** Momento en que se enciende cada nodo (camino ejecutado y herramientas usadas por el agente). */
export function encendidos(flujo: Flujo) {
  const h = horario(flujo);
  const llegadaAgente = [...h.llegadas.entries()].find(([n]) => flujo.nodos[n].tipo === "agente")?.[1] ?? 0;
  const herramientas = new Map(flujo.herramientasUsadas.map((c, k) => [flujo.conexiones[c].a, llegadaAgente + 0.1 + k * 0.3]));
  const lit = (i: number) => h.llegadas.get(i) ?? (herramientas.has(i) ? herramientas.get(i)! + 0.35 : undefined);
  return { ...h, herramientas, lit };
}
