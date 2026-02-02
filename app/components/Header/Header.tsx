"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { label: "ALL", href: "/" },
  { label: "WORKS", href: "/works" },
  { label: "ORIGINAL", href: "/original" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

function activeHref(pathname: string) {
  if (pathname.startsWith("/works/")) return "/works";
  return NAV.find((n) => n.href === pathname)?.href ?? "/";
}

export default function Header() {
  const pathname = usePathname();
  const active = activeHref(pathname);

  return <header className="bg-red-500 text-white p-4">Tailwind OK</header>;
}
