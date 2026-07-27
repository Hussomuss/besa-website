import type { Href } from "@/shared/types/ui";

export interface ImageContent {
  src: string;
  alt: string;
}

export interface CtaContent {
  label: string;
  href: Href;
}

export interface HeroContent {
  heading: string;
  lead: string;
  cta: CtaContent;
  image: ImageContent;
}

export interface NavItem {
  label: string;
  href: Href;
}
