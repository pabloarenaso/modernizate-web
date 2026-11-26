import type { ReactNode } from "react";

/*
 * Botón que lleva al formulario de contacto, con líneas de luz que sobrepasan las esquinas y brillo con trama al pasar.
 * Adaptado (bordes redondeados, colores de Modernízate, variante sutil) de "evil-seahorse-60" de SelfMadeSystem en Uiverse.io.
 *
 * Copyright - 2026 SelfMadeSystem (SelfMadeSystem)
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

type Props = {
  href: string;
  children: ReactNode;
  /** Destacado: líneas de luz siempre visibles (llamados principales). Sutil: aparecen al pasar el mouse o con foco. */
  destacado?: boolean;
  /** Tamaño: "grande" (h-12) o "chico" (cabecera). */
  tam?: "grande" | "chico";
  className?: string;
};

export function BotonContacto({ href, children, destacado = false, tam = "grande", className = "" }: Props) {
  return (
    <a
      href={href}
      className={`boton-luz ${destacado ? "boton-luz-destacado" : "boton-luz-sutil"} inline-flex items-center justify-center bg-primario-relleno font-semibold text-white ${tam === "grande" ? "h-12 px-6" : "h-11 whitespace-nowrap px-[18px] text-[15px]"} ${className}`}
    >
      <span className="bl-texto">{children}</span>
      <span aria-hidden="true" className="bl bl-l" />
      <span aria-hidden="true" className="bl bl-r" />
      <span aria-hidden="true" className="bl bl-t" />
      <span aria-hidden="true" className="bl bl-b" />
    </a>
  );
}
