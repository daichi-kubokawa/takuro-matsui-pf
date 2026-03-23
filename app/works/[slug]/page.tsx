import { getWorkBySlug } from "@/lib/microcms/works";
import WorkDetail from "@/components/works/WorkDetail/WorkDetail";
import styles from "./page.module.css";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return <main className={styles.root}>Not found</main>;
  }

  return (
    <main className={styles.root}>
      <WorkDetail work={work} backHref="/works" />
    </main>
  );
}
