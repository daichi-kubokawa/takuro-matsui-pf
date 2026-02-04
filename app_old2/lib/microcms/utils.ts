import type { Work } from "./types";

export function normalizePublishedAt(w: Work) {
  return w.publishedAt ?? w.createdAt ?? "1970-01-01T00:00:00.000Z";
}

export function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function applyManualOrder(works: Work[], manualPickIds?: string) {
  if (!manualPickIds) return works;
  const ids = manualPickIds
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  if (ids.length === 0) return works;

  const map = new Map(works.map((w) => [w.id, w]));
  const picked = ids.map((id) => map.get(id)).filter(Boolean) as Work[];
  const rest = works
    .filter((w) => !ids.includes(w.id))
    .sort((a, b) =>
      normalizePublishedAt(b).localeCompare(normalizePublishedAt(a)),
    );
  return [...picked, ...rest];
}
