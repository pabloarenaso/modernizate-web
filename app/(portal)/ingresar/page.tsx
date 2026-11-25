import Link from "next/link";
import { BotonTema } from "@/components/BotonTema";
import { Logo } from "@/components/Logo";
import { Texto } from "@/components/Texto";
import { obtenerContenido } from "@/content";
import { FormularioPortal } from "./FormularioPortal";
import { Vortice } from "./Vortice";

const c = obtenerContenido("es");

/** Portal de clientes: el correo lleva al acceso de cada proyecto (ver CLAUDE.md › Decisiones de plataforma). */
export default function PaginaIngresar() {
  const p = c.portal;
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative flex h-44 flex-col justify-between overflow-hidden p-6 text-white lg:h-auto lg:p-12">
        <Vortice />
        <Link href="/" aria-label={c.cabecera.inicio.texto} className="relative self-start">
          <Logo nombre={c.marcaNombre.texto} variante="invertido" className="text-xl lg:text-2xl" />
        </Link>
        <div className="relative flex max-w-md flex-col gap-3">
          <Texto as="p" valor={p.lema} className="disp text-xl leading-tight lg:text-4xl" />
          <Texto as="p" valor={p.lemaTexto} className="hidden text-base leading-relaxed text-[#DCE6FF] lg:block" />
        </div>
      </aside>

      <main id="contenido" className="flex flex-col bg-fondo px-6 py-6 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-medium text-texto-sec hover:text-texto">
            ← <Texto valor={p.volver} />
          </Link>
          <BotonTema etiquetaNoche={c.tema.cambiarANoche.texto} etiquetaDia={c.tema.cambiarADia.texto} />
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-6 py-10">
          <div className="flex flex-col gap-2">
            <Texto as="h1" valor={p.titulo} className="disp text-3xl" />
            <Texto as="p" valor={p.intro} className="text-texto-sec" />
          </div>
          <FormularioPortal c={p} />
        </div>
      </main>
    </div>
  );
}
