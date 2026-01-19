import styles from "./WorkDetail.module.css";
import type { Work } from "@/app/types/work";

export default function WorkDetail({ work }: { work: Work }) {
  const cover = work.coverImage;

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        {cover?.url ? (
          <figure className={styles.figure}>
            <img
              className={styles.cover}
              src={cover.url}
              width={cover.width}
              height={cover.height}
              alt={work.title}
              loading="lazy"
            />
          </figure>
        ) : null}

        <h1 className={styles.h1}>{work.title}</h1>

        <div className={styles.meta}>
          {work.clientName ? (
            <span className={styles.metaItem}>{work.clientName}</span>
          ) : null}
          {work.year ? (
            <span className={styles.metaItem}>{work.year}</span>
          ) : null}
        </div>

        {work.description ? (
          <p className={styles.desc}>{work.description}</p>
        ) : null}

        {(work.tags?.length ?? 0) > 0 ? (
          <ul className={styles.tags}>
            {work.tags!.map((t) => (
              <li key={t.id} className={styles.tag}>
                {t.name}
              </li>
            ))}
          </ul>
        ) : null}

        {work.body ? <div className={styles.body}>{work.body}</div> : null}

        {(work.gallery?.length ?? 0) > 0 ? (
          <section className={styles.gallery}>
            {work.gallery!.map((img) => (
              <img
                key={img.url}
                className={styles.galleryImg}
                src={img.url}
                width={img.width}
                height={img.height}
                alt=""
                loading="lazy"
              />
            ))}
          </section>
        ) : null}

        {work.externalUrl ? (
          <a
            className={styles.external}
            href={work.externalUrl}
            target="_blank"
            rel="noreferrer"
          >
            外部サイトを見る
          </a>
        ) : null}
      </div>
    </main>
  );
}
