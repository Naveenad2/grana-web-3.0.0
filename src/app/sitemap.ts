import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${site.url}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [`${site.url}/images/story/hero-pizza.jpg`],
    },
    {
      url: `${site.url}/menu`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [`${site.url}/images/menu/margherita.jpg`, `${site.url}/images/menu/white-funghi.jpg`],
    },
  ];
}
