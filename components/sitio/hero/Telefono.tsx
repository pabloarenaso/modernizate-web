import type { ReactNode } from "react";
import { Texto } from "@/components/Texto";
import type { Texto as TextoC } from "@/content/tipos";

type Props = { hora: TextoC; bateria: TextoC; children: ReactNode; className?: string };

/** Celular moderno (alto ≈ 2,1 × ancho): marco delgado, isla superior y barra de estado completa. */
export function Telefono({ hora, bateria, children, className = "" }: Props) {
  return (
    <div className={`celular relative h-[460px] w-[219px] shrink-0 rounded-[42px] p-[7px] sm:h-[480px] sm:w-[229px] ${className}`}>
      {/* botones laterales */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[22%] h-10 w-[3px] rounded-l bg-[#2a2e38]" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[33%] h-10 w-[3px] rounded-l bg-[#2a2e38]" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[28%] h-14 w-[3px] rounded-r bg-[#2a2e38]" />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[35px] bg-[var(--chat-cabecera)] text-[var(--chat-texto)]">
        <div aria-hidden="true" className="absolute left-1/2 top-[9px] z-30 h-[20px] w-[56px] -translate-x-1/2 rounded-full bg-black" />
        <div className="relative z-20 flex h-[38px] shrink-0 items-center justify-between px-[14px] pt-1 text-[11.5px] font-semibold">
          <Texto valor={hora} className="tabular-nums" />
          <span aria-hidden="true" className="flex items-center gap-[4px]">
            <svg viewBox="0 0 18 12" className="h-[9px] w-[14px]" fill="currentColor">
              <rect x="0" y="8" width="3" height="4" rx="0.8" />
              <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
              <rect x="10" y="3" width="3" height="9" rx="0.8" />
              <rect x="15" y="0" width="3" height="12" rx="0.8" />
            </svg>
            <svg viewBox="0 0 16 12" className="h-[9px] w-[12px]" fill="currentColor">
              <path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0zM3.5 6.9a6.4 6.4 0 0 1 9 0l-1.5 1.5a4.3 4.3 0 0 0-6 0zM1.2 4.6a9.6 9.6 0 0 1 13.6 0l-1.5 1.5a7.5 7.5 0 0 0-10.6 0z" />
            </svg>
            <span className="flex items-center">
              <span className="relative flex h-[11px] w-[22px] items-center rounded-[3.5px] border border-current/40 p-[1.5px]">
                <span className="h-full w-[82%] rounded-[2px] bg-current" />
                <span className="absolute inset-0 flex items-center justify-center text-[7.5px] font-bold text-[var(--chat-cabecera)] mix-blend-normal">
                  {bateria.texto}
                </span>
              </span>
              <span className="ml-[1px] h-[4px] w-[1.5px] rounded-r bg-current/40" />
            </span>
          </span>
        </div>
        {children}
        <div aria-hidden="true" className="absolute bottom-[5px] left-1/2 z-30 h-[4px] w-[88px] -translate-x-1/2 rounded-full bg-[var(--chat-texto)] opacity-80" />
      </div>
    </div>
  );
}
