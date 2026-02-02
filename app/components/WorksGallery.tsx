import Link from "next/link";
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
  // いまは「表示できる」を最優先。フィルタは後で足す。
  return (
    <div>
      {/* タグ表示（とりあえず表示だけ） */}
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}
      >
        {tags.map((t) => (
          <span
            key={t.id}
            style={{
              fontSize: 12,
              opacity: 0.7,
              border: "1px solid rgba(0,0,0,0.15)",
              padding: "4px 8px",
              borderRadius: 999,
            }}
          >
            {t.name}
          </span>
        ))}
      </div>

      {/* 作品グリッド */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 12,
        }}
      >
        {works.map((w) => (
          <Link
            key={w.id}
            href={`${basePath}/${w.id}`}
            style={{
              display: "block",
              border: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={w.thumbnail?.url ?? w.images?.[0]?.url ?? ""}
              alt={w.title ?? "work"}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </Link>
        ))}
      </div>

      {/* 件数が0のとき */}
      {works.length === 0 ? (
        <p style={{ marginTop: 16, fontSize: 13, opacity: 0.7 }}>
          作品がありません（microCMSの公開状態 / isPublic / kind を確認）
        </p>
      ) : null}
    </div>
  );
}
