import React from "react";

import heroImages from "@/data/heroImages.json";

const HeroHomepage = () => {
  return (
    <section
      id="hero"
      className="sticky top-19.75 h-[calc(100svh-79px)] overflow-hidden bg-black flex items-center justify-center px-4"
      data-theme="dark"
    >
      {/* Layer gambar acak (data dari src/data/heroImages.json) */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        {heroImages.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt=""
            decoding="async"
            className={`absolute h-auto select-none ${img.className}`}
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
