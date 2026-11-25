import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonTema } from "@/components/BotonTema";
import { Logo } from "@/components/Logo";
import { SelectorIdioma } from "@/components/SelectorIdioma";
import { Texto } from "@/components/Texto";
import { obtenerContenido } from "@/content";
import { esIdioma } from "@/content/tipos";
import { rutaLocal } from "@/lib/rutas";

/** Portada provisional: la portada real se construye desde la Etapa 2. */
export default async function Inicio({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const c = obtenerContenido(lang);

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-8 px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <Logo nombre={c.marcaNombre.texto} className="text-2xl sm:text-3xl" />
        <div className="flex items-center gap-3">
          <SelectorIdioma actual={lang} ruta="/" c={c.idioma} />
          <BotonTema etiquetaNoche={c.tema.cambiarANoche.texto} etiquetaDia={c.tema.cambiarADia.texto} />
        </div>
      </div>
      <Texto as="h1" valor={c.inicio.titulo} className="disp text-4xl sm:text-5xl" />
      <Texto as="p" valor={c.inicio.texto} className="text-lg text-texto-sec" />
      <Link href={rutaLocal(lang, "/marca")} className="font-medium text-acento-texto underline underline-offset-4">
        <Texto valor={c.inicio.enlaceMarca} />
      </Link>
    </main>
  );
}
