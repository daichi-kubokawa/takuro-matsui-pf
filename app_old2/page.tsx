// app/page.tsx
import WorksGallery from "./components/WorksGallery";
import { getTags } from "./lib/microcms/tags";
import { getWorksMerged } from "./lib/microcms/works";

export default async function Page() {
  const [{ works }, tags] = await Promise.all([getWorksMerged({}), getTags()]);

  return (
    <main className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-12 py-14">
      <WorksGallery works={works} tags={tags} linkMode="byKind" />
    </main>
  );
}
