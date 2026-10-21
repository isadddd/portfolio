import { useCallback, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { TOOLTIP } from "@/config/about";

export const useCursorTooltip = () => {
  const tipRef = useRef(null);
  const quick = useRef(null);

  const show = useCallback((e, label) => {
    const tip = tipRef.current;
    if (!tip) return;

    tip.textContent = label;

    if (!quick.current) {
      quick.current = {
        x: gsap.quickTo(tip, "x", { duration: TOOLTIP.follow, ease: "power3" }),
        y: gsap.quickTo(tip, "y", { duration: TOOLTIP.follow, ease: "power3" }),
      };
    }

    // Loncat langsung ke cursor saat pertama masuk, lalu mengikuti dengan halus.
    // xPercent/yPercent: tooltip rata tengah dan berada di atas cursor.
    gsap.set(tip, {
      xPercent: -50,
      yPercent: -100,
      x: e.clientX,
      y: e.clientY - TOOLTIP.offset,
    });
    tip.dataset.show = "true";
  }, []);

  const move = useCallback((e) => {
    quick.current?.x(e.clientX);
    quick.current?.y(e.clientY - TOOLTIP.offset);
  }, []);

  const hide = useCallback(() => {
    if (tipRef.current) tipRef.current.dataset.show = "false";
  }, []);

  return { tipRef, show, move, hide };
};
