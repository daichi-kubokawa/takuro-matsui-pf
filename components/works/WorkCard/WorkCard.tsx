"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Work } from "@/lib/microcms/types";
import { LAST_WORK_SLUG_STORAGE_KEY } from "../shared";
import styles from "./WorkCard.module.css";

type Props = {
  work: Work;
  href: string;
};

export default function WorkCard({ work, href }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [isInView, setIsInView] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isVisible = isInView && isImageLoaded;

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    if (img.complete) {
      setIsImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 12% 0px",
      },
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`${styles.root} ${isVisible ? styles.visible : ""}`}
      data-work-slug={work.slug}
    >
      <Link
        href={href}
        className={styles.link}
        onClick={() => {
          sessionStorage.setItem(LAST_WORK_SLUG_STORAGE_KEY, work.slug);
        }}
      >
        {work.thumbnail?.url ? (
          <div className={styles.imageWrap}>
            <img
              ref={imgRef}
              src={work.thumbnail.url}
              alt={work.title}
              className={styles.image}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        ) : null}
      </Link>
    </article>
  );
}
