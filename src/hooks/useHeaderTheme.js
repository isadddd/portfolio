import { useState, useEffect } from "react";

// Membaca atribut data-theme dari section yang sedang berada di bawah header.
// offset = jarak (px) dari atas layar sebagai garis deteksi (kira-kira tengah header).
// Contoh: <section data-theme="light" className="bg-white">
const useHeaderTheme = (offset = 40) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-theme]"));
    let ticking = false;

    const update = () => {
      ticking = false;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // section yang sedang melewati garis deteksi
        if (rect.top <= offset && rect.bottom > offset) {
          setTheme(section.dataset.theme);
          return;
        }
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update(); // set tema awal saat mount
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [offset]);

  return theme;
};

export default useHeaderTheme;
