type Props = { etiqueta?: string; className?: string };

/** La tilde sola, inclinada a -38°, como en el logo. Sin etiqueta es decorativa. */
export function Isotipo({ etiqueta, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 62.6 52"
      className={className}
      role={etiqueta ? "img" : undefined}
      aria-label={etiqueta}
      aria-hidden={etiqueta ? undefined : true}
      fill="currentColor"
    >
      <polygon points="40.6,0 62.6,0 22,52 0,52" />
    </svg>
  );
}
