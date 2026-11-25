# Ilustraciones de los casos (Soluciones)

## Problema que resolvemos
Las miniaturas de la maqueta son demasiado conceptuales: vista sola, la de "Tienda en línea" no se reconoce como ecommerce y la de "Automatización" se ve escuálida. Cada ilustración debe entenderse **sin leer el título**.

## Nivel de referencia
La escena de la Tienda en línea (aprobada por Pablo el 25 nov 2026) fija el nivel de todas: semirrealista, con interfaz verosímil, datos ficticios creíbles y animación con sentido (producto que vuela al carrito, contador, pago aprobado).

## Enfoque
- **Escenas de producto hechas en código** (React + SVG/HTML + Tailwind), no fotos de stock ni imágenes planas. Se ven nítidas, cambian con el modo noche y se traducen ES/EN.
- Cada escena tiene un **dispositivo** (celular, navegador o notebook) con una **interfaz verosímil** y una o dos **tarjetas flotantes** que cuentan el resultado.
- Datos ficticios pero creíbles (nombres de negocios inventados, montos en CLP). Nunca datos de clientes reales.
- Sin logos oficiales de terceros. Se reconoce por el contexto.
- Dos tamaños: **miniatura** (tarjeta, ~ 360 × 220) y **escena grande** (panel abierto, ~ 960 × 560). La miniatura es la misma escena simplificada, no otra imagen.
- Micro-animación al pasar el mouse en la miniatura; animación breve al abrir el panel. Todo se detiene con `prefers-reduced-motion`.
- Paleta de la marca; cada caso usa uno de los cuatro colores de gráficos como acento, en orden fijo.

## 1. Asistente de atención
- **Dispositivo:** celular con una app de mensajería genérica (encabezado verde oscuro, burbujas, doble check).
- **Conversación:** cliente: "Hola, ¿tienen hora para mañana?" → asistente ofrece 3 horarios en botones → cliente elige "11:30" → asistente: "Listo, te envié la confirmación a tu correo".
- **Tarjetas flotantes:** "Cita agendada · Mié 11:30" con ícono de calendario; y una pequeña etiqueta "Derivado a una persona" (muestra la supervisión humana).
- **Miniatura:** celular con 3 burbujas y la tarjeta de cita.
- **Animación:** el indicador "escribiendo…" y la aparición de la tarjeta de cita.

## 2. Tienda en línea
- **Dispositivo:** ventana de navegador con barra de dirección (`tutienda.cl`).
- **Interfaz:** encabezado con nombre ficticio (por ejemplo, "Café Altiplano"), buscador y carrito con contador "2"; grilla de 3 productos con foto ilustrada, nombre, precio en CLP y botón "Agregar".
- **Tarjetas flotantes:** "Pago aprobado · Pedido #1042 · $24.990" y una mini lista de pedidos con estados ("Pagado", "En preparación", "Despachado").
- **Medios de pago:** íconos genéricos (tarjeta, transferencia), sin marcas.
- **Miniatura:** navegador con 3 productos, carrito con contador y la tarjeta "Pago aprobado". Debe gritar "tienda".
- **Animación:** un producto "vuela" al carrito y el contador sube.

## 3. Proyecto a tu medida (reemplaza a "Sistema a medida", 25 nov 2026)
- **Idea:** una app de gestión como ejemplo de resultado, más una animación de cómo trabajamos: conversación → diagnóstico → construcción → entrega.
- **Dispositivo:** notebook con la app "Gestión de registros" (menú lateral, filtro "Estado: abierto", botón "Nuevo registro", tabla con folio, fecha, responsable y estado).
- **Etapas (escena grande, con barra de pasos arriba):** 1) videollamada con el cliente ("Hoy lo hacemos en tres planillas…"); 2) mapa del proceso con notas adhesivas y los pasos repetidos marcados; 3) la app en construcción con el piloto en marcha; 4) la app completa.
- **Tarjetas flotantes:** hoja PDF "Registro N° 0153" con timbre "Emitido"; etiqueta "Solo administración" (permisos); "Entregado · equipo capacitado".
- **Miniatura:** notebook con la tabla y el PDF asomando. Al pasar el mouse, aparece una fila nueva y sale el PDF.
- **Ojo:** inspirado en la app de actas, pero genérico. Sin nombres, logos ni datos de clientes reales.

## 4. Automatización de procesos
- **Coherente con el slide 2 del hero:** mismo editor estilo n8n, mismos nodos y los mismos tres flujos ("Atención de consultas", "Pedidos y despacho", "Recordatorios de pago"), con pestañas.
- **Nodos:** disparador, decisiones "sí / no" con dos salidas, un agente de IA con herramientas conectadas debajo (calendario, planilla, correo) y acciones. Geometría compartida en `lib/flujos.ts`.
- **Miniatura:** el lienzo en SVG/HTML; al pasar el mouse, el punto de luz recorre el camino y cada nodo se enciende (check verde).
- **Escena grande:** React Flow interactivo (mover nodos, acercar y alejar con controles que sí funcionan); el punto de luz recorre el flujo en bucle.
- Sin mensaje final de tiempo de ejecución (pedido de Pablo).

## Opcional: fotografía
Si Pablo genera fondos o fotos con Magnific (por ejemplo, un local, una bodega o un mostrador), se usan solo como fondo desenfocado detrás del dispositivo, nunca como la ilustración principal. Guardarlas en `public/img/casos/` con texto alternativo.
