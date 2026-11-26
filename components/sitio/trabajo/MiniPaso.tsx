import { Isotipo } from "@/components/Isotipo";
import { Ico, TRAZOS } from "@/components/escenas/base/Ico";
import { Texto } from "@/components/Texto";
import type { Texto as TextoC } from "@/content/tipos";

const tarjeta = "rounded-xl border border-linea bg-superficie shadow-[0_18px_40px_-24px_rgba(11,21,48,0.45)]";

/** Paso 1: videollamada con dos cuadros, barras de voz y una nota que se va completando. */
function Llamada({ e }: { e: [TextoC, TextoC, TextoC] }) {
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

/** Paso 2: hoja de propuesta; las secciones se marcan y aparece "Lista para revisar". */
function Propuesta({ e }: { e: [TextoC, TextoC, TextoC] }) {
  const filas = e[1].texto.split(" · ");
  return (
    <div className={`${tarjeta} relative w-full max-w-[300px] p-3.5`}>
      <div className="mb-2.5 flex items-center gap-2">
        <span className="flex h-7 w-6 items-end justify-center rounded-[3px] bg-[#E5484D] pb-0.5 text-[7px] font-bold text-white">PDF</span>
        <Texto valor={e[0]} className="text-[12.5px] font-semibold" />
      </div>
      <ul className="flex flex-col gap-2" data-estado={e[1].estado}>
        {filas.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-[12px]">
            <span className={`mp-${i + 1} flex size-4 items-center justify-center rounded-full bg-ok-fondo text-ok-texto`}><Ico d={TRAZOS.check} className="size-3" /></span>
            <span className="font-medium">{f}</span>
            <span className="ml-auto h-1.5 w-16 rounded-full bg-suave" />
          </li>
        ))}
      </ul>
      <Texto valor={e[2]} className="mp-4 mt-3 inline-block rounded-full bg-seleccion px-2.5 py-1 text-[11px] font-semibold text-acento-texto" />
    </div>
  );
}

/** Paso 3: barra de construcción, pruebas que pasan y la etiqueta "En vivo". */
function Construccion({ e }: { e: [TextoC, TextoC, TextoC] }) {
  return (
    <div className={`${tarjeta} w-full max-w-[300px] p-3.5`}>
      <div className="flex items-center justify-between text-[12px]">
        <Texto valor={e[0]} className="font-semibold" />
        <span className="mp-4 flex items-center gap-1 rounded-full bg-ok-fondo px-2 py-0.5 text-[10.5px] font-semibold text-ok-texto">
          <span className="block size-1.5 rounded-full bg-current" /><Texto valor={e[2]} />
        </span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-suave">
        <span className="mp-barra block h-full origin-left rounded-full bg-primario" />
      </div>
      <Texto as="p" valor={e[1]} className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-texto-sec" />
      <div className="mt-1.5 flex gap-1.5">
        {[1, 2, 3].map((n) => (
          <span key={n} className={`mp-${n} flex h-7 flex-1 items-center justify-center rounded-md bg-ok-fondo text-ok-texto`}><Ico d={TRAZOS.check} className="size-3.5" /></span>
        ))}
      </div>
    </div>
  );
}

/** Paso 4: una consulta del cliente, la respuesta y "Resuelto". */
function Soporte({ e }: { e: [TextoC, TextoC, TextoC] }) {
  return (
    <div className="flex w-full max-w-[300px] flex-col gap-2 text-[12px]">
      <Texto as="p" valor={e[0]} className="mp-1 self-start rounded-2xl rounded-bl-md border border-linea bg-superficie px-3 py-2" />
      <p className="mp-2 flex items-center gap-1.5 self-end rounded-2xl rounded-br-md bg-primario-relleno px-3 py-2 text-white">
        <Texto valor={e[1]} />
        <Ico d={TRAZOS.check} className="size-3.5" />
      </p>
      <span className="mp-3 flex items-center gap-1.5 self-center rounded-full bg-ok-fondo px-3 py-1 text-[11px] font-semibold text-ok-texto">
        <Ico d={TRAZOS.check} className="size-3" />
        <Texto valor={e[2]} />
      </span>
    </div>
  );
}

/** Mini-ilustración animada de cada paso (estándar de escenas, tamaño pequeño). */
export function MiniPaso({ i, e }: { i: number; e: [TextoC, TextoC, TextoC] }) {
  const Escena = [Llamada, Propuesta, Construccion, Soporte][i];
  return (
    <div className="escena-anim flex w-full justify-center">
      <Escena e={e} />
    </div>
  );
}
