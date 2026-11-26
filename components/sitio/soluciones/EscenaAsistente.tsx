"use client";

import { useEffect, useState } from "react";
import { Telefono } from "@/components/escenas/base/Telefono";
import { Texto } from "@/components/Texto";
import type { EscenaAsistenteC } from "@/content/tipos";
import { useDisparo } from "./disparo";
import { Burbuja, Escribiendo } from "@/components/escenas/base/Chat";
import { Escalar } from "@/components/escenas/base/Escalar";

type Props = { c: EscenaAsistenteC; tamano: "mini" | "grande" };

/** Pasos de la conversación: 1 cliente, 2 escribiendo, 3 horarios, 4 elige, 5 escribiendo, 6 confirmación y cita. */
const FINAL = 6;
const TIEMPOS = [250, 950, 1900, 2900, 3500, 4400];

function TarjetaCita({ c, ajustar }: { c: EscenaAsistenteC; ajustar?: boolean }) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-linea bg-superficie p-3 shadow-[0_18px_40px_-18px_rgba(11,21,48,0.5)]">
      <span aria-hidden="true" className="flex size-9 shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg border border-linea text-center leading-none">
        <span className="w-full bg-[#E5484D] py-[2px] text-[7px] font-bold uppercase text-white">{c.cita.detalle.texto.slice(0, 3)}</span>
        <span className="flex-1 pt-0.5 text-[13px] font-bold">26</span>
      </span>
      <div className="min-w-0 leading-tight">
        <Texto as="p" valor={c.cita.titulo} className="text-[13px] font-semibold" />
        <Texto as="p" valor={c.cita.detalle} className={`mt-0.5 text-[12px] text-texto-sec ${ajustar ? "" : "whitespace-nowrap"}`} />
      </div>
    </div>
  );
}

