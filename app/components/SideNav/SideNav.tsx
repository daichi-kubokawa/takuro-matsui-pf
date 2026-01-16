"use client";

import { useState } from "react";
import styles from "./SideNav.module.css";

export default function SideNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <aside className={styles.nav}>
      {/* SP header */}
      <div className={styles.hamburgerRow}>
        <div className={styles.brand}>Takuro Matsui</div>

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

      {/* PC brand */}
      <div className={`${styles.brand} ${styles.desktopOnly}`}>
        Takuro Matsui
      </div>

      {/* Drawer: SPは open のときだけ表示 / PCは常時表示 */}
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
        <nav className={styles.links} aria-label="Primary">
          <a className={styles.link} href="/#works" onClick={close}>
            Works
          </a>
          <a className={styles.link} href="/about" onClick={close}>
            About
          </a>
          <a className={styles.link} href="/#contact" onClick={close}>
            Contact
          </a>
        </nav>
      </div>
    </aside>
  );
}
