import type { Work } from "@/lib/microcms/types";
import FadeInOnScroll from "@/components/common/FadeInOnScroll/FadeInOnScroll";
import CloseButton from "@/components/common/CloseButton/CloseButton";
import WorkGallery from "@/components/works/WorkGallery/WorkGallery";
import WorkDetailNav from "@/components/works/WorkDetailNav/WorkDetailNav";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styles from "./WorkDetail.module.css";

type AdjacentWork = {
  slug: string;
  title: string;
  titleJa?: string;
  href: string;
};

type Props = {
  work: Work;
  backHref: string;
  prevWork?: AdjacentWork | null;
  nextWork?: AdjacentWork | null;
};

export default function WorkDetail({
  work,
  backHref,
  prevWork,
  nextWork,
}: Props) {
  const displayTitle = work.titleJa || work.title;
  const titleFontClass = work.titleJa ? "font-ja" : "font-en";

  const displayClientName = work.clientNameJa || work.clientName;
  const clientNameFontClass = work.clientNameJa ? "font-ja" : "font-en";

  const credits =
    work.credits?.filter(
      (credit) => credit?.role?.trim() && credit?.name?.trim(),
    ) ?? [];

  const links =
    work.links?.filter((link) => link?.label?.trim() && link?.url?.trim()) ??
    [];

  const hasMeta = !!displayClientName || credits.length > 0 || !!work.year;
  const hasLinks = links.length > 0;

  const galleryImages =
    work.images && work.images.length > 0
      ? work.images.map((image, index) => ({
          src: image.url,
          alt: `${displayTitle} ${index + 1}`,
        }))
      : work.thumbnail?.url
        ? [{ src: work.thumbnail.url, alt: displayTitle }]
        : [];

  return (
    <article className={styles.root}>
      <FadeInOnScroll>
        <div className={styles.topCloseArea}>
          <CloseButton fallbackHref={backHref} ariaLabel="一覧へ戻る" />
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll delay={40}>
        <header className={styles.header}>
          <h1 className={`${styles.title} ${titleFontClass}`}>
            {displayTitle}
          </h1>

          {hasMeta ? (
            <div className={styles.meta}>
              {displayClientName ? (
                <p className={`${styles.clientName} ${clientNameFontClass}`}>
                  {displayClientName}
                </p>
              ) : null}

              {credits.length > 0 ? (
                <div className={styles.credits}>
                  {credits.map((credit, index) => (
                    <p
                      key={`${credit.role}-${credit.name}-${index}`}
                      className={`${styles.credit} font-ja`}
                    >
                      <span className={styles.creditRole}>{credit.role}</span>
                      <span className={styles.creditDivider}>：</span>
                      <span className={styles.creditName}>{credit.name}</span>
                    </p>
                  ))}
                </div>
              ) : null}

              {work.year ? (
                <p className={`${styles.year} font-en`}>{work.year}</p>
              ) : null}
            </div>
          ) : null}

          {hasLinks ? (
            <div className={styles.linkArea}>
              {links.map((link, index) => (
                <a
                  key={`${link.label}-${link.url}-${index}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.externalLink} font-ja`}
                >
                  <span>{link.label}</span>
                  <OpenInNewIcon
                    fontSize="inherit"
                    className={styles.linkIcon}
                  />
                </a>
              ))}
            </div>
          ) : null}
        </header>
      </FadeInOnScroll>

      {galleryImages.length > 0 ? (
        <FadeInOnScroll delay={80}>
          <WorkGallery images={galleryImages} />
        </FadeInOnScroll>
      ) : null}

      <FadeInOnScroll delay={120}>
        <WorkDetailNav prevWork={prevWork} nextWork={nextWork} />
      </FadeInOnScroll>
    </article>
  );
}
