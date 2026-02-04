// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import Header from "./components/Header/Header";
import { getSettings } from "./lib/microcms/settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="en" className={`${inter.variable} ${noto.variable}`}>
      <body>
        <Header
          siteTitle={settings.siteTitle}
          contactEmail={settings.contactEmail}
        />
        {children}
      </body>
    </html>
  );
}
