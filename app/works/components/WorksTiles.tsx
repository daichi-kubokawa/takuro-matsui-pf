"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./WorksTiles.module.css";
import type { Work } from "@/app/types/work";

type Props = {
  works: Work[];
};

function getColumnsCount(width: number): number {
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  return 2;
}

function safeRatio(w: Work): number {
  const img = w.coverImage;
  if (!img?.width || !img?.height) return 1;
  const r = img.height / img.width;
  if (!Number.isFinite(r) || r <= 0) return 1;
  return r;
}

export default function WorksTiles({ works }: Props) {
  const [cols, setCols] = useState<number>(2);

  useEffect(() => {
    const update = () => setCols(getColumnsCount(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const columns = useMemo(() => {
    const buckets: Work[][] = Array.from({ length: cols }, () => []);
    const heights: number[] = Array.from({ length: cols }, () => 0);

    const gapPx = 12;

    for (const w of works) {
      const ratio = safeRatio(w);

      let minIndex = 0;
      for (let i = 1; i < heights.length; i++) {
        if (heights[i] < heights[minIndex]) minIndex = i;
      }

      buckets[minIndex].push(w);

      const itemsCount = buckets[minIndex].length;
      heights[minIndex] +=
        ratio + gapPx / 1000 + (itemsCount > 1 ? gapPx / 1000 : 0);
    }

    return buckets;
  }, [works, cols]);

  return (
    <section className={styles.masonry} data-cols={cols}>
      {columns.map((col, idx) => (
        <div key={idx} className={styles.col}>
          {col.map((w) => (
            <article key={w.id} className={styles.card}>
              <Link className={styles.link} href={`/works/${w.id}`}>
                <img
                  className={styles.img}
                  src={w.coverImage.url}
                  width={w.coverImage.width}
                  height={w.coverImage.height}
                  alt={w.title}
                  loading="lazy"
                />
              </Link>
            </article>
          ))}
        </div>
      ))}
    </section>
  );
}
