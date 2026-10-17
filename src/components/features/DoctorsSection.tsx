import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { BookButton } from "./BookingModal";
import { SectionHead } from "./SectionHead";
import { doctors } from "@/lib/content";
import type { Doctor } from "@/lib/types";

export function DoctorCard({ d }: { d: Doctor }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card bg-white shadow-soft transition duration-300 hover:-translate-y-1">
      <Media img={d.photo} tone="sand" className="aspect-[3/4]" sizes="(min-width:1024px) 280px, 80vw" />
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="text-base font-bold leading-snug text-brand"><Link href={`/doctors/${d.slug}/`} className="after:absolute after:inset-0">{d.name}</Link></h3>
        <p className="text-sm"><b>Стаж:</b> {d.experience}</p>
        <p className="text-xs text-muted">{d.role}</p>
        <div className="relative z-10 mt-4 flex items-center justify-between">
          <BookButton context={d.name} className="!px-6 !py-2.5">Записаться</BookButton>
          <ArrowUpRight className="text-line transition group-hover:text-ink" />
        </div>
      </div>
    </article>
  );
}

export function DoctorsSection() {
  return (
    <section className="bg-soft py-14 lg:py-20" aria-labelledby="doctors-title">
      <div className="container-x">
        <SectionHead id="doctors-title" title="Врачи" href="/doctors/" linkLabel="Показать всех" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{doctors.map((d) => <DoctorCard key={d.slug} d={d} />)}</div>
      </div>
    </section>
  );
}
