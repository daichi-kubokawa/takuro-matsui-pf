"use client";

import { useMemo, useState } from "react";
import styles from "./WorksPage.module.css";
import type { Work } from "../../types/work";
import WorksGrid from "./WorksGrid";

export default function WorksPage({ works }: { works: Work[] }) {
  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const w of works) {
      for (const t of w.tags ?? []) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b, "ja"));
  }, [works]);

  const [activeTag, setActiveTag] = useState<string>("");

  const filtered = useMemo(() => {
    if (!activeTag) return works;
    return works.filter((w) => (w.tags ?? []).includes(activeTag));
  }, [works, activeTag]);

  return (
    <main className={styles.main} id="works">
      <div className={styles.inner}>
        <div className={styles.headerRow}>
          <h1 className={styles.h1}>Works</h1>
          {activeTag && (
            <button
              className={styles.clearBtn}
              onClick={() => setActiveTag("")}
            >
              Clear
            </button>
          )}
        </div>

        {tags.length > 0 && (
          <div className={styles.tagsBar} aria-label="Tag filter">
            <button
              type="button"
              className={`${styles.tagBtn} ${activeTag === "" ? styles.tagBtnActive : ""}`}
              onClick={() => setActiveTag("")}
            >
              All
            </button>

            {tags.map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.tagBtn} ${activeTag === t ? styles.tagBtnActive : ""}`}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        <WorksGrid works={filtered} />
      </div>
    </main>
  );
}
