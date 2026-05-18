import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { PageHero } from "@/components/PageHero";
import { FinalCta } from "@/components/home/FinalCta";
import { BreadcrumbsJsonLd, WebPageJsonLd } from "@/components/seo/JsonLd";
import { query } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog & insights",
  description:
    "Insights from HakimeRAD on AI in radiology, teleradiology workflows, and improving diagnostic-imaging access in Ethiopia.",
  alternates: { canonical: "/blog" },
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default async function BlogPage() {
  const blogPosts = await query('SELECT * FROM blog_posts ORDER BY date DESC') as any[];

  return (
    <>
      <PageHero
        eyebrow="Blog & insights"
        title="Ideas from the front lines of teleradiology."
        description="Writing about AI in radiology, integration patterns for Ethiopian healthcare, and the patient-facing impact of cloud-native diagnostics."
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
      />

      <Section>
        <Stagger className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <StaggerItem
              key={post.slug}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-ink-100">
                <Image
                  src={post.image || "/images/blog/default.jpg"}
                  alt={post.image_alt || post.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-blue-700 backdrop-blur">
                  {post.category}
                </span>
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-500">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="size-3.5" aria-hidden />
                    <time dateTime={post.date}>
                      {dateFormatter.format(new Date(post.date))}
                    </time>
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User className="size-3.5" aria-hidden />
                    {post.author}
                  </span>
                  <span>{post.reading_minutes} min read</span>
                </div>
                <h2 className="mt-3 font-display text-lg font-semibold leading-snug text-ink-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="after:absolute after:inset-0 hover:text-brand-blue-700"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-blue-700">
                  Read more
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <FinalCta />

      <WebPageJsonLd
        name="HakimeRAD Blog"
        description="Insights from HakimeRAD on teleradiology, AI in radiology, and healthcare in Ethiopia."
        path="/blog"
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
        ]}
      />
    </>
  );
}
