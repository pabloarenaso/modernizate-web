import { Texto } from "@/components/Texto";
import type { ContactoC } from "@/content/tipos";
import { enlaceWhatsapp } from "./enlaces";
import { FormularioContacto } from "./FormularioContacto";
import { IconoChat } from "./IconoChat";

/** Contacto: formulario en tarjeta (Web3Forms) y columna con WhatsApp. */
export function Contacto({ c }: { c: ContactoC }) {
  const wa = enlaceWhatsapp(c.whatsappMensaje.texto);
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="border-t border-linea bg-suave">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-10 px-6 py-20 lg:py-24">
        <div className="mx-auto flex max-w-[640px] flex-col items-center gap-3 text-center">
          <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
          <h2 id="contacto-titulo" className="disp text-[30px] leading-[1.1] sm:text-[38px]">
            <Texto valor={c.titulo} />
          </h2>
          <Texto as="p" valor={c.intro} className="text-base leading-relaxed text-texto-sec sm:text-[17px]" />
        </div>
        <div className="mx-auto grid w-full max-w-[1080px] items-stretch gap-6 lg:grid-cols-[1.5fr_1fr]">
          <FormularioContacto c={c} />
          {wa && (
            <aside className="flex flex-col justify-center gap-4 rounded-2xl border border-linea bg-superficie p-6 sm:p-8">
              <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-[10px] bg-ok-fondo text-ok-texto">
                <IconoChat />
              </span>
              <Texto as="p" valor={c.oWhatsapp} className="font-display text-[19px] font-semibold" />
              <p className="flex items-center gap-2 text-sm text-texto-sec">
                <span aria-hidden="true" className="relative flex size-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#12A150] opacity-60" />
                  <span className="relative size-2.5 rounded-full bg-[#12A150]" />
                </span>
                <Texto valor={c.respondo} />
              </p>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[#0E7A3E] px-5 font-semibold text-white transition-[filter] hover:brightness-110"
              >
                <IconoChat />
                <Texto valor={c.whatsapp} />
              </a>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
