# Estándar de escenas Modernízate

Cómo se ilustra todo lo que muestra un sitio de Modernízate (servicio, proceso, documento, panel): con **escenas
animadas hechas en código**, nunca con tarjetas genéricas de ícono y texto. Referencia de nivel: la escena
"Tienda en línea" de agmodernizate.cl (sección Soluciones). Rige también para proyectos de clientes.

## 1. Superficie realista
- Un dispositivo o interfaz creíble: navegador, celular, notebook, documento (PDF), lienzo de flujo, panel.
- Con detalles reales: barra de estado y de dirección, cursores, campos, botones, pestañas, estados
  (pendiente, pagado, enviado), sombras suaves y bordes finos.
- Se reconoce por el contexto. **Nunca logos ni marcas de terceros** (WhatsApp, Mercado Pago, etc.): un
  celular con burbujas basta para leer "chat".

## 2. Datos ficticios pero verosímiles
- Negocios inventados ("Café Altiplano", "Trattoria Don Piero"), nombres comunes, montos en CLP con punto de
  miles ($24.990), fechas y horas coherentes entre sí (si la reserva es el sábado, el chat es de esa semana).
- Nunca datos reales, clientes reales, ni cifras de mercado (esas van con fuente, en otra sección).
- Todo texto visible vive en `content/` (es y en) con estado borrador/aprobado.

## 3. Narrativa en secuencia
- Cada escena cuenta algo que pasa: **llega algo → se procesa → cambia de estado → se confirma**.
- Bucle suave de **6 a 10 s**: al final se sostiene el estado logrado y se reinicia con un fundido, sin saltos.

## 4. Micro-interacciones
- Algo se agrega (vuela al carrito), un contador sube, un check cambia de gris a azul, una notificación
  baja, una fila nueva se ilumina, un timbre "Emitido" cae sobre un documento, un cursor hace clic.
- Una o dos por momento: la vista debe poder seguirlas.

## 5. Día, noche, idiomas y movimiento reducido
- Colores solo con los tokens del tema (`bg-superficie`, `text-texto-sec`, `--chat-*`…): funciona en día y noche.
- Textos en español e inglés desde `content/`.
- `prefers-reduced-motion`: se muestra el **estado final, estático** (las animaciones se definen de modo que el
  estilo base sea el estado final y el keyframe parta del inicial).
- Si la escena transmite información, lleva un nombre accesible (`role="img"` + `aria-label`) o texto real.

## 6. Rendimiento
- SVG, HTML y CSS propios. Sin librerías pesadas (excepción justificada: React Flow en paneles grandes que se
  abren a pedido).
- Animar solo `transform`, `opacity` y similares. Nada de canvas ni video para esto.
- **Se pausan fuera de pantalla** (`EscenaViva` marca `data-pausado` y el CSS congela las animaciones).

## 7. Dos tamaños
- **Miniatura** (tarjeta) y **escena grande** (panel o sección) comparten componentes; la miniatura es la
  grande con menos detalle, a escala (`Escalar`) o con consultas de contenedor (`@container`).

## 8. Piezas reutilizables (`components/escenas/base/`)
| Pieza | Uso |
|---|---|
| `Telefono` | Celular realista (isla, barra de estado, batería) con contenido libre |
| `Navegador` | Ventana de navegador con semáforo y barra de dirección con candado |
| `Notebook` | Pantalla 16:10 con base metálica |
| `Chat` | `Burbuja` (recibida o enviada con doble check) y `Escribiendo` |
| `TarjetaEstado` | Tarjeta flotante: "Reserva confirmada", "Pago aprobado"… (tonos ok, info, alerta) |
| `Cursor` | Puntero con onda de clic |
| `Ico` | Íconos de trazo propios |
| `Escalar` | Dibuja a un ancho fijo y escala al contenedor (miniaturas) |
| `EscenaViva` | Contenedor que pausa las animaciones fuera de pantalla |

## 9. Easter eggs: `BotonSorpresa`
- Un solo disparador para todas las sorpresas: botón circular pequeño (36 px) con la tilde de Modernízate
  (`components/BotonSorpresa.tsx`).
- Siempre en la **esquina inferior derecha** de la sección (o del panel) que tiene sorpresa; la sección es `relative`.
- Discreto pero visible: fondo de superficie, borde fino, tilde en color primario. La primera vez que entra en
  pantalla hace una **pulsación suave** (dos ondas) y no vuelve a llamar la atención.
- Nombre accesible desde `content/`: "Sorpresa" / "Surprise" (también como `title`).
- La sorpresa del hero es `useConfetiPantalla` (`components/ConfetiPantalla.tsx`): capa fija sobre toda la
  ventana, 180 piezas grandes que caen, repetible; **con movimiento reducido no se muestra**.

Para una escena nueva: elegir marco → escribir el guion en `content/` (4 a 6 momentos) → componer con las
piezas base → animar con clases CSS en bucle → probar en 1440 y 390 px, día y noche y movimiento reducido.
