"use client";

import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Body background shifts cream → bone across the Hero+Projects scroll range.
 * About / Contact / Footer are opaque-painted by their own sections so we don't
 * fight them here. Transition fires ~10% before each section enters viewport.
 */
export function BackgroundController() {
  const { scrollYProgress } = useScroll();
  // 0% cream → 35% (start of projects bottom-half) bone
  const bg = useTransform(scrollYProgress, [0, 0.18, 0.35], ["#F5F0E8", "#F5F0E8", "#FFFAF0"]);
  const [color, setColor] = useState("#F5F0E8");

  useMotionValueEvent(bg, "change", (v) => setColor(v as string));

  useEffect(() => {
    document.documentElement.style.backgroundColor = color;
    document.documentElement.style.transition = "background-color 200ms linear";
  }, [color]);

  return null;
}
