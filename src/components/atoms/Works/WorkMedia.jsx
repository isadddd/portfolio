import { useEffect, useRef } from "react";

// Sama dengan stops di Figma: 0A0A0A opacity 0% di 80% -> opacity 100% di 100%
const GRADIENT = "linear-gradient(to bottom, rgba(10,10,10,0) 80%, rgba(10,10,10,1) 100%)";

const WorkMedia = ({ media, alt, active = false, gradient = true, className = "" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  return (
    <div className="relative size-full">
      {media.type === "video" ? (
        <video ref={videoRef} src={media.src} poster={media.poster} muted loop playsInline preload="metadata" aria-label={alt} className={className} />
      ) : (
        <img src={media.src} alt={alt} draggable={false} className={className} />
      )}

      {gradient && <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: GRADIENT }} />}
    </div>
  );
};

export default WorkMedia;
