# Etapas del sitio (texto original de Pablo)

Reemplaza a `LEEME_PRIMERO.md`, que no llegó al repositorio. El estado de cada casilla vive en `docs/PLAN_SITIO.md`. La Etapa 2 ya incluye el portal de clientes en lugar de "La intranet estará disponible pronto". La Etapa 1 (base y marca) y la Etapa 7 (publicación) están detalladas en `docs/PLAN_SITIO.md`.

## Etapa 2 · Cabecera, hero y portal
- Cabecera fija: navegación (Por qué ahora · Soluciones · Cómo trabajamos · Calcula · Contacto), ES/EN, botón de modo noche con halo (noche) o sombra (día), botón secundario "Ingresar" (a /ingresar) y botón principal "Agenda una conversación".
- Hero según Landing.dc.html: nubes en modo día; estrellas y meteoros en modo noche; carrusel de 3 escenas (conversación con agenda, flujo automatizado, panel) con el título sincronizado ("Atención que responde aunque estés ocupado" / "Procesos que avanzan sin que nadie los empuje" / "Tu negocio, claro en un solo panel"), pausa al pasar el mouse, movimiento reducido respetado y confeti como easter egg.
- /ingresar como portal de clientes (Decisiones de plataforma, punto 4), con el diseño de Login.dc.html (vórtice de partículas en azules de la marca a la izquierda).
- Revisar el resultado en 1440 y 390 px, en día y noche.

## Etapa 3 · "Por qué ahora" con infografías
- Usar SOLO las cifras de docs/datos-tendencia.md, con la fuente visible (institución, estudio, año).
- Recorrido de 3 o 4 pasos con scroll fijado, según la sección D de datos-tendencia.md: línea de un solo color con valores en cada punto, barra apilada con etiquetas directas y cifras grandes. Sin eje doble.
- Tooltip, tabla alternativa accesible y paleta de noche.
- Formular "las empresas que la usan reportan…", nunca como causa.
- Antes de construir, mostrarme un boceto en texto de cada paso (dato, gráfico, frase).

## Etapa 4 · Soluciones con ilustraciones de producción (docs/casos-visuales.md)
- Primero solo "Tienda en línea" en sus dos tamaños, para mi aprobación: debe reconocerse como tienda sin leer el título. Después, las otras tres al mismo nivel.
- Tarjetas con miniatura, título y una frase. Al abrir, un solo panel: escena grande, 3 líneas (dónde partimos, cómo lo armamos, qué recibes) y "Lo quiero para mi negocio", que lleva a Contacto con el caso preseleccionado.
- La escena de Automatización usa React Flow en el panel grande, con un punto de luz recorriendo los conectores.
- Sin logos de terceros, con datos ficticios.

## Etapa 5 · Cómo trabajamos, calculadora, contacto y pie
- Línea de tiempo de 4 pasos con revelado fijado y un easter egg por paso (destacador, giro 3D, ondulado, confeti).
- Calculadora: tareas con ± horas, valor hora, velocímetro semicircular con el segmento activo agrandado, costo mensual y horas liberadas, con aviso de estimación.
- Contacto: agenda de videollamada SIMULADA y alternativa por correo con campo "gooey". Sin calendarios ni correos reales; dejar lo pendiente en docs/integraciones-pendientes.md.
- El 3D de la agenda se activa solo con el easter egg "Actívame".
- Pie claro.

## Etapa 6 · Pulido y revisión
- Accesibilidad AA, teclado, foco visible, movimiento reducido, textos alternativos.
- Rendimiento: carga diferida de efectos pesados; Lighthouse móvil ≥ 90; informe de qué efectos cuestan más.
- Un solo lenguaje de movimiento: ningún efecto compite con el texto.
- docs/pendientes-contenido.md con todos los textos en borrador, por sección.
