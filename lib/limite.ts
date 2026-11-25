import "server-only";

/**
 * Límite de intentos por clave (IP), en la memoria del proceso.
 * Basta para un solo proceso Node; se reinicia con el servicio.
 */
export function crearLimite(maximo: number, ventanaMs: number) {
  const intentos = new Map<string, number[]>();
  let ultimaLimpieza = Date.now();

  return function registrar(clave: string): boolean {
    const ahora = Date.now();
    if (ahora - ultimaLimpieza > ventanaMs) {
      for (const [k, v] of intentos) if (v.every((t) => ahora - t > ventanaMs)) intentos.delete(k);
      ultimaLimpieza = ahora;
    }
    const recientes = (intentos.get(clave) ?? []).filter((t) => ahora - t < ventanaMs);
    if (recientes.length >= maximo) {
      intentos.set(clave, recientes);
      return false;
    }
    recientes.push(ahora);
    intentos.set(clave, recientes);
    return true;
  };
}

/**
 * IP del cliente. Con Apache delante, X-Forwarded-For termina con la IP que vio Apache.
 * PORTAL_PROXIES_CONFIABLES indica cuántos proxies propios hay (1 = solo Apache; 2 = Cloudflare + Apache).
 */
export function ipCliente(h: Headers): string {
  const saltos = Math.max(1, Number(process.env.PORTAL_PROXIES_CONFIABLES) || 1);
  const xff = (h.get("x-forwarded-for") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return xff[xff.length - saltos] ?? xff[0] ?? h.get("x-real-ip") ?? "local";
}
