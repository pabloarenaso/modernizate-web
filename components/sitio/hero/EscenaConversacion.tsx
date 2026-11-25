import { Texto } from "@/components/Texto";
import type { Contenido, Mensaje } from "@/content/tipos";

type Props = { c: Contenido["hero"]["conversacion"]; paso: number; escribiendo: boolean };

const avatares = ["#B8335A", "#8A6508", "#0B7671", "#5B3FD9"];
const puntosEtapa = ["#8A94A6", "#12A150", "#1F4FE0"];
const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter((p) => /\p{L}/u.test(p[0] ?? ""))
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

/** Escena 1: el cliente conversa con el asistente en su celular y agenda una hora. Datos ficticios. */
export function EscenaConversacion({ c, paso, escribiendo }: Props) {
  const mostrados = c.guion.slice(0, paso);
  const terminado = paso >= c.guion.length;
  const ultimo = [...mostrados].reverse().find((m): m is Exclude<Mensaje, { quien: "tarjeta" }> => m.quien !== "tarjeta");
  const resumen = escribiendo ? c.escribiendo : ultimo ? ultimo.texto : c.nueva;
  const t = c.telefono;

  return (
    <div className="aparecer relative flex h-full items-center justify-center gap-5">
      {/* Bandeja del negocio: solo en pantallas anchas, como tarjeta junto al celular. */}
      <div className="hidden w-[230px] shrink-0 overflow-hidden rounded-xl border border-linea bg-superficie shadow-[0_18px_40px_-24px_rgba(11,21,48,0.45)] xl:block">
        <Texto as="p" valor={c.bandeja} className="border-b border-linea px-3 py-2 text-xs font-semibold text-texto-sec" />
        <ul>
          {c.contactos.map((ct, i) => {
            const primero = i === 0;
            return (
              <li key={i} className={`flex items-center gap-2.5 border-b border-linea px-3 py-2.5 last:border-b-0 ${primero ? "bg-seleccion" : ""}`}>
                <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: avatares[i] }}>
                  {iniciales(ct.nombre.texto)}
                </span>
                <div className="flex min-w-0 flex-1 flex-col">
                  <Texto valor={ct.nombre} className="truncate text-xs font-semibold" />
                  <Texto valor={primero ? resumen : ct.ultimo} className="truncate text-[11px] text-texto-sec" />
                </div>
                <span
                  aria-hidden="true"
                  className="size-2 shrink-0 rounded-full"
                  style={{ background: primero ? (terminado ? "#12A150" : "#D9780A") : puntosEtapa[i - 1] }}
                />
              </li>
            );
          })}
        </ul>
      </div>

      {/* Celular */}
      <div className="telefono relative flex h-full max-h-[470px] w-[268px] shrink-0 flex-col overflow-hidden rounded-[38px] border-[9px] bg-suave shadow-[0_24px_60px_-24px_rgba(11,21,48,0.5)]">
        <div aria-hidden="true" className="absolute left-1/2 top-1.5 z-10 h-[18px] w-[84px] -translate-x-1/2 rounded-full bg-[var(--bisel)]" />
        <div className="flex h-8 shrink-0 items-end justify-between bg-superficie px-5 pb-0.5 text-[11px] font-semibold">
          <Texto valor={t.hora} />
          <span aria-hidden="true" className="flex items-center gap-1">
            <span className="h-2 w-3 rounded-[2px] border border-texto" />
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2.5 border-b border-linea bg-superficie px-3 py-2">
          <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-primario-relleno text-[11px] font-bold text-white">
            {iniciales(t.nombre.texto)}
          </span>
          <div className="flex min-w-0 flex-col leading-tight">
            <Texto valor={t.nombre} className="truncate text-[13px] font-semibold" />
            <Texto valor={escribiendo ? c.escribiendo : t.estado} className="truncate text-[11px] text-texto-sec" />
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-1.5 overflow-hidden px-2.5 py-2.5">
          {mostrados.map((m, i) =>
            m.quien === "tarjeta" ? (
              <div key={i} className="aparecer flex max-w-[86%] items-center gap-2 self-start rounded-2xl rounded-bl-md border border-burbuja-borde bg-ok-fondo px-3 py-2">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 text-ok-texto" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3" />
                </svg>
                <div className="flex flex-col text-[12px] leading-snug">
                  <Texto valor={c.tarjeta.titulo} className="font-semibold text-ok-texto" />
                  <Texto valor={c.tarjeta.detalle} className="text-texto" />
                </div>
              </div>
            ) : (
              <Texto
                key={i}
                as="p"
                valor={m.texto}
                className={`aparecer max-w-[86%] px-3 py-1.5 text-[12px] leading-snug text-texto ${
                  m.quien === "usuario"
                    ? "self-end rounded-2xl rounded-br-md border border-burbuja-borde bg-burbuja-entrante"
                    : "self-start rounded-2xl rounded-bl-md border border-linea bg-superficie"
                }`}
              />
            ),
          )}
          {escribiendo && (
            <div role="status" aria-label={c.escribiendo.texto} className="aparecer flex items-center gap-1 self-start rounded-2xl rounded-bl-md border border-linea bg-superficie px-3 py-2.5">
              <span className="punto-escribiendo block size-1.5 rounded-full bg-texto-sec" />
              <span className="punto-escribiendo block size-1.5 rounded-full bg-texto-sec [animation-delay:.15s]" />
              <span className="punto-escribiendo block size-1.5 rounded-full bg-texto-sec [animation-delay:.3s]" />
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2 border-t border-linea bg-superficie px-2.5 py-2">
          <Texto valor={t.escribir} className="flex-1 truncate rounded-full border border-linea px-3 py-1.5 text-[11px] text-texto-sec" />
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-full bg-primario-relleno text-white">
            <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
              <path d="M3 20.5 21 12 3 3.5v6.6L15 12 3 13.9z" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
