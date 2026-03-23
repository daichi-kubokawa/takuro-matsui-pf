"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Work } from "@/lib/microcms/types";
import WorksGrid from "../WorksGrid/WorksGrid";
import WorksTagFilter from "../WorksTagFilter/WorksTagFilter";
import { filterWorksByTag, getAvailableTags } from "./helpers";
import styles from "./WorksArchive.module.css";

type Props = {
  works: Work[];
  intro?: ReactNode;
};

export default function WorksArchive({ works, intro }: Props) {
  const [activeTag, setActiveTag] = useState("all");

  const availableTags = useMemo(() => {
    return getAvailableTags(works);
  }, [works]);

  const filteredWorks = useMemo(() => {
    return filterWorksByTag(works, activeTag);
  }, [works, activeTag]);

  function handleTagChange(tagId: string) {
    setActiveTag(tagId);
  }

  return (
    <section className={styles.root}>
      {intro ? <div className={styles.intro}>{intro}</div> : null}

      <WorksTagFilter
        tags={availableTags}
        activeTag={activeTag}
        onChange={handleTagChange}
      />

      <WorksGrid works={filteredWorks} />
    </section>
  );
}
