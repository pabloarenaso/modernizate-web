import { Texto } from "@/components/Texto";
import type { Soluciones as SolucionesC } from "@/content/tipos";
import { TarjetaCaso } from "./TarjetaCaso";

type Props = { c: SolucionesC; hrefContacto: string };

/** Sección Soluciones: por ahora solo "Tienda en línea", a la espera de aprobación antes de los otros tres casos. */
export function Soluciones({ c, hrefContacto }: Props) {
  return (
    <section id="soluciones" aria-labelledby="soluciones-titulo" className="mx-auto flex max-w-[1240px] flex-col gap-10 px-6 py-20 lg:py-28">
      <div className="flex max-w-[720px] flex-col gap-4">
        <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
        <h2 id="soluciones-titulo" className="disp text-[30px] leading-[1.1] sm:text-[38px]">
          <Texto valor={c.titulo} />
        </h2>
        <Texto as="p" valor={c.intro} className="text-base leading-relaxed text-texto-sec sm:text-[17px]" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <TarjetaCaso id="caso-tienda" caso={c.tienda} escena={c.tienda.escena} c={c} hrefContacto={`${hrefContacto}?caso=tienda#contacto`} />
      </div>
    </section>
  );
}
