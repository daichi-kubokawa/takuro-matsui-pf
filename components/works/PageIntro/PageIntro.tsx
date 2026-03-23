import styles from "./PageIntro.module.css";

type Props = {
  title: string;
  subtitle?: string;
};

export default function PageIntro({ title, subtitle }: Props) {
  return (
    <section className={styles.root}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </section>
  );
}
