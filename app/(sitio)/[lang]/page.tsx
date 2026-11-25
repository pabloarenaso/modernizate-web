import { notFound } from "next/navigation";
import { Cabecera } from "@/components/sitio/Cabecera";
import { Hero } from "@/components/sitio/hero/Hero";
import { PorQueAhora } from "@/components/sitio/porque/PorQueAhora";
import { Soluciones } from "@/components/sitio/soluciones/Soluciones";
import { obtenerContenido } from "@/content";
import { esIdioma } from "@/content/tipos";
import { rutaLocal } from "@/lib/rutas";

export default async function Inicio({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const c = obtenerContenido(lang);
  const inicio = rutaLocal(lang, "/");

  return (
    <>
      <Cabecera lang={lang} ruta="/" c={c} />
      <main id="contenido">
        <Hero c={c.hero} cta={c.cabecera.cta} hrefContacto={`${inicio}#contacto`} hrefMetodo={`${inicio}#como-trabajamos`} />
        <PorQueAhora lang={lang} c={c.porQue} hrefSoluciones={`${inicio}#soluciones`} />
        <Soluciones c={c.soluciones} flujos={c.hero.flujo} hrefContacto={inicio} />
      </main>
    </>
  );
}
