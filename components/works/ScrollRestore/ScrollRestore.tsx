"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LAST_WORK_SLUG_STORAGE_KEY } from "../shared";

const HEADER_OFFSET = 96;
const MAX_WAIT_MS = 4000;

function getVisibleTarget(workSlug: string) {
  const targets = Array.from(
    document.querySelectorAll<HTMLElement>(`[data-work-slug="${workSlug}"]`),
  );

  return targets.find((target) => {
    const style = window.getComputedStyle(target);
    const rect = target.getBoundingClientRect();

    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      rect.width > 0 &&
      rect.height > 0
    );
  });
}

export default function ScrollRestore() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const workSlug = sessionStorage.getItem(LAST_WORK_SLUG_STORAGE_KEY);
    if (!workSlug) return;

    let timeoutId: number | null = null;
    let observer: MutationObserver | null = null;
    let rafId = 0;
    const startedAt = Date.now();

    const cleanup = () => {
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
      if (observer) {
        observer.disconnect();
      }
      window.cancelAnimationFrame(rafId);
    };

    const scrollToTarget = (target: HTMLElement) => {
      const top =
        target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: "auto",
      });

      sessionStorage.removeItem(LAST_WORK_SLUG_STORAGE_KEY);
      cleanup();
    };

    const tryScroll = () => {
      const target = getVisibleTarget(workSlug);

      if (target) {
        scrollToTarget(target);
        return;
      }

      if (Date.now() - startedAt > MAX_WAIT_MS) {
        cleanup();
        return;
      }

      rafId = window.requestAnimationFrame(tryScroll);
    };

    observer = new MutationObserver(() => {
      const target = getVisibleTarget(workSlug);
      if (target) {
        scrollToTarget(target);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    timeoutId = window.setTimeout(() => {
      cleanup();
    }, MAX_WAIT_MS);

    rafId = window.requestAnimationFrame(tryScroll);

    return cleanup;
  }, [pathname, searchParams]);

  return null;
}
