"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./SideNav.module.css";

export default function SideNav({
  brandName,
  contactEmail,
}: {
  brandName: string;
  contactEmail: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav} aria-label="Primary">
      <div className={styles.hamburgerRow}>
        <div className={styles.brand}>{brandName}</div>
        <button
          className={styles.hamburgerBtn}
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 6h16" stroke="currentColor" strokeWidth="2" />
            <path d="M4 12h16" stroke="currentColor" strokeWidth="2" />
            <path d="M4 18h16" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className={`${styles.brand} ${styles.desktopOnly}`}>{brandName}</div>

      <div className={`${styles.drawer} ${open ? styles.open : ""}`}>
        <div className={styles.links}>
          <Link
            className={styles.link}
            href="/#works"
            onClick={() => setOpen(false)}
          >
            Works
          </Link>
          <Link
            className={styles.link}
            href="/about"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <a
            className={styles.link}
            href={`mailto:${contactEmail}`}
            onClick={() => setOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
