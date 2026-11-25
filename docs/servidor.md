# Servidor de agmodernizate.cl

VPS común de Modernízate (`modernizate-vps`, datos en `~/modernizate/herramientas`). Protocolo de sesión,
bitácora y lo que no se toca (actas): `~/modernizate/herramientas/docs/servidor.md`.

| Qué | Dónde |
|---|---|
| Código (clon de Git) | `/home/pablo/apps/modernizate-web` |
| Variables (600, fuera de Git) | `/home/pablo/apps/modernizate-web/.env` (nombres en `.env.example`) |
| Portal de clientes (700) | `/home/pablo/modernizate-web-datos/portal-clientes.json` |
| Servicio | `modernizate-web.service`, `127.0.0.1:3200` (`scripts/servidor/modernizate-web.service`) |
| Reinicio sin clave | `sudo -n mz-reiniciar-modernizate-web` (`scripts/servidor/sbin/`) |
| Apache | `modernizate-web.conf` (80) y `modernizate-web-le-ssl.conf` (443, certbot); www → raíz con 301 |

Las variables `NEXT_PUBLIC_*` se incrustan al compilar: tras cambiarlas hay que volver a hacer `build` y reiniciar.

Comandos: `/estado-servidor` (solo lectura) y `/desplegar [rama]`.
