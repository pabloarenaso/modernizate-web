import { Texto } from "@/components/Texto";
import type { ComoTrabajamos as ComoTrabajamosC } from "@/content/tipos";

/** "Cómo trabajamos": cuatro pasos y el modelo de cobro. */
export function ComoTrabajamos({ c }: { c: ComoTrabajamosC }) {
  return (
    <section id="como-trabajamos" aria-labelledby="como-trabajamos-titulo" className="border-y border-linea bg-suave">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-6 py-20 lg:py-28">
        <div className="flex max-w-[720px] flex-col gap-4">
          <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
          <h2 id="como-trabajamos-titulo" className="disp text-[30px] leading-[1.1] sm:text-[38px]">
            <Texto valor={c.titulo} />
          </h2>
        </div>
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {c.pasos.map((p, i) => (
            <li key={i} className="flex flex-col gap-3 rounded-2xl border border-linea bg-superficie p-6">
              <span className="font-display text-sm font-bold text-acento-texto">{String(i + 1).padStart(2, "0")}</span>
              <Texto as="h3" valor={p.titulo} className="font-display text-xl font-bold" />
              <Texto as="p" valor={p.corto} className="text-sm font-semibold text-texto-sec" />
              <Texto as="p" valor={p.texto} className="text-[15px] leading-relaxed" />
              <ul className="mt-auto flex flex-col gap-1.5 border-t border-linea pt-3 text-sm text-texto-sec">
                {p.puntos.map((x, j) => (
                  <li key={j} className="flex gap-2">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 text-ok-texto" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    <Texto valor={x} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <div className="grid gap-6 rounded-2xl bg-lateral p-7 text-white sm:p-9 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div className="flex flex-col gap-3">
            <Texto as="h3" valor={c.modelo.titulo} className="font-display text-2xl font-bold" />
            <Texto as="p" valor={c.modelo.texto} className="text-[16px] leading-relaxed text-white/90" />
          </div>
          <ul className="flex flex-col gap-2.5">
            {c.modelo.puntos.map((x, i) => (
              <li key={i} className="flex items-center gap-2.5 rounded-xl bg-white/10 px-4 py-3 font-semibold">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 shrink-0 text-[#9EC1FF]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                <Texto valor={x} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
