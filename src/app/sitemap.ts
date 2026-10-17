import type { MetadataRoute } from "next";
import { doctors, services } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ibic.clinic";
  const fixed = ["/", "/about/", "/services/", "/prices/", "/doctors/", "/promo/", "/contacts/", "/privacy/"];
  return [
    ...fixed,
    ...services.map((s) => `/services/${s.slug}/`),
    ...doctors.map((d) => `/doctors/${d.slug}/`),
  ].map((p) => ({ url: base + p }));
}
