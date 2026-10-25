import { forwardRef } from "react";

const ServiceTooltip = forwardRef(function ServiceTooltip({ children }, ref) {
  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-show="false"
      className="pointer-events-none fixed top-0 left-0 z-[60] w-[320px] bg-black p-[10px] font-mono text-[14px] leading-[1.3] text-secondary opacity-0 transition-opacity duration-200 data-[show=true]:opacity-100"
    >
      {children}
    </div>
  );
});

export default ServiceTooltip;
