import { getAllWorks } from "@/app/lib/cms/works";
import { getTags } from "@/app/lib/cms/tags";
import WorksPage from "@/app/works/components/WorksPage";

export default async function OriginalIndexPage() {
  const [works, tags] = await Promise.all([getAllWorks(), getTags()]);

  const filtered = (works ?? []).filter(
    (w) => String(w.kind ?? "").trim() === "original",
  );

  return <WorksPage works={filtered} tags={tags} title="ORIGINAL" />;
}
