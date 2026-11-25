import { NextResponse, type NextRequest } from "next/server";

/**
 * Español vive en "/" (servido desde /es por la reescritura de next.config.ts) e inglés en "/en".
 * Aquí solo se redirige /es/... a la ruta sin prefijo.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = url.pathname.slice(3) || "/";
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/es", "/es/:path*"],
};
