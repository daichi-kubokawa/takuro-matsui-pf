import "server-only";

const DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_API_KEY;

if (!DOMAIN || !API_KEY) {
  throw new Error("Missing MICROCMS_SERVICE_DOMAIN or MICROCMS_API_KEY");
}

const base = `https://${DOMAIN}.microcms.io/api/v1`;

export async function cmsFetch<T>(path: string, qs?: Record<string, string>) {
  const url = new URL(`${base}${path}`);
  if (qs) Object.entries(qs).forEach(([k, v]) => url.searchParams.set(k, v));

  const headers = { "X-MICROCMS-API-KEY": API_KEY };

  // ローカルdevでmicroCMSがタイムアウトすることがあるので、少し強めにする
  const MAX_RETRY = 3;
  const TIMEOUT_MS = 20000;

  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_RETRY; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(url.toString(), {
        headers,
        signal: controller.signal,
        // devで変に掴むのを避けつつ、prodはrevalidateでOK
        cache: process.env.NODE_ENV === "development" ? "no-store" : undefined,
        next:
          process.env.NODE_ENV === "development"
            ? undefined
            : { revalidate: 60 },
      });

      clearTimeout(timer);

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`microCMS error ${res.status}: ${text}`);
      }

      return (await res.json()) as T;
    } catch (e) {
      clearTimeout(timer);
      lastError = e;

      if (attempt === MAX_RETRY) break;

      // ちょい待って再試行（指数バックオフ）
      const wait = 300 * Math.pow(2, attempt - 1);
      await new Promise((r) => setTimeout(r, wait));
    }
  }

  throw lastError instanceof Error ? lastError : new Error(String(lastError));
}
