// app/components/WorksGallery.tsx
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Tag, Work } from "../lib/microcms/types";

export default function WorksGallery({
  works,
  tags,
  linkMode,
}: {
  works: Work[];
  tags: Tag[];
  linkMode: "byKind" | "fixedWorks" | "fixedOriginal";
}) {
  const ALL_ID = "__all__";
  const [activeTagId, setActiveTagId] = useState<string>(ALL_ID);

  const tagItems = useMemo(() => {
    return [{ id: ALL_ID, name: "ALL", slug: "all" } as Tag, ...tags];
  }, [tags]);

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

  return (
    <section>
      {/* Filters（ラベル文字は出さない） */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {tagItems.map((t) => {
            const isActive = activeTagId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTagId(t.id)}
                className={[
                  "text-[11px] leading-none px-3 py-2 rounded-full transition",
                  isActive ? "opacity-100" : "opacity-60 hover:opacity-100",
                ].join(" ")}
              >
                {t.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* ✅ Pinterest風：CSSで段組み固定 */}
      <div className="masonry">
        {filteredWorks.map((w) => {
          const thumb = w.thumbnail?.url ?? w.images?.[0]?.url ?? "";
          if (!thumb) return null;

          return (
            <div key={w.id} className="masonry-item">
              <Link href={hrefFor(w)} className="group block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb}
                  alt=""
                  loading="lazy"
                  className="w-full h-auto block"
                />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
