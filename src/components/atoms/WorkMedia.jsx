import { useEffect, useRef } from "react";

const WorkMedia = ({ media, alt, active = false, className = "" }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active]);

  if (media.type === "video") {
    return <video ref={videoRef} src={media.src} poster={media.poster} muted loop playsInline preload="metadata" aria-label={alt} className={className} />;
  }

  return <img src={media.src} alt={alt} draggable={false} className={className} />;
};

export default WorkMedia;
