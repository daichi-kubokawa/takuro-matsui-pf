import type { Work } from "@/lib/microcms/types";
import BackButton from "@/components/common/BackButton/BackButton";
import WorkGallery from "@/components/works/WorkGallery/WorkGallery";
import styles from "./WorkDetail.module.css";

type Props = {
  work: Work;
  backHref: string;
};

export default function WorkDetail({ work, backHref }: Props) {
  const displayTitle = work.titleJa || work.title;
  const titleFontClass = work.titleJa ? "font-ja" : "font-en";

  const displayClientName = work.clientNameJa || work.clientName;
  const clientNameFontClass = work.clientNameJa ? "font-ja" : "font-en";

  const displayRole = work.roleJa || work.role;
  const roleFontClass = work.roleJa ? "font-ja" : "font-en";

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
      <header className={styles.header}>
        <h1 className={`${styles.title} ${titleFontClass}`}>{displayTitle}</h1>

        {displayClientName || displayRole || work.year ? (
          <div className={styles.meta}>
            {displayClientName || displayRole ? (
              <div className={styles.metaRow}>
                {displayClientName ? (
                  <span className={`${styles.credit} ${clientNameFontClass}`}>
                    {displayClientName}
                  </span>
                ) : null}

                {displayClientName && displayRole ? (
                  <span className={styles.separator}> / </span>
                ) : null}

                {displayRole ? (
                  <span className={`${styles.credit} ${roleFontClass}`}>
                    {displayRole}
                  </span>
                ) : null}
              </div>
            ) : null}

            {work.year ? (
              <p className={`${styles.year} font-en`}>{work.year}</p>
            ) : null}
          </div>
        ) : null}
      </header>

      {galleryImages.length > 0 ? <WorkGallery images={galleryImages} /> : null}

      <div className={styles.backArea}>
        <BackButton fallbackHref={backHref} />
      </div>
    </article>
  );
}
