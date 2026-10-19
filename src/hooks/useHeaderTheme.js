import { useState, useEffect } from "react";

// Membaca atribut data-theme dari section yang sedang berada di bawah header.
// offset = jarak (px) dari atas layar sebagai garis deteksi (kira-kira tengah header).
// Section pertama dipakai sebagai cadangan, jadi aman kalau section itu sticky
// (posisi atasnya tidak pernah mencapai offset).
// Contoh: <section data-theme="light" className="bg-white">
const useHeaderTheme = (offset = 40) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-theme]"));
    if (sections.length === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      let current = sections[0].dataset.theme; // cadangan: section pertama

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // section terakhir (paling atas secara tumpukan) yang melewati garis deteksi
        if (rect.top <= offset && rect.bottom > offset) {
          current = section.dataset.theme;
        }
      }

      setTheme(current);
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
