// app/lib/microcms/client.ts
import "server-only";
export type { MicroCMSListResponse } from "./types";
const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

function getRequiredEnv(name: string, value: string | undefined) {
  if (!value || value.trim() === "") {
    throw new Error(
      `[microCMS] Missing environment variable: ${name}. ` +
        `Cloudflare Pages > Settings > Environment variables に設定してください。`,
    );
  }
  return value.trim();
}

const serviceDomain = getRequiredEnv("MICROCMS_SERVICE_DOMAIN", SERVICE_DOMAIN);
const apiKey = getRequiredEnv("MICROCMS_API_KEY", API_KEY);

export async function cmsFetch<T>(
  endpoint: string,
  query?: Record<string, string | number | undefined>,
): Promise<T> {
  const url = new URL(`https://${serviceDomain}.microcms.io/api/v1${endpoint}`);

  if (query) {
    Object.entries(query).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      url.searchParams.set(k, String(v));
    });
  }

  // ✅ ここが今回のビルド落ちの原因を潰す：string しか入らない headers を作る
  const headers: Record<string, string> = {
    "X-MICROCMS-API-KEY": apiKey,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url.toString(), {
      headers,
      signal: controller.signal,
      cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
      next:
        process.env.NODE_ENV === "development" ? undefined : { revalidate: 60 },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`microCMS error ${res.status}: ${text}`);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}
