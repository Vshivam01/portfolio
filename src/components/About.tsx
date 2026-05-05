"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const frontend = ["Next.js", "React", "TypeScript", "Tailwind"];
const backend = ["Python", "Postgres", "Supabase", "REST APIs"];

export function About() {
  const reduced = useReducedMotion();

  const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.45 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 sm:py-36 bg-(--color-coral) text-(--color-cream)"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative mx-auto max-w-6xl px-6 grid md:grid-cols-[200px_1fr] gap-10 md:gap-16 items-start"
      >
        <motion.div variants={item}>
          <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full p-1.5 bg-(--color-ink)">
            <div className="relative w-full h-full rounded-full overflow-hidden bg-(--color-cream)">
              <Image
                src="/photo.png"
                alt="Shivam Verma"
                width={208}
                height={208}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        <div>
          <motion.p
            variants={item}
            className="text-sm font-bold tracking-[0.2em] uppercase text-(--color-coral-deep)"
          >
            / About
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-3 font-display text-5xl sm:text-7xl tracking-[-0.04em] leading-[0.92]"
            style={{ fontWeight: 900 }}
          >
            Hey, I&apos;m <em className="not-italic">Shivam</em>.
          </motion.h2>

          <div className="mt-7 space-y-5 text-lg leading-relaxed max-w-2xl">
            <motion.p variants={item}>
              I&apos;m a CS student at U of Manitoba graduating April 2026, based in Winnipeg.
            </motion.p>
            <motion.p variants={item}>
              I build small, focused tools end-to-end. The lead-finder CLI scrapes leads, the
              lead-tracker dashboard works them.{" "}
              <em className="font-medium">
                Two connected products taught me more than one bigger one would have.
              </em>
            </motion.p>
            <motion.p variants={item}>
              Currently exploring AI automation (n8n + OpenAI workflows) and algorithmic trading
              (built and backtested an MQL5 forex strategy). Looking for junior SWE roles in
              Winnipeg or remote in Canada — full-time or co-op.
            </motion.p>
          </div>

          <motion.div variants={item} className="mt-10 space-y-5">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-(--color-cream)/85 mb-3">
                Frontend
              </p>
              <div className="flex flex-wrap gap-2">
                {frontend.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-sm font-semibold bg-(--color-cream) text-(--color-ink)"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-(--color-cream)/85 mb-3">
                Backend
              </p>
              <div className="flex flex-wrap gap-2">
                {backend.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-sm font-semibold bg-(--color-cream) text-(--color-ink)"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
