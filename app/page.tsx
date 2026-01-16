import { getWorks } from "./lib/get-works";
import WorksPage from "./components/Works/WorksPage";

export const revalidate = 60;

export default async function Home() {
  const works = await getWorks();

  const tags = Array.from(new Set(works.flatMap((w) => w.tags ?? []))).sort(
    (a, b) => a.localeCompare(b, "ja")
  );

  return <WorksPage works={works} tags={tags} />;
}
