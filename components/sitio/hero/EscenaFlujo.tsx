"use client";

import { useState } from "react";
import { LienzoFlujo } from "@/components/sitio/flujo/LienzoFlujo";
import { Texto } from "@/components/Texto";
import type { Contenido } from "@/content/tipos";
import { FLUJOS } from "@/lib/flujos";

type Props = { c: Contenido["hero"]["flujo"]; tic: number; reducido: boolean };

/** Tics que dura cada flujo antes de pasar al siguiente. */
const TICS_POR_FLUJO = 4;

/** Escena 2: editor de automatizaciones con tres flujos de ejemplo y un punto de luz que los ejecuta. */
export function EscenaFlujo({ c, tic, reducido }: Props) {
  const [elegido, setElegido] = useState<number | null>(null);
  const auto = Math.floor(Math.min(tic, TICS_POR_FLUJO * 3 - 1) / TICS_POR_FLUJO);
  const actual = elegido ?? auto;
  const [vuelta, setVuelta] = useState(0);

  return (
    <div className="aparecer flex h-full flex-col overflow-hidden rounded-2xl border border-linea bg-superficie shadow-[0_24px_60px_-28px_rgba(11,21,48,0.4)]">
      <div className="flex shrink-0 items-center gap-2 border-b border-linea px-3 py-2">
        <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-md bg-seleccion text-acento-texto">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 6h4v4H5zM15 14h4v4h-4zM9 8h3a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" /></svg>
        </span>
        <div className="flex min-w-0 flex-1 flex-col leading-tight">
          <Texto valor={c.flujos[actual].nombre} className="truncate text-[13px] font-semibold" />
          <Texto valor={c.guardado} className="text-[10.5px] text-texto-sec" />
        </div>
        <span className="flex items-center gap-1.5 text-[11.5px] font-medium">
          <span aria-hidden="true" className="relative h-4 w-7 rounded-full bg-[#12A150]">
            <span className="absolute right-0.5 top-0.5 size-3 rounded-full bg-white shadow" />
          </span>
          <Texto valor={c.activo} className="hidden sm:inline" />
        </span>
        <button
          type="button"
          onClick={() => setVuelta((v) => v + 1)}
          className="ml-1 inline-flex items-center gap-1 rounded-md bg-primario-relleno px-2.5 py-1.5 text-[11.5px] font-semibold text-white hover:brightness-110"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
          <Texto valor={c.ejecutar} />
        </button>
      </div>
      <div role="tablist" aria-label={c.selector.texto} className="flex shrink-0 gap-1 overflow-x-auto border-b border-linea bg-suave px-2 pt-1.5">
        {c.flujos.map((f, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === actual}
            onClick={() => {
              setElegido(i);
              setVuelta((v) => v + 1);
            }}
            className={`shrink-0 whitespace-nowrap rounded-t-md border-x border-t px-2.5 py-1.5 text-[11.5px] font-medium ${
              i === actual ? "border-linea bg-superficie text-texto" : "border-transparent text-texto-sec hover:text-texto"
            }`}
          >
            <Texto valor={f.nombre} />
          </button>
        ))}
      </div>
      <div className="lienzo-flujo relative flex min-h-0 flex-1 items-center overflow-hidden px-2" role="tabpanel">
        <LienzoFlujo
          key={`${actual}-${vuelta}`}
          flujo={FLUJOS[actual]}
          nombres={c.flujos[actual].nodos}
          e={c}
          animar={!reducido}
          escalaMinima={0.56}
        />
      </div>
    </div>
  );
}
