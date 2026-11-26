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
export type Contacto = { nombre: Texto; ultimo: Texto; etapa: Texto; hora: Texto };
export type Mensaje = { quien: "bot" | "usuario"; texto: Texto } | { quien: "tarjeta" };
export type Kpi = { etiqueta: Texto; valor: Texto; variacion: Texto };
export type FilaPanel = { pedido: Texto; nombre: Texto; monto: Texto; estado: Texto };

export type Linea = { etiqueta: Texto; titulo: Texto; texto: Texto };
export type EscenaTiendaC = {
  descripcion: Texto;
  dominio: Texto;
  marca: Texto;
  nav: [Texto, Texto, Texto];
  buscar: Texto;
  carrito: Texto;
  aviso: Texto;
  seccion: Texto;
  productos: [Producto, Producto, Producto];
  agregar: Texto;
  pago: { titulo: Texto; pedido: Texto; monto: Texto; medio: Texto; tarjeta: Texto; transferencia: Texto };
  pedidos: { titulo: Texto; filas: [FilaPedido, FilaPedido, FilaPedido] };
};
export type Producto = { nombre: Texto; detalle: Texto; precio: Texto };
export type FilaPedido = { numero: Texto; cliente: Texto; estado: Texto };
export type Caso = { titulo: Texto; frase: Texto; lineas: [Linea, Linea, Linea]; cta: Texto };
export type EscenaAsistenteC = {
  descripcion: Texto;
  negocio: Texto;
  estado: Texto;
  escribiendo: Texto;
  hoy: Texto;
  hora: Texto;
  bateria: Texto;
  escribir: Texto;
  cliente1: Texto;
  bot1: Texto;
  horarios: [Texto, Texto, Texto];
  cliente2: Texto;
  bot2: Texto;
  cliente3: Texto;
  bot3: Texto;
  cita: { titulo: Texto; detalle: Texto; dia: Texto };
  derivado: Texto;
  agenda: { titulo: Texto; filas: { hora: Texto; nombre: Texto; estado: Texto }[] };
  app: Texto;
  ahora: Texto;
};
export type EscenaAutomatizacionC = { descripcion: Texto; ayuda: Texto };
export type EtapaMedida = { nombre: Texto; detalle: Texto };
export type EscenaMedidaC = {
  descripcion: Texto;
  app: Texto;
  menu: [Texto, Texto, Texto, Texto];
  buscar: Texto;
  filtro: Texto;
  nuevo: Texto;
  columnas: [Texto, Texto, Texto, Texto];
  filas: { folio: Texto; fecha: Texto; responsable: Texto; estado: Texto }[];
  pdf: { titulo: Texto; empresa: Texto; timbre: Texto };
  permisos: Texto;
  etapas: [EtapaMedida, EtapaMedida, EtapaMedida, EtapaMedida];
  formulario: { titulo: Texto; campos: [{ etiqueta: Texto; valor: Texto }, { etiqueta: Texto; valor: Texto }, { etiqueta: Texto; valor: Texto }]; guardar: Texto };
  entregado: Texto;
};
export type Soluciones = {
  kicker: Texto;
  titulo: Texto;
  intro: Texto;
  abrir: Texto;
  cerrar: Texto;
  huevo: Texto;
  huevoFrase: Texto;
  tienda: Caso & { escena: EscenaTiendaC };
  asistente: Caso & { escena: EscenaAsistenteC };
  automatizacion: Caso & { escena: EscenaAutomatizacionC };
  medida: Caso & { escena: EscenaMedidaC };
};

export type FlujoC = { nombre: Texto; nodos: Texto[] };

