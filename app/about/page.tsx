import styles from "./page.module.css";
import { getAbout } from "../lib/cms/about";
import { getSettings } from "../lib/cms/settings";

export default async function AboutPage() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);
  const mail = settings.contactEmail;
  const label = settings.contactEmailLabel ?? mail;

  return (
    <main className={styles.main}>
      <div className={styles.inner}>
        <h1 className={styles.h1}>{about.title}</h1>

        {/* 本文（リッチエディタHTML） */}
        <div
          className={styles.rich}
          dangerouslySetInnerHTML={{ __html: about.body }}
        />

        {/* 画像 */}
        {about.profileImage?.url && (
          <figure className={styles.figure}>
            <img
              className={styles.profileImage}
              src={about.profileImage.url}
              alt={about.profileImageAlt ?? ""}
              loading="lazy"
            />
          </figure>
        )}

        {/* Clients */}
        {about.clients && (
          <section className={styles.block}>
            <h2 className={styles.h2}>{about.clientsHeading ?? "Clients"}</h2>
            <pre className={styles.pre}>{about.clients}</pre>
          </section>
        )}

        {/* Awards */}
        {about.awards && (
          <section className={styles.block}>
            <h2 className={styles.h2}>{about.awardsHeading ?? "Awards"}</h2>
            <pre className={styles.pre}>{about.awards}</pre>
          </section>
        )}

        {/* Exhibitions */}
        {about.exhibitions && (
          <section className={styles.block}>
            <h2 className={styles.h2}>
              {about.exhibitionsHeading ?? "Exhibitions"}
            </h2>
            <pre className={styles.pre}>{about.exhibitions}</pre>
          </section>
        )}

        {/* Contact */}
        {(about.showContact ?? true) && (
          <section className={styles.block}>
            <h2 className={styles.h2}>{about.contactHeading ?? "Contact"}</h2>
            {about.contactText && (
              <p className={styles.p}>{about.contactText}</p>
            )}
            <a className={styles.mail} href={`mailto:${mail}`}>
              {label}
            </a>
          </section>
        )}
      </div>
    </main>
  );
}
