// app/lib/microcms/settings.ts
import { cmsFetch } from "./client";
import type { MicroCMSListResponse, Settings } from "./types";

function looksLikeSettings(x: any): x is Settings {
  return (
    x &&
    typeof x === "object" &&
    typeof x.siteTitle === "string" &&
    typeof x.contactEmail === "string"
  );
}

export async function getSettings(): Promise<Settings> {
  const json = await cmsFetch<any>("/settings", { limit: "1" });

  // ✅ list型（contentsあり）
  if (json?.contents && Array.isArray(json.contents)) {
    const data = json as MicroCMSListResponse<Settings>;
    if (!data.contents[0])
      throw new Error("Settings not found (list is empty)");
    return data.contents[0];
  }

  // ✅ singleton型（idあり）
  if (json?.id && looksLikeSettings(json)) {
    return json as Settings;
  }

  // ✅ object型（idなし / fields直下）
  if (looksLikeSettings(json)) {
    return json as Settings;
  }

  // ここまで来たら本当に想定外
  throw new Error(
    `Settings not found (unexpected response shape: ${Object.keys(json ?? {}).join(",")})`,
  );
}
