import { Isotipo } from "@/components/Isotipo";
import { Texto } from "@/components/Texto";
import type { Contenido, Texto as TextoC } from "@/content/tipos";

type Props = { c: Contenido["hero"]["panel"]; titulo: TextoC; tic: number };

const coloresKpi = ["var(--graf-1)", "var(--graf-2)", "var(--graf-3)"];
const tonos = {
  ok: { punto: "#12A150", fondo: "rgba(18,161,80,.12)" },
  azul: { punto: "var(--primario)", fondo: "rgba(31,79,224,.12)" },
  naranja: { punto: "#D9780A", fondo: "rgba(217,120,10,.12)" },
};
/** Tono del estado de cada fila (mismo orden que filas + masFilas). */
const tonoFila: (keyof typeof tonos)[] = ["ok", "azul", "naranja", "ok", "azul", "ok", "azul", "naranja"];
const ventas = [62, 78, 70, 94];
const pedidosDia = [9, 12, 11, 14, 10, 5, 2];
const ALTO_FILA = 33;
const iconosMenu = [
  "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z",
  "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
];

/** Escena 3: dashboard del negocio (datos ficticios), con menú lateral, indicadores, gráfico y pedidos. */
export function EscenaPanel({ c, titulo, tic }: Props) {
  // Secuencia: tics 0–3 la tabla avanza; 4–7 reporte con gráficos; 7 se pulsa descargar; 8–9 progreso; 10 listo;
  // 11–14 vista previa de impresión (se pulsa "Imprimir" en el 13) y se cierra.
  const vista = tic >= 11 && tic <= 14;
  const reporte = tic >= 4;
  const fase = tic < 8 ? "boton" : tic < 10 ? "progreso" : "listo";
  const filas = [...c.filas, ...c.masFilas];
  const desplazamiento = Math.min(tic, 3);
  return (
    <div className="aparecer relative flex h-full overflow-hidden rounded-2xl border border-linea bg-suave shadow-[0_24px_60px_-28px_rgba(11,21,48,0.4)]">
      <nav aria-hidden="true" className="flex w-12 shrink-0 flex-col items-center gap-2 bg-lateral py-3 sm:w-[150px] sm:items-stretch sm:px-2.5">
        <span className="mb-2 flex items-center gap-2 px-1 text-white">
          <Isotipo className="h-4 text-[#DCE6FF]" />
        </span>
        {iconosMenu.map((d, i) => (
          <span key={i} className={`flex items-center gap-2 rounded-md px-1.5 py-1.5 text-[12px] ${i === (reporte ? 0 : 2) ? "bg-white/15 text-white" : "text-white/70"}`}>
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
        {/* Pestañas */}
        <div className="flex items-end gap-4 border-b border-linea text-[12px]">
          {c.pestanas.map((p, i) => (
            <Texto
              key={i}
              valor={p}
              className={`-mb-px border-b-2 pb-1.5 font-semibold ${(i === 1) === reporte ? "border-primario text-texto" : "border-transparent text-texto-sec"}`}
            />
          ))}
          {reporte && (
            <span className="relative mb-1 ml-auto">
              {fase === "boton" && (
                <span className={`inline-flex items-center gap-1.5 rounded-md bg-primario-relleno px-2.5 py-1 text-[11px] font-semibold text-white ${tic === 7 ? "pulsar" : ""}`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v11M7 10l5 5 5-5M5 20h14" /></svg>
                  <Texto valor={c.reporte.descargar} />
                </span>
              )}
              {fase === "progreso" && (
                <span className="flex w-[150px] flex-col gap-1 text-[10.5px] text-texto-sec">
                  <Texto valor={c.reporte.generando} />
                  <span className="h-1.5 overflow-hidden rounded-full bg-linea">
                    <span className="barra-progreso block h-full rounded-full bg-primario" />
                  </span>
                </span>
              )}
              {fase === "listo" && (
                <span className="aparecer inline-flex items-center gap-1.5 rounded-md border border-linea bg-superficie px-2 py-1 text-[11px] font-semibold text-ok-texto">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  <Texto valor={c.reporte.listo} />
                </span>
              )}
            </span>
          )}
        </div>

        {!reporte ? (
          <>
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
            <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-linea bg-superficie">
              <Texto as="p" valor={c.pedidos} className="border-b border-linea px-2.5 py-1.5 text-[11.5px] font-semibold" />
              <div className="relative min-h-0 flex-1 overflow-hidden">
                <ul className="transition-transform duration-1000 ease-in-out" style={{ transform: `translateY(-${desplazamiento * ALTO_FILA}px)` }}>
                  {filas.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 border-b border-linea px-2.5 text-[11px]" style={{ height: ALTO_FILA }}>
                      <Texto valor={f.pedido} className="w-11 shrink-0 font-medium tabular-nums text-texto-sec" />
                      <Texto valor={f.nombre} className="min-w-0 flex-1 truncate" />
                      <Texto valor={f.monto} className="hidden shrink-0 tabular-nums sm:inline" />
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-1.5 py-px text-[10px] font-medium" style={{ background: tonos[tonoFila[i]].fondo }}>
                        <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: tonos[tonoFila[i]].punto }} />
                        <Texto valor={f.estado} />
                      </span>
                    </li>
                  ))}
                </ul>
                <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-superficie" />
              </div>
            </div>
          </>
        ) : (
          <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-[1fr_1fr] gap-2">
            {/* Barras */}
            <div className="col-span-2 flex min-h-0 flex-col rounded-lg border border-linea bg-superficie p-2.5">
              <Texto as="p" valor={c.reporte.ventas} className="text-[11.5px] font-semibold" />
              <div className="relative grid min-h-0 flex-1 grid-cols-4 items-end gap-3 pt-2">
                {ventas.map((v, i) => (
                  <div key={i} className="flex h-full min-h-0 flex-col justify-end gap-1">
                    <div className="crecer rounded-t" style={{ height: `calc(${v}% - 16px)`, background: i === 3 ? "var(--primario)" : "var(--barra-suave)", animationDelay: `${i * 90}ms` }} />
                    <Texto valor={c.reporte.semanas[i]} className="text-center text-[10px] text-texto-sec" />
                  </div>
                ))}
              </div>
            </div>
            {/* Línea */}
            <div className="flex min-h-0 flex-col rounded-lg border border-linea bg-superficie p-2.5">
              <Texto as="p" valor={c.reporte.pedidosDia} className="text-[11.5px] font-semibold" />
              <svg aria-hidden="true" viewBox="0 0 120 50" preserveAspectRatio="none" className="mt-1 min-h-0 w-full flex-1 overflow-visible">
                <path d="M0 50V0M0 50h120" stroke="var(--linea)" strokeWidth="1" />
                <path
                  d={pedidosDia.map((v, i) => `${i ? "L" : "M"}${4 + i * 18.5} ${46 - v * 3}`).join(" ")}
                  pathLength={1}
                  fill="none"
                  stroke="var(--graf-3)"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                  className="trazo-ok"
                  style={{ animationDuration: "1.3s", animationDelay: "0.3s" }}
                />
              </svg>
            </div>
            {/* Dona */}
            <div className="flex min-h-0 flex-col rounded-lg border border-linea bg-superficie p-2.5">
              <Texto as="p" valor={c.reporte.medios} className="text-[11.5px] font-semibold" />
              <div className="flex min-h-0 flex-1 items-center gap-2">
                <svg aria-hidden="true" viewBox="0 0 42 42" className="h-full max-h-[64px] min-h-0 shrink-0 -rotate-90">
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--linea)" strokeWidth="6" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--graf-1)" strokeWidth="6" pathLength={100} className="dona" style={{ "--arco": "62 38" } as React.CSSProperties} />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--graf-2)" strokeWidth="6" pathLength={100} strokeDashoffset={-62} className="dona" style={{ "--arco": "36 64", animationDelay: "0.6s" } as React.CSSProperties} />
                </svg>
                <ul className="flex min-w-0 flex-col gap-1 text-[10px]">
                  <li className="flex items-center gap-1.5"><span aria-hidden="true" className="size-2 rounded-sm bg-graf-1" /><Texto valor={c.reporte.tarjeta} /> <b>62%</b></li>
                  <li className="flex items-center gap-1.5"><span aria-hidden="true" className="size-2 rounded-sm bg-graf-2" /><Texto valor={c.reporte.transferencia} /> <b>38%</b></li>
                </ul>
              </div>
            </div>
            {fase === "listo" && (
              <div className="notificacion col-span-2 -mt-1 flex items-center gap-2 rounded-lg border border-linea bg-superficie px-2.5 py-1.5 text-[11px] shadow-md">
                <span aria-hidden="true" className="flex h-7 w-6 items-center justify-center rounded-sm bg-[#E5484D] text-[7px] font-bold text-white">PDF</span>
                <Texto valor={c.reporte.archivo} className="min-w-0 flex-1 truncate font-medium" />
                <Texto valor={c.reporte.listo} className="font-semibold text-ok-texto" />
              </div>
            )}
          </div>
        )}
      </div>
      {vista && (
        <div className="aparecer absolute inset-0 z-20 flex items-center justify-center bg-[#0B1530]/45 p-3 backdrop-blur-[2px]">
          <div className={`flex w-full max-w-[300px] flex-col gap-2 rounded-xl bg-superficie p-2.5 shadow-2xl ${tic === 14 ? "vista-sale" : ""}`}>
            <div className="flex items-center justify-between px-1 text-[11px] font-semibold">
              <Texto valor={c.reporte.vista} />
              <span className={`relative inline-flex items-center gap-1 rounded-md bg-primario-relleno px-2 py-1 text-[10.5px] text-white ${tic === 13 ? "pulsar" : ""}`}>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 9V3h10v6M7 17H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v7H7z" /></svg>
                <Texto valor={c.reporte.imprimir} />
              </span>
            </div>
            {/* Hoja tipo documento (papel blanco en ambos modos) */}
            <div className="flex flex-col gap-2 rounded-md bg-white p-3 text-[#0B1530] ring-1 ring-black/5">
              <div className="flex items-center justify-between border-b border-[#E2E8F2] pb-1.5">
                <span className="flex items-center gap-1"><Isotipo className="h-2.5 text-[#1F4FE0]" /><span className="text-[8.5px] font-semibold text-[#4A5468]">{titulo.texto}</span></span>
                <span className="text-[8px] text-[#4A5468]">{c.periodo.texto}</span>
              </div>
              <Texto as="p" valor={c.reporte.documento} className="text-[12px] font-bold" />
              <div className="flex flex-col gap-1">
                {[94, 80, 66].map((w, i) => <span key={i} className="h-1 rounded-full bg-[#E2E8F2]" style={{ width: `${w}%` }} />)}
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <table className="w-full text-[8.5px]">
                  <tbody>
                    {filas.slice(0, 3).map((f, i) => (
                      <tr key={i} className="border-b border-[#E2E8F2]">
                        <td className="py-0.5 text-[#4A5468]">{f.pedido.texto}</td>
                        <td className="py-0.5 text-right font-semibold tabular-nums">{f.monto.texto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <svg aria-hidden="true" viewBox="0 0 60 40" className="h-10 w-16">
                  {ventas.map((v, i) => <rect key={i} x={4 + i * 14} y={40 - v * 0.4} width="9" height={v * 0.4} rx="1.5" fill="#1F4FE0" opacity={0.45 + i * 0.18} />)}
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
