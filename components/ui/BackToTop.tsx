"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/cn";

export function BackToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-5 right-5 z-40 flex size-11 items-center justify-center rounded-full bg-brand-blue-700 text-white shadow-soft transition-all duration-300 hover:bg-brand-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-700 focus-visible:ring-offset-2",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0 pointer-events-none",
      )}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}
