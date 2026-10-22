import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { BACKDROP_FADE, WORKS_STACK as S } from "@/config/works";

export const useWorksPreview = ({ rootRef, active }) => {
  const mounted = useRef(false);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Render pertama langsung di posisi akhir (tanpa animasi)
      const animate = mounted.current && !reduce;
      mounted.current = true;

      const cards = gsap.utils.toArray("[data-work-card]");
      const backs = gsap.utils.toArray("[data-work-backdrop]");
      const n = cards.length;

      cards.forEach((card, i) => {
        const d = (i - active + n) % n; // 0 = depan, 1..max = mengintip, sisanya hilang
        const depth = Math.min(d, S.max);
        gsap.to(card, {
          y: -depth * S.step,
          scale: 1 - depth * S.scaleStep,
          autoAlpha: d <= S.max ? 1 : 0,
          zIndex: n - d,
          duration: animate ? S.duration : 0,
          ease: S.ease,
          overwrite: "auto",
        });
      });

      backs.forEach((el, i) => {
        gsap.to(el, {
          autoAlpha: i === active ? 1 : 0,
          duration: animate ? BACKDROP_FADE : 0,
          overwrite: "auto",
        });
      });

      if (animate) {
        gsap.fromTo("[data-work-info]", { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      }
    },
    { scope: rootRef, dependencies: [active] },
  );
};
