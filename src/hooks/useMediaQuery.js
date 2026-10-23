import { useSyncExternalStore } from "react";

export const useMediaQuery = (query) =>
  useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );

export const useCanHover = () => useMediaQuery("(hover: hover) and (pointer: fine)");
