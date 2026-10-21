import { useState, useEffect } from "react";

// Membaca data-theme dan data-label dari section yang sedang berada di bawah header.
// offset = jarak (px) dari atas layar sebagai garis deteksi (kira-kira tengah header).
// Section pertama dipakai sebagai cadangan, jadi aman kalau section itu sticky
// (posisi atasnya tidak pernah mencapai offset).
// Contoh: <section data-theme="light" data-label="irsyad" className="bg-white">
// Mengembalikan: { theme, label }
const useHeaderTheme = (offset = 40) => {
  const [state, setState] = useState({ theme: "dark", label: "" });

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-theme]"));
    if (sections.length === 0) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      let current = sections[0]; // cadangan: section pertama

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        // section terakhir (paling atas secara tumpukan) yang melewati garis deteksi
        if (rect.top <= offset && rect.bottom > offset) {
          current = section;
        }
      }

      const theme = current.dataset.theme;
      const label = current.dataset.label ?? "";

      // Hindari re-render kalau tidak ada yang berubah
      setState((prev) => (prev.theme === theme && prev.label === label ? prev : { theme, label }));
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

  return state;
};

export default useHeaderTheme;
