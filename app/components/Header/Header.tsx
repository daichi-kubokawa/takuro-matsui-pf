"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

type Props = {
  brandName: string;
  contactEmail: string;
  contactEmailLabel?: string;
};

export default function Header({ brandName, contactEmail }: Props) {
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);

  useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const last = lastYRef.current;

      const goingDown = y > last;
      const nearTop = y < 12;

      if (nearTop) {
        setHidden(false);
      } else if (goingDown) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastYRef.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ""}`}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" className={styles.brandLink}>
            {brandName}
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link className={styles.navLink} href="/works">
            WORKS
          </Link>
          <Link className={styles.navLink} href="/original">
            ORIGINAL
          </Link>
          <Link className={styles.navLink} href="/about">
            ABOUT
          </Link>
          <a className={styles.navLink} href={`mailto:${contactEmail}`}>
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
}
