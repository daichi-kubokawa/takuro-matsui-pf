"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  siteTitle: string;
  contactEmail?: string | null;
};

function isActive(pathname: string, href: string) {
  // ALLは "/" のみアクティブ
  if (href === "/") return pathname === "/";

  // /works と /works/[id] もまとめてアクティブ
  if (href === "/works")
    return pathname === "/works" || pathname.startsWith("/works/");

  // /original と /original/[id] もまとめてアクティブ
  if (href === "/original")
    return pathname === "/original" || pathname.startsWith("/original/");

  // /about
  if (href === "/about") return pathname === "/about";

  return false;
}

function navClass(active: boolean) {
  return [
    "hover:opacity-60 transition-opacity",
    active ? "font-semibold underline underline-offset-4" : "font-normal",
  ].join(" ");
}

/**
 * detailページ（/works/[id], /original/[id]）にいる時だけ、
 * URLの ?from= を見て「どこから来たか」を active に反映する。
 *
 * 例:
 *  - /works/xxx?from=/        → ヘッダーは ALL
 *  - /original/xxx?from=/     → ヘッダーは ALL
 *  - /works/xxx?from=/works   → ヘッダーは WORKS
 *  - /original/xxx?from=/original → ヘッダーは ORIGINAL
 */
function normalizeFrom(
  raw: string | null,
): "/" | "/works" | "/original" | null {
  if (!raw) return null;

  // ?from=/works でも ?from=%2Fworks でもどっちでもOKにする
  let v = raw;
  try {
    v = decodeURIComponent(raw);
  } catch {
    // ignore
  }

  if (v === "/") return "/";
  if (v === "/works" || v.startsWith("/works")) return "/works";
  if (v === "/original" || v.startsWith("/original")) return "/original";

  return null;
}

export default function Header({ siteTitle, contactEmail }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const from = normalizeFrom(searchParams.get("from"));

  // detailページのときだけ active 判定の基準を「from」に切り替える
  const isDetail =
    pathname.startsWith("/works/") || pathname.startsWith("/original/");

  const activeBasePath = isDetail && from ? from : pathname; // ← ここが今回のキモ

  return (
    <header className="w-full">
      <div className="px-4 sm:px-6 py-6 flex items-center justify-between">
        {/* 左：siteTitle */}
        <Link href="/" className="text-sm sm:text-base tracking-wide">
          {siteTitle}
        </Link>

        {/* 右：メニュー */}
        <nav className="flex items-center gap-6 text-xs sm:text-sm tracking-wide">
          <Link href="/" className={navClass(isActive(activeBasePath, "/"))}>
            ALL
          </Link>
          <Link
            href="/works"
            className={navClass(isActive(activeBasePath, "/works"))}
          >
            WORKS
          </Link>
          <Link
            href="/original"
            className={navClass(isActive(activeBasePath, "/original"))}
          >
            ORIGINAL
          </Link>
          <Link
            href="/about"
            className={navClass(isActive(activeBasePath, "/about"))}
          >
            ABOUT
          </Link>

          {/* CONTACTは mailto なので active判定しない */}
          {contactEmail ? (
            <a
              href={`mailto:${contactEmail}`}
              className="hover:opacity-60 transition-opacity"
            >
              CONTACT
            </a>
          ) : (
            <span className="text-neutral-400">CONTACT</span>
          )}
        </nav>
      </div>
    </header>
  );
}
