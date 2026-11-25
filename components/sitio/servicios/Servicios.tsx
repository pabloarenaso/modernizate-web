import { Texto } from "@/components/Texto";
import type { Servicios as ServiciosC } from "@/content/tipos";

const iconos = [
  "M3 5h18v14H3zM3 9h18M7 7h.01M10 7h.01",
  "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0",
  "M4 5h16v11H9l-5 4zM8 9.5h8M8 12.5h5",
  "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM9 14l2 2 4-4",
  "M13 2 4 14h7l-1 8 9-12h-7z",
  "M4 4h16v16H4zM4 9.5h16M4 15h16M10 4v16",
];

/** "Qué hacemos": catálogo de servicios, sin precios. */
export function Servicios({ c }: { c: ServiciosC }) {
  return (
    <section id="que-hacemos" aria-labelledby="que-hacemos-titulo" className="mx-auto flex max-w-[1240px] flex-col gap-10 px-6 pb-8 pt-20 lg:pt-28">
      <div className="flex max-w-[720px] flex-col gap-4">
        <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
        <h2 id="que-hacemos-titulo" className="disp text-[30px] leading-[1.1] sm:text-[38px]">
          <Texto valor={c.titulo} />
        </h2>
        <Texto as="p" valor={c.intro} className="text-base leading-relaxed text-texto-sec sm:text-[17px]" />
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((s, i) => (
          <li key={i} className="flex flex-col gap-3 rounded-2xl border border-linea bg-superficie p-6">
            <span aria-hidden="true" className="flex size-11 items-center justify-center rounded-xl bg-seleccion text-acento-texto">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={iconos[i]} /></svg>
            </span>
            <Texto as="h3" valor={s.nombre} className="font-display text-xl font-bold" />
            <Texto as="p" valor={s.que} className="text-[15px] leading-relaxed" />
            <dl className="mt-auto flex flex-col gap-2 border-t border-linea pt-3 text-sm">
              <div>
                <Texto as="dt" valor={c.etiquetas.para} className="text-xs font-semibold uppercase tracking-wide text-texto-sec" />
                <Texto as="dd" valor={s.para} className="mt-0.5 leading-snug" />
              </div>
              <div>
                <Texto as="dt" valor={c.etiquetas.plazo} className="text-xs font-semibold uppercase tracking-wide text-texto-sec" />
                <Texto as="dd" valor={s.plazo} className="mt-0.5 font-medium leading-snug text-acento-texto" />
              </div>
            </dl>
          </li>
        ))}
      </ul>
      <Texto as="p" valor={c.nota} className="text-sm text-texto-sec" />
    </section>
  );
}
