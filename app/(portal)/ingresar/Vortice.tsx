"use client";

import { useEffect, useRef } from "react";
import { useEnPantalla } from "@/hooks/useEnPantalla";
import { useMovimientoReducido } from "@/hooks/useMovimientoReducido";

type Particula = { x: number; y: number; vida: number; ttl: number; vel: number; r: number; tono: number };

const FONDO = "14,29,92";
const TAU = Math.PI * 2;

/** Vórtice de partículas en azules de la marca (panel izquierdo de /ingresar). Decorativo. */
export function Vortice() {
  const lienzo = useRef<HTMLCanvasElement>(null);
  const enPantalla = useEnPantalla(lienzo);
  const reducido = useMovimientoReducido();
  const estado = useRef<{ parts: Particula[]; t: number; w: number; h: number }>({ parts: [], t: 0, w: 0, h: 0 });

  useEffect(() => {
    const c = lienzo.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const s = estado.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const nacer = (): Particula => ({
      x: Math.random() * s.w,
      y: s.h / 2 + (Math.random() - 0.5) * Math.min(s.h * 0.55, 260),
      vida: 0,
      ttl: 60 + Math.random() * 160,
      vel: 0.4 + Math.random() * 1.4,
      r: 0.6 + Math.random() * 1.6,
      tono: 215 + Math.random() * 35,
    });

    const ajustar = () => {
      const w = c.clientWidth;
      const h = c.clientHeight;
      if (w === s.w && h === s.h) return;
      s.w = w;
      s.h = h;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = `rgb(${FONDO})`;
      ctx.fillRect(0, 0, w, h);
      const n = Math.min(520, Math.round((w * h) / 900));
      s.parts = Array.from({ length: n }, nacer);
    };

    const paso = () => {
      ajustar();
      const { w, h } = s;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(${FONDO},0.14)`;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      s.t += 0.004;
      for (let i = 0; i < s.parts.length; i++) {
        const p = s.parts[i];
        // Campo de flujo simple: ondas que giran en torno al centro.
        const a = (Math.sin(p.x * 0.0045 + s.t * 3) + Math.cos(p.y * 0.006 - s.t * 2)) * Math.PI + s.t * TAU * 0.1;
        const nx = p.x + Math.cos(a) * p.vel;
        const ny = p.y + Math.sin(a) * p.vel * 0.6;
        const alfa = Math.sin((p.vida / p.ttl) * Math.PI);
        ctx.strokeStyle = `hsla(${p.tono},90%,65%,${alfa * 0.9})`;
        ctx.lineWidth = p.r;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(nx, ny);
        ctx.stroke();
        p.x = nx;
        p.y = ny;
        p.vida++;
        if (p.vida > p.ttl || p.x < -10 || p.x > w + 10 || p.y < -10 || p.y > h + 10) s.parts[i] = nacer();
      }
    };

    if (reducido) {
      // Imagen fija: se calcula un rato sin animar y queda quieta.
      for (let i = 0; i < 140; i++) paso();
      return;
    }
    if (!enPantalla) return;
    let raf = requestAnimationFrame(function cuadro() {
      paso();
      raf = requestAnimationFrame(cuadro);
    });
    return () => cancelAnimationFrame(raf);
  }, [enPantalla, reducido]);

  return <canvas ref={lienzo} aria-hidden="true" className="absolute inset-0 size-full" style={{ background: `rgb(${FONDO})` }} />;
}
