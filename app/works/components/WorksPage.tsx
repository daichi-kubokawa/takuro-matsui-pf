"use client";

import { useMemo, useState } from "react";
import styles from "./WorksPage.module.css";
import type { Work } from "@/app/types/work";
import type { Tag } from "@/app/types/tag";
import WorksTiles from "./WorksTiles";

type Props = {
  works: Work[];
  tags: Tag[];
  title?: string;
};

function getWorkTagSlugs(w: Work): string[] {
  return (w.tags ?? []).map((t) => t.slug).filter(Boolean);
}

export default function WorksPage({ works, tags, title = "Works" }: Props) {
  const [active, setActive] = useState<string>("all");

  const tagOptions = useMemo(() => {
    const used = new Set<string>();
    for (const w of works) for (const s of getWorkTagSlugs(w)) used.add(s);
    return tags.filter((t) => used.has(t.slug));
  }, [works, tags]);

  const filtered = useMemo(() => {
    if (active === "all") return works;
    return works.filter((w) => getWorkTagSlugs(w).includes(active));
  }, [works, active]);

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>{title}</h1>

        <div className={styles.tagsBar}>
          <button
            type="button"
            className={`${styles.tagBtn} ${
              active === "all" ? styles.tagBtnActive : ""
            }`}
            onClick={() => setActive("all")}
          >
            すべて
          </button>

          {tagOptions.map((t) => (
            <button
              key={t.id}
              type="button"
              className={`${styles.tagBtn} ${
                active === t.slug ? styles.tagBtnActive : ""
              }`}
              onClick={() => setActive(t.slug)}
              title={t.description ?? ""}
            >
              {t.name}
            </button>
          ))}
        </div>

        <WorksTiles works={filtered} />
      </div>
    </main>
  );
}
