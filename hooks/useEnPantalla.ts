"use client";

import { useEffect, useState, type RefObject } from "react";

/** true mientras el elemento está (al menos en parte) en pantalla y la pestaña está visible. */
export function useEnPantalla(ref: RefObject<Element | null>) {
  const [visible, setVisible] = useState(true);
  const [pestana, setPestana] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    const alCambiar = () => setPestana(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", alCambiar);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", alCambiar);
    };
  }, [ref]);

  return visible && pestana;
}
