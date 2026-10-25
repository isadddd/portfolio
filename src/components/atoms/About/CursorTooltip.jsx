import { forwardRef } from "react";

const CursorTooltip = forwardRef(function CursorTooltip(_, ref) {
  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-show="false"
      className="pointer-events-none fixed top-0 left-0 z-[60] bg-black px-2 py-1 text-[18px] leading-none whitespace-nowrap text-primary opacity-0 transition-opacity duration-200 data-[show=true]:opacity-100"
    />
  );
});

export default CursorTooltip;
