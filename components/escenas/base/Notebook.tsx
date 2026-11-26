import type { ReactNode } from "react";

/** Marco de notebook: pantalla 16:10 con contenedor (@container) y base metálica. */
export function Notebook({ children, ancho }: { children: ReactNode; ancho: number }) {
  return (
    <div className="flex w-full flex-col items-center" style={{ maxWidth: ancho }}>
      <div className="w-full rounded-t-[14px] border-[9px] border-b-[12px] border-[#15171d] bg-[#15171d] shadow-[0_30px_60px_-30px_rgba(11,21,48,0.6)]">
        <div className="@container relative aspect-[16/10] overflow-hidden rounded-[3px]">{children}</div>
      </div>
      <div className="relative h-3 w-[112%] rounded-b-[10px] bg-gradient-to-b from-[#c9ced8] to-[#8e95a3]">
        <span className="absolute left-1/2 top-0 h-1.5 w-16 -translate-x-1/2 rounded-b-md bg-[#7b8291]" />
      </div>
    </div>
  );
}
