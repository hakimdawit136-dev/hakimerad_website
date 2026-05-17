import { siteConfig } from "@/lib/site";

type Json = Record<string, unknown>;

function script(data: Json) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return script({
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon/apple-icon-180x180.png`,
    description: siteConfig.description,
    foundingDate: "2025",
    founder: {
      "@type": "Person",
      name: siteConfig.founder.name.replace(/, MD$/, ""),
      jobTitle: siteConfig.founder.role,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      contactType: "customer service",
      availableLanguage: ["English", "Amharic"],
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.x,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.telegram,
      siteConfig.social.tiktok,
    ],
  });
}

export function WebPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return script({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: `${siteConfig.url}${path}`,
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  });
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return script({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  });
}

export function ServiceListJsonLd({
  items,
}: {
  items: { name: string; description: string; slug: string }[];
}) {
  return script({
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${siteConfig.name} Services`,
    itemListElement: items.map((it, idx) => ({
      "@type": "Service",
      position: idx + 1,
      name: it.name,
      description: it.description,
      url: `${siteConfig.url}/services/${it.slug}`,
      provider: {
        "@type": "MedicalOrganization",
        name: siteConfig.legalName,
      },
    })),
  });
}

export function BreadcrumbsJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return script({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: `${siteConfig.url}${it.href}`,
    })),
  });
}
