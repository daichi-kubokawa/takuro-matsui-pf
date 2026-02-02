import "server-only";

const DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

if (!DOMAIN || !API_KEY) {
  throw new Error("Missing MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY");
}

const base = `https://${DOMAIN}.microcms.io/api/v1`;

// ✅ 追加：API_KEY を string として固定
const MICROCMS_API_KEY: string = API_KEY;

export async function cmsFetch<T>(path: string, qs?: Record<string, string>) {
  const url = new URL(`${base}${path}`);
  if (qs) Object.entries(qs).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    // ✅ ここを MICROCMS_API_KEY にする
    headers: { "X-MICROCMS-API-KEY": MICROCMS_API_KEY },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`microCMS error ${res.status}: ${await res.text()}`);
  }
  return (await res.json()) as T;
}
