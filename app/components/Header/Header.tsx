"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type NavItem = { label: string; href?: string; mailto?: string };

const NAV: NavItem[] = [
  { label: "ALL", href: "/" },
  { label: "WORKS", href: "/works" },
  { label: "ORIGINAL", href: "/original" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", mailto: "mailto:contact@example.com" }, // ← 後で差し替え
];

function normalize(p: string) {
  if (p !== "/" && p.endsWith("/")) return p.slice(0, -1);
  return p;
}

function activeLabel(pathname: string) {
  const p = normalize(pathname);
  if (p.startsWith("/works/")) return "WORKS";
  return NAV.find((n) => n.href === p)?.label ?? "ALL";
}

export default function Header() {
  const pathname = usePathname();
  const current = useMemo(() => activeLabel(pathname), [pathname]);
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/10">
      <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
        {/* 左：サイト名 */}
        <Link href="/" className="text-xs tracking-wide hover:opacity-70">
          PORTFOLIO
        </Link>

        {/* PC ナビ */}
        <nav className="hidden md:flex items-center gap-6 text-xs">
          {NAV.map((n) =>
            n.mailto ? (
              <a
                key={n.label}
                href={n.mailto}
                className="opacity-70 hover:opacity-100"
              >
                {n.label}
              </a>
            ) : (
              <Link
                key={n.label}
                href={n.href!}
                className={`underline-offset-4 hover:underline ${
                  current === n.label ? "underline opacity-100" : "opacity-70"
                }`}
              >
                {n.label}
              </Link>
            ),
          )}
        </nav>

        {/* SP 右：現在地 + メニュー */}
        <div className="md:hidden flex items-center gap-3">
          <span className="text-[11px] opacity-60">{current}</span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="text-[11px] px-2 py-1 border border-black/20 rounded hover:bg-black/5"
            aria-expanded={open}
          >
            MENU
          </button>
        </div>
      </div>

      {/* SP メニュー */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <div className="mx-auto max-w-5xl px-6 py-4 flex flex-col gap-3">
            {NAV.map((n) =>
              n.mailto ? (
                <a key={n.label} href={n.mailto} className="text-xs opacity-80">
                  {n.label}
                </a>
              ) : (
                <Link
                  key={n.label}
                  href={n.href!}
                  className={`text-xs underline-offset-4 ${
                    current === n.label ? "underline opacity-100" : "opacity-80"
                  }`}
                >
                  {n.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
}
