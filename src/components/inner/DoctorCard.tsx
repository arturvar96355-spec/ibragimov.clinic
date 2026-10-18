import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import type { Doctor } from "@/lib/types";

export function DoctorCard({ d }: { d: Doctor }) {
  return (
    <article className="group relative overflow-hidden rounded-[32px] bg-night text-paper">
      <Media img={d.photo} tone="night" className="aspect-[4/5] transition duration-700 group-hover:scale-105" sizes="(min-width:1024px) 400px, 90vw" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-night/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 grid gap-2 p-6">
        <p className="eyebrow">Стаж {d.experience}</p>
        <h3 className="display text-3xl sm:text-4xl"><Link href={`/doctors/${d.slug}/`} className="after:absolute after:inset-0">{d.name}</Link></h3>
        <p className="flex items-center justify-between text-sm text-paper/70">{d.role}<ArrowUpRight className="text-gold transition group-hover:rotate-45" /></p>
      </div>
    </article>
  );
}
