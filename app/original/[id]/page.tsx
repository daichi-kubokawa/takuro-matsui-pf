import Link from "next/link";
import { getWorkDetail } from "../../lib/microcms/works";

export default async function OriginalDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;

  const work = await getWorkDetail(id);

  // ✅ from があるならそれを使う
  // ✅ 無い場合は /original をフォールバック（ALLに戻さない）
  const backTo =
    sp?.from && typeof sp.from === "string" && sp.from.trim().length > 0
      ? sp.from
      : "/original";

  const images = work.images?.length
    ? work.images
    : work.thumbnail
      ? [work.thumbnail]
      : [];

  return (
    <main className="px-4 md:px-12 py-14">
      {/* Back */}
      <Link
        href={backTo}
        className="mb-8 inline-block text-sm opacity-70 hover:opacity-100"
      >
        ← Back
      </Link>

      {/* ORIGINALはタイトル・クレジットを出さない */}

      <div className="space-y-6">
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={img.url} alt="" className="w-full h-auto block" />
        ))}
      </div>
    </main>
  );
}
