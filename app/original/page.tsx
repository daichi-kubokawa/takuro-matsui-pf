import { Suspense } from "react";
import { getWorksByKind } from "@/lib/microcms/works";
import ScrollRestore from "@/components/works/ScrollRestore/ScrollRestore";
import WorksArchive from "@/components/works/WorksArchive/WorksArchive";
import PageIntro from "@/components/works/PageIntro/PageIntro";

export default async function OriginalPage() {
  const works = await getWorksByKind("original");

  return (
    <main className="px-4 py-10 md:px-12">
      <Suspense fallback={null}>
        <ScrollRestore />
        <WorksArchive
          works={works}
          scope="original"
          intro={<PageIntro title="ORIGINAL" />}
        />
      </Suspense>
    </main>
  );
}
