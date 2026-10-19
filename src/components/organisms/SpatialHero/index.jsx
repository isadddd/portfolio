import { useEffect, useRef, useState } from "react";
import "@/components/organisms/SpatialHero/style.css";

const images = [
  {
    src: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80",
    alt: "Night sky",
    className: "spatial-image image-one",
    depth: 1.2,
  },
  {
    src: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=700&q=80",
    alt: "Ocean waves",
    className: "spatial-image image-two",
    depth: -0.8,
  },
  {
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=700&q=80",
    alt: "Modern architecture",
    className: "spatial-image image-three",
    depth: 0.65,
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
    alt: "Fashion editorial",
    className: "spatial-image image-four",
    depth: -1.1,
  },
  {
    src: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=700&q=80",
    alt: "Geometric building",
    className: "spatial-image image-five",
    depth: 0.9,
  },
];

export default function SpatialHero() {
  const sceneRef = useRef(null);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [motionAvailable, setMotionAvailable] = useState(true);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId;

    const handlePointerMove = (event) => {
      const rect = scene.getBoundingClientRect();

      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;

      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

      targetX = normalizedX * -40;
      targetY = normalizedY * -40;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const handleOrientation = (event) => {
      if (event.gamma == null || event.beta == null) return;

      targetX = Math.max(-24, Math.min(24, event.gamma * 0.8));
      targetY = Math.max(-24, Math.min(24, (event.beta - 45) * 0.45));
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      scene.style.setProperty("--move-x", `${currentX}px`);
      scene.style.setProperty("--move-y", `${currentY}px`);

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handlePointerMove);
    scene.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("deviceorientation", handleOrientation);

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
      scene.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, []);

  const enableMotion = async () => {
    if (typeof DeviceOrientationEvent === "undefined") {
      setMotionAvailable(false);
      return;
    }

    try {
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        const permission = await DeviceOrientationEvent.requestPermission();

        if (permission !== "granted") {
          setMotionAvailable(false);
          return;
        }
      }

      setMotionEnabled(true);
    } catch {
      setMotionAvailable(false);
    }
  };

  return (
    <section className="spatial-hero " data-theme="accent">
      <div className="spatial-scene" ref={sceneRef}>
        {images.map((image, index) => (
          <div
            className={image.className}
            key={image.src}
            style={{ "--depth": image.depth }}
          >
            <img src={image.src} alt={image.alt} draggable="false" />
            <span className="image-index">0{index + 1} / EDITORIAL</span>
          </div>
        ))}

        <div className="hero-copy">
          <p className="hero-eyebrow">INDEPENDENT DEVELOPER · INDONESIA</p>
          <h1>
            Code with
            <br />a <span>point of view.</span>
          </h1>
          <p className="hero-description">
            I build digital experiences where thoughtful design meets purposeful
            code.
          </p>
          <a href="#work" className="hero-link">
            EXPLORE SELECTED WORK ↗
          </a>
        </div>

        <div className="hero-coordinate">07°34′ S — 110°49′ E</div>
        <div className="hero-scroll">SCROLL TO EXPLORE ↓</div>
      </div>

      {!motionEnabled && motionAvailable && (
        <button className="motion-button" onClick={enableMotion}>
          ENABLE SPATIAL MOTION ↗
        </button>
      )}

      {!motionAvailable && (
        <p className="motion-note">
          Motion sensor unavailable. Pointer movement is still enabled.
        </p>
      )}
    </section>
  );
}
