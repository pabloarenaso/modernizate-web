# Plan del sitio · agmodernizate.cl

Archivo de estado. Una sesión nueva retoma desde aquí y desde `git log`, no desde la memoria.

## Forma de trabajo
- **Una aprobación por etapa.** Claude muestra el plan de la etapa una vez; con el "dale" de Pablo la ejecuta completa. Solo se detiene si algo contradice el plan, si hay riesgo de perder trabajo o si necesita una decisión de Pablo.
- Al cerrar cada etapa: `npm run lint`, `npm run build`, casillas actualizadas aquí y reporte.
- **Commits** pequeños en español. **Push** a `origin` (github.com/pabloarenaso/modernizate-web) autorizado al cerrar cada etapa, solo si lint y build pasan.
- **Sin despliegues** al servidor hasta que Pablo lo pida (Etapa 7).
- Rigen `CLAUDE.md` (incluida "Decisiones de plataforma") y `~/modernizate/herramientas/docs/principios.md`.

Leyenda: `[ ]` pendiente · `[x]` hecho y comprobado · `[~]` en curso.

> **Pendiente:** las etapas debían copiarse de `LEEME_PRIMERO.md`, que no está en el repositorio ni en `~/modernizate` (búsqueda del 25 nov 2026). Las etapas 3 a 6 quedan sin casillas hasta que Pablo pase ese archivo.

## Etapa 0 · Documentación y decisiones
- [x] Documentación de marca, narrativa, datos, casos, efectos y maquetas en `docs/`
- [x] Sección "Decisiones de plataforma" en `CLAUDE.md`; `docs/plataforma-vision.md` alineado
- [x] Colores de noche completos en `docs/marca.md`
- [ ] Primer commit (pendiente: falta configurar nombre y correo en git)

## Etapa 1 · Base del proyecto y sistema de marca
- [ ] Next.js 16 (App Router) + TypeScript + Tailwind v4 + ESLint, npm, sin `src/` (generado en carpeta temporal y movido sin tocar `CLAUDE.md` ni `docs/`)
- [ ] Rutas: `app/(sitio)/[lang]` (es en `/` vía `proxy.ts`, en en `/en`); `/ingresar` y `/app` fuera de `[lang]`
- [ ] `app/(intranet)` reservado con README
- [ ] `content/tipos.ts`, `es.ts`, `en.ts` con `satisfies Contenido` (falta una clave → el build falla)
- [ ] Sistema de borrador: `{ texto, estado }`, ayudante `b()`, `<Texto>` con `data-estado`, `?revision=1` con contorno ámbar y etiqueta "BORRADOR" desde `content/`
- [ ] Tokens por uso en `@theme` para día y noche; modo noche con `next-themes` y `data-theme`, sin parpadeo, según el sistema
- [ ] Fuentes con `next/font`: Archivo (eje `wdth`) e Inter; clases `.wordmark` y `.disp`
- [ ] `<Logo>` (principal, invertido, agua), isotipo de la tilde y favicon
- [ ] Página `/marca` y `/en/marca` (noindex) con colores y contraste AA, tipografía, logo, textos borrador/aprobado, selector de idioma y botón de tema
- [ ] `.env.example` sin valores; `.gitignore` con `.env*`
- [ ] Lint y build en verde; commit y push

## Etapa 2 · Encabezado, pie y portal de clientes
- [ ] Encabezado con navegación, selector ES/EN, modo noche, "Ingresar" discreto y botón principal (según `docs/narrativa-provisional.md`)
- [ ] Pie de página
- [ ] `/ingresar` como portal de clientes (diseño `docs/maquetas/Login.dc.html`):
  - [ ] El usuario escribe su correo y se le redirige al acceso de su proyecto (subdominio)
  - [ ] Relación correo/dominio → URL solo en el servidor (variable de entorno o archivo fuera del repo), documentada en `.env.example` sin valores
  - [ ] Sin coincidencia: mensaje neutro con enlace de contacto
  - [ ] Límite de intentos por IP
  - [ ] Nunca una lista pública de clientes (nada en el código ni en el navegador)
  - [ ] Acceso secundario "Equipo Modernízate", discreto y sin función
- [ ] [PENDIENTE: resto de casillas según `LEEME_PRIMERO.md`]

## Etapa 3 · [PENDIENTE: según LEEME_PRIMERO.md]
## Etapa 4 · [PENDIENTE: según LEEME_PRIMERO.md]
## Etapa 5 · [PENDIENTE: según LEEME_PRIMERO.md]
## Etapa 6 · [PENDIENTE: según LEEME_PRIMERO.md]

## Etapa 7 · Publicación (solo cuando Pablo lo pida)
- [ ] Servicio Node en el VPS de actas, puerto 3200, con la caja de herramientas (sin tocar la app de actas)
- [ ] Sitio en Apache como proxy hacia 3200
- [ ] HTTPS
- [ ] DNS en Cloudflare con `~/modernizate/herramientas/cloudflare/dns.sh` (con "sí" de Pablo)
- [ ] Comando `/desplegar` propio del proyecto
- [ ] Acciones con sudo registradas en la bitácora del servidor
