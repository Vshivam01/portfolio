const ITEMS = [
  "TypeScript",
  "Next.js",
  "React",
  "Python",
  "PostgreSQL",
  "Tailwind",
  "Supabase",
  "Vercel",
];

export function Marquee() {
  // Duplicate the list so the -50% translate seam is invisible
  const row = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee-wrap relative overflow-hidden border-y border-(--color-border) py-8 bg-(--color-bone)">
      <div className="marquee-track flex gap-12 whitespace-nowrap will-change-transform">
        {row.map((item, i) => (
          <span
            key={i}
            className="font-display text-3xl sm:text-5xl tracking-[-0.02em] text-(--color-ink) flex items-center gap-12"
            style={{ fontWeight: 900 }}
          >
            {item}
            <span aria-hidden="true" className="text-(--color-coral)">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
