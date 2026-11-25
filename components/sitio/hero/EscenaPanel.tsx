import { Texto } from "@/components/Texto";
import type { Contenido } from "@/content/tipos";

type Props = { c: Contenido["hero"]["panel"] };

const barras = [9, 12, 11, 14, 10, 5, 2];
const coloresKpi = ["var(--graf-1)", "var(--graf-2)", "var(--graf-3)"];
const anchosKpi = ["70%", "50%", "40%"];
const avatares = ["#8A6508", "#B8335A", "#2F8F46"];
const estados = ["#12A150", "var(--primario)", "#D9780A"];

/** Escena 3: panel del negocio con datos ficticios de demostración. */
export function EscenaPanel({ c }: Props) {
  return (
    <div className="aparecer flex min-h-0 flex-1 bg-suave">
      <div aria-hidden="true" className="flex w-12 shrink-0 flex-col items-center gap-3.5 bg-lateral pt-4 sm:w-16">
        {[0.18, 0.08, 0.08, 0.08].map((o, i) => (
          <span key={i} className="size-[26px] rounded-md" style={{ background: `rgba(255,255,255,${o})` }} />
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {c.kpis.map((k, i) => (
            <div key={i} className="min-w-0 rounded-lg border border-linea bg-superficie p-2 sm:p-2.5">
              <Texto as="p" valor={k.etiqueta} className="truncate text-[11px] text-texto-sec" />
              <Texto as="p" valor={k.valor} className="font-display text-[22px] font-bold" />
              <div aria-hidden="true" className="mt-1.5 h-[3px] rounded-sm" style={{ background: coloresKpi[i], width: anchosKpi[i] }} />
            </div>
          ))}
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-2 rounded-lg border border-linea bg-superficie p-3">
          <Texto as="p" valor={c.grafico} className="text-xs font-semibold" />
          <div className="grid min-h-0 flex-1 grid-cols-7 items-end gap-2.5">
            {barras.map((v, i) => (
              <div key={i} className="flex h-full min-h-0 flex-col justify-end gap-1">
                <div
                  className="crecer rounded-t"
                  style={{ height: `${(v / 14) * 100}%`, background: i === 3 ? "var(--primario)" : "var(--barra-suave)", animationDelay: `${i * 60}ms` }}
                />
                <Texto valor={c.dias[i]} className="text-center text-[10px] text-texto-sec" />
              </div>
            ))}
          </div>
        </div>
        <ul className="rounded-lg border border-linea bg-superficie">
          {c.filas.map((f, i) => (
            <li key={i} className="flex items-center gap-2 border-b border-linea px-3 py-2 text-xs last:border-b-0">
              <span aria-hidden="true" className="size-[22px] shrink-0 rounded-full" style={{ background: avatares[i] }} />
              <Texto valor={f.nombre} className="min-w-0 flex-1 truncate" />
              <span className="inline-flex items-center gap-1.5 text-[11px]">
                <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: estados[i] }} />
                <Texto valor={f.estado} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
