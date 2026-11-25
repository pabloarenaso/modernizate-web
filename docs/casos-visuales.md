# Ilustraciones de los casos (Soluciones)

## Problema que resolvemos
Las miniaturas de la maqueta son demasiado conceptuales: vista sola, la de "Tienda en línea" no se reconoce como ecommerce y la de "Automatización" se ve escuálida. Cada ilustración debe entenderse **sin leer el título**.

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

## 3. Sistema a medida
- **Dispositivo:** notebook con una app de gestión (menú lateral, tabla).
- **Interfaz:** tabla de registros con folio, fecha, responsable y estado; filtro activo; botón "Nuevo registro".
- **Tarjetas flotantes:** una hoja de documento PDF con encabezado "Registro N° 0153" y un timbre "Emitido"; una etiqueta "Solo administración" (permisos).
- **Miniatura:** notebook con tabla y el PDF asomando.
- **Animación:** aparece una fila nueva y se genera el PDF.
- **Ojo:** inspirado en la app de actas, pero genérico. No mostrar nombres, logos ni datos de Aceros Arequipa.

## 4. Automatización de procesos
- **Lienzo de flujo** estilo n8n (nodos y conectores), con React Flow en la escena grande y SVG en la miniatura.
- **Nodos:** "Formulario recibido" → "¿Es urgente?" (bifurcación) → sí: "Avisar al equipo" · no: "Crear ficha en planilla" → "Registrar resultado".
- **Tarjetas flotantes:** "Flujo ejecutado · 3,2 s · 0 errores" y "Ficha creada: Juan P.".
- **Miniatura:** 4 o 5 nodos con iconos claros y un punto de luz recorriendo los conectores.
- **Animación:** el punto recorre el camino y cada nodo se enciende al pasar.

## Opcional: fotografía
Si Pablo genera fondos o fotos con Magnific (por ejemplo, un local, una bodega o un mostrador), se usan solo como fondo desenfocado detrás del dispositivo, nunca como la ilustración principal. Guardarlas en `public/img/casos/` con texto alternativo.
