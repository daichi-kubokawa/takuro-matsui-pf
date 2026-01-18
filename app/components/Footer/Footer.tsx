import styles from "./Footer.module.css";
import { getSettings } from "../../lib/cms/settings";
type SocialLink = { label: string; url: string };

export default async function Footer() {
  const s = await getSettings();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.note}>{s.footerNote}</p>

        {(s.socialLinks?.length ?? 0) > 0 && (
          <ul className={styles.sns}>
            {s.socialLinks!.map((x: SocialLink) => (
              <li key={`${x.label}-${x.url}`}>
                <a href={x.url} target="_blank" rel="noreferrer">
                  {x.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
