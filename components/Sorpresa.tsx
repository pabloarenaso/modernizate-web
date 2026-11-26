"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { BotonSorpresa } from "@/components/BotonSorpresa";
import { Isotipo } from "@/components/Isotipo";
import type { Sorpresas } from "@/content/tipos";
import { lanzar, type Efecto } from "@/lib/sorpresas";

const Ctx = createContext<Sorpresas | null>(null);

/** Textos de los easter eggs para todos los botones de la página. */
export function SorpresasProvider({ c, children }: { c: Sorpresas; children: ReactNode }) {
  return <Ctx.Provider value={c}>{children}</Ctx.Provider>;
}

/**
 * Easter egg con efecto fijo (nunca al azar). Con movimiento reducido muestra solo un mensaje breve.
 * variante "logo": el propio isotipo es el botón (pie, junto a "Hecho en Chile").
 */
export function Sorpresa({ efecto, className = "", variante = "boton" }: { efecto: Efecto; className?: string; variante?: "boton" | "logo" }) {
  const c = useContext(Ctx);
  const ref = useRef<HTMLSpanElement>(null);
  const [aviso, setAviso] = useState<{ n: number; visible: boolean }>({ n: 0, visible: false });
  if (!c) return variante === "logo" ? <Isotipo className="h-3 text-primario" /> : null;
  const mensaje = c.mensajes[efecto];
  const disparar = () => {
    const boton = ref.current?.querySelector("button");
    if (!boton) return;
    const reducido = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reducido) lanzar(efecto, boton, c.reverso.texto);
    const n = aviso.n + 1;
    setAviso({ n, visible: reducido });
    setTimeout(() => setAviso((a) => (a.n === n ? { ...a, visible: false } : a)), 3500);
  };
  return (
    <span ref={ref} className={`${variante === "logo" ? "relative inline-flex" : "z-10"} ${className}`}>
      {variante === "logo" ? (
        <button type="button" onClick={disparar} aria-label={c.etiqueta.texto} title={c.etiqueta.texto} data-estado={c.etiqueta.estado} className="inline-flex rounded p-0.5 text-primario transition-transform hover:scale-125">
          <Isotipo className="h-3" />
        </button>
      ) : (
        <BotonSorpresa etiqueta={c.etiqueta} onClick={disparar} />
      )}
      <span aria-live="polite" className="sr-only">{aviso.n > 0 ? mensaje.texto : ""}</span>
      {aviso.visible && (
        <span aria-hidden="true" data-estado={mensaje.estado} className="absolute bottom-full right-0 mb-2 w-max max-w-[240px] rounded-lg bg-[#0B1530] px-3 py-1.5 text-[12.5px] font-medium text-white shadow-lg">
          {mensaje.texto}
        </span>
      )}
    </span>
  );
}
