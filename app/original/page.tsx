import { Suspense } from "react";
import { getWorksByKind } from "@/lib/microcms/works";
import ScrollRestore from "@/components/works/ScrollRestore/ScrollRestore";
import WorksArchive from "@/components/works/WorksArchive/WorksArchive";
import PageIntro from "@/components/works/PageIntro/PageIntro";

export default async function OriginalPage() {
  const works = await getWorksByKind("original");

  return (
    <main className="min-h-[85vh] px-4 py-0 lg:px-6">
      <div className="block lg:hidden">
        <PageIntro title="ORIGINAL" />
      </div>

      <Suspense fallback={null}>
        <ScrollRestore />
        <WorksArchive works={works} scope="ORIGINAL" />
      </Suspense>
    </main>
  );
}
