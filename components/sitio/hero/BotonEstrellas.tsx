import type { ReactNode } from "react";

const ESTRELLA = "M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z";

/** Botón con estrellas que salen al pasar el mouse (Uiverse, MuhammadHasann/silent-lizard-44, licencia MIT, adaptado a la marca). */
export function BotonEstrellas({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="boton-estrellas">
      {children}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <span key={i} aria-hidden="true" className={`estrella-${i}`}>
          <svg viewBox="0 0 784.11 815.53">
            <path d={ESTRELLA} />
          </svg>
        </span>
      ))}
    </button>
  );
}
