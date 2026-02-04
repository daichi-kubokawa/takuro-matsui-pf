// app/lib/microcms/about.ts
import { cmsFetch } from "./client";
import type { About, MicroCMSListResponse } from "./types";

function looksLikeAbout(x: any): x is About {
  return (
    x &&
    typeof x === "object" &&
    typeof x.nameJa === "string" &&
    typeof x.nameEn === "string"
  );
}

export async function getAbout(): Promise<About> {
  const json = await cmsFetch<any>("/about", { limit: "1" });

  if (json?.contents && Array.isArray(json.contents)) {
    const data = json as MicroCMSListResponse<About>;
    if (!data.contents[0]) throw new Error("About not found (list is empty)");
    return data.contents[0];
  }

  if (json?.id && looksLikeAbout(json)) return json as About;
  if (looksLikeAbout(json)) return json as About;

  throw new Error(
    `About not found (unexpected response shape: ${Object.keys(json ?? {}).join(",")})`,
  );
}
