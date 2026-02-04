import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { getSettings } from "./lib/microcms/settings";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Takuro Matsui",
  description: "Illustrator portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();
  const siteTitle = settings.siteTitle?.trim() || "Takuro Matsui";

  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen bg-white text-neutral-900 antialiased">
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
