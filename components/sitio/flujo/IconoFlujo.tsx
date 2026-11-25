import type { Icono } from "@/lib/flujos";

const trazos: Record<Icono, string> = {
  chat: "M4 5h16v11H9l-5 4zM8 9.5h8M8 12.5h5",
  reloj: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  carrito: "M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2M10 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM18 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  caja: "M3 7.5 12 3l9 4.5v9L12 21l-9-4.5zM3 7.5l9 4.5 9-4.5M12 12v9",
  ramas: "M6 3v12M6 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM18 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM18 12c0 4-6 3-12 6",
  robot: "M5 9h14v10H5zM12 5v4M12 3.5v.01M9 13.5v.01M15 13.5v.01M9.5 16.5h5M2.5 13v3M21.5 13v3",
  calendario: "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM8 12h2M14 12h2M8 16h2",
  planilla: "M4 4h16v16H4zM4 9.5h16M4 15h16M10 4v16",
  correo: "M3 6h18v12H3zM3 7l9 6 9-6",
  equipo: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM20 20v-1.5a3.5 3.5 0 0 0-2.5-3.4M15.5 4.2a3.5 3.5 0 0 1 0 6.6",
  enviar: "M21 3 10 14M21 3l-7 18-4-7-7-4z",
  camion: "M2 6h12v10H2zM14 9h4l3 3.5V16h-7M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12.5l2.7 2.7L16 9.5",
};

export function IconoFlujo({ icono, className = "size-7" }: { icono: Icono; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={trazos[icono]} />
    </svg>
  );
}
