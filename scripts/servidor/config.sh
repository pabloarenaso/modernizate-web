# Datos del servidor para los scripts de scripts/servidor/. Sin secretos.
# Los datos comunes del VPS (alias, IP, Node) vienen de la caja de herramientas.
HERRAMIENTAS="${MZ_HERRAMIENTAS:-$HOME/modernizate/herramientas}"
if [ -f "$HERRAMIENTAS/servidor/modernizate-vps.sh" ]; then
  source "$HERRAMIENTAS/servidor/modernizate-vps.sh"   # VPS_HOST, VPS_IP, VPS_USUARIO, VPS_NODE_BIN
else
  echo "Falta la caja de herramientas en $HERRAMIENTAS (repo modernizate-herramientas)." >&2
  return 1 2>/dev/null || exit 1
fi
VPS_APP="/home/pablo/apps/modernizate-web"        # código (git); .env aquí (600, fuera de git)
VPS_DATOS="/home/pablo/modernizate-web-datos"     # archivo del portal de clientes (700)
VPS_SERVICIO="modernizate-web.service"            # unidad systemd, puerto 3200
DOMINIO="agmodernizate.cl"
