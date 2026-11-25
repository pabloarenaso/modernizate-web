type Variante = "principal" | "invertido" | "agua";

type Props = { nombre: string; variante?: Variante; className?: string };

/**
 * Wordmark: el nombre en mayúsculas, con la letra acentuada como I y la tilde inclinada.
 * Las letras salen del nombre (content/), no se escriben aquí.
 */
export function Logo({ nombre, variante = "principal", className = "" }: Props) {
  const letras = [...nombre];
  const iAcento = letras.findIndex((l) => l.normalize("NFD").length > 1);
  const sinAcento = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toUpperCase();
  const antes = sinAcento(letras.slice(0, Math.max(iAcento, 0)).join(""));
  const letra = iAcento >= 0 ? sinAcento(letras[iAcento]) : "";
  const despues = sinAcento(letras.slice(iAcento + 1).join(""));

  return (
    <span role="img" aria-label={nombre} className={`wordmark logo-${variante} inline-block whitespace-nowrap ${className}`}>
      <span aria-hidden="true">
        {iAcento >= 0 ? (
          <>
            {antes}
            <span className="logo-i">
              {letra}
              <i />
            </span>
            {despues}
          </>
        ) : (
          sinAcento(nombre)
        )}
      </span>
    </span>
  );
}
