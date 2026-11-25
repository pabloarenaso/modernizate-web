import "server-only";
import { readFile, stat } from "node:fs/promises";

/**
 * Relación correo → acceso del proyecto. Vive SOLO en el servidor, en un archivo
 * fuera del repositorio indicado por PORTAL_CLIENTES_ARCHIVO. Formato:
 *   { "correos": { "persona@gmail.com": "https://…" }, "dominios": { "empresa.cl": "https://…" } }
 */
type Relacion = { correos: Record<string, string>; dominios: Record<string, string> };

/** Dominios públicos: nunca se aceptan como entrada por dominio (solo correo exacto). */
const DOMINIOS_PUBLICOS = new Set([
  "gmail.com", "googlemail.com", "outlook.com", "outlook.es", "hotmail.com", "hotmail.es", "hotmail.cl",
  "live.com", "live.cl", "msn.com", "yahoo.com", "yahoo.es", "yahoo.cl", "icloud.com", "me.com",
  "proton.me", "protonmail.com", "aol.com", "gmx.com", "zoho.com", "mail.com",
]);

let cache: { ruta: string; mtime: number; datos: Relacion } | null = null;

async function cargar(): Promise<Relacion> {
  const vacia: Relacion = { correos: {}, dominios: {} };
  const ruta = process.env.PORTAL_CLIENTES_ARCHIVO;
  if (!ruta) return vacia;
  try {
    const { mtimeMs } = await stat(ruta);
    if (cache && cache.ruta === ruta && cache.mtime === mtimeMs) return cache.datos;
    const crudo = JSON.parse(await readFile(ruta, "utf8")) as Partial<Relacion>;
    const minus = (o: Record<string, string> = {}) =>
      Object.fromEntries(Object.entries(o).map(([k, v]) => [k.trim().toLowerCase(), String(v)]));
    const datos = { correos: minus(crudo.correos), dominios: minus(crudo.dominios) };
    for (const d of Object.keys(datos.dominios)) {
      if (DOMINIOS_PUBLICOS.has(d)) {
        console.warn(`[portal] dominio público ignorado en "dominios": ${d} (usar el correo exacto)`);
        delete datos.dominios[d];
      }
    }
    cache = { ruta, mtime: mtimeMs, datos };
    return datos;
  } catch (e) {
    console.error("[portal] no se pudo leer PORTAL_CLIENTES_ARCHIVO:", (e as Error).message);
    return vacia;
  }
}

/** Patrones de destino permitidos (PORTAL_DESTINOS_PERMITIDOS, separados por coma). */
const patrones = () =>
  (process.env.PORTAL_DESTINOS_PERMITIDOS || "*.agmodernizate.cl")
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);

export function destinoPermitido(url: string): boolean {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return false;
  }
  if (u.protocol !== "https:" || u.username || u.password) return false;
  const host = u.hostname.toLowerCase();
  return patrones().some((p) => (p.startsWith("*.") ? host.endsWith(p.slice(1)) : host === p));
}

const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizarCorreo(valor: unknown): string | null {
  if (typeof valor !== "string") return null;
  const correo = valor.normalize("NFC").trim().toLowerCase();
  return correo.length <= 254 && FORMATO_CORREO.test(correo) ? correo : null;
}

/** URL de acceso para el correo, o null si no hay coincidencia o el destino no está permitido. */
export async function buscarAcceso(correo: string): Promise<string | null> {
  const { correos, dominios } = await cargar();
  const dominio = correo.slice(correo.lastIndexOf("@") + 1);
  const url = correos[correo] ?? dominios[dominio];
  if (!url) return null;
  if (!destinoPermitido(url)) {
    console.warn("[portal] destino fuera de PORTAL_DESTINOS_PERMITIDOS ignorado");
    return null;
  }
  return url;
}
