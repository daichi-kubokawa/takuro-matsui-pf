import type { MetadataRoute } from "next";
import { getSettings } from "./lib/cms/settings";

export const runtime = "edge";
export const revalidate = 60;

export default async function robots(): Promise<MetadataRoute.Robots> {
  const s = await getSettings();

  const allowIndex = s.robotsIndex === "index";
  return {
    rules: [
      {
        userAgent: "*",
        allow: allowIndex ? "/" : "",
        disallow: allowIndex ? "" : "/",
      },
    ],
  };
}
