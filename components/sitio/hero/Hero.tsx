"use client";

import { useEffect, useRef, useState } from "react";
import { useConfeti } from "@/components/Confeti";
import { Texto } from "@/components/Texto";
import type { Contenido, Texto as TextoC } from "@/content/tipos";
import { useEnPantalla } from "@/hooks/useEnPantalla";
import { useMovimientoReducido } from "@/hooks/useMovimientoReducido";
import { EscenaConversacion } from "./EscenaConversacion";
import { EscenaFlujo } from "./EscenaFlujo";
import { EscenaPanel } from "./EscenaPanel";
import { FondoHero } from "./FondoHero";

type Props = { c: Contenido["hero"]; cta: TextoC; hrefContacto: string; hrefMetodo: string };

type Estado = { escena: number; paso: number; escribiendo: boolean; espera: number };
const TIC = 1200;
const ESPERAS = [3, 5, 6];

/** Hero con carrusel de 3 escenas y título sincronizado (tiempos de Landing.dc.html). */
export function Hero({ c, cta, hrefContacto, hrefMetodo }: Props) {
  const raiz = useRef<HTMLElement>(null);
  const enPantalla = useEnPantalla(raiz);
  const reducido = useMovimientoReducido();
  const [encima, setEncima] = useState(false);
  const [detenido, setDetenido] = useState(false);
  const [e, setE] = useState<Estado>({ escena: 0, paso: 0, escribiendo: false, espera: 0 });
  const { disparar, confeti } = useConfeti();
  const guion = c.conversacion.guion;

  const avanza = enPantalla && !reducido && !detenido && !encima;
  const enMovimiento = enPantalla && !reducido && !detenido;

  useEffect(() => {
    if (!avanza) return;
    const id = setInterval(() => {
      setE((s) => {
        if (s.escena === 0 && s.paso < guion.length) {
          const sig = guion[s.paso];
          if (sig.quien === "bot" && !s.escribiendo) return { ...s, escribiendo: true };
          return { ...s, escribiendo: false, paso: s.paso + 1 };
        }
        if (s.espera < ESPERAS[s.escena]) return { ...s, espera: s.espera + 1 };
        const escena = (s.escena + 1) % 3;
        return { escena, paso: 0, escribiendo: false, espera: 0 };
      });
    }, TIC);
    return () => clearInterval(id);
  }, [avanza, guion]);

  const ir = (i: number) => setE({ escena: i, paso: 0, escribiendo: false, espera: 0 });
  const esc = c.escenas[e.escena];
  // Con movimiento reducido la conversación se muestra completa.
  const paso = reducido ? guion.length : e.paso;

  return (
    <section
      ref={raiz}
      id="inicio"
      data-pausado={enMovimiento ? undefined : ""}
      className="hero-puntos relative overflow-hidden border-b border-linea"
    >
      <FondoHero />
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-8 px-6 pb-10 pt-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:pb-12 lg:pt-10">
        <div className="flex min-w-0 flex-col gap-5">
          <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
          <div key={e.escena} className="aparecer flex flex-col gap-4 lg:min-h-[228px]">
            <h1 className="disp text-[30px] leading-[1.08] sm:text-[38px] xl:text-[42px]">
              <Texto valor={esc.tituloA} />
              <Texto valor={esc.tituloB} className="text-acento-texto" />
            </h1>
            <Texto as="p" valor={esc.parrafo} className="max-w-[520px] text-base leading-relaxed text-texto-sec sm:text-[17px]" />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href={hrefContacto} className="inline-flex h-12 items-center rounded-[10px] bg-primario-relleno px-6 font-semibold text-white transition-[filter] hover:brightness-110">
              <Texto valor={cta} />
            </a>
            <a href={hrefMetodo} className="inline-flex h-12 items-center rounded-[10px] border border-linea bg-superficie px-6 font-semibold text-texto transition-colors hover:bg-suave">
              <Texto valor={c.secundario} />
            </a>
            <span className="relative">
              <button type="button" onClick={disparar} className="huevo">
                <Texto valor={c.huevo} />
              </button>
              {confeti}
            </span>
          </div>
        </div>

        <div
          role="region"
          aria-roledescription="carrusel"
          aria-label={c.carrusel.region.texto}
          className="flex min-w-0 flex-col gap-2"
          onMouseEnter={() => setEncima(true)}
          onMouseLeave={() => setEncima(false)}
          onFocus={() => setEncima(true)}
          onBlur={(ev) => {
            if (!ev.currentTarget.contains(ev.relatedTarget as Node)) setEncima(false);
          }}
        >
          <div
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${c.carrusel.diapositiva.texto} ${e.escena + 1} ${c.carrusel.de.texto} 3: ${esc.marco.texto}`}
            className="h-[440px] sm:h-[470px]"
          >
            {e.escena === 0 && <EscenaConversacion c={c.conversacion} paso={paso} escribiendo={!reducido && e.escribiendo} />}
            {e.escena === 1 && <EscenaFlujo c={c.flujo} enMovimiento={enMovimiento} reducido={reducido} />}
            {e.escena === 2 && <EscenaPanel c={c.panel} titulo={esc.marco} />}
          </div>
          <div className="flex items-center justify-center gap-2">
            {c.escenas.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => ir(i)}
                aria-label={s.punto.texto}
                aria-current={i === e.escena ? "true" : undefined}
                className="flex h-6 items-center"
              >
                <span
                  className="block h-2 rounded-full transition-[width] duration-300"
                  style={{ width: i === e.escena ? 28 : 8, background: i === e.escena ? "var(--primario)" : "var(--linea)" }}
                />
              </button>
            ))}
            {!reducido && (
              <button
                type="button"
                onClick={() => setDetenido((d) => !d)}
                aria-label={detenido ? c.carrusel.reanudar.texto : c.carrusel.pausar.texto}
                title={detenido ? c.carrusel.reanudar.texto : c.carrusel.pausar.texto}
                className="ml-2 inline-flex size-8 items-center justify-center rounded-full border border-linea bg-superficie text-texto-sec hover:text-texto"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-3.5" fill="currentColor">
                  {detenido ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
                </svg>
              </button>
            )}
          </div>
          <Texto as="p" valor={c.nota} className="text-center text-xs text-texto-sec" />
        </div>
      </div>
    </section>
  );
}
