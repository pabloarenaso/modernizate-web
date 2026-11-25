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

**Notas para etapas siguientes**
- `/ingresar` necesitará su propio layout raíz (no hay `app/layout.tsx` común).

## Etapa 2 · Cabecera, hero y portal
- [ ] Cabecera fija: navegación (Por qué ahora · Soluciones · Cómo trabajamos · Calcula · Contacto), ES/EN
- [ ] Botón de modo noche con halo (noche) o sombra (día)
- [ ] Botón secundario "Ingresar" (a `/ingresar`) y principal "Agenda una conversación"
- [ ] Hero según `Landing.dc.html`: nubes (día); estrellas y meteoros (noche)
- [ ] Carrusel de 3 escenas (conversación con agenda, flujo automatizado, panel) con título sincronizado
- [ ] Pausa al pasar el mouse, movimiento reducido respetado, confeti como easter egg
- [ ] `/ingresar` como portal de clientes (diseño `Login.dc.html`, vórtice de partículas en azules de la marca a la izquierda):
  - [ ] El usuario escribe su correo y se le redirige al acceso de su proyecto (subdominio)
  - [ ] Relación correo/dominio → URL solo en el servidor (variable de entorno o archivo fuera del repo), documentada en `.env.example` sin valores
  - [ ] Sin coincidencia: mensaje neutro con enlace de contacto
  - [ ] Límite de intentos por IP
  - [ ] Nunca una lista pública de clientes (nada en el código ni en el navegador)
  - [ ] Acceso secundario "Equipo Modernízate", discreto y sin función
- [ ] Revisión en 1440 y 390 px, día y noche
- [ ] Lint y build en verde; commit y push

## Etapa 3 · "Por qué ahora" con infografías
- [ ] Boceto en texto de cada paso (dato, gráfico, frase) aprobado por Pablo **antes de construir**
- [ ] Solo cifras de `docs/datos-tendencia.md`, con fuente visible (institución, estudio, año)
- [ ] Recorrido de 3 o 4 pasos con scroll fijado (sección D): línea de un color con valores por punto, barra apilada con etiquetas directas, cifras grandes; sin eje doble
- [ ] Tooltip, tabla alternativa accesible y paleta de noche
- [ ] Redacción "las empresas que la usan reportan…", nunca como causa
- [ ] Lint y build en verde; commit y push

## Etapa 4 · Soluciones (`docs/casos-visuales.md`)
- [ ] "Tienda en línea" en sus dos tamaños, aprobada por Pablo (se reconoce como tienda sin leer el título)
- [ ] Las otras tres escenas al mismo nivel
- [ ] Tarjetas con miniatura, título y una frase
- [ ] Panel al abrir: escena grande, 3 líneas (dónde partimos, cómo lo armamos, qué recibes) y "Lo quiero para mi negocio" → Contacto con el caso preseleccionado
- [ ] Automatización con React Flow en el panel grande, punto de luz recorriendo conectores
- [ ] Sin logos de terceros; datos ficticios
- [ ] Lint y build en verde; commit y push

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

## Etapa 7 · Publicación (solo cuando Pablo lo pida)
- [ ] Servicio Node en el VPS de actas, puerto 3200, con la caja de herramientas (sin tocar la app de actas)
- [ ] Sitio en Apache como proxy hacia 3200
- [ ] HTTPS
- [ ] DNS en Cloudflare con `~/modernizate/herramientas/cloudflare/dns.sh` (con "sí" de Pablo)
- [ ] Comando `/desplegar` propio del proyecto
- [ ] Acciones con sudo registradas en la bitácora del servidor
