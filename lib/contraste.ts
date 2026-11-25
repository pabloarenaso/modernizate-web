/** Relación de contraste WCAG 2.x entre dos colores hex (#RRGGBB). */
const luminancia = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contraste = (a: string, b: string) => {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};

export type NivelAA = "aa" | "aaGrande" | "noAa";
export const nivelAA = (ratio: number): NivelAA => (ratio >= 4.5 ? "aa" : ratio >= 3 ? "aaGrande" : "noAa");
