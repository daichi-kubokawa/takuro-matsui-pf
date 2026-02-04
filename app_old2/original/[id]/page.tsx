// app/original/[id]/page.tsx
import { notFound } from "next/navigation";
import BackLink from "../../components/BackLink";
import { getWorkDetail } from "../../lib/microcms/works";

export default async function OriginalDetailPage(props: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ return?: string }>;
}) {
  const params = await props.params;
  const sp = props.searchParams ? await props.searchParams : undefined;

  let work;
  try {
    work = await getWorkDetail(params.id);
  } catch {
    notFound();
  }

  const returnTo = sp?.return ? decodeURIComponent(sp.return) : null;

  return (
    <main className="container-x py-10">
      <div className="mb-8">
        <BackLink returnTo={returnTo} fallbackHref="/original" />
      </div>

      {/* ORIGINAL は title / credit を表示しない */}
      <div className="space-y-6">
        {(work.images ?? []).map((img, i) => (
          <div key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.url} alt="" className="w-full h-auto block" />
          </div>
        ))}
      </div>
    </main>
  );
}
