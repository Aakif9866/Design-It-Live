import type { MetadataRoute } from "next";
import { LESSONS } from "@/lib/course";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/plan", "/cheatsheet", "/glossary", ...LESSONS.map((l) => `/lessons/${l.slug}`)];
  return pages.map((p) => ({ url: `${SITE_URL}${p}` }));
}
