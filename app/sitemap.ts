import type { MetadataRoute } from "next";
import { getAllWorks } from "@/lib/microcms/works";

const SITE_URL = "https://takuromatsui.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getAllWorks();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/works`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/original`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const workRoutes: MetadataRoute.Sitemap = works.map((work) => {
    const isOriginal = work.kind?.includes("original");
    const path = isOriginal ? "original" : "works";

    return {
      url: `${SITE_URL}/${path}/${work.slug}`,
      lastModified: work.updatedAt ? new Date(work.updatedAt) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...workRoutes];
}
