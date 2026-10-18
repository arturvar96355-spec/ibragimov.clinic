import type { Metadata } from "next";
import { PageHero } from "@/components/inner/PageHero";
import { DoctorCard } from "@/components/inner/DoctorCard";
import { Reasons } from "@/components/inner/Reasons";
import { FinalCta } from "@/components/home/FinalCta";
import { doctors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Врачи-стоматологи Ibragimov Clinic в Москве",
  description: "Врачи клиники Ibragimov Clinic: стоматолог-имплантолог Ибрагимов Ибрагим Гусейнович, стаж 21 год.",
};

export default function DoctorsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Врачи" }]} eyebrow="Команда" title="Врачи клиники" accent={["клиники"]} lead="Опытные специалисты помогают устранить боязнь лечения и проводят процедуры с исключительной тщательностью." />
      <section className="section-y bg-paper"><div className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{doctors.map((d) => <DoctorCard key={d.slug} d={d} />)}</div></section>
      <Reasons />
      <FinalCta />
    </>
  );
}
