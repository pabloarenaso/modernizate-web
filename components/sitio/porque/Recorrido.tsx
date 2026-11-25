"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const sinSuscripcion = () => () => {};

type Paso = { texto: ReactNode; visual: ReactNode };

/**
 * Recorrido con scroll fijado (escritorio): el texto avanza a la izquierda y el gráfico
 * del paso activo queda fijo a la derecha. En pantallas angostas cada paso muestra su gráfico debajo.
 */
export function Recorrido({ pasos }: { pasos: Paso[] }) {
  const [activo, setActivo] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [vistos, setVistos] = useState<boolean[]>(() => pasos.map(() => false));
  // Antes de hidratar los gráficos se ven completos (sin JS no quedan ocultos); después esperan a entrar en pantalla.
  const montado = useSyncExternalStore(sinSuscripcion, () => true, () => false);
  const esperando = (visto: boolean) => (montado && !visto ? "" : undefined);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const i = refs.current.indexOf(e.target as HTMLDivElement);
          if (i >= 0) {
            setActivo(i);
            setVistos((v) => (v[i] ? v : v.map((x, j) => (j === i ? true : x))));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      <div>
        {pasos.map((p, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="flex flex-col gap-6 py-10 lg:min-h-[72vh] lg:justify-center lg:py-0"
          >
            <div className={`transition-opacity duration-500 ${i === activo ? "lg:opacity-100" : "lg:opacity-40"}`}>{p.texto}</div>
            <div data-esperando={esperando(vistos[i])} className="rounded-2xl border border-linea bg-superficie p-5 lg:hidden">
              {p.visual}
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-236px)] grid h-[520px]">
          {pasos.map((p, i) => (
            <div
              key={i}
              aria-hidden={i !== activo}
              inert={i !== activo}
              data-esperando={esperando(i === activo && vistos[i])}
              className={`col-start-1 row-start-1 self-center rounded-2xl border border-linea bg-superficie p-7 shadow-[0_24px_60px_-30px_rgba(11,21,48,0.35)] transition-[opacity,translate] duration-500 ${
                i === activo ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0"
              }`}
            >
              {p.visual}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
