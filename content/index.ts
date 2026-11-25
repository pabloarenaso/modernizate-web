import { en } from "./en";
import { es } from "./es";
import type { Contenido, Idioma } from "./tipos";

const contenidos: Record<Idioma, Contenido> = { es, en };

export const obtenerContenido = (idioma: Idioma): Contenido => contenidos[idioma];
