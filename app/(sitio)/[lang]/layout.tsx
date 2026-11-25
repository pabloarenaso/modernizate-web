import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type CSSProperties } from "react";
import "../../globals.css";
import { ModoRevision } from "@/components/ModoRevision";
import { ProveedorTema } from "@/components/ProveedorTema";
import { obtenerContenido } from "@/content";
import { esIdioma, idiomas } from "@/content/tipos";
import { clasesFuentes } from "@/lib/fuentes";
import { cssTokens } from "@/lib/paleta";

export async function generateStaticParams() {
  return idiomas.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  const c = obtenerContenido(lang);
  return { title: c.meta.titulo.texto, description: c.meta.descripcion.texto };
}

export default async function LayoutSitio({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const c = obtenerContenido(lang);
  const estilo = { "--etiqueta-borrador": JSON.stringify(c.revision.etiqueta.texto) } as CSSProperties;

  return (
    <html lang={lang} className={`${clasesFuentes} antialiased`} style={estilo} suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssTokens }} />
      </head>
      <body className="min-h-dvh">
        <ProveedorTema>
          {children}
          <Suspense fallback={null}>
            <ModoRevision />
          </Suspense>
        </ProveedorTema>
      </body>
    </html>
  );
}
