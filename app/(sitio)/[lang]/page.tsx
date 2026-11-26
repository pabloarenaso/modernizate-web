import { notFound } from "next/navigation";
import { Cabecera } from "@/components/sitio/Cabecera";
import { Contacto } from "@/components/sitio/contacto/Contacto";
import { Hero } from "@/components/sitio/hero/Hero";
import { Pie } from "@/components/sitio/Pie";
import { PorQueAhora } from "@/components/sitio/porque/PorQueAhora";
import { Servicios } from "@/components/sitio/servicios/Servicios";
import { Soluciones } from "@/components/sitio/soluciones/Soluciones";
import { ComoTrabajamos } from "@/components/sitio/trabajo/ComoTrabajamos";
import { obtenerContenido } from "@/content";
import { esIdioma } from "@/content/tipos";
import { BANDERAS } from "@/lib/banderas";
import { seccionesVisibles } from "@/lib/secciones";
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
        <Servicios c={c.servicios} />
        {BANDERAS.porQueAhora && <PorQueAhora lang={lang} c={c.porQue} hrefSoluciones={`${inicio}#soluciones`} />}
        <Soluciones c={c.soluciones} flujos={c.hero.flujo} hrefContacto={inicio} />
        <ComoTrabajamos c={c.comoTrabajamos} />
        <Contacto c={c.contacto} />
      </main>
      <Pie
        c={c.pie}
        mensajeWhatsapp={c.contacto.whatsappMensaje.texto}
        nombre={c.marcaNombre.texto}
        enlaces={seccionesVisibles.map((id) => ({ href: `${inicio}#${id}`, texto: c.cabecera.nav[id] }))}
      />
    </>
  );
}
