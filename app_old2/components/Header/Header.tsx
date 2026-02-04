// app/components/Header/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header({
  siteTitle,
  contactEmail,
}: {
  siteTitle: string;
  contactEmail?: string;
}) {
  const pathname = usePathname();

  const isAll = pathname === "/";
  const isWorks = pathname.startsWith("/works");
  const isOriginal = pathname.startsWith("/original");
  const isAbout = pathname.startsWith("/about");

  const contactHref =
    contactEmail && contactEmail.trim().length > 0
      ? `mailto:${contactEmail.trim()}`
      : "/about#contact";

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur">
      <div className="container-x flex items-center justify-between py-4">
        <Link href="/" className="text-xs tracking-[0.2em] opacity-80">
          {siteTitle}
        </Link>

        <nav className="flex items-center gap-6 text-xs tracking-wide">
          <Link
            href="/"
            className={isAll ? "opacity-100" : "opacity-50 hover:opacity-80"}
          >
            ALL
          </Link>

          <Link
            href="/works"
            className={isWorks ? "opacity-100" : "opacity-50 hover:opacity-80"}
          >
            WORKS
          </Link>

          <Link
            href="/original"
            className={
              isOriginal ? "opacity-100" : "opacity-50 hover:opacity-80"
            }
          >
            ORIGINAL
          </Link>

          <Link
            href="/about"
            className={isAbout ? "opacity-100" : "opacity-50 hover:opacity-80"}
          >
            ABOUT
          </Link>

          {/* CONTACTはmailto。ABOUTページでも“アクティブ表示にしない” */}
          <a href={contactHref} className="opacity-50 hover:opacity-80">
            CONTACT
          </a>
        </nav>
      </div>
    </header>
  );
}
