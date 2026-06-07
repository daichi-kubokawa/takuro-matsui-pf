import type { Metadata } from "next";
import { Suspense } from "react";
import { getWorksByKind } from "@/lib/microcms/works";
import { getSettings } from "@/lib/microcms/settings";
import ScrollRestore from "@/components/works/ScrollRestore/ScrollRestore";
import WorksArchive from "@/components/works/WorksArchive/WorksArchive";
import PageIntro from "@/components/works/PageIntro/PageIntro";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteTitle = settings.siteTitle?.trim() || "Takuro Matsui";
  const description =
    settings.worksDesc?.trim() ||
    settings.metaDescription?.trim() ||
    "Takuro Matsuiの制作実績一覧。";

  return {
    title: `WORKS | ${siteTitle}`,
    description,
    alternates: {
      canonical: "/works",
    },
    openGraph: {
      title: `WORKS | ${siteTitle}`,
      description,
      url: "/works",
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
      title: `WORKS | ${siteTitle}`,
      description,
      images: settings.ogImage?.url ? [settings.ogImage.url] : undefined,
    },
  };
}

export default async function WorksPage() {
  const works = await getWorksByKind("works");

  return (
    <main className="min-h-[85vh] px-4 py-0 lg:px-6">
      <div className="block lg:hidden">
        <PageIntro title="WORKS" />
      </div>

      <Suspense fallback={null}>
        <ScrollRestore />
        <WorksArchive works={works} scope="works" />
      </Suspense>
    </main>
  );
}
