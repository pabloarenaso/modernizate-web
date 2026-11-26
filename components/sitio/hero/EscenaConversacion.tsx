import { Texto } from "@/components/Texto";
import type { Contenido, Mensaje } from "@/content/tipos";
import { Telefono } from "@/components/escenas/base/Telefono";

type Props = { c: Contenido["hero"]["conversacion"]; paso: number; escribiendo: boolean; redactando: boolean };

const avatares = ["#B8335A", "#8A6508", "#0B7671", "#5B3FD9"];
const etapas = [
  { punto: "#D9780A", fondo: "rgba(217,120,10,.12)" },
  { punto: "#8A94A6", fondo: "rgba(138,148,166,.14)" },
  { punto: "#12A150", fondo: "rgba(18,161,80,.12)" },
  { punto: "#1F4FE0", fondo: "rgba(31,79,224,.12)" },
];
const iniciales = (nombre: string) =>
  nombre
    .split(/\s+/)
    .filter((p) => /\p{L}/u.test(p[0] ?? ""))
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
/** Hora ficticia de cada mensaje: desde las 10:20, un minuto cada dos mensajes. */
const horaMensaje = (i: number) => {
  const m = 20 + Math.floor(i / 2);
  return `10:${String(m).padStart(2, "0")}`;
};

type Texto = Exclude<Mensaje, { quien: "tarjeta" }>;

