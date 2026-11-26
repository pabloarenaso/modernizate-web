import { Texto } from "@/components/Texto";
import type { Contenido, Soluciones as SolucionesC } from "@/content/tipos";
import { EscenaAsistente } from "./EscenaAsistente";
import { EscenaAutomatizacion } from "./EscenaAutomatizacion";
import { EscenaMedida } from "./EscenaMedida";
import { EscenaTienda } from "./EscenaTienda";
import { AsistenteMovil, AutomatizacionMovil, MedidaMovil, TiendaMovil } from "./Moviles";
import { TarjetaCaso } from "./TarjetaCaso";

type Props = { c: SolucionesC; flujos: Contenido["hero"]["flujo"]; hrefContacto: string };

/** Sección Soluciones: cuatro casos con miniatura animada y panel "Recorrer el caso" con la escena grande. */
export function Soluciones({ c, flujos, hrefContacto }: Props) {
  const href = (caso: string) => `${hrefContacto}?caso=${caso}#contacto`;
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
        <TarjetaCaso
          id="caso-tienda"
          caso={c.tienda}
          efecto="voltear"
          c={c}
          hrefContacto={href("tienda")}
          mini={<><div className="sm:hidden"><TiendaMovil c={c.tienda.escena} /></div><div className="hidden sm:block"><EscenaTienda c={c.tienda.escena} tamano="mini" /></div></>}
          grande={<><div className="sm:hidden"><TiendaMovil c={c.tienda.escena} /></div><div className="hidden sm:block"><EscenaTienda c={c.tienda.escena} tamano="grande" /></div></>}
        />
        <TarjetaCaso
          id="caso-asistente"
          caso={c.asistente}
          efecto="burbujas"
          c={c}
          hrefContacto={href("asistente")}
          mini={<><div className="sm:hidden"><AsistenteMovil c={c.asistente.escena} /></div><div className="hidden sm:block"><EscenaAsistente c={c.asistente.escena} tamano="mini" /></div></>}
          grande={<><div className="sm:hidden"><AsistenteMovil c={c.asistente.escena} /></div><div className="hidden sm:block"><EscenaAsistente c={c.asistente.escena} tamano="grande" /></div></>}
        />
        <TarjetaCaso
          id="caso-automatizacion"
          caso={c.automatizacion}
          efecto="gravedad"
          c={c}
          hrefContacto={href("automatizacion")}
          mini={<><div className="sm:hidden"><AutomatizacionMovil c={c.automatizacion.escena} flujo={flujos} /></div><div className="hidden sm:block"><EscenaAutomatizacion c={c.automatizacion.escena} flujos={flujos} tamano="mini" /></div></>}
          grande={<><div className="sm:hidden"><AutomatizacionMovil c={c.automatizacion.escena} flujo={flujos} /></div><div className="hidden sm:block"><EscenaAutomatizacion c={c.automatizacion.escena} flujos={flujos} tamano="grande" /></div></>}
        />
        <TarjetaCaso
          id="caso-medida"
          caso={c.medida}
          efecto="origami"
          c={c}
          hrefContacto={href("medida")}
          mini={<><div className="sm:hidden"><MedidaMovil c={c.medida.escena} /></div><div className="hidden sm:block"><EscenaMedida c={c.medida.escena} tamano="mini" /></div></>}
          grande={<><div className="sm:hidden"><MedidaMovil c={c.medida.escena} /></div><div className="hidden sm:block"><EscenaMedida c={c.medida.escena} tamano="grande" /></div></>}
        />
      </div>
    </section>
  );
}
