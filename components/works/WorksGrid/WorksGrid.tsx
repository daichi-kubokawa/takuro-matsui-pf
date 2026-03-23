"use client";

import { useMemo } from "react";
import Masonry from "react-masonry-css";
import type { Work } from "@/lib/microcms/types";
import WorkCard from "../WorkCard/WorkCard";
import { getDetailHref } from "./helpers";
import styles from "./WorksGrid.module.css";

type Props = {
  works: Work[];
};

const breakpointColumnsObj = {
  default: 4,
  1279: 3,
  767: 2,
};

export default function WorksGrid({ works }: Props) {
  const [leftColumnWorks, rightColumnWorks] = useMemo(() => {
    const left: Work[] = [];
    const right: Work[] = [];

    works.forEach((work, index) => {
      if (index % 2 === 0) {
        left.push(work);
      } else {
        right.push(work);
      }
    });

    return [left, right];
  }, [works]);

  return (
    <section className={styles.root}>
      <div className={styles.spGrid}>
        <div className={styles.spColumn}>
          {leftColumnWorks.map((work) => (
            <div key={work.id} className={styles.spItem}>
              <WorkCard work={work} href={getDetailHref(work)} />
            </div>
          ))}
        </div>

        <div className={styles.spColumn}>
          {rightColumnWorks.map((work) => (
            <div key={work.id} className={styles.spItem}>
              <WorkCard work={work} href={getDetailHref(work)} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pcMasonry}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.masonryGrid}
          columnClassName={styles.masonryColumn}
        >
          {works.map((work) => (
            <div key={work.id} className={styles.item}>
              <WorkCard work={work} href={getDetailHref(work)} />
            </div>
          ))}
        </Masonry>
      </div>
    </section>
  );
}
