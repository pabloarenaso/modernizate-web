import { EscenaViva } from "@/components/escenas/base/EscenaViva";
import { Ico, TRAZOS } from "@/components/escenas/base/Ico";
import { TarjetaEstado } from "@/components/escenas/base/TarjetaEstado";
import { Texto } from "@/components/Texto";
import type { Contenido, EscenaAsistenteC, EscenaMedidaC, EscenaTiendaC, Texto as TextoC } from "@/content/tipos";
import { FotoProducto, fondosProducto, type TipoProducto } from "./FotoProducto";

/**
 * Versiones para celular de las escenas de Soluciones: verticales, simples y con texto legible (13–15 px).
 * Bucle de 8 s con las clases mp-1…mp-4 (estilo base = estado final).
 */

const tarjeta = "rounded-2xl border border-linea bg-superficie shadow-[0_18px_40px_-24px_rgba(11,21,48,0.45)]";
const tipos: TipoProducto[] = ["bolsa", "prensa", "taza"];

function Marco({ etiqueta, children }: { etiqueta: TextoC; children: React.ReactNode }) {
  return (
    <EscenaViva etiqueta={etiqueta.texto} className="w-full">
      <div className="escena-anim mx-auto flex w-full max-w-[360px] flex-col gap-3 p-4">{children}</div>
    </EscenaViva>
  );
}

export function TiendaMovil({ c }: { c: EscenaTiendaC }) {
  return (
    <Marco etiqueta={c.descripcion}>
      <div className={`${tarjeta} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-linea px-3.5 py-2.5">
          <Texto valor={c.marca} className="font-display text-[15px] font-bold" />
          <span className="relative text-texto-sec">
            <Ico d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2" className="size-5" />
            <span className="mp-2 absolute -right-2 -top-1.5 flex size-4 items-center justify-center rounded-full bg-[#D9780A] text-[10px] font-bold text-white">1</span>
          </span>
        </div>
        {c.productos.slice(0, 2).map((p, i) => (
          <div key={i} data-voltear className="flex items-center gap-3 border-b border-linea px-3.5 py-2.5 last:border-b-0">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-lg" style={{ background: fondosProducto[tipos[i]] }}>
              <FotoProducto tipo={tipos[i]} className="size-10" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <Texto valor={p.nombre} className="block truncate text-[14px] font-semibold" />
              <Texto valor={p.precio} className="text-[13px] font-bold tabular-nums text-texto-sec" />
            </span>
            <span className={`${i === 0 ? "mp-1" : ""} flex items-center gap-1 rounded-md bg-texto px-2.5 py-1.5 text-[12px] font-semibold text-fondo`}>
              <Ico d={TRAZOS.mas} className="size-3" />
              <Texto valor={c.agregar} />
            </span>
          </div>
        ))}
      </div>
      <TarjetaEstado
        className="mp-3 self-end"
        icono={<Ico d={TRAZOS.check} className="size-4" />}
        titulo={<Texto valor={c.pago.titulo} />}
        detalle={<>{c.pago.pedido.texto} · {c.pago.monto.texto}</>}
      />
    </Marco>
  );
}

function Globo({ t, propio, clase }: { t: TextoC; propio?: boolean; clase: string }) {
  return (
    <Texto
      as="p"
      valor={t}
      className={`${clase} max-w-[85%] rounded-2xl px-3.5 py-2 text-[14px] leading-snug shadow-[0_1px_0.5px_rgba(0,0,0,0.13)] ${
        propio ? "self-end rounded-br-md bg-[var(--chat-enviada)]" : "self-start rounded-bl-md bg-[var(--chat-recibida)]"
      }`}
    />
  );
}

export function AsistenteMovil({ c }: { c: EscenaAsistenteC }) {
  return (
    <Marco etiqueta={c.descripcion}>
      <div className="chat-papel flex flex-col gap-2 rounded-2xl border border-linea p-3 text-[var(--chat-texto,inherit)]">
        <Texto valor={c.negocio} className="mb-1 self-center rounded-md bg-[var(--chat-recibida)] px-2 py-0.5 text-[12px] font-semibold" />
        <Globo t={c.cliente2} propio clase="mp-1" />
        <Globo t={c.bot2} clase="mp-2" />
        <Globo t={c.cliente3} propio clase="mp-3" />
        <span className="mp-4 flex items-center gap-1.5 self-center rounded-full bg-superficie px-3 py-1 text-[12px] font-semibold shadow">
          <Ico d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM19 8v6M22 11h-6" className="size-3.5 text-acento-texto" />
          <Texto valor={c.derivado} />
        </span>
      </div>
      <TarjetaEstado
        className="mp-2"
        icono={<Ico d="M7 3v3M17 3v3M4 8h16M5 5h14v15H5z" className="size-4" />}
        titulo={<Texto valor={c.cita.titulo} />}
        detalle={<Texto valor={c.cita.detalle} />}
      />
    </Marco>
  );
}

export function AutomatizacionMovil({ c, flujo }: { c: { descripcion: TextoC }; flujo: Contenido["hero"]["flujo"] }) {
  const n = flujo.flujos[0].nodos;
  const pasos: { t: TextoC; tipo: "disparo" | "si" | "agente" | "accion" }[] = [
    { t: n[0], tipo: "disparo" },
    { t: n[1], tipo: "si" },
    { t: n[3], tipo: "agente" },
    { t: n[9], tipo: "accion" },
  ];
  const color = { disparo: "text-[#D9780A]", si: "text-[#0E9F9A]", agente: "text-[#9B5DE5]", accion: "text-primario" };
  return (
    <Marco etiqueta={c.descripcion}>
      <div className="relative flex flex-col gap-3 pl-1">
        <span aria-hidden="true" className="absolute bottom-6 left-[27px] top-6 w-0.5 bg-linea" />
        <span aria-hidden="true" className="mv-punto absolute left-[22px] size-3 rounded-full bg-primario shadow-[0_0_12px_3px_rgba(31,79,224,0.55)]" />
        {pasos.map((p, i) => (
          <div key={i} data-nodo className={`mp-${i + 1} relative flex items-center gap-3 ${tarjeta} px-3 py-2.5`}>
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-suave ${color[p.tipo]}`}>
              <Ico d={["M13 2 4 14h7l-1 8 9-12h-7z", "M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9", "M5 8h14v10H5zM12 4v4M9 13h.01M15 13h.01", "M22 2 11 13M22 2l-7 20-4-9-9-4z"][i]} className="size-5" />
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              {p.tipo === "agente" && <Texto valor={flujo.agente} className="block text-[11.5px] text-texto-sec" />}
              <Texto valor={p.t} className="text-[14.5px] font-semibold" />
              {p.tipo === "agente" && (
                <span className="mt-1.5 flex gap-1.5">
                  {[n[4], n[5]].map((h, k) => (
                    <Texto key={k} valor={h} className="rounded-full bg-suave px-2 py-0.5 text-[11.5px] font-medium" />
                  ))}
                </span>
              )}
            </span>
            {p.tipo === "si" && <Texto valor={flujo.no} className="rounded-full bg-suave px-2 py-0.5 text-[11.5px] font-semibold text-texto-sec" />}
            <span className="flex size-5 items-center justify-center rounded-full bg-[#12A150] text-white">
              <Ico d={TRAZOS.check} className="size-3" />
            </span>
          </div>
        ))}
      </div>
    </Marco>
  );
}

