/**
 * Cifras de docs/datos-tendencia.md (única fuente permitida). Los textos de fuente viven en content/.
 * Si cambia el archivo de datos, se actualiza aquí y en las notas de fuente.
 */
export type Punto = { anio: number; valor: number; etiqueta?: string };

/**
 * A1 · Encuestados cuya organización usa IA en al menos una función (McKinsey, serie anual 2017–2025).
 * 2024 = 78 (encuesta de julio 2024; el informe 2025 dice "88 %, diez puntos más que en 2024").
 * La definición de "uso de IA" cambió entre encuestas (nota de McKinsey).
 */
export const A1: Punto[] = [
  { anio: 2017, valor: 20 },
  { anio: 2018, valor: 47 },
  { anio: 2019, valor: 58 },
  { anio: 2020, valor: 50 },
  { anio: 2021, valor: 56 },
  { anio: 2022, valor: 50 },
  { anio: 2023, valor: 55 },
  { anio: 2024, valor: 78 },
  { anio: 2025, valor: 88 },
];

/** B1 · Empresas chilenas que usan IA (CCS, Índice de Transformación Digital 2025). */
export const B1: Punto[] = [
  { anio: 2023, valor: 29 },
  { anio: 2025, valor: 54 },
];

/** B2 · De las empresas chilenas que usan IA (AWS / Strand Partners). */
export const B2 = { basico: 58, integrada: 25, avanzada: 17, productividad: 92 } as const;

/** B3 · Empresas de Chile y Latinoamérica plenamente preparadas para integrar IA (Defontana 2025). */
export const B3 = { preparadas: 23 } as const;

/** B4 · Pymes chilenas con sitio web (CCS, 2024). */
export const B4 = { conSitio: 23.1 } as const;

/** B5 · Comercio electrónico en Chile: ventas 2025 en millones de US$ y participación online del retail (1.er semestre 2025). */
export const B5 = { ventasMillonesUsd: 10000, participacionOnline: 12.4 } as const;
