import styles from "./WorkDetail.module.css";
import type { Work } from "@/app/types/work";

export default function WorkDetail({ work }: { work: Work }) {
  const cover = work.coverImage;

  return (
    <article className={styles.root}>
      {cover ? (
        <img
          className={styles.cover}
          src={cover.url}
          width={cover.width}
          height={cover.height}
          alt={work.title}
          loading="lazy"
        />
      ) : null}

      <h1 className={styles.title}>{work.title}</h1>
    </article>
  );
}
