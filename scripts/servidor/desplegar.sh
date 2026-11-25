#!/usr/bin/env bash
# Pasos de despliegue del sitio. Cada paso MODIFICA el servidor salvo «revisar» y «verificar».
# Uso: bash scripts/servidor/desplegar.sh <paso> [rama|commit]
#   revisar <rama>     local: trabajo commiteado y publicado en GitHub (solo lectura)
#   actualizar <rama>  servidor: git pull --ff-only, npm ci y build (anota el commit anterior)
#   reiniciar          servidor: reinicia con mz-reiniciar-modernizate-web (sin clave)
#   verificar          servidor: https://agmodernizate.cl/ responde 200 (solo lectura)
#   volver <commit>    servidor: vuelve el código a <commit>, npm ci y build (luego «reiniciar»)
# El sitio no tiene base de datos: no hay respaldo ni migración.
set -euo pipefail
cd "$(dirname "$0")/../.."
source scripts/servidor/config.sh
paso="${1:-}"; ref="${2:-}"

remoto() {
  local pre
  pre=$(printf 'export APP=%q SERVICIO=%q DOMINIO=%q REF=%q PATH=%q:"$PATH"; set -euo pipefail; cd "$APP"; bash -eo pipefail -s' \
    "$VPS_APP" "$VPS_SERVICIO" "$DOMINIO" "$ref" "$VPS_NODE_BIN")
  ssh -o BatchMode=yes -o ConnectTimeout=10 "$VPS_HOST" "$pre"
}

case "$paso" in
  revisar)
    [ -n "$ref" ] || { echo "Indique la rama."; exit 2; }
    [ -z "$(git status --porcelain)" ] || { echo "ALTO: hay cambios sin commit."; git status --short; exit 1; }
    git fetch -q origin
    l=$(git rev-parse "$ref"); r=$(git rev-parse "origin/$ref" 2>/dev/null || echo none)
    [ "$l" = "$r" ] || { echo "ALTO: $ref local ($l) no coincide con GitHub ($r). Falta push."; exit 1; }
    echo "OK: $ref = $(git rev-parse --short "$ref") está en GitHub."
    remoto <<'R'
echo "Servidor hoy: $(git branch --show-current) $(git rev-parse --short HEAD)"
R
    ;;
  actualizar)
    [ -n "$ref" ] || { echo "Indique la rama."; exit 2; }
    remoto <<'R'
[ -z "$(git status --porcelain --untracked-files=no)" ] || { echo "ALTO: hay cambios locales en el servidor."; git status --short; exit 1; }
echo "commit antes del despliegue: $(git rev-parse HEAD)"
git fetch -q origin
git checkout -q "$REF"
git merge --ff-only -q "origin/$REF"
echo "ahora: $(git rev-parse HEAD) $(git log -1 --format=%s)"
npm ci --no-audit --no-fund --loglevel=error
npm run -s build 2>&1 | tail -15
R
    ;;
  reiniciar)
    remoto <<'R'
sudo -n /usr/local/sbin/mz-reiniciar-modernizate-web   # sin clave (/etc/sudoers.d/mz-modernizate-web)
R
    ;;
  verificar)
    remoto <<'R'
for i in 1 2 3 4 5; do
  c=$(curl -sS -o /dev/null -m 10 -w '%{http_code}' "https://$DOMINIO/" || true)
  [ "$c" = 200 ] && { echo "OK: https://$DOMINIO/ responde 200 ($(git rev-parse --short HEAD))"; exit 0; }
  sleep 3
done
echo "FALLA: https://$DOMINIO/ responde $c"; exit 1
R
    ;;
  volver)
    [ -n "$ref" ] || { echo "Indique el commit anterior (figura en la salida de «actualizar»)."; exit 2; }
    remoto <<'R'
git checkout -q "$REF"
npm ci --no-audit --no-fund --loglevel=error
npm run -s build 2>&1 | tail -10
echo "código en $(git rev-parse --short HEAD). Falta: reiniciar."
R
    ;;
  *) sed -n '2,9p' "$0"; exit 2 ;;
esac
