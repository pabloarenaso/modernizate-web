"use client";

import { useCallback, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

const colores = ["#1F4FE0", "#D9780A", "#0E9F9A", "#9B5DE5", "#8FB0FF", "#E5484D", "#F5C542", "#12A150"];
type Pieza = { x: number; deriva: number; giro: number; ancho: number; alto: number; c: string; dur: number; retraso: number; redonda: boolean };
type Rafaga = { id: number; piezas: Pieza[] };

const crear = (): Pieza[] =>
  Array.from({ length: 180 }, () => {
    const redonda = Math.random() < 0.3;
    const ancho = 8 + Math.random() * 10;
    return {
      x: Math.random() * 100,
      deriva: (Math.random() - 0.5) * 30,
      giro: (Math.random() - 0.5) * 1440,
      ancho,
      alto: redonda ? ancho : ancho * (0.4 + Math.random() * 0.8),
      c: colores[Math.floor(Math.random() * colores.length)],
      dur: 2.2 + Math.random() * 1.8,
      retraso: Math.random() * 0.7,
      redonda,
    };
  });

/** Confeti a pantalla completa (capa fija sobre la ventana), repetible. Con movimiento reducido no se muestra. */
export function useConfetiPantalla() {
  const [rafagas, setRafagas] = useState<Rafaga[]>([]);

  const disparar = useCallback(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = Date.now() + Math.random();
    setRafagas((r) => [...r, { id, piezas: crear() }]);
    setTimeout(() => setRafagas((r) => r.filter((x) => x.id !== id)), 4800);
  }, []);

  const confeti =
    rafagas.length > 0 && typeof document !== "undefined"
      ? createPortal(
          <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            {rafagas.map((r) =>
              r.piezas.map((p, i) => (
                <span
                  key={`${r.id}-${i}`}
                  className="confeti-pieza"
                  style={
                    {
                      left: `${p.x}vw`,
                      width: p.ancho,
                      height: p.alto,
                      background: p.c,
                      borderRadius: p.redonda ? "50%" : "2px",
                      animationDuration: `${p.dur}s`,
                      animationDelay: `${p.retraso}s`,
                      "--deriva": `${p.deriva}vw`,
                      "--giro": `${p.giro}deg`,
                    } as CSSProperties
                  }
                />
              )),
            )}
          </div>,
          document.body,
        )
      : null;

  return { disparar, confeti };
}
