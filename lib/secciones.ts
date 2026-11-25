import { BANDERAS } from "./banderas";

/** Anclas de las secciones del inicio, en orden de navegación (todas las que existen o existirán). */
export const secciones = ["que-hacemos", "por-que-ahora", "soluciones", "como-trabajamos", "calcula", "contacto"] as const;
export type IdSeccion = (typeof secciones)[number];

/** Las que hoy se muestran en la página y en el menú. */
export const seccionesVisibles = secciones.filter(
  (s) => (s !== "por-que-ahora" || BANDERAS.porQueAhora) && (s !== "calcula" || BANDERAS.calculadora),
);
