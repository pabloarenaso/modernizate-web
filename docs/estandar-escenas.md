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

## 9. Easter eggs: BotonSorpresa

- Un solo disparador: `<Sorpresa efecto="…" />` (`components/Sorpresa.tsx`), que usa `BotonSorpresa` (botón circular pequeño con la tilde). Va siempre en la **esquina inferior derecha** de su sección o tarjeta. Pulsa suave la primera vez que entra en pantalla. Nombre accesible: «Sorpresa».
- En el pie, el isotipo junto a «Hecho en Chile» es el botón (`variante="logo"`).
- Cada botón tiene **un efecto fijo** (nunca al azar, para que no se repitan). Los efectos viven en `lib/sorpresas.ts` (Web Animations API sobre el DOM).
- Textos en `content/*.ts` → `sorpresas` (etiqueta, un mensaje por efecto y el mensaje oculto del paso 3).

| Botón | Efecto | Alcance |
|---|---|---|
| Hero | `confeti`: confeti grande y abundante | pantalla completa |
| Qué hacemos | `electricidad`: chispas que recorren los bordes de la escena y de las etiquetas (`data-chispa`) y rayos en zigzag que se dibujan | varios elementos |
| Soluciones · Tienda (panel) | `voltear`: los productos (`data-voltear`) giran en 3D uno tras otro | varios elementos |
| Soluciones · Asistente (panel) | `burbujas`: lluvia de burbujas de chat | pantalla completa |
| Soluciones · Automatización (panel) | `gravedad`: los nodos (`data-nodo` o nodos de React Flow) caen, rebotan y vuelven | varios elementos |
| Soluciones · A tu medida (panel) | `origami`: la escena (`data-escena`) se pliega en 3D y se despliega | elemento |
| Cómo trabajamos · Paso 1 | `temblor`: temblor suave de 1 s | pantalla |
| Cómo trabajamos · Paso 2 | `tildes`: lluvia de tildes de Modernízate | pantalla completa |
| Cómo trabajamos · Paso 3 | `vuelta`: la tarjeta da una vuelta completa y muestra un mensaje oculto atrás | elemento |
| Cómo trabajamos · Paso 4 | `fuegos`: fuegos artificiales sobre la sección | sección |
| Contacto | `iman`: los elementos del formulario se acercan al cursor durante 4 s | varios elementos |
| Pie («Hecho en Chile») | `estrella`: una estrella fugaz cruza la pantalla y deja la tilde brillando | pantalla y elemento |

Reglas:
- **Sin destellos** de pantalla completa ni parpadeos de más de 3 por segundo (WCAG 2.3.1). La electricidad son trazos que se mueven, no flashes.
- Las capas son `pointer-events: none` y se eliminan solas: **nada bloquea la navegación**. Todos se pueden repetir.
- Si hay un `<dialog>` modal abierto, la capa va dentro de él (la capa superior del navegador taparía todo lo demás).
- **Movimiento reducido:** no hay animación; el botón muestra solo un mensaje breve (y lo anuncia con `aria-live`).
- Nunca se anima con transform un elemento que ya se posiciona con transform (p. ej. nodos de React Flow): se anima su contenido.
- Clases de animación nuevas: nunca con nombres que choquen con utilidades de Tailwind (`pb-1`, `mt-2`…).
