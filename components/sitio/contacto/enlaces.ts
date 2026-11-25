/** Datos de contacto desde variables de entorno públicas (nunca en el repositorio). */
export const correoContacto = process.env.NEXT_PUBLIC_CONTACTO_CORREO ?? "";
const numero = (process.env.NEXT_PUBLIC_CONTACTO_WHATSAPP ?? "").replace(/\D/g, "");

/** Enlace de WhatsApp con mensaje prellenado; vacío si no hay número configurado. */
export function enlaceWhatsapp(mensaje: string) {
  return numero ? `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}` : "";
}
