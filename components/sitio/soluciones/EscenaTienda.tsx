"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Texto } from "@/components/Texto";
import type { EscenaTiendaC } from "@/content/tipos";
import { Escalar } from "./Escalar";
import { FotoProducto, fondosProducto, type TipoProducto } from "./FotoProducto";

type Props = {
  c: EscenaTiendaC;
  tamano: "mini" | "grande";
  /** Cada vez que cambia (y es mayor que 0), un producto vuela al carrito. */
  disparo: number;
};

const tipos: TipoProducto[] = ["bolsa", "prensa", "taza"];
const estados = [
  { punto: "#12A150", fondo: "rgba(18,161,80,.13)" },
  { punto: "#D9780A", fondo: "rgba(217,120,10,.14)" },
  { punto: "var(--primario)", fondo: "rgba(31,79,224,.13)" },
];

function Ico({ d, className = "size-4" }: { d: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}
const CARRITO = "M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z";
const LUPA = "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3";
const CANDADO = "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z";

type Vuelo = { k: number; x: number; y: number; dx: number; dy: number };

/** Escena "Tienda en línea": navegador con una tienda ficticia, pago aprobado y pedidos del día. */
export function EscenaTienda({ c, tamano, disparo }: Props) {
  const raiz = useRef<HTMLDivElement>(null);
  const [cuenta, setCuenta] = useState(2);
  const [vuelo, setVuelo] = useState<Vuelo | null>(null);
  const mini = tamano === "mini";

  useEffect(() => {
    if (disparo < 1) return;
    const el = raiz.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const boton = el.querySelector("[data-agregar]");
    const carrito = el.querySelector("[data-carrito]");
    if (!boton || !carrito) return;
    const r = el.getBoundingClientRect();
    const escala = r.width / el.offsetWidth || 1;
    const b = boton.getBoundingClientRect();
    const k = carrito.getBoundingClientRect();
    const x = (b.left + b.width / 2 - r.left) / escala;
    const y = (b.top + b.height / 2 - r.top) / escala;
    const t0 = setTimeout(() => {
      setCuenta(1);
      setVuelo({ k: Date.now(), x, y, dx: (k.left + k.width / 2 - r.left) / escala - x, dy: (k.top + k.height / 2 - r.top) / escala - y });
    }, 0);
    const t1 = setTimeout(() => setCuenta(2), 820);
    const t2 = setTimeout(() => setVuelo(null), 900);
    return () => [t0, t1, t2].forEach(clearTimeout);
  }, [disparo]);

  const productos = c.productos.map((p, i) => (
    <div key={i} className={`flex min-w-0 flex-col ${mini ? "gap-1" : "gap-1 @[560px]:gap-1.5"}`}>
      <div className={`flex items-center justify-center rounded-lg ${mini ? "aspect-[4/3]" : "aspect-[6/5]"}`} style={{ background: fondosProducto[tipos[i]] }}>
        <FotoProducto tipo={tipos[i]} className="h-[86%] w-[86%]" />
      </div>
      {!mini && <Texto valor={p.nombre} className="truncate text-[11px] font-semibold @[560px]:text-[13px]" />}
      {!mini && <Texto valor={p.detalle} className="-mt-1 hidden truncate text-[11.5px] text-texto-sec @[560px]:block" />}
      <Texto valor={p.precio} className={`font-display font-bold tabular-nums ${mini ? "text-[13px]" : "text-[13px] @[560px]:text-[15px]"}`} />
      <span
        data-agregar={i === 0 ? "" : undefined}
        className={`flex items-center justify-center gap-1 rounded-md bg-texto font-semibold text-fondo ${mini ? "h-6 text-[10.5px]" : "h-7 text-[11px] @[560px]:h-8 @[560px]:text-[12px]"}`}
      >
        <Ico d="M12 5v14M5 12h14" className="size-3" />
        <Texto valor={c.agregar} />
      </span>
    </div>
  ));

  const navegador = (
    <div className={`flex flex-col overflow-hidden rounded-xl border border-linea bg-superficie ${mini ? "h-full" : ""} shadow-[0_30px_60px_-30px_rgba(11,21,48,0.45)]`}>
      {/* Barra del navegador */}
      <div className="flex items-center gap-2 border-b border-linea bg-suave px-3 py-2">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </span>
        {!mini && (
          <span className="hidden items-center gap-1 text-texto-sec @[560px]:flex">
            <Ico d="M15 5l-7 7 7 7" className="size-3.5" />
            <Ico d="M9 5l7 7-7 7" className="size-3.5 opacity-40" />
            <Ico d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5" className="size-3.5" />
          </span>
        )}
        <span className="mx-auto flex min-w-0 max-w-[340px] flex-1 items-center justify-center gap-1.5 rounded-md bg-superficie px-3 py-1 text-[11.5px] text-texto-sec shadow-[inset_0_0_0_1px_var(--linea)]">
          <Ico d={CANDADO} className="size-3 shrink-0" />
          <Texto valor={c.dominio} className="truncate text-texto" />
        </span>
        <span aria-hidden="true" className="w-[42px]" />
      </div>
      {!mini && <Texto valor={c.aviso} className="bg-[#4A3426] px-3 py-1 text-center text-[11px] font-medium text-[#FFF4E6]" />}
      {/* Encabezado de la tienda */}
      <div className="flex items-center gap-3 border-b border-linea px-3.5 py-2.5">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="flex size-6 items-center justify-center rounded-full bg-[#4A3426]">
            <svg viewBox="0 0 24 24" className="size-3.5"><ellipse cx="12" cy="12" rx="5" ry="7.5" fill="#E9C9A0" transform="rotate(30 12 12)" /><path d="M8.5 6.5c3 2.5 4 7.5 7 11" stroke="#4A3426" strokeWidth="1.6" fill="none" /></svg>
          </span>
          <Texto valor={c.marca} className="whitespace-nowrap font-display text-[13px] font-bold" />
        </span>
        {!mini && (
          <span className="ml-2 hidden gap-4 text-[12px] text-texto-sec @[640px]:flex">
            {c.nav.map((n, i) => (
              <Texto key={i} valor={n} className={i === 0 ? "font-semibold text-texto" : ""} />
            ))}
          </span>
        )}
        <span className="ml-auto flex items-center gap-2">
          {!mini && (
            <span className="hidden w-[170px] items-center gap-1.5 rounded-full bg-suave px-3 py-1.5 text-[11.5px] text-texto-sec @[560px]:flex">
              <Ico d={LUPA} className="size-3.5" />
              <Texto valor={c.buscar} className="truncate" />
            </span>
          )}
          <span data-carrito="" className="relative flex size-8 items-center justify-center rounded-full border border-linea text-texto" aria-label={`${c.carrito.texto}: ${cuenta}`}>
            <Ico d={CARRITO} className="size-[17px]" />
            <span key={cuenta} className="contador absolute -right-1.5 -top-1.5 flex size-[18px] items-center justify-center rounded-full bg-[#B45309] text-[10.5px] font-bold text-white">
              {cuenta}
            </span>
          </span>
        </span>
      </div>
      <div className={mini ? "px-3.5 pt-2.5" : "px-3.5 pb-4 pt-3 @[560px]:px-5"}>
        {!mini && <Texto as="p" valor={c.seccion} className="mb-2.5 font-display text-[13px] font-semibold @[560px]:text-[15px]" />}
        <div className={`grid grid-cols-3 ${mini ? "gap-2.5" : "gap-2.5 @[560px]:gap-4"}`}>{productos}</div>
      </div>
    </div>
  );

  const pago = (
    <div className="flex items-start gap-2.5 rounded-xl border border-linea bg-superficie p-3 shadow-[0_18px_40px_-18px_rgba(11,21,48,0.5)]">
      <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ok-fondo text-ok-texto">
        <Ico d="M5 12.5l4.5 4.5L19 7.5" className="size-[18px]" />
      </span>
      <div className="min-w-0 flex-1 leading-tight">
        <Texto as="p" valor={c.pago.titulo} className="text-[13px] font-semibold" />
        <p className="mt-0.5 whitespace-nowrap text-[12px] text-texto-sec">
          <Texto valor={c.pago.pedido} /> · <Texto valor={c.pago.monto} className="font-semibold text-texto tabular-nums" />
        </p>
        {!mini && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10.5px] text-texto-sec">
            <span className="inline-flex items-center gap-1 rounded border border-linea px-1.5 py-0.5">
              <Ico d="M3 6h18v12H3zM3 10h18M7 15h3" className="size-3" />
              <Texto valor={c.pago.tarjeta} />
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-linea px-1.5 py-0.5">
              <Ico d="M4 9h16M4 9l8-5 8 5M6 9v8M10 9v8M14 9v8M18 9v8M4 20h16" className="size-3" />
              <Texto valor={c.pago.transferencia} />
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const pedidos = (
    <div className="overflow-hidden rounded-xl border border-linea bg-superficie shadow-[0_18px_40px_-18px_rgba(11,21,48,0.5)]">
      <Texto as="p" valor={c.pedidos.titulo} className="border-b border-linea px-3 py-2 text-[12px] font-semibold" />
      <ul>
        {c.pedidos.filas.map((f, i) => (
          <li key={i} className="flex items-center gap-2 border-b border-linea px-3 py-1.5 text-[11.5px] last:border-b-0">
            <Texto valor={f.numero} className="w-10 shrink-0 font-medium tabular-nums text-texto-sec" />
            <Texto valor={f.cliente} className="min-w-0 flex-1 truncate" />
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-px text-[10.5px] font-medium" style={{ background: estados[i].fondo }}>
              <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: estados[i].punto }} />
              <Texto valor={f.estado} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  const volador = vuelo && (
    <span
      key={vuelo.k}
      aria-hidden="true"
      className="vuelo pointer-events-none absolute z-20 flex size-9 items-center justify-center rounded-full border border-linea bg-superficie shadow-lg"
      style={{ left: vuelo.x, top: vuelo.y, "--dx": `${vuelo.dx}px`, "--dy": `${vuelo.dy}px` } as CSSProperties}
    >
      <FotoProducto tipo="bolsa" className="size-7" />
    </span>
  );

  if (mini) {
    return (
      <Escalar ancho={380} alto={232}>
        <div ref={raiz} role="img" aria-label={c.descripcion.texto} className="relative h-full w-full">
          <div className="absolute left-3 right-9 top-3 h-[260px]">{navegador}</div>
          <div className="absolute bottom-2.5 right-2 w-[206px]">{pago}</div>
          {volador}
        </div>
      </Escalar>
    );
  }

  return (
    <div ref={raiz} role="img" aria-label={c.descripcion.texto} className="@container relative">
      <div className="@[760px]:mr-[210px]">{navegador}</div>
      <div className="relative z-10 -mt-6 ml-auto w-[88%] max-w-[300px] aparecer-tarde @[760px]:absolute @[760px]:right-0 @[760px]:top-[150px] @[760px]:mt-0 @[760px]:w-[270px]">
        {pago}
      </div>
      <div className="relative z-10 mt-3 w-[92%] max-w-[320px] aparecer-tarde [animation-delay:1.1s] @[760px]:absolute @[760px]:-bottom-2 @[760px]:right-4 @[760px]:mt-0 @[760px]:w-[290px]">
        {pedidos}
      </div>
      {volador}
    </div>
  );
}
