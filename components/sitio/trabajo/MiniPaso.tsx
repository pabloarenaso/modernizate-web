import { Isotipo } from "@/components/Isotipo";
import { Ico, TRAZOS } from "@/components/escenas/base/Ico";
import { Texto } from "@/components/Texto";
import type { Texto as TextoC } from "@/content/tipos";

const tarjeta = "rounded-xl border border-linea bg-superficie shadow-[0_18px_40px_-24px_rgba(11,21,48,0.45)]";

/** Paso 1: videollamada con dos cuadros, barras de voz y una nota que se va completando. */
function Llamada({ e }: { e: TextoC[] }) {
  return (
    <div className="flex w-full max-w-[340px] flex-col gap-2.5">
      <div className={`${tarjeta} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-linea px-3 py-1.5 text-[11px] text-texto-sec">
          <span className="flex items-center gap-1.5"><span className="mp-rec block size-2 rounded-full bg-[#E5484D]" /><Texto valor={e[0]} /></span>
          <span className="tabular-nums">12:40</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 bg-[#0B1530] p-1.5">
          <div className="relative flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br from-[#2A3B66] to-[#16213F]">
            <span className="flex size-11 items-center justify-center rounded-full bg-[#F2B8A0] text-sm font-bold text-[#5B2A17]">MR</span>
            <span className="absolute bottom-1.5 left-1.5 flex items-end gap-[2px]" aria-hidden="true">
              {[0, 0.2, 0.1, 0.3].map((d, i) => <span key={i} className="mp-voz block w-[3px] rounded-full bg-[#6EE7A8]" style={{ animationDelay: `${d}s` }} />)}
            </span>
            <Texto valor={e[1]} className="absolute bottom-1 right-2 text-[10px] text-white/80" />
          </div>
          <div className="relative flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br from-[#1F4FE0] to-[#12308F]">
            <span className="flex size-11 items-center justify-center rounded-full bg-white"><Isotipo className="size-6 text-[#1F4FE0]" /></span>
          </div>
        </div>
      </div>
      <div className={`${tarjeta} mp-1 flex items-center gap-2 px-3 py-2 text-[12px]`}>
        <Ico d="M4 20h4L19 9l-4-4L4 16zM13 7l4 4" className="size-3.5 text-acento-texto" />
        <Texto valor={e[2]} className="font-medium" />
      </div>
    </div>
  );
}

/** Paso 2: hoja de propuesta; se marcan una a una Alcance, Plazo, Responsable y Modalidad de pago. */
function Propuesta({ e }: { e: TextoC[] }) {
  return (
    <div className={`${tarjeta} relative w-full max-w-[300px] p-3.5`}>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="flex h-7 w-6 items-end justify-center rounded-[3px] bg-[#E5484D] pb-0.5 text-[7px] font-bold text-white">PDF</span>
        <Texto valor={e[0]} className="text-[12.5px] font-semibold" />
      </div>
      <ul className="flex flex-col gap-2">
        {e.slice(1, 5).map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-[12px]">
            <span className="relative flex size-4 items-center justify-center rounded-full border border-linea">
              <span className={`mp-${i + 1} absolute inset-[-1px] flex items-center justify-center rounded-full bg-[#12A150] text-white`}><Ico d={TRAZOS.check} className="size-3" /></span>
            </span>
            <Texto valor={f} className="font-medium" />
            <span className="ml-auto h-1.5 w-12 rounded-full bg-suave" />
          </li>
        ))}
      </ul>
      <Texto valor={e[5]} className="mp-5 mt-3 inline-block rounded-full bg-seleccion px-2.5 py-1 text-[11px] font-semibold text-acento-texto" />
    </div>
  );
}

/** Paso 3: fases reales con progreso: configuración → pruebas → capacitación → "Listo para usar". */
function Construccion({ e }: { e: TextoC[] }) {
  return (
    <div className={`${tarjeta} flex w-full max-w-[300px] flex-col gap-2.5 p-3.5`}>
      {e.slice(0, 3).map((f, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span className="flex items-center justify-between text-[12px]">
            <Texto valor={f} className="font-medium" />
            <span className={`mp-${i + 2} flex size-4 items-center justify-center rounded-full bg-[#12A150] text-white`}><Ico d={TRAZOS.check} className="size-3" /></span>
          </span>
          <span className="h-1.5 overflow-hidden rounded-full bg-suave">
            <span className={`fase-${i + 1} block h-full origin-left rounded-full bg-primario`} />
          </span>
        </div>
      ))}
      <span className="mp-5 flex items-center gap-1.5 self-start rounded-full bg-ok-fondo px-2.5 py-1 text-[11px] font-semibold text-ok-texto">
        <span className="block size-1.5 rounded-full bg-current" /><Texto valor={e[3]} />
      </span>
    </div>
  );
}

/** Una línea de tiempo corta: cada estado se enciende en orden (clases pa-*, pb-*). */
function Linea({ titulo, pasos, prefijo }: { titulo: TextoC; pasos: TextoC[]; prefijo: "pa" | "pb" }) {
  return (
    <div className={`${tarjeta} flex w-full max-w-[300px] flex-col gap-2 p-3.5`}>
      <Texto valor={titulo} className="text-[11px] font-semibold uppercase tracking-wide text-texto-sec" />
      <ol className="flex flex-col gap-1.5">
        {pasos.map((p, i) => {
          // Soporte termina "Resuelto" (check verde); la solicitud de cambio queda "En implementación" (en curso).
          const ultimo = i === pasos.length - 1;
          const resuelto = ultimo && prefijo === "pa";
          return (
            <li key={i} className={`${prefijo}-${i + 1} flex items-center gap-2 text-[12px]`}>
              <span className={`flex size-4 shrink-0 items-center justify-center rounded-full text-white ${resuelto ? "bg-[#12A150]" : "bg-primario"}`}>
                {resuelto ? <Ico d={TRAZOS.check} className="size-3" /> : ultimo ? <span className="en-curso block size-2.5 rounded-full border-2 border-white border-t-transparent" /> : <span className="block size-1.5 rounded-full bg-white" />}
              </span>
              <Texto valor={p} className={resuelto ? "font-semibold text-ok-texto" : ultimo ? "font-semibold text-acento-texto" : "font-medium"} />
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** Paso 4: alterna dos flujos cortos: soporte y solicitud de cambio (los cambios se gestionan con orden). */
function Soporte({ e }: { e: TextoC[] }) {
  return (
    <div className="flujos-alternos grid w-full max-w-[300px]">
      <div className="flujo-a col-start-1 row-start-1"><Linea titulo={e[0]} pasos={e.slice(1, 4)} prefijo="pa" /></div>
      <div className="flujo-b col-start-1 row-start-1"><Linea titulo={e[4]} pasos={e.slice(5, 9)} prefijo="pb" /></div>
    </div>
  );
}

/** Mini-ilustración animada de cada paso (estándar de escenas, tamaño pequeño). */
export function MiniPaso({ i, e }: { i: number; e: TextoC[] }) {
  const Escena = [Llamada, Propuesta, Construccion, Soporte][i];
  return (
    <div className="escena-anim flex w-full justify-center">
      <Escena e={e} />
    </div>
  );
}
