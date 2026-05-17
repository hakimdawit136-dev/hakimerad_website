import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Crumb = { label: string; href?: string };

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  crumbs?: Crumb[];
  align?: "left" | "center";
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  align = "center",
  className,
}: Props) {
  return (
    <section
      aria-labelledby="page-hero-title"
      className={cn(
        "relative isolate overflow-hidden bg-brand-blue-900 text-white",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(50% 60% at 0% 0%, rgba(255,153,0,0.22) 0%, transparent 60%), radial-gradient(40% 60% at 100% 100%, rgba(20,184,166,0.18) 0%, transparent 60%)",
        }}
      />
      <Container
        className={cn(
          "relative py-20 sm:py-28",
          align === "center" ? "text-center" : "text-left",
        )}
      >
        {crumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-5 flex justify-center text-sm text-white/70">
            <ol
              className={cn(
                "flex flex-wrap items-center gap-1",
                align === "center" ? "justify-center" : "",
              )}
            >
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={`${c.label}-${i}`} className="flex items-center gap-1">
                    {c.href && !last ? (
                      <Link href={c.href} className="hover:text-white">
                        {c.label}
                      </Link>
                    ) : (
                      <span className={last ? "text-white" : ""}>{c.label}</span>
                    )}
                    {!last ? (
                      <ChevronRight className="size-3 text-white/40" aria-hidden />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        <Reveal>
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-300">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id="page-hero-title"
            className="mt-3 text-balance font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
          >
            {title}
          </h1>
          {description ? (
            <p
              className={cn(
                "mt-5 text-pretty text-base text-white/85 sm:text-lg",
                align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
              )}
            >
              {description}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
