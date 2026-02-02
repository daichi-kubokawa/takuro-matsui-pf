import WorksGallery from "./components/WorksGallery";
import { getTags, getWorksMerged } from "./lib/microcms";

export default async function Page() {
  const [{ works }, tags] = await Promise.all([getWorksMerged({}), getTags()]);

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "24px" }}>
      <WorksGallery works={works} tags={tags} basePath="/works" />
    </main>
  );
}
