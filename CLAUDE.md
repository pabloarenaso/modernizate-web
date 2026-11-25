# Modernízate · sitio web y plataforma

Agencia chilena de automatización e IA. Este repositorio contiene el sitio público (agmodernizate.cl) y, más adelante, la intranet: CRM interno, blog, agenda y workflows (ver `docs/plataforma-vision.md`).

## Fuente de verdad
- Marca: `docs/marca.md`
- Narrativa y secciones (BORRADOR): `docs/narrativa-provisional.md`
- Datos con fuente: `docs/datos-tendencia.md`
- Ilustraciones de los casos: `docs/casos-visuales.md`
- Efectos elegidos: `docs/catalogo-efectos.md`
- Plan y estado del sitio por etapas: `docs/PLAN_SITIO.md`. Una sesión nueva retoma desde ese archivo y desde git.
- Maquetas de referencia: `docs/maquetas/*.dc.html`. Son prototipos de Claude Design: sirven como referencia de diseño, textos y comportamiento. No copiar su código ni su formato.

## Stack
- Next.js (App Router) + TypeScript + Tailwind CSS.
- Componentes de Magic UI y Aceternity UI instalados con el CLI de shadcn cuando corresponda. Revisar si cada componente de Aceternity es gratuito antes de usarlo.
- Animación: Motion (Framer Motion). Diagramas de flujo interactivos: React Flow.
- Fuentes con `next/font`: Archivo (variable, con eje de ancho) e Inter.
- Sin base de datos hasta la fase de intranet.

## Decisiones de plataforma
Tomadas por Pablo (25 nov 2026). No se reabren sin él.
1. **Hosting:** Node en el mismo VPS de la app de actas, detrás de Apache, puerto 3200 (reservado en `~/modernizate/herramientas/docs/puertos.md`). Conexión, sesión, alta de dominio y servicio: siempre con la caja de herramientas (`~/modernizate/herramientas`). Nunca se toca la app de actas en el servidor.
2. **DNS:** Cloudflare, zona `agmodernizate.cl`, gestionado con `~/modernizate/herramientas/cloudflare/dns.sh` cuando llegue la publicación.
3. **Un subdominio por proyecto de cliente** (hoy `actas.agmodernizate.cl`; puede cambiar a `aceros.agmodernizate.cl`). No se usan rutas como `/ac/` en el dominio de la agencia.
4. **`/ingresar` es un portal de clientes:** el usuario escribe su correo y se le redirige a la página de acceso de su proyecto. La relación correo (o dominio de correo) → URL del proyecto vive solo en el servidor (variable de entorno o archivo fuera del repo), nunca en el código ni en el navegador. Sin coincidencia: mensaje neutro con un enlace de contacto. Límite de intentos por IP. Nunca una lista pública de clientes. Diseño: `docs/maquetas/Login.dc.html`.
5. **Acceso "Equipo Modernízate":** secundario y discreto dentro de `/ingresar`, para la futura intranet. Por ahora no hace nada.
6. **Cuentas:** cada proyecto mantiene sus propias cuentas. Las cuentas centrales con un solo acceso son de la fase de intranet.
7. Se aplican además los principios comunes de `~/modernizate/herramientas/docs/principios.md`.

## Reglas de trabajo
1. **Plan antes de código.** Para cada tarea, propón un plan corto (archivos, componentes, riesgos) y espera aprobación.
2. **Entregas pequeñas.** Una sección o una función por vez. Al terminar: `npm run lint`, `npm run build` y un resumen de cambios.
3. **Contenido separado de componentes.** Todo texto visible vive en `content/es.ts` y `content/en.ts`. Ningún texto queda escrito dentro de un componente.
4. **Nada se da por confirmado.** Cada texto tiene estado `borrador` o `aprobado`. Con `?revision=1` en la URL, los textos en borrador se ven con un contorno ámbar y una etiqueta. Por defecto, todo es `borrador` hasta que Pablo lo apruebe.
5. **No inventar datos.** Cifras, porcentajes y estadísticas salen solo de `docs/datos-tendencia.md`, con su fuente y año visibles en pantalla. Si falta un dato, se deja un marcador `[DATO PENDIENTE]`.
6. **Sin precios** en el sitio. Sin testimonios, logos de clientes ni casos con nombres reales salvo autorización explícita.
7. **Marcas de terceros:** no reproducir logos oficiales (WhatsApp, Telegram, Mercado Pago, etc.) salvo con sus recursos de marca oficiales. Las escenas se reconocen por el contexto (celular, burbujas de chat, carrito).
8. **Accesibilidad:** contraste AA, navegación por teclado, `prefers-reduced-motion` desactiva animaciones decorativas, imágenes con texto alternativo.
9. **Rendimiento:** efectos pesados (canvas, shaders) con carga diferida y solo cuando están en pantalla. Meta: Lighthouse ≥ 90 en móvil.
10. **Seguridad:** nunca escribir claves, tokens ni webhooks en el código ni en commits. Usar `.env.local` (en `.gitignore`) y documentar variables en `.env.example` sin valores.
11. **Git:** no hacer push ni desplegar sin autorización de Pablo. Autorizado: push a `origin` al cerrar cada etapa, si lint y build pasan (ver `docs/PLAN_SITIO.md`). Desplegar sigue requiriendo su pedido. Commits pequeños y descriptivos en español.
12. **Cuidar la cuota:** no leer archivos enormes enteros si basta una parte; no regenerar lo que ya funciona.
