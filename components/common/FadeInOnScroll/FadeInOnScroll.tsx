"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./FadeInOnScroll.module.css";

type Props = {
  children: ReactNode;
  delay?: number;
  once?: boolean;
};

export default function FadeInOnScroll({
  children,
  delay = 0,
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 12% 0px",
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={`${styles.root} ${isVisible ? styles.visible : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
