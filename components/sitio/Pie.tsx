import Link from "next/link";
import { Isotipo } from "@/components/Isotipo";
import { Logo } from "@/components/Logo";
import { Texto } from "@/components/Texto";
import type { Contenido } from "@/content/tipos";
import { correoContacto, enlaceWhatsapp } from "./contacto/enlaces";
import { IconoChat } from "./contacto/IconoChat";

async function anioActual() {
  "use cache";
  return new Date().getFullYear();
}

type Enlace = { href: string; texto: Contenido["pie"]["lema"] };

const titulo = "mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-texto-sec";
const enlace = "transition-colors hover:text-acento-texto";

/** Pie claro con presencia de marca: logo, tilde y frase; secciones, contacto, acceso de clientes, año y "Hecho en Chile". */
export async function Pie({ c, mensajeWhatsapp, nombre, enlaces }: { c: Contenido["pie"]; mensajeWhatsapp: string; nombre: string; enlaces: Enlace[] }) {
  const wa = enlaceWhatsapp(mensajeWhatsapp);
  const anio = await anioActual();
  return (
    <footer className="relative overflow-hidden border-t border-linea bg-superficie">
      <Isotipo className="pointer-events-none absolute -right-10 -top-8 h-[260px] text-primario opacity-[0.06]" />
      <div className="relative mx-auto grid max-w-[1240px] gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <Logo nombre={nombre} className="text-[26px]" />
          <Texto as="p" valor={c.frase} className="max-w-[300px] font-display text-[20px] font-semibold leading-snug" />
          <Texto as="p" valor={c.lema} className="max-w-[300px] text-sm text-texto-sec" />
        </div>
        <nav aria-label={c.secciones.texto}>
          <Texto as="p" valor={c.secciones} className={titulo} />
          <ul className="flex flex-col gap-2.5 text-sm">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a href={e.href} className={enlace}>
                  <Texto valor={e.texto} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <Texto as="p" valor={c.contacto} className={titulo} />
          <ul className="flex flex-col gap-2.5 text-sm">
            {correoContacto && (
              <li className="flex items-center gap-2">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 text-texto-sec" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg>
                <span className="sr-only">{c.correo.texto}: </span>
                <a href={`mailto:${correoContacto}`} className={`${enlace} break-all`}>{correoContacto}</a>
              </li>
            )}
            {wa && (
              <li className="flex items-center gap-2">
                <IconoChat className="size-4 shrink-0 text-texto-sec" />
                <a href={wa} target="_blank" rel="noopener noreferrer" className={enlace}>
                  <Texto valor={c.whatsapp} />
                </a>
              </li>
            )}
          </ul>
        </div>
        <div>
          <Texto as="p" valor={c.clientes} className={titulo} />
          <Link href="/ingresar" className="inline-flex items-center gap-2 rounded-[10px] border border-linea px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-suave">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" /></svg>
            <Texto valor={c.ingresar} />
          </Link>
        </div>
      </div>
      <div className="relative border-t border-linea">
        <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 px-6 py-5 text-xs text-texto-sec">
          <span data-estado={c.derechos.estado}>{c.derechos.texto.replace("{anio}", String(anio))}</span>
          <span className="flex items-center gap-1.5">
            <Isotipo className="h-3 text-primario" />
            <Texto valor={c.hecho} />
          </span>
        </div>
      </div>
    </footer>
  );
}
