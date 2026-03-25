import "server-only";
import { cmsFetch } from "./client";
import type { MicroCMSListResponse } from "./client";
import type { Work, WorkKind } from "./types";

const WORK_FIELDS =
  "id,title,titleJa,slug,kind,tags,thumbnail,images,clientName,clientNameJa,credits,year,links,featuredOrder,isPublic,publishedAt,createdAt,updatedAt";

function getTimeValue(value?: string) {
  if (!value) return 0;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? 0 : time;
}

function sortWorksByDisplayOrder(works: Work[]) {
  return [...works].sort((a, b) => {
    const aFeatured = a.featuredOrder ?? Number.POSITIVE_INFINITY;
    const bFeatured = b.featuredOrder ?? Number.POSITIVE_INFINITY;

    if (aFeatured !== bFeatured) {
      return aFeatured - bFeatured;
    }

    const publishedDiff =
      getTimeValue(b.publishedAt) - getTimeValue(a.publishedAt);
    if (publishedDiff !== 0) {
      return publishedDiff;
    }

    const createdDiff = getTimeValue(b.createdAt) - getTimeValue(a.createdAt);
    if (createdDiff !== 0) {
      return createdDiff;
    }

    return a.id.localeCompare(b.id);
  });
}

export async function getAllWorks(limit = 100) {
  const data = await cmsFetch<MicroCMSListResponse<Work>>("/works", {
    limit: String(limit),
    offset: "0",
    filters: "isPublic[equals]true",
    orders: "-publishedAt",
    fields: WORK_FIELDS,
  });

  return sortWorksByDisplayOrder(data.contents ?? []);
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

  return sortWorksByDisplayOrder(data.contents ?? []);
}

export async function getWorkBySlug(slug: string) {
  const data = await cmsFetch<MicroCMSListResponse<Work>>("/works", {
    limit: "1",
    offset: "0",
    filters: `isPublic[equals]true[and]slug[equals]${slug}`,
    fields: WORK_FIELDS,
  });

  const work = data.contents?.[0] ?? null;
  return work;
}
