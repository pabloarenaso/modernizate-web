"use client";

import { useState } from "react";
import { EscenaViva } from "@/components/escenas/base/EscenaViva";
import { Ico, TRAZOS } from "@/components/escenas/base/Ico";
import { Sorpresa } from "@/components/Sorpresa";
import { Texto } from "@/components/Texto";
import type { Efecto } from "@/lib/sorpresas";

/** Easter egg fijo de cada paso (docs/estandar-escenas.md §9). */
const EFECTOS: Efecto[] = ["temblor", "tildes", "vuelta", "fuegos"];
import type { ComoTrabajamos as ComoTrabajamosC } from "@/content/tipos";
import { MiniPaso } from "./MiniPaso";

/** "Cómo trabajamos": cuatro pasos en una fila; al elegir uno se despliega su detalle con una mini-escena. */
export function ComoTrabajamos({ c }: { c: ComoTrabajamosC }) {
  const [abierto, setAbierto] = useState<number | null>(0);
  const p = abierto === null ? null : c.pasos[abierto];

  return (
    <section id="como-trabajamos" aria-labelledby="como-trabajamos-titulo" className="border-y border-linea bg-suave">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-16 lg:py-20">
        <div className="flex max-w-[720px] flex-col gap-3">
          <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
          <h2 id="como-trabajamos-titulo" className="disp text-[30px] leading-[1.1] sm:text-[38px]">
            <Texto valor={c.titulo} />
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {c.pasos.map((x, i) => {
            const activo = abierto === i;
            return (
              <button
                key={i}
                type="button"
                aria-expanded={activo}
                aria-controls="paso-detalle"
                onClick={() => setAbierto(activo ? null : i)}
                style={{ order: i * 2 }}
                className={`group flex items-start gap-4 rounded-2xl border p-5 text-left transition-colors ${
                  activo ? "border-primario bg-superficie shadow-[0_0_0_3px_var(--seleccion)]" : "border-linea bg-superficie/70 hover:bg-superficie"
                }`}
              >
                <span className={`font-display text-[40px] font-extrabold leading-none tabular-nums ${activo ? "text-acento-texto" : "text-texto-sec/50"}`}>{i + 1}</span>
                <span className="flex min-w-0 flex-1 flex-col gap-1">
                  <Texto valor={x.titulo} className="font-display text-lg font-bold leading-tight" />
                  <Texto valor={x.linea} className="text-sm leading-snug text-texto-sec" />
                </span>
                <span aria-hidden="true" className={`mt-1 text-texto-sec transition-transform duration-300 ${activo ? "rotate-180" : ""}`}>
                  <Ico d="M6 9l6 6 6-6" className="size-4" />
                </span>
                <span className="sr-only">{c.verDetalle.texto}</span>
              </button>
            );
          })}
          {p && abierto !== null && (
            <div
              id="paso-detalle"
              key={abierto}
              role="region"
              aria-label={p.titulo.texto}
              style={{ order: abierto * 2 + 1 }}
              className="desplegar grid md:col-span-4 md:!order-[99]"
            >
              <div className="overflow-hidden">
                <div data-sorpresa-ambito className="relative grid items-center gap-6 rounded-2xl border border-linea bg-superficie p-6 pb-14 md:grid-cols-[1fr_1.1fr] md:p-8">
                  <ul className="flex flex-col gap-2.5">
                    {p.puntos.map((pt, j) => (
                      <li key={j} className="flex gap-2.5 text-[15px] leading-snug">
                        <Ico d={TRAZOS.check} className="mt-0.5 size-4 shrink-0 text-ok-texto" />
                        <Texto valor={pt} />
                      </li>
                    ))}
                  </ul>
                  <EscenaViva className="flex min-h-[260px] items-center justify-center rounded-xl bg-suave p-4">
                    <MiniPaso i={abierto} e={p.escena} />
                  </EscenaViva>
                  <Sorpresa efecto={EFECTOS[abierto]} className="absolute bottom-3 right-3" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
