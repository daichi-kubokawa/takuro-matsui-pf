"use client";

import { useEffect } from "react";
import { LAST_WORK_ID_STORAGE_KEY } from "../shared";

export default function ScrollRestore() {
  useEffect(() => {
    const workId = sessionStorage.getItem(LAST_WORK_ID_STORAGE_KEY);
    if (!workId) return;

    const timer = window.setTimeout(() => {
      const target = document.querySelector(`[data-work-id="${workId}"]`);

      if (target instanceof HTMLElement) {
        target.scrollIntoView({
          block: "start",
          behavior: "auto",
        });
      }

      sessionStorage.removeItem(LAST_WORK_ID_STORAGE_KEY);
    }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
