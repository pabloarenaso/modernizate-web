/** Ícono de trazo (24×24) para escenas: un solo path, color heredado. */
export function Ico({ d, className = "size-4" }: { d: string; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

export const TRAZOS = {
  candado: "M7 11V8a5 5 0 0 1 10 0v3M6 11h12v9H6z",
  atras: "M15 5l-7 7 7 7",
  adelante: "M9 5l7 7-7 7",
  recargar: "M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5",
  check: "M5 12.5l4.5 4.5L19 7.5",
  mas: "M12 5v14M5 12h14",
} as const;
