/** Clave en localStorage. Sin valor guardado, manda la preferencia del sistema. */
export const CLAVE_TEMA = "tema";
export type Tema = "light" | "dark";

/**
 * Script mínimo para el <head>: fija data-theme antes de pintar (sin parpadeo)
 * y sigue los cambios del sistema mientras el usuario no haya elegido.
 */
export const scriptTema = `(function(){var k="${CLAVE_TEMA}",e=document.documentElement,m=window.matchMedia("(prefers-color-scheme: dark)");function g(){try{return localStorage.getItem(k)}catch(x){return null}}function a(){var t=g(),d=t==="dark"||(t!=="light"&&m.matches);e.dataset.theme=d?"dark":"light";e.style.colorScheme=d?"dark":"light"}a();m.addEventListener("change",function(){if(!g())a()})})();`;
