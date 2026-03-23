import { cmsFetch } from "./client";
import type { About, MicroCMSListResponse } from "./types";

function looksLikeAbout(x: unknown): x is About {
  if (!x || typeof x !== "object") return false;

  const obj = x as Record<string, unknown>;

  return typeof obj.nameJa === "string" && typeof obj.bioJa === "string";
}

export async function getAbout(): Promise<About> {
  const json = await cmsFetch<About | MicroCMSListResponse<About>>("/about", {
    limit: "1",
  });

  if ("contents" in json && Array.isArray(json.contents)) {
    if (!json.contents[0]) {
      throw new Error("About not found (list is empty)");
    }
    return json.contents[0];
  }

  if (looksLikeAbout(json)) {
    return json;
  }

  throw new Error("About not found (unexpected response shape)");
}
