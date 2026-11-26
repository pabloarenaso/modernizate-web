"use client";

import { useState, type FormEvent } from "react";
import { useConfeti } from "@/components/Confeti";
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
  const { disparar, confeti } = useConfeti();

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
      // FormData sin cabeceras propias: es una petición "simple" y el navegador no hace la consulta previa (CORS),
      // que el filtro de Cloudflare de Web3Forms puede rechazar.
      const cuerpo = new FormData();
      const campos: Record<string, string> = {
        access_key: CLAVE,
        subject: c.asunto.texto,
        from_name: c.remitente.texto,
        name: valor("nombre"),
        email: valor("correo"),
        telefono: valor("telefono") || "—",
        rubro: valor("rubro"),
        message: valor("mensaje"),
      };
      for (const [k, v] of Object.entries(campos)) cuerpo.append(k, v);
      const r = await fetch("https://api.web3forms.com/submit", { method: "POST", body: cuerpo });
      const j = (await r.json().catch(() => ({}))) as { success?: boolean; message?: string };
      if (r.ok && j.success) {
        form.reset();
        setEstado("recibido");
        disparar();
      } else {
        console.warn("Formulario de contacto: Web3Forms respondió", r.status, j.message ?? "");
        setEstado("error");
      }
    } catch (e) {
      console.warn("Formulario de contacto: no se pudo conectar con Web3Forms", e);
      setEstado("error");
    }
  }

  const tarjeta = "relative flex flex-col gap-5 rounded-2xl border border-linea bg-superficie p-6 shadow-[0_30px_60px_-30px_rgba(11,21,48,0.45)] sm:p-8";
  const cabecera = (
    <div className="flex items-center gap-3">
      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-primario-relleno text-white">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg>
      </span>
      <span className="flex flex-col">
        <Texto valor={c.formTitulo} className="font-display text-[19px] font-semibold" />
        <Texto valor={c.formSub} className="text-[13px] text-texto-sec" />
      </span>
    </div>
  );

  if (estado === "recibido") {
    return (
      <div role="status" className={`${tarjeta} min-h-[420px] items-center justify-center text-center`}>
        <span className="relative flex size-20 items-center justify-center">
          <span aria-hidden="true" className="recibido-fondo absolute inset-0 rounded-full bg-ok-fondo" />
          <svg aria-hidden="true" viewBox="0 0 24 24" className="relative size-10 text-ok-texto" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path className="recibido-check" d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
          </svg>
          {confeti}
        </span>
        <Texto as="p" valor={c.recibidoTitulo} className="aparecer font-display text-[28px] font-bold [animation-delay:.25s]" />
        <Texto as="p" valor={c.recibido} className="aparecer max-w-[320px] text-texto-sec [animation-delay:.4s]" />
        <button type="button" onClick={() => setEstado("listo")} className="mt-2 rounded-[10px] border border-linea px-4 py-2 text-sm font-semibold transition-colors hover:bg-suave">
          <Texto valor={c.otro} />
        </button>
      </div>
    );
  }

  const campo = "h-12 w-full rounded-[10px] border bg-superficie px-3.5 text-base text-texto outline-none transition-colors focus:border-primario focus:ring-2 focus:ring-seleccion";
  const borde = (k: string) => (errores[k] ? "border-[#D92D20]" : "border-linea");
  const aviso = estado === "error" ? c.error : estado === "limite" ? c.limite : estado === "incompleto" ? c.incompleto : null;

  return (
    <form onSubmit={enviar} noValidate className={tarjeta}>
      {cabecera}
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <Texto valor={c.nombre} />
          <input name="nombre" autoComplete="name" required aria-invalid={errores.nombre || undefined} className={`${campo} ${borde("nombre")}`} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          <Texto valor={c.correo} />
          <span className={`gooey flex h-12 items-center gap-2 rounded-full border bg-suave pl-4 pr-1.5 ${borde("correo")}`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 text-texto-sec" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7.1" /></svg>
            <input name="correo" type="email" autoComplete="email" required placeholder="tu@negocio.cl" aria-invalid={errores.correo || undefined} className="h-full min-w-0 flex-1 bg-transparent text-base text-texto outline-none focus-visible:outline-none" />
          </span>
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
