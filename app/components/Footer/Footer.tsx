import "server-only";
import Link from "next/link";
import { getSettings } from "../../lib/microcms/settings";
import BackToTopButton from "./BackToTopButton";

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
      {/* ✅ スクロールしたら出るTOP */}
      <BackToTopButton />

      <div className="px-4 sm:px-6 text-center text-xs sm:text-sm text-neutral-500">
        <div>
          <span>&copy; </span>
          {copyrightText}
        </div>

        <div className="mt-3 flex items-center justify-center gap-3">
          {contactHref ? (
            <a
              href={contactHref}
              className="hover:text-neutral-900 transition-colors"
            >
              contact
            </a>
          ) : (
            <span className="text-neutral-400">contact</span>
          )}

          <span className="text-neutral-300">/</span>

          {instagramHref ? (
            <Link
              href={instagramHref}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 transition-colors"
            >
              instagram
            </Link>
          ) : (
            <span className="text-neutral-400">instagram</span>
          )}
        </div>
      </div>
    </footer>
  );
}
