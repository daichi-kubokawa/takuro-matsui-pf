import type { Work } from "@/lib/microcms/types";

export function getWorkKind(work: Work): "works" | "original" {
  const kind = work.kind?.[0];

  if (kind === "original") {
    return "original";
  }

  return "works";
}

export function getDetailHref(work: Work): string {
  const kind = getWorkKind(work);

  if (kind === "original") {
    return `/original/${work.slug}`;
  }

  return `/works/${work.slug}`;
}
