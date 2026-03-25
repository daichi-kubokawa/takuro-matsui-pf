"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Work } from "@/lib/microcms/types";
import FadeInOnScroll from "@/components/common/FadeInOnScroll/FadeInOnScroll";
import WorksGrid from "../WorksGrid/WorksGrid";
import WorksTagFilter from "../WorksTagFilter/WorksTagFilter";
import { filterWorksByTag, getAvailableTags } from "./helpers";
import styles from "./WorksArchive.module.css";

type Props = {
  works: Work[];
  intro?: ReactNode;
  scope: "works" | "original" | "all";
};

export default function WorksArchive({ works, intro, scope }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlTag = searchParams.get("tag") || "all";
  const [activeTag, setActiveTag] = useState(urlTag);

  useEffect(() => {
    setActiveTag(urlTag);
  }, [urlTag]);

  const availableTags = useMemo(() => {
    return getAvailableTags(works);
  }, [works]);

  const filteredWorks = useMemo(() => {
    return filterWorksByTag(works, activeTag);
  }, [works, activeTag]);

  function handleTagChange(tagId: string) {
    setActiveTag(tagId);

    const params = new URLSearchParams(searchParams.toString());

    if (tagId === "all") {
      params.delete("tag");
    } else {
      params.set("tag", tagId);
    }

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
      { scroll: false },
    );
  }

  return (
    <section className={styles.root}>
      {intro ? (
        <FadeInOnScroll>
          <div className={styles.intro}>{intro}</div>
        </FadeInOnScroll>
      ) : null}

      <FadeInOnScroll delay={80}>
        <WorksTagFilter
          tags={availableTags}
          activeTag={activeTag}
          onChange={handleTagChange}
        />
      </FadeInOnScroll>

      <WorksGrid works={filteredWorks} scope={scope} activeTag={activeTag} />
    </section>
  );
}
