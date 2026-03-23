import "server-only";
import { cmsFetch } from "./client";
import type { MicroCMSListResponse } from "./client";
import type { Work, WorkKind } from "./types";

const WORK_FIELDS =
  "id,title,titleJa,slug,kind,tags,thumbnail,images,clientName,clientNameJa,role,roleJa,year,isPublic,publishedAt,createdAt,updatedAt";

export async function getAllWorks(limit = 100) {
  const data = await cmsFetch<MicroCMSListResponse<Work>>("/works", {
    limit: String(limit),
    offset: "0",
    filters: "isPublic[equals]true",
    orders: "-publishedAt",
    fields: WORK_FIELDS,
  });

  return data.contents ?? [];
}

export async function getWorksByKind(kind: WorkKind, limit = 100) {
  const data = await cmsFetch<MicroCMSListResponse<Work>>("/works", {
    limit: String(limit),
    offset: "0",
    filters:
      `isPublic[equals]true[and]kind[equals]${kind}` +
      "[or]" +
      `isPublic[equals]true[and]kind[contains]${kind}`,
    orders: "-publishedAt",
    fields: WORK_FIELDS,
  });

  return data.contents ?? [];
}

export async function getWorkBySlug(slug: string) {
  const data = await cmsFetch<MicroCMSListResponse<Work>>("/works", {
    limit: "1",
    offset: "0",
    filters: `isPublic[equals]true[and]slug[equals]${slug}`,
    fields: WORK_FIELDS,
  });

  return data.contents?.[0] ?? null;
}
