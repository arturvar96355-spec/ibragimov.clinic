import Link from "next/link";

/** Временный логотип-вордмарк; оригинальный SVG подставится из выгрузки сайта. */
export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" aria-label="Ibragimov Clinic — на главную" className="flex items-center gap-2.5">
      <svg viewBox="0 0 64 64" className={`size-8 ${dark ? "text-brand" : "text-gold"}`} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 10c-6 0-11 5-11 12 0 6 3 9 4 15 1 6 2 17 6 17 3 0 3-10 6-10h6c3 0 3 10 6 10 4 0 5-11 6-17 1-6 4-9 4-15 0-7-5-12-11-12-4 0-6 2-9 2s-5-2-9-2Z" />
      </svg>
      <span className={`display text-2xl leading-none ${dark ? "text-ink" : "text-paper"}`}>
        Ibragimov<span className="eyebrow ml-2 align-middle !text-[9px]">clinic</span>
      </span>
    </Link>
  );
}
