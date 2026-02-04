// app/components/BackLink.tsx
"use client";

import Link from "next/link";

function ArrowBackIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    </svg>
  );
}

export default function BackLink({
  returnTo,
  fallbackHref,
}: {
  returnTo?: string | null;
  fallbackHref: string;
}) {
  const href = returnTo && returnTo.trim().length > 0 ? returnTo : fallbackHref;

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-xs opacity-60 hover:opacity-90 transition-opacity"
    >
      <ArrowBackIcon />
      <span>Back</span>
    </Link>
  );
}
