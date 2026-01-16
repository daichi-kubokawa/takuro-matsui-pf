"use client";

import { useMemo, useState } from "react";
import type { Work } from "@/app/types/work";
import SideNav from "@/app/components/SideNav/SideNav";
import WorksGrid from "./WorksGrid";
import styles from "./WorksPage.module.css";

export default function WorksPage({
  works,
  tags,
}: {
  works: Work[];
  tags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredWorks = useMemo(() => {
    if (activeTag === "all") return works;
    return works.filter((w) => (w.tags ?? []).includes(activeTag));
  }, [works, activeTag]);

  return (
    <div className={styles.shell}>
      <SideNav />

      <main className={styles.main}>
        {/* Works */}
        <section id="works" className={styles.section}>
          <div
            className={styles.tags}
            role="tablist"
            aria-label="タグで絞り込み"
          >
            <button
              type="button"
              className={`${styles.tagBtn} ${
                activeTag === "all" ? styles.tagBtnActive : ""
              }`}
              onClick={() => setActiveTag("all")}
            >
              All
            </button>

            {tags.map((t) => (
              <button
                key={t}
                type="button"
                className={`${styles.tagBtn} ${
                  activeTag === t ? styles.tagBtnActive : ""
                }`}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <WorksGrid works={filteredWorks} />
        </section>
      </main>
    </div>
  );
}
