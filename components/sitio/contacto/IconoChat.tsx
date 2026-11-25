/** Burbuja de chat genérica (sin logos de terceros). */
export function IconoChat({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 11.5a8 8 0 0 1-11.9 7l-4.1 1 1.1-3.8A8 8 0 1 1 20 11.5z" />
      <path d="M9 9.5c.3 2.2 2.3 4.2 4.5 4.6" />
    </svg>
  );
}
