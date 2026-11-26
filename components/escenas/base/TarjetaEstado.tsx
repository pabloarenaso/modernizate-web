import type { ReactNode } from "react";

type Tono = "ok" | "info" | "alerta";
const tonos: Record<Tono, string> = {
  ok: "bg-ok-fondo text-ok-texto",
  info: "bg-seleccion text-acento-texto",
  alerta: "bg-[rgba(245,158,11,0.18)] text-texto",
};

/** Tarjeta de estado flotante ("Reserva confirmada", "Pago aprobado"…): ícono en un recuadro, título y detalle. */
export function TarjetaEstado({ icono, titulo, detalle, tono = "ok", className = "" }: { icono: ReactNode; titulo: ReactNode; detalle?: ReactNode; tono?: Tono; className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-xl border border-linea bg-superficie p-2.5 pr-3.5 shadow-[0_18px_40px_-18px_rgba(11,21,48,0.5)] ${className}`}>
      <span aria-hidden="true" className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${tonos[tono]}`}>{icono}</span>
      <span className="min-w-0 leading-tight">
        <span className="block text-[12.5px] font-semibold">{titulo}</span>
        {detalle && <span className="mt-0.5 block text-[11.5px] text-texto-sec">{detalle}</span>}
      </span>
    </div>
  );
}
