#!/usr/bin/env bash
# Estado del sitio en el servidor. SOLO LECTURA: no modifica nada local ni remoto.
# Uso: bash scripts/servidor/estado.sh
set -uo pipefail
cd "$(dirname "$0")/../.."
source scripts/servidor/config.sh || exit 1

echo "== Local"
echo "rama: $(git branch --show-current)  commit: $(git rev-parse --short HEAD)"
echo "cambios sin commit: $(git status --porcelain | wc -l)"
git fetch -q origin 2>/dev/null && echo "contra GitHub: $(git rev-list --left-right --count HEAD...@{u} 2>/dev/null | awk '{print "adelante " $1 ", atrás " $2}' || echo 'sin rama remota')"

ssh -o BatchMode=yes -o ConnectTimeout=10 "$VPS_HOST" \
  APP="$VPS_APP" SERVICIO="$VPS_SERVICIO" DOMINIO="$DOMINIO" 'bash -s' <<'REMOTO'
avisos=0
atencion() { echo "ATENCIÓN: $*"; avisos=$((avisos + 1)); }
echo "== Servidor ($(hostname))"
cd "$APP" || exit 1
echo "rama: $(git branch --show-current)  commit: $(git rev-parse --short HEAD)  ($(git log -1 --format=%ci))"
activo=$(systemctl is-active "$SERVICIO")
echo "servicio: $activo desde $(systemctl show "$SERVICIO" -p ActiveEnterTimestamp --value)  reinicios: $(systemctl show "$SERVICIO" -p NRestarts --value)"
[ "$activo" = active ] || atencion "el servicio $SERVICIO no está activo"
echo "disco: $(df -h "$APP" | awk 'NR==2{print $4 " libres de " $2 " (" $5 " usado)"}')"
uso=$(df --output=pcent "$APP" | tail -1 | tr -dc 0-9); [ "${uso:-0}" -lt 85 ] || atencion "disco al ${uso}%"
for u in "https://$DOMINIO/" "https://www.$DOMINIO/" "https://$DOMINIO/ingresar"; do
  echo "$u → $(curl -s -o /dev/null -m 10 -w '%{http_code} %{redirect_url}' "$u")"
done
fin=$(echo | openssl s_client -servername "$DOMINIO" -connect "$DOMINIO:443" 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
if [ -n "$fin" ]; then
  dias=$(( ( $(date -d "$fin" +%s) - $(date +%s) ) / 86400 ))
  echo "certificado: vence $fin ($dias días)"
  [ "$dias" -ge 20 ] || atencion "al certificado le quedan $dias días"
else atencion "no se pudo leer el certificado"; fi
echo "renovación automática: $(systemctl is-active certbot.timer)"
echo "zona horaria: $(timedatectl show -p Timezone --value 2>/dev/null)"
[ "$avisos" -eq 0 ] && echo "Sin avisos."
REMOTO
