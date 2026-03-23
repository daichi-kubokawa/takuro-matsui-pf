"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

type Props = {
  siteTitle: string;
  contactEmail?: string | null;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";

  if (href === "/works") {
    return pathname === "/works" || pathname.startsWith("/works/");
  }

  if (href === "/original") {
    return pathname === "/original" || pathname.startsWith("/original/");
  }

  if (href === "/about") {
    return pathname === "/about";
  }

  return false;
}

function navClass(active: boolean) {
  return [
    "transition-opacity hover:opacity-60",
    active ? "font-bold underline underline-offset-4" : "font-normal",
  ].join(" ");
}

export default function Header({ siteTitle, contactEmail }: Props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (isOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY.current;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY.current);

      if (scrollDelta < 6) return;

      if (isScrollingDown && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <header
      className={[
        "sticky top-0 z-40 w-full bg-white/80 backdrop-blur-[6px]",
        "transition-transform duration-300",
        isVisible ? "translate-y-0" : "-translate-y-full",
      ].join(" ")}
    >
      <div className="flex items-center justify-between px-4 py-6 lg:px-6">
        <Link
          href="/"
          className="text-[20px] tracking-wide font-bold lg:text-[22px]"
        >
          {siteTitle}
        </Link>

        {/* PC Navigation */}
        <nav className="hidden items-center gap-6 text-xs tracking-wide lg:flex lg:text-[18px]">
          <Link href="/" className={navClass(isActive(pathname, "/"))}>
            ALL
          </Link>

          <Link
            href="/works"
            className={navClass(isActive(pathname, "/works"))}
          >
            WORKS
          </Link>

          <Link
            href="/original"
            className={navClass(isActive(pathname, "/original"))}
          >
            ORIGINAL
          </Link>

          <Link
            href="/about"
            className={navClass(isActive(pathname, "/about"))}
          >
            ABOUT
          </Link>

          {contactEmail ? (
            <a
              href={`mailto:${contactEmail}`}
              className="transition-opacity hover:opacity-60"
            >
              CONTACT
            </a>
          ) : (
            <span className="text-neutral-400">CONTACT</span>
          )}
        </nav>

        {/* SP Menu Button */}
        <button
          type="button"
          className="inline-flex items-center justify-center lg:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <MenuIcon />
        </button>
      </div>
      {/* SP Overlay Menu */}
      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-black/10 backdrop-blur-[2px] lg:hidden">
          <div className="min-h-screen bg-white/85">
            <div className="flex items-center justify-between px-4 py-6">
              <Link
                href="/"
                className="text-[20px] font-bold tracking-wide"
                onClick={() => setIsOpen(false)}
              >
                {siteTitle}
              </Link>

              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col gap-6 px-4 pt-6 text-base tracking-wide">
              <Link
                href="/"
                className={navClass(isActive(pathname, "/"))}
                onClick={() => setIsOpen(false)}
              >
                ALL
              </Link>

              <Link
                href="/works"
                className={navClass(isActive(pathname, "/works"))}
                onClick={() => setIsOpen(false)}
              >
                WORKS
              </Link>

              <Link
                href="/original"
                className={navClass(isActive(pathname, "/original"))}
                onClick={() => setIsOpen(false)}
              >
                ORIGINAL
              </Link>

              <Link
                href="/about"
                className={navClass(isActive(pathname, "/about"))}
                onClick={() => setIsOpen(false)}
              >
                ABOUT
              </Link>

              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="transition-opacity hover:opacity-60"
                  onClick={() => setIsOpen(false)}
                >
                  CONTACT
                </a>
              ) : (
                <span className="text-neutral-400">CONTACT</span>
              )}
            </nav>
          </div>
        </div>
      ) : null}{" "}
    </header>
  );
}
