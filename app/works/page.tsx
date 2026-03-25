import { getWorksByKind } from "@/lib/microcms/works";
import ScrollRestore from "@/components/works/ScrollRestore/ScrollRestore";
import WorksArchive from "@/components/works/WorksArchive/WorksArchive";
import PageIntro from "@/components/works/PageIntro/PageIntro";

export default async function WorksPage() {
  const works = await getWorksByKind("works");

  return (
    <main className="px-4 py-10 md:px-12">
      <ScrollRestore />
      <WorksArchive
        works={works}
        scope="works"
        intro={<PageIntro title="WORKS" />}
      />
    </main>
  );
}
