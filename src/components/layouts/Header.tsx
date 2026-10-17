"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Menu, Phone, Plus, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { BookButton } from "@/components/features/BookingModal";
import { childrenOf, rootServices, site } from "@/lib/content";

export function Header() {
  const pathname = usePathname();
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [query, setQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMega(false);
    setMobile(false);
  }

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () => rootServices.filter((s) => !q || s.title.toLowerCase().includes(q) || childrenOf(s.slug).some((c) => c.title.toLowerCase().includes(q))),
    [q],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-4 sm:pt-3" onMouseLeave={() => setMega(false)}>
      <div className={`mx-auto flex max-w-[1280px] items-center gap-4 rounded-card bg-white/95 px-4 py-3 backdrop-blur transition-shadow lg:gap-6 lg:px-7 ${scrolled || mega ? "shadow-soft" : "shadow-sm"}`}>
        <Logo />
        <div className="hidden whitespace-nowrap border-l border-line pl-5 text-[11px] leading-tight xl:block">
          <span className="block italic text-muted">График работы</span>
          <span className="italic">{site.hoursDays}: </span>
          <b className="text-brand">{site.hours}</b>
        </div>
        <nav aria-label="Основная" className="mx-auto hidden items-center lg:flex">
          {site.nav.map((n) => (
            <div key={n.href} className="border-l border-line first:border-0" onMouseEnter={() => setMega(!!n.mega)}>
              {n.mega ? (
                <button type="button" aria-expanded={mega} onClick={() => setMega((v) => !v)} className="flex items-center gap-1 whitespace-nowrap px-3 py-2 text-sm font-medium transition hover:text-brand xl:px-4">
                  {n.label} <ChevronDown size={14} className={`transition ${mega ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link href={n.href} className={`block whitespace-nowrap px-3 py-2 text-sm font-medium transition hover:text-brand xl:px-4 ${pathname.startsWith(n.href) ? "text-brand" : ""}`}>
                  {n.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
        <a href={site.phoneHref} className="ml-auto hidden whitespace-nowrap text-sm font-bold lg:ml-0 lg:block">{site.phoneDisplay}</a>
        <div className="hidden lg:block"><BookButton className="whitespace-nowrap !px-5 !py-3">Записаться на прием</BookButton></div>
        <a href={site.phoneHref} aria-label="Позвонить" className="ml-auto grid size-11 place-items-center rounded-ctl bg-brand-soft text-brand lg:hidden"><Phone size={18} /></a>
        <button aria-label="Меню" onClick={() => setMobile(true)} className="grid size-11 place-items-center rounded-ctl bg-ink text-white lg:hidden"><Menu size={20} /></button>
      </div>

      {/* Мега-меню услуг */}
      <div className={`absolute inset-x-4 top-full mx-auto hidden max-w-[1280px] transition-all duration-200 lg:block ${mega ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
        <div className="mt-1 rounded-card bg-white p-7 shadow-pop">
          <div className="mb-6 flex max-w-xl overflow-hidden rounded-ctl border border-line focus-within:border-brand">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Найти услугу" aria-label="Найти услугу" className="min-w-0 flex-1 px-4 py-3 text-sm outline-none" />
            <span className="grid w-12 place-items-center bg-ink text-white"><Search size={18} /></span>
          </div>
          <ul className="columns-3 gap-8">
            {filtered.map((s) => (
              <li key={s.slug} className="mb-4 break-inside-avoid">
                <Link href={`/services/${s.slug}/`} className="font-semibold transition hover:text-brand">{s.title}</Link>
                <ul className="mt-1.5 grid gap-1 border-l border-line pl-3">
                  {childrenOf(s.slug).map((c) => (
                    <li key={c.slug}><Link href={`/services/${c.slug}/`} className="text-sm text-muted transition hover:text-brand">{c.title}</Link></li>
                  ))}
                </ul>
              </li>
            ))}
            {!filtered.length && <li className="text-sm text-muted">Ничего не найдено</li>}
          </ul>
        </div>
      </div>

      {/* Мобильное меню */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobile ? "visible" : "invisible"}`}>
        <div onClick={() => setMobile(false)} className={`absolute inset-0 bg-[#14194a]/70 transition-opacity ${mobile ? "opacity-100" : "opacity-0"}`} />
        <aside className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col overflow-y-auto bg-white p-5 transition-transform duration-300 ${mobile ? "translate-x-0" : "translate-x-full"}`}>
          <div className="mb-6 flex items-center justify-between">
            <Logo />
            <button aria-label="Закрыть меню" onClick={() => setMobile(false)} className="grid size-11 place-items-center rounded-full bg-brand-soft text-brand"><X size={20} /></button>
          </div>
          <nav className="grid gap-1">
            {site.nav.filter((n) => !n.mega).slice(0, 1).map((n) => <Link key={n.href} href={n.href} className="rounded-ctl px-3 py-3 font-semibold">{n.label}</Link>)}
            <details className="group rounded-ctl">
              <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-3 font-semibold">Услуги <Plus size={18} className="transition group-open:rotate-45" /></summary>
              <ul className="grid gap-0.5 pb-2 pl-3">
                {rootServices.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}/`} className="block rounded-ctl px-3 py-2 text-sm">{s.title}</Link>
                    {childrenOf(s.slug).map((c) => <Link key={c.slug} href={`/services/${c.slug}/`} className="block px-6 py-1.5 text-xs text-muted">{c.title}</Link>)}
                  </li>
                ))}
              </ul>
            </details>
            {site.nav.filter((n) => !n.mega).slice(1).map((n) => <Link key={n.href} href={n.href} className="rounded-ctl px-3 py-3 font-semibold">{n.label}</Link>)}
          </nav>
          <div className="mt-auto grid gap-3 pt-8">
            <a href={site.phoneHref} className="text-center text-lg font-bold">{site.phoneDisplay}</a>
            <BookButton className="w-full">Записаться на прием</BookButton>
          </div>
        </aside>
      </div>
    </header>
  );
}
