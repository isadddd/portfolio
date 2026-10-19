import React, { useEffect, useRef } from "react";

import heroImages from "@/data/heroImages.json";

// Geser maksimum (px) untuk gambar terbesar. Gambar lebih kecil bergeser lebih sedikit.
const MAX_SHIFT = 40;
// Kecepatan mengikuti pointer (per detik). Kecil = lebih lambat dan melayang, besar = lebih responsif.
const DAMPING = 5;
// 1 = gambar bergerak berlawanan arah pointer (efek kedalaman), -1 = searah pointer
const DIRECTION = 1;

const HeroHomepage = () => {
  const sectionRef = useRef(null);
  const imgRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let strengths = [];
    const target = { x: 0, y: 0 }; // posisi pointer
    const mid = { x: 0, y: 0 }; // tahap 1: mengikuti pointer
    const current = { x: 0, y: 0 }; // tahap 2: mengikuti tahap 1 (yang dipakai gambar)
    let raf = null;
    let last = 0;

    // Sensitivitas tiap gambar dihitung dari lebarnya (gambar besar = lebih dekat = geser lebih jauh).
    // Bisa ditimpa per gambar lewat field "depth" (0 sampai 1) di JSON.
    const measure = () => {
      const widths = imgRefs.current.map((el) => (el ? el.offsetWidth : 0));
      const maxW = Math.max(...widths, 1);
      strengths = widths.map((w, i) => {
        const depth = heroImages[i]?.depth ?? w / maxW;
        return depth * MAX_SHIFT;
      });
    };

    const render = (now) => {
      // Hitung berdasarkan waktu supaya sama di layar 60Hz maupun 120Hz
      const dt = Math.min((now - (last || now)) / 1000, 0.05);
      last = now;
      const k = 1 - Math.exp(-DAMPING * dt);

      mid.x += (target.x - mid.x) * k;
      mid.y += (target.y - mid.y) * k;
      current.x += (mid.x - current.x) * k;
      current.y += (mid.y - current.y) * k;

      imgRefs.current.forEach((el, i) => {
        if (!el) return;
        const s = strengths[i] ?? 0;
        el.style.translate = `${-current.x * s * DIRECTION}px ${
          -current.y * s * DIRECTION
        }px`;
      });

      const settled =
        Math.abs(target.x - current.x) < 0.0005 &&
        Math.abs(target.y - current.y) < 0.0005 &&
        Math.abs(target.x - mid.x) < 0.0005 &&
        Math.abs(target.y - mid.y) < 0.0005;

      if (settled) {
        raf = null;
        last = 0;
      } else {
        raf = requestAnimationFrame(render);
      }
    };

    const start = () => {
      if (raf === null) raf = requestAnimationFrame(render);
    };

    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      // -1 (kiri/atas) sampai 1 (kanan/bawah), 0 = tengah section
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      start();
    };

    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      start();
    };

    measure();
    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", measure);

    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", measure);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="sticky top-19.75 h-[calc(100svh-79px)] overflow-hidden bg-black flex items-center justify-center px-4"
      data-theme="dark"
    >
      {/* Layer gambar acak (data dari src/data/heroImages.json) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {heroImages.map((img, i) => (
          <img
            key={img.id}
            ref={(el) => (imgRefs.current[i] = el)}
            src={img.src}
            alt=""
            decoding="async"
            className={`absolute h-auto select-none transform-gpu will-change-[translate] ${img.className}`}
          />
        ))}
      </div>

      {/* Konten di atas gambar */}
      <div className="relative z-10 flex w-full max-w-244.5 flex-col items-center gap-15 sm:items-end sm:gap-22">
        <div className="title-hero flex flex-col gap-5 sm:gap-3">
          <h1>code with a point of view.</h1>
          <p>irsyad bgs</p>
        </div>

        <div className="flex justify-end max-w-244.5">
          <p className="text-18 text-secondary text-center sm:text-end max-w-208.75">
            Mungkin ini bisa dijadikan tentang about me singkat. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;
