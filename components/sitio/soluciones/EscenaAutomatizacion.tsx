"use client";

import { useState } from "react";
import { FlujoReact } from "@/components/sitio/flujo/FlujoReact";
import { LienzoFlujo } from "@/components/sitio/flujo/LienzoFlujo";
import { Texto } from "@/components/Texto";
import type { Contenido, EscenaAutomatizacionC } from "@/content/tipos";
import { useMovimientoReducido } from "@/hooks/useMovimientoReducido";
import { FLUJOS } from "@/lib/flujos";
import { useDisparo } from "./disparo";

type Props = { c: EscenaAutomatizacionC; flujos: Contenido["hero"]["flujo"]; tamano: "mini" | "grande" };

/** Escena "Automatización": el mismo editor del hero; en el panel, interactivo con React Flow. */
export function EscenaAutomatizacion({ c, flujos, tamano }: Props) {
  const disparo = useDisparo();
  const reducido = useMovimientoReducido();
  const [actual, setActual] = useState(0);

  if (tamano === "mini") {
    return (
      <div role="img" aria-label={c.descripcion.texto} className="lienzo-flujo flex aspect-[380/232] items-center px-2">
        <LienzoFlujo key={disparo} flujo={FLUJOS[0]} nombres={flujos.flujos[0].nodos} e={flujos} animar={disparo > 0 && !reducido} escalaMinima={0.2} />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-linea bg-superficie">
      <div role="tablist" aria-label={flujos.selector.texto} className="flex gap-1 overflow-x-auto border-b border-linea bg-suave px-2 pt-1.5">
        {flujos.flujos.map((f, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === actual}
            onClick={() => setActual(i)}
            className={`shrink-0 whitespace-nowrap rounded-t-md border-x border-t px-3 py-1.5 text-[12.5px] font-medium ${
              i === actual ? "border-linea bg-superficie text-texto" : "border-transparent text-texto-sec hover:text-texto"
            }`}
          >
            <Texto valor={f.nombre} />
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-label={c.descripcion.texto} className="lienzo-flujo h-[380px] sm:h-[440px]">
        <FlujoReact key={actual} flujo={FLUJOS[actual]} nombres={flujos.flujos[actual].nodos} e={flujos} animar={!reducido} />
      </div>
      <Texto as="p" valor={c.ayuda} className="border-t border-linea px-3 py-2 text-xs text-texto-sec" />
    </div>
  );
}
