/** Anclas de las secciones del inicio, en orden de navegación. */
export const secciones = ["por-que-ahora", "soluciones", "como-trabajamos", "calcula", "contacto"] as const;
export type IdSeccion = (typeof secciones)[number];
