import {
  getAllWorks,
  getWorkBySlug,
  getWorksByKind,
} from "@/lib/microcms/works";
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

function filterWorksByTag(works: Work[], tag: string) {
  if (!tag || tag === "all") return works;
  return works.filter((work) => work.tags?.some((t) => t.id === tag));
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
