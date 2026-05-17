"use client";

import * as React from "react";
import { AlertTriangle } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section size="lg">
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-red-100 text-red-600">
          <AlertTriangle className="size-7" aria-hidden />
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-600">
          Something went wrong
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          We hit an unexpected error.
        </h1>
        <p className="mt-3 text-base text-ink-600">
          Our team has been notified. You can try again or head back to the
          home page.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset} size="md">
            Try again
          </Button>
          <Button href="/" variant="outline" size="md">
            Go home
          </Button>
        </div>
      </div>
    </Section>
  );
}
