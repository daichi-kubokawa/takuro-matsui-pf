"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Tag, Work } from "../lib/microcms/types";

export default function WorksGallery({
  works,
  tags,
  basePath,
}: {
  works: Work[];
  tags: Tag[];
  basePath: "/works" | "/original";
}) {
  const ALL_ID = "__all__";
  const [activeTagId, setActiveTagId] = useState<string>(ALL_ID);

  const tagItems = useMemo(() => {
    return [{ id: ALL_ID, name: "ALL" } as Tag, ...tags];
  }, [tags]);

  const filteredWorks = useMemo(() => {
    if (activeTagId === ALL_ID) return works;
    return works.filter((w) =>
      (w.tags ?? []).some((t) => t.id === activeTagId),
    );
  }, [works, activeTagId]);

  return (
    <section>
      {/* Filters */}
      <div className="mb-8">
        <div className="mb-2 text-[11px] opacity-60">Filters :</div>

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

      {/* Masonry (Pinterest-like) */}
      <div className="columns-2 md:columns-3 xl:columns-4 gap-2 md:gap-3">
        {filteredWorks.map((w) => {
          const thumb = w.thumbnail?.url ?? w.images?.[0]?.url ?? "";

          return (
            <div key={w.id} className="mb-2 md:mb-3 break-inside-avoid">
              <Link href={`${basePath}/${w.id}`} className="group block">
                <div
                  className={[
                    "relative overflow-hidden",
                    "transition-all duration-300 ease-out",
                    "md:hover:-translate-y-[4px]",
                    "md:hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)]",
                  ].join(" ")}
                >
                  {/* Masonryなので比率固定しない（元画像の縦横で高さが変わる） */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={thumb}
                    alt=""
                    loading="lazy"
                    className="w-full h-auto block"
                  />

                  {/* ふわっとトーン（ズームなし） */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ease-out md:group-hover:opacity-100 bg-black/[0.04]" />
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {filteredWorks.length === 0 ? (
        <p className="mt-6 text-sm opacity-70">該当する作品がありません。</p>
      ) : null}
    </section>
  );
}
