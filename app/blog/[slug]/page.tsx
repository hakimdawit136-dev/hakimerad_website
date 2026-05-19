import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { FinalCta } from "@/components/home/FinalCta";
import { BreadcrumbsJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site";
import { query } from "@/lib/db";

type Params = Promise<{ slug: string }>;

// Restrict dynamic rendering to the known blog slugs so unknown slugs return
// a real 404 instead of a soft-404 (the not-found UI with a 200 status).
export const dynamicParams = true;

// Remove static params for database-driven blog
export async function generateStaticParams() {
  return [];
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const posts = await query('SELECT * FROM blog_posts WHERE slug = ?', [slug]) as any[];
  const post = posts[0];
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.image || "/images/blog/default.jpg", alt: post.image_alt || post.title }],
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const posts = await query('SELECT * FROM blog_posts WHERE slug = ?', [slug]) as any[];
  const post = posts[0];
  if (!post) notFound();

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    image: `${siteConfig.url}${post.image}`,
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/favicon/apple-icon-180x180.png`,
      },
    },
  };

  return (
    <>
      <article>
        <header className="bg-brand-blue-900 text-white">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to blog
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange-300">
              {post.category}
            </p>
            <h1 className="mt-3 text-balance font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-pretty text-base text-white/85 sm:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/75">
              <span className="inline-flex items-center gap-2">
                <User className="size-4" aria-hidden />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="size-4" aria-hidden />
                <time dateTime={post.date}>
                  {dateFormatter.format(new Date(post.date))}
                </time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="size-4" aria-hidden />
                {post.reading_minutes} min read
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-ink-200 bg-ink-100 shadow-soft">
            <Image
              src={post.image || "/images/blog/default.jpg"}
              alt={post.image_alt || post.title}
              fill
              priority
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <Section>
          <div className="prose prose-lg mx-auto max-w-3xl prose-headings:font-display prose-a:text-brand-blue-700 prose-strong:text-ink-900">
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }} />
            ) : null}
          </div>
        </Section>
      </article>

      <FinalCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <BreadcrumbsJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />
    </>
  );
}
