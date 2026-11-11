import type { MetadataRoute } from "next";
import { CHARACTERS } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hugmonster.kr";
  const staticPages = [
    "",
    "/about",
    "/characters",
    "/service",
    "/package",
    "/portfolio",
    "/how-it-works",
    "/contact",
    "/privacy",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const characterEntries: MetadataRoute.Sitemap = CHARACTERS.map((char) => ({
    url: `${baseUrl}/characters/${char.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...characterEntries];
}
