import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Texto } from "@/components/Texto";
import { obtenerContenido } from "@/content";
import { clasesFuentes } from "@/lib/fuentes";
import { cssTokens } from "@/lib/paleta";

/** 404 para rutas fuera de [lang] (por ejemplo /ingresar o /app mientras no existan). Tema: el del sistema. */
const c = obtenerContenido("es");

export const metadata: Metadata = { title: c.noEncontrado.titulo.texto };

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${clasesFuentes} antialiased`}>
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssTokens }} />
      </head>
      <body>
        <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 px-6">
          <Texto as="h1" valor={c.noEncontrado.titulo} className="disp text-3xl" />
          <Texto as="p" valor={c.noEncontrado.texto} className="text-texto-sec" />
          <Link href="/" className="font-medium text-acento-texto underline underline-offset-4">
            <Texto valor={c.noEncontrado.volver} />
          </Link>
        </main>
      </body>
    </html>
  );
}
