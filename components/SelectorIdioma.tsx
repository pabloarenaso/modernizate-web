import Link from "next/link";
import type { Contenido, Idioma } from "@/content/tipos";
import { idiomas } from "@/content/tipos";
import { rutaLocal } from "@/lib/rutas";

type Props = { actual: Idioma; ruta: string; c: Contenido["idioma"] };

export function SelectorIdioma({ actual, ruta, c }: Props) {
  return (
    <nav aria-label={c.etiqueta.texto} className="inline-flex rounded-full border border-linea p-0.5 text-sm font-medium">
      {idiomas.map((idioma) => {
        const activo = idioma === actual;
        return (
          <Link
            key={idioma}
            href={rutaLocal(idioma, ruta)}
            hrefLang={idioma}
            lang={idioma}
            aria-label={c[idioma].texto}
            aria-current={activo ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 ${activo ? "bg-celeste text-acento-texto" : "text-texto-sec hover:text-texto"}`}
          >
            {idioma.toUpperCase()}
          </Link>
        );
      })}
    </nav>
  );
}
