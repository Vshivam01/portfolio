"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";

const YEARS = [2026, 2027, 2028];

function YearTicker({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  // Map the ticker to the footer's approach range: 2026 when it's just entering
  // the viewport, 2028 by the time it's fully on screen. ["start end", "start start"]
  // means progress goes 0 → 1 as the footer's top travels from the bottom of
  // the viewport to the top — exactly the scroll motion the user sees while
  // arriving at the footer.
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "start start"],
  });
  const [year, setYear] = useState(YEARS[0]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = p < 0.4 ? 0 : p < 0.75 ? 1 : 2;
    setYear((prev) => (prev === YEARS[i] ? prev : YEARS[i]));
  });

  return (
    <span
      className="relative inline-block align-baseline overflow-hidden tabular-nums"
      style={{ width: "4ch", height: "1em", lineHeight: "1em" }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={year}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {year}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  return (
    <footer
      ref={ref}
      className="border-t border-(--color-ink) bg-(--color-ink) text-(--color-cream) py-12 px-6"
    >
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-(--color-cream)/70">
        <p className="whitespace-nowrap">
          © <YearTicker targetRef={ref} /> Shivam Verma
        </p>
        <p className="text-center">
          Built with Next.js, Tailwind, Framer Motion, deployed on Vercel
        </p>
        <a
          href="https://github.com/Vshivam01"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-(--color-coral) transition-colors"
        >
          View source
        </a>
      </div>
    </footer>
  );
}
