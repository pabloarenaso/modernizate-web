---
description: Estado del sitio agmodernizate.cl en el servidor (solo lectura)
---

Ejecuta `bash scripts/servidor/estado.sh` (solo lectura; no modifica nada).

Si falla la conexión con «Permission denied» o «Could not open a connection
to your authentication agent», la llave no está cargada: indica a Pablo que,
en una terminal WSL aparte, ejecute
`bash ~/modernizate/herramientas/conexion/cargar-llave.sh`. Nunca pidas la frase de la llave por el chat.

Responde en español, breve: primero las líneas «ATENCIÓN» (si las hay) y luego
versión (local vs. desplegada), servicio, disco, respuestas de la raíz, www e
/ingresar, certificado (días restantes y renovación automática) y zona horaria.

Diagnóstico con root (sin clave): `ssh modernizate-vps sudo -n /usr/local/sbin/mz-estado`.
No ejecutes otros comandos en el servidor salvo que Pablo lo pida. Nunca toques actas.
