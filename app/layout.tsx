import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import { getSettings } from "@/lib/microcms/settings";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  const description =
    settings.metaDescription?.trim() || "Illustrator portfolio";

  return {
    title: siteTitle,
    description,
    icons: settings.favicon?.url
      ? {
          icon: settings.favicon.url,
          shortcut: settings.favicon.url,
          apple: settings.favicon.url,
        }
      : undefined,
    openGraph: {
      title: siteTitle,
      description,
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
      title: siteTitle,
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
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen antialiased">
        <div id="top" />

        <Header
          siteTitle={siteTitle}
          contactEmail={settings.contactEmail ?? null}
        />

        {children}

        <Footer />
      </body>
    </html>
  );
}
