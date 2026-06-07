import type { Metadata } from "next";
import { getAbout } from "@/lib/microcms/about";
import { getSettings } from "@/lib/microcms/settings";
import AboutPage from "@/components/About/AboutPage/AboutPage";
import styles from "./page.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteTitle = settings.siteTitle?.trim() || "Takuro Matsui";
  const description =
    settings.aboutDesc?.trim() ||
    settings.metaDescription?.trim() ||
    "イラストレーターTakuro Matsuiのプロフィールページ。";

  return {
    title: `ABOUT | ${siteTitle}`,
    description,
    alternates: {
      canonical: "/about",
    },
    openGraph: {
      title: `ABOUT | ${siteTitle}`,
      description,
      url: "/about",
      images: settings.ogImage?.url
        ? [
            {
              url: settings.ogImage.url,
              width: settings.ogImage.width,
              height: settings.ogImage.height,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `ABOUT | ${siteTitle}`,
      description,
      images: settings.ogImage?.url ? [settings.ogImage.url] : undefined,
    },
  };
}

export default async function Page() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);

  return (
    <main className={styles.root}>
      <AboutPage about={about} settings={settings} />
    </main>
  );
}
