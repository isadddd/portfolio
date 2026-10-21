import FrameworkIcon from "@/components/atoms/FrameworkIcon";

const FrameworkBadge = ({ framework, animRef, onHover, onMove, onLeave }) => {
  const { name, src, srcBnw, colorShadow, className, rotate } = framework;

  return (
    // Posisi + ukuran. pointer-events-none supaya icon yang belum muncul tidak bisa di-hover
    <div className={`group pointer-events-none absolute ${className}`}>
      {/* Kemiringan tetap */}
      <div className={rotate}>
        {/* Target animasi GSAP. pointer-events-auto: hanya bisa di-hover setelah terlihat */}
        <div ref={animRef} className="pointer-events-auto" onPointerEnter={(e) => onHover(e, name)} onPointerMove={onMove} onPointerLeave={onLeave}>
          <FrameworkIcon name={name} src={src} srcBnw={srcBnw} shadowColor={colorShadow} />
        </div>
      </div>
    </div>
  );
};

export default FrameworkBadge;
