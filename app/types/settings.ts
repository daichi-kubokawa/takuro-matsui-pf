// app/types/settings.ts
import type { MicroCMSImage } from "./image";

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
