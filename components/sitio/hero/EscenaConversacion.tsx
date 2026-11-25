import { Texto } from "@/components/Texto";
import type { Contenido, Mensaje } from "@/content/tipos";

type Props = { c: Contenido["hero"]["conversacion"]; paso: number; escribiendo: boolean };

const avatares = ["#B8335A", "#8A6508", "#0B7671", "#5B3FD9"];
const puntosEtapa = ["#8A94A6", "#12A150", "#1F4FE0"];
const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

/** Escena 1: bandeja con un asistente que conversa y agenda. Datos ficticios. */
export function EscenaConversacion({ c, paso, escribiendo }: Props) {
  const mostrados = c.guion.slice(0, paso);
  const terminado = paso >= c.guion.length;
  const ultimo = [...mostrados].reverse().find((m): m is Exclude<Mensaje, { quien: "tarjeta" }> => m.quien !== "tarjeta");
  const resumen = escribiendo ? c.escribiendo : ultimo ? ultimo.texto : c.nueva;

  return (
    <div className="flex min-h-0 flex-1">
      <ul className="hidden w-[38%] shrink-0 overflow-hidden border-r border-linea sm:block">
        {c.contactos.map((ct, i) => {
          const primero = i === 0;
          return (
            <li
              key={i}
              className={`flex gap-2.5 border-b border-linea p-3 ${primero ? "bg-seleccion shadow-[inset_3px_0_0_var(--primario)]" : ""}`}
            >
              <span
                aria-hidden="true"
                className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: avatares[i] }}
              >
                {iniciales(ct.nombre.texto)}
              </span>
              <div className="flex min-w-0 flex-col gap-1">
                <Texto valor={ct.nombre} className="text-[13px] font-semibold" />
                <Texto valor={primero ? resumen : ct.ultimo} className="truncate text-xs text-texto-sec" />
                <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-linea px-2 py-px text-[11px]">
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full"
                    style={{ background: primero ? (terminado ? "#12A150" : "#D9780A") : puntosEtapa[i - 1] }}
                  />
                  <Texto valor={primero && terminado ? c.clienteFinal : ct.etapa} />
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex min-w-0 flex-1 flex-col justify-end gap-2 overflow-hidden bg-suave px-4 py-3.5">
        {mostrados.map((m, i) =>
          m.quien === "tarjeta" ? (
            <div key={i} className="aparecer flex max-w-[82%] items-center gap-2.5 self-end rounded-[10px] border border-burbuja-borde bg-ok-fondo px-3 py-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-ok-texto" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />
              </svg>
              <div className="flex flex-col text-[13px] leading-snug">
                <Texto valor={c.tarjeta.titulo} className="font-semibold text-ok-texto" />
                <Texto valor={c.tarjeta.detalle} className="text-texto" />
              </div>
            </div>
          ) : (
            <Texto
              key={i}
              as="p"
              valor={m.texto}
              className={`aparecer max-w-[82%] rounded-[10px] border px-3 py-2 text-[13px] leading-normal text-texto ${
                m.quien === "usuario" ? "self-start border-burbuja-borde bg-burbuja-entrante" : "self-end border-linea bg-superficie"
              }`}
            />
          ),
        )}
        {escribiendo && (
          <div className="puntitos aparecer flex gap-1 self-end rounded-[10px] border border-linea bg-superficie px-3 py-3" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
      </div>
    </div>
  );
}
