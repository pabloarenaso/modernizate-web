import Link from "next/link";
import { lang } from "next/root-params";
import { Texto } from "@/components/Texto";
import { obtenerContenido } from "@/content";
import { esIdioma } from "@/content/tipos";
import { rutaLocal } from "@/lib/rutas";

export default async function NoEncontrado() {
  const valor = await lang();
  const idioma = esIdioma(valor) ? valor : "es";
  const c = obtenerContenido(idioma);
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 px-6">
      <Texto as="h1" valor={c.noEncontrado.titulo} className="disp text-3xl" />
      <Texto as="p" valor={c.noEncontrado.texto} className="text-texto-sec" />
      <Link href={rutaLocal(idioma)} className="font-medium text-acento-texto underline underline-offset-4">
        <Texto valor={c.noEncontrado.volver} />
      </Link>
    </main>
  );
}
