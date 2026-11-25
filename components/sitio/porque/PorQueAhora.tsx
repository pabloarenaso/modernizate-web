import { Texto } from "@/components/Texto";
import type { Contenido, Idioma, Texto as TextoC } from "@/content/tipos";
import { A1, B1, B2, B3, B4, B5 } from "@/lib/datosTendencia";
import { numero, rellenar } from "@/lib/formato";
import { Recorrido } from "./Recorrido";
import { VisualPaso1, VisualPaso2, VisualPaso3 } from "./Visuales";
import { TablaDatos } from "./TablaDatos";

type Props = { lang: Idioma; c: Contenido["porQue"]; hrefSoluciones: string };

function TextoPaso({ n, titulo, frase, tabla }: { n: number; titulo: TextoC; frase: TextoC; tabla: React.ReactNode }) {
  return (
    <div className="flex max-w-md flex-col gap-4">
      <span className="font-display text-sm font-bold text-acento-texto">0{n}</span>
      <Texto as="h3" valor={titulo} className="disp text-2xl leading-tight sm:text-[28px]" />
      <Texto as="p" valor={frase} className="text-lg leading-relaxed text-texto-sec" />
      {tabla}
    </div>
  );
}

/** Sección "Por qué ahora": recorrido de 3 pasos con datos de docs/datos-tendencia.md y un cierre. */
export function PorQueAhora({ lang, c, hrefSoluciones }: Props) {
  const f = (n: number) => numero(lang, n);
  const pct = (n: number) => `${f(n)}%`;
  const enc: [string, string] = [c.tabla.anio.texto, c.tabla.valor.texto];
  const encCat: [string, string] = [c.tabla.categoria.texto, c.tabla.valor.texto];

  const pasos = [
    {
      texto: (
        <TextoPaso
          n={1}
          titulo={c.paso1.titulo}
          frase={c.paso1.frase}
          tabla={
            <TablaDatos
              resumen={c.verTabla}
              encabezados={enc}
              filas={[
                ...A1.map((p): [string, string] => [
                  `${c.paso1.mundo.texto} ${p.momento ? rellenar((p.momento === "inicio" ? c.paso1.inicioDe : c.paso1.finDe).texto, { anio: String(p.anio) }) : p.anio}`,
                  pct(p.valor),
                ]),
                ...B1.map((p): [string, string] => [`${c.paso1.chile.texto} ${p.anio}`, pct(p.valor)]),
              ]}
            />
          }
        />
      ),
      visual: <VisualPaso1 lang={lang} c={c.paso1} />,
    },
    {
      texto: (
        <TextoPaso
          n={2}
          titulo={c.paso2.titulo}
          frase={c.paso2.frase}
          tabla={
            <TablaDatos
              resumen={c.verTabla}
              encabezados={encCat}
              filas={[
                [c.paso2.basico.texto, pct(B2.basico)],
                [c.paso2.integrada.texto, pct(B2.integrada)],
                [c.paso2.avanzada.texto, pct(B2.avanzada)],
                [c.paso2.preparadas.texto, pct(B3.preparadas)],
              ]}
            />
          }
        />
      ),
      visual: <VisualPaso2 lang={lang} c={c.paso2} />,
    },
    {
      texto: (
        <TextoPaso
          n={3}
          titulo={c.paso3.titulo}
          frase={c.paso3.frase}
          tabla={
            <TablaDatos
              resumen={c.verTabla}
              encabezados={encCat}
              filas={[
                [c.paso3.ventasTexto.texto, rellenar(c.paso3.ventas.texto, { valor: numero(lang, B5.ventasMillonesUsd, 0) })],
                [c.paso3.online.texto, pct(B5.participacionOnline)],
                [c.paso3.sitio.texto, pct(B4.conSitio)],
              ]}
            />
          }
        />
      ),
      visual: <VisualPaso3 lang={lang} c={c.paso3} />,
    },
  ];

  return (
    <section id="por-que-ahora" aria-labelledby="por-que-ahora-titulo" className="scroll-mt-20 border-b border-linea">
      <div className="mx-auto max-w-[1240px] px-6 pt-16 lg:pt-24">
        <Texto as="p" valor={c.kicker} className="kicker text-acento-texto" />
        <h2 id="por-que-ahora-titulo" className="disp mt-3 max-w-3xl text-3xl leading-tight sm:text-[40px]">
          <Texto valor={c.titulo} />
        </h2>
        <Recorrido pasos={pasos} />
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 py-20 text-center lg:py-28">
          <Texto as="p" valor={c.cierre.frase} className="disp text-[28px] leading-tight sm:text-[40px]" />
          <a href={hrefSoluciones} className="inline-flex h-12 items-center rounded-[10px] bg-primario-relleno px-7 font-semibold text-white transition-[filter] hover:brightness-110">
            <Texto valor={c.cierre.boton} />
          </a>
          <p className="max-w-xl text-sm text-texto-sec">
            <Texto valor={{ ...c.cierre.secundaria, texto: rellenar(c.cierre.secundaria.texto, { valor: f(B2.productividad) }) }} />{" "}
            <Texto valor={c.cierre.fuente} className="text-xs" />
          </p>
        </div>
      </div>
    </section>
  );
}
