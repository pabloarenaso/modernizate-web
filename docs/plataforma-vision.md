# Visión: de sitio web a plataforma Modernízate

agmodernizate.cl no es solo un sitio: con el tiempo será la herramienta interna de la agencia. Este documento sirve para que las decisiones de hoy no cierren puertas. **No se construye nada de esto en la fase del sitio**, salvo el botón "Ingresar" y el portal de clientes en `/ingresar`. Las decisiones ya tomadas están en `CLAUDE.md` › "Decisiones de plataforma"; si algo aquí las contradice, manda `CLAUDE.md`.

## Lo que Pablo quiere tener (en orden aproximado)
1. **Intranet con acceso** (acceso secundario "Equipo Modernízate" dentro de `/ingresar`).
2. **CRM interno:** clientes, contactos, proyectos o implementaciones con su estado, notas fechadas, próximos pasos y documentos o enlaces.
3. **Agenda:** citas que llegan desde el formulario del sitio, vista de calendario y recordatorios (correo o mensajería).
4. **Blog administrable:** crear, editar, programar y publicar artículos desde la intranet.
5. **Workflows desde la intranet:** catálogo de flujos (n8n) con botón "Ejecutar", programación y registro de cada ejecución. Ejemplo: un flujo que redacta 3 o 4 borradores semanales sobre temas de Modernízate.
6. **Asistente virtual Modernízate:** el que ya está configurado en Vocero (Nea) atendiendo y agendando.
7. Nuevas aplicaciones con el tiempo, como módulos.

## Fases propuestas
| Fase | Qué incluye | Requiere |
|---|---|---|
| F0 · Sitio | Sitio público, botón "Ingresar", portal de clientes en `/ingresar` (redirige al acceso de cada proyecto) y acceso "Equipo Modernízate" sin función todavía | Node en el VPS (puerto 3200) |
| F1 · Base de intranet | Acceso real del equipo, cuentas centrales con un solo acceso, roles (Pablo administrador; colaboradores después), diseño de panel tipo Admin, página de inicio vacía | Base de datos, autenticación |
| F2 · CRM y agenda | Clientes, implementaciones con etapas, notas, citas, recordatorios | F1 |
| F3 · Blog | Artículos con estados (borrador → revisión → programado → publicado), editor, SEO, programación | F1 |
| F4 · Workflows | Lanzar y programar flujos de n8n, ver resultados | F1 + n8n en servidor |
| F5 · Asistente | Conexión con Vocero/Nea | Vocero desplegado |

## Decisiones que conviene dejar abiertas desde ya (para el sitio actual)
- **Rutas:** sitio público en `/`; intranet bajo `/app/*` (o un subdominio `app.agmodernizate.cl` más adelante). `/ingresar` es el portal de clientes. Cada proyecto de cliente vive en su propio subdominio (por ejemplo `actas.agmodernizate.cl`), nunca en rutas del dominio de la agencia.
- **Estructura de carpetas por módulos:** `app/(sitio)/…` y `app/(intranet)/app/…`, para que la intranet crezca sin tocar el sitio.
- **Autenticación:** la misma familia que ya funciona en la app de actas (Better Auth), para reutilizar lo aprendido.
- **Base de datos (desde F1):** PostgreSQL, porque Vocero ya usa PostgreSQL y probablemente compartan servidor (en bases separadas).
- **Hosting (decidido):** Node en el mismo VPS de la app de actas, detrás de Apache, puerto 3200, operado con la caja de herramientas. DNS en Cloudflare. Ver `CLAUDE.md`.

## Decisiones pendientes para Pablo (no resolver sin él)
1. **CRM propio o Vocero.** Vocero ya tiene contactos, etapas, bandeja y agenda. Propuesta: Vocero se queda con conversaciones y prospectos (atención); la intranet maneja clientes con proyecto, implementaciones y soporte. Así no se construye dos veces lo mismo.
2. **Blog con IA:** los artículos generados llegan siempre como **borrador** y Pablo los aprueba antes de publicar. Publicar contenido masivo sin revisión daña la reputación y el posicionamiento en buscadores. Cada artículo cita sus fuentes.
3. **Workflows:** n8n queda como motor; la intranet solo lanza, programa y muestra resultados. Las claves de n8n viven en el servidor, nunca en el navegador.
4. **Portal de clientes:** la parte de redirección ya está decidida (ver `CLAUDE.md`). Que cada cliente vea el estado de su implementación sigue siendo idea futura, con permisos separados.
   - **Riesgo aceptado (Pablo, 25 nov 2026):** que `/ingresar` redirija revela que ese correo (o su dominio) es cliente. Mitigación actual: límite de 5 intentos cada 10 minutos por IP, mismo mensaje neutro y mismo tiempo de respuesta en todos los casos sin coincidencia.
   - **Alternativa futura (fase de intranet):** en vez de redirigir, enviar el enlace de acceso por correo y mostrar siempre el mismo mensaje ("si tu correo está registrado, te enviamos el enlace"). Así la página no revela nada.
