import styles from "./WorksTagFilter.module.css";

type TagItem = {
  id: string;
  name: string;
  slug?: string;
};

type Props = {
  tags: TagItem[];
  activeTag: string;
  onChange: (tagValue: string) => void;
};

export default function WorksTagFilter({ tags, activeTag, onChange }: Props) {
  return (
    <div className={styles.root}>
      <span className={styles.label}>Filters:</span>

      <div className={styles.buttons}>
        <button
          type="button"
          onClick={() => onChange("all")}
          className={activeTag === "all" ? styles.active : styles.button}
        >
          ALL
        </button>

        {tags.map((tag) => {
          const tagValue = tag.slug ?? tag.id;

          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => onChange(tagValue)}
              className={activeTag === tagValue ? styles.active : styles.button}
            >
              {tag.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
