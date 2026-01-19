// app/types/about.ts
import type { MicroCMSImage } from "./image";

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
