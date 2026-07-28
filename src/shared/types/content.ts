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

export interface AudienceContent extends SectionContent {
  cta: CtaContent;
  images: readonly ImageContent[];
}

export interface StatementContent extends SectionContent {
  cta?: CtaContent;
}

/**
 * One panel of a numbered band. The panel's ground is presentation and is
 * decided by position, not stated here — otherwise the copy would be carrying
 * a colour, and reordering the items would recolour the band.
 */
export interface NumberedItem {
  heading: readonly HeadingSegment[];
  body: string;
  /** Only the light panel carries one. */
  image?: ImageContent;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent extends SectionContent {
  items: readonly FaqItem[];
  image: ImageContent;
}
