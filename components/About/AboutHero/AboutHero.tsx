import type { About } from "@/lib/microcms/types";
import styles from "./AboutHero.module.css";

type Props = {
  about: About;
};

export default function AboutHero({ about }: Props) {
  const bioJa = about.bioJa.trim();

  return (
    <section className={styles.root}>
      <div className={styles.textArea}>
        <h1 className={`${styles.name} font-ja`}>{about.nameJa}</h1>

        <div className={`${styles.bio} font-ja`}>
          <p>{bioJa}</p>
        </div>
      </div>
    </section>
  );
}
