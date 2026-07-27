import type { NavItem } from "@/shared/types/content";

export const NAV_ITEMS: readonly NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Who we support", href: "/#who-we-support" },
  { label: "About", href: "/about" },
  { label: "Our approach", href: "/#our-approach" },
  { label: "Contact", href: "/contact" },
] as const;

export const LEGAL_NAV_ITEMS: readonly NavItem[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
] as const;
