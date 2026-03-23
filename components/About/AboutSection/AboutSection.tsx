import type { ReactNode } from "react";
import styles from "./AboutSection.module.css";

type Props = {
  title: string;
  children: ReactNode;
};

export default function AboutSection({ title, children }: Props) {
  return (
    <section className={styles.root}>
      <h2 className={`${styles.heading} font-en`}>{title}</h2>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
