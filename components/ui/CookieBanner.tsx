"use client";

import * as React from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "hakimerad-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // small delay so it doesn't fight the page load animation
        const t = window.setTimeout(() => setVisible(true), 800);
        return () => window.clearTimeout(t);
      }
    } catch {
      /* ignore (private mode / SSR) */
    }
  }, []);

  const accept = React.useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className={cn(
        "fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-ink-200 bg-white/95 p-4 shadow-soft backdrop-blur",
        "sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2",
      )}
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Cookie className="size-6 shrink-0 text-brand-orange-500" aria-hidden />
        <p className="text-sm text-ink-700">
          We use essential cookies to run this site. Read our{" "}
          <Link
            href="/privacy"
            className="font-semibold text-brand-blue-700 underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-brand-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue-700 focus-visible:ring-offset-2"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={accept}
            aria-label="Dismiss"
            className="rounded-full p-2 text-ink-500 hover:bg-ink-100"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
