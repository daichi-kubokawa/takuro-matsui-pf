import { getAllWorks } from "@/app/lib/cms/works";
import { getTags } from "@/app/lib/cms/tags";
import WorksPage from "./components/WorksPage";

export default async function WorksIndexPage() {
  const [works, tags] = await Promise.all([getAllWorks(), getTags()]);
  return <WorksPage works={works} tags={tags} />;
}
