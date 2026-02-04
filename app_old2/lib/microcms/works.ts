import "server-only";
import type { Work, Settings } from "./types";
import { cmsFetch, type MicroCMSListResponse } from "./client";
import { getSettings } from "./settings";

function normalizePublishedAt(w: Work) {
  return w.publishedAt ?? w.createdAt ?? "1970-01-01T00:00:00.000Z";
}

function normalizeKind(kind: unknown): "works" | "original" | "unknown" {
  if (typeof kind !== "string") return "unknown";
  const k = kind.trim().toLowerCase();
  if (k === "works") return "works";
  if (k === "original") return "original";
  return "unknown";
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function applyManualOrder(works: Work[], manualPickIds?: string) {
  if (!manualPickIds) return works;

  const ids = manualPickIds
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  if (ids.length === 0) return works;

  const map = new Map(works.map((w) => [w.id, w]));
  const picked: Work[] = [];
  ids.forEach((id) => {
    const w = map.get(id);
    if (w) picked.push(w);
  });

  const rest = works
    .filter((w) => !ids.includes(w.id))
    .sort((a, b) =>
      normalizePublishedAt(b).localeCompare(normalizePublishedAt(a)),
    );

  return [...picked, ...rest];
}

export async function getWorksMerged(params?: { kind?: "works" | "original" }) {
  const settings: Settings = await getSettings();

  // ✅ kind を必ず取得（ALLでも byKind ルーティングに必要）
  const fields =
    "id,title,credit,kind,tags,year,thumbnail,images,description,searchText,isPublic,isPinned,pinOrder,publishedAt,createdAt,updatedAt";

  // ✅ ここ重要：microCMS filters では kind 絞り込みしない（値揺れ吸収のため）
  const publicFilter = `isPublic[equals]true`;
  const pinnedFilter = `${publicFilter}[and]isPinned[equals]true`;
  const normalFilter = `${publicFilter}[and]isPinned[not_equals]true`;

  const limit = settings.itemsPerPage ? String(settings.itemsPerPage) : "100";

  const pinnedRes = await cmsFetch<MicroCMSListResponse<Work>>("/works", {
    limit,
    filters: pinnedFilter,
    orders: "pinOrder,-publishedAt",
    fields,
  });

  const normalRes = await cmsFetch<MicroCMSListResponse<Work>>("/works", {
    limit,
    filters: normalFilter,
    orders: "-publishedAt",
    fields,
  });

  const pinned = pinnedRes.contents || [];
  let normal = normalRes.contents || [];

  if (settings.worksSortMode === "random") {
    normal = shuffle(normal);
  } else if (settings.worksSortMode === "manual") {
    normal = applyManualOrder(normal, settings.manualPickIds);
  }

  const usePinnedTop =
    settings.pinnedBehavior === "alwaysTop" ||
    (settings.pinnedBehavior === "sortModeOnly" &&
      settings.worksSortMode === "newest");

  let merged = usePinnedTop ? [...pinned, ...normal] : normal;

  // ✅ 最後に JS で kind フィルタ（値揺れに強い）
  if (params?.kind) {
    merged = merged.filter(
      (w) => normalizeKind((w as any).kind) === params.kind,
    );
  }

  return { settings, works: merged };
}

export async function getWorkDetail(id: string): Promise<Work> {
  return await cmsFetch<Work>(`/works/${id}`, {
    fields:
      "id,title,credit,kind,tags,year,thumbnail,images,description,searchText,isPublic,isPinned,pinOrder,publishedAt,createdAt,updatedAt",
  });
}
