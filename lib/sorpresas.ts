/**
 * Efectos de los easter eggs (BotonSorpresa). Cada botón tiene uno fijo (ver docs/estandar-escenas.md §9).
 * Son efectos transitorios sobre el DOM (Web Animations API): no bloquean la navegación (capas sin puntero),
 * se pueden repetir y no producen destellos (WCAG 2.3.1). Con movimiento reducido no se llaman.
 */
export type Efecto = "confeti" | "electricidad" | "voltear" | "burbujas" | "gravedad" | "origami" | "temblor" | "tildes" | "vuelta" | "fuegos" | "iman" | "estrella";

const COLORES = ["#1F4FE0", "#D9780A", "#0E9F9A", "#9B5DE5", "#8FB0FF", "#E5484D", "#F5C542", "#12A150"];
const azar = (a: number, b: number) => a + Math.random() * (b - a);
const elegir = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];

/** Capa fija sobre la ventana, sin puntero; se elimina sola. */
function capa(ms: number) {
  const el = document.createElement("div");
  el.setAttribute("aria-hidden", "true");
  el.style.cssText = "position:fixed;inset:0;z-index:100;pointer-events:none;overflow:hidden";
  // Un diálogo modal abierto está en la capa superior: la capa va dentro de él para verse encima.
  (document.querySelector("dialog[open]") ?? document.body).appendChild(el);
  setTimeout(() => el.remove(), ms);
  return el;
}

/** Ámbito del botón: el contenedor marcado o la sección, diálogo o pie que lo contiene. */
const ambitoDe = (b: HTMLElement) => (b.closest("[data-sorpresa-ambito]") ?? b.closest("section, dialog, footer") ?? document.body) as HTMLElement;

function confeti() {
  const c = capa(5200);
  for (let i = 0; i < 180; i++) {
    const s = document.createElement("span");
    const redonda = Math.random() < 0.3;
    const ancho = azar(8, 18);
    s.className = "confeti-pieza";
    s.style.cssText = `left:${azar(0, 100)}vw;width:${ancho}px;height:${redonda ? ancho : ancho * azar(0.4, 1.2)}px;background:${elegir(COLORES)};border-radius:${redonda ? "50%" : "2px"};animation-duration:${azar(2.2, 4)}s;animation-delay:${azar(0, 0.7)}s;--deriva:${azar(-15, 15)}vw;--giro:${azar(-720, 720)}deg`;
    c.appendChild(s);
  }
}

