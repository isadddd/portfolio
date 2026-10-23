import ArrowIcon from "@/components/atoms/ArrowIcon";

const WorkListItem = ({ work, active, canHover, onActivate }) => (
  <li>
    <a
      href={`/works/${work.slug}`}
      data-active={active}
      onPointerEnter={canHover ? onActivate : undefined}
      onFocus={canHover ? onActivate : undefined}
      onClick={(e) => {
        // Sentuh: tap = pilih, bukan navigasi. Navigasi lewat button "view project".
        if (!canHover) {
          e.preventDefault();
          onActivate();
        }
      }}
      className="group flex items-start text-secondary transition-colors duration-300 data-[active=true]:text-primary"
    >
      <span className="flex h-[40px] w-0 shrink-0 items-center overflow-hidden opacity-0 transition-[width,opacity] duration-300 group-data-[active=true]:w-8 group-data-[active=true]:opacity-100 md:h-[55px] md:group-data-[active=true]:w-10">
        <ArrowIcon className="size-6 shrink-0 md:size-8" />
      </span>

      <h3 className="font-heading text-[clamp(36px,4vw,64px)] leading-[0.9] font-bold tracking-[-0.1em]">
        {work.title}
        <span className="ml-2 font-mono text-[12px] font-normal tracking-normal">[{work.year}]</span>
      </h3>
    </a>
  </li>
);

export default WorkListItem;
