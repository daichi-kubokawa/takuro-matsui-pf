"use client";

import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import styles from "./BackButton.module.css";

type Props = {
  fallbackHref: string;
  label?: string;
};

export default function BackButton({ fallbackHref, label = "BACK" }: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      className={styles.root}
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }

        router.push(fallbackHref);
      }}
    >
      <ArrowBackIcon fontSize="small" />
      <span>{label}</span>
    </button>
  );
}
