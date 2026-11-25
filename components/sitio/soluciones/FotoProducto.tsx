/** "Fotos" ilustradas de los productos de la tienda ficticia (SVG propio, sin marcas). */
export type TipoProducto = "bolsa" | "prensa" | "taza";

export const fondosProducto: Record<TipoProducto, string> = {
  bolsa: "rgba(217,120,10,.13)",
  prensa: "rgba(14,159,154,.13)",
  taza: "rgba(200,100,60,.13)",
};

function Grano({ x, y, r = 0 }: { x: number; y: number; r?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <ellipse rx="5" ry="3.6" fill="#5A3A26" />
      <path d="M-4 0.5 Q0 -1.5 4 0.5" stroke="#2E1C12" strokeWidth="1" fill="none" />
    </g>
  );
}

export function FotoProducto({ tipo, className = "" }: { tipo: TipoProducto; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 100" className={className} preserveAspectRatio="xMidYMid meet">
      <ellipse cx="60" cy="92" rx="34" ry="4" fill="rgba(0,0,0,.12)" />
      {tipo === "bolsa" && (
        <g>
          <path d="M38 24h44l5 62a4 4 0 0 1-4 4.4H37a4 4 0 0 1-4-4.4z" fill="#C9A27C" />
          <path d="M38 24l4-9h36l4 9z" fill="#B08760" />
          <path d="M40 30h40" stroke="#B08760" strokeWidth="1.5" strokeDasharray="2 2.5" />
          <circle cx="60" cy="38" r="3" fill="#8A6A4C" />
          <rect x="44" y="47" width="32" height="28" rx="3" fill="#FFF8EE" />
          <path d="M50 55h20M52 61h16" stroke="#4A3426" strokeWidth="2.6" strokeLinecap="round" />
          <Grano x={60} y={69} r={-10} />
          <Grano x={24} y={88} r={20} />
          <Grano x={95} y={89} r={-25} />
          <Grano x={101} y={83} r={40} />
        </g>
      )}
      {tipo === "prensa" && (
        <g>
          <rect x="58" y="6" width="4" height="18" rx="1" fill="#8A94A6" />
          <circle cx="60" cy="7" r="4.5" fill="#2F333C" />
          <rect x="39" y="22" width="42" height="7" rx="2.5" fill="#2F333C" />
          <rect x="42" y="29" width="36" height="57" rx="3" fill="rgba(205,228,242,.6)" stroke="#9FB3C8" strokeWidth="1.5" />
          <rect x="43.5" y="51" width="33" height="33.5" rx="2" fill="#5A3A26" />
          <rect x="43.5" y="48" width="33" height="4" fill="#B5855C" />
          <path d="M47 33v12" stroke="#fff" strokeOpacity=".7" strokeWidth="2.5" strokeLinecap="round" />
          <rect x="40" y="58" width="40" height="3" fill="#2F333C" />
          <rect x="39" y="84" width="42" height="5" rx="2" fill="#2F333C" />
          <path d="M79 36h7a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4h-7" fill="none" stroke="#2F333C" strokeWidth="5" />
        </g>
      )}
      {tipo === "taza" && (
        <g>
          <ellipse cx="58" cy="88" rx="34" ry="5" fill="#E4D6C1" />
          <path d="M34 44h48v28a16 16 0 0 1-16 16H50a16 16 0 0 1-16-16z" fill="#C8643C" />
          <path d="M34 50h48" stroke="#A84F2C" strokeWidth="2" />
          <path d="M82 52h5a9 9 0 0 1 0 18h-6" fill="none" stroke="#C8643C" strokeWidth="5.5" />
          <ellipse cx="58" cy="44" rx="24" ry="4.5" fill="#E9A07D" />
          <ellipse cx="58" cy="44.5" rx="20" ry="3.2" fill="#3B2418" />
          <path d="M40 56v14" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 34c-4-5 4-8 0-14M60 32c-4-5 4-8 0-14M70 34c-4-5 4-8 0-14" stroke="#9AA3B2" strokeOpacity=".7" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
