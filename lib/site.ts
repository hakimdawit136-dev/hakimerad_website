/**
 * Single source of truth for site-wide constants. Update social URLs here
 * once you have the real handles — every link in the codebase reads from this.
 */

export const siteConfig = {
  name: "HakimeRAD",
  legalName: "HakimeRad Teleradiology Consultancy PLC",
  tagline: "Bridging Diagnostic Gaps in Ethiopia's Healthcare",
  description:
    "HakimeRAD delivers secure, AI-supported teleradiology services connecting healthcare institutions with certified radiologists across Ethiopia and the Horn of Africa.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://www.hakimerad.health.et",
  domain: "hakimerad.health.et",
  contact: {
    email: "info@hakimerad.health.et",
    supportEmail: "support@hakimerad.health.et",
    phone: "+251906373154",
    phoneDisplay: "+251 906 373 154",
    website: "https://www.hakimerad.health.et",
    websiteDisplay: "www.hakimerad.health.et",
    address: {
      city: "Addis Ababa",
      country: "Ethiopia",
      regionalHubs: ["Dire Dawa", "Harar", "Jigjiga", "Jimma", "Hawassa", "Adama"],
    },
  },
  // Replace these placeholders with the real account URLs when ready.
  social: {
    facebook: "https://www.facebook.com/HakimeRAD",
    x: "https://x.com/HakimeRAD",
    linkedin: "https://www.linkedin.com/company/HakimeRAD",
    instagram: "https://www.instagram.com/HakimeRAD",
    telegram: "https://t.me/HakimeRAD",
    tiktok: "https://www.tiktok.com/@HakimeRAD",
    whatsapp: "https://wa.me/251906373154",
  },
  founder: {
    name: "Dr. Dawit Muluneh, MD",
    role: "Founder & CEO",
  },
} as const;

export type SiteConfig = typeof siteConfig;
