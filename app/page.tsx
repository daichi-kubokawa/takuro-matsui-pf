import WorksGallery from "./components/WorksGallery";
import { getTags, getWorksMerged } from "./lib/microcms";

export default async function Page() {
  const [{ works }, tags] = await Promise.all([getWorksMerged({}), getTags()]);

  return (
    <main className="container-x py-14">
      <WorksGallery works={works} tags={tags} basePath="/works" />
    </main>
  );
}
