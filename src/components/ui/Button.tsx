import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "dark" | "brand" | "outline" | "white";

const styles: Record<Variant, string> = {
  dark: "bg-ink text-white hover:bg-brand",
  brand: "bg-brand text-white hover:bg-brand-dark",
  outline: "border border-brand text-brand hover:bg-brand hover:text-white",
  white: "bg-white text-ink hover:bg-brand-soft",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-ctl px-8 py-3.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

interface Props {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant = "dark", className = "", children }: Props & { href: string }) {
  const cls = `${base} ${styles[variant]} ${className}`;
  if (href.startsWith("tel:") || href.startsWith("http")) return <a href={href} className={cls}>{children}</a>;
  return <Link href={href} className={cls}>{children}</Link>;
}

export function buttonClass(variant: Variant = "dark", className = "") {
  return `${base} ${styles[variant]} ${className}`;
}
