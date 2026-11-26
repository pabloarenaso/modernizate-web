"use client";

import { useState, type CSSProperties } from "react";
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
                  <div className="flex flex-col gap-4">
                    <div className="entra-izq flex flex-col gap-1">
                      <span className="kicker text-acento-texto">
                        <Texto valor={c.paso} /> {abierto + 1} / {c.pasos.length}
                      </span>
                      <Texto as="h3" valor={p.titulo} className="font-display text-[24px] font-bold leading-tight sm:text-[28px]" />
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {p.puntos.map((pt, j) => (
                        <li
                          key={j}
                          className="entra-izq group/punto flex items-center gap-3.5 rounded-xl border border-linea bg-suave/60 px-4 py-3 text-[15px] font-medium leading-snug transition-colors hover:border-primario hover:bg-seleccion/40"
                          style={{ animationDelay: `${200 + j * 160}ms` }}
                        >
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primario-relleno text-white shadow-[0_6px_14px_-6px_var(--primario)]" style={{ "--d": `${450 + j * 160}ms` } as CSSProperties}>
                            <Ico d={TRAZOS.check} className="check-trazo size-4" />
                          </span>
                          <Texto valor={pt} />
                        </li>
                      ))}
                    </ul>
                  </div>
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
