import { notFound } from "next/navigation";
import { getWorkById } from "@/app/lib/cms/works";
import WorkDetail from "./components/WorkDetail";

export default async function WorkDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const work = await getWorkById(params.id);
  if (!work) notFound();
  return <WorkDetail work={work} />;
}
