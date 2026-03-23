import { getAbout } from "@/lib/microcms/about";
import { getSettings } from "@/lib/microcms/settings";
import AboutPage from "@/components/About/AboutPage/AboutPage";
import styles from "./page.module.css";

export default async function Page() {
  const [about, settings] = await Promise.all([getAbout(), getSettings()]);

  return (
    <main className={styles.root}>
      <AboutPage about={about} settings={settings} />
    </main>
  );
}
