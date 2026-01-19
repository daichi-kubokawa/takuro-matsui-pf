import { microcmsClient } from "../microcms";
import type { Work, MicroCMSListResponse } from "../../types/work";

export async function getAllWorks(): Promise<Work[]> {
  const limit = 100;

  const first = await microcmsClient.get<MicroCMSListResponse<Work>>({
    endpoint: "works",
    queries: {
      limit,
      offset: 0,
      filters: "published[equals]true",
      orders: "sort,publishedAt",
    },
  });

  const pages = Math.ceil(first.totalCount / limit);
  if (pages <= 1) return first.contents ?? [];

  const rest = await Promise.all(
    Array.from({ length: pages - 1 }, (_, i) => {
      const offset = limit * (i + 1);
      return microcmsClient.get<MicroCMSListResponse<Work>>({
        endpoint: "works",
        queries: {
          limit,
          offset,
          filters: "published[equals]true",
          orders: "sort,publishedAt",
        },
      });
    }),
  );

  return [first, ...rest].flatMap((r) => r.contents ?? []);
}

export async function getWorkById(id: string): Promise<Work | null> {
  try {
    const data = await microcmsClient.get<Work>({
      endpoint: "works",
      contentId: id,
    });

    if (!data?.published) return null;
    if (!data?.coverImage?.url) return null;

    return data;
  } catch {
    return null;
  }
}
