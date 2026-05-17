import { Facebook, Instagram, Linkedin, MessageCircle, Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

type Social = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M17.53 3H21l-7.39 8.45L22.5 21H15.6l-5.4-7.05L4 21H.53l7.89-9.02L1.5 3h6.99l4.88 6.46L17.53 3Zm-1.22 16h1.86L7.78 5H5.79l10.52 14Z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V9.81a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-1.24Z" />
    </svg>
  );
}

const socials: Social[] = [
  { href: siteConfig.social.facebook, label: "Facebook", icon: Facebook },
  { href: siteConfig.social.x, label: "X (Twitter)", icon: XIcon },
  { href: siteConfig.social.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: siteConfig.social.instagram, label: "Instagram", icon: Instagram },
  { href: siteConfig.social.telegram, label: "Telegram", icon: Send },
  { href: siteConfig.social.tiktok, label: "TikTok", icon: TikTokIcon },
  { href: siteConfig.social.whatsapp, label: "WhatsApp", icon: MessageCircle },
];

export function SocialIcons({ tone = "dark" }: { tone?: "dark" | "light" } = {}) {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {socials.map((s) => {
        const Icon = s.icon;
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`Follow ${siteConfig.name} on ${s.label}`}
              className={
                tone === "dark"
                  ? "inline-flex size-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-orange-500 hover:text-white"
                  : "inline-flex size-9 items-center justify-center rounded-full bg-brand-blue-50 text-brand-blue-700 transition-colors hover:bg-brand-blue-700 hover:text-white"
              }
            >
              <Icon className="size-4" aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
