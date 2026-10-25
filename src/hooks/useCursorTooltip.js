import { useCallback, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { TOOLTIP } from "@/config/about";

export const useCursorTooltip = ({ offset = TOOLTIP.offset } = {}) => {
  const tipRef = useRef(null);
  const quick = useRef(null);

  const show = useCallback(
    (e, label) => {
      const tip = tipRef.current;
      if (!tip) return;

      // Kalau label tidak dikirim, isi tooltip diatur oleh React
      if (label !== undefined) tip.textContent = label;

      // Buat ulang quickTo kalau elemen tooltip berganti
      if (quick.current?.el !== tip) {
        quick.current = {
          el: tip,
          x: gsap.quickTo(tip, "x", { duration: TOOLTIP.follow, ease: "power3" }),
          y: gsap.quickTo(tip, "y", { duration: TOOLTIP.follow, ease: "power3" }),
        };
      }

      gsap.set(tip, {
        xPercent: -50,
        yPercent: -100,
        x: e.clientX,
        y: e.clientY - offset,
      });
      tip.dataset.show = "true";
    },
    [offset],
  );

  const move = useCallback(
    (e) => {
      quick.current?.x(e.clientX);
      quick.current?.y(e.clientY - offset);
    },
    [offset],
  );

  const hide = useCallback(() => {
    if (tipRef.current) tipRef.current.dataset.show = "false";
  }, []);

  return { tipRef, show, move, hide };
};