function Icono({ d, className = "size-[18px]" }: { d: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/** Escena 1: bandeja del negocio con estados y, al lado, el celular del cliente conversando con el asistente. */
export function EscenaConversacion({ c, paso, escribiendo, redactando }: Props) {
  const mostrados = c.guion.slice(0, paso);
  const terminado = paso >= c.guion.length;
  const conTarjeta = mostrados.some((m) => m.quien === "tarjeta");
  const textos = mostrados.map((m, i) => ({ m, i })).filter((x): x is { m: Texto; i: number } => x.m.quien !== "tarjeta");
  const ultimo = textos.at(-1)?.m;
  const resumen = escribiendo ? c.escribiendo : ultimo ? ultimo.texto : c.nueva;
  const siguiente = c.guion[paso];
  const borrador = redactando && siguiente && siguiente.quien === "usuario" ? siguiente.texto.texto : "";
  const t = c.telefono;

  return (
    <div className="aparecer relative flex h-full items-center justify-center lg:justify-end">
      {/* Bandeja del negocio (como en la maqueta): solo en pantallas anchas. */}
      <div className="absolute left-0 top-1/2 hidden w-[300px] -translate-y-1/2 xl:w-[340px] overflow-hidden rounded-xl border border-linea bg-superficie shadow-[0_24px_50px_-26px_rgba(11,21,48,0.45)] lg:block">
        <div className="flex items-center justify-between border-b border-linea px-3.5 py-2.5">
          <Texto valor={c.bandeja} className="text-[13px] font-semibold" />
          <span className="rounded-full bg-seleccion px-2 py-0.5 text-[11px] font-semibold text-acento-texto">{c.contactos.length}</span>
        </div>
        <ul>
          {c.contactos.map((ct, i) => {
            const primero = i === 0;
            const etapa = primero && terminado ? etapas[2] : etapas[i];
            return (
              <li key={i} className={`flex gap-2.5 border-b border-linea px-3.5 py-3 last:border-b-0 ${primero ? "bg-seleccion shadow-[inset_3px_0_0_var(--primario)]" : ""}`}>
                <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: avatares[i] }}>
                  {iniciales(ct.nombre.texto)}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <Texto valor={ct.nombre} className="truncate text-[13px] font-semibold" />
                    <Texto valor={ct.hora} className="shrink-0 text-[11px] text-texto-sec" />
                  </div>
                  <Texto valor={primero ? resumen : ct.ultimo} className="truncate text-xs text-texto-sec" />
                  <span className="inline-flex items-center gap-1.5 self-start rounded-full px-2 py-px text-[11px] font-medium" style={{ background: etapa.fondo }}>
                    <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: etapa.punto }} />
                    <Texto valor={primero && terminado ? c.clienteFinal : ct.etapa} />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Telefono hora={t.hora} bateria={t.bateria} className="relative z-10 lg:mr-2">
        {/* Notificación de la hora agendada: baja desde arriba de la pantalla. */}
        {conTarjeta && (
          <div className="notificacion absolute inset-x-2 top-[40px] z-20 flex items-start gap-2 rounded-2xl bg-[var(--chat-recibida)]/95 p-2.5 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] backdrop-blur">
            <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#E5484D] text-white">
              <Icono d="M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z" className="size-[17px]" />
            </span>
            <div className="min-w-0 flex-1 text-[11.5px] leading-snug">
              <div className="flex items-baseline justify-between gap-2 text-[10.5px] text-[var(--chat-texto-sec)]">
                <Texto valor={t.app} className="uppercase tracking-wide" />
                <Texto valor={t.ahora} />
              </div>
              <Texto as="p" valor={c.tarjeta.titulo} className="font-semibold" />
              <Texto as="p" valor={c.tarjeta.detalle} className="text-[var(--chat-texto-sec)]" />
            </div>
          </div>
        )}
        {/* Cabecera del chat */}
        <div className="flex shrink-0 items-center gap-2 border-b border-black/5 bg-[var(--chat-cabecera)] px-2 pb-2 pt-1">
          <Icono d="M15 5l-7 7 7 7" className="size-[18px] text-[var(--chat-leido)]" />
          <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#3D6BFF] to-[#14287A] text-[11px] font-bold text-white">
            {iniciales(t.nombre.texto)}
          </span>
          <div className="flex min-w-0 flex-1 flex-col leading-tight">
            <Texto valor={t.nombre} className="truncate text-[12.5px] font-semibold" />
            <Texto valor={escribiendo ? c.escribiendo : t.estado} className={`truncate text-[10.5px] ${escribiendo ? "text-[var(--chat-verde)]" : "text-[var(--chat-texto-sec)]"}`} />
          </div>
          <span className="flex items-center gap-2.5 text-[var(--chat-texto-sec)]">
            <Icono d="M15 10l5-3v10l-5-3M3 7h12v10H3z" className="size-[17px]" />
            <Icono d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" className="size-[15px]" />
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[15px]" fill="currentColor"><circle cx="12" cy="5" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="12" cy="19" r="1.8" /></svg>
          </span>
        </div>
        {/* Conversación: los mensajes no se encogen (shrink-0); los más antiguos salen por arriba. */}
        <div className="chat-papel flex min-h-0 flex-1 flex-col justify-end gap-1 overflow-hidden px-2.5 pb-2 pt-2">
          <Texto
            valor={t.hoy}
            className="mb-1 shrink-0 self-center rounded-md bg-[var(--chat-recibida)] px-2 py-0.5 text-[10.5px] font-medium text-[var(--chat-texto-sec)] shadow-sm"
          />
          {textos.map(({ m, i }) => {
            const enviado = m.quien === "usuario";
            return (
              <div
                key={i}
                className={`burbuja aparecer flex max-w-[84%] shrink-0 flex-col rounded-lg px-2 pb-1 pt-1.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${
                  enviado ? "burbuja-enviada self-end bg-[var(--chat-enviada)]" : "burbuja-recibida self-start bg-[var(--chat-recibida)]"
                }`}
              >
                <Texto as="p" valor={m.texto} className="text-[11.5px] leading-[1.35]" />
                <span className={`-mt-0.5 flex items-center gap-1 self-end text-[9.5px] tabular-nums ${enviado ? "text-[var(--chat-enviada-sec)]" : "text-[var(--chat-texto-sec)]"}`}>
                  {horaMensaje(i)}
                  {enviado && (
                    <svg aria-hidden="true" viewBox="0 0 18 11" className="checks h-[9px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 6l3 3 6-7M7 8.5l1 .5 6-7" />
                    </svg>
                  )}
                </span>
              </div>
            );
          })}
          {escribiendo && (
            <div role="status" aria-label={c.escribiendo.texto} className="burbuja burbuja-recibida aparecer flex shrink-0 items-center gap-1 self-start rounded-lg bg-[var(--chat-recibida)] px-3 py-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]">
              <span className="punto-escribiendo block size-1.5 rounded-full bg-[var(--chat-texto-sec)]" />
              <span className="punto-escribiendo block size-1.5 rounded-full bg-[var(--chat-texto-sec)] [animation-delay:.15s]" />
              <span className="punto-escribiendo block size-1.5 rounded-full bg-[var(--chat-texto-sec)] [animation-delay:.3s]" />
            </div>
          )}
        </div>
        {/* Barra inferior */}
        <div className="flex shrink-0 items-center gap-1.5 bg-[var(--chat-cabecera)] px-2 pb-4 pt-1.5">
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-full bg-[var(--chat-recibida)] px-2.5 py-1.5 text-[var(--chat-texto-sec)] shadow-sm">
            <Icono d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8.5 14a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01" className="size-[15px] shrink-0" />
            <span className={`min-w-0 flex-1 truncate text-[11px] ${borrador ? "text-[var(--chat-texto)]" : ""}`}>{borrador || t.escribir.texto}</span>
            <Icono d="M21 11l-8.5 8.5a5 5 0 0 1-7-7L14 4a3.3 3.3 0 0 1 4.7 4.7L10 17.4a1.7 1.7 0 0 1-2.4-2.4L15.5 7" className="size-[14px] shrink-0" />
            {!borrador && <Icono d="M4 8h3l2-3h6l2 3h3v11H4zM12 17a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" className="size-[14px] shrink-0" />}
          </div>
          <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--chat-verde)] text-white">
            {borrador ? (
              <svg viewBox="0 0 24 24" className="size-4" fill="currentColor"><path d="M3 20.5 21 12 3 3.5v6.6L15 12 3 13.9z" /></svg>
            ) : (
              <Icono d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zM6 11a6 6 0 0 0 12 0M12 17v4" className="size-4" />
            )}
          </span>
        </div>
      </Telefono>
    </div>
  );
}
