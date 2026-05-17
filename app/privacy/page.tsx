import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { WebPageJsonLd, BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { loadMarkdown, renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HakimeRAD collects, uses, and protects information on hakimerad.health.et and across our teleradiology services.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const md = loadMarkdown("privacy.md");
  const html = renderMarkdown(md);
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle the information you share with us."
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]}
      />
      <Section>
        <article
          className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display prose-h1:hidden prose-a:text-brand-blue-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Section>
      <WebPageJsonLd
        name="Privacy Policy — HakimeRAD"
        description="HakimeRAD privacy policy."
        path="/privacy"
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy", href: "/privacy" },
        ]}
      />
    </>
  );
}
