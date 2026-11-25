# Plan del sitio · agmodernizate.cl

Archivo de estado. Una sesión nueva retoma desde aquí y desde `git log`, no desde la memoria.

## Forma de trabajo
- **Una aprobación por etapa.** Claude muestra el plan de la etapa una vez; con el "dale" de Pablo la ejecuta completa. Solo se detiene si algo contradice el plan, si hay riesgo de perder trabajo o si necesita una decisión de Pablo.
- Al cerrar cada etapa: `npm run lint`, `npm run build`, casillas actualizadas aquí y reporte.
- **Commits** pequeños en español, y **cada commit compila por sí solo** (lint y build antes de cada uno). **Push** a `origin` (github.com/pabloarenaso/modernizate-web) autorizado al cerrar cada etapa, solo si lint y build pasan.
- **Sin despliegues** al servidor hasta que Pablo lo pida (Etapa 7).
- Rigen `CLAUDE.md` (incluida "Decisiones de plataforma") y `~/modernizate/herramientas/docs/principios.md`.

Leyenda: `[ ]` pendiente · `[x]` hecho y comprobado · `[~]` en curso.

> Texto original de las etapas 2 a 6: `docs/etapas.md`.

## Etapa 0 · Documentación y decisiones
- [x] Documentación de marca, narrativa, datos, casos, efectos y maquetas en `docs/`
- [x] Sección "Decisiones de plataforma" en `CLAUDE.md`; `docs/plataforma-vision.md` alineado
- [x] Colores de noche completos en `docs/marca.md`
- [x] Primer commit

## Etapa 1 · Base del proyecto y sistema de marca
Cerrada el 25 nov 2026. Comprobado con lint, build y curl sobre `next start`. No hubo revisión visual en navegador (no hay uno disponible en WSL); queda para Pablo.
- [x] Next.js 16.4 (App Router, Turbopack, Cache Components) + TypeScript + Tailwind v4 + ESLint, npm, sin `src/` (generado en carpeta temporal y movido sin tocar `CLAUDE.md` ni `docs/`)
- [x] Rutas: `app/(sitio)/[lang]` (es en `/` vía `proxy.ts`, en en `/en`, `/es/*` redirige con 308); `/ingresar` y `/app` fuera de `[lang]` (hoy dan 404 con `app/global-not-found.tsx`)
- [x] `app/(intranet)` reservado con README
- [x] `content/tipos.ts`, `es.ts`, `en.ts` con `satisfies Contenido` (probado: quitar una clave en `en.ts` rompe TypeScript y el build)
- [x] Sistema de borrador: `{ texto, estado }`, ayudantes `b()` y `ok()`, `<Texto>` con `data-estado`, `?revision=1` con contorno ámbar y etiqueta "BORRADOR"/"DRAFT" desde `content/`
- [x] Tokens por uso (fuente única en `lib/paleta.ts`, expuestos en `@theme`) para día y noche; modo noche con `next-themes` y `data-theme`, sin parpadeo, según el sistema
- [x] Fuentes con `next/font`: Archivo (eje `wdth` 62–125) e Inter; clases `.wordmark` y `.disp`
- [x] `<Logo>` (principal, invertido, agua), `<Isotipo>` y favicon `app/icon.svg`
- [x] Página `/marca` y `/en/marca` (noindex, nofollow) con colores y contraste AA, tipografía, logo, textos borrador/aprobado, selector de idioma y botón de tema
- [x] `.env.example` sin valores; `.gitignore` con `.env*` salvo `.env.example`
- [x] Lint y build en verde; commit y push

