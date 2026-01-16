"use client";

import Link from "next/link";
import styles from "./WorksGrid.module.css";
import type { Work } from "../../types/work";

function isWideLayout(layout: Work["layout"]) {
  if (!layout) return false;
  if (Array.isArray(layout)) return layout.includes("wide");
  return layout === "wide";
}

export default function WorksGrid({ works }: { works: Work[] }) {
  return (
    <section className={styles.grid} id="works">
      {works.map((work) => {
        const wide = isWideLayout(work.layout);

        return (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className={`${styles.card} ${wide ? styles.wide : ""}`}
          >
            <img
              className={styles.image}
              src={work.coverImage.url}
              alt={work.title}
              loading="lazy"
            />
          </Link>
        );
      })}
    </section>
  );
}
