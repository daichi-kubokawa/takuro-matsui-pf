// app/lib/microcms/types.ts

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
  order?: number;
  isActive?: boolean;
};

export type Work = {
  id: string;
  title?: string;
  credit?: string; // rich text => HTML string
  kind: "works" | "original";
  tags?: Tag[];
  year?: number;
  thumbnail: { url: string; width?: number; height?: number };
  images: { url: string; width?: number; height?: number }[];
  description?: string;
  searchText?: string;
  isPublic?: boolean;
  isPinned?: boolean;
  pinOrder?: number;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type About = {
  id: string;
  nameJa: string;
  nameEn: string;
  portrait?: { url: string; width?: number; height?: number };
  bioJa: string;
  bioEn?: string;
  awards?: { year: number; title: string; url?: string }[];
  clients?: { name: string; url?: string }[];
  exhibitions?: { year: number; title: string; place?: string; url?: string }[];
  contactTextJa: string;
  contactTextEn?: string;
};

export type Settings = {
  id: string;
  siteTitle: string;
  siteSubtitle?: string;
  defaultLanguage: "en" | "ja";

  contactEmail: string;
  instagramUrl?: string;

  // ✅ 追加：Footerで参照しているので型に足す
  copyrightText?: string;

  worksSortMode: "newest" | "random" | "manual";
  pinnedBehavior: "alwaysTop" | "sortModeOnly";
  itemsPerPage?: number;
  manualPickIds?: string; // newline separated work ids

  filterMode: "or" | "and";

  metaDescription?: string;
  ogImage?: { url: string; width?: number; height?: number };
};
