export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type MicroCMSImage = {
  url: string;
  width?: number;
  height?: number;
};

export type WorkKind = "works" | "original";

export type Tag = {
  id: string;
  name: string;
  slug?: string;
  order?: number;
  isActive?: boolean;
};

export type WorkCredit = {
  role: string;
  name: string;
};

export type WorkLink = {
  label: string;
  url: string;
};

export type Work = {
  id: string;
  title: string;
  titleJa?: string;
  slug: string;
  kind?: string[];
  tags?: Tag[];
  thumbnail?: MicroCMSImage;
  images?: MicroCMSImage[];
  clientName?: string;
  clientNameJa?: string;
  credits?: WorkCredit[];
  year?: number;
  links?: WorkLink[];
  featuredOrder?: number;
  isPublic?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type AboutAward = {
  year: number;
  title: string;
  url?: string;
};

export type AboutClient = {
  name: string;
  url?: string;
};

export type AboutExhibition = {
  year: number;
  title: string;
  place?: string;
  url?: string;
};

export type About = {
  id: string;
  nameJa: string;
  nameEn?: string;
  portrait?: MicroCMSImage;
  bioJa: string;
  bioEn?: string;
  awards?: AboutAward[];
  clients?: AboutClient[];
  exhibitions?: AboutExhibition[];
  contactTextJa?: string;
  contactTextEn?: string;
};

export type Settings = {
  id: string;
  siteTitle: string;
  siteSubtitle?: string;
  contactEmail: string;
  instagramUrl?: string;
  copyrightText?: string;
  metaDescription?: string;
  ogImage?: MicroCMSImage;
  favicon?: MicroCMSImage;
};
