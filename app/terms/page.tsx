import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/ui/Section";
import { WebPageJsonLd, BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { loadMarkdown, renderMarkdown } from "@/lib/markdown";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of hakimerad.health.et. Commercial teleradiology services are covered by a separate agreement.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  const md = loadMarkdown("terms.md");
  const html = renderMarkdown(md);
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms governing use of this website."
        crumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]}
      />
      <Section>
        <article
          className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display prose-h1:hidden prose-a:text-brand-blue-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Section>
      <WebPageJsonLd
        name="Terms of Service — HakimeRAD"
        description="Terms of service for the HakimeRAD website."
        path="/terms"
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Terms", href: "/terms" },
        ]}
      />
    </>
  );
}
