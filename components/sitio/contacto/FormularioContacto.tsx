"use client";

import { useState, type FormEvent } from "react";
import { Texto } from "@/components/Texto";
import type { ContactoC } from "@/content/tipos";

type Estado = "listo" | "enviando" | "recibido" | "error" | "limite" | "incompleto";

const CLAVE = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";
const MAX_ENVIOS = 3;
const VENTANA_MS = 10 * 60 * 1000;
const REGISTRO = "contacto-envios";

/** Límite simple en el navegador: 3 envíos cada 10 minutos. Web3Forms filtra spam además en su servidor. */
function puedeEnviar() {
  try {
    const ahora = Date.now();
    const previos = (JSON.parse(localStorage.getItem(REGISTRO) ?? "[]") as number[]).filter((t) => ahora - t < VENTANA_MS);
    if (previos.length >= MAX_ENVIOS) return false;
    localStorage.setItem(REGISTRO, JSON.stringify([...previos, ahora]));
    return true;
  } catch {
    return true;
  }
}

const correoValido = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

/** Formulario de contacto: se envía desde el navegador a Web3Forms, que lo reenvía al correo de Pablo. */
export function FormularioContacto({ c }: { c: ContactoC }) {
  const [estado, setEstado] = useState<Estado>("listo");
  const [errores, setErrores] = useState<Record<string, boolean>>({});

  async function enviar(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const datos = new FormData(form);
    // Campo trampa: las personas no lo ven; si viene marcado, se descarta en silencio.
    if (datos.get("botcheck")) {
      setEstado("recibido");
      return;
    }
    const valor = (k: string) => String(datos.get(k) ?? "").trim();
    const faltan = {
      nombre: !valor("nombre"),
      correo: !correoValido(valor("correo")),
      rubro: !valor("rubro"),
      mensaje: valor("mensaje").length < 5,
    };
    setErrores(faltan);
    if (Object.values(faltan).some(Boolean)) {
      setEstado("incompleto");
      return;
    }
    if (!puedeEnviar()) {
      setEstado("limite");
      return;
    }
    setEstado("enviando");
    try {
      const r = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: CLAVE,
          subject: c.asunto.texto,
          from_name: "agmodernizate.cl",
          name: valor("nombre"),
          email: valor("correo"),
          telefono: valor("telefono") || "—",
          rubro: valor("rubro"),
          message: valor("mensaje"),
          botcheck: false,
        }),
      });
      const j = (await r.json().catch(() => ({}))) as { success?: boolean };
      if (r.ok && j.success) {
        form.reset();
        setEstado("recibido");
      } else setEstado("error");
    } catch {
      setEstado("error");
    }
  }

  if (estado === "recibido") {
    return (
      <div role="status" className="aparecer flex flex-col items-start gap-3 rounded-2xl border border-linea bg-superficie p-8">
        <span aria-hidden="true" className="flex size-12 items-center justify-center rounded-full bg-ok-fondo text-ok-texto">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <Texto as="p" valor={c.recibidoTitulo} className="font-display text-2xl font-bold" />
        <Texto as="p" valor={c.recibido} className="text-texto-sec" />
        <button type="button" onClick={() => setEstado("listo")} className="mt-2 text-sm font-semibold text-acento-texto underline-offset-4 hover:underline">
          <Texto valor={c.otro} />
        </button>
      </div>
    );
  }

  const campo = "h-12 w-full rounded-[10px] border bg-superficie px-3.5 text-base text-texto outline-none transition-colors focus:border-primario focus:ring-2 focus:ring-seleccion";
  const borde = (k: string) => (errores[k] ? "border-[#D92D20]" : "border-linea");
  const aviso = estado === "error" ? c.error : estado === "limite" ? c.limite : estado === "incompleto" ? c.incompleto : null;

  return (
    <form onSubmit={enviar} noValidate className="flex flex-col gap-4 rounded-2xl border border-linea bg-superficie p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <Texto valor={c.nombre} />
          <input name="nombre" autoComplete="name" required aria-invalid={errores.nombre || undefined} className={`${campo} ${borde("nombre")}`} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <Texto valor={c.correo} />
          <input name="correo" type="email" autoComplete="email" required aria-invalid={errores.correo || undefined} className={`${campo} ${borde("correo")}`} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <span>
            <Texto valor={c.telefono} /> <span className="font-normal text-texto-sec">(<Texto valor={c.opcional} />)</span>
          </span>
          <input name="telefono" type="tel" autoComplete="tel" className={`${campo} border-linea`} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <Texto valor={c.rubro} />
          <input name="rubro" required placeholder={c.rubroEjemplo.texto} aria-invalid={errores.rubro || undefined} className={`${campo} ${borde("rubro")}`} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        <Texto valor={c.mensaje} />
        <textarea
          name="mensaje"
          required
          rows={5}
          placeholder={c.mensajeEjemplo.texto}
          aria-invalid={errores.mensaje || undefined}
          className={`${campo} h-auto py-3 ${borde("mensaje")}`}
        />
      </label>
      {/* Campo trampa para bots: fuera de la vista y del teclado. */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {aviso && (
        <p role="alert" className="rounded-lg bg-[rgba(217,45,32,.08)] px-3 py-2 text-sm text-texto">
          <Texto valor={aviso} />
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Texto as="p" valor={c.privacidad} className="text-xs text-texto-sec" />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className="inline-flex h-12 items-center rounded-[10px] bg-primario-relleno px-6 font-semibold text-white transition-[filter] hover:brightness-110 disabled:opacity-70"
        >
          <Texto valor={estado === "enviando" ? c.enviando : c.enviar} />
        </button>
      </div>
    </form>
  );
}
