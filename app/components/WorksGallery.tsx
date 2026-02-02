"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Tag, Work, Settings } from "@/lib/microcms";

export default function WorksGallery({
  works,
  tags,
  settings,
}: {
  works: Work[];
  tags: Tag[];
  settings: Settings;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (selected.length === 0) return works;

    const mode = settings.filterMode;
    return works.filter((w) => {
      const slugs = (w.tags ?? []).map((t) => t.slug).filter(Boolean);
      return mode === "or"
        ? selected.some((s) => slugs.includes(s))
        : selected.every((s) => slugs.includes(s));
    });
  }, [works, selected, settings.filterMode]);

  const toggle = (slug: string) =>
    setSelected((p) =>
      p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug],
    );
  const clear = () => setSelected([]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="text-sm opacity-60">filters :</div>
        <button
          onClick={clear}
          className={`text-sm underline-offset-4 ${selected.length === 0 ? "underline font-medium" : "hover:underline"}`}
        >
          All
        </button>
        {tags.map((t) => {
          const active = selected.includes(t.slug);
          return (
            <button
              key={t.id}
              onClick={() => toggle(t.slug)}
              className={`text-sm underline-offset-4 ${active ? "underline font-medium" : "hover:underline"}`}
            >
              {t.name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {filtered.map((w) => (
          <Link key={w.id} href={`/works/${w.id}`} className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={w.thumbnail.url}
              alt={w.title ?? "work"}
              className="w-full h-auto"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
