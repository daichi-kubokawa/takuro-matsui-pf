import type { Work } from "../types/work";
import { microcmsClient } from "./microcms";

type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export async function getWorks(): Promise<Work[]> {
  const res = await microcmsClient.get<MicroCMSListResponse<Work>>({
    endpoint: "works",
    queries: {
      limit: 100,
      orders: "-createdAt",
      // fieldsを絞るなら layout も必ず入れる
      // fields: "id,title,coverImage,gallery,description,tags,featured,client,layout",
    },
  });

  return (res.contents ?? []).map((w) => ({
    id: w.id,
    title: w.title ?? "",
    coverImage: w.coverImage,
    gallery: w.gallery ?? [],
    description: w.description ?? "",
    tags: w.tags ?? [],
    featured: !!w.featured,
    client: w.client ?? "",

    // ✅ 追加（未入力は normal 扱い）
    layout: (w.layout ?? "normal") as "normal" | "wide",
  }));
}
