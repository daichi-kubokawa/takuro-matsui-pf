"use client";

import { useRouter } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./CloseButton.module.css";

type Props = {
  fallbackHref: string;
  ariaLabel?: string;
};

export default function CloseButton({
  fallbackHref,
  ariaLabel = "一覧へ戻る",
}: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.root}
      aria-label={ariaLabel}
      onClick={() => {
        router.push(fallbackHref, { scroll: false });
      }}
    >
      <CloseIcon fontSize="small" />
    </button>
  );
}
