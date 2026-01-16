"use client";

import styles from "./WorksGrid.module.css";
import type { Work } from "../../types/work";

function isWide(work: Work) {
  const img = work.coverImage;
  if (!img?.width || !img?.height) return false;
  return img.width / img.height >= 1.45;
}

export default function WorksGrid({ works }: { works: Work[] }) {
  return (
    <section className={styles.grid} id="works">
      {works.map((work) => {
        const wide = isWide(work);

        return (
          <article
            key={work.id}
            className={`${styles.card} ${wide ? styles.wide : ""}`}
          >
            <img
              className={styles.image}
              src={work.coverImage.url}
              alt={work.title}
              loading="lazy"
            />
          </article>
        );
      })}
    </section>
  );
}
