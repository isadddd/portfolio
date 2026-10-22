import React, { useRef, useState } from "react";

import works from "@/data/works.json";
import { getStill } from "@/config/works";
import { useWorksPreview } from "@/hooks/useWorksPreview";
import WorkListItem from "@/components/molecules/WorkListItem";
import WorkMeta from "@/components/molecules/WorkMeta";
import WorkPreviewStack from "@/components/molecules/WorkPreviewStack";

const DEFAULT_INDEX = 0; // saat tidak ada yang di-hover, tampilkan yang paling atas

const WorksSection = () => {
  const rootRef = useRef(null);
  const [active, setActive] = useState(DEFAULT_INDEX);

  useWorksPreview({ rootRef, active });

  const reset = () => setActive(DEFAULT_INDEX);

  return (
    <section ref={rootRef} id="works" data-theme="dark" data-label="selected *work*" className="relative z-10 h-svh overflow-hidden bg-black pt-(--header-h) text-secondary">
      {/* Background: gambar work aktif, samar, memudar ke kiri */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[60%] opacity-20 md:block [mask-image:linear-gradient(to_left,#000,transparent)]">
        {works.map((work) => (
          <img key={work.id} data-work-backdrop src={getStill(work)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        ))}
      </div>

      <div className="relative grid h-full items-center gap-10 px-4 pb-10 md:grid-cols-2 md:px-[50px]">
        {/* Daftar judul */}
        <ul
          onPointerLeave={reset}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) reset();
          }}
        >
          {works.map((work, i) => (
            <WorkListItem key={work.id} work={work} active={i === active} onActivate={() => setActive(i)} />
          ))}
        </ul>

        {/* Highlight kanan (desktop saja) */}
        <div className="hidden md:block">
          <WorkPreviewStack works={works} active={active} />
          <div data-work-info className="mt-3">
            <WorkMeta work={works[active]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
