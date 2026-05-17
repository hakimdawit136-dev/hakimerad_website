import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/home/FinalCta";
import { BreadcrumbsJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { getServiceBySlug, services } from "@/lib/content/services";
import { siteConfig } from "@/lib/site";

type Params = Promise<{ slug: string }>;

// Restrict dynamic rendering to the known service slugs so unknown slugs
// return a real 404 instead of a soft-404 (the not-found UI with a 200 status).
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return {
      title: "Service",
    };
  }
  return {
    title: service.metadata.title,
    description: service.metadata.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.metadata.title} — ${siteConfig.name}`,
      description: service.metadata.description,
      url: `${siteConfig.url}/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Params;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    notFound();
  }
  const Icon = service.icon;
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={service.tagline}
        description={service.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.name },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-blue-50 text-brand-blue-700">
              <Icon className="size-7" aria-hidden />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              Overview
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              {service.body.overview}
            </p>

            <h3 className="mt-12 font-display text-2xl font-semibold text-ink-900">
              Capabilities
            </h3>
            <ul className="mt-6 space-y-4">
              {service.body.capabilities.map((c) => (
                <li
                  key={c.title}
                  className="rounded-2xl border border-ink-200 bg-white p-5"
                >
                  <p className="font-semibold text-ink-900">{c.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">
                    {c.description}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="sticky top-24 rounded-3xl border border-ink-200 bg-gradient-to-br from-brand-blue-50 to-white p-8 shadow-soft">
              <h3 className="font-display text-xl font-semibold text-ink-900">
                What you get
              </h3>
              <ul className="mt-5 space-y-3">
                {service.body.benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-ink-700"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-brand-teal-600"
                      aria-hidden
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 border-t border-ink-200 pt-6">
                <Button href="/contact" size="md" className="w-full">
                  Request a consultation
                  <ArrowRight className="size-4" aria-hidden />
                </Button>
                <Button
                  href="/pricing"
                  variant="ghost"
                  size="sm"
                  className="mt-2 w-full"
                >
                  View pricing options
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-600">
              Keep exploring
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              Other HakimeRAD services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-700 hover:text-brand-blue-800"
          >
            View all services <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <Stagger className="mt-8 grid gap-4 sm:grid-cols-3">
          {otherServices.map((s) => {
            const OtherIcon = s.icon;
            return (
              <StaggerItem
                key={s.slug}
                className="group rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <Link href={`/services/${s.slug}`} className="block">
                  <OtherIcon className="size-7 text-brand-blue-700" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold text-ink-900">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {s.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-700">
                    Learn more
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <FinalCta />

      <WebPageJsonLd
        name={`${service.name} — ${siteConfig.name}`}
        description={service.metadata.description}
        path={`/services/${service.slug}`}
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.name, href: `/services/${service.slug}` },
        ]}
      />
    </>
  );
}
