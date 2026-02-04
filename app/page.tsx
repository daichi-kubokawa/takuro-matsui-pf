import WorksMasonry from "./components/WorksMasonry";
import { getWorksMerged } from "./lib/microcms/works";

function normalizeKind(kind: unknown): "works" | "original" | "unknown" {
  if (typeof kind === "string") {
    const k = kind.trim().toLowerCase();
    if (k === "works") return "works";
    if (k === "original") return "original";
  }
  if (Array.isArray(kind)) {
    const arr = kind
      .filter((v) => typeof v === "string")
      .map((v) => v.trim().toLowerCase());
    if (arr.includes("works")) return "works";
    if (arr.includes("original")) return "original";
  }
  return "unknown";
}

export default async function Page() {
  const { works } = await getWorksMerged({});

  const masonryWorks = works
    .map((w) => {
      const image = w.thumbnail?.url ?? w.images?.[0]?.url ?? null;

      if (!image) return null;

      const kind = normalizeKind((w as any).kind);
      if (kind === "unknown") return null;

      return {
        id: w.id,
        image,
        kind, // ★ ALLページでは works / original 両方を渡す
      };
    })
    .filter(Boolean) as {
    id: string;
    image: string;
    kind: "works" | "original";
  }[];

  return (
    <main className="px-4 md:px-12 py-14">
      <WorksMasonry works={masonryWorks} />
    </main>
  );
}
