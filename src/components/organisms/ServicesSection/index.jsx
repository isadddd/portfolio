import React, { useState } from "react";

import services from "@/data/services.json";
import { SERVICES_TOOLTIP_OFFSET } from "@/config/services";
import { useCanHover } from "@/hooks/useMediaQuery";
import { useCursorTooltip } from "@/hooks/useCursorTooltip";
import ServiceItem from "@/components/molecules/Services/ServiceItem";
import ServiceDescription from "@/components/molecules/Services/ServiceDescription";
import ServiceTooltip from "@/components/atoms/Services/ServiceTooltip";

const ServicesSection = () => {
  const canHover = useCanHover();
  const { tipRef, show, move, hide } = useCursorTooltip({ offset: SERVICES_TOOLTIP_OFFSET });

  const [current, setCurrent] = useState(0); // isi tooltip (desktop)
  const [open, setOpen] = useState(null); // dropdown yang terbuka (mobile)

  const handleHover = (e, i) => {
    setCurrent(i);
    show(e);
  };

  return (
    <section id="services" data-theme="accent" data-label="*services*" className="relative z-10 flex min-h-svh items-start md:items-center justify-center bg-secondary px-4 pt-(--header-h) pb-10 text-black md:px-[50px]">
      <ul className="flex flex-col items-start md:items-center text-start md:text-center pt-[10svh] md:pt-0">
        {services.map((service, i) => (
          <ServiceItem key={service.id} index={i} service={service} canHover={canHover} open={open === i} onToggle={() => setOpen(open === i ? null : i)} onHover={handleHover} onMove={move} onLeave={hide} />
        ))}
      </ul>

      {canHover && (
        <ServiceTooltip ref={tipRef}>
          <ServiceDescription service={services[current]} />
        </ServiceTooltip>
      )}
    </section>
  );
};

export default ServicesSection;
