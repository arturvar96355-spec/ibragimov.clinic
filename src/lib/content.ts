import site from "@/content/site.json";
import servicesData from "@/content/services.json";
import pricesData from "@/content/prices.json";
import doctorsData from "@/content/doctors.json";
import equipmentData from "@/content/equipment.json";
import reviewsData from "@/content/reviews.json";
import promosData from "@/content/promos.json";
import situationsData from "@/content/situations.json";
import processData from "@/content/process.json";
import type { Doctor, Equipment, PriceCategory, ProcessStep, Promo, Review, Service, Situation } from "./types";

export { site };
export const services = servicesData as Service[];
export const prices = pricesData as PriceCategory[];
export const doctors = doctorsData as Doctor[];
export const equipment = equipmentData as Equipment[];
export const reviews = reviewsData as Review[];
export const promos = promosData as Promo[];
export const situations = situationsData as Situation[];
export const processSteps = processData as ProcessStep[];

export const rootServices = services.filter((s) => !s.parent);
export const childrenOf = (slug: string) => services.filter((s) => s.parent === slug);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getPriceCategory = (id?: string) => prices.find((p) => p.id === id);

export const formatPrice = (n: number) =>
  `от ${new Intl.NumberFormat("ru-RU").format(n).replace(/ /g, " ")} ₽`;

/** Цена по точному названию позиции из prices.json (единый источник цен). */
export function priceOf(name: string): number {
  for (const c of prices) for (const i of c.items) if (i.name === name) return i.price;
  throw new Error(`Нет позиции в prices.json: ${name}`);
}

/** Стартовая цена, которую показываем в карточке услуги (позиция из prices.json). */
export const featuredPrice = (s: Service): number | null => (s.featured ? priceOf(s.featured) : null);
