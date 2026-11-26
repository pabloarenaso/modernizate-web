"use client";

import { useEffect, useState } from "react";
import { Texto } from "@/components/Texto";
import type { EscenaMedidaC } from "@/content/tipos";
import { useDisparo } from "./disparo";
import { Escalar } from "@/components/escenas/base/Escalar";
import { Cursor } from "@/components/escenas/base/Cursor";
import { EscenaViva } from "@/components/escenas/base/EscenaViva";
import { Notebook } from "@/components/escenas/base/Notebook";

type Props = { c: EscenaMedidaC; tamano: "mini" | "grande" };

const tonoEstado = [
  "bg-ok-fondo text-ok-texto",
  "bg-[rgba(217,120,10,.14)] text-texto",
  "bg-ok-fondo text-ok-texto",
  "bg-suave text-texto-sec",
  "bg-ok-fondo text-ok-texto",
];

function Ico({ d, className = "size-4" }: { d: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

/** App de gestión ficticia: menú lateral, filtro, botón nuevo y tabla de registros. */
function AppGestion({ c, filas, nueva, compacta, desde = 0 }: { c: EscenaMedidaC; filas: number; nueva: boolean; compacta?: boolean; desde?: number }) {
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
          {c.filas.slice(desde, desde + filas).map((f, i) => (
            <div
              key={i}
              className={`grid grid-cols-[0.8fr_0.9fr_1.1fr_1fr] items-center gap-1 border-b border-linea px-2 py-[5px] last:border-b-0 ${i === 0 && nueva ? "fila-nueva" : "aparecer"}`}
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <Texto valor={f.folio} className="font-medium tabular-nums" />
              <Texto valor={f.fecha} className="truncate text-texto-sec" />
              <Texto valor={f.responsable} className="truncate" />
              <span className={`justify-self-start truncate rounded-full px-1.5 py-px text-[9.5px] font-medium ${tonoEstado[i + desde]}`}>
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
  // 0: tabla y clic en "Nuevo registro" · 1: formulario que se llena · 2: fila nueva, PDF emitido y permisos.
  const [etapa, setEtapa] = useState(2);

  useEffect(() => {
    if (disparo < 1 || mini || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ts = [0, 1600, 4800].map((t, k) => setTimeout(() => setEtapa(k), t));
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
    <div role="img" aria-label={c.descripcion.texto} className="@container flex flex-col gap-6">
      <div className="relative flex justify-center @[760px]:justify-start @[760px]:pl-6">
        <Notebook ancho={620}>
          <div className="relative h-full">
            <AppGestion key={etapa === 2 ? "fin" : "base"} c={c} filas={5} desde={etapa === 2 ? 0 : 1} nueva={etapa === 2} />
            {etapa === 0 && <Cursor clic className="cursor-viaje right-[7%] top-[19%]" />}
            {etapa === 1 && (
              <div className="aparecer absolute inset-y-0 right-0 flex w-[48%] flex-col gap-1 border-l border-linea bg-superficie p-2.5 shadow @[560px]:gap-2 @[560px]:p-3-[-12px_0_30px_-16px_rgba(11,21,48,0.45)]">
                <Texto valor={c.formulario.titulo} className="font-display text-[13px] font-semibold" />
                {c.formulario.campos.map((f, i) => (
                  <label key={i} className="flex flex-col gap-0.5 text-[10px] font-medium text-texto-sec">
                    <Texto valor={f.etiqueta} />
                    <span className="flex h-5 items-center rounded-md border border-linea bg-suave px-2 text-[10.5px] text-texto @[560px]:h-6 @[560px]:text-[11px]">
                      <span className="escribir-campo overflow-hidden whitespace-nowrap" style={{ animationDelay: `${0.3 + i * 0.75}s` }}>
                        <Texto valor={f.valor} />
                      </span>
                    </span>
                  </label>
                ))}
                <span className="aparecer mt-auto inline-flex items-center justify-center gap-1 self-end rounded-md bg-primario-relleno px-2.5 py-1.5 text-[10.5px] font-semibold text-white [animation-delay:2.4s]">
                  <Ico d="M5 12.5l4.5 4.5L19 7.5" className="size-3" />
                  <Texto valor={c.formulario.guardar} />
                </span>
                <Cursor clic className="aparecer bottom-[6%] right-[12%] [animation-delay:2.6s]" />
              </div>
            )}
          </div>
        </Notebook>
        {etapa === 2 && (
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
          </>
        )}
      </div>

      {/* Franja con los 4 pasos de trabajo, en bucle. */}
      <EscenaViva className="mt-6 @[760px]:mt-2">
        <ol className="escena-anim grid grid-cols-4 gap-2">
          {c.etapas.map((e, i) => (
            <li key={i} className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className={`fr-c fr-c${i + 1} flex size-7 shrink-0 items-center justify-center rounded-full border text-[12px] font-bold`}>{i + 1}</span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-linea">
                  <span className={`fr-b fr-b${i + 1} block h-full origin-left rounded-full bg-primario`} />
                </span>
              </div>
              <Texto valor={e.nombre} className="text-[10.5px] font-semibold leading-tight hyphens-auto @[560px]:text-[12.5px]" />
              <Texto valor={e.detalle} className="hidden text-[11.5px] leading-snug text-texto-sec @[560px]:block" />
            </li>
          ))}
        </ol>
      </EscenaViva>
    </div>
  );
}
