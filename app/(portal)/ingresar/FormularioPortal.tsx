"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Texto } from "@/components/Texto";
import type { Contenido } from "@/content/tipos";
import { buscarProyecto, type EstadoPortal } from "./acciones";

type Props = { c: Contenido["portal"] };

export function FormularioPortal({ c }: Props) {
  const [estado, accion, pendiente] = useActionState<EstadoPortal, FormData>(buscarProyecto, { resultado: "inicial" });
  const [notaEquipo, setNotaEquipo] = useState(false);

  const mensaje =
    estado.resultado === "sin-coincidencia" ? (
      <>
        <Texto valor={c.sinCoincidencia} />{" "}
        <Link href="/#contacto" className="font-semibold text-acento-texto underline underline-offset-4">
          <Texto valor={c.contacto} />
        </Link>
      </>
    ) : estado.resultado === "limite" ? (
      <Texto valor={c.limite} />
    ) : estado.resultado === "invalido" ? (
      <Texto valor={c.invalido} />
    ) : null;

  return (
    <div className="flex flex-col gap-6">
      <form action={accion} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <Texto valor={c.correo} className="text-sm font-semibold" />
          <input
            type="email"
            name="correo"
            required
            autoComplete="email"
            inputMode="email"
            placeholder={c.correoEjemplo.texto}
            aria-describedby="portal-mensaje"
            className="h-12 rounded-[10px] border border-linea bg-superficie px-4 text-base text-texto placeholder:text-texto-sec focus:border-primario focus:outline-none focus:ring-4 focus:ring-primario/20"
          />
        </label>
        <button
          type="submit"
          disabled={pendiente}
          className="inline-flex h-12 items-center justify-center rounded-[10px] bg-primario-relleno px-6 font-semibold text-white transition-[filter] hover:brightness-110 disabled:opacity-70"
        >
          <Texto valor={pendiente ? c.buscando : c.continuar} />
        </button>
        <p id="portal-mensaje" role="status" aria-live="polite" className="min-h-[3em] text-sm leading-relaxed text-texto-sec">
          {!pendiente && mensaje}
        </p>
      </form>
      <div className="border-t border-linea pt-5">
        <button
          type="button"
          aria-disabled="true"
          onClick={() => setNotaEquipo(true)}
          className="text-sm font-medium text-texto-sec underline-offset-4 hover:underline"
        >
          <Texto valor={c.equipo} />
        </button>
        <p role="status" className="mt-1 min-h-[1.25em] text-xs text-texto-sec">
          {notaEquipo && <Texto valor={c.equipoNota} />}
        </p>
      </div>
    </div>
  );
}
