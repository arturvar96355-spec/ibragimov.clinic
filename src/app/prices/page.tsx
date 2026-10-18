import type { Metadata } from "next";
import { PageHero } from "@/components/inner/PageHero";
import { PricesExplorer } from "@/components/inner/PricesExplorer";
import { FinalCta } from "@/components/home/FinalCta";

export const metadata: Metadata = {
  title: "Цены на стоматологические услуги в Москве — Ibragimov Clinic",
  description: "Прайс-лист стоматологии Ibragimov Clinic: консультация от 1 500 ₽, имплантация от 45 200 ₽, базальная имплантация от 40 000 ₽, ортодонтия.",
};

export default function PricesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Цены" }]} eyebrow="Прозрачные цены" title="Цены на услуги" accent={["услуги"]} lead="Стартовые цены без скрытых платежей. Нажмите на услугу, чтобы записаться: точную стоимость назовет врач после осмотра." />
      <PricesExplorer />
      <FinalCta />
    </>
  );
}
