import type { ReactNode } from "react";
import { Ico, TRAZOS } from "./Ico";

/** Marco de navegador: semáforo, flechas (solo grande), barra de dirección con candado y el contenido debajo. */
export function Navegador({ dominio, mini, children, className = "" }: { dominio: ReactNode; mini?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border border-linea bg-superficie ${mini ? "h-full" : ""} shadow-[0_30px_60px_-30px_rgba(11,21,48,0.45)] ${className}`}>
      <div className="flex items-center gap-2 border-b border-linea bg-suave px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </span>
        {!mini && (
          <span className="hidden items-center gap-1 text-texto-sec @[560px]:flex">
            <Ico d={TRAZOS.atras} className="size-3.5" />
            <Ico d={TRAZOS.adelante} className="size-3.5 opacity-40" />
            <Ico d={TRAZOS.recargar} className="size-3.5" />
          </span>
        )}
        <span className="mx-auto flex min-w-0 max-w-[340px] flex-1 items-center justify-center gap-1.5 rounded-md bg-superficie px-3 py-1 text-[11.5px] text-texto-sec shadow-[inset_0_0_0_1px_var(--linea)]">
          <Ico d={TRAZOS.candado} className="size-3 shrink-0" />
          <span className="truncate text-texto">{dominio}</span>
        </span>
        <span aria-hidden="true" className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}
