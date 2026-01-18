import type { MetadataRoute } from "next";

export const runtime = "edge";

export default function sitemap(): MetadataRoute.Sitemap {
  // カスタムドメイン導入したらここを差し替える
  const baseUrl = "https://takuro-matsui-pf.info-net-dkubo.workers.dev";

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
  ];
}
