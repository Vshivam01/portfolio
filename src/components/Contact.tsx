"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";

const EMAIL = "shivamshivam754@gmail.com";

function MagneticEmail() {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    const max = 10;
    const cap = (v: number) => Math.max(-max, Math.min(max, v * 0.3));
    setPos({ x: cap(dx), y: cap(dy) });
  };

  return (
    <motion.a
      ref={ref}
      href={`mailto:${EMAIL}`}
      onMouseMove={onMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 18, mass: 0.5 }}
      className="inline-flex items-center justify-center gap-3 mt-10 h-16 px-9 rounded-full font-semibold text-base sm:text-lg bg-(--color-blue) text-white shadow-[0_12px_32px_-10px_rgba(45,91,255,0.55)] hover:shadow-[0_20px_44px_-10px_rgba(45,91,255,0.75)] transition-shadow duration-200"
    >
      <Mail className="w-5 h-5" /> {EMAIL}
    </motion.a>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 sm:py-36 px-6 bg-(--color-bone) text-(--color-ink)"
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-(--color-blue)">
            / Contact
          </p>
          <h2
            className="mt-3 font-display text-6xl sm:text-8xl tracking-[-0.045em] leading-[0.9]"
            style={{ fontWeight: 900 }}
          >
            Let&apos;s build <em className="not-italic text-(--color-blue)">something</em>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <MagneticEmail />
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://github.com/Vshivam01"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full font-semibold text-sm border border-(--color-ink)/20 text-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-cream) transition-all"
            >
              <GithubIcon className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/shivam-verma-824b36178"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full font-semibold text-sm border border-(--color-blue)/40 text-(--color-blue) hover:bg-(--color-blue) hover:text-white transition-all"
            >
              <LinkedinIcon className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-10 text-(--color-ink-muted) text-sm">
            Best for: junior SWE roles, freelance web work, or just to chat about tools.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
