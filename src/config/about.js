export const ABOUT_TEXT =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets.";

// Baca tinggi header dari CSS variable (--header-h), hasilnya angka px
export const getHeaderHeight = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 0;

// Teks terungkap huruf demi huruf (mengikuti scroll)
export const TEXT_REVEAL = {
  minOpacity: 0.1, // opacity huruf yang belum terungkap
  stagger: 0.05, // jarak antar huruf di timeline
  fadeDuration: 0.001, // duration / stagger = panjang gradasi (dalam huruf)
  scrub: 0.5, // kecil = langsung, besar = melayang
};

// Animasi icon berbasis waktu (bukan scrub)
export const ICON_ANIM = {
  duration: 0.8,
  ease: "back.out(1.7)",
  reverseSpeed: 1.6, // kecepatan menghilang saat scroll balik
};

// Tooltip mengikuti cursor
export const TOOLTIP = {
  offset: 20, // jarak di atas cursor (px)
  follow: 0.35, // kehalusan mengikuti cursor (detik)
};
