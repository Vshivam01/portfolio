"use client";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

const HEADLINE = [
  { text: "Full-stack developer", coral: false },
  { text: "building tools", coral: false },
  { text: "that ship.", coralWord: "ship." },
];

const PHRASES = [
  "Full-stack developer.",
  "Tools shipper.",
  "Manitoba-based.",
  "Currently hiring me.",
];

function Letters({ line, delay = 0 }: { line: string; delay?: number }) {
  const reduced = useReducedMotion();
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.025, delayChildren: delay } },
  };
  const letter: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 28, rotate: reduced ? 0 : -6 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: { type: "spring", stiffness: 220, damping: 22 },
    },
  };

  return (
    <motion.span
      className="inline-block"
      variants={container}
      initial="hidden"
      animate="visible"
      aria-label={line}
    >
      {Array.from(line).map((ch, i) => (
        <motion.span
          key={i}
          variants={letter}
          aria-hidden="true"
          className="inline-block"
          style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

function MagneticCTA({
  href,
  children,
  variant,
}: {
  href: string;
  children: React.ReactNode;
  variant: "coral" | "outline-blue";
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const max = 10;
    const cap = (v: number) => Math.max(-max, Math.min(max, v * 0.35));
    setPos({ x: cap(dx), y: cap(dy) });
  };
  const onLeave = () => setPos({ x: 0, y: 0 });

  const base =
    "inline-flex items-center justify-center gap-2 h-14 px-8 rounded-full font-semibold text-base transition-shadow duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-cream)";
  const variants = {
    coral:
      "bg-(--color-coral) text-white shadow-[0_8px_24px_-8px_rgba(255,107,53,0.55)] hover:shadow-[0_14px_36px_-8px_rgba(255,107,53,0.7)] focus-visible:ring-(--color-coral)",
    "outline-blue":
      "border-2 border-(--color-blue) text-(--color-blue) hover:bg-(--color-blue) hover:text-white focus-visible:ring-(--color-blue)",
  } as const;

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.5 }}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </motion.a>
  );
}

function WordMorph() {
  const [i, setI] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setI((v) => (v + 1) % PHRASES.length), 2500);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <span className="relative inline-block h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block italic text-(--color-ink-soft)"
        >
          {PHRASES[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function SVGlyph({ targetRef }: { targetRef: React.RefObject<HTMLElement | null> }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });
  // Parallax: drift upward at ~0.5x as the hero scrolls past
  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -160]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ y }}
      className="hidden lg:block absolute right-[4%] top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
    >
      <span
        className="font-display block leading-none tracking-tighter text-(--color-ink)"
        style={{
          fontWeight: 900,
          fontSize: "clamp(12rem, 24vw, 22rem)",
          transform: "rotate(-8deg)",
          opacity: 0.07,
        }}
      >
        SV
      </span>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-[80vh] flex flex-col justify-end pt-28 pb-12 px-6 sm:px-10 overflow-hidden"
    >
      <SVGlyph targetRef={sectionRef} />
      <div className="relative z-10 mx-auto max-w-7xl w-full lg:pr-[32%]">
        <h1
          className="font-display tracking-[-0.045em] leading-[0.9]"
          style={{
            fontWeight: 900,
            fontSize: "clamp(3rem, 8vw, 7rem)",
            overflowWrap: "normal",
            wordBreak: "keep-all",
            hyphens: "none",
          }}
        >
          <span className="block">
            <Letters line="Full-stack" delay={0} />
          </span>
          <span className="block">
            <Letters line="developer" delay={0.2} />
          </span>
          <span className="block">
            <Letters line="building tools" delay={0.45} />
          </span>
          <span className="block">
            <Letters line="that " delay={0.75} />
            <span className="text-(--color-coral)">
              <Letters line="ship." delay={0.9} />
            </span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-2xl sm:text-3xl font-medium text-(--color-ink-soft) max-w-3xl leading-tight"
        >
          <WordMorph />
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-4 text-sm font-medium text-(--color-ink-muted) flex items-center gap-2"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-(--color-teal) animate-pulse" />
          Winnipeg, MB · Open to junior SWE roles
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-3"
        >
          <MagneticCTA href="#projects" variant="coral">
            View projects <ArrowRight className="w-4 h-4" />
          </MagneticCTA>
          <MagneticCTA href="#contact" variant="outline-blue">
            Get in touch <Mail className="w-4 h-4" />
          </MagneticCTA>
        </motion.div>
      </div>
    </section>
  );
}
