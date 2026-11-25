"use client";

import { useRef, useState } from "react";
import { Texto } from "@/components/Texto";
import type { Caso, EscenaTiendaC, Soluciones } from "@/content/tipos";
import { EscenaTienda } from "./EscenaTienda";

type Props = {
  caso: Caso;
  c: Pick<Soluciones, "abrir" | "cerrar">;
  hrefContacto: string;
  escena: EscenaTiendaC;
  id: string;
};

/** Tarjeta de un caso con su miniatura; al abrirla, un panel con la escena grande y los tres pasos. */
export function TarjetaCaso({ caso, c, hrefContacto, escena, id }: Props) {
  const dialogo = useRef<HTMLDialogElement>(null);
  const [hover, setHover] = useState(0);
  const [abierto, setAbierto] = useState(0);
  const abrir = () => {
    dialogo.current?.showModal();
    setAbierto((n) => n + 1);
  };

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-linea bg-superficie transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(11,21,48,0.45)]"
      onMouseEnter={() => setHover((n) => n + 1)}
    >
      <div className="border-b border-linea bg-suave"><EscenaTienda c={escena} tamano="mini" disparo={hover} /></div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <Texto as="h3" valor={caso.titulo} className="font-display text-xl font-bold" />
        <Texto as="p" valor={caso.frase} className="text-[15px] leading-relaxed text-texto-sec" />
        <button
          type="button"
          onClick={abrir}
          onFocus={() => setHover((n) => n + 1)}
          className="mt-2 inline-flex h-10 items-center gap-1.5 self-start rounded-lg border border-linea px-3.5 text-sm font-semibold text-acento-texto after:absolute after:inset-0 hover:bg-suave"
        >
          <Texto valor={c.abrir} />
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <dialog
        ref={dialogo}
        aria-labelledby={`${id}-titulo`}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto max-h-[94vh] w-[calc(100%-20px)] max-w-[1080px] overflow-y-auto rounded-2xl border border-linea bg-fondo p-0 text-texto backdrop:bg-[#0B1530]/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex flex-col gap-6 p-4 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h3 id={`${id}-titulo`} className="font-display text-2xl font-bold">
              <Texto valor={caso.titulo} />
            </h3>
            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              aria-label={c.cerrar.texto}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-linea hover:bg-suave"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
          <div className="rounded-2xl bg-suave p-3 sm:p-6">{abierto > 0 && <EscenaTienda c={escena} tamano="grande" disparo={abierto} />}</div>
          <ol className="grid gap-5 md:grid-cols-3">
            {caso.lineas.map((l, i) => (
              <li key={i} className="flex flex-col gap-1.5">
                <span className="kicker text-acento-texto">
                  {String(i + 1).padStart(2, "0")} · <Texto valor={l.etiqueta} />
                </span>
                <Texto as="p" valor={l.titulo} className="font-display text-[17px] font-bold" />
                <Texto as="p" valor={l.texto} className="text-[15px] leading-relaxed text-texto-sec" />
              </li>
            ))}
          </ol>
          <a href={hrefContacto} className="inline-flex h-12 items-center self-start rounded-[10px] bg-primario-relleno px-6 font-semibold text-white hover:brightness-110">
            <Texto valor={caso.cta} />
          </a>
        </div>
      </dialog>
    </article>
  );
}
