import Link from "next/link";
import { BotonTema } from "@/components/BotonTema";
import { Logo } from "@/components/Logo";
import { SelectorIdioma } from "@/components/SelectorIdioma";
import { Texto } from "@/components/Texto";
import type { Contenido, Idioma } from "@/content/tipos";
import { rutaLocal } from "@/lib/rutas";
import { secciones } from "@/lib/secciones";
import { MenuMovil } from "./MenuMovil";

type Props = { lang: Idioma; ruta: string; c: Contenido };

export const claseBotonPrincipal =
  "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[10px] bg-primario-relleno px-[18px] text-[15px] font-semibold text-white transition-[filter] hover:brightness-110";
export const claseBotonSecundario =
  "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-[10px] border border-linea px-4 text-[15px] font-semibold text-texto transition-colors hover:bg-suave";

export function Cabecera({ lang, ruta, c }: Props) {
  const k = c.cabecera;
  const inicio = rutaLocal(lang, "/");
  const enlaces = secciones.map((id) => ({ id, href: `${inicio}#${id}`, texto: k.nav[id] }));

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-superficie focus:px-4 focus:py-2">
        <Texto valor={k.saltar} />
      </a>
      <header className="sticky top-0 z-40 border-b border-linea bg-fondo/90 backdrop-blur supports-[backdrop-filter]:bg-fondo/75">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-6">
          <Link href={inicio} aria-label={k.inicio.texto} className="shrink-0">
            <Logo nombre={c.marcaNombre.texto} className="text-[20px]" />
          </Link>

          <nav aria-label={k.navegacion.texto} className="hidden xl:block">
            <ul className="flex gap-6 whitespace-nowrap text-[15px] font-medium">
              {enlaces.map((e) => (
                <li key={e.id}>
                  <a href={e.href} className="text-texto-sec transition-colors hover:text-texto">
                    <Texto valor={e.texto} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden xl:block">
              <SelectorIdioma actual={lang} ruta={ruta} c={c.idioma} />
            </div>
            <BotonTema etiquetaNoche={c.tema.cambiarANoche.texto} etiquetaDia={c.tema.cambiarADia.texto} />
            <div className="hidden items-center gap-2.5 xl:flex">
              <Link href="/ingresar" className={claseBotonSecundario}>
                <Texto valor={k.ingresar} />
              </Link>
              <a href={`${inicio}#contacto`} className={claseBotonPrincipal}>
                <Texto valor={k.cta} />
              </a>
            </div>
            <MenuMovil etiquetaAbrir={k.menuAbrir.texto} etiquetaCerrar={k.menuCerrar.texto}>
              <nav aria-label={k.navegacion.texto}>
                <ul className="flex flex-col text-base font-medium">
                  {enlaces.map((e) => (
                    <li key={e.id}>
                      <a href={e.href} className="block rounded-lg px-2 py-3 text-texto hover:bg-suave">
                        <Texto valor={e.texto} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col gap-3 border-t border-linea pt-4">
                <div className="self-start">
                  <SelectorIdioma actual={lang} ruta={ruta} c={c.idioma} />
                </div>
                <Link href="/ingresar" className={claseBotonSecundario}>
                  <Texto valor={k.ingresar} />
                </Link>
                <a href={`${inicio}#contacto`} className={claseBotonPrincipal}>
                  <Texto valor={k.cta} />
                </a>
              </div>
            </MenuMovil>
          </div>
        </div>
      </header>
    </>
  );
}
