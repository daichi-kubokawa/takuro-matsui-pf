"use client";

import Masonry from "react-masonry-css";
import { usePathname } from "next/navigation";
import Link from "next/link";

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  640: 2,
};

export default function WorksMasonry({
  works,
}: {
  works: { id: string; image: string; kind?: string }[];
}) {
  const pathname = usePathname();

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex w-full gap-6"
      columnClassName="flex flex-col gap-6"
    >
      {works.map((w) => {
        const base = w.kind === "original" ? "/original" : "/works";

        return (
          <Link key={w.id} href={`${base}/${w.id}?from=${pathname}`}>
            <img src={w.image} className="w-full h-auto block" loading="lazy" />
          </Link>
        );
      })}
    </Masonry>
  );
}
