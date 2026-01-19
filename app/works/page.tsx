import { getAllWorks } from "@/app/lib/cms/works";
import { getTags } from "@/app/lib/cms/tags";
import WorksPage from "./components/WorksPage";

export default async function WorksIndexPage() {
  const [works, tags] = await Promise.all([getAllWorks(), getTags()]);

  const filtered = (works ?? []).filter(
    (w) => String(w.kind ?? "").trim() === "client",
  );

  return <WorksPage works={filtered} tags={tags} title="WORKS" />;
}
