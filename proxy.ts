import { NextResponse, type NextRequest } from "next/server";

/**
 * Español vive en "/" (reescrito internamente a /es) e inglés en "/en".
 * /es/... redirige a la ruta sin prefijo. /ingresar, /app y archivos estáticos quedan fuera.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  // Con el origen de request.url (no el de nextUrl, que toma X-Forwarded-Proto) Next la trata como interna.
  return NextResponse.rewrite(new URL(url.pathname + url.search, request.url));
}

export const config = {
  matcher: ["/((?!_next/|api/|ingresar(?:/|$)|app(?:/|$)|.*\\..*).*)"],
};
