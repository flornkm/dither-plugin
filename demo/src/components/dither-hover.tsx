import React, { useEffect, useRef, useState } from "react";

type DitherHoverProps = {
  src: string;
  radius?: number;
  feather?: number;
  invert?: boolean;
  className?: string;
  imgClassName?: string;
};

const DitherHover: React.FC<DitherHoverProps> = ({
  src,
  radius = 120,
  feather = 32,
  invert = false,
  className = "",
  imgClassName = "object-cover",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [{ x, y }, setPos] = useState({ x: 0, y: 0 });
  const [r, setR] = useState(0);
  const [hovered, setHovered] = useState(false);
  const animId = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: rect.width / 2, y: rect.height / 2 });
    setR(Math.hypot(rect.width, rect.height));
  }, []);

  useEffect(() => {
    return () => {
      if (animId.current) cancelAnimationFrame(animId.current);
    };
  }, []);

  const handlePointerMove = (clientX: number, clientY: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos({ x: clientX - rect.left, y: clientY - rect.top });
    if (hovered && animId.current === null) setR(radius);
  };

  const animateTo = (target: number, duration = 300) => {
    if (animId.current) {
      cancelAnimationFrame(animId.current);
      animId.current = null;
    }
    const start = r;
    const t0 = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / duration);
      const val = start + (target - start) * ease(t);
      setR(val);
      if (t < 1) animId.current = requestAnimationFrame(step);
      else animId.current = null;
    };
    animId.current = requestAnimationFrame(step);
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ touchAction: "none" }}
      onPointerMove={(e) => {
        handlePointerMove(e.clientX, e.clientY);
      }}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") {
          setHovered(true);
          handlePointerMove(e.clientX, e.clientY);
          animateTo(radius, 300);
        }
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") {
          setHovered(false);
          const el = ref.current;
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const target = Math.hypot(rect.width, rect.height);
          animateTo(target, 400);
        }
      }}
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
        setHovered(true);
        handlePointerMove(e.clientX, e.clientY);
        animateTo(radius, 250);
      }}
      onPointerUp={(e) => {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
        setHovered(false);
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const target = Math.hypot(rect.width, rect.height);
        animateTo(target, 350);
      }}
      onPointerCancel={(e) => {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
        setHovered(false);
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const target = Math.hypot(rect.width, rect.height);
        animateTo(target, 350);
      }}
    >
      <div
        className="absolute inset-0 dither-lg contrast-[1000%]"
        style={{ borderRadius: "inherit" }}
      >
        <video
          src={src}
          poster={src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className={`w-full h-full ${imgClassName}`}
          style={{ borderRadius: "inherit" }}
        />
      </div>

      <video
        src={src}
        poster={src}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className={`w-full h-full relative ${imgClassName}`}
        style={{
          WebkitMaskImage: invert
            ? `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 0, transparent ${Math.max(
                0,
                r - feather,
              )}px, white ${r}px)`
            : `radial-gradient(circle ${r}px at ${x}px ${y}px, white 0, white ${Math.max(
                0,
                r - feather,
              )}px, transparent ${r}px)`,
          maskImage: invert
            ? `radial-gradient(circle ${r}px at ${x}px ${y}px, transparent 0, transparent ${Math.max(
                0,
                r - feather,
              )}px, white ${r}px)`
            : `radial-gradient(circle ${r}px at ${x}px ${y}px, white 0, white ${Math.max(
                0,
                r - feather,
              )}px, transparent ${r}px)`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          transition: "none",
          borderRadius: "inherit",
        }}
        draggable={false}
      />
    </div>
  );
};

export default DitherHover;
