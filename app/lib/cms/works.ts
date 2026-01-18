import { microcmsClient } from "../microcms";
import type { MicroCMSListResponse, Work } from "../../types/work";

export async function getWorks(params?: {
  limit?: number;
  offset?: number;
}): Promise<MicroCMSListResponse<Work>> {
  return await microcmsClient.getList<Work>({
    endpoint: "works",
    queries: {
      limit: params?.limit ?? 50,
      offset: params?.offset ?? 0,
      orders: "-publishedAt",
    },
  });
}
