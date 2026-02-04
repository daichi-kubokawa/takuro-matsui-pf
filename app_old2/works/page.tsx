// app/works/page.tsx
import WorksGallery from "../components/WorksGallery";
import { getTags } from "../lib/microcms/tags";
import { getWorksMerged } from "../lib/microcms/works";

function normalizeKind(kind: unknown): "works" | "original" | "unknown" {
  if (typeof kind === "string") {
    const k = kind.trim().toLowerCase();
    if (k === "works") return "works";
    if (k === "original") return "original";
  }
  if (Array.isArray(kind)) {
    const joined = kind
      .filter((v) => typeof v === "string")
      .map((v) => v.trim().toLowerCase());
    if (joined.includes("works")) return "works";
    if (joined.includes("original")) return "original";
  }
  return "unknown";
}

export default async function WorksPage() {
  const [{ works }, tags] = await Promise.all([getWorksMerged({}), getTags()]);
  const onlyWorks = works.filter(
    (w) => normalizeKind((w as any).kind) === "works",
  );

  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-12 py-14">
      <WorksGallery works={onlyWorks} tags={tags} linkMode="fixedWorks" />
    </main>
  );
}
