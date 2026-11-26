"use client";

import { Isotipo } from "@/components/Isotipo";
import { Cursor } from "@/components/escenas/base/Cursor";
import { Ico, TRAZOS } from "@/components/escenas/base/Ico";
import { useLinea } from "@/components/escenas/base/useLinea";
import { Texto } from "@/components/Texto";
import type { Texto as TextoC } from "@/content/tipos";

const tarjeta = "rounded-xl border border-linea bg-superficie shadow-[0_18px_40px_-24px_rgba(11,21,48,0.45)]";
/** Clases de aparición: visible o no según el tiempo de la escena. */
const ver = (si: boolean, desde = "translate-y-1.5") => `transition-all duration-500 ${si ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${desde}`}`;
/** Texto que se escribe letra por letra entre a y b (ms). */
const escrito = (s: string, t: number, a: number, b: number) => (t >= b ? s : t <= a ? "" : s.slice(0, Math.ceil(((t - a) / (b - a)) * s.length)));
const Check = ({ si, mal }: { si: boolean; mal?: boolean }) => (
  <span className={`flex size-4 shrink-0 items-center justify-center rounded-full text-white transition-all duration-300 ${mal ? "bg-[#E5484D]" : si ? "scale-100 bg-[#12A150]" : "scale-90 bg-linea"}`}>
    {mal ? <Ico d="M7 7l10 10M17 7 7 17" className="size-2.5" /> : <Ico d={TRAZOS.check} className="size-3" />}
  </span>
);

/** Paso 1 (12 s): videollamada; el cliente cuenta su día y las tareas repetidas se anotan una a una. */
function Llamada({ e }: { e: TextoC[] }) {
  const { ref, t } = useLinea(12000, 11000);
  const habla = t > 1000 && t < 8500 ? (Math.floor(t / 2500) % 2 === 0 ? 0 : 1) : -1;
  const frases = [{ i: 3, a: 1200, b: 3800 }, { i: 4, a: 4200, b: 7000 }];
  const tareas = [{ i: 5, a: 2600 }, { i: 6, a: 5200 }, { i: 7, a: 7600 }];
  const cuenta = tareas.filter((x) => t >= x.a).length;
  return (
    <div ref={ref} className="flex w-full max-w-[360px] flex-col gap-2">
      <div className={`${tarjeta} overflow-hidden`}>
        <div className="flex items-center justify-between border-b border-linea px-3 py-1.5 text-[11px] text-texto-sec">
          <span className="flex items-center gap-1.5"><span className="mp-rec block size-2 rounded-full bg-[#E5484D]" /><Texto valor={e[0]} /></span>
          <span className="tabular-nums">00:{String(Math.floor(t / 1000) + 3).padStart(2, "0")}</span>
        </div>
        <div className="relative grid grid-cols-2 gap-1.5 bg-[#0B1530] p-1.5">
          {[0, 1].map((k) => (
            <div key={k} className={`relative flex aspect-[16/10] items-center justify-center rounded-lg transition-shadow ${k === 0 ? "bg-gradient-to-br from-[#2A3B66] to-[#16213F]" : "bg-gradient-to-br from-[#1F4FE0] to-[#12308F]"} ${habla === k ? "ring-2 ring-[#6EE7A8]" : ""}`}>
              {k === 0 ? <span className="flex size-10 items-center justify-center rounded-full bg-[#F2B8A0] text-[13px] font-bold text-[#5B2A17]">MR</span> : <span className="flex size-10 items-center justify-center rounded-full bg-white"><Isotipo className="h-5 text-[#1F4FE0]" /></span>}
              {habla === k && (
                <span className="absolute bottom-1.5 left-1.5 flex items-end gap-[2px]" aria-hidden="true">
                  {[0, 0.2, 0.1, 0.3].map((d, i) => <span key={i} className="mp-voz block w-[3px] rounded-full bg-[#6EE7A8]" style={{ animationDelay: `${d}s` }} />)}
                </span>
              )}
              {k === 0 && <Texto valor={e[1]} className="absolute bottom-1 right-2 text-[10px] text-white/80" />}
            </div>
          ))}
          {frases.map((f) => t >= f.a && t < f.b + 900 && (
            <span key={f.i} className="aparecer absolute inset-x-3 bottom-2.5 rounded-md bg-black/70 px-2 py-1 text-center text-[11px] text-white">
              {escrito(e[f.i].texto, t, f.a, f.b)}
            </span>
          ))}
        </div>
      </div>
      <div className={`${tarjeta} flex flex-col gap-1.5 px-3 py-2.5`}>
        <span className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-texto-sec">
          <Texto valor={e[2]} />
          <span className="flex size-5 items-center justify-center rounded-full bg-seleccion text-[11px] text-acento-texto tabular-nums">{cuenta}</span>
        </span>
        {tareas.map((x) => (
          <span key={x.i} className={`${ver(t >= x.a, "-translate-x-2")} flex items-center gap-2 text-[12.5px] font-medium`}>
            <Ico d="M4 20h4L19 9l-4-4L4 16z" className="size-3.5 text-acento-texto" />
            <Texto valor={e[x.i]} />
          </span>
        ))}
        <Texto valor={e[8]} className={`${ver(t >= 9200)} mt-1 self-start rounded-full bg-ok-fondo px-2.5 py-0.5 text-[11px] font-semibold text-ok-texto`} />
      </div>
    </div>
  );
}

/** Paso 2 (13 s): la propuesta se escribe y marca ítem por ítem; luego se dobla, entra a un sobre y sale volando. */
function Propuesta({ e }: { e: TextoC[] }) {
  const { ref, t, reducido } = useLinea(13000, 8800);
  const items = [0, 1, 2, 3].map((k) => ({ et: e[1 + k * 2], val: e[2 + k * 2], a: 700 + k * 1900 }));
  const doblar = t >= 8800 && !reducido;
  const sobre = t >= 9400 && !reducido;
  const cerrado = t >= 10000 && !reducido;
  const vuela = t >= 10500 && !reducido;
  return (
    <div ref={ref} className="relative flex h-[232px] w-full max-w-[320px] items-center justify-center [perspective:700px]">
      <div className={`${tarjeta} absolute top-1 w-[270px] origin-bottom p-3.5 transition-all duration-700 ${doblar ? "translate-y-16 scale-[0.55] opacity-0 [transform:rotateX(70deg)]" : ""}`}>
        <div className="mb-2 flex items-center gap-2 border-b border-linea pb-2">
          <span className="flex h-6 w-5 items-end justify-center rounded-[3px] bg-[#E5484D] pb-0.5 text-[6.5px] font-bold text-white">PDF</span>
          <Texto valor={e[0]} className="font-display text-[14px] font-bold" />
        </div>
        <ul className="flex flex-col gap-1.5">
          {items.map((x, k) => (
            <li key={k} className="flex items-start gap-2">
              <Check si={t >= x.a + 1300} />
              <span className="min-w-0 leading-tight">
                <span className="block text-[12px] font-semibold">{escrito(x.et.texto, t, x.a, x.a + 500)}</span>
                <span className="block text-[11px] text-texto-sec">{escrito(x.val.texto, t, x.a + 500, x.a + 1200)}&nbsp;</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Sobre */}
      <div className={`absolute bottom-6 h-[86px] w-[150px] transition-all duration-700 ease-in ${sobre ? "opacity-100" : "opacity-0"} ${vuela ? "-translate-y-40 translate-x-40 -rotate-12 scale-50 opacity-0" : ""}`}>
        <div className="absolute inset-0 rounded-md border border-[#C9D3E8] bg-[#EEF3FF] shadow-lg" />
        <div className="absolute inset-x-0 bottom-0 h-full [clip-path:polygon(0_100%,50%_45%,100%_100%)] bg-[#DCE6FF]" />
        <div className={`absolute inset-x-0 top-0 h-[58%] origin-top bg-[#C9D6F5] transition-transform duration-500 [clip-path:polygon(0_0,100%_0,50%_100%)] ${cerrado ? "[transform:rotateX(0deg)]" : "[transform:rotateX(180deg)]"}`} />
      </div>
      <span className={`${ver(t >= 10900 || reducido)} absolute bottom-1 flex items-center gap-1.5 rounded-full bg-ok-fondo px-3 py-1 text-[12px] font-semibold text-ok-texto`}>
        <Texto valor={e[9]} />
        <Ico d={TRAZOS.check} className="size-3.5" />
      </span>
    </div>
  );
}

