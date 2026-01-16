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
      // fieldsを絞りたい場合はここで:
      // fields: "id,title,coverImage,gallery,description,tags,featured,client",
    },
  });

  // microCMS側の未入力が混ざっても落ちないように軽く整形
  return (res.contents ?? []).map((w) => ({
    id: w.id,
    title: w.title ?? "",
    coverImage: w.coverImage,
    gallery: w.gallery ?? [],
    description: w.description ?? "",
    tags: w.tags ?? [],
    featured: !!w.featured,
    client: w.client ?? "",
  }));
}
