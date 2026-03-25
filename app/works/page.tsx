import { Suspense } from "react";
import { getWorksByKind } from "@/lib/microcms/works";
import ScrollRestore from "@/components/works/ScrollRestore/ScrollRestore";
import WorksArchive from "@/components/works/WorksArchive/WorksArchive";
import PageIntro from "@/components/works/PageIntro/PageIntro";

export default async function WorksPage() {
  const works = await getWorksByKind("works");

  return (
    <main className="min-h-[85vh] px-4 py-10 md:px-12">
      <PageIntro title="WORKS" />

      <Suspense fallback={null}>
        <ScrollRestore />
        <WorksArchive works={works} scope="works" />
      </Suspense>
    </main>
  );
}
