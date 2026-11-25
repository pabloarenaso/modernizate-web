import type { Idioma } from "@/content/tipos";

/** Ruta pública según idioma: español sin prefijo, inglés bajo /en. */
export const rutaLocal = (idioma: Idioma, ruta = "/") =>
  idioma === "es" ? ruta : `/en${ruta === "/" ? "" : ruta}`;
