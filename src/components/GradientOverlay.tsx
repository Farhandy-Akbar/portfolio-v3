"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GradientOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    gsap.to(overlayRef.current, {
      backgroundPosition: "100% 100%",
      duration: 15,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.06) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)",
        backgroundSize: "150% 150%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}
