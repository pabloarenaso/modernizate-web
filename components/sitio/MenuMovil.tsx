"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type Props = { etiquetaAbrir: string; etiquetaCerrar: string; children: ReactNode };

/** Menú desplegable para pantallas angostas. Esc lo cierra y el foco vuelve al botón. */
export function MenuMovil({ etiquetaAbrir, etiquetaCerrar, children }: Props) {
  const [abierto, setAbierto] = useState(false);
  const boton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(false);
        boton.current?.focus();
      }
    };
    const alClic = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!panel.current?.contains(t) && !boton.current?.contains(t)) setAbierto(false);
    };
    document.addEventListener("keydown", alTeclear);
    document.addEventListener("click", alClic);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.removeEventListener("click", alClic);
    };
  }, [abierto]);

  return (
    <div className="xl:hidden">
      <button
        ref={boton}
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        aria-label={abierto ? etiquetaCerrar : etiquetaAbrir}
        onClick={() => setAbierto((v) => !v)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-linea bg-superficie text-texto"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {abierto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <div
        ref={panel}
        id={id}
        hidden={!abierto}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setAbierto(false);
        }}
        className="absolute inset-x-0 top-full border-b border-linea bg-fondo px-6 pb-6 pt-2 shadow-lg"
      >
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4">{children}</div>
      </div>
    </div>
  );
}
