import { LienzoFlujo } from "@/components/sitio/flujo/LienzoFlujo";
import { Texto } from "@/components/Texto";
import type { Contenido } from "@/content/tipos";
import { FLUJOS } from "@/lib/flujos";

type Props = { c: Contenido["hero"]["flujo"]; tic: number; reducido: boolean };

/** Tics (1,2 s) que dura cada flujo: alcanza para el recorrido completo del punto de luz y para leer los nodos. */
export const TICS_POR_FLUJO = 7;

/** Escena 2: un flujo de automatización a la vez, con su título grande que entra desde el costado e indicador "1 de 3". */
export function EscenaFlujo({ c, tic, reducido }: Props) {
  const actual = Math.floor(Math.min(tic, TICS_POR_FLUJO * 3 - 1) / TICS_POR_FLUJO);
  return (
    <div className="aparecer flex h-full flex-col overflow-hidden rounded-2xl border border-linea bg-superficie shadow-[0_24px_60px_-28px_rgba(11,21,48,0.4)]">
      <div className="flex shrink-0 items-end justify-between gap-3 px-5 pb-1 pt-4">
        <Texto key={actual} as="p" valor={c.flujos[actual].nombre} className="titulo-flujo font-display text-[22px] font-bold leading-tight sm:text-[26px]" />
        <span className="flex shrink-0 items-center gap-1.5 pb-1.5" aria-hidden="true">
          {c.flujos.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === actual ? "w-5 bg-primario" : "w-1.5 bg-linea"}`} />
          ))}
          <span className="ml-1 text-[11px] font-semibold tabular-nums text-texto-sec">
            {actual + 1}/{c.flujos.length}
          </span>
        </span>
      </div>
      <div className="lienzo-flujo relative flex min-h-0 flex-1 items-center overflow-hidden px-2">
        <LienzoFlujo key={actual} flujo={FLUJOS[actual]} nombres={c.flujos[actual].nodos} e={c} animar={!reducido} escalaMinima={0.62} />
      </div>
    </div>
  );
}
