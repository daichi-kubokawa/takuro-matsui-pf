import { Suspense } from "react";
import { getAllWorks } from "@/lib/microcms/works";
import ScrollRestore from "@/components/works/ScrollRestore/ScrollRestore";
import WorksArchive from "@/components/works/WorksArchive/WorksArchive";
import PageIntro from "@/components/works/PageIntro/PageIntro";

export default async function Page() {
  const works = await getAllWorks();

  return (
    <main className="px-4 py-10 md:px-12">
      <ScrollRestore />
      <Suspense fallback={null}>
        <WorksArchive
          works={works}
          scope="all"
          intro={<PageIntro title="Takuro Matsui" subtitle="illustrator" />}
        />
      </Suspense>
    </main>
  );
}
