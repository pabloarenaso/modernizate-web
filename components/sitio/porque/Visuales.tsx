"use client";

import { Texto } from "@/components/Texto";
import type { Contenido, Idioma } from "@/content/tipos";
import { A1, B1, B2, B3, B4, B5, type Punto } from "@/lib/datosTendencia";
import { numero, rellenar } from "@/lib/formato";
import { BarraSegmentada } from "./BarraSegmentada";
import { GraficoLinea } from "./GraficoLinea";

const DOMINIO: [number, number] = [2017, 2025];

function Fuente({ valor }: { valor: Contenido["porQue"]["paso1"]["fuenteMundo"] }) {
  return <Texto as="p" valor={valor} className="text-xs leading-snug text-texto-sec" />;
}

function Cifra({ valor, texto }: { valor: string; texto: Contenido["porQue"]["paso3"]["sitio"] }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-display text-[44px] font-bold leading-none tracking-tight sm:text-[52px]">{valor}</p>
      <Texto as="p" valor={texto} className="max-w-xs text-sm text-texto-sec" />
    </div>
  );
}

/** Paso 1: adopción en el mundo y en Chile, dos líneas de un color con la misma escala. */
export function VisualPaso1({ lang, c }: { lang: Idioma; c: Contenido["porQue"]["paso1"] }) {
  const f = (n: number) => numero(lang, n);
  const nombrar = (p: Punto) =>
    p.momento ? rellenar((p.momento === "inicio" ? c.inicioDe : c.finDe).texto, { anio: String(p.anio) }) : String(p.anio);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <GraficoLinea puntos={A1} dominio={DOMINIO} titulo={c.mundo.texto} descripcion={`${c.descMundo.texto}: ${A1.map((p) => `${nombrar(p)} ${f(p.valor)}%`).join(", ")}`} formatear={f} nombrar={nombrar} alto={180} />
          <Fuente valor={c.fuenteMundo} />
        </div>
        <div className="flex flex-col gap-2">
          <GraficoLinea puntos={B1} dominio={DOMINIO} titulo={c.chile.texto} descripcion={`${c.descChile.texto}: ${B1.map((p) => `${p.anio} ${f(p.valor)}%`).join(", ")}`} formatear={f} alto={130} />
          <Fuente valor={c.fuenteChile} />
        </div>
      </div>
    </div>
  );
}

/** Paso 2: profundidad de uso (barra apilada) y preparación (cifra grande). */
export function VisualPaso2({ lang, c }: { lang: Idioma; c: Contenido["porQue"]["paso2"] }) {
  const f = (n: number) => numero(lang, n);
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <BarraSegmentada
          titulo={c.barraTitulo.texto}
          formatear={f}
          partes={[
            { nombre: c.basico.texto, valor: B2.basico, color: "var(--graf-1)" },
            { nombre: c.integrada.texto, valor: B2.integrada, color: "var(--graf-2)" },
            { nombre: c.avanzada.texto, valor: B2.avanzada, color: "var(--graf-3)" },
          ]}
        />
        <Fuente valor={c.fuenteUso} />
      </div>
      <div className="flex flex-col gap-2 border-t border-linea pt-5">
        <Cifra valor={`${f(B3.preparadas)}%`} texto={c.preparadas} />
        <Fuente valor={c.fuentePreparadas} />
      </div>
    </div>
  );
}

/** Paso 3: comercio electrónico (cifra + barra simple) y pymes con sitio web (cifra). */
export function VisualPaso3({ lang, c }: { lang: Idioma; c: Contenido["porQue"]["paso3"] }) {
  const f = (n: number) => numero(lang, n);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Cifra valor={rellenar(c.ventas.texto, { valor: numero(lang, B5.ventasMillonesUsd, 0) })} texto={c.ventasTexto} />
        <Fuente valor={c.fuenteVentas} />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-3">
          <p className="font-display text-2xl font-bold">{f(B5.participacionOnline)}%</p>
          <Texto as="p" valor={c.online} className="text-sm text-texto-sec" />
        </div>
        <div aria-hidden="true" className="h-2 w-full rounded-full bg-suave">
          <div className="segmento h-2 rounded-full bg-[var(--graf-1)]" style={{ width: `${B5.participacionOnline}%` }} />
        </div>
        <Fuente valor={c.fuenteOnline} />
      </div>
      <div className="flex flex-col gap-2 border-t border-linea pt-5">
        <Cifra valor={`${f(B4.conSitio)}%`} texto={c.sitio} />
        <Fuente valor={c.fuenteSitio} />
      </div>
    </div>
  );
}
