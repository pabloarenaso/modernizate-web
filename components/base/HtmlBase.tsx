import { Suspense, type CSSProperties, type ReactNode } from "react";
import { ModoRevision } from "@/components/ModoRevision";
import type { Idioma } from "@/content/tipos";
import { clasesFuentes } from "@/lib/fuentes";
import { cssTokens } from "@/lib/paleta";
import { scriptTema } from "@/lib/tema";

type Props = { lang: Idioma; etiquetaBorrador: string; children: ReactNode };

/** <html> común a todos los layouts raíz: fuentes, colores, tema sin parpadeo y modo revisión. */
export function HtmlBase({ lang, etiquetaBorrador, children }: Props) {
  const estilo = { "--etiqueta-borrador": JSON.stringify(etiquetaBorrador) } as CSSProperties;
  return (
    <html lang={lang} className={`${clasesFuentes} antialiased`} style={estilo} suppressHydrationWarning>
      {/* Layout raíz del App Router: aquí <head> es válido; la regla apunta a pages/. */}
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
        <style dangerouslySetInnerHTML={{ __html: cssTokens }} />
      </head>
      <body className="min-h-dvh">
        {children}
        <Suspense fallback={null}>
          <ModoRevision />
        </Suspense>
      </body>
    </html>
  );
}
