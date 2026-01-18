import { getWorks } from "./lib/cms/works";
import WorksPage from "./components/Works/WorksPage";

export default async function HomePage() {
  const worksRes = await getWorks({ limit: 50 });
  return <WorksPage works={worksRes.contents} />;
}
