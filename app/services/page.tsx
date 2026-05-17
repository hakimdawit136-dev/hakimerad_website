import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/home/FinalCta";
import {
  BreadcrumbsJsonLd,
  ServiceListJsonLd,
  WebPageJsonLd,
} from "@/components/seo/JsonLd";
import {
  onboardingProcess,
  services,
  traditionalVsTeleradiology,
} from "@/lib/content/services";

export const metadata: Metadata = {
  title: "Teleradiology Services",
  description:
    "Routine teleradiology reporting, subspecialty consultations, AI-augmented image analysis, and a cloud-native PACS/RIS platform — built for Ethiopian healthcare.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Comprehensive teleradiology, end to end."
        description="From a single STAT case to a full enterprise platform — the same standards, the same radiologists, the same uptime."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <Section>
        <SectionHeading
          eyebrow="What we offer"
          title="Four services that work alone or together."
          description="Each service can be adopted independently. Combined, they form a single, cohesive teleradiology operation."
        />
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem
                key={s.slug}
                className="group relative flex h-full flex-col rounded-3xl border border-ink-200 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-blue-50 text-brand-blue-700 transition-colors group-hover:bg-brand-orange-100 group-hover:text-brand-orange-700">
                      <Icon className="size-6" aria-hidden />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
                      {s.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">
                      {s.tagline}
                    </p>
                  </div>
                </div>
                <ul className="mt-6 space-y-2">
                  {s.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-ink-700"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brand-teal-600"
                        aria-hidden
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-ink-100">
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-blue-700 hover:text-brand-blue-800"
                  >
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Why teleradiology"
          title="Traditional radiology vs. HakimeRAD."
          description="A practical comparison of what changes when you move from on-prem to cloud-native, AI-assisted teleradiology."
        />
        <div className="mt-12 overflow-hidden rounded-3xl border border-ink-200 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-[2fr_1.4fr_1.4fr] sm:items-center sm:gap-0">
            <div className="hidden bg-ink-50 px-6 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 sm:block" />
            <div className="hidden bg-ink-50 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-500 sm:block">
              Traditional radiology
            </div>
            <div className="hidden bg-brand-blue-50 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue-700 sm:block">
              HakimeRAD
            </div>
            {traditionalVsTeleradiology.rows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-1 border-t border-ink-100 sm:grid-cols-[2fr_1.4fr_1.4fr] sm:items-center"
              >
                <div className="px-6 py-4 text-sm font-medium text-ink-800">
                  {row.feature}
                </div>
                <div className="px-6 py-4 text-sm text-ink-600 sm:text-center">
                  <span className="sm:hidden text-xs uppercase tracking-wider text-ink-500">
                    Traditional:&nbsp;
                  </span>
                  {row.traditional}
                </div>
                <div className="px-6 py-4 text-sm font-medium text-ink-900 sm:text-center">
                  <span className="sm:hidden text-xs uppercase tracking-wider text-brand-blue-700">
                    HakimeRAD:&nbsp;
                  </span>
                  {row.us}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Getting started"
          title="A clear, four-step onboarding."
          description="From first conversation to live coverage — typically in two to four weeks."
        />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {onboardingProcess.map((step) => {
            const Icon = step.icon;
            return (
              <StaggerItem
                key={step.step}
                className="relative rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
              >
                <span className="absolute -top-3 left-6 inline-flex h-6 items-center rounded-full bg-brand-blue-700 px-3 text-xs font-semibold text-white">
                  Step {step.step}
                </span>
                <Icon className="mt-4 size-7 text-brand-orange-500" aria-hidden />
                <h3 className="mt-4 text-base font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {step.description}
                </p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Section>

      <FinalCta />

      {/* SEO */}
      <ServiceListJsonLd
        items={services.map((s) => ({
          name: s.name,
          description: s.description,
          slug: s.slug,
        }))}
      />
      <WebPageJsonLd
        name="HakimeRAD Services"
        description="Routine teleradiology reporting, sub-specialty consultations, AI-augmented image analysis, and cloud-native PACS/RIS."
        path="/services"
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
    </>
  );
}
