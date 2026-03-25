"use client";

import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LAST_WORK_SLUG_STORAGE_KEY } from "@/components/works/shared";
import styles from "../WorkDetail/WorkDetail.module.css";

type AdjacentWork = {
  slug: string;
  title: string;
  titleJa?: string;
  href: string;
};

type Props = {
  prevWork?: AdjacentWork | null;
  nextWork?: AdjacentWork | null;
};

export default function WorkDetailNav({ prevWork, nextWork }: Props) {
  return prevWork || nextWork ? (
    <nav className={styles.bottomNavArea} aria-label="作品ナビゲーション">
      {prevWork ? (
        <Link
          href={prevWork.href}
          className={`${styles.navLink} ${styles.navLinkPrev}`}
          onClick={() => {
            sessionStorage.setItem(LAST_WORK_SLUG_STORAGE_KEY, prevWork.slug);
          }}
        >
          <span className={styles.navIcon}>
            <ArrowBackIcon fontSize="inherit" />
          </span>
          <span className={`${styles.navLabel} font-en`}>PREV</span>
        </Link>
      ) : (
        <div />
      )}

      {nextWork ? (
        <Link
          href={nextWork.href}
          className={`${styles.navLink} ${styles.navLinkNext}`}
          onClick={() => {
            sessionStorage.setItem(LAST_WORK_SLUG_STORAGE_KEY, nextWork.slug);
          }}
        >
          <span className={`${styles.navLabel} font-en`}>NEXT</span>
          <span className={styles.navIcon}>
            <ArrowForwardIcon fontSize="inherit" />
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  ) : null;
}
