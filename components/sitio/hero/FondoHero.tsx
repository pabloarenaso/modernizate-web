import type { CSSProperties } from "react";

/** Posiciones fijas (deterministas) para que servidor y cliente pinten lo mismo. */
const nubes = [
  { w: 320, h: 110, top: "12%", left: "-30%", dur: 46, delay: 0, op: 0.95, reposo: 620 },
  { w: 240, h: 90, top: "46%", left: "-40%", dur: 38, delay: -14, op: 0.85, reposo: 900 },
  { w: 420, h: 140, top: "68%", left: "-50%", dur: 60, delay: -30, op: 0.8, reposo: 760 },
  { w: 200, h: 70, top: "28%", left: "-30%", dur: 32, delay: -22, op: 0.7, reposo: 1000 },
];
const estrellas = Array.from({ length: 60 }, (_, i) => ({ x: (i * 37) % 100, y: (i * 53) % 100, d: (i % 7) * 0.4 }));
const meteoros = Array.from({ length: 16 }, (_, i) => ({
  x: ((i * 29) % 110) - 5,
  y: -8 + (i % 4) * 7,
  d: i * 0.9,
  dur: 4 + (i % 4) * 1.2,
}));

const particulas = Array.from({ length: 46 }, (_, i) => ({
  x: (i * 41) % 100,
  y: 18 + ((i * 67) % 80),
  d: ((i * 13) % 70) / 10,
  dur: 6 + (i % 5),
  t: 3 + (i % 4) * 1.4,
}));
const destellos = Array.from({ length: 16 }, (_, i) => ({
  x: ((i * 31) % 110) - 5,
  y: -8 + (i % 4) * 7,
  d: i * 0.95,
  dur: 4.5 + (i % 4) * 1.1,
}));

/** Fondo del hero. Día: nubes, partículas de luz y destellos celeste y cobalto. Noche: estrellas y meteoros. Solo CSS. */
export function FondoHero() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="solo-dia">
        <div className="cielo">
          {nubes.map((n, i) => (
            <div
              key={i}
              className="nube"
              style={
                {
                  width: n.w,
                  height: n.h,
                  top: n.top,
                  left: n.left,
                  opacity: n.op,
                  animationDuration: `${n.dur}s`,
                  animationDelay: `${n.delay}s`,
                  "--reposo": `${n.reposo}px`,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <div className="absolute inset-0">
          {particulas.map((p, i) => (
            <div
              key={i}
              className="particula"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.t, height: p.t, animationDelay: `${p.d}s`, animationDuration: `${p.dur}s` }}
            />
          ))}
          {destellos.map((m, i) => (
            <div
              key={i}
              className={`destello ${i % 2 ? "destello-cobalto" : ""}`}
              style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${m.d}s`, animationDuration: `${m.dur}s` }}
            />
          ))}
        </div>
      </div>
      <div className="solo-noche absolute inset-0">
        {estrellas.map((s, i) => (
          <div key={i} className="estrella" style={{ left: `${s.x}%`, top: `${s.y}%`, animationDelay: `${s.d}s` }} />
        ))}
        {meteoros.map((m, i) => (
          <div
            key={i}
            className="meteoro"
            style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${m.d}s`, animationDuration: `${m.dur}s` }}
          />
        ))}
      </div>
    </div>
  );
}
