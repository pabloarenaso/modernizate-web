/**
 * Cursor animado. Recorre los puntos de --ruta con una animación CSS propia de cada escena:
 * se posiciona con style={{ left, top }} o con una clase que anime transform. Con "clic" muestra una onda.
 */
export function Cursor({ className = "", style, clic }: { className?: string; style?: React.CSSProperties; clic?: boolean }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none absolute z-30 block size-5 ${className}`} style={style}>
      {clic && <span className="cursor-clic absolute -left-1.5 -top-1.5 size-5 rounded-full bg-primario/30" />}
      <svg viewBox="0 0 20 20" className="relative size-5 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]">
        <path d="M3 2l13 7.2-5.6 1.3L7.6 16z" fill="#fff" stroke="#0B1530" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
