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
  "acento-texto",
  "celeste",
  "graf-1",
  "graf-2",
  "graf-3",
  "graf-4",
  "lateral",
] as const;
export type TokenColor = (typeof tokensColor)[number];

export type Contenido = {
  meta: { titulo: Texto; descripcion: Texto };
  /** Etiqueta del modo revisión (?revision=1). Debe ser texto corto. */
  revision: { etiqueta: Texto };
  marcaNombre: Texto;
  idioma: { etiqueta: Texto; es: Texto; en: Texto };
  tema: { cambiarANoche: Texto; cambiarADia: Texto };
  noEncontrado: { titulo: Texto; texto: Texto; volver: Texto };
  inicio: { titulo: Texto; texto: Texto; enlaceMarca: Texto };
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
