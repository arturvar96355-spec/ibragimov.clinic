import type { Metadata } from "next";
import { PageHero } from "@/components/inner/PageHero";
import { ServicesIndex } from "@/components/inner/ServicesIndex";
import { Navigator } from "@/components/home/Navigator";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Услуги стоматологии в Москве — Ibragimov Clinic",
  description: "Имплантация, базальная имплантация, ортодонтия, лечение зубов, пародонтология и протезирование в ЮЗАО Москвы.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Услуги" }]} eyebrow="Направления клиники" title="Услуги и лечение" accent={["лечение"]} lead="Выберите направление или ответьте, что вас беспокоит, и мы подскажем, с чего начать." />
      <Navigator />
      <ServicesIndex />
      <FinalCta />
    </>
  );
}