/** Paso 3 (14 s): configuración con un agente → validación y pruebas (una falla y se corrige) → capacitación breve. */
function Implementacion({ e }: { e: TextoC[] }) {
  const { ref, t } = useLinea(14000, 13900);
  const acto = t < 4600 ? 0 : t < 9200 ? 1 : 2;
  const titulos = [e[0], e[5], e[10]];
  const ta = t - acto * 4600;
  return (
    <div ref={ref} className={`${tarjeta} flex h-[232px] w-full max-w-[340px] flex-col overflow-hidden`}>
      <div className="flex items-center gap-1.5 border-b border-linea px-3 py-2">
        {titulos.map((x, k) => (
          <span key={k} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${k < acto ? "bg-[#12A150]" : k === acto ? "bg-primario" : "bg-linea"}`} />
        ))}
      </div>
      <Texto key={acto} valor={titulos[acto]} className="titulo-flujo px-3.5 pt-2.5 font-display text-[14px] font-bold" />
      <div key={`a${acto}`} className="aparecer relative flex flex-1 flex-col gap-2 px-3.5 py-2.5">
        {acto === 0 && (
          <>
            <span className="flex items-center gap-2 text-[11.5px] text-texto-sec">
              <span className="flex size-6 items-center justify-center rounded-md bg-[#F1E9FF] text-[#7C3AED]"><Ico d="M5 8h14v10H5zM12 4v4M9 13h.01M15 13h.01" className="size-4" /></span>
              <Texto valor={e[1]} className="font-semibold text-texto" />
            </span>
            {[2, 3, 4].map((k, i) => {
              const a = 500 + i * 1300;
              const p = Math.max(0, Math.min(1, (ta - a) / 1100));
              return (
                <span key={k} className="flex flex-col gap-1">
                  <span className="flex items-center justify-between text-[12px] font-medium"><Texto valor={e[k]} /><span className="tabular-nums text-texto-sec">{Math.round(p * 100)}%</span></span>
                  <span className="h-1.5 overflow-hidden rounded-full bg-suave"><span className="block h-full rounded-full bg-primario transition-[width] duration-100" style={{ width: `${p * 100}%` }} /></span>
                </span>
              );
            })}
          </>
        )}
        {acto === 1 && (
          <ul className="flex flex-col gap-2">
            {[6, 7, 8].map((k, i) => {
              const a = 500 + i * 1100;
              const falla = k === 7 && ta >= a && ta < a + 1500;
              const ok = ta >= a + (k === 7 ? 1500 : 400);
              return (
                <li key={k} className={`${ver(ta >= a)} flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-[12px] font-medium ${falla ? "border-[#E5484D]/50 bg-[rgba(229,72,77,0.06)]" : "border-linea"}`}>
                  <Check si={ok} mal={falla} />
                  <Texto valor={e[k]} className="flex-1" />
                  {k === 7 && ta >= a + 700 && <Texto valor={e[9]} className={`text-[10.5px] font-semibold ${ok ? "text-ok-texto" : "text-[#B42318]"}`} />}
                </li>
              );
            })}
          </ul>
        )}
        {acto === 2 && (
          <div className="relative flex flex-1 flex-col gap-1.5 rounded-lg border border-linea bg-suave p-2">
            <Texto valor={e[14]} className="text-[11px] font-semibold uppercase tracking-wide text-texto-sec" />
            {["10:00", "11:30", "13:00"].map((h, i) => (
              <span key={h} className={`flex items-center gap-2 rounded-md bg-superficie px-2 py-1 text-[11.5px] ${i === 0 && ta > 700 ? "ring-2 ring-primario" : ""}`}><b className="tabular-nums">{h}</b><span className="h-1.5 flex-1 rounded-full bg-suave" /></span>
            ))}
            <Cursor className={`transition-all duration-700 ${ta < 700 ? "right-4 top-16" : ta < 2400 ? "left-24 top-7" : "left-28 top-[92px]"}`} clic={ta > 700} />
            <Texto valor={ta < 2400 ? e[11] : e[12]} className={`${ver(ta > 900)} absolute right-2 top-1 max-w-[150px] rounded-lg bg-[#0B1530] px-2 py-1 text-[11px] font-medium text-white shadow-lg`} />
            <span className={`${ver(ta > 3500)} absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-ok-fondo px-2.5 py-0.5 text-[11px] font-semibold text-ok-texto`}>
              <Ico d={TRAZOS.check} className="size-3" /><Texto valor={e[13]} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/** Paso 4 (14 s): un ticket de soporte que avanza por estados y, alternado, una solicitud de cambio que se gestiona con orden. */
function Acompanamiento({ e }: { e: TextoC[] }) {
  const { ref, t } = useLinea(14000, 13900);
  const soporte = t < 7000;
  const ts = soporte ? t : t - 7000;
  const estados = [e[3], e[4], e[5]];
  const estado = ts < 2000 ? 0 : ts < 4300 ? 1 : 2;
  const pasos = [{ x: e[10], a: 2000 }, { x: e[12], a: 3400 }, { x: e[13], a: 4600 }];
  return (
    <div ref={ref} className="relative h-[232px] w-full max-w-[330px]">
      {soporte ? (
        <div key="s" className={`${tarjeta} aparecer flex flex-col gap-2.5 p-3.5`}>
          <span className="flex items-center justify-between">
            <Texto valor={e[0]} className="text-[11px] font-semibold uppercase tracking-wide text-texto-sec" />
            <Texto valor={e[1]} className="text-[11px] font-semibold tabular-nums text-texto-sec" />
          </span>
          <Texto valor={e[2]} className="text-[13.5px] font-semibold" />
          <div className="flex items-center gap-1">
            {estados.map((x, k) => (
              <span key={k} className="flex flex-1 flex-col items-center gap-1">
                <span className={`h-1.5 w-full rounded-full transition-colors duration-500 ${k < estado ? "bg-[#12A150]" : k === estado ? (k === 2 ? "bg-[#12A150]" : "bg-primario") : "bg-linea"}`} />
                <Texto valor={x} className={`text-center text-[10.5px] font-semibold ${k === estado ? (k === 2 ? "text-ok-texto" : "text-acento-texto") : "text-texto-sec"}`} />
              </span>
            ))}
          </div>
          <p className={`${ver(ts >= 4600)} flex items-start gap-2 rounded-xl rounded-bl-sm bg-suave px-3 py-2 text-[12px] leading-snug`}>
            <Isotipo className="mt-0.5 h-3 shrink-0 text-primario" />
            <Texto valor={e[6]} />
          </p>
        </div>
      ) : (
        <div key="c" className={`${tarjeta} aparecer flex flex-col gap-2 p-3.5`}>
          <Texto valor={e[7]} className="text-[11px] font-semibold uppercase tracking-wide text-texto-sec" />
          <span className="flex items-center gap-2">
            <span className="flex h-8 min-w-0 flex-1 items-center rounded-md border border-linea bg-suave px-2 text-[12px]">{escrito(e[8].texto, ts, 200, 1300)}</span>
            <Texto valor={e[9]} className={`rounded-md px-2 py-1.5 text-[11px] font-semibold text-white transition-colors ${ts > 1500 ? "bg-[#12A150]" : "bg-primario-relleno"}`} />
          </span>
          <ul className="flex flex-col gap-1.5">
            {pasos.map((p, k) => (
              <li key={k} className={`${ver(ts >= p.a, "-translate-x-2")} flex items-center gap-2 text-[12px] font-medium`}>
                <span className={`flex size-5 shrink-0 items-center justify-center rounded-md ${k === 0 ? "bg-seleccion text-acento-texto" : "bg-ok-fondo text-ok-texto"}`}>
                  <Ico d={["M7 3v3M17 3v3M4 8h16M5 5h14v15H5z", "M4 4h16v16H4zM8 9h8M8 13h5", "M13 2 4 14h7l-1 8 9-12h-7z"][k]} className="size-3.5" />
                </span>
                <Texto valor={p.x} className="flex-1" />
                {k === 0 && <Texto valor={e[11]} className="rounded bg-suave px-1.5 text-[10.5px] font-semibold tabular-nums" />}
                {k === 2 && <span className="h-1.5 w-16 overflow-hidden rounded-full bg-linea"><span className="block h-full rounded-full bg-primario" style={{ width: `${Math.max(0, Math.min(100, ((ts - 4600) / 2200) * 70))}%` }} /></span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/** Mini-escena animada de cada paso (10–14 s en bucle; con movimiento reducido, estado final estático). */
export function MiniPaso({ i, e }: { i: number; e: TextoC[] }) {
  const Escena = [Llamada, Propuesta, Implementacion, Acompanamiento][i];
  return (
    <div className="escena-anim flex w-full justify-center">
      <Escena e={e} />
    </div>
  );
}
