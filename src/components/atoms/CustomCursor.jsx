import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    // aktif hanya di perangkat dengan mouse
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    let x = 0,
      y = 0,
      cx = 0,
      cy = 0,
      raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      // membesar saat di atas elemen yang bisa diklik
      const hovering = e.target.closest("a, button, [role='button'], .cursor-pointer");
      el.dataset.hover = hovering ? "true" : "false";
    };

    const loop = () => {
      cx += (x - cx) * 0.3; // 0.2 = kehalusan
      cy += (y - cy) * 0.3;
      el.style.translate = `${cx}px ${cy}px`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[9999] hidden [@media(pointer:fine)]:block">
      <div className="-ml-2 -mt-2 h-2 w-2 rounded-full bg-primary mix-blend-difference transition-transform duration-200 [[data-hover=true]_&]:scale-[3]" />
    </div>
  );
};

export default CustomCursor;
