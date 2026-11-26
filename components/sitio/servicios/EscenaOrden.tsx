import type { CSSProperties, ReactNode } from "react";
import { Escalar } from "@/components/escenas/base/Escalar";
import { EscenaViva } from "@/components/escenas/base/EscenaViva";
import { Ico, TRAZOS } from "@/components/escenas/base/Ico";
import { Navegador } from "@/components/escenas/base/Navegador";
import { Texto } from "@/components/Texto";
import type { EscenaOrdenC } from "@/content/tipos";

/** Zonas que se iluminan desde las etiquetas de servicio (mismo orden que los servicios). */
export const ZONAS = ["sitio", "tienda", "asistente", "agenda", "automatizaciones", "medida"] as const;
export type Zona = (typeof ZONAS)[number];

type Caos = { x: number; y: number; w: number; h: number; r: number; tx: number; ty: number; zona: string; children: ReactNode; className?: string };

/** Elemento del desorden: vuela hacia su lugar en el panel (--tx, --ty) y se desvanece. */
function Suelto({ x, y, w, h, r, tx, ty, zona, children, className = "" }: Caos) {
  const estilo = { left: x, top: y, width: w, height: h, "--r": `${r}deg`, "--tx": `${tx}px`, "--ty": `${ty}px` } as CSSProperties;
  return (
    <div data-zona={zona} className={`do-caos zona absolute ${className}`} style={estilo}>
      {children}
    </div>
  );
}

const DOBLE = "M1 6l3 3 6-7M7 8.5l1 .5 6-7";

