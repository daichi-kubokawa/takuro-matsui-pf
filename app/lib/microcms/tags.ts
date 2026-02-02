import { cmsFetch } from "./client";
import type { MicroCMSListResponse, Tag } from "./types";

export async function getTags(): Promise<Tag[]> {
  const data = await cmsFetch<MicroCMSListResponse<Tag>>("/tags", {
    limit: "100",
  });
  return data.contents
    .filter((t) => t.isActive !== false)
    .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}
