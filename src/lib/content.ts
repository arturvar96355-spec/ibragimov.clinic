import site from "@/content/site.json";
import servicesData from "@/content/services.json";
import pricesData from "@/content/prices.json";
import doctorsData from "@/content/doctors.json";
import equipmentData from "@/content/equipment.json";
import reviewsData from "@/content/reviews.json";
import promosData from "@/content/promos.json";
import type { Doctor, Equipment, PriceCategory, Promo, Review, Service } from "./types";

export { site };
export const services = servicesData as Service[];
export const prices = pricesData as PriceCategory[];
export const doctors = doctorsData as Doctor[];
export const equipment = equipmentData as Equipment[];
export const reviews = reviewsData as Review[];
export const promos = promosData as Promo[];

export const rootServices = services.filter((s) => !s.parent);
export const childrenOf = (slug: string) => services.filter((s) => s.parent === slug);
export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getPriceCategory = (id?: string) => prices.find((p) => p.id === id);

export const formatPrice = (n: number) =>
  `от ${new Intl.NumberFormat("ru-RU").format(n).replace(/ /g, " ")} ₽`;
