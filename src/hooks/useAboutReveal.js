import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { getHeaderHeight, ICON_ANIM, TEXT_REVEAL } from "@/config/about";

/**
 * @param trackRef  elemen tinggi (300vh) yang jadi trigger scroll
 * @param textRef   elemen <p> yang di-split per huruf
 * @param iconRefs  ref berisi array elemen icon (urutan sama dengan items)
 * @param items     data frameworks (field "at" = titik muncul, 0..1)
 */
export const useAboutReveal = ({ trackRef, textRef, iconRefs, items }) => {
  useGSAP(
    () => {
      // Hormati "reduce motion": teks dan icon tampil penuh tanpa animasi
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create(textRef.current, { type: "words,chars" });

      // Titik muncul tiap icon. Kalau "at" kosong, dibagi rata.
      const thresholds = items.map((fw, i) => fw.at ?? (i + 1) / (items.length + 1));

      const tweens = items.map((_, i) => {
        const el = iconRefs.current[i];
        if (!el) return null;
        return gsap.fromTo(
          el,
          { scaleX: 0, scaleY: 0.6, rotation: -18, autoAlpha: 0 },
          {
            scaleX: 1,
            scaleY: 1,
            rotation: 0,
            autoAlpha: 1,
            duration: ICON_ANIM.duration,
            ease: ICON_ANIM.ease,
            paused: true,
          },
        );
      });

      const shown = tweens.map(() => false);

      const sync = (progress) => {
        tweens.forEach((tween, i) => {
          if (!tween) return;
          const on = progress >= thresholds[i];
          if (on === shown[i]) return;
          shown[i] = on;
          if (on) tween.timeScale(1).play();
          else tween.timeScale(ICON_ANIM.reverseSpeed).reverse();
        });
      };

      gsap.fromTo(
        split.chars,
        { opacity: TEXT_REVEAL.minOpacity },
        {
          opacity: 1,
          ease: "none",
          duration: TEXT_REVEAL.fadeDuration,
          stagger: TEXT_REVEAL.stagger,
          scrollTrigger: {
            trigger: trackRef.current,
            start: () => `top top+=${getHeaderHeight()}`,
            end: "bottom bottom",
            scrub: TEXT_REVEAL.scrub,
            onUpdate: (self) => sync(self.progress),
            onRefresh: (self) => sync(self.progress),
          },
        },
      );

      return () => split.revert();
    },
    { scope: trackRef },
  );
};
