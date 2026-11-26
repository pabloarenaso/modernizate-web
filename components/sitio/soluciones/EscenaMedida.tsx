"use client";

import { useEffect, useState } from "react";
import { Isotipo } from "@/components/Isotipo";
import { Texto } from "@/components/Texto";
import type { EscenaMedidaC } from "@/content/tipos";
import { useDisparo } from "./disparo";
import { Escalar } from "@/components/escenas/base/Escalar";
import { Notebook } from "@/components/escenas/base/Notebook";

type Props = { c: EscenaMedidaC; tamano: "mini" | "grande" };

const tonoEstado = [
  "bg-ok-fondo text-ok-texto",
  "bg-[rgba(217,120,10,.14)] text-texto",
  "bg-ok-fondo text-ok-texto",
  "bg-suave text-texto-sec",
  "bg-ok-fondo text-ok-texto",
];
const NOTAS = ["#FDE68A", "#BFDBFE", "#FBCFE8", "#BBF7D0", "#FED7AA"];
const ALERTA = [false, true, true, false, true];

function Ico({ d, className = "size-4" }: { d: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/** App de gestión ficticia: menú lateral, filtro, botón nuevo y tabla de registros. */
function AppGestion({ c, filas, nueva, compacta }: { c: EscenaMedidaC; filas: number; nueva: boolean; compacta?: boolean }) {
  return (
    <div className="flex h-full bg-suave text-texto">
      <nav aria-hidden="true" className={`flex shrink-0 flex-col gap-1 bg-lateral py-2.5 ${compacta ? "w-10 items-center" : "w-10 items-center @[460px]:w-[118px] @[460px]:items-stretch @[460px]:px-2"}`}>
        <span className="mb-2 flex items-center gap-1.5 px-1 text-[11px] font-bold text-white">
          <span className="flex size-5 items-center justify-center rounded bg-white/20">
            <Ico d="M5 4h14v16H5zM9 8h6M9 12h6M9 16h3" className="size-3" />
          </span>
        </span>
        {c.menu.map((m, i) => (
          <span key={i} className={`flex items-center gap-1.5 rounded px-1.5 py-1 text-[11px] ${i === 0 ? "bg-white/15 text-white" : "text-white/70"}`}>
            <Ico d={["M4 6h16M4 12h16M4 18h16", "M6 3h9l4 4v14H6z", "M4 20V10M10 20V4M16 20v-7M22 20H2", "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"][i]} className="size-3.5 shrink-0" />
            {!compacta && <span className="hidden truncate @[460px]:inline">{m.texto}</span>}
          </span>
        ))}
      </nav>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-2.5">
        <div className="flex items-center gap-2">
          <Texto valor={c.app} className="truncate font-display text-[13px] font-semibold" />
          {!compacta && (
            <span className="ml-auto hidden w-[130px] items-center gap-1.5 rounded-md border border-linea bg-superficie px-2 py-1 text-[10.5px] text-texto-sec @[460px]:flex">
              <Ico d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3" className="size-3" />
              <Texto valor={c.buscar} className="truncate" />
            </span>
          )}
          <span aria-hidden="true" className={`size-5 shrink-0 rounded-full bg-gradient-to-br from-[#0E9F9A] to-[#14287A] ${compacta ? "ml-auto" : "ml-auto @[460px]:ml-0"}`} />
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex min-w-0 items-center gap-1 truncate whitespace-nowrap rounded-full border border-linea bg-superficie px-2 py-0.5 text-[10.5px] text-texto-sec">
            <Ico d="M4 5h16l-6 8v6l-4-2v-4z" className="size-3" />
            <Texto valor={c.filtro} />
          </span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md bg-primario-relleno px-2 py-1 text-[10.5px] font-semibold text-white">
            <Ico d="M12 5v14M5 12h14" className="size-3" />
            <Texto valor={c.nuevo} />
          </span>
        </div>
        <div className="overflow-hidden rounded-md border border-linea bg-superficie text-[10.5px]">
          <div className="grid grid-cols-[0.8fr_0.9fr_1.1fr_1fr] gap-1 border-b border-linea bg-suave px-2 py-1 font-semibold text-texto-sec">
            {c.columnas.map((col, i) => (
              <Texto key={i} valor={col} className="truncate" />
            ))}
          </div>
          {c.filas.slice(0, filas).map((f, i) => (
            <div
              key={i}
              className={`grid grid-cols-[0.8fr_0.9fr_1.1fr_1fr] items-center gap-1 border-b border-linea px-2 py-[5px] last:border-b-0 ${i === 0 && nueva ? "fila-nueva" : "aparecer"}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Texto valor={f.folio} className="font-medium tabular-nums" />
              <Texto valor={f.fecha} className="truncate text-texto-sec" />
              <Texto valor={f.responsable} className="truncate" />
              <span className={`justify-self-start truncate rounded-full px-1.5 py-px text-[9.5px] font-medium ${tonoEstado[i]}`}>
                <Texto valor={f.estado} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Documento PDF emitido (papel blanco en ambos modos). */
function Pdf({ c }: { c: EscenaMedidaC }) {
  return (
    <div className="relative w-[170px] rounded-md bg-white p-3 text-[#0B1530] shadow-[0_24px_50px_-20px_rgba(11,21,48,0.55)] ring-1 ring-black/5">
      <div className="flex items-center justify-between border-b border-[#E2E8F2] pb-1.5">
        <span className="text-[8.5px] font-semibold text-[#4A5468]">{c.pdf.empresa.texto}</span>
        <span className="rounded-sm bg-[#E5484D] px-1 text-[7px] font-bold text-white">PDF</span>
      </div>
      <Texto as="p" valor={c.pdf.titulo} className="mt-2 text-[11.5px] font-bold" />
      <div className="mt-2 flex flex-col gap-1.5">
        {[92, 78, 85, 60, 70].map((w, i) => (
          <span key={i} className="h-1.5 rounded-full bg-[#E2E8F2]" style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="h-4 w-14 border-b border-[#4A5468]" />
        <span className="timbre rotate-[-10deg] rounded border-2 border-[#0E6B37] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#0E6B37]">
          {c.pdf.timbre.texto}
        </span>
      </div>
    </div>
  );
}

/** Escena "Proyecto a tu medida": conversación → diagnóstico → construcción → entrega, terminando en una app de gestión. */
export function EscenaMedida({ c, tamano }: Props) {
  const disparo = useDisparo();
  const mini = tamano === "mini";
  const [etapa, setEtapa] = useState(3);

  useEffect(() => {
    if (disparo < 1 || mini || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ts = [0, 1, 2, 3].map((k) => setTimeout(() => setEtapa(k), k * 1900));
    return () => ts.forEach(clearTimeout);
  }, [disparo, mini]);

  if (mini) {
    return (
      <Escalar ancho={380} alto={232}>
        <div role="img" aria-label={c.descripcion.texto} className="relative h-full w-full">
          <div className="absolute left-4 top-4 w-[300px]">
            <Notebook ancho={300}>
              <AppGestion key={disparo} c={c} filas={5} nueva={disparo > 0} compacta />
            </Notebook>
          </div>
          <div key={`p${disparo}`} className={`absolute right-2 top-12 origin-bottom-left scale-[0.85] ${disparo > 0 ? "pdf-sale" : ""}`}>
            <Pdf c={c} />
          </div>
        </div>
      </Escalar>
    );
  }

  return (
    <div role="img" aria-label={c.descripcion.texto} className="@container flex flex-col gap-5">
      {/* Etapas del proyecto */}
      <ol className="grid grid-cols-4 gap-2">
        {c.etapas.map((e, i) => {
          const hecha = i < etapa;
          const activa = i === etapa;
          return (
            <li key={i} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-bold transition-colors duration-500 ${
                    hecha ? "bg-[#12A150] text-white" : activa ? "bg-primario-relleno text-white ring-4 ring-seleccion" : "border border-linea bg-superficie text-texto-sec"
                  }`}
                >
                  {hecha ? <Ico d="M5 12.5l4.5 4.5L19 7.5" className="size-3.5" /> : i + 1}
                </span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-linea">
                  <span className="block h-full rounded-full bg-primario ease-linear" style={{ width: hecha ? "100%" : "0%", transition: hecha ? "width 1.8s linear" : "none" }} />
                </span>
              </div>
              <Texto valor={e.nombre} className={`text-[10.5px] font-semibold leading-tight hyphens-auto @[560px]:text-[12.5px] ${activa || hecha ? "" : "text-texto-sec"}`} />
              <Texto valor={e.detalle} className="hidden text-[11.5px] leading-snug text-texto-sec @[560px]:block" />
            </li>
          );
        })}
      </ol>

      <div className="relative flex justify-center @[760px]:justify-start @[760px]:pl-6">
        <Notebook ancho={620}>
          {etapa === 0 && (
            <div key="0" className="aparecer flex h-full flex-col gap-2 bg-[#121725] p-3">
              <div className="grid flex-1 grid-cols-2 gap-2">
                <div className="relative flex items-center justify-center rounded-lg bg-[#1f2738]">
                  <span className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D9780A] to-[#B8335A] text-xl font-bold text-white">CR</span>
                  <Texto valor={c.llamada.tu} className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 text-[11px] text-white" />
                  <span className="absolute inset-0 rounded-lg ring-2 ring-[#12A150] hablar" />
                </div>
                <div className="relative flex items-center justify-center rounded-lg bg-[#1a2340]">
                  <span className="flex size-16 items-center justify-center rounded-full bg-[#14287A]">
                    <Isotipo className="h-6 text-[#DCE6FF]" />
                  </span>
                  <Texto valor={c.llamada.nosotros} className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 text-[11px] text-white" />
                </div>
              </div>
              <Texto valor={c.llamada.frase} className="self-center rounded-full bg-white/10 px-3 py-1 text-[12px] italic text-white" />
              <div aria-hidden="true" className="flex justify-center gap-2">
                <span className="size-7 rounded-full bg-white/15" />
                <span className="size-7 rounded-full bg-white/15" />
                <span className="flex size-7 items-center justify-center rounded-full bg-[#E5484D]">
                  <Ico d="M4 15c4-4 12-4 16 0l-2 2-3-1v-2a10 10 0 0 0-6 0v2l-3 1z" className="size-4 text-white" />
                </span>
              </div>
            </div>
          )}
          {etapa === 1 && (
            <div key="1" className="lienzo-flujo aparecer flex h-full flex-col justify-center gap-4 bg-superficie p-4">
              <Texto valor={c.mapa.titulo} className="font-display text-[14px] font-semibold" />
              <div className="flex items-center justify-between gap-1">
                {c.mapa.notas.map((n, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span
                      className="nota relative flex h-14 w-[72px] items-center justify-center rounded-sm px-1 text-center text-[11px] font-semibold text-[#3b3b3b] shadow-md"
                      style={{ background: NOTAS[i], rotate: `${(i % 2 ? 1 : -1) * 3}deg`, animationDelay: `${i * 140}ms` }}
                    >
                      {n.texto}
                      {ALERTA[i] && <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-[#E5484D] text-[10px] font-bold text-white">!</span>}
                    </span>
                    {i < 4 && <Ico d="M5 12h12M13 8l4 4-4 4" className="size-3.5 text-texto-sec" />}
                  </div>
                ))}
              </div>
              <Texto valor={c.mapa.hallazgo} className="aparecer self-start rounded-full bg-[rgba(229,72,77,.12)] px-2.5 py-1 text-[11.5px] font-semibold text-texto [animation-delay:.8s]" />
            </div>
          )}
          {etapa === 2 && (
            <div key="2" className="relative h-full">
              <AppGestion c={c} filas={3} nueva={false} />
              <div className="aparecer absolute bottom-3 right-3 flex w-[170px] flex-col gap-1 rounded-lg border border-linea bg-superficie p-2 text-[11px] shadow-md">
                <Texto valor={c.piloto} className="font-semibold" />
                <span className="h-1.5 overflow-hidden rounded-full bg-linea">
                  <span className="barra-progreso block h-full rounded-full bg-primario" />
                </span>
              </div>
            </div>
          )}
          {etapa === 3 && (
            <div key="3" className="aparecer h-full">
              <AppGestion c={c} filas={5} nueva />
            </div>
          )}
        </Notebook>
        {etapa === 3 && (
          <>
            <div className="absolute -bottom-10 right-0 z-10 origin-bottom-right scale-75 @[760px]:bottom-auto @[760px]:right-2 @[760px]:top-6 @[760px]:scale-100">
              <div className="pdf-sale">
              <Pdf c={c} />
              </div>
            </div>
            <span className="aparecer absolute -top-3 left-2 z-10 inline-flex items-center gap-1.5 rounded-full border border-linea bg-superficie px-2.5 py-1 text-[11.5px] font-medium shadow-md [animation-delay:.5s]">
              <Ico d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" className="size-3.5 text-acento-texto" />
              <Texto valor={c.permisos} />
            </span>
            <span className="aparecer absolute bottom-8 left-0 z-10 hidden items-center gap-1.5 rounded-full bg-ok-fondo px-2.5 py-1 text-[11.5px] font-semibold text-ok-texto shadow-md [animation-delay:.9s] @[760px]:inline-flex">
              <Ico d="M5 12.5l4.5 4.5L19 7.5" className="size-3.5" />
              <Texto valor={c.entregado} />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
