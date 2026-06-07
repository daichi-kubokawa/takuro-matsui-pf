"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { LAST_WORK_SLUG_STORAGE_KEY } from "@/components/works/shared";

type Props = {
  siteTitle: string;
  contactEmail?: string | null;
};

const SCROLL_RESTORE_EVENT = "work-scroll-restored";

function isActive(pathname: string, href: string, scope?: string | null) {
  if (scope === "all") {
    return href === "/";
  }

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
    active ? "font-bold text-[var(--color-text-selected)]" : "",
  ].join(" ");
}

export default function Header({ siteTitle, contactEmail }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const scope = searchParams.get("scope");

  const [isOpen, setIsOpen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScrollRestored = () => {
      setIsNavVisible(true);
      setLastScrollY(window.scrollY);
    };

    window.addEventListener(SCROLL_RESTORE_EVENT, handleScrollRestored);

    return () => {
      window.removeEventListener(SCROLL_RESTORE_EVENT, handleScrollRestored);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 40) {
        setIsNavVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogoClick = () => {
    setIsOpen(false);
    sessionStorage.removeItem(LAST_WORK_SLUG_STORAGE_KEY);
    router.push("/");

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
    });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-transparent">
        <div className="flex items-center justify-between px-4 py-4 lg:px-6">
          <button
            type="button"
            className="flex items-center"
            aria-label={siteTitle}
            onClick={handleLogoClick}
          >
            <Image
              src="/top.png"
              alt={siteTitle}
              width={2000}
              height={630}
              className="h-12 w-auto lg:h-20"
              priority
            />
          </button>

          <nav
            className={[
              "hidden items-center gap-6 text-xs tracking-wide transition-all duration-300 ease-out lg:flex lg:text-[18px]",
              isNavVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0 pointer-events-none",
            ].join(" ")}
          >
            <Link href="/" className={navClass(isActive(pathname, "/", scope))}>
              ALL
            </Link>

            <Link
              href="/works"
              className={navClass(isActive(pathname, "/works", scope))}
            >
              WORKS
            </Link>

            <Link
              href="/original"
              className={navClass(isActive(pathname, "/original", scope))}
            >
              ORIGINAL
            </Link>

            <Link
              href="/about"
              className={navClass(isActive(pathname, "/about", scope))}
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

          <button
            type="button"
            className="relative inline-flex h-6 w-6 items-center justify-center lg:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span
              className={[
                "absolute inset-0 inline-flex items-center justify-center transition-all duration-300 ease-out",
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100",
              ].join(" ")}
            >
              <MenuIcon />
            </span>

            <span
              className={[
                "absolute inset-0 inline-flex items-center justify-center transition-all duration-300 ease-out",
                isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0",
              ].join(" ")}
            >
              <CloseIcon />
            </span>
          </button>
        </div>
      </header>

      <div
        className={[
          "fixed inset-0 z-50 lg:hidden transition-all duration-300 ease-out",
          isOpen
            ? "pointer-events-auto bg-black/10 opacity-100 backdrop-blur-[2px]"
            : "pointer-events-none bg-black/0 opacity-0 backdrop-blur-0",
        ].join(" ")}
      >
        <div
          className={[
            "min-h-screen bg-white/95 transition-all duration-300 ease-out",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          ].join(" ")}
        >
          <div className="flex items-center justify-between px-4 py-4">
            <button
              type="button"
              className="flex items-center"
              aria-label={siteTitle}
              onClick={handleLogoClick}
            >
              <Image
                src="/top.png"
                alt={siteTitle}
                width={2000}
                height={630}
                className="h-12 w-auto"
                priority
              />
            </button>

            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>

          <nav className="flex flex-col gap-6 px-6 pt-6 text-base tracking-wide">
            <Link
              href="/"
              className={navClass(isActive(pathname, "/", scope))}
              onClick={() => setIsOpen(false)}
            >
              ALL
            </Link>

            <Link
              href="/works"
              className={navClass(isActive(pathname, "/works", scope))}
              onClick={() => setIsOpen(false)}
            >
              WORKS
            </Link>

            <Link
              href="/original"
              className={navClass(isActive(pathname, "/original", scope))}
              onClick={() => setIsOpen(false)}
            >
              ORIGINAL
            </Link>

            <Link
              href="/about"
              className={navClass(isActive(pathname, "/about", scope))}
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
    </>
  );
}
