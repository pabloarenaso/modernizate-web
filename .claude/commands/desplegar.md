---
description: Desplegar una rama de modernizate-web a agmodernizate.cl, con verificación
argument-hint: "[rama] (por defecto: main)"
---

Rama a desplegar: `$ARGUMENTS` (si está vacío, usa `main`).
Script: `bash scripts/servidor/desplegar.sh <paso> [rama|commit]`. Detalle: `docs/servidor.md`.

Sigue los pasos en orden. Si uno falla, detente, muestra el error y propone la
vuelta atrás; no improvises arreglos en el servidor. Nunca toques actas.

1. **Revisar** (solo lectura): `desplegar.sh revisar <rama>`. Exige trabajo
   commiteado y la rama igual a GitHub. Si falla, explica qué falta y detente.
   Muestra el commit del servidor → el nuevo y `git log --oneline <servidor>..<rama>`.
2. **Pide confirmación a Pablo** antes de seguir.
3. **Actualizar**: `desplegar.sh actualizar <rama>` (pull, npm ci y build). Anota
   el «commit antes del despliegue». Durante el build el sitio sigue sirviendo la
   versión anterior hasta el reinicio.
4. **Reiniciar**: `desplegar.sh reiniciar`.
5. **Verificar**: `desplegar.sh verificar` (espera 200 en la raíz).
6. **Registrar** en `docs/despliegues.md` una fila: fecha y hora (America/Santiago),
   rama, commit anterior → nuevo, resultado. Commit de ese archivo (push solo con autorización).

**Si algo falla después del paso 3**: `desplegar.sh volver <commit anterior>` y
`desplegar.sh reiniciar` (explícalo a Pablo y pide autorización). El sitio no tiene base de datos.
