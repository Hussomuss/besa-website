import type { Href } from "@/shared/types/ui";

export interface ImageContent {
  src: string;
  alt: string;
}

export interface CtaContent {
  label: string;
  href: Href;
}

/**
 * Headings are segmented rather than a single string so a word can carry the
 * italic accent without a component doing fragile string matching.
 */
export interface HeadingSegment {
  text: string;
  isAccent?: boolean;
}

export interface HeroContent {
  heading: readonly HeadingSegment[];
  lead: string;
  cta: CtaContent;
  image: ImageContent;
}

export interface NavItem {
  label: string;
  href: Href;
}

export interface ServiceContent {
  title: string;
  description: string;
  href: Href;
  image: ImageContent;
}

export interface SectionContent {
  heading: readonly HeadingSegment[];
  lead?: string;
}
