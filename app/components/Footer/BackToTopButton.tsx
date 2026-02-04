"use client";

import { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/ArrowUpward";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 100px以上スクロールしたら表示
      setVisible(window.scrollY > 100);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="#top"
        className="flex flex-col items-center gap-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
        aria-label="Back to top"
      >
        <KeyboardArrowUpIcon fontSize="small" />
        <span>TOP</span>
      </a>
    </div>
  );
}
