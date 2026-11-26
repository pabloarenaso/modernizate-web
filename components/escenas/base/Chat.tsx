import type { ReactNode } from "react";
import { Texto } from "@/components/Texto";
import type { Texto as TextoC } from "@/content/tipos";

/** Burbuja de chat genérica (colores en variables --chat-*, día y noche). Enviada: con doble check que se pone azul (.checks). */
export function Burbuja({ t, enviada, hora, children }: { t: TextoC; enviada?: boolean; hora: string; children?: ReactNode }) {
  return (
    <div
      className={`burbuja aparecer flex max-w-[86%] shrink-0 flex-col rounded-lg px-2 pb-1 pt-1.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${
        enviada ? "burbuja-enviada self-end bg-[var(--chat-enviada)]" : "burbuja-recibida self-start bg-[var(--chat-recibida)]"
      }`}
    >
      <Texto as="p" valor={t} className="text-[11.5px] leading-[1.35]" />
      {children}
      <span className={`-mt-0.5 flex items-center gap-1 self-end text-[9.5px] tabular-nums ${enviada ? "text-[var(--chat-enviada-sec)]" : "text-[var(--chat-texto-sec)]"}`}>
        {hora}
        {enviada && (
          <svg aria-hidden="true" viewBox="0 0 18 11" className="checks h-[9px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 6l3 3 6-7M7 8.5l1 .5 6-7" />
          </svg>
        )}
      </span>
    </div>
  );
}

/** Indicador "escribiendo…" con tres puntos. */
export function Escribiendo() {
  return (
    <div className="burbuja burbuja-recibida aparecer flex shrink-0 items-center gap-1 self-start rounded-lg bg-[var(--chat-recibida)] px-3 py-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
      {[0, 0.15, 0.3].map((d) => (
        <span key={d} className="punto-escribiendo block size-1.5 rounded-full bg-[var(--chat-texto-sec)]" style={{ animationDelay: `${d}s` }} />
      ))}
    </div>
  );
}

