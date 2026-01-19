export type TagCategory = "common" | "client" | "original";

export type Tag = {
  id: string;
  name: string;
  slug: string;
  category: TagCategory;
  sort?: number;
  description?: string;

  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
};
