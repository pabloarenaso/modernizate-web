export type Estado = "borrador" | "aprobado";

/** Todo texto visible: su contenido y si Pablo ya lo aprobó. */
export type Texto = { texto: string; estado: Estado };

/** Texto en borrador (estado por defecto de todo texto nuevo). */
export const b = (texto: string): Texto => ({ texto, estado: "borrador" });

/** Texto aprobado por Pablo. Usar solo con su aprobación explícita. */
export const ok = (texto: string): Texto => ({ texto, estado: "aprobado" });

export const idiomas = ["es", "en"] as const;
export type Idioma = (typeof idiomas)[number];
export const esIdioma = (v: string): v is Idioma => (idiomas as readonly string[]).includes(v);

export const tokensColor = [
  "fondo",
  "superficie",
  "suave",
  "linea",
  "texto",
  "texto-sec",
  "primario",
  "primario-relleno",
  "acento-texto",
  "celeste",
  "graf-1",
  "graf-2",
  "graf-3",
  "graf-4",
  "lateral",
] as const;
export type TokenColor = (typeof tokensColor)[number];

import type { IdSeccion } from "@/lib/secciones";

/** Escena del hero: título en dos partes (la segunda en color de acento), párrafo y textos del marco. */
export type EscenaHero = { tituloA: Texto; tituloB: Texto; parrafo: Texto; marco: Texto; punto: Texto };
export type Contacto = { nombre: Texto; ultimo: Texto; etapa: Texto };
export type Mensaje = { quien: "bot" | "usuario"; texto: Texto } | { quien: "tarjeta" };
export type Kpi = { etiqueta: Texto; valor: Texto };
export type FilaPanel = { nombre: Texto; estado: Texto };

export type Contenido = {
  meta: { titulo: Texto; descripcion: Texto };
  /** Etiqueta del modo revisión (?revision=1). Debe ser texto corto. */
  revision: { etiqueta: Texto };
  marcaNombre: Texto;
  idioma: { etiqueta: Texto; es: Texto; en: Texto };
  tema: { cambiarANoche: Texto; cambiarADia: Texto };
  noEncontrado: { titulo: Texto; texto: Texto; volver: Texto };
  cabecera: {
    saltar: Texto;
    inicio: Texto;
    navegacion: Texto;
    nav: Record<IdSeccion, Texto>;
    ingresar: Texto;
    cta: Texto;
    menuAbrir: Texto;
    menuCerrar: Texto;
  };
  portal: {
    meta: { titulo: Texto };
    volver: Texto;
    lema: Texto;
    lemaTexto: Texto;
    titulo: Texto;
    intro: Texto;
    correo: Texto;
    correoEjemplo: Texto;
    continuar: Texto;
    buscando: Texto;
    sinCoincidencia: Texto;
    contacto: Texto;
    limite: Texto;
    invalido: Texto;
    equipo: Texto;
    equipoNota: Texto;
  };
  hero: {
    kicker: Texto;
    escenas: [EscenaHero, EscenaHero, EscenaHero];
    secundario: Texto;
    huevo: Texto;
    nota: Texto;
    carrusel: { region: Texto; diapositiva: Texto; de: Texto; pausar: Texto; reanudar: Texto };
    conversacion: {
      contactos: [Contacto, Contacto, Contacto, Contacto];
      nueva: Texto;
      escribiendo: Texto;
      clienteFinal: Texto;
      guion: Mensaje[];
      tarjeta: { titulo: Texto; detalle: Texto };
      telefono: { nombre: Texto; estado: Texto; hora: Texto; escribir: Texto };
      bandeja: Texto;
    };
    flujo: {
      nodos: { formulario: Texto; urgente: Texto; avisar: Texto; ficha: Texto; registrar: Texto };
      si: Texto;
      no: Texto;
      ejecutado: Texto;
      fichaCreada: Texto;
    };
    panel: {
      kpis: [Kpi, Kpi, Kpi];
      grafico: Texto;
      dias: [Texto, Texto, Texto, Texto, Texto, Texto, Texto];
      filas: [FilaPanel, FilaPanel, FilaPanel];
    };
  };
  marca: {
    meta: { titulo: Texto };
    titulo: Texto;
    intro: Texto;
    colores: {
      titulo: Texto;
      dia: Texto;
      noche: Texto;
      contraste: Texto;
      sobre: Texto;
      aa: Texto;
      aaGrande: Texto;
      noAa: Texto;
      noTextual: Texto;
      tokens: Record<TokenColor, Texto>;
    };
    tipografia: {
      titulo: Texto;
      wordmark: Texto;
      display: Texto;
      subtitulo: Texto;
      cuerpo: Texto;
      muestraDisplay: Texto;
      muestraSubtitulo: Texto;
      muestraCuerpo: Texto;
    };
    logo: { titulo: Texto; principal: Texto; invertido: Texto; agua: Texto; isotipo: Texto };
    estados: { titulo: Texto; explicacion: Texto; ejemploBorrador: Texto; ejemploAprobado: Texto };
    controles: { titulo: Texto };
  };
};
