import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { BotonTema } from "@/components/BotonTema";
import { Isotipo } from "@/components/Isotipo";
import { Logo } from "@/components/Logo";
import { SelectorIdioma } from "@/components/SelectorIdioma";
import { Texto } from "@/components/Texto";
import { obtenerContenido } from "@/content";
import { esIdioma, tokensColor, type Contenido, type TokenColor } from "@/content/tipos";
import { contraste, nivelAA, nivelNoTexto } from "@/lib/contraste";
import { dia, noche } from "@/lib/paleta";

export async function generateMetadata({ params }: PageProps<"/[lang]/marca">): Promise<Metadata> {
  const { lang } = await params;
  if (!esIdioma(lang)) return {};
  return { title: obtenerContenido(lang).marca.meta.titulo.texto, robots: { index: false, follow: false } };
}

type Pareja = { frente: TokenColor | "blanco"; base: TokenColor; noTexto?: boolean };

/** Con qué se mide el contraste de cada token: texto sobre fondos, el resto sobre --fondo. */
const pareja = (t: TokenColor): Pareja | null => {
  if (t === "fondo" || t === "linea") return null;
  if (t === "superficie" || t === "suave" || t === "celeste") return { frente: "texto", base: t };
  if (t === "lateral" || t === "primario-relleno") return { frente: "blanco", base: t };
  if (t === "primario" || t.startsWith("graf-")) return { frente: t, base: "fondo", noTexto: true };
  return { frente: t, base: "fondo" };
};

const nivel = (p: Pareja, ratio: number) => (p.noTexto ? nivelNoTexto(ratio) : nivelAA(ratio));

function TablaColores({ paleta, titulo, c }: { paleta: Record<TokenColor, string>; titulo: Contenido["marca"]["colores"]["dia"]; c: Contenido["marca"]["colores"] }) {
  return (
    <div className="flex flex-col gap-3">
      <Texto as="h3" valor={titulo} className="font-display text-lg font-semibold" />
      <ul className="grid gap-2 sm:grid-cols-2">
        {tokensColor.map((t) => {
          const p = pareja(t);
          const frente = p ? (p.frente === "blanco" ? "#FFFFFF" : paleta[p.frente]) : null;
          const ratio = p && frente ? contraste(frente, paleta[p.base]) : null;
          return (
            <li key={t} className="flex items-center gap-3 rounded-xl border border-linea bg-superficie p-3">
              <span
                aria-hidden="true"
                className="size-10 shrink-0 rounded-lg border border-linea"
                style={{ background: paleta[t] }}
              />
              <div className="min-w-0 text-sm">
                <p className="font-medium">
                  <code>--{t}</code> · <span className="uppercase">{paleta[t]}</span>
                </p>
                <Texto as="p" valor={c.tokens[t]} className="text-texto-sec" />
                {p && ratio !== null && (
                  <p className="text-texto-sec">
                    <Texto valor={c.contraste} /> {ratio.toFixed(1)}:1 ·{" "}
                    <code>{p.frente === "blanco" ? "#FFFFFF" : `--${p.frente}`}</code> <Texto valor={c.sobre} />{" "}
                    <code>--{p.base}</code> ·{" "}
                    <Texto valor={c[nivel(p, ratio)]} className={nivel(p, ratio) === "noAa" || nivel(p, ratio) === "aaGrande" ? "font-semibold underline decoration-wavy" : "font-semibold"} />
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Seccion({ titulo, children }: { titulo: Contenido["marca"]["titulo"]; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-5 border-t border-linea pt-10">
      <Texto as="h2" valor={titulo} className="disp text-2xl" />
      {children}
    </section>
  );
}

export default async function PaginaMarca({ params }: PageProps<"/[lang]/marca">) {
  const { lang } = await params;
  if (!esIdioma(lang)) notFound();
  const c = obtenerContenido(lang);
  const m = c.marca;

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-4">
        <Logo nombre={c.marcaNombre.texto} className="text-xl" />
        <Texto as="h1" valor={m.titulo} className="disp text-4xl sm:text-5xl" />
        <Texto as="p" valor={m.intro} className="max-w-2xl text-lg text-texto-sec" />
      </header>

      <Seccion titulo={m.controles.titulo}>
        <div className="flex flex-wrap items-center gap-3">
          <SelectorIdioma actual={lang} ruta="/marca" c={c.idioma} />
          <BotonTema etiquetaNoche={c.tema.cambiarANoche.texto} etiquetaDia={c.tema.cambiarADia.texto} />
        </div>
      </Seccion>

      <Seccion titulo={m.colores.titulo}>
        <div className="grid gap-8 lg:grid-cols-2">
          <TablaColores paleta={dia} titulo={m.colores.dia} c={m.colores} />
          <TablaColores paleta={noche} titulo={m.colores.noche} c={m.colores} />
        </div>
      </Seccion>

      <Seccion titulo={m.tipografia.titulo}>
        <div className="flex flex-col gap-6">
          <div>
            <Texto as="p" valor={m.tipografia.wordmark} className="text-sm text-texto-sec" />
            <Logo nombre={c.marcaNombre.texto} className="mt-3 text-5xl sm:text-6xl" />
          </div>
          <div>
            <Texto as="p" valor={m.tipografia.display} className="text-sm text-texto-sec" />
            <Texto as="p" valor={m.tipografia.muestraDisplay} className="disp mt-2 text-3xl" />
          </div>
          <div>
            <Texto as="p" valor={m.tipografia.subtitulo} className="text-sm text-texto-sec" />
            <Texto as="p" valor={m.tipografia.muestraSubtitulo} className="mt-2 font-display text-2xl font-semibold" />
          </div>
          <div>
            <Texto as="p" valor={m.tipografia.cuerpo} className="text-sm text-texto-sec" />
            <Texto as="p" valor={m.tipografia.muestraCuerpo} className="mt-2 max-w-2xl" />
          </div>
        </div>
      </Seccion>

      <Seccion titulo={m.logo.titulo}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <figure className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-linea bg-superficie p-8">
            <Logo nombre={c.marcaNombre.texto} className="text-2xl" />
            <Texto as="figcaption" valor={m.logo.principal} className="text-sm text-texto-sec" />
          </figure>
          <figure className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-primario-relleno p-8">
            <Logo nombre={c.marcaNombre.texto} variante="invertido" className="text-2xl" />
            <Texto as="figcaption" valor={m.logo.invertido} className="text-sm text-white" />
          </figure>
          <figure className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-linea bg-superficie p-8">
            <Logo nombre={c.marcaNombre.texto} variante="agua" className="text-2xl" />
            <Texto as="figcaption" valor={m.logo.agua} className="text-sm text-texto-sec" />
          </figure>
          <figure className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-linea bg-superficie p-8">
            <Isotipo etiqueta={c.marcaNombre.texto} className="h-12 text-acento-texto" />
            <Texto as="figcaption" valor={m.logo.isotipo} className="text-sm text-texto-sec" />
          </figure>
        </div>
      </Seccion>

      <Seccion titulo={m.estados.titulo}>
        <Texto as="p" valor={m.estados.explicacion} className="text-texto-sec" />
        <div className="flex flex-col gap-4 pt-4">
          <Texto as="p" valor={m.estados.ejemploBorrador} className="self-start" />
          <Texto as="p" valor={m.estados.ejemploAprobado} className="self-start" />
        </div>
      </Seccion>
    </main>
  );
}
