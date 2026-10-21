import React, { useRef } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// Isi teks about. Nanti bisa diganti dari JSON atau API.
const TEXT =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.";

// Opacity huruf yang belum terungkap (0 = hilang, 1 = penuh)
const MIN_OPACITY = 0.2;
// Jarak antar huruf (detik di timeline) dan lama fade tiap huruf.
// duration / stagger = panjang gradasi dalam jumlah huruf.
// Mau efek keras per huruf? Set FADE_DURATION = 0.001
const STAGGER = 0.05;
const FADE_DURATION = 0.7;
// Kehalusan mengikuti scroll (detik). Kecil = lebih langsung, besar = lebih melayang.
const SCRUB = 0.5;
// Tinggi header (px). Harus sama dengan nilai di hero dan top-19.75 di bawah.
const HEADER_HEIGHT = 79;

const AboutSection = () => {
  const trackRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      // Hormati "reduce motion": biarkan teks tampil penuh tanpa animasi
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = SplitText.create(textRef.current, { type: "words,chars" });

      gsap.fromTo(
        split.chars,
        { opacity: MIN_OPACITY },
        {
          opacity: 1,
          ease: "none",
          duration: FADE_DURATION,
          stagger: STAGGER,
          scrollTrigger: {
            trigger: trackRef.current,
            // mulai saat area sticky menempel di bawah header
            start: `top top+=${HEADER_HEIGHT}`,
            // selesai tepat saat area sticky terlepas
            end: "bottom bottom",
            scrub: SCRUB,
          },
        },
      );

      return () => split.revert();
    },
    { scope: trackRef },
  );

  return (
    <section
      id="about"
      data-theme="light"
      data-label="hello, i'm *irsyad*" // ditampilkan di header saat section ini aktif (*...* = miring)
      className="relative z-10 bg-secondary"
    >
      {/* Track: tinggi total menentukan seberapa lama scroll untuk mengungkap teks */}
      <div ref={trackRef} className="h-[300vh]">
        <div className="sticky top-19.75 flex h-[calc(100svh-79px)] items-center px-[50px]">
          <div className="mx-auto w-full">
            <div className="max-w-[1017px]">
              <p ref={textRef} className="text-primary text-[clamp(20px,2.4vw,28px)] leading-[1.45]">
                {TEXT}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