export type Servicio = { nombre: Texto; que: Texto; para: Texto; plazo: Texto };
export type PasoTrabajo = { titulo: Texto; linea: Texto; puntos: Texto[]; escena: [Texto, Texto, Texto] };
export type EscenaOrdenC = {
  etiqueta: Texto;
  chat: Texto;
  burbujas: [Texto, Texto, Texto];
  cuaderno: Texto;
  reservas: [Texto, Texto, Texto, Texto];
  planilla: Texto;
  notas: [Texto, Texto];
  llamada: Texto;
  dominio: Texto;
  panel: Texto;
  mensajes: Texto;
  clientes: [Texto, Texto, Texto, Texto];
  respondido: Texto;
  agenda: Texto;
  citas: [Texto, Texto, Texto, Texto];
  pedidos: Texto;
  estados: [Texto, Texto, Texto, Texto];
  alDia: Texto;
};
export type Servicios = {
  kicker: Texto;
  titulo: Texto;
  parrafo: Texto;
  verCasos: Texto;
  /** Los plazos y "para quién" se guardan pero no se muestran (los da Pablo en la conversación). */
  etiquetas: { para: Texto; plazo: Texto };
  items: [Servicio, Servicio, Servicio, Servicio, Servicio, Servicio];
  escena: EscenaOrdenC;
};
export type ComoTrabajamos = {
  kicker: Texto;
  titulo: Texto;
  pasos: [PasoTrabajo, PasoTrabajo, PasoTrabajo, PasoTrabajo];
  verDetalle: Texto;
};
export type ContactoC = {
  kicker: Texto;
  titulo: Texto;
  intro: Texto;
  nombre: Texto;
  correo: Texto;
  telefono: Texto;
  opcional: Texto;
  rubro: Texto;
  rubroEjemplo: Texto;
  mensaje: Texto;
  mensajeEjemplo: Texto;
  enviar: Texto;
  enviando: Texto;
  recibidoTitulo: Texto;
  recibido: Texto;
  otro: Texto;
  error: Texto;
  limite: Texto;
  incompleto: Texto;
  asunto: Texto;
  oWhatsapp: Texto;
  whatsapp: Texto;
  whatsappMensaje: Texto;
  privacidad: Texto;
  formTitulo: Texto;
  formSub: Texto;
  respondo: Texto;
  remitente: Texto;
};
export type PieC = {
  lema: Texto;
  frase: Texto;
  derechos: Texto;
  ingresar: Texto;
  correo: Texto;
  whatsapp: Texto;
  hecho: Texto;
  secciones: Texto;
  contacto: Texto;
  clientes: Texto;
};

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
  soluciones: Soluciones;
  servicios: Servicios;
  comoTrabajamos: ComoTrabajamos;
  contacto: ContactoC;
  pie: PieC;
  porQue: {
    kicker: Texto;
    titulo: Texto;
    verTabla: Texto;
    tabla: { anio: Texto; valor: Texto; categoria: Texto };
    paso1: {
      titulo: Texto;
      frase: Texto;
      mundo: Texto;
      chile: Texto;
      inicioDe: Texto;
      finDe: Texto;
      descMundo: Texto;
      descChile: Texto;
      fuenteMundo: Texto;
      fuenteChile: Texto;
    };
    paso2: {
      titulo: Texto;
      frase: Texto;
      barraTitulo: Texto;
      basico: Texto;
      integrada: Texto;
      avanzada: Texto;
      preparadas: Texto;
      fuenteUso: Texto;
      fuentePreparadas: Texto;
    };
    paso3: {
      titulo: Texto;
      frase: Texto;
      ventas: Texto;
      ventasTexto: Texto;
      online: Texto;
      sitio: Texto;
      fuenteVentas: Texto;
      fuenteOnline: Texto;
      fuenteSitio: Texto;
    };
    cierre: { frase: Texto; secundaria: Texto; boton: Texto; fuente: Texto };
  };
  hero: {
    kicker: Texto;
    escenas: [EscenaHero, EscenaHero, EscenaHero];
    secundario: Texto;
    huevo: Texto;
    nota: Texto;
    carrusel: { region: Texto; diapositiva: Texto; de: Texto };
    conversacion: {
      contactos: [Contacto, Contacto, Contacto, Contacto];
      nueva: Texto;
      escribiendo: Texto;
      clienteFinal: Texto;
      guion: Mensaje[];
      tarjeta: { titulo: Texto; detalle: Texto };
      telefono: { nombre: Texto; estado: Texto; hora: Texto; escribir: Texto; hoy: Texto; bateria: Texto; ahora: Texto; app: Texto };
      bandeja: Texto;
    };
    flujo: {
      flujos: [FlujoC, FlujoC, FlujoC];
      si: Texto;
      no: Texto;
      agente: Texto;
      herramientas: Texto;
      activo: Texto;
      ejecutar: Texto;
      guardado: Texto;
      selector: Texto;
    };
    panel: {
      kpis: [Kpi, Kpi, Kpi];
      grafico: Texto;
      dias: [Texto, Texto, Texto, Texto, Texto, Texto, Texto];
      filas: [FilaPanel, FilaPanel, FilaPanel];
      periodo: Texto;
      pedidos: Texto;
      menu: [Texto, Texto, Texto, Texto];
      masFilas: FilaPanel[];
      pestanas: [Texto, Texto];
      reporte: {
        ventas: Texto;
        semanas: [Texto, Texto, Texto, Texto];
        pedidosDia: Texto;
        medios: Texto;
        tarjeta: Texto;
        transferencia: Texto;
        descargar: Texto;
        generando: Texto;
        listo: Texto;
        archivo: Texto;
      };
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
