// app/page.tsx
import WorksGallery from "./components/WorksGallery";
import { getTags } from "./lib/microcms/tags";
import { getWorksMerged } from "./lib/microcms/works";

export default async function Page() {
  const [{ works }, tags] = await Promise.all([getWorksMerged({}), getTags()]);

  return (
    <main className="container-x py-14">
      <WorksGallery works={works} tags={tags} />
    </main>
  );
}
