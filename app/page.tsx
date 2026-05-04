import { Suspense } from "react";
import { getAllWorks } from "@/lib/microcms/works";
import ScrollRestore from "@/components/works/ScrollRestore/ScrollRestore";
import WorksArchive from "@/components/works/WorksArchive/WorksArchive";
import PageIntro from "@/components/works/PageIntro/PageIntro";

export default async function Page() {
  const works = await getAllWorks();

  return (
    <main className="min-h-[85vh] px-4 py-0 lg:px-6">
      <div className="block hidden">
        <PageIntro title="Takuro Matsui" subtitle="illustrator" />
      </div>

      <Suspense fallback={null}>
        <ScrollRestore />
        <WorksArchive works={works} scope="all" />
      </Suspense>
    </main>
  );
}
