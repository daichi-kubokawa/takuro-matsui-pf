import "./globals.css";
import type { Metadata } from "next";
import { getSettings } from "./lib/cms/settings";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();

  const isNoIndex = s.robotsIndex === "noindex";

  return {
    title: {
      default: s.siteTitle,
      template: `%s | ${s.brandName}`,
    },
    description: s.siteDescription,
    robots: {
      index: !isNoIndex,
      follow: !isNoIndex,
      googleBot: {
        index: !isNoIndex,
        follow: !isNoIndex,
      },
    },
    openGraph: {
      title: s.siteTitle,
      description: s.siteDescription,
      type: "website",
      images: s.ogImage?.url ? [{ url: s.ogImage.url }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: s.siteTitle,
      description: s.siteDescription,
      images: s.ogImage?.url ? [s.ogImage.url] : undefined,
    },
    icons: s.favicon?.url
      ? {
          icon: [{ url: s.favicon.url }],
          shortcut: [{ url: s.favicon.url }],
        }
      : undefined,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const s = await getSettings();

  return (
    <html lang="ja">
      <body>
        <Header
          brandName={s.brandName}
          contactEmail={s.contactEmail}
          contactEmailLabel={s.contactEmailLabel}
        />
        <div className="content">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
