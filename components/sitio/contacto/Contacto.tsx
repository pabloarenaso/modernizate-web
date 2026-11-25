import { Texto } from "@/components/Texto";
import type { ContactoC } from "@/content/tipos";
import { enlaceWhatsapp } from "./enlaces";
import { FormularioContacto } from "./FormularioContacto";
import { IconoChat } from "./IconoChat";

/** Contacto: formulario (Web3Forms) y botón de WhatsApp con mensaje prellenado. */
export function Contacto({ c }: { c: ContactoC }) {
  const wa = enlaceWhatsapp(c.whatsappMensaje.texto);
  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="mx-auto grid max-w-[1240px] gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
      <div className="flex flex-col gap-4">
        <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
        <h2 id="contacto-titulo" className="disp text-[30px] leading-[1.1] sm:text-[38px]">
          <Texto valor={c.titulo} />
        </h2>
        <Texto as="p" valor={c.intro} className="text-base leading-relaxed text-texto-sec sm:text-[17px]" />
        {wa && (
          <div className="mt-4 flex flex-col items-start gap-3 rounded-2xl border border-linea bg-suave p-6">
            <Texto as="p" valor={c.oWhatsapp} className="font-semibold" />
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-[10px] bg-[#0E7A3E] px-5 font-semibold text-white transition-[filter] hover:brightness-110"
            >
              <IconoChat />
              <Texto valor={c.whatsapp} />
            </a>
          </div>
        )}
      </div>
      <FormularioContacto c={c} />
    </section>
  );
}
