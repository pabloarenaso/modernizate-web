"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { crearLimite, ipCliente } from "@/lib/limite";
import { buscarAcceso, normalizarCorreo } from "@/lib/portal";

export type EstadoPortal = { resultado: "inicial" | "sin-coincidencia" | "limite" | "invalido" };

/** 5 intentos cada 10 minutos por IP. */
const registrarIntento = crearLimite(5, 10 * 60 * 1000);
/** Tiempo mínimo de respuesta, igual para todos los casos. */
const TIEMPO_MINIMO = 400;

export async function buscarProyecto(_previo: EstadoPortal, datos: FormData): Promise<EstadoPortal> {
  const inicio = Date.now();
  let resultado: EstadoPortal["resultado"] = "sin-coincidencia";
  let destino: string | null = null;

  if (!registrarIntento(ipCliente(await headers()))) {
    resultado = "limite";
  } else {
    const correo = normalizarCorreo(datos.get("correo"));
    if (!correo) resultado = "invalido";
    else destino = await buscarAcceso(correo);
  }

  const espera = TIEMPO_MINIMO - (Date.now() - inicio);
  if (espera > 0) await new Promise((r) => setTimeout(r, espera));

  if (destino) redirect(destino);
  return { resultado };
}
