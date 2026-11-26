"use client";

import { useState } from "react";
import { Texto } from "@/components/Texto";
import type { Servicios as ServiciosC } from "@/content/tipos";
import { EscenaOrden, ZONAS, type Zona } from "./EscenaOrden";

/** "Qué hacemos": texto breve, los servicios como etiquetas y la escena "Del desorden al orden". */
export function Servicios({ c, hrefCasos }: { c: ServiciosC; hrefCasos: string }) {
  const [fijo, setFijo] = useState<Zona | null>(null);
  const [encima, setEncima] = useState<Zona | null>(null);
  const foco = encima ?? fijo;

  return (
    <section id="que-hacemos" aria-labelledby="que-hacemos-titulo" className="mx-auto grid max-w-[1240px] items-center gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:py-24">
      <div className="flex flex-col gap-5">
        <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
        <h2 id="que-hacemos-titulo" className="disp text-[30px] leading-[1.1] sm:text-[38px]">
          <Texto valor={c.titulo} />
        </h2>
        <Texto as="p" valor={c.parrafo} className="max-w-[540px] text-base leading-relaxed text-texto-sec sm:text-[17px]" />
        <ul className="flex flex-wrap gap-2">
          {c.items.map((s, i) => {
            const z = ZONAS[i];
            return (
              <li key={z}>
                <button
                  type="button"
                  aria-pressed={fijo === z}
                  onClick={() => setFijo(fijo === z ? null : z)}
                  onMouseEnter={() => setEncima(z)}
                  onMouseLeave={() => setEncima(null)}
                  onFocus={() => setEncima(z)}
                  onBlur={() => setEncima(null)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    foco === z ? "border-primario bg-seleccion text-acento-texto" : "border-linea bg-superficie hover:border-primario"
                  }`}
                >
                  <Texto valor={s.nombre} />
                </button>
              </li>
            );
          })}
        </ul>
        <a href={hrefCasos} className="inline-flex items-center gap-1.5 self-start font-semibold text-acento-texto underline-offset-4 hover:underline">
          <Texto valor={c.verCasos} />
          <span aria-hidden="true">→</span>
        </a>
      </div>
      <EscenaOrden c={c.escena} foco={foco} />
    </section>
  );
}
