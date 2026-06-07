import type { Work } from "@/lib/microcms/types";

export type ArchiveTagItem = {
  id: string;
  name: string;
  slug?: string;
  order?: number;
};

export function getAvailableTags(works: Work[]): ArchiveTagItem[] {
  const map = new Map<string, ArchiveTagItem>();

  works.forEach((work) => {
    work.tags?.forEach((tag) => {
      if (!tag.id || !tag.name) return;

      if (!map.has(tag.id)) {
        map.set(tag.id, {
          id: tag.id,
          name: tag.name,
          slug: tag.slug,
          order: tag.order,
        });
      }
    });
  });

  return Array.from(map.values()).sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999),
  );
}

export function filterWorksByTag(works: Work[], tag: string) {
  if (!tag || tag === "all") return works;

  return works.filter((work) =>
    work.tags?.some((t) => t.slug === tag || t.id === tag),
  );
}