/** Escena "Asistente de atención": conversación en el celular, horarios en botones y la cita que entra a la agenda. */
export function EscenaAsistente({ c, tamano }: Props) {
  const disparo = useDisparo();
  const [paso, setPaso] = useState(FINAL);
  const mini = tamano === "mini";

  useEffect(() => {
    if (disparo < 1 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ts = [setTimeout(() => setPaso(0), 0), ...TIEMPOS.map((t, i) => setTimeout(() => setPaso(i + 1), t))];
    return () => ts.forEach(clearTimeout);
  }, [disparo]);

  const chat = (
    <div className={`chat-papel flex min-h-0 flex-1 flex-col gap-1.5 overflow-hidden px-2.5 py-2 ${mini ? "justify-start" : "justify-end"}`}>
      <Texto valor={c.hoy} className="mb-1 shrink-0 self-center rounded-md bg-[var(--chat-recibida)] px-2 py-0.5 text-[10.5px] font-medium text-[var(--chat-texto-sec)] shadow-sm" />
      {paso >= 1 && <Burbuja t={c.cliente1} enviada hora="10:22" />}
      {paso === 2 && <Escribiendo />}
      {paso >= 3 && (
        <Burbuja t={c.bot1} hora="10:22">
          <span className="my-1.5 flex gap-1">
            {c.horarios.map((h, i) => (
              <span
                key={i}
                className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold transition-colors ${
                  paso >= 4 && i === 1 ? "border-[var(--chat-verde)] bg-[var(--chat-verde)] text-white" : "border-[var(--chat-verde)] text-[var(--chat-verde)]"
                }`}
              >
                {h.texto}
              </span>
            ))}
          </span>
        </Burbuja>
      )}
      {paso >= 4 && <Burbuja t={c.cliente2} enviada hora="10:23" />}
      {paso === 5 && <Escribiendo />}
      {paso >= 6 && <Burbuja t={c.bot2} hora="10:23" />}
    </div>
  );

  const telefono = (tam?: React.CSSProperties) => (
    <Telefono hora={c.hora} bateria={c.bateria} tamano={tam}>
      <div className="flex shrink-0 items-center gap-2 border-b border-black/5 bg-[var(--chat-cabecera)] px-2 pb-2 pt-1">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] text-[var(--chat-leido)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 5l-7 7 7 7" /></svg>
        <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#E9A07D] to-[#B8335A] text-[11px] font-bold text-white">PT</span>
        <div className="flex min-w-0 flex-1 flex-col leading-tight">
          <Texto valor={c.negocio} className="truncate text-[12.5px] font-semibold" />
          <Texto valor={paso === 2 || paso === 5 ? c.escribiendo : c.estado} className={`truncate text-[10.5px] ${paso === 2 || paso === 5 ? "text-[var(--chat-verde)]" : "text-[var(--chat-texto-sec)]"}`} />
        </div>
      </div>
      {chat}
      <div className="flex shrink-0 items-center gap-1.5 bg-[var(--chat-cabecera)] px-2 pb-4 pt-1.5">
        <span className="min-w-0 flex-1 truncate rounded-full bg-[var(--chat-recibida)] px-3 py-1.5 text-[11px] text-[var(--chat-texto-sec)] shadow-sm">{c.escribir.texto}</span>
        <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--chat-verde)] text-white">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zM6 11a6 6 0 0 0 12 0M12 17v4" /></svg>
        </span>
      </div>
    </Telefono>
  );

  if (mini) {
    return (
      <Escalar ancho={380} alto={232}>
        <div role="img" aria-label={c.descripcion.texto} className="relative h-full w-full">
          <div className="absolute left-6 top-3">{telefono({ width: 200, height: 420 })}</div>
          {paso >= 6 && <div className="aparecer absolute right-3 top-[120px] w-[170px]"><TarjetaCita c={c} ajustar /></div>}
        </div>
      </Escalar>
    );
  }

  return (
    <div role="img" aria-label={c.descripcion.texto} className="@container">
    <div className="relative flex flex-col items-center gap-4 @[720px]:flex-row @[720px]:items-center @[720px]:justify-center @[720px]:gap-16">
      <div className="relative">
        {telefono({ width: 250, height: 520 })}
        {paso >= 6 && (
          <div className="notificacion absolute -right-3 -top-10 z-40 w-[230px] @[720px]:-right-[200px] @[720px]:top-16">
            <TarjetaCita c={c} />
          </div>
        )}
        <span className="aparecer absolute -left-3 bottom-[78px] z-20 hidden items-center gap-1.5 rounded-full border border-linea bg-superficie px-2.5 py-1 text-[11.5px] font-medium shadow-md [animation-delay:0.6s] @[720px]:-left-[170px] @[720px]:inline-flex">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5 text-acento-texto" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19 8v6M22 11h-6" /></svg>
          <Texto valor={c.derivado} />
        </span>
      </div>
      {/* Agenda del negocio: la cita nueva entra a las 11:30. */}
      <div className="w-full max-w-[300px] overflow-hidden rounded-xl border border-linea bg-superficie shadow-[0_18px_40px_-18px_rgba(11,21,48,0.5)]">
        <div className="flex items-center gap-2 border-b border-linea px-3 py-2">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 text-acento-texto" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 3v3M17 3v3M4 8h16M5 5h14v15H5z" /></svg>
          <Texto valor={c.agenda.titulo} className="text-[12.5px] font-semibold" />
        </div>
        <ul>
          {c.agenda.filas.map((f, i) => {
            const nueva = i === 1;
            const visible = !nueva || paso >= 6;
            return (
              <li key={i} className={`flex items-center gap-3 border-b border-linea px-3 py-2.5 text-[12px] last:border-b-0 ${nueva && visible ? "bg-seleccion" : ""}`}>
                <Texto valor={f.hora} className="w-10 shrink-0 font-semibold tabular-nums" />
                {visible ? (
                  <>
                    <Texto valor={f.nombre} className={`min-w-0 flex-1 truncate ${f.estado.texto ? "" : "text-texto-sec"}`} />
                    {f.estado.texto && (
                      <span className={`shrink-0 rounded-full px-2 py-px text-[10.5px] font-medium ${nueva ? "aparecer bg-primario-relleno text-white" : "bg-ok-fondo text-ok-texto"}`}>
                        <Texto valor={f.estado} />
                      </span>
                    )}
                  </>
                ) : (
                  <span className="h-2 flex-1 rounded-full bg-suave" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    </div>
  );
}
