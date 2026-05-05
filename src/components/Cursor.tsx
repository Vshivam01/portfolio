"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const isInteractive = (el: Element | null) =>
      !!el?.closest?.("a, button, [role='button'], input, textarea, select, [data-cursor='hover']");
    const onOver = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) setHovering(true);
    };
    const onOut = (e: PointerEvent) => {
      if (isInteractive(e.target as Element)) setHovering(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.addEventListener("pointerout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = hovering ? 64 : 24;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: sx,
        y: sy,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
        backgroundColor: hovering ? "#FF6B35" : "#1A1A1A",
        mixBlendMode: "difference",
      }}
      animate={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
    />
  );
}
