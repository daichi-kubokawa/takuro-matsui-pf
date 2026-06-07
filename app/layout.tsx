import type { Metadata } from "next";
import { Roboto, Noto_Sans_JP } from "next/font/google";
import { Suspense } from "react";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import { getSettings } from "@/lib/microcms/settings";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  const siteTitle = settings.siteTitle?.trim() || "Takuro Matsui";
  const seoSiteTitle = settings.seoSiteTitle?.trim() || siteTitle;
  const description =
    settings.metaDescription?.trim() ||
    "Takuro Matsuiのイラストレーションポートフォリオサイト。";

  return {
    metadataBase: new URL("https://takuromatsui.com"),
    title: seoSiteTitle,
    description,
    alternates: {
      canonical: "/",
    },
    icons: settings.favicon?.url
      ? {
          icon: settings.favicon.url,
          shortcut: settings.favicon.url,
          apple: settings.favicon.url,
        }
      : undefined,
    openGraph: {
      title: seoSiteTitle,
      description,
      url: "/",
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
      title: seoSiteTitle,
      description,
      images: settings.ogImage?.url ? [settings.ogImage.url] : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const siteTitle = settings.siteTitle?.trim() || "Takuro Matsui";

  return (
    <html lang="ja" className={`${roboto.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen antialiased">
        <div id="top" />

        <Suspense fallback={null}>
          <Header
            siteTitle={siteTitle}
            contactEmail={settings.contactEmail ?? null}
          />
        </Suspense>

        {children}

        <Footer />
      </body>
    </html>
  );
}
