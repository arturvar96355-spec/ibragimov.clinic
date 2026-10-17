import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";
import { PricesExplorer } from "@/components/features/PricesExplorer";
import { CtaCallback } from "@/components/features/CtaCallback";

export const metadata: Metadata = {
  title: "Цены на стоматологические услуги в Москве — Ibragimov Clinic",
  description: "Прайс-лист стоматологии Ibragimov Clinic: консультация от 1 500 ₽, имплантация от 45 200 ₽, базальная имплантация от 40 000 ₽, ортодонтия.",
};

export default function PricesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Цены" }]} />
      <section className="container-x py-8 lg:py-12">
        <h1 className="h-section mb-8 lg:text-5xl">Цены на услуги</h1>
        <PricesExplorer />
      </section>
      <CtaCallback />
    </>
  );
}
