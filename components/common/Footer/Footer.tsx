import "server-only";
import Link from "next/link";
import { getSettings } from "@/lib/microcms/settings";
import BackToTopButton from "../BackToTopButton/BackToTopButton";

function mailto(email?: string) {
  if (!email) return null;
  return `mailto:${email}`;
}

export default async function Footer() {
  const settings = await getSettings();

  const copyrightText =
    settings.copyrightText?.trim() ||
    `© ${new Date().getFullYear()} Takuro Matsui`;

  const contactHref = mailto(settings.contactEmail?.trim());
  const instagramHref = settings.instagramUrl?.trim();

  return (
    <footer className="mt-24 pb-10">
      <BackToTopButton />

      <div className="px-4 sm:px-6 text-center text-sm sm:text-[16px] text-[var(--color-text-muted)]">
        <div>{copyrightText}</div>

        <div className="mt-3 flex items-center justify-center gap-3">
          {contactHref ? (
            <a
              href={contactHref}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              contact
            </a>
          ) : (
            <span className="text-[var(--color-text-muted)]">contact</span>
          )}

          <span className="text-[var(--color-text-muted)]">/</span>

          {instagramHref ? (
            <Link
              href={instagramHref}
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              instagram
            </Link>
          ) : (
            <span className="text-[var(--color-text-muted)]">instagram</span>
          )}
        </div>
      </div>
    </footer>
  );
}
