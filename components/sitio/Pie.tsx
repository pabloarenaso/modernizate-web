import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Texto } from "@/components/Texto";
import type { Contenido } from "@/content/tipos";
import { correoContacto, enlaceWhatsapp } from "./contacto/enlaces";
import { IconoChat } from "./contacto/IconoChat";

/** Pie: lema, correo, WhatsApp, acceso de clientes y año. */
async function anioActual() {
  "use cache";
  return new Date().getFullYear();
}

type Enlace = { href: string; texto: Contenido["pie"]["lema"] };

export async function Pie({ c, mensajeWhatsapp, nombre, enlaces }: { c: Contenido["pie"]; mensajeWhatsapp: string; nombre: string; enlaces: Enlace[] }) {
  const wa = enlaceWhatsapp(mensajeWhatsapp);
  const anio = await anioActual();
  return (
    <footer className="border-t border-linea bg-suave">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-3">
          <Logo nombre={nombre} className="text-[20px]" />
          <Texto as="p" valor={c.lema} className="max-w-[320px] text-sm text-texto-sec" />
        </div>
        <nav aria-label={nombre}>
          <ul className="flex flex-col gap-3 text-sm">
            {enlaces.map((e) => (
              <li key={e.href}>
                <a href={e.href} className="hover:text-acento-texto hover:underline">
                  <Texto valor={e.texto} />
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-col gap-3 text-sm">
          {correoContacto && (
            <li className="flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 text-texto-sec" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18v12H3zM3 7l9 6 9-6" /></svg>
              <span className="sr-only">{c.correo.texto}: </span>
              <a href={`mailto:${correoContacto}`} className="hover:text-acento-texto hover:underline">
                {correoContacto}
              </a>
            </li>
          )}
          {wa && (
            <li className="flex items-center gap-2">
              <IconoChat className="size-4 text-texto-sec" />
              <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:text-acento-texto hover:underline">
                <Texto valor={c.whatsapp} />
              </a>
            </li>
          )}
          <li className="flex items-center gap-2">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 text-texto-sec" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z" /></svg>
            <Link href="/ingresar" className="hover:text-acento-texto hover:underline">
              <Texto valor={c.ingresar} />
            </Link>
          </li>
        </ul>
      </div>
      <div className="border-t border-linea">
        <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-2 px-6 py-5 text-xs text-texto-sec">
          <span data-estado={c.derechos.estado}>{c.derechos.texto.replace("{anio}", String(anio))}</span>
          <Texto valor={c.hecho} />
        </div>
      </div>
    </footer>
  );
}
