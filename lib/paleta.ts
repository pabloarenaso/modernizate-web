import type { TokenColor } from "@/content/tipos";

/**
 * Fuente única de los colores (docs/marca.md y docs/maquetas/Landing.dc.html).
 * globals.css los expone a Tailwind con @theme; este archivo genera las variables.
 */
type Paleta = Record<TokenColor, string>;

export const dia: Paleta = {
  fondo: "#FFFFFF",
  superficie: "#FFFFFF",
  suave: "#F4F7FC",
  linea: "#E2E8F2",
  texto: "#0B1530",
  "texto-sec": "#4A5468",
  primario: "#1F4FE0",
  "primario-relleno": "#1F4FE0",
  "acento-texto": "#1F4FE0",
  celeste: "#DCE6FF",
  "graf-1": "#1F4FE0",
  "graf-2": "#D9780A",
  "graf-3": "#0E9F9A",
  "graf-4": "#9B5DE5",
  lateral: "#14287A",
};

export const noche: Paleta = {
  fondo: "#0A1022",
  superficie: "#111A33",
  suave: "#0D1530",
  linea: "#1F2A47",
  texto: "#E8EDF7",
  "texto-sec": "#A3AEC5",
  primario: "#3D6BFF",
  "primario-relleno": "#3563F7",
  "acento-texto": "#8FB0FF",
  celeste: "#16203D",
  "graf-1": "#5C8BFF",
  "graf-2": "#D07A2A",
  "graf-3": "#119E97",
  "graf-4": "#A37BEB",
  lateral: "#14287A",
};

/** Colores de apoyo que no son tokens de marca (logo, modo revisión). */
const apoyoDia = {
  "agua-texto": "#C9D6F2",
  "agua-tilde": "#DCE6FF",
  revision: "#B45309",
  "revision-texto": "#FFFFFF",
  // Hero y escenas (Landing.dc.html)
  "hero-fondo": "#F7F9FD",
  "hero-puntos": "rgba(120,150,220,.35)",
  cielo: "#E6EEFF",
  seleccion: "#EEF3FF",
  "burbuja-entrante": "#E9F7EF",
  "burbuja-borde": "#CFEBDC",
  "ok-fondo": "#E5F6EC",
  "ok-texto": "#0E6B37",
  "barra-suave": "#BFCEF5",
  bisel: "#0B1530",
};
const apoyoNoche = {
  "agua-texto": "#1F2A47",
  "agua-tilde": "#16203D",
  revision: "#F59E0B",
  "revision-texto": "#0A1022",
  "hero-fondo": "#070C1C",
  "hero-puntos": "rgba(120,150,220,.18)",
  cielo: "transparent",
  seleccion: "#16203D",
  "burbuja-entrante": "#0F2E22",
  "burbuja-borde": "#1C4A36",
  "ok-fondo": "#0F2E22",
  "ok-texto": "#6EE7A8",
  "barra-suave": "#2B3F7A",
  bisel: "#2A3556",
};

const vars = (p: Record<string, string>) =>
  Object.entries(p)
    .map(([k, v]) => `--${k}:${v};`)
    .join("");

/** CSS de las variables: día por defecto, noche con data-theme o, sin JS, con la preferencia del sistema. */
export const cssTokens =
  `:root{${vars({ ...dia, ...apoyoDia })}color-scheme:light}` +
  `[data-theme="dark"]{${vars({ ...noche, ...apoyoNoche })}color-scheme:dark}` +
  `@media (prefers-color-scheme:dark){:root:not([data-theme]){${vars({ ...noche, ...apoyoNoche })}color-scheme:dark}}`;
