import type { Metadata } from "next";
import { Suspense } from "react";
import { Globe, Mail, MapPin, Phone } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { SocialIcons } from "@/components/layout/SocialIcons";
import { BreadcrumbsJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the HakimeRAD team about teleradiology coverage, partnerships, or technical support. We respond within one business day.",
  alternates: { canonical: "/contact" },
};

const infoCards = [
  {
    icon: MapPin,
    label: "Headquarters",
    value: `${siteConfig.contact.address.city}, ${siteConfig.contact.address.country}`,
    sub: `Hubs: ${siteConfig.contact.address.regionalHubs.join(" • ")}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.contact.phoneDisplay,
    href: `tel:${siteConfig.contact.phone}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    icon: Globe,
    label: "Website",
    value: siteConfig.contact.websiteDisplay,
    href: siteConfig.contact.website,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Let&rsquo;s talk about your imaging service."
        description="Tell us a little about your facility and what you need. We&rsquo;ll get back to you within one business day."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {infoCards.map((card) => {
            const Icon = card.icon;
            return (
              <Reveal
                key={card.label}
                className="rounded-2xl border border-ink-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
              >
                <Icon className="size-6 text-brand-orange-500" aria-hidden />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
                  {card.label}
                </p>
                {card.href ? (
                  <a
                    href={card.href}
                    className="mt-1 block text-base font-semibold text-ink-900 hover:text-brand-blue-700"
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="mt-1 text-base font-semibold text-ink-900">
                    {card.value}
                  </p>
                )}
                {card.sub ? (
                  <p className="mt-1 text-xs text-ink-500">{card.sub}</p>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="muted">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-600">
              Send a message
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              Tell us about your needs.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-600">
              Whether you need overnight coverage, a sub-specialty consult, or a
              full platform deployment &mdash; we&rsquo;ll get the right person on the call.
            </p>
            <div className="mt-8 hidden lg:block">
              <p className="text-sm font-semibold text-ink-800">
                Prefer a different channel?
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li>
                  <a
                    className="hover:text-brand-blue-700"
                    href={`mailto:${siteConfig.contact.email}`}
                  >
                    Email: {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-brand-blue-700"
                    href={`tel:${siteConfig.contact.phone}`}
                  >
                    Phone: {siteConfig.contact.phoneDisplay}
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <SocialIcons tone="light" />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Suspense
              fallback={
                <div className="h-[640px] rounded-3xl border border-ink-200 bg-white shadow-soft" />
              }
            >
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </Section>

      <Section>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-600">
            Where we operate
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            Headquartered in Addis Ababa. On the ground across Ethiopia.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-600">
            Regional hubs in Dire Dawa, Harar, Jigjiga, Jimma, Hawassa, and Adama — with cloud-native reach to every connected clinic in the country.
          </p>
        </Reveal>
        <div className="mt-8">
          <MapEmbed />
        </div>
      </Section>

      <WebPageJsonLd
        name="Contact HakimeRAD"
        description="Contact HakimeRAD for teleradiology services, partnerships, or technical support."
        path="/contact"
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Contact", href: "/contact" },
        ]}
      />
    </>
  );
}
