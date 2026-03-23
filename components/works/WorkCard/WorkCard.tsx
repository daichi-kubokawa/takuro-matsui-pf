"use client";

import Link from "next/link";
import type { Work } from "@/lib/microcms/types";
import { LAST_WORK_ID_STORAGE_KEY } from "../shared";
import styles from "./WorkCard.module.css";

type Props = {
  work: Work;
  href: string;
};

export default function WorkCard({ work, href }: Props) {
  return (
    <article className={styles.root} data-work-id={work.id}>
      <Link
        href={href}
        className={styles.link}
        onClick={() => {
          sessionStorage.setItem(LAST_WORK_ID_STORAGE_KEY, work.id);
        }}
      >
        {work.thumbnail?.url ? (
          <div className={styles.imageWrap}>
            <img
              src={work.thumbnail.url}
              alt={work.title}
              className={styles.image}
            />
          </div>
        ) : null}
      </Link>
    </article>
  );
}