**Decisiones aprobadas por Pablo (25 nov 2026)**
- Celeste de noche = #16203D (selección de Landing.dc.html).
- Logo en noche con el color de acento de texto (#8FB0FF); marca de agua #1F2A47 con tilde #16203D.
- Se mantiene `AGENTS.md` (lo recrea `next dev`), la página 404 general (`app/global-not-found.tsx`) y el ayudante `ok()` para textos aprobados.
- Primario separado por uso: `--primario-relleno` (noche #3563F7) para botones con texto blanco, `--acento-texto` para texto y enlaces, `--primario` solo para elementos no textuales. Ver `docs/marca.md`.
- Series de gráficos solo en trazos y rellenos; valores, etiquetas y leyendas con colores de texto.


## Etapa 2 · Cabecera, hero y portal
Cerrada el 25 nov 2026. Comprobado con lint, build, Playwright sobre `next start` (/, /en, /marca, /ingresar en 1440 y 390 px, día y noche, más movimiento reducido): consola sin errores ni avisos.
- [x] Cabecera fija: navegación (Por qué ahora · Soluciones · Cómo trabajamos · Calcula · Contacto), ES/EN; menú desplegable bajo 1280 px (Esc cierra y devuelve el foco)
- [x] Botón de modo noche con halo (noche) o sombra (día)
- [x] Botón secundario "Ingresar" (a `/ingresar`) y principal "Agenda una conversación"
- [x] Hero según `Landing.dc.html`: nubes (día); estrellas y meteoros (noche), solo CSS
- [x] Carrusel de 3 escenas hechas en código (conversación con agenda, flujo SVG con punto de luz, panel) con título sincronizado
- [x] Pausa al pasar el mouse o con el foco, botón visible de pausa e indicadores; se detiene fuera de pantalla; con movimiento reducido no avanza solo y la conversación se ve completa; confeti como easter egg
- [x] `/ingresar` como portal de clientes (diseño `Login.dc.html`, vórtice en canvas a la izquierda; franja en celular):
  - [x] El usuario escribe su correo y se le redirige al acceso de su proyecto (subdominio)
  - [x] Relación correo/dominio → URL solo en el servidor (`PORTAL_CLIENTES_ARCHIVO`), documentada en `.env.example` sin valores
  - [x] Destinos permitidos configurables (`PORTAL_DESTINOS_PERMITIDOS`, por defecto `*.agmodernizate.cl`)
  - [x] Sin coincidencia: mensaje neutro con enlace de contacto; tiempo de respuesta mínimo igual para todos los casos
  - [x] Límite de 5 intentos cada 10 minutos por IP
  - [x] Nunca una lista pública de clientes (nada en el código ni en el navegador)
  - [x] Acceso secundario "Equipo Modernízate", discreto y sin función (muestra una nota)
- [x] Revisión en 1440 y 390 px, día y noche
- [x] Lint y build en verde; commit y push

**Decisiones de Pablo (25 nov 2026):** `/ingresar` solo en español por ahora (textos en inglés ya en `en.ts`); se acepta el riesgo de que la redirección revele que un correo es cliente (ver `docs/plataforma-vision.md`).

**Decisiones tomadas en la etapa (por revisar)**
- Se reemplazó `next-themes` (0.4.6, la última, provoca el aviso "Encountered a script tag") por un script propio en `lib/tema.ts` y el hook `hooks/useTema.ts`. Clave en localStorage: `tema`.
- No se instaló Motion: los cambios de escena usan animaciones CSS, más livianas. Se instalará cuando una sección lo necesite de verdad.
- `/ingresar` lleva `noindex`.
- `PORTAL_PROXIES_CONFIABLES` (por defecto 1): cuántos proxies agregan `X-Forwarded-For`. Si Cloudflare queda con proxy activado, debe ser 2 (Etapa 7).
- En `dominios` se ignoran los dominios públicos (gmail.com, outlook.com…): esos van siempre como correo exacto.
- Colores de apoyo del hero tomados de la maqueta (`lib/paleta.ts`); avatares oscurecidos para que el blanco encima cumpla AA.
- Las anclas de la navegación apuntan a secciones que se construyen en las etapas 3 a 5.

**Notas para etapas siguientes**
- En la Etapa 7, el servicio debe escuchar solo en 127.0.0.1:3200 (detrás de Apache) para que nadie se salte el límite por IP.
- Capturas de revisión: carpeta de Windows `Descargas\modernizate-capturas\etapa-2`.

**Ajustes 2b (25 nov 2026, pedidos por Pablo)**
- [x] Hero compacto: título de máximo 3 líneas a 1440 px y hero completo dentro de 1440×900 (termina en 696 px)
- [x] Indicador "escribiendo…" corregido (la burbuja vacía era el indicador sin sus puntos)
- [x] Escenas con su propio marco: celular con chat (más bandeja al lado en pantallas ≥1280 px), lienzo de flujo con cuadrícula de puntos y nodos con ícono, panel como tarjeta
- [x] Sin "Demostración"; nota "Escenas ilustrativas" bajo el carrusel
- [x] Propuestas de imágenes en `docs/imagenes-propuestas.md` (pendiente de elección de Pablo)
- Decisión: el lienzo de flujo usa diseño vertical salvo en contenedores de 700 px o más, para que los textos de los nodos se lean.
- Capturas: `Descargas\modernizate-capturas\etapa-2b`.

## Verificar antes de publicar
Datos que el sitio muestra pero cuya fuente original no se pudo abrir o que vienen de prensa (ver `docs/datos-tendencia.md`):
- [x] A1 · Verificado por Pablo en el gráfico de McKinsey (25 nov 2026), con dos mediciones en 2024 (72 % inicios, 78 % fines).
- [ ] B1 · Informe original del Índice de Transformación Digital 2025 (CCS, PMG, Corfo): hoy se cita Diario Financiero. Opción: pedirlo a la CCS o a PMG.
- [ ] B2 · Estudio de Strand Partners para AWS: hoy se cita Radio Pauta.
- [ ] B3 · Encuesta IA Defontana 2025: hoy se cita Emol.
- [ ] B4 y B5 · Cifras de la CCS y del Banco Central: hoy se citan notas de prensa.

### Ajustes 2c (hero realista)
Cerrados el 25 nov 2026.
- [x] Chat sin superposiciones: los mensajes no se encogen y los antiguos salen por arriba (revisado cuadro a cuadro con Playwright, 1440 y 390, día y noche)
- [x] Vuelve la bandeja de contactos con estados junto al chat (solo desde 1024 px; en celular, solo el teléfono)
- [x] Celular realista: proporción 2,1, isla, barra de estado con batería, cabecera con avatar e íconos, papel tapiz, separador "Hoy", colitas, hora y checks que pasan a azul, "escribiendo…", barra con emoji, clip, cámara y micrófono que cambia a enviar; la hora agendada baja como notificación
- [x] Colores de app de mensajería genérica (sin marcas) en `lib/paleta.ts`, día y noche
- [x] Alto del texto fijo para las tres escenas (los botones no saltan); columnas rebalanceadas
- [x] Flujo con barra de herramienta (nombre, "Guardado", interruptor Activo, Ejecutar) y controles de zoom; panel como dashboard con menú lateral, período, variaciones y últimos pedidos

## Etapa 3 · "Por qué ahora" con infografías
Cerrada el 25 nov 2026. Comprobado con lint, build y Playwright sobre `next start` (1440 y 390 px, día y noche, movimiento reducido): consola sin errores.
- [x] Boceto en texto de cada paso aprobado por Pablo **antes de construir**
- [x] Solo cifras de `docs/datos-tendencia.md` (`lib/datosTendencia.ts`), con fuente visible bajo cada gráfico o cifra
- [x] Recorrido de 3 pasos con scroll fijado en escritorio (en celular, cada paso con su gráfico debajo); cierre aparte con la frase, el botón "Ver soluciones" y el 92% como línea secundaria
- [x] Líneas de un color con valor en cada punto (misma escala 0–100 % para mundo y Chile), barra apilada con etiquetas directas, cifras grandes; sin eje doble
- [x] Tooltip al pasar el mouse, tabla alternativa ("Ver los datos en una tabla") y paleta de noche; paleta de gráficos validada (daltonismo y contraste) en día y noche
- [x] Redacción "según las propias empresas", nunca como causa
- [x] Lint y build en verde; commit y push

**Decisiones de la etapa**
- A1: serie 2017–2025 verificada por Pablo en el gráfico de McKinsey; 2024 con dos puntos (inicios 72 %, fines 78 %), como la fuente.
- B1: el informe original de la CCS no está publicado; se cita Diario Financiero (17 oct 2025), que trae la muestra (967 empresas), en lugar de Radio Pauta.
- El cierre (paso 4) va como bloque centrado después del recorrido, no fijado.
- Los gráficos son SVG propios (sin librería) y su ancho sigue al contenedor, para que el texto no se escale.
- Capturas: `Descargas\modernizate-capturas\etapa-3`.

## Etapa 4 · Soluciones (`docs/casos-visuales.md`)
Cerrada el 25 nov 2026. Comprobado con lint, build y Playwright sobre `next start` (1440 y 390, día y noche): consola sin errores.
- [x] "Tienda en línea" en sus dos tamaños, aprobada por Pablo (fija el nivel de todas las escenas)
- [x] Las otras tres escenas al mismo nivel: Asistente de atención, Automatización de procesos y "Proyecto a tu medida" (reemplaza a "Sistema a medida")
- [x] Tarjetas con miniatura animada al pasar el mouse, título y una frase
- [x] Panel al abrir: escena grande, 3 líneas (dónde partimos, cómo lo armamos, qué recibes) y "Lo quiero para mi negocio" → `?caso=…#contacto` (el contacto llega en la Etapa 5)
- [x] Automatización con React Flow en el panel grande (nodos movibles, zoom con controles reales), mismos tres flujos que el hero y punto de luz en bucle
- [x] Sin logos de terceros; datos ficticios
- [x] Lint y build en verde; commit y push

### Ajustes del hero (25 nov 2026, pedido junto con la Etapa 4)
- [x] Fondo de día con partículas de luz y destellos celeste y cobalto (mismo movimiento que los meteoros de la noche)
- [x] Slide 1 con bandeja y celular más anchos
- [x] Indicadores con barra de progreso; clic en otro va a esa escena, clic en el activo pausa o reanuda (WCAG 2.2.2, también con teclado); se quitó el botón de pausa
- [x] Slide 2 estilo editor de automatizaciones, horizontal, con pestañas para tres flujos (disparador, decisiones sí/no, agente de IA con herramientas, acciones); sin controles de zoom ni mensaje final
- [x] Slide 3 animado: la tabla avanza, pestaña "Reporte" con barras, línea y dona que se dibujan, y descarga (botón → progreso → archivo listo)

### Easter eggs (`docs/catalogo-efectos.md`)
- [x] Hero: confeti con el botón de estrellas de Uiverse (MuhammadHasann/silent-lizard-44, MIT)
- [x] Soluciones: texto animado letra por letra en el panel, con el botón eléctrico de Uiverse (Pradeepsaranbishnoi/dull-mole-49, MIT)
- [ ] Por qué ahora: pendiente hasta rehacer la sección (Pablo)
- [ ] Cómo trabajamos (uno por paso), Calculadora (título ondulado) y Contacto ("Actívame" con inclinación 3D): se hacen cuando existan esas secciones (Etapas 5 y 6). Botones de Uiverse ya obtenidos para usarlos: Navarog21/ordinary-rat-19 y adamgiebl/big-ape-36 (del repositorio público uiverse-io/galaxy, MIT)
- [ ] Faltan dos botones de Uiverse que no están en el repositorio público: barisdogansutcu/proud-lion-79 y AatreyuShau/brown-baboon-8 (Pablo los pega)

## Etapa 5 · Cómo trabajamos, calculadora, contacto y pie
- [ ] Línea de tiempo de 4 pasos con revelado fijado y easter egg por paso (destacador, giro 3D, ondulado, confeti)
- [ ] Calculadora: tareas con ± horas, valor hora, velocímetro semicircular con segmento activo agrandado, costo mensual y horas liberadas, aviso de estimación
- [ ] Contacto: agenda de videollamada SIMULADA y alternativa por correo con campo "gooey"; sin calendarios ni correos reales
- [ ] `docs/integraciones-pendientes.md`
- [ ] 3D de la agenda solo con el easter egg "Actívame"
- [ ] Pie claro
- [ ] Lint y build en verde; commit y push

## Etapa 6 · Pulido y revisión
- [ ] Accesibilidad AA, teclado, foco visible, movimiento reducido, textos alternativos
- [ ] Carga diferida de efectos pesados; Lighthouse móvil ≥ 90; informe de costo por efecto
- [ ] Un solo lenguaje de movimiento: ningún efecto compite con el texto
- [ ] `docs/pendientes-contenido.md` con todos los textos en borrador, por sección
- [ ] Lint y build en verde; commit y push

## Etapa 7 · Publicación (cerrada el 2026-11-25)

- [x] Sitio en https://agmodernizate.cl (www → raíz con 301), certificado con renovación automática (vence 2027-02-23).
- [x] Servicio `modernizate-web.service` en 127.0.0.1:3200, reinicio sin clave, comandos `/estado-servidor` y `/desplegar` (ver `docs/servidor.md`).
- [x] Portal /ingresar con archivo de relaciones vacío en el servidor; noindex en /marca e /ingresar; `?revision=1` desactivado en producción.
- [x] Variables de contacto en el `.env` del servidor y nuevo build; formulario de prueba enviado (Web3Forms 200) y WhatsApp abre con el texto prellenado.
- [x] HTTP (raíz, www e IP) → https://agmodernizate.cl con 301 mediante `00-modernizate-web.conf` (autorizado por Pablo; `000-default.conf` sin cambios).
- Nota: Web3Forms (Cloudflare) bloquea Chromium sin interfaz; las pruebas automáticas del formulario usan un user agent de navegador normal.
- Publicado sin "Por qué ahora" (bandera en `lib/banderas.ts`), sin calculadora ni agenda; tres casos de Soluciones sin panel.
