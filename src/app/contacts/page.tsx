import type { Metadata } from "next";
import { PageHero } from "@/components/inner/PageHero";
import { FinalCta } from "@/components/home/FinalCta";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Контакты стоматологии Ibragimov Clinic — Москва, ул. Гарибальди, 11",
  description: "Адрес, телефон и как добраться до Ibragimov Clinic: ул. Гарибальди, 11, м. Новые Черёмушки, Новаторская, Профсоюзная. Ежедневно 10:00–20:00.",
};

export default function ContactsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Контакты" }]} eyebrow="Как нас найти" title="Контакты" lead={<p>{site.addressCity}, {site.address}. {site.addressNote[0].toUpperCase() + site.addressNote.slice(1)}. Метро: {site.metro.join(", ")}.</p>} />
      <FinalCta />
    </>
  );
}
