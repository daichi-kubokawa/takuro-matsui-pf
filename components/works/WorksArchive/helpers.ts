import type { Work } from "@/lib/microcms/types";

export type ArchiveTagItem = {
  id: string;
  name: string;
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
        });
      }
    });
  });

  return Array.from(map.values());
}

export function filterWorksByTag(works: Work[], activeTag: string): Work[] {
  if (activeTag === "all") return works;

  return works.filter((work) => work.tags?.some((tag) => tag.id === activeTag));
}
