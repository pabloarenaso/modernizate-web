import type { ElementType } from "react";
import type { Texto as TextoContenido } from "@/content/tipos";

type Props = { valor: TextoContenido; as?: ElementType; className?: string };

/** Muestra un texto de content/ con su estado (borrador o aprobado) en data-estado. */
export function Texto({ valor, as: Etiqueta = "span", className }: Props) {
  return (
    <Etiqueta data-estado={valor.estado} className={className}>
      {valor.texto}
    </Etiqueta>
  );
}
