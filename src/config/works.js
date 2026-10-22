// Tumpukan preview: card di belakang mengintip dari atas
export const WORKS_STACK = {
  step: 17, // jarak mengintip per lapis (px)
  scaleStep: 0.04, // pengecilan per lapis
  max: 2, // jumlah card yang mengintip
  duration: 0.7,
  ease: "power3.out",
};

export const BACKDROP_FADE = 0.8; // detik, crossfade background

// Gambar diam sebuah work (untuk background / poster)
export const getStill = (work) => (work.media.type === "video" ? work.media.poster : work.media.src);
