import Image from "next/image";
import type { About, Settings } from "@/lib/microcms/types";
import FadeInOnScroll from "@/components/common/FadeInOnScroll/FadeInOnScroll";
import AboutHero from "../AboutHero/AboutHero";
import AboutSection from "../AboutSection/AboutSection";
import AboutList from "../AboutList/AboutList";
import styles from "./AboutPage.module.css";

type Props = {
  about: About;
  settings: Settings;
};

export default function AboutPage({ about, settings }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <FadeInOnScroll>
          <AboutHero about={about} />
        </FadeInOnScroll>

        {about.awards && about.awards.length > 0 ? (
          <FadeInOnScroll delay={40}>
            <AboutSection title="Awards">
              <AboutList items={about.awards} type="awards" />
            </AboutSection>
          </FadeInOnScroll>
        ) : null}

        {about.clients && about.clients.length > 0 ? (
          <FadeInOnScroll delay={80}>
            <AboutSection title="Clients">
              <AboutList items={about.clients} type="clients" />
            </AboutSection>
          </FadeInOnScroll>
        ) : null}

        {about.exhibitions && about.exhibitions.length > 0 ? (
          <FadeInOnScroll delay={120}>
            <AboutSection title="Exhibitions">
              <AboutList items={about.exhibitions} type="exhibitions" />
            </AboutSection>
          </FadeInOnScroll>
        ) : null}

        <FadeInOnScroll delay={160}>
          <AboutSection title="Contact">
            {about.contactTextJa ? (
              <p className={`${styles.contactText} font-ja`}>
                {about.contactTextJa}
              </p>
            ) : null}

            <div className={`${styles.email} font-en`}>
              <a
                className={styles.link}
                href={`mailto:${settings.contactEmail}`}
              >
                {settings.contactEmail}
              </a>
            </div>
          </AboutSection>
        </FadeInOnScroll>
      </div>

      {about.portrait?.url ? (
        <aside className={styles.side}>
          <FadeInOnScroll delay={60}>
            <div className={styles.imageWrap}>
              <Image
                src={about.portrait.url}
                alt={about.nameJa}
                fill
                sizes="(max-width: 767px) 100vw, 380px"
                className={styles.image}
              />
            </div>
          </FadeInOnScroll>
        </aside>
      ) : null}
    </div>
  );
}
