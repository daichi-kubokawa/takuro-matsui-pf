import OpenInNewIcon from "@mui/icons-material/OpenInNew";
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

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={styles.link}>
      <span>{children}</span>
      <OpenInNewIcon fontSize="inherit" className={styles.linkIcon} />
    </a>
  );
}

export default function AboutList({ items, type }: Props) {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => {
        if (type === "clients") {
          const content = item.name;

          return (
            <li
              key={`${item.name}-${index}`}
              className={`${styles.item} font-en`}
            >
              {item.url && item.name ? (
                <ExternalLink href={item.url}>{content}</ExternalLink>
              ) : (
                content
              )}
            </li>
          );
        }

        if (type === "awards") {
          const content = (
            <>
              {item.year} — {item.title}
            </>
          );

          return (
            <li
              key={`${item.year}-${item.title}-${index}`}
              className={`${styles.item} font-en`}
            >
              {item.url && item.title ? (
                <ExternalLink href={item.url}>{content}</ExternalLink>
              ) : (
                content
              )}
            </li>
          );
        }

        const content = (
          <>
            {item.year} {item.title}
            {item.place ? `, ${item.place}` : ""}
          </>
        );

        return (
          <li
            key={`${item.year}-${item.title}-${index}`}
            className={`${styles.item} font-en`}
          >
            {item.url && item.title ? (
              <ExternalLink href={item.url}>{content}</ExternalLink>
            ) : (
              content
            )}
          </li>
        );
      })}
    </ul>
  );
}
