import { microcmsClient } from "../microcms";
import type { Tag } from "../../types/tag";
import type { MicroCMSListResponse } from "../../types/work";

export async function getTags(): Promise<Tag[]> {
  const data = await microcmsClient.get<MicroCMSListResponse<Tag>>({
    endpoint: "tags",
    queries: {
      limit: 100,
      orders: "sort",
    },
  });
  return data.contents ?? [];
}
