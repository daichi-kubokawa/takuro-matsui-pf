import Image from "next/image";
import type { About } from "@/lib/microcms/types";
import styles from "./AboutHero.module.css";

type Props = {
  about: About;
};

export default function AboutHero({ about }: Props) {
  const bioJa = about.bioJa.replace(/\s+/g, "").trim();

  return (
    <section className={styles.root}>
      <div className={styles.textArea}>
        <h1 className={`${styles.name} font-ja`}>{about.nameJa}</h1>

        <div className={`${styles.bio} font-ja`}>
          <p>{bioJa}</p>
        </div>
      </div>

      {about.portrait?.url ? (
        <div className={styles.imageArea}>
          <div className={styles.imageWrap}>
            <Image
              src={about.portrait.url}
              alt={about.nameJa}
              fill
              sizes="(max-width: 767px) 100vw, 420px"
              className={styles.image}
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
