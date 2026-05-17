import type { Metadata } from "next";
import Image from "next/image";
import { Award, BadgeCheck, Heart, Target } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/home/FinalCta";
import { WebPageJsonLd, BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { aboutValues, certifications, team } from "@/lib/content/team";

export const metadata: Metadata = {
  title: "About HakimeRAD",
  description:
    "Founded by Dr. Dawit Muluneh, HakimeRAD is on a mission to make expert diagnostic imaging service accessible to every client in Ethiopian and beyond.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Built by Radiologist and Clinical experts. Engineered for Ethiopia."
        description="HakimeRAD was founded to close Ethiopia's diagnostic-imaging service gap — bringing expert diagnostic radiology service to every patient and healthcare service providers, regardless of where they live."
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-600">
              Our story
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
              From a clinical service delivery gap to a national diagnostic radiology service delivery platform.
            </h2>
            <div className="mt-6 space-y-4 text-pretty text-base leading-relaxed text-ink-600">
              <p>
                Founded in 2025 by Dr. Dawit Muluneh, HakimeRAD emerged from a
                clinical reality: too many Ethiopian patients waiting too long
                for a diagnosis that already exists somewhere in the system.
              </p>
              <p>
                We started with a simple thesis. If the radiologist shortage is
                a structural problem, the answer is leverage — software that
                makes every radiologist&rsquo;s hour count for two or three.
              </p>
              <p>
                Today, HakimeRAD pairs an AI-augmented worklist with a network
                of board-certified diaspora specialist and sub-specialist radiologists, delivered through a cloud-native
                PACS that works for an academic hospital in Addis Ababa and a
                rural clinic in Jigjiga alike.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/services">Explore our services</Button>
              <Button href="/contact" variant="outline">
                Talk to the team
              </Button>
            </div>
          </Reveal>

          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue-100 to-brand-orange-50 shadow-soft">
              <Image
                src="/photos/ceo-dawit.png"
                alt="Dr. Dawit Muluneh, Founder & CEO of HakimeRAD"
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                className="object-cover object-top"
              />
            </div>
            <p className="mt-4 text-center text-sm text-ink-500">
              Dr. Dawit Muluneh — Founder &amp; CEO
            </p>
          </Reveal>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Mission & vision"
          title="A clear north star, a practical roadmap."
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:mt-14 md:grid-cols-2">
          <Reveal className="rounded-3xl border border-ink-200 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-soft">
            <Target className="size-9 text-brand-orange-500" aria-hidden />
            <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
              Our Mission
            </h3>
            <p className="mt-2 text-ink-600">
              To bridge the diagnostic gap in Ethiopia by providing fast,
              accurate, AI-assisted radiology reports to every healthcare
              facility — urban or rural — using a secure, cloud-native platform.
            </p>
          </Reveal>
          <Reveal
            delay={0.1}
            className="rounded-3xl border border-ink-200 bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-soft"
          >
            <Heart className="size-9 text-brand-orange-500" aria-hidden />
            <h3 className="mt-5 font-display text-xl font-semibold text-ink-900">
              Our Vision
            </h3>
            <p className="mt-2 text-ink-600">
              An Ethiopia where every patient — no matter where they live —
              can access expert diagnostic imaging on the day they need it.
            </p>
          </Reveal>
        </div>

        <SectionHeading
          className="mt-20"
          eyebrow="What we value"
          title="Four principles that show up in every decision."
        />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aboutValues.map((v) => (
            <StaggerItem
              key={v.title}
              className="rounded-2xl border border-ink-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-soft"
            >
              <BadgeCheck className="size-6 text-brand-blue-700" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-ink-900">
                {v.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">
                {v.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Leadership"
          title="The team behind HakimeRAD."
          description="A clinician-led team building the platform we wish existed when we were first reading studies in Addis."
        />
        <Stagger className="mt-12 grid gap-6 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <StaggerItem
              key={`${member.role}-${member.name}`}
              className="overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-shadow duration-300 hover:shadow-soft"
            >
              <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-blue-50 to-brand-orange-50">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}, ${member.role} of HakimeRAD`}
                  fill
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-600">
                  {member.role}
                </p>
                <h3 className="mt-1 font-display text-lg font-semibold text-ink-900">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {member.bio}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Standards & security"
          title="The non-negotiables."
        />
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c) => (
            <StaggerItem
              key={c.name}
              className="rounded-2xl border border-ink-200 bg-white p-6 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
            >
              <Award className="size-6 text-brand-orange-500" aria-hidden />
              <h3 className="mt-3 text-base font-semibold text-ink-900">
                {c.name}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">
                {c.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <FinalCta />

      <WebPageJsonLd
        name="About HakimeRAD"
        description="Learn about HakimeRAD&rsquo;s mission, team, and standards."
        path="/about"
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />
    </>
  );
}
