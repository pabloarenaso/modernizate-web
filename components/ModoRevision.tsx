"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/** Con ?revision=1 marca <html data-revision>, y el CSS resalta los textos en borrador. */
export function ModoRevision() {
  const activo = useSearchParams().get("revision") === "1";
  useEffect(() => {
    const html = document.documentElement;
    if (activo) html.dataset.revision = "1";
    else delete html.dataset.revision;
  }, [activo]);
  return null;
}
