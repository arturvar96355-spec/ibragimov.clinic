import Link from "next/link";

/** Временный логотип-вордмарк; оригинальный SVG логотип подставится из выгрузки сайта. */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="Ibragimov Clinic — на главную" className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className={`size-9 ${light ? "text-white" : "text-brand"}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 10c-6 0-11 5-11 12 0 6 3 9 4 15 1 6 2 17 6 17 3 0 3-10 6-10h6c3 0 3 10 6 10 4 0 5-11 6-17 1-6 4-9 4-15 0-7-5-12-11-12-4 0-6 2-9 2s-5-2-9-2Z" />
      </svg>
      <span className={`text-xl font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Ibragimov<span className="block text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">clinic</span>
      </span>
    </Link>
  );
}
