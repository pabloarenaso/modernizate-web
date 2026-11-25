/**
 * Geometría de los flujos de ejemplo (estilo editor de automatizaciones). Los textos viven en content/
 * (hero.flujo.flujos[i].nodos[j], en el mismo orden que estos nodos). Lienzo de 760 × 380.
 */
export type TipoNodo = "disparador" | "accion" | "si" | "agente" | "herramienta";
export type Icono =
  | "chat" | "reloj" | "carrito" | "caja" | "ramas" | "robot" | "calendario" | "planilla" | "correo" | "equipo" | "enviar" | "camion" | "check";
export type Nodo = { tipo: TipoNodo; x: number; y: number; icono: Icono };
/** salida: puerto de un nodo "si" (arriba = sí, abajo = no); herramienta: conexión punteada del agente. */
export type Conexion = { de: number; a: number; salida?: "si" | "no"; herramienta?: boolean };
export type Flujo = { nodos: Nodo[]; conexiones: Conexion[]; camino: number[]; herramientasUsadas: number[] };

export const LIENZO = { ancho: 760, alto: 380 };
export const MEDIDAS = { nodo: 72, agenteAncho: 172, agenteAlto: 84, herramienta: 54 };

const fila = 170;
const arriba = 52;
const abajo = 312;

export const FLUJOS: Flujo[] = [
  {
    // Atención de consultas
    nodos: [
      { tipo: "disparador", x: 66, y: fila, icono: "chat" },
      { tipo: "si", x: 182, y: fila, icono: "ramas" },
      { tipo: "accion", x: 322, y: arriba, icono: "reloj" },
      { tipo: "agente", x: 354, y: fila, icono: "robot" },
      { tipo: "herramienta", x: 284, y: abajo, icono: "calendario" },
      { tipo: "herramienta", x: 354, y: abajo, icono: "planilla" },
      { tipo: "herramienta", x: 424, y: abajo, icono: "correo" },
      { tipo: "si", x: 522, y: fila, icono: "ramas" },
      { tipo: "accion", x: 674, y: 82, icono: "equipo" },
      { tipo: "accion", x: 674, y: 258, icono: "enviar" },
    ],
    conexiones: [
      { de: 0, a: 1 },
      { de: 1, a: 2, salida: "si" },
      { de: 1, a: 3, salida: "no" },
      { de: 3, a: 4, herramienta: true },
      { de: 3, a: 5, herramienta: true },
      { de: 3, a: 6, herramienta: true },
      { de: 3, a: 7 },
      { de: 7, a: 8, salida: "si" },
      { de: 7, a: 9, salida: "no" },
    ],
    camino: [0, 2, 6, 8],
    herramientasUsadas: [3, 4],
  },
  {
    // Pedidos y despacho
    nodos: [
      { tipo: "disparador", x: 66, y: fila, icono: "carrito" },
      { tipo: "accion", x: 170, y: fila, icono: "caja" },
      { tipo: "si", x: 274, y: fila, icono: "ramas" },
      { tipo: "accion", x: 410, y: arriba, icono: "equipo" },
      { tipo: "agente", x: 458, y: fila, icono: "robot" },
      { tipo: "herramienta", x: 388, y: abajo, icono: "planilla" },
      { tipo: "herramienta", x: 458, y: abajo, icono: "calendario" },
      { tipo: "herramienta", x: 528, y: abajo, icono: "correo" },
      { tipo: "accion", x: 666, y: fila, icono: "camion" },
    ],
    conexiones: [
      { de: 0, a: 1 },
      { de: 1, a: 2 },
      { de: 2, a: 3, salida: "si" },
      { de: 2, a: 4, salida: "no" },
      { de: 4, a: 5, herramienta: true },
      { de: 4, a: 6, herramienta: true },
      { de: 4, a: 7, herramienta: true },
      { de: 4, a: 8 },
    ],
    camino: [0, 1, 3, 7],
    herramientasUsadas: [4, 5],
  },
  {
    // Recordatorios de pago
    nodos: [
      { tipo: "disparador", x: 66, y: fila, icono: "reloj" },
      { tipo: "accion", x: 170, y: fila, icono: "planilla" },
      { tipo: "si", x: 274, y: fila, icono: "ramas" },
      { tipo: "accion", x: 410, y: arriba, icono: "check" },
      { tipo: "agente", x: 458, y: fila, icono: "robot" },
      { tipo: "herramienta", x: 388, y: abajo, icono: "planilla" },
      { tipo: "herramienta", x: 458, y: abajo, icono: "correo" },
      { tipo: "herramienta", x: 528, y: abajo, icono: "calendario" },
      { tipo: "accion", x: 666, y: fila, icono: "enviar" },
    ],
    conexiones: [
      { de: 0, a: 1 },
      { de: 1, a: 2 },
      { de: 2, a: 3, salida: "si" },
      { de: 2, a: 4, salida: "no" },
      { de: 4, a: 5, herramienta: true },
      { de: 4, a: 6, herramienta: true },
      { de: 4, a: 7, herramienta: true },
      { de: 4, a: 8 },
    ],
    camino: [0, 1, 3, 7],
    herramientasUsadas: [4, 5],
  },
];

/** Puntos de salida y llegada de una conexión. */
export function extremos(f: Flujo, c: Conexion) {
  const o = f.nodos[c.de];
  const d = f.nodos[c.a];
  const mo = medio(o);
  if (c.herramienta) {
    return { x1: o.x, y1: o.y + MEDIDAS.agenteAlto / 2, x2: d.x, y2: d.y - MEDIDAS.herramienta / 2 };
  }
  const dy = c.salida === "si" ? -16 : c.salida === "no" ? 16 : 0;
  return { x1: o.x + mo, y1: o.y + dy, x2: d.x - medio(d), y2: d.y };
}
function medio(n: Nodo) {
  return n.tipo === "agente" ? MEDIDAS.agenteAncho / 2 : n.tipo === "herramienta" ? MEDIDAS.herramienta / 2 : MEDIDAS.nodo / 2;
}

/** Curva Bézier entre dos puntos (horizontal o, para herramientas, vertical). */
export function curva(f: Flujo, c: Conexion) {
  const { x1, y1, x2, y2 } = extremos(f, c);
  if (c.herramienta) {
    const k = Math.max(24, (y2 - y1) / 2);
    return `M${x1} ${y1} C${x1} ${y1 + k} ${x2} ${y2 - k} ${x2} ${y2}`;
  }
  const k = Math.max(36, (x2 - x1) / 2);
  return `M${x1} ${y1} C${x1 + k} ${y1} ${x2 - k} ${y2} ${x2} ${y2}`;
}

/** Momento (s) en que el punto de luz llega a cada nodo del camino, y duración de cada tramo. */
export const TRAMO = 0.55;
export const PAUSA = 0.3;
export const PAUSA_AGENTE = 0.9;
export function horario(f: Flujo) {
  const llegadas = new Map<number, number>();
  const salidas: number[] = [];
  let t = 0.2;
  llegadas.set(f.conexiones[f.camino[0]].de, 0.1);
  for (const i of f.camino) {
    const c = f.conexiones[i];
    if (f.nodos[c.de].tipo === "agente") t += PAUSA_AGENTE;
    salidas.push(t);
    t += TRAMO;
    llegadas.set(c.a, t);
    t += PAUSA;
  }
  return { llegadas, salidas, total: t };
}
