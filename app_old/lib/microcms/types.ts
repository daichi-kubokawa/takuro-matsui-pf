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

export type ImageField = { url: string; width?: number; height?: number };

export type Work = {
  id: string;
  title?: string;
  credit?: string;
  kind: "works" | "original";
  tags?: Tag[];
  year?: number;
  thumbnail: ImageField;
  images: ImageField[];
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
  portrait?: ImageField;
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

  worksSortMode: "newest" | "random" | "manual";
  pinnedBehavior: "alwaysTop" | "sortModeOnly";
  itemsPerPage?: number;
  manualPickIds?: string;

  filterMode: "or" | "and";

  metaDescription?: string;
  ogImage?: ImageField;
  favicon?: ImageField;
};
