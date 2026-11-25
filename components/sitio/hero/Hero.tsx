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

type Estado = { escena: number; paso: number; escribiendo: boolean; redactando: boolean; espera: number; t: number };
const TIC = 1200;
/** Tics de espera al final de cada escena (la 2 y la 3 usan esos tics para su propia secuencia). */
const ESPERAS = [3, 12, 11];

/** Hero con carrusel de 3 escenas y título sincronizado (tiempos de Landing.dc.html). */
export function Hero({ c, cta, hrefContacto, hrefMetodo }: Props) {
  const raiz = useRef<HTMLElement>(null);
  const enPantalla = useEnPantalla(raiz);
  const reducido = useMovimientoReducido();
  const [encima, setEncima] = useState(false);
  const [detenido, setDetenido] = useState(false);
  const [e, setE] = useState<Estado>({ escena: 0, paso: 0, escribiendo: false, redactando: false, espera: 0, t: 0 });
  const { disparar, confeti } = useConfeti();
  const guion = c.conversacion.guion;
  // Duración de cada escena en tics, para la barra de progreso de los indicadores.
  const totales = [guion.reduce((n, m) => n + (m.quien === "tarjeta" ? 1 : 2), 0) + ESPERAS[0] + 1, ESPERAS[1] + 1, ESPERAS[2] + 1];

  const avanza = enPantalla && !reducido && !detenido && !encima;
  const enMovimiento = enPantalla && !reducido && !detenido;

  useEffect(() => {
    if (!avanza) return;
    const id = setInterval(() => {
      setE((s0) => {
        const s = { ...s0, t: s0.t + 1 };
        if (s.escena === 0 && s.paso < guion.length) {
          const sig = guion[s.paso];
          if (sig.quien === "bot" && !s.escribiendo) return { ...s, escribiendo: true };
          if (sig.quien === "usuario" && !s.redactando) return { ...s, redactando: true };
          return { ...s, escribiendo: false, redactando: false, paso: s.paso + 1 };
        }
        if (s.espera < ESPERAS[s.escena]) return { ...s, espera: s.espera + 1 };
        const escena = (s.escena + 1) % 3;
        return { escena, paso: 0, escribiendo: false, redactando: false, espera: 0, t: 0 };
      });
    }, TIC);
    return () => clearInterval(id);
  }, [avanza, guion]);

  const ir = (i: number) => {
    // Clic en la escena activa: pausa o reanuda (WCAG 2.2.2). En otra: va a esa escena.
    if (i === e.escena) setDetenido((d) => !d);
    else setE({ escena: i, paso: 0, escribiendo: false, redactando: false, espera: 0, t: 0 });
  };
  const pausado = detenido || encima;
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
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-8 px-6 pb-10 pt-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-8 lg:pb-12 lg:pt-10">
        <div className="flex min-w-0 flex-col gap-5">
          <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
          {/* Las tres versiones ocupan la misma celda: el alto es el de la más larga y los botones no saltan. */}
          <div className="grid">
            {c.escenas.map((s, i) => {
              const actual = i === e.escena;
              const Titulo = actual ? "h1" : "p";
              return (
                <div
                  key={actual ? `a${e.escena}` : i}
                  aria-hidden={actual ? undefined : true}
                  className={`col-start-1 row-start-1 flex flex-col gap-4 ${actual ? "aparecer" : "invisible"}`}
                >
                  <Titulo className="disp text-[30px] leading-[1.08] sm:text-[38px] xl:text-[42px]">
                    <Texto valor={s.tituloA} />
                    <Texto valor={s.tituloB} className="text-acento-texto" />
                  </Titulo>
                  <Texto as="p" valor={s.parrafo} className="max-w-[520px] text-base leading-relaxed text-texto-sec sm:text-[17px]" />
                </div>
              );
            })}
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
            className="h-[470px] sm:h-[490px]"
          >
            {e.escena === 0 && <EscenaConversacion c={c.conversacion} paso={paso} escribiendo={!reducido && e.escribiendo} redactando={!reducido && e.redactando} />}
            {e.escena === 1 && <EscenaFlujo c={c.flujo} tic={e.espera} reducido={reducido} />}
            {e.escena === 2 && <EscenaPanel c={c.panel} titulo={esc.marco} tic={reducido ? 99 : e.espera} />}
          </div>
          {/* Indicadores: barra que se llena con el avance de cada escena. */}
          <div className="flex items-center justify-center gap-1.5">
            {c.escenas.map((s, i) => {
              const activo = i === e.escena;
              const lleno = reducido ? (activo ? 100 : 0) : activo ? Math.min(100, (e.t / totales[i]) * 100) : 0;
              const etiqueta = activo && !reducido ? `${s.punto.texto}. ${detenido ? c.carrusel.reanudar.texto : c.carrusel.pausar.texto}` : s.punto.texto;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => ir(i)}
                  aria-label={etiqueta}
                  title={etiqueta}
                  aria-current={activo ? "true" : undefined}
                  className="group flex h-8 items-center px-1"
                >
                  <span className="relative block h-1.5 w-12 overflow-hidden rounded-full bg-linea transition-colors group-hover:bg-barra-suave">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-primario"
                      style={{ width: `${lleno}%`, transition: activo && !pausado && e.t > 0 ? `width ${TIC}ms linear` : "none" }}
                    />
                  </span>
                </button>
              );
            })}
            {detenido && !reducido && (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 size-3.5 text-texto-sec" fill="currentColor">
                <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
              </svg>
            )}
          </div>
          <Texto as="p" valor={c.nota} className="text-center text-xs text-texto-sec" />
        </div>
      </div>
    </section>
  );
}
