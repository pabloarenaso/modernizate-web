import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../../globals.css";
import { HtmlBase } from "@/components/base/HtmlBase";
import { obtenerContenido } from "@/content";

/** /ingresar vive fuera de [lang] y por ahora solo en español. */
const c = obtenerContenido("es");

export const metadata: Metadata = {
  title: c.portal.meta.titulo.texto,
  robots: { index: false, follow: false },
};

export default function LayoutPortal({ children }: { children: ReactNode }) {
  return (
    <HtmlBase lang="es" etiquetaBorrador={c.revision.etiqueta.texto}>
      {children}
    </HtmlBase>
  );
}
