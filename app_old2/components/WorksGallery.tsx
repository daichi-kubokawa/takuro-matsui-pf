// app/components/WorksGallery.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Tag, Work } from "../lib/microcms/types";

export default function WorksGallery({
  works,
  tags,
  linkMode = "byKind",
}: {
  works: Work[];
  tags: Tag[];
  linkMode?: "byKind" | "fixedWorks" | "fixedOriginal";
}) {
  const ALL_ID = "__all__";
  const [activeTagId, setActiveTagId] = useState<string>(ALL_ID);
  const gridRef = useRef<HTMLDivElement | null>(null);

  const tagItems = useMemo(
    () => [{ id: ALL_ID, name: "ALL" } as Tag, ...tags],
    [tags],
  );

  const filteredWorks = useMemo(() => {
    if (activeTagId === ALL_ID) return works;
    return works.filter((w) =>
      (w.tags ?? []).some((t) => t.id === activeTagId),
    );
  }, [works, activeTagId]);

  function hrefFor(w: Work) {
    if (linkMode === "fixedWorks") return `/works/${w.id}`;
    if (linkMode === "fixedOriginal") return `/original/${w.id}`;
    return (w as any).kind === "original"
      ? `/original/${w.id}`
      : `/works/${w.id}`;
  }

  // Masonry layout without CSS additions
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ROW = 8;
    const GAP = 24;

    const layout = () => {
      const items = Array.from(grid.children) as HTMLElement[];

      items.forEach((item) => {
        const img = item.querySelector("img");
        if (!img) return;

        const h = img.getBoundingClientRect().height;
        const span = Math.ceil((h + GAP) / ROW);
        item.style.gridRowEnd = `span ${span}`;
      });
    };

    const imgs = Array.from(grid.querySelectorAll("img"));
    imgs.forEach((img) => {
      if (img.complete) return;
      img.addEventListener("load", layout, { once: true });
    });

    window.addEventListener("resize", layout);
    requestAnimationFrame(layout);

    return () => {
      window.removeEventListener("resize", layout);
    };
  }, [filteredWorks]);

  return (
    <section>
      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {tagItems.map((t) => {
          const active = activeTagId === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTagId(t.id)}
              className={`text-[11px] px-3 py-2 rounded-full transition ${
                active ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      {/* Masonry Grid */}
      <div
        ref={gridRef}
        style={{ gridAutoRows: "8px" }}
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {filteredWorks.map((w) => {
          const thumb = w.thumbnail?.url ?? w.images?.[0]?.url;
          if (!thumb) return null;

          return (
            <Link key={w.id} href={hrefFor(w)} className="block">
              <img
                src={thumb}
                alt=""
                loading="lazy"
                className="w-full h-auto block"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
