import { cmsFetch } from "./client";
import { getSettings } from "./settings";
import type { MicroCMSListResponse, Work } from "./types";
import { shuffle, applyManualOrder } from "./utils";

export async function getWorksMerged(params: { kind?: "works" | "original" }) {
  const settings = await getSettings();

  const kindFilter = params.kind ? `[and]kind[equals]${params.kind}` : "";
  const publicFilter = `isPublic[equals]true`;

  const pinnedFilter = `${publicFilter}${kindFilter}[and]isPinned[equals]true`;
  const normalFilter = `${publicFilter}${kindFilter}[and]isPinned[not_equals]true`;

  const limit = settings.itemsPerPage ? String(settings.itemsPerPage) : "100";
  const fields =
    "id,title,credit,kind,tags,year,thumbnail,images,description,searchText,isPublic,isPinned,pinOrder,publishedAt,createdAt,updatedAt";

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

  if (settings.worksSortMode === "random") normal = shuffle(normal);
  if (settings.worksSortMode === "manual")
    normal = applyManualOrder(normal, settings.manualPickIds);

  const usePinnedTop =
    settings.pinnedBehavior === "alwaysTop" ||
    (settings.pinnedBehavior === "sortModeOnly" &&
      settings.worksSortMode === "newest");

  return { settings, works: usePinnedTop ? [...pinned, ...normal] : normal };
}

export async function getWorkDetail(id: string): Promise<Work> {
  return await cmsFetch<Work>(`/works/${id}`);
}
