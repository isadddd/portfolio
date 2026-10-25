import WorkMedia from "@/components/atoms/Works/WorkMedia";
import { WORKS_STACK } from "@/config/works";

// Rasio card. Ubah di sini saja, aspect-ratio dan rumus lebar ikut berubah.
const RATIO = 16 / 9;

// Ruang selain card (px): header 79 + padding bawah 40 + peek 34 + jarak 12 + meta ~130
const RESERVED = 300;

const WorkPreviewStack = ({ works, active }) => (
  <div
    className="relative"
    style={{
      aspectRatio: RATIO,
      marginTop: WORKS_STACK.step * WORKS_STACK.max,
      width: `min(100%, calc((100svh - ${RESERVED}px) * ${RATIO}))`,
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
