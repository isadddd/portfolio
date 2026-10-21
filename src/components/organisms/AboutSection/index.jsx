import React, { useRef } from "react";

import frameworks from "@/data/frameworks.json";
import { ABOUT_TEXT } from "@/config/about";
import { useAboutReveal } from "@/hooks/useAboutReveal";
import { useCursorTooltip } from "@/hooks/useCursorTooltip";
import CursorTooltip from "@/components/atoms/CursorTooltip";
import FrameworkBadge from "@/components/molecules/FrameworkBadge";

const AboutSection = ({ text = ABOUT_TEXT }) => {
  const trackRef = useRef(null);
  const textRef = useRef(null);
  const iconRefs = useRef([]);

  const { tipRef, show, move, hide } = useCursorTooltip();
  useAboutReveal({ trackRef, textRef, iconRefs, items: frameworks });

  return (
    <section
      id="about"
      data-theme="light"
      data-label="hello, i'm *irsyad*" // ditampilkan di header saat section aktif (*...* = miring)
      className="relative z-10 bg-secondary"
    >
      {/* Track: tinggi total menentukan seberapa lama scroll untuk mengungkap teks */}
      <div ref={trackRef} className="h-[300vh]">
        <div className="sticky top-(--header-h) flex h-[calc(100svh-var(--header-h))] items-center px-4 md:px-[50px]">
          <div className="mx-auto w-full">
            <div className="max-w-[1017px]">
              <p ref={textRef} className="text-primary text-[clamp(18px,2.4vw,32px)]">
                {text}
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            {frameworks.map((fw, i) => (
              <FrameworkBadge
                key={fw.id}
                framework={fw}
                animRef={(el) => {
                  iconRefs.current[i] = el;
                }}
                onHover={show}
                onMove={move}
                onLeave={hide}
              />
            ))}
          </div>

          <CursorTooltip ref={tipRef} />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
