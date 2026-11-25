import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../globals.css";
import { HtmlBase } from "@/components/base/HtmlBase";
import { obtenerContenido } from "@/content";
import { esIdioma, idiomas } from "@/content/tipos";

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
  return (
    <HtmlBase lang={lang} etiquetaBorrador={c.revision.etiqueta.texto}>
      {children}
    </HtmlBase>
  );
}
