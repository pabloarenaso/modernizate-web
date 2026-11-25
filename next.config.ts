import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  cacheComponents: true,
  // Español vive en "/" y se sirve desde /es. Reescritura de configuración (siempre interna): una reescritura
  // en proxy.ts se trataba como externa detrás de Apache (--hostname 127.0.0.1, X-Forwarded-Proto https).
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [
        { source: "/", destination: "/es" },
        { source: "/:ruta((?!en(?:/|$)|es(?:/|$)|_next/|api/|ingresar(?:/|$)|app(?:/|$)).*)", destination: "/es/:ruta" },
      ],
      fallback: [],
    };
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
