"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Sparkles, Wrench, BarChart3 } from "lucide-react";
import { GithubIcon } from "@/components/icons";

interface TileProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  accent?: "coral" | "blue" | "teal" | "ink" | "none";
}

function Tile({ children, className, delay = 0, accent = "none" }: TileProps) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: reduced ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={
        reduced
          ? undefined
          : { y: -8, rotate: -1, transition: { type: "spring", stiffness: 220, damping: 18 } }
      }
      data-cursor="hover"
      data-accent={accent}
      className={cn(
        "group relative rounded-[1.5rem] p-7 sm:p-8 overflow-hidden transition-shadow duration-300 hover:shadow-2xl",
        className
      )}
    >
      {children}
    </motion.article>
  );
}

function TileLink({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 h-11 px-5 rounded-full font-semibold text-sm transition-all duration-200",
        primary
          ? "bg-(--color-ink) text-(--color-cream) hover:bg-(--color-coral)"
          : "border border-(--color-ink)/25 text-(--color-ink) hover:bg-(--color-ink) hover:text-(--color-cream)"
      )}
    >
      {children}
    </a>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative pt-12 sm:pt-16 pb-24 sm:pb-32 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-sm font-bold tracking-[0.2em] uppercase text-(--color-coral)">
            / Projects
          </p>
          <h2
            className="mt-3 font-display text-5xl sm:text-7xl tracking-[-0.04em] leading-[0.92]"
            style={{ fontWeight: 900 }}
          >
            Things I&apos;ve <em className="not-italic text-(--color-coral)">shipped</em>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 auto-rows-[minmax(220px,auto)]">
          {/* lead-tracker */}
          <Tile
            accent="coral"
            className="lg:col-span-2 lg:row-span-2 flex flex-col justify-between min-h-[400px] bg-white border border-(--color-border)"
            delay={0}
          >
            <Image
              src="/lead-tracker.png"
              alt="Lead Tracker dashboard screenshot"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-110"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tl from-(--color-coral)/35 via-transparent to-transparent group-hover:from-(--color-coral)/55 transition-colors duration-500"
            />
            <div className="relative">
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-(--color-coral) text-white">
                Featured
              </span>
              <h3
                className="mt-5 font-display text-4xl sm:text-5xl tracking-tight leading-[0.95] text-(--color-ink) group-hover:text-(--color-coral) transition-colors duration-300"
                style={{ fontWeight: 900 }}
              >
                lead-tracker
              </h3>
              <p className="mt-4 text-(--color-ink-soft) text-base sm:text-lg max-w-md leading-relaxed">
                Full-stack web app for cold-call lead management. Next.js + Supabase + RLS.
              </p>
            </div>
            <div className="relative mt-6 flex flex-wrap gap-3 items-center">
              <TileLink href="https://lead-tracker-orcin.vercel.app/" primary>
                View live{" "}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </TileLink>
              <TileLink href="https://github.com/Vshivam01/lead-tracker">
                GitHub <GithubIcon className="w-3.5 h-3.5" />
              </TileLink>
            </div>
          </Tile>

          {/* lead-finder */}
          <Tile
            accent="blue"
            className="lg:col-span-2 lg:row-span-2 flex flex-col justify-between min-h-[400px] bg-white border border-(--color-border)"
            delay={0.08}
          >
            <Image
              src="/lead-finder.png"
              alt="Lead Finder CLI in action"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-[transform,filter] duration-500 ease-out group-hover:scale-[1.05] group-hover:brightness-110"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-transparent"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-tl from-(--color-blue)/30 via-transparent to-transparent group-hover:from-(--color-blue)/50 transition-colors duration-500"
            />
            <div className="relative">
              <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-(--color-blue) text-white">
                CLI
              </span>
              <h3
                className="mt-5 font-display text-4xl sm:text-5xl tracking-tight leading-[0.95] text-(--color-ink) group-hover:text-(--color-blue) transition-colors duration-300"
                style={{ fontWeight: 900 }}
              >
                lead-finder
              </h3>
              <p className="mt-4 text-(--color-ink-soft) text-base sm:text-lg max-w-md leading-relaxed">
                Python CLI that finds local Manitoba businesses without websites via Google Places API.
              </p>
            </div>
            <div className="relative mt-6">
              <TileLink href="https://github.com/Vshivam01/lead-finder" primary>
                GitHub{" "}
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </TileLink>
            </div>
          </Tile>

          {/* Currently building — solid teal */}
          <Tile
            accent="teal"
            className="lg:col-span-2 bg-(--color-teal) text-(--color-ink)"
            delay={0.16}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase">Currently building</p>
            </div>
            <ul className="mt-4 space-y-2.5 font-medium">
              <li className="flex items-baseline gap-2">
                <span>→</span>
                <span>n8n + OpenAI automation workflows <span className="opacity-70 text-sm">(in progress)</span></span>
              </li>
              <li className="flex items-baseline gap-2">
                <span>→</span>
                <span>This portfolio site <span className="opacity-70 text-sm">(you&apos;re looking at it 👋)</span></span>
              </li>
            </ul>
          </Tile>

          {/* Tech stack */}
          <Tile
            accent="ink"
            className="bg-white border border-(--color-ink)/15"
            delay={0.24}
          >
            <div className="flex items-center gap-2 text-(--color-ink)">
              <Wrench className="w-4 h-4" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase">Tech stack</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["TypeScript", "Next.js", "React", "Python", "PostgreSQL", "Tailwind", "Supabase", "Vercel"].map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold border border-(--color-ink)/20 text-(--color-ink)"
                >
                  {t}
                </span>
              ))}
            </div>
          </Tile>

          {/* By the numbers — solid coral */}
          <Tile
            accent="coral"
            className="bg-(--color-coral) text-white min-h-[320px] overflow-visible"
            delay={0.32}
          >
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <p className="text-xs font-bold tracking-[0.2em] uppercase">By the numbers</p>
            </div>
            <ul className="mt-5 space-y-4">
              <li>
                <p className="font-display text-3xl leading-none" style={{ fontWeight: 900 }}>16</p>
                <p className="text-xs opacity-90 mt-1">commits shipping lead-tracker in 1 day</p>
              </li>
              <li>
                <p className="font-display text-3xl leading-none" style={{ fontWeight: 900 }}>48</p>
                <p className="text-xs opacity-90 mt-1">unit tests passing</p>
              </li>
              <li>
                <p className="font-display text-3xl leading-none" style={{ fontWeight: 900 }}>2</p>
                <p className="text-xs opacity-90 mt-1">connected products in active use</p>
              </li>
            </ul>
          </Tile>
        </div>
      </div>
    </section>
  );
}
