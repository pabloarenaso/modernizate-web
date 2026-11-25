import { Texto } from "@/components/Texto";
import type { Texto as TextoC } from "@/content/tipos";

type Props = { resumen: TextoC; encabezados: [string, string]; filas: [string, string][] };

/** Alternativa accesible a cada gráfico: los mismos datos en una tabla desplegable. */
export function TablaDatos({ resumen, encabezados, filas }: Props) {
  return (
    <details className="group text-sm">
      <summary className="cursor-pointer select-none font-medium text-acento-texto underline-offset-4 hover:underline">
        <Texto valor={resumen} />
      </summary>
      <table className="mt-3 w-full max-w-sm border-collapse text-left">
        <thead>
          <tr className="border-b border-linea text-texto-sec">
            <th scope="col" className="py-1.5 pr-4 font-medium">{encabezados[0]}</th>
            <th scope="col" className="py-1.5 font-medium">{encabezados[1]}</th>
          </tr>
        </thead>
        <tbody>
          {filas.map(([a, b2], i) => (
            <tr key={i} className="border-b border-linea last:border-b-0">
              <td className="py-1.5 pr-4">{a}</td>
              <td className="py-1.5 font-semibold">{b2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}
