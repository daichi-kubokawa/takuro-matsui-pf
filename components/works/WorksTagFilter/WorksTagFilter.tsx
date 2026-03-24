import styles from "./WorksTagFilter.module.css";

type TagItem = {
  id: string;
  name: string;
};

type Props = {
  tags: TagItem[];
  activeTag: string;
  onChange: (tagId: string) => void;
};

export default function WorksTagFilter({ tags, activeTag, onChange }: Props) {
  return (
    <div className={styles.root}>
      <span className={styles.label}>Filters :</span>

      <button
        type="button"
        onClick={() => onChange("all")}
        className={activeTag === "all" ? styles.active : styles.button}
      >
        ALL
      </button>

      {tags.map((tag) => (
        <button
          key={tag.id}
          type="button"
          onClick={() => onChange(tag.id)}
          className={activeTag === tag.id ? styles.active : styles.button}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
}
