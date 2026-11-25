"use client";

import { useCallback, useState, type CSSProperties } from "react";

const colores = ["#1F4FE0", "#D9780A", "#0E9F9A", "#9B5DE5", "#8FB0FF", "#DCE6FF"];

type Chispa = { c: string; s: number; redonda: boolean; dx: number; dy: number };
type Rafaga = { id: number; chispas: Chispa[] };

const crear = (): Chispa[] =>
  Array.from({ length: 40 }, () => {
    const ang = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * 120;
    return {
      c: colores[Math.floor(Math.random() * colores.length)],
      s: 5 + Math.random() * 5,
      redonda: Math.random() > 0.5,
      dx: Math.cos(ang) * dist,
      dy: Math.sin(ang) * dist - 30,
    };
  });

/** Confeti repetible (easter egg). Las chispas son decorativas y se ocultan con movimiento reducido. */
export function useConfeti() {
  const [rafagas, setRafagas] = useState<Rafaga[]>([]);

  const disparar = useCallback(() => {
    const id = Date.now() + Math.random();
    setRafagas((r) => [...r, { id, chispas: crear() }]);
    setTimeout(() => setRafagas((r) => r.filter((x) => x.id !== id)), 1500);
  }, []);

  const confeti = rafagas.map((r) => (
    <span key={r.id} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {r.chispas.map((ch, i) => (
        <span
          key={i}
          className="chispa"
          style={
            {
              background: ch.c,
              width: ch.s,
              height: ch.s,
              borderRadius: ch.redonda ? "50%" : "2px",
              "--dx": `${ch.dx}px`,
              "--dy": `${ch.dy}px`,
            } as CSSProperties
          }
        />
      ))}
    </span>
  ));

  return { disparar, confeti };
}
