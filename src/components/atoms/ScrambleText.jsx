import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}=+*^?#";

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

// Pisahkan teks biasa dari penanda miring: "hello, i'm *irsyad*"
// -> plain: "hello, i'm irsyad", mask: true untuk huruf yang dicetak miring
const parse = (text) => {
  let italic = false;
  let plain = "";
  const mask = [];
  for (const ch of text) {
    if (ch === "*") {
      italic = !italic;
      continue;
    }
    plain += ch;
    mask.push(italic);
  }
  return { plain, mask };
};

// Susun string menjadi potongan biasa dan potongan <i> sesuai mask
const renderSegments = (str, mask, italicSpacing) => {
  const out = [];
  let i = 0;
  while (i < str.length) {
    let j = i;
    while (j < str.length && mask[j] === mask[i]) j++;
    const chunk = str.slice(i, j);
    out.push(
      mask[i] ? (
        <i key={i} style={{ letterSpacing: italicSpacing }}>
          {chunk}
        </i>
      ) : (
        <React.Fragment key={i}>{chunk}</React.Fragment>
      ),
    );
    i = j;
  }
  return out;
};

const scrambled = (plain, revealed) =>
  plain
    .split("")
    .map((char, i) => (char === " " || i < revealed ? char : randomChar()))
    .join("");

// Teks acak lalu terungkap huruf demi huruf.
// - Default: jalan saat di-hover.
// - autoPlay: jalan saat teks muncul (dan setiap teksnya berubah), tanpa hover.
// - Penanda *...* membuat bagian itu dicetak miring (dengan letter spacing italicSpacing).
// - duration default: 600ms untuk hover, 1200ms untuk autoPlay (entrance lebih lambat).
// Lebar tetap (tidak bergeser) karena teks asli disimpan tak terlihat sebagai penahan ukuran.
const ScrambleText = ({ text, className = "", speed = 30, autoPlay = false, duration = autoPlay ? 1200 : 600, italicSpacing = "-0.1em" }) => {
  const { plain, mask } = useMemo(() => parse(text), [text]);
  // Dengan autoPlay mulai dari huruf acak, supaya teks asli tidak sempat berkedip
  const [display, setDisplay] = useState(() => (autoPlay ? scrambled(plain, 0) : plain));
  const timer = useRef(null);

  const scramble = useCallback(() => {
    clearInterval(timer.current);

    // hormati pengaturan "reduce motion" milik pengguna
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(plain);
      return;
    }

    const start = performance.now();

    timer.current = setInterval(() => {
      const progress = Math.min((performance.now() - start) / duration, 1);
      const revealed = Math.floor(progress * plain.length);

      setDisplay(scrambled(plain, revealed));

      if (progress === 1) {
        clearInterval(timer.current);
        setDisplay(plain);
      }
    }, speed);
  }, [plain, speed, duration]);

  useEffect(() => {
    if (autoPlay) scramble();
    else setDisplay(plain);
  }, [plain, autoPlay, scramble]);

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <span className={`relative inline-block ${className}`} onMouseEnter={autoPlay ? undefined : scramble} aria-label={plain}>
      <span className="invisible" aria-hidden="true">
        {renderSegments(plain, mask, italicSpacing)}
      </span>
      <span className="absolute inset-0 whitespace-pre" aria-hidden="true">
        {renderSegments(display, mask, italicSpacing)}
      </span>
    </span>
  );
};

export default ScrambleText;
