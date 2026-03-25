import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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
      <span className={styles.label}>Filters:</span>

      <div className={styles.spSelectWrap}>
        <select
          value={activeTag}
          onChange={(event) => onChange(event.target.value)}
          className={styles.select}
          aria-label="Filter works by tag"
        >
          <option value="all">ALL</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.id}>
              {tag.name}
            </option>
          ))}
        </select>

        <span className={styles.selectIcon} aria-hidden="true">
          <ExpandMoreIcon fontSize="inherit" />
        </span>
      </div>

      <div className={styles.pcButtons}>
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
    </div>
  );
}
