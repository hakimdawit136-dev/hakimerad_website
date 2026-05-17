import Link from "next/link";
import { Compass } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section size="lg" tone="mesh">
      <div className="mx-auto max-w-xl text-center">
        <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-blue-700 text-white shadow-soft">
          <Compass className="size-7" aria-hidden />
        </span>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-600">
          404 — Page not found
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
          We can&rsquo;t seem to find that page.
        </h1>
        <p className="mt-3 text-base text-ink-600">
          The link may be broken, or the page may have moved. Here are some places to pick up where you left off.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="md">
            Go home
          </Button>
          <Link
            href="/services"
            className="text-sm font-semibold text-brand-blue-700 hover:underline"
          >
            Browse services
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-brand-blue-700 hover:underline"
          >
            Contact us
          </Link>
        </div>
      </div>
    </Section>
  );
}
