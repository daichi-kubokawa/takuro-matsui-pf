import "server-only";
import { cmsFetch } from "./client";
import type { MicroCMSListResponse } from "./client";
import type { Tag } from "./types";

export async function getActiveTags() {
  const fields = "id,name,slug,order,isActive";

  const data = await cmsFetch<MicroCMSListResponse<Tag>>("/tags", {
    limit: "100",
    offset: "0",
    filters: "isActive[equals]true",
    orders: "order",
    fields,
  });

  return data.contents ?? [];
}
