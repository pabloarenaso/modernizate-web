import { Isotipo } from "@/components/Isotipo";
import { Texto } from "@/components/Texto";
import type { Contenido, Texto as TextoC } from "@/content/tipos";

type Props = { c: Contenido["hero"]["panel"]; titulo: TextoC };

const barras = [9, 12, 11, 14, 10, 5, 2];
const coloresKpi = ["var(--graf-1)", "var(--graf-2)", "var(--graf-3)"];
const estados = [
  { punto: "#12A150", fondo: "rgba(18,161,80,.12)" },
  { punto: "var(--primario)", fondo: "rgba(31,79,224,.12)" },
  { punto: "#D9780A", fondo: "rgba(217,120,10,.12)" },
];
const iconosMenu = [
  "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
];

/** Escena 3: dashboard del negocio (datos ficticios), con menú lateral, indicadores, gráfico y pedidos. */
export function EscenaPanel({ c, titulo }: Props) {
  return (
    <div className="aparecer flex h-full overflow-hidden rounded-2xl border border-linea bg-suave shadow-[0_24px_60px_-28px_rgba(11,21,48,0.4)]">
      <nav aria-hidden="true" className="flex w-12 shrink-0 flex-col items-center gap-2 bg-lateral py-3 sm:w-[150px] sm:items-stretch sm:px-2.5">
        <span className="mb-2 flex items-center gap-2 px-1 text-white">
          <Isotipo className="h-4 text-[#DCE6FF]" />
        </span>
        {iconosMenu.map((d, i) => (
          <span key={i} className={`flex items-center gap-2 rounded-md px-1.5 py-1.5 text-[12px] ${i === 0 ? "bg-white/15 text-white" : "text-white/70"}`}>
            <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
            <span className="hidden sm:inline">{c.menu[i].texto}</span>
          </span>
        ))}
      </nav>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3 sm:p-3.5">
        <div className="flex items-center justify-between gap-2">
          <Texto as="p" valor={titulo} className="truncate font-display text-[14px] font-semibold" />
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-md border border-linea bg-superficie px-2 py-1 text-[11px] text-texto-sec">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 3v3M17 3v3M4 8h16M5 5h14v15H5z" /></svg>
              <Texto valor={c.periodo} />
            </span>
            <span aria-hidden="true" className="hidden size-6 rounded-full bg-gradient-to-br from-[#D9780A] to-[#B8335A] sm:block" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {c.kpis.map((k, i) => (
            <div key={i} className="min-w-0 rounded-lg border border-linea bg-superficie p-2 sm:p-2.5">
              <div className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full" style={{ background: coloresKpi[i] }} />
                <Texto as="p" valor={k.etiqueta} className="truncate text-[10.5px] text-texto-sec" />
              </div>
              <Texto as="p" valor={k.valor} className="font-display text-[22px] font-bold leading-tight" />
              <Texto as="p" valor={k.variacion} className="truncate text-[10px] font-medium text-ok-texto" />
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-1.5 rounded-lg border border-linea bg-superficie p-2.5">
          <Texto as="p" valor={c.grafico} className="text-[11.5px] font-semibold" />
          <div className="relative min-h-0 flex-1">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-4 top-0 flex flex-col justify-between">
              {[0, 1, 2, 3].map((g) => (
                <span key={g} className="border-t border-dashed border-linea" />
              ))}
            </div>
            <div className="relative grid h-full grid-cols-7 items-end gap-2">
              {barras.map((v, i) => (
                <div key={i} className="flex h-full min-h-0 flex-col justify-end gap-1">
                  <div className="crecer rounded-t" style={{ height: `calc(${(v / 14) * 100}% - 16px)`, background: i === 3 ? "var(--primario)" : "var(--barra-suave)", animationDelay: `${i * 60}ms` }} />
                  <Texto valor={c.dias[i]} className="text-center text-[10px] text-texto-sec" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-linea bg-superficie">
          <Texto as="p" valor={c.pedidos} className="border-b border-linea px-2.5 py-1.5 text-[11.5px] font-semibold" />
          <ul>
            {c.filas.map((f, i) => (
              <li key={i} className="flex items-center gap-2 border-b border-linea px-2.5 py-1.5 text-[11px] last:border-b-0">
                <Texto valor={f.pedido} className="w-11 shrink-0 font-medium tabular-nums text-texto-sec" />
                <Texto valor={f.nombre} className="min-w-0 flex-1 truncate" />
                <Texto valor={f.monto} className="hidden shrink-0 tabular-nums sm:inline" />
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-medium" style={{ background: estados[i].fondo }}>
                  <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: estados[i].punto }} />
                  <Texto valor={f.estado} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
