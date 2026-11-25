"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/** Con ?revision=1 marca <html data-revision>, y el CSS resalta los textos en borrador. En producción no actúa. */
export function ModoRevision() {
  const permitido = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_PERMITIR_REVISION === "1";
  const pedido = useSearchParams().get("revision") === "1";
  const activo = permitido && pedido;
  useEffect(() => {
    const html = document.documentElement;
    if (activo) html.dataset.revision = "1";
    else delete html.dataset.revision;
  }, [activo]);
  return null;
}
