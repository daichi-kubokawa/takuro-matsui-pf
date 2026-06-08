import type { Metadata } from "next";
import {
  getAllWorks,
  getWorkBySlug,
  getWorksByKind,
} from "@/lib/microcms/works";
import { getSettings } from "@/lib/microcms/settings";
import WorkDetail from "@/components/works/WorkDetail/WorkDetail";
import type { Work } from "@/lib/microcms/types";
import styles from "./page.module.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{
    scope?: string;
    tag?: string;
  }>;
};

function getWorkTitle(work: Work) {
  return work.titleJa?.trim() || work.title?.trim() || "";
}

function buildDescription(baseText: string | undefined, title: string) {
  const text = baseText?.trim();

  if (!text) return undefined;

  if (title) {
    return `「${title}」の${text}`;
  }

  return text;
}

function getWorkDescription(
  work: Work,
  detailDescription: string | undefined,
  fallback: string,
) {
  const workTitle = getWorkTitle(work);

  return buildDescription(detailDescription, workTitle) || fallback;
}

function getWorkImage(work: Work) {
  if (work.thumbnail?.url?.trim()) {
    return work.thumbnail;
  }

  return work.images?.find((image) => image?.url?.trim()) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [work, settings] = await Promise.all([
    getWorkBySlug(slug),
    getSettings(),
  ]);

  const siteTitle = settings.siteTitle?.trim() || "Takuro Matsui";

  if (!work) {
    return {
      title: `Not found | ${siteTitle}`,
      alternates: {
        canonical: `/original/${slug}`,
      },
    };
  }

  const workTitle = getWorkTitle(work);
  const title = `${workTitle || "Original"} | ${siteTitle}`;
  const description = getWorkDescription(
    work,
    settings.originalDetailDesc,
    settings.metaDescription?.trim() || "Illustrator portfolio",
  );

  const image = getWorkImage(work);
  const ogImage = image?.url
    ? [
        {
          url: image.url,
          width: image.width,
          height: image.height,
        },
      ]
    : settings.ogImage?.url
      ? [
          {
            url: settings.ogImage.url,
            width: settings.ogImage.width,
            height: settings.ogImage.height,
          },
        ]
      : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: `/original/${work.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/original/${work.slug}`,
      images: ogImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage?.map((item) => item.url),
    },
  };
}

function filterWorksByTag(works: Work[], tag: string) {
  if (!tag || tag === "all") return works;

  return works.filter((work) =>
    work.tags?.some((t) => t.slug === tag || t.id === tag),
  );
}

function getDetailHref(work: Work, scope: string, tag: string) {
  const basePath = work.kind?.includes("original")
    ? `/original/${work.slug}`
    : `/works/${work.slug}`;

  const params = new URLSearchParams();
  params.set("scope", scope);

  if (tag !== "all") {
    params.set("tag", tag);
  }

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export default async function OriginalDetailPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { scope = "original", tag = "all" } = await searchParams;

  const work = await getWorkBySlug(slug);

  if (!work) {
    return <main className={styles.root}>Not found</main>;
  }

  let works: Work[] = [];

  if (scope === "all") {
    works = await getAllWorks();
  } else if (scope === "works") {
    works = await getWorksByKind("works");
  } else {
    works = await getWorksByKind("original");
  }

  const filteredWorks = filterWorksByTag(works, tag);
  const currentIndex = filteredWorks.findIndex((item) => item.id === work.id);

  const prevWork =
    currentIndex > 0
      ? {
          slug: filteredWorks[currentIndex - 1].slug,
          title: filteredWorks[currentIndex - 1].title,
          titleJa: filteredWorks[currentIndex - 1].titleJa,
          href: getDetailHref(filteredWorks[currentIndex - 1], scope, tag),
        }
      : null;

  const nextWork =
    currentIndex >= 0 && currentIndex < filteredWorks.length - 1
      ? {
          slug: filteredWorks[currentIndex + 1].slug,
          title: filteredWorks[currentIndex + 1].title,
          titleJa: filteredWorks[currentIndex + 1].titleJa,
          href: getDetailHref(filteredWorks[currentIndex + 1], scope, tag),
        }
      : null;

  const backHref =
    scope === "all"
      ? `/${tag !== "all" ? `?tag=${tag}` : ""}`
      : `/original${tag !== "all" ? `?tag=${tag}` : ""}`;

  return (
    <main className={styles.root}>
      <WorkDetail
        work={work}
        backHref={backHref}
        prevWork={prevWork}
        nextWork={nextWork}
      />
    </main>
  );
}
