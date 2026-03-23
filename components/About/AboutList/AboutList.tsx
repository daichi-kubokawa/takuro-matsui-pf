import styles from "./AboutList.module.css";

type BaseItem = {
  name?: string;
  url?: string;
  year?: number;
  title?: string;
  place?: string;
};

type Props = {
  items: BaseItem[];
  type: "awards" | "clients" | "exhibitions";
};

export default function AboutList({ items, type }: Props) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => {
        if (type === "clients") {
          return (
            <li
              key={`${item.name}-${index}`}
              className={`${styles.item} font-en`}
            >
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                >
                  {item.name}
                </a>
              ) : (
                item.name
              )}
            </li>
          );
        }

        if (type === "awards") {
          return (
            <li
              key={`${item.year}-${item.title}-${index}`}
              className={`${styles.item} font-en`}
            >
              {item.year} — {item.title}
            </li>
          );
        }

        return (
          <li
            key={`${item.year}-${item.title}-${index}`}
            className={`${styles.item} font-en`}
          >
            {item.year} {item.title}
            {item.place ? `, ${item.place}` : ""}
          </li>
        );
      })}
    </ul>
  );
}
