import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";
import { MapStub } from "@/components/features/MapStub";
import { ContactsBlock } from "@/components/features/ContactsBlock";
import { Advantages } from "@/components/features/Advantages";
import { CtaCallback } from "@/components/features/CtaCallback";

export const metadata: Metadata = {
  title: "Контакты стоматологии Ibragimov Clinic — Москва, ул. Гарибальди, 11",
  description: "Адрес, телефон и как добраться до Ibragimov Clinic: ул. Гарибальди, 11, м. Новые Черёмушки, Новаторская, Профсоюзная. Ежедневно 10:00–20:00.",
};

export default function ContactsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Контакты" }]} />
      <section className="container-x pt-4">
        <h1 className="h-section mb-6 lg:text-5xl">Контакты</h1>
        <MapStub className="h-80 lg:h-[420px]" />
      </section>
      <ContactsBlock />
      <Advantages />
      <CtaCallback />
    </>
  );
}
