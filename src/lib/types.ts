export interface Img {
  src?: string;
  alt: string;
  placeholder?: boolean;
}

export interface PriceItem {
  name: string;
  price: number;
}

export interface PriceCategory {
  id: string;
  title: string;
  items: PriceItem[];
}

export interface ServiceChild {
  slug: string;
  title: string;
}

export interface ServiceBlock {
  type: "qualities" | "rich-text" | "timeline" | "seo-text";
  title?: string;
  paragraphs?: string[];
  items?: string[];
}

export interface Service {
  slug: string;
  title: string;
  parent?: string;
  priceFrom?: string;
  short: string;
  lead?: string[];
  priceCategory?: string;
  description?: { title: string; paragraphs: string[] };
  blocks?: ServiceBlock[];
  seo: { title: string; description: string };
}

export interface Doctor {
  slug: string;
  name: string;
  experience: string;
  role: string;
  specs: string[];
  treatments: string[];
  education: string[];
  photo: Img;
}

export interface Equipment {
  title: string;
  text: string;
  list?: string[];
}

export interface Review {
  date: string;
  author: string;
  source: "yandex" | "2gis" | "zoon";
  rating: number;
  text: string;
  placeholder?: boolean;
}

export interface Promo {
  id: string;
  badge: string;
  title: string;
  note: string;
}
