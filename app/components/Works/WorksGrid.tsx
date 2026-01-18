import Link from "next/link";
import styles from "./WorksGrid.module.css";
import type { Work } from "../../types/work";

function isWideLayout(layout: unknown) {
  if (Array.isArray(layout)) {
    return layout.map(String).some((v) => v.trim().toLowerCase() === "wide");
  }
  if (typeof layout === "string") {
    return layout.trim().toLowerCase() === "wide";
  }
  return false;
}

export default function WorksGrid({ works }: { works: Work[] }) {
  return (
    <section className={styles.grid}>
      {works.map((work) => {
        const isWide = isWideLayout((work as any).layout);

        const src =
          (work as any).coverImage?.url || (work as any).thumbnail?.url || "";

        return (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className={`${styles.card} ${isWide ? styles.wide : ""}`}
            data-layout={
              Array.isArray((work as any).layout)
                ? (work as any).layout.join(",")
                : ((work as any).layout ?? "")
            }
          >
            {src ? (
              <img
                className={styles.image}
                src={src}
                alt={work.title ?? ""}
                loading="lazy"
              />
            ) : (
              <div className={styles.fallback} />
            )}
          </Link>
        );
      })}
    </section>
  );
}