export function MedidaMovil({ c }: { c: EscenaMedidaC }) {
  const tono = ["bg-ok-fondo text-ok-texto", "bg-[rgba(245,158,11,0.18)] text-texto", "bg-ok-fondo text-ok-texto"];
  return (
    <Marco etiqueta={c.descripcion}>
      <div className={`${tarjeta} overflow-hidden`}>
        <div className="flex items-center justify-between bg-lateral px-3.5 py-2.5 text-white">
          <Texto valor={c.app} className="font-display text-[14px] font-semibold" />
          <span className="flex items-center gap-1 rounded-md bg-white/15 px-2 py-1 text-[11.5px] font-semibold">
            <Ico d={TRAZOS.mas} className="size-3" />
            <Texto valor={c.nuevo} />
          </span>
        </div>
        {c.filas.slice(0, 3).map((f, i) => (
          <div key={i} className={`${i === 0 ? "mp-2 bg-seleccion/60" : ""} flex items-center gap-3 border-b border-linea px-3.5 py-2.5 last:border-b-0`}>
            <Texto valor={f.folio} className="text-[14px] font-bold tabular-nums" />
            <Texto valor={f.responsable} className="min-w-0 flex-1 truncate text-[13.5px] text-texto-sec" />
            <Texto valor={f.estado} className={`rounded-full px-2 py-0.5 text-[11.5px] font-semibold ${tono[i]}`} />
          </div>
        ))}
      </div>
      <div className="mp-3 relative self-end rounded-md bg-white p-3 text-[#0B1530] shadow-[0_20px_40px_-18px_rgba(11,21,48,0.55)] ring-1 ring-black/5">
        <span className="flex items-center gap-2">
          <span className="rounded-sm bg-[#E5484D] px-1 text-[9px] font-bold text-white">PDF</span>
          <Texto valor={c.pdf.titulo} className="text-[13px] font-bold" />
        </span>
        <span className="mt-2 block h-1.5 w-40 rounded-full bg-[#E2E8F2]" />
        <span className="mt-1.5 block h-1.5 w-28 rounded-full bg-[#E2E8F2]" />
        <Texto valor={c.pdf.timbre} className="timbre absolute -bottom-2 -right-2 rotate-[-10deg] rounded border-2 border-[#0E6B37] bg-white px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0E6B37]" />
      </div>
    </Marco>
  );
}
