import React, { useRef, useState } from "react";

import works from "@/data/works.json";
import { getStill } from "@/config/works";
import { useWorksPreview } from "@/hooks/useWorksPreview";
import { useCanHover } from "@/hooks/useMediaQuery";
import WorkListItem from "@/components/molecules/Works/WorkListItem";
import WorkMeta from "@/components/molecules/Works/WorkMeta";
import WorkPreviewStack from "@/components/molecules/Works/WorkPreviewStack";

const DEFAULT_INDEX = 0;

const WorksSection = () => {
  const rootRef = useRef(null);
  const [active, setActive] = useState(DEFAULT_INDEX);
  const canHover = useCanHover();

  useWorksPreview({ rootRef, active });

  const reset = () => setActive(DEFAULT_INDEX);

  return (
    <section ref={rootRef} id="works" data-theme="dark" data-label="selected *work*" className="relative z-10 min-h-svh overflow-hidden bg-black pt-(--header-h) text-secondary md:h-svh">
      {/* Background: memudar ke atas di mobile, ke kiri di desktop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-30 [mask-image:linear-gradient(to_top,#000,transparent)] md:w-[60%] md:[mask-image:linear-gradient(to_left,#000,transparent)]">
        {works.map((work) => (
          <img key={work.id} data-work-backdrop src={getStill(work)} alt="" loading="lazy" className="absolute inset-0 size-full object-cover" />
        ))}
      </div>

      <div className="relative grid content-start gap-10 px-4 py-10 md:h-full md:grid-cols-2 md:content-center md:items-center md:px-[50px] md:py-0 md:pb-10">
        <ul
          onPointerLeave={canHover ? reset : undefined}
          onBlur={(e) => {
            if (canHover && !e.currentTarget.contains(e.relatedTarget)) reset();
          }}
        >
          {works.map((work, i) => (
            <WorkListItem key={work.id} work={work} active={i === active} canHover={canHover} onActivate={() => setActive(i)} />
          ))}
        </ul>

        {/* Highlight: tampil di semua ukuran */}
        <div>
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
