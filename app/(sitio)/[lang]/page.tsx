import { notFound } from "next/navigation";
import { Cabecera } from "@/components/sitio/Cabecera";
import { Texto } from "@/components/Texto";
import { obtenerContenido } from "@/content";
import { esIdioma } from "@/content/tipos";

export default async function Inicio({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const c = obtenerContenido(lang);

  return (
    <>
      <Cabecera lang={lang} ruta="/" c={c} />
      <main id="contenido" className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-24">
        <Texto as="h1" valor={c.inicio.titulo} className="disp text-4xl sm:text-5xl" />
        <Texto as="p" valor={c.inicio.texto} className="text-lg text-texto-sec" />
      </main>
    </>
  );
}
