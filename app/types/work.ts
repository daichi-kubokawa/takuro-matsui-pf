import type { MicroCMSImage } from "./image";
import type { Tag } from "./tag";

export type WorkKind = "client" | "original";
export type WorkLayout = "normal" | "wide";

export type Work = {
  id: string;
  title: string;
  kind: WorkKind;

  clientName?: string;
  year?: number;

  coverImage: MicroCMSImage;

  tags?: Tag[];
  layout: WorkLayout;

  description?: string;
  body?: string;
  gallery?: MicroCMSImage[];
  externalUrl?: string;

  published: boolean;
  featured?: boolean;
  sort?: number;

  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
