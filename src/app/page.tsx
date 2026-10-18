import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { BoneStory } from "@/components/home/BoneStory";
import { Navigator } from "@/components/home/Navigator";
import { DoctorChapter } from "@/components/home/DoctorChapter";
import { EquipmentBento } from "@/components/home/EquipmentBento";
import { PriceTiles } from "@/components/home/PriceTiles";
import { Proof } from "@/components/home/Proof";
import { FinalCta } from "@/components/home/FinalCta";

const PlanBuilder = dynamic(() => import("@/components/home/PlanBuilder").then((m) => m.PlanBuilder));
const DigitalPath = dynamic(() => import("@/components/home/DigitalPath").then((m) => m.DigitalPath));

export const metadata: Metadata = {
  title: "Стоматология в Москве, ЮЗАО: базальная имплантация — Ibragimov Clinic",
  description: "Ibragimov Clinic: имплантация зубов, лечение под микроскопом, ортодонтия. Москва, ул. Гарибальди, 11. Запишитесь на консультацию.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />
      <BoneStory />
      <Navigator />
      <PlanBuilder />
      <DigitalPath />
      <DoctorChapter />
      <EquipmentBento />
      <PriceTiles />
      <Proof />
      <FinalCta />
    </>
  );
}
