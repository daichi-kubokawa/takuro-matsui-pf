import { cmsFetch } from "./client";
import type { MicroCMSListResponse, Settings } from "./types";

function looksLikeSettings(x: unknown): x is Settings {
  if (!x || typeof x !== "object") return false;

  const obj = x as Record<string, unknown>;

  return (
    typeof obj.siteTitle === "string" && typeof obj.contactEmail === "string"
  );
}

export async function getSettings(): Promise<Settings> {
  const json = await cmsFetch<Settings | MicroCMSListResponse<Settings>>(
    "/settings",
    { limit: "1" },
  );

  if ("contents" in json && Array.isArray(json.contents)) {
    if (!json.contents[0]) {
      throw new Error("Settings not found (list is empty)");
    }
    return json.contents[0];
  }

  if (looksLikeSettings(json)) {
    return json;
  }

  throw new Error("Settings not found (unexpected response shape)");
}
