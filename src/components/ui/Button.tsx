import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export type Variant = "gold" | "light" | "ghost" | "dark" | "brand";

const styles: Record<Variant, string> = {
  gold: "bg-gold text-night hover:bg-gold-soft",
  light: "bg-paper text-night hover:bg-white",
  ghost: "border border-white/30 text-white hover:bg-white/10",
  dark: "bg-night text-paper hover:bg-brand",
  brand: "bg-brand text-white hover:bg-brand-dark",
};

const base =
  "group inline-flex items-center justify-center gap-3 rounded-ctl py-3.5 pl-7 pr-3.5 text-sm font-bold tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

export function buttonClass(variant: Variant = "gold", className = "") {
  return `${base} ${styles[variant]} ${className}`;
}

export function Arrow({ dark = true }: { dark?: boolean }) {
  return (
    <span className={`grid size-9 place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${dark ? "bg-night/10" : "bg-white/15"}`}>
      <ArrowUpRight size={16} />
    </span>
  );
}

interface Props {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "gold", className = "", children }: Props & { href: string }) {
  const cls = buttonClass(variant, className);
  const inner = <>{children}<Arrow dark={variant === "gold" || variant === "light"} /></>;
  if (href.startsWith("tel:") || href.startsWith("http")) return <a href={href} className={cls}>{inner}</a>;
  return <Link href={href} className={cls}>{inner}</Link>;
}
