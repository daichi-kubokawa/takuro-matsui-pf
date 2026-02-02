import WorksGallery from "@/components/WorksGallery";
import { getTags, getWorksMerged } from "@/lib/microcms";

export default async function Page() {
  const [{ settings, works }, tags] = await Promise.all([
    getWorksMerged({}),
    getTags(),
  ]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <WorksGallery works={works} tags={tags} settings={settings} />
    </main>
  );
}