/** Rayos: chispas que recorren el borde de cada elemento marcado y algunos trazos en zigzag. Trazos, no destellos. */
function electricidad(b: HTMLElement) {
  const ambito = ambitoDe(b);
  const objetivos = [...ambito.querySelectorAll<HTMLElement>("[data-chispa]")];
  const NS = "http://www.w3.org/2000/svg";
  objetivos.forEach((el, i) => {
    if (getComputedStyle(el).position === "static") el.style.position = "relative";
    const r = el.getBoundingClientRect();
    const radio = parseFloat(getComputedStyle(el).borderRadius) || 8;
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.style.cssText = "position:absolute;left:-3px;top:-3px;overflow:visible;pointer-events:none;z-index:5;filter:drop-shadow(0 0 4px rgba(90,140,255,.9))";
    svg.setAttribute("width", String(r.width + 6));
    svg.setAttribute("height", String(r.height + 6));
    for (const [color, ancho, desfase] of [["#8FB0FF", 3, 0], ["#1F4FE0", 2, 50]] as const) {
      const rect = document.createElementNS(NS, "rect");
      rect.setAttribute("x", "1.5"); rect.setAttribute("y", "1.5");
      rect.setAttribute("width", String(r.width + 3)); rect.setAttribute("height", String(r.height + 3));
      rect.setAttribute("rx", String(Math.min(radio + 3, (r.height + 3) / 2)));
      rect.setAttribute("fill", "none"); rect.setAttribute("stroke", color); rect.setAttribute("stroke-width", String(ancho));
      rect.setAttribute("stroke-linecap", "round"); rect.setAttribute("pathLength", "100"); rect.setAttribute("stroke-dasharray", "14 86");
      svg.appendChild(rect);
      rect.animate([{ strokeDashoffset: -desfase }, { strokeDashoffset: -desfase - 300 }], { duration: 2400, delay: i * 90, easing: "linear" });
    }
    el.appendChild(svg);
    svg.animate([{ opacity: 0 }, { opacity: 1, offset: 0.1 }, { opacity: 1, offset: 0.85 }, { opacity: 0 }], { duration: 2400 + i * 90, fill: "forwards" }).finished.then(() => svg.remove());
  });
  // Rayos en zigzag dentro del ámbito, que se dibujan y se desvanecen.
  const ar = ambito.getBoundingClientRect();
  const c = capa(3000);
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("width", "100%"); svg.setAttribute("height", "100%");
  svg.style.cssText = "position:absolute;inset:0;filter:drop-shadow(0 0 5px rgba(90,140,255,.9))";
  for (let k = 0; k < 5; k++) {
    let x = azar(ar.left + 40, ar.right - 40), y = Math.max(ar.top, 0) + 10;
    const fin = Math.min(ar.bottom, innerHeight) - 10;
    let d = `M${x} ${y}`;
    while (y < fin) { y += azar(26, 60); x += azar(-38, 38); d += ` L${x} ${Math.min(y, fin)}`; }
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d); p.setAttribute("fill", "none"); p.setAttribute("stroke", k % 2 ? "#8FB0FF" : "#C9D8FF");
    p.setAttribute("stroke-width", "2.5"); p.setAttribute("stroke-linejoin", "round"); p.setAttribute("pathLength", "100");
    p.setAttribute("stroke-dasharray", "100"); p.style.opacity = "0";
    svg.appendChild(p);
    p.animate([{ strokeDashoffset: 100, opacity: 1 }, { strokeDashoffset: 0, opacity: 1, offset: 0.4 }, { strokeDashoffset: 0, opacity: 0 }], { duration: 1100, delay: 250 + k * 380, easing: "ease-out" });
  }
  c.appendChild(svg);
}

/** Los elementos marcados se voltean en 3D, uno tras otro. */
function voltear(b: HTMLElement) {
  [...ambitoDe(b).querySelectorAll<HTMLElement>("[data-voltear]")].filter((e) => e.offsetParent).forEach((el, i) =>
    el.animate([{ transform: "perspective(700px) rotateY(0)" }, { transform: "perspective(700px) rotateY(360deg)" }], { duration: 1000, delay: i * 260, easing: "cubic-bezier(.45,0,.2,1)" }),
  );
}

/** Lluvia de burbujas de chat por la pantalla. */
function burbujas() {
  const c = capa(6500);
  for (let i = 0; i < 46; i++) {
    const s = document.createElement("span");
    const propia = Math.random() < 0.5;
    const ancho = azar(48, 110);
    s.style.cssText = `position:absolute;top:-60px;left:${azar(0, 96)}vw;width:${ancho}px;height:${azar(30, 42)}px;border-radius:16px;${propia ? "border-bottom-right-radius:4px" : "border-bottom-left-radius:4px"};background:${propia ? "#DCF8C6" : "#FFFFFF"};box-shadow:0 6px 16px -6px rgba(11,21,48,.35);display:flex;align-items:center;justify-content:center;gap:5px`;
    for (let k = 0; k < 3; k++) { const p = document.createElement("i"); p.style.cssText = "width:6px;height:6px;border-radius:50%;background:#8A94A6"; s.appendChild(p); }
    c.appendChild(s);
    const deriva = azar(-60, 60);
    s.animate([{ transform: "translate(0,0) rotate(0)" }, { transform: `translate(${deriva}px, 55vh) rotate(${azar(-12, 12)}deg)`, offset: 0.5 }, { transform: `translate(${-deriva / 2}px, calc(100vh + 80px)) rotate(${azar(-20, 20)}deg)` }], { duration: azar(2600, 4400), delay: azar(0, 1800), easing: "ease-in", fill: "both" });
  }
}

