"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
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
            BlandName
          </Link>
        </div>

        <nav className={styles.nav}>
          <Link className={styles.navLink} href="/works">
            Works
          </Link>
          <Link className={styles.navLink} href="/about">
            About
          </Link>
          <a className={styles.navLink} href="#contact">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
