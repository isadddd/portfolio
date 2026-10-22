import WorkMedia from "@/components/atoms/WorkMedia";
import { WORKS_STACK } from "@/config/works";

// Ruang selain card (px): header 79 + padding bawah 40 + peek 34 + jarak 12 + meta ~130
const RESERVED = 300;

const WorkPreviewStack = ({ works, active }) => (
  <div
    className="relative aspect-[16/10]"
    style={{
      marginTop: WORKS_STACK.step * WORKS_STACK.max,
      width: `min(100%, calc((100svh - ${RESERVED}px) * 1.6))`,
    }}
  >
    {works.map((work, i) => (
      <div key={work.id} data-work-card className="absolute inset-0 origin-top overflow-hidden bg-black">
        <WorkMedia media={work.media} alt={work.title} active={i === active} className="size-full object-cover" />
      </div>
    ))}
  </div>
);

export default WorkPreviewStack;
