"use client";

import { useTema } from "@/hooks/useTema";

type Props = { etiquetaNoche: string; etiquetaDia: string };

/** Botón de modo noche: halo de luz en noche, sombra en día. */
export function BotonTema({ etiquetaNoche, etiquetaDia }: Props) {
  const { tema, cambiar } = useTema();
  const montado = tema !== null;
  const esNoche = tema === "dark";
  const etiqueta = esNoche ? etiquetaDia : etiquetaNoche;

  return (
    <button
      type="button"
      onClick={() => cambiar(esNoche ? "light" : "dark")}
      aria-label={montado ? etiqueta : undefined}
      title={montado ? etiqueta : undefined}
      disabled={!montado}
      className="boton-tema inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-linea bg-superficie text-texto"
    >
      {montado && (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
          {esNoche ? (
            <>
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
            </>
          ) : (
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
          )}
        </svg>
      )}
    </button>
  );
}
