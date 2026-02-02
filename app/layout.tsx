import "./globals.css";
import Header from "./components/Header/Header";
import { getSettings } from "./lib/microcms";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="ja">
      <body className="m-0">
        <Header
          siteTitle={settings.siteTitle}
          contactEmail={settings.contactEmail}
        />
        {children}
      </body>
    </html>
  );
}
