import { useState, useRef, useEffect, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_/[]{}=+*^?#";

// Teks acak lalu terungkap huruf demi huruf saat di-hover.
// Lebar tetap (tidak bergeser) karena teks asli disimpan tak terlihat sebagai penahan ukuran.
const ScrambleText = ({ text, className = "", speed = 30, duration = 600 }) => {
  const [display, setDisplay] = useState(text);
  const timer = useRef(null);

  const scramble = useCallback(() => {
    // hormati pengaturan "reduce motion" milik pengguna
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    clearInterval(timer.current);
    const start = performance.now();

    timer.current = setInterval(() => {
      const progress = Math.min((performance.now() - start) / duration, 1);
      const revealed = Math.floor(progress * text.length);

      setDisplay(
        text
          .split("")
          .map((char, i) =>
            char === " " || i < revealed
              ? char
              : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );

      if (progress === 1) {
        clearInterval(timer.current);
        setDisplay(text);
      }
    }, speed);
  }, [text, speed, duration]);

  useEffect(() => {
    setDisplay(text);
  }, [text]);

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={scramble}
      aria-label={text}
    >
      <span className="invisible" aria-hidden="true">
        {text}
      </span>
      <span className="absolute inset-0 whitespace-pre" aria-hidden="true">
        {display}
      </span>
    </span>
  );
};

export default ScrambleText;
