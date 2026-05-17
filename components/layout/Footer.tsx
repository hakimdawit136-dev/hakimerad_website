import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Globe } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { footerNav } from "@/lib/nav";
import { Container } from "@/components/ui/Container";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative overflow-hidden bg-brand-blue-900 text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(255,153,0,0.18) 0%, transparent 35%), radial-gradient(circle at 100% 80%, rgba(20,184,166,0.15) 0%, transparent 40%)",
        }}
      />
      <Container className="relative pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3" aria-label={`${siteConfig.name} — home`}>
              <Image
                src="/favicon/apple-icon-180x180.png"
                alt=""
                aria-hidden
                width={48}
                height={48}
                className="size-12 rounded-md bg-white p-1"
              />
              <span className="font-display text-2xl font-bold leading-none">
                <span className="text-white">Hakim</span>
                <span className="text-brand-orange-400">eRAD</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
              {siteConfig.description}
            </p>
            <div className="mt-6">
              <SocialIcons />
            </div>
          </div>

          <FooterColumn title="Product" links={footerNav.product} />
          <FooterColumn title="Company" links={footerNav.company} />

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-white/85">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-orange-300" aria-hidden />
                <span>
                  {siteConfig.contact.address.city},{" "}
                  {siteConfig.contact.address.country}
                  <br />
                  <span className="text-white/65">
                    Hubs: {siteConfig.contact.address.regionalHubs.join(" • ")}
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-brand-orange-300" aria-hidden />
                <a
                  className="hover:text-white"
                  href={`tel:${siteConfig.contact.phone}`}
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-brand-orange-300" aria-hidden />
                <a
                  className="hover:text-white"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="size-4 shrink-0 text-brand-orange-300" aria-hidden />
                <a
                  className="hover:text-white"
                  href={siteConfig.contact.website}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {siteConfig.contact.websiteDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/70">
            {footerNav.legal.map((item) => (
              <li key={item.href}>
                <Link className="hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
        {title}
      </h2>
      <ul className="mt-5 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link className="text-white/80 hover:text-white" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