/** "Del desorden al orden": mensajes, cuaderno, planilla y notas sueltas que se ordenan en un panel. Bucle de 10 s. */
export function EscenaOrden({ c, foco }: { c: EscenaOrdenC; foco: Zona | null }) {
  const tonos = ["bg-ok-fondo text-ok-texto", "bg-seleccion text-acento-texto", "bg-[rgba(245,158,11,0.18)] text-texto", "bg-ok-fondo text-ok-texto"];
  return (
    <EscenaViva etiqueta={c.etiqueta.texto} className="w-full">
      <Escalar ancho={600} alto={440}>
        <div className="orden escena-anim relative h-[440px] w-[600px]" data-foco={foco ?? undefined}>
          {/* ── Orden: el panel ── */}
          <div className="do-orden absolute inset-[20px]">
            <Navegador className="h-full" dominio={<span data-zona="sitio" className="zona rounded px-1"><Texto valor={c.dominio} /></span>}>
              <div className="flex flex-1 flex-col gap-3 bg-suave p-4">
                <div className="flex items-center justify-between">
                  <Texto valor={c.panel} className="font-display text-[17px] font-bold" />
                  <span data-zona="medida" className="zona do-o3 flex items-center gap-1.5 rounded-full bg-ok-fondo px-3 py-1 text-[12px] font-semibold text-ok-texto">
                    <Ico d={TRAZOS.check} className="size-3.5" />
                    <Texto valor={c.alDia} />
                  </span>
                </div>
                <div className="relative grid flex-1 grid-cols-3 gap-6">
                  {/* Mensajes respondidos */}
                  <div data-zona="asistente" className="zona flex flex-col gap-3 rounded-xl border border-linea bg-superficie p-3.5">
                    <Texto valor={c.mensajes} className="text-[11px] font-semibold uppercase tracking-wide text-texto-sec" />
                    {c.clientes.map((n, i) => (
                      <div key={i} className={`do-o${Math.min(i + 1, 3)} flex items-center gap-2`}>
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-seleccion text-[10px] font-bold text-acento-texto">{n.texto.slice(0, 1)}</span>
                        <span className="min-w-0 leading-tight">
                          <Texto valor={n} className="block truncate text-[12px] font-semibold" />
                          <span className="flex items-center gap-1 text-[10.5px] text-texto-sec">
                            <Texto valor={c.respondido} />
                            <svg aria-hidden="true" viewBox="0 0 18 11" className="do-check h-[9px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={DOBLE} /></svg>
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Agenda del día */}
                  <div data-zona="agenda" className="zona flex flex-col gap-3 rounded-xl border border-linea bg-superficie p-3.5">
                    <Texto valor={c.agenda} className="text-[11px] font-semibold uppercase tracking-wide text-texto-sec" />
                    {c.citas.map((t, i) => (
                      <div key={i} className={`do-o${Math.min(i + 1, 3)} rounded-md border-l-[3px] border-primario bg-suave px-2 py-1.5`}>
                        <Texto valor={t} className="block truncate text-[11.5px] font-medium" />
                      </div>
                    ))}
                  </div>
                  {/* Pedidos con estado */}
                  <div data-zona="tienda" className="zona flex flex-col gap-3 rounded-xl border border-linea bg-superficie p-3.5">
                    <Texto valor={c.pedidos} className="text-[11px] font-semibold uppercase tracking-wide text-texto-sec" />
                    {c.estados.map((s, i) => (
                      <div key={i} className={`do-o${Math.min(i + 1, 3)} flex items-center justify-between gap-2`}>
                        <span className="text-[12px] font-semibold tabular-nums">#{1041 + i}</span>
                        <Texto valor={s} className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${tonos[i]}`} />
                      </div>
                    ))}
                  </div>
                  {/* Flechas que mueven datos entre columnas */}
                  <div data-zona="automatizaciones" className="zona pointer-events-none absolute inset-x-0 top-1/2 h-0">
                    {[33.33, 66.66].map((l) => (
                      <svg key={l} aria-hidden="true" viewBox="0 0 24 12" className="absolute -top-[6px] h-3 w-6 -translate-x-1/2 text-primario" style={{ left: `${l}%` }}>
                        <path className="do-flecha" d="M1 6h19" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" fill="none" />
                        <path d="M17 2l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </Navegador>
          </div>

          {/* ── Desorden ── */}
          <Suelto x={16} y={24} w={210} h={190} r={-3} tx={14} ty={100} zona="asistente" className="flex flex-col overflow-hidden rounded-2xl border border-linea bg-[var(--chat-fondo,#EFE7DD)] shadow-[0_18px_36px_-18px_rgba(11,21,48,0.5)]">
            <div className="flex items-center justify-between bg-superficie px-3 py-2">
              <Texto valor={c.chat} className="text-[13px] font-semibold" />
              <span className="grid min-w-6 place-items-center rounded-full bg-[#25A244] px-1.5 text-[11px] font-bold text-white">
                <span className="do-n1 col-start-1 row-start-1">3</span>
                <span className="do-n2 col-start-1 row-start-1">7</span>
                <span className="do-n3 col-start-1 row-start-1">12</span>
              </span>
            </div>
            <div className="flex flex-col gap-1.5 p-2.5">
              {c.burbujas.map((m, i) => (
                <Texto key={i} as="p" valor={m} className={`do-b${i + 1} self-start rounded-lg rounded-tl-sm bg-[var(--chat-recibida)] px-2 py-1.5 text-[11.5px] text-[var(--chat-texto,inherit)] shadow-[0_1px_0.5px_rgba(0,0,0,0.13)]`} />
              ))}
            </div>
          </Suelto>

          <Suelto x={246} y={14} w={180} h={176} r={4} tx={-40} ty={120} zona="agenda" className="rounded-md border border-[#E3D9B8] bg-[#FFFBEA] p-3 text-[#3B3320] shadow-[0_18px_36px_-18px_rgba(11,21,48,0.5)]">
            <span aria-hidden="true" className="absolute inset-y-0 left-6 w-px bg-[#E58A8A]" />
            <Texto as="p" valor={c.cuaderno} className="pl-5 font-display text-[13px] font-bold" />
            <ul className="mt-1.5 flex flex-col pl-5" style={{ backgroundImage: "repeating-linear-gradient(transparent 0 25px, #CFE0F5 25px 26px)" }}>
              {c.reservas.map((r, i) => (
                <li key={i} className={`h-[26px] pt-1 text-[12.5px] italic ${i === 2 ? "text-[#B42318] line-through decoration-2" : ""}`}>
                  <Texto valor={r} />
                </li>
              ))}
            </ul>
          </Suelto>

          <Suelto x={470} y={30} w={100} h={110} r={0} tx={-370} ty={150} zona="asistente" className="flex flex-col items-center gap-1.5">
            <span className="relative flex size-16 items-center justify-center">
              <span className="do-onda absolute inset-0 rounded-full bg-[#25A244]/30" />
              <span className="do-onda absolute inset-0 rounded-full bg-[#25A244]/30" style={{ animationDelay: "0.6s" }} />
              <span className="do-timbre relative flex size-12 items-center justify-center rounded-full bg-[#25A244] text-white shadow-lg">
                <Ico d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" className="size-5" />
              </span>
            </span>
            <Texto valor={c.llamada} className="whitespace-nowrap rounded-full bg-superficie px-2 py-0.5 text-[10.5px] font-semibold shadow" />
          </Suelto>

          <Suelto x={318} y={222} w={262} h={150} r={-2} tx={20} ty={-70} zona="automatizaciones medida" className="overflow-hidden rounded-lg border border-linea bg-superficie text-[11px] shadow-[0_18px_36px_-18px_rgba(11,21,48,0.5)]">
            <div className="flex items-center gap-1.5 bg-[#1D6F42] px-2.5 py-1.5 text-[11px] font-semibold text-white">
              <span className="grid size-4 place-items-center rounded-sm bg-white text-[9px] font-bold text-[#1D6F42]">X</span>
              <Texto valor={c.planilla} />
            </div>
            <div className="grid grid-cols-[28px_1fr_70px_60px]">
              {["#", "A", "B", "C"].map((h) => <span key={h} className="border-b border-r border-linea bg-suave px-1.5 py-1 text-center text-texto-sec">{h}</span>)}
              {[0, 1, 2, 3].map((f) => (
                [String(1041 + f), f === 1 ? "" : ["Camila", "", "Rosa", "Paula"][f], f === 2 ? "" : ["$24.990", "$18.500", "", "$9.990"][f], f === 3 ? "" : "✓"].map((v, k) => (
                  <span key={`${f}${k}`} className={`h-[24px] truncate border-b border-r border-linea px-1.5 py-1 tabular-nums ${v === "" && k > 0 ? "bg-[rgba(229,72,77,0.08)] outline-1 -outline-offset-2 outline-dashed outline-[#E5484D]" : ""}`}>{v}</span>
                ))
              ))}
            </div>
          </Suelto>

          <Suelto x={40} y={246} w={124} h={100} r={-7} tx={200} ty={-60} zona="agenda" className="flex items-center justify-center bg-[#FFE873] p-3 text-center text-[14px] font-semibold italic text-[#4A3B00] shadow-[0_14px_24px_-14px_rgba(0,0,0,0.45)]">
            <Texto valor={c.notas[0]} />
          </Suelto>
          <Suelto x={176} y={300} w={124} h={100} r={6} tx={250} ty={-110} zona="tienda" className="flex items-center justify-center bg-[#FFC6D9] p-3 text-center text-[14px] font-semibold italic text-[#5A1631] shadow-[0_14px_24px_-14px_rgba(0,0,0,0.45)]">
            <Texto valor={c.notas[1]} />
          </Suelto>
        </div>
      </Escalar>
    </EscenaViva>
  );
}
