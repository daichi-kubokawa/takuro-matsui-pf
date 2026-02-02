import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import { getSettings } from "@/lib/microcms";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const s = await getSettings();

    return {
      title: s.siteTitle,
      description: s.metaDescription ?? s.siteSubtitle,
      icons: s.favicon?.url ? { icon: s.favicon.url } : undefined,
      openGraph: s.ogImage?.url
        ? {
            title: s.siteTitle,
            images: [{ url: s.ogImage.url }],
          }
        : undefined,
    };
  } catch {
    // Settingsが取れない間も開発できるように最低限を返す
    return { title: "Portfolio" };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}