/** Los nodos caen con gravedad, rebotan y vuelven a su lugar. */
function gravedad(b: HTMLElement) {
  const ambito = ambitoDe(b);
  // En React Flow el nodo se posiciona con transform: se anima su contenido.
  const nodos = [...ambito.querySelectorAll<HTMLElement>("[data-nodo], .react-flow__node > *")].filter((e) => e.offsetParent);
  const zona = (nodos[0]?.closest("[data-escena]") as HTMLElement | null) ?? ambito;
  const piso = zona.getBoundingClientRect().bottom;
  nodos.forEach((el, i) => {
    const r = el.getBoundingClientRect();
    const dy = Math.max(0, piso - r.bottom - 6) / (el.getBoundingClientRect().height / (el.offsetHeight || 1));
    const dx = azar(-30, 30);
    const g = azar(-25, 25);
    el.animate(
      [
        { transform: "none", easing: "cubic-bezier(.5,0,1,.6)" },
        { transform: `translate(${dx}px, ${dy}px) rotate(${g}deg)`, offset: 0.3, easing: "cubic-bezier(0,.4,.5,1)" },
        { transform: `translate(${dx}px, ${dy - 34}px) rotate(${g * 0.6}deg)`, offset: 0.4, easing: "cubic-bezier(.5,0,1,.6)" },
        { transform: `translate(${dx}px, ${dy}px) rotate(${g * 0.8}deg)`, offset: 0.5, easing: "cubic-bezier(0,.4,.5,1)" },
        { transform: `translate(${dx}px, ${dy - 10}px) rotate(${g * 0.8}deg)`, offset: 0.56, easing: "cubic-bezier(.5,0,1,.6)" },
        { transform: `translate(${dx}px, ${dy}px) rotate(${g * 0.8}deg)`, offset: 0.62 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${g * 0.8}deg)`, offset: 0.72, easing: "cubic-bezier(.3,1.4,.5,1)" },
        { transform: "none" },
      ],
      { duration: 3200, delay: i * 70 },
    );
  });
}

/** El documento (escena) se pliega en 3D como origami y se vuelve a desplegar. */
function origami(b: HTMLElement) {
  const el = ambitoDe(b).querySelector<HTMLElement>("[data-escena]");
  el?.animate(
    [
      { transform: "perspective(1000px)" },
      { transform: "perspective(1000px) rotateX(75deg) scale(.85)", offset: 0.22 },
      { transform: "perspective(1000px) rotateX(75deg) rotateZ(-18deg) scale(.55)", offset: 0.4 },
      { transform: "perspective(1000px) rotateY(-80deg) rotateZ(-18deg) scale(.45)", offset: 0.55 },
      { transform: "perspective(1000px) rotateY(-80deg) rotateX(20deg) scale(.45)", offset: 0.65 },
      { transform: "perspective(1000px) rotateY(0) rotateX(-12deg) scale(.9)", offset: 0.85 },
      { transform: "perspective(1000px)" },
    ],
    { duration: 3000, easing: "cubic-bezier(.45,0,.25,1)" },
  );
}

/** Temblor suave de la pantalla (1 s, amplitud pequeña que decae). */
function temblor() {
  const el = document.querySelector<HTMLElement>("main") ?? document.body;
  const k = [0, 6, -6, 5, -5, 4, -3, 2, -1, 0];
  el.animate(k.map((x, i) => ({ transform: `translate(${x}px, ${i % 2 ? 2 : -2}px) rotate(${x * 0.06}deg)` })), { duration: 1000, easing: "ease-out" });
}

/** Lluvia de tildes de Modernízate (se clona el ícono del propio botón). */
function tildes(b: HTMLElement) {
  const ico = b.querySelector("svg");
  if (!ico) return;
  const c = capa(5800);
  for (let i = 0; i < 70; i++) {
    const s = ico.cloneNode(true) as SVGElement;
    const alto = azar(14, 40);
    s.removeAttribute("class");
    s.style.cssText = `position:absolute;top:-50px;left:${azar(0, 98)}vw;height:${alto}px;width:auto;color:${elegir(["#1F4FE0", "#8FB0FF", "#0E9F9A", "#1F4FE0"])};opacity:.9`;
    c.appendChild(s);
    s.animate([{ transform: "translateY(0) rotate(0)" }, { transform: `translate(${azar(-80, 80)}px, calc(100vh + 80px)) rotate(${azar(-540, 540)}deg)` }], { duration: azar(2200, 3800), delay: azar(0, 1600), easing: "cubic-bezier(.3,.1,.7,1)", fill: "both" });
  }
}

/** La tarjeta da una vuelta completa en 3D y muestra un mensaje oculto atrás. */
async function vuelta(b: HTMLElement, reverso: string) {
  const el = ambitoDe(b);
  if (el.dataset.girando) return;
  el.dataset.girando = "1";
  const giro = (de: number, a: number, ms: number, easing: string) =>
    el.animate([{ transform: `perspective(1400px) rotateY(${de}deg)` }, { transform: `perspective(1400px) rotateY(${a}deg)` }], { duration: ms, easing, fill: "forwards" }).finished;
  await giro(0, 90, 420, "ease-in");
  const atras = document.createElement("div");
  atras.setAttribute("aria-hidden", "true");
  atras.className = "sorpresa-reverso";
  atras.innerHTML = '<span class="sorpresa-reverso-ico"></span><p></p>';
  atras.querySelector("p")!.textContent = reverso;
  const ico = b.querySelector("svg")?.cloneNode(true) as SVGElement | undefined;
  if (ico) { ico.removeAttribute("class"); atras.querySelector("span")!.appendChild(ico); }
  el.appendChild(atras);
  await giro(-90, 0, 420, "ease-out");
  await new Promise((r) => setTimeout(r, 2400));
  await giro(0, 90, 420, "ease-in");
  atras.remove();
  await giro(-90, 0, 480, "cubic-bezier(.2,1.3,.5,1)");
  el.getAnimations().forEach((a) => a.cancel());
  delete el.dataset.girando;
}

/** Fuegos artificiales sobre la sección (partículas que se abren y caen; sin destellos). */
function fuegos(b: HTMLElement) {
  const sec = (b.closest("section") ?? document.body) as HTMLElement;
  const r = sec.getBoundingClientRect();
  const top = Math.max(r.top, 0), bottom = Math.min(r.bottom, innerHeight);
  const c = capa(5200);
  for (let k = 0; k < 7; k++) {
    const x = azar(r.left + r.width * 0.12, r.right - r.width * 0.12);
    const y = azar(top + 40, top + (bottom - top) * 0.55);
    const color = elegir(COLORES);
    const retraso = k * 520 + azar(0, 200);
    const cohete = document.createElement("span");
    cohete.style.cssText = `position:absolute;left:${x}px;top:${bottom}px;width:4px;height:14px;border-radius:2px;background:${color};opacity:0`;
    c.appendChild(cohete);
    cohete.animate([{ transform: "translateY(0)", opacity: 1 }, { transform: `translateY(${y - bottom}px)`, opacity: 1, offset: 0.95 }, { transform: `translateY(${y - bottom}px)`, opacity: 0 }], { duration: 650, delay: retraso, easing: "cubic-bezier(.2,.6,.4,1)" });
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2 + azar(-0.1, 0.1);
      const dist = azar(80, 160);
      const p = document.createElement("span");
      p.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:6px;height:6px;border-radius:50%;background:${i % 4 ? color : "#F5C542"};opacity:0;box-shadow:0 0 6px ${color}`;
      c.appendChild(p);
      const dx = Math.cos(a) * dist, dy = Math.sin(a) * dist;
      p.animate([{ transform: "translate(0,0) scale(1)", opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(1)`, opacity: 1, offset: 0.55 }, { transform: `translate(${dx * 1.1}px, ${dy * 1.1 + 40}px) scale(.4)`, opacity: 0 }], { duration: 1500, delay: retraso + 620, easing: "cubic-bezier(.1,.7,.3,1)" });
    }
  }
}

/** Imán: durante unos segundos los elementos del formulario se acercan al cursor. */
function iman(b: HTMLElement) {
  const ambito = ambitoDe(b);
  const els = [...ambito.querySelectorAll<HTMLElement>("form input, form textarea, form button, form label, h2, [data-iman]")].slice(0, 24);
  const br = b.getBoundingClientRect();
  let px = br.left + br.width / 2, py = br.top + br.height / 2;
  const aplicar = () =>
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const f = Math.min(26, 9000 / d) / d;
      el.style.transition = "transform .25s cubic-bezier(.2,.8,.3,1)";
      el.style.transform = `translate(${dx * f}px, ${dy * f}px)`;
    });
  const mover = (e: PointerEvent) => { px = e.clientX; py = e.clientY; aplicar(); };
  addEventListener("pointermove", mover);
  aplicar();
  setTimeout(() => {
    removeEventListener("pointermove", mover);
    els.forEach((el) => { el.style.transition = "transform .7s cubic-bezier(.3,1.5,.5,1)"; el.style.transform = ""; });
    setTimeout(() => els.forEach((el) => (el.style.transition = "")), 800);
  }, 4000);
}

/** Una estrella fugaz cruza la pantalla y deja la tilde del pie brillando. */
function estrella(b: HTMLElement) {
  const c = capa(4500);
  const br = b.getBoundingClientRect();
  const x1 = br.left + br.width / 2, y1 = br.top + br.height / 2;
  const x0 = Math.max(x1 - innerWidth * 0.9, -80), y0 = Math.max(10, y1 - innerHeight * 0.75);
  const ang = (Math.atan2(y1 - y0, x1 - x0) * 180) / Math.PI;
  const s = document.createElement("span");
  s.style.cssText = `position:absolute;left:0;top:0;width:150px;height:3px;border-radius:3px;background:linear-gradient(90deg,rgba(143,176,255,0),#C9D8FF 70%,#fff);filter:drop-shadow(0 0 6px #8FB0FF);transform-origin:100% 50%`;
  c.appendChild(s);
  s.animate([{ transform: `translate(${x0 - 150}px, ${y0}px) rotate(${ang}deg)`, opacity: 0 }, { opacity: 1, offset: 0.15 }, { transform: `translate(${x1 - 150}px, ${y1}px) rotate(${ang}deg)`, opacity: 1, offset: 0.9 }, { transform: `translate(${x1 - 150}px, ${y1}px) rotate(${ang}deg) scaleX(.1)`, opacity: 0 }], { duration: 1300, easing: "cubic-bezier(.5,0,.8,.6)", fill: "both" })
    .finished.then(() => b.animate([{ filter: "drop-shadow(0 0 0 rgba(31,79,224,0))" }, { filter: "drop-shadow(0 0 8px rgba(31,79,224,.9))", offset: 0.3 }, { filter: "drop-shadow(0 0 5px rgba(31,79,224,.7))", offset: 0.7 }, { filter: "drop-shadow(0 0 0 rgba(31,79,224,0))" }], { duration: 3000, easing: "ease-in-out" }));
}

export function lanzar(efecto: Efecto, boton: HTMLElement, reverso: string) {
  switch (efecto) {
    case "confeti": return confeti();
    case "electricidad": return electricidad(boton);
    case "voltear": return voltear(boton);
    case "burbujas": return burbujas();
    case "gravedad": return gravedad(boton);
    case "origami": return origami(boton);
    case "temblor": return temblor();
    case "tildes": return tildes(boton);
    case "vuelta": return void vuelta(boton, reverso);
    case "fuegos": return fuegos(boton);
    case "iman": return iman(boton);
    case "estrella": return estrella(boton);
  }
}
