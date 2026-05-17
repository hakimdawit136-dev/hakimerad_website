import type { Metadata } from "next";
import { Check, X } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/home/FinalCta";
import {
  BreadcrumbsJsonLd,
  FaqJsonLd,
  WebPageJsonLd,
} from "@/components/seo/JsonLd";
import { pricingPlans } from "@/lib/content/pricing";
import { pricingFaqs } from "@/lib/content/faqs";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Flexible teleradiology pricing for Ethiopian healthcare providers — per-case, 24/7 partnership, or after-hours coverage. No setup fees. No hidden costs.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Flexible pricing for every facility."
        description="No setup fees. No hidden costs. Pick the model that matches your case volume — switch any time."
        crumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
      />

      <Section>
        <Stagger className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <StaggerItem
              key={plan.slug}
              className={cn(
                "relative flex h-full flex-col rounded-3xl border bg-white p-8 transition-all duration-300",
                plan.featured
                  ? "border-brand-blue-700 shadow-soft lg:-translate-y-2 lg:scale-[1.02]"
                  : "border-ink-200 shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
              )}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-1/2 inline-flex h-7 -translate-x-1/2 items-center rounded-full bg-brand-orange-500 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                  Most popular
                </span>
              ) : null}
              <div>
                <h2 className="font-display text-xl font-semibold text-ink-900">
                  {plan.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {plan.description}
                </p>
                <p className="mt-6 font-display text-3xl font-bold text-ink-900">
                  {plan.priceLabel}
                  {plan.priceSuffix ? (
                    <span className="ml-1 text-sm font-medium text-ink-500">
                      {plan.priceSuffix}
                    </span>
                  ) : null}
                </p>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li
                    key={f.label}
                    className={cn(
                      "flex items-start gap-2",
                      f.included ? "text-ink-700" : "text-ink-400",
                    )}
                  >
                    {f.included ? (
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-brand-teal-600"
                        aria-hidden
                      />
                    ) : (
                      <X
                        className="mt-0.5 size-4 shrink-0 text-ink-300"
                        aria-hidden
                      />
                    )}
                    <span className={f.included ? "" : "line-through"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Button
                  href={plan.cta.href}
                  size="md"
                  variant={plan.featured ? "primary" : "outline"}
                  className="w-full"
                >
                  {plan.cta.label}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-ink-500">
          All plans include AES-256 encryption, signed audit logs, and Ethiopia-aligned data residency. Sub-specialty consultations available on Premium and as an add-on.
        </p>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Pricing FAQ"
          title="Everything you need to know before you sign."
        />
        <div className="mx-auto mt-10 max-w-3xl sm:mt-14">
          <Accordion
            items={pricingFaqs.map((f) => ({
              id: f.id,
              question: f.question,
              answer: <p>{f.answer}</p>,
            }))}
            defaultOpen={pricingFaqs[0]?.id}
          />
        </div>
      </Section>

      <FinalCta />

      <WebPageJsonLd
        name="HakimeRAD Pricing"
        description="Per-case, premium partnership, and after-hours teleradiology pricing for Ethiopian healthcare providers."
        path="/pricing"
      />
      <FaqJsonLd
        items={pricingFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Pricing", href: "/pricing" },
        ]}
      />
    </>
  );
}
