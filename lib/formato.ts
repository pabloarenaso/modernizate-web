import type { Idioma } from "@/content/tipos";

/** Número con el formato del idioma (es-CL: 23,1 · en-US: 23.1). */
export const numero = (idioma: Idioma, n: number, decimales = 1) =>
  new Intl.NumberFormat(idioma === "es" ? "es-CL" : "en-US", { maximumFractionDigits: decimales }).format(n);

/** Reemplaza {clave} en un texto de content/. */
export const rellenar = (texto: string, valores: Record<string, string>) =>
  texto.replace(/\{(\w+)\}/g, (m, k: string) => valores[k] ?? m);
