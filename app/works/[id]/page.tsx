import { getWorkDetail } from "@/lib/microcms";
import { notFound } from "next/navigation";

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const work = await getWorkDetail(id);

    return (
      <main className="mx-auto max-w-4xl px-6 py-14">
        {work.images?.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={`${img.url}-${i}`}
            src={img.url}
            alt={work.title ?? "work"}
          />
        ))}
      </main>
    );
  } catch (e: any) {
    // microCMSが404の時はNextの404ページへ
    if (String(e?.message ?? "").includes("microCMS error 404")) notFound();
    throw e;
  }
}
