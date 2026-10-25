import ServiceDescription from "@/components/molecules/Services/ServiceDescription";

const Row = ({ number, title }) => (
  <>
    <span className="font-mono text-[20px] font-medium md:text-[32px]">{number}</span>
    <span className="font-heading text-[clamp(30px,8vw,64px)] leading-[0.9] font-bold tracking-[-0.1em] md:leading-[55px]">{title}</span>
  </>
);

const ServiceItem = ({ index, service, canHover, open, onToggle, onHover, onMove, onLeave }) => {
  const number = String(index + 1).padStart(2, "0");

  // Desktop: hover memunculkan tooltip di cursor
  if (canHover) {
    return (
      <li>
        <div onPointerEnter={(e) => onHover(e, index)} onPointerMove={onMove} onPointerLeave={onLeave} className="inline-flex items-center gap-2 px-1 text-black transition-colors duration-200 hover:bg-black hover:text-primary">
          <Row number={number} title={service.title} />
        </div>
        {/* Tooltip disembunyikan dari screen reader (aria-hidden), jadi deskripsi disediakan di sini */}
        <div className="sr-only">
          <ServiceDescription service={service} />
        </div>
      </li>
    );
  }

  // Sentuh: tap membuka dropdown
  return (
    <li>
      <button type="button" aria-expanded={open} onClick={onToggle} data-open={open} className="inline-flex items-center gap-2 px-1 text-black transition-colors duration-200 data-[open=true]:bg-black data-[open=true]:text-primary">
        <Row number={number} title={service.title} />
      </button>

      {/* Tinggi dianimasikan lewat grid-rows (0fr -> 1fr), tanpa GSAP */}
      <div className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden">
          <div className="mx-auto mt-2 mb-3 w-full max-w-[320px] bg-black p-[10px] text-left font-mono text-[14px] leading-[1.3] text-secondary">
            <ServiceDescription service={service} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default ServiceItem;
