export type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type Settings = {
  brandName: string;
  siteTitle: string;
  siteDescription: string;
  footerNote: string;
  contactEmail: string;
  contactEmailLabel?: string;
  socialLinks?: SocialLink[];
  ogImage?: MicroCMSImage;
  favicon?: MicroCMSImage;
  robotsIndex: "index" | "noindex";
  themeDefault?: "light" | "dark";
  analyticsId?: string;
};

export type About = {
  title: string;
  body: string;
  profileImage?: MicroCMSImage;
  profileImageAlt?: string;
  clientsHeading?: string;
  clients?: string;
  awardsHeading?: string;
  awards?: string;
  exhibitionsHeading?: string;
  exhibitions?: string;
  showContact?: boolean;
  contactHeading?: string;
  contactText?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type Work = {
  id: string;
  title: string;
  coverImage?: MicroCMSImage;
  layout?: string | string[];
  gallery?: MicroCMSImage[];
  description?: string;
  tags?: string | string[];
  featured?: boolean;
  client?: string;
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
