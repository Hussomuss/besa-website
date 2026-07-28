import type {
  AudienceContent,
  HeroContent,
  StatementContent,
} from "@/shared/types/content";

export const HOME_HERO: HeroContent = {
  heading: [
    { text: "Private lifestyle management for people whose time is " },
    { text: "already", isAccent: true },
    { text: " spoken for." },
  ],
  lead: "We run the household, the diary and the travel, and we do it without needing to be chased.",
  cta: { label: "Enquire", href: "/contact" },
  image: {
    src: "https://images.pexels.com/photos/17154881/pexels-photo-17154881.jpeg",
    alt: "The facade and front door of a Georgian townhouse in central London.",
  },
};

/**
 * Images are development placeholders on Pexels and must be replaced with
 * licensed photography before launch.
 */
export const WHO_WE_SUPPORT: AudienceContent = {
  heading: [
    { text: "Professional athletes. Families. Executives. International clients." },
  ],
  lead: "Clients come to us when a life has more moving parts than one person can hold. Several homes, a season spent abroad, a household that has to run whether anyone is there or not.",
  cta: { label: "About the practice", href: "/about" },
  /** First image takes the large tile, so order matters here. */
  images: [
    {
      src: "https://images.pexels.com/photos/18729246/pexels-photo-18729246.jpeg",
      alt: "Red brick townhouses on a London garden square.",
    },
    {
      src: "https://images.pexels.com/photos/15571805/pexels-photo-15571805.jpeg",
      alt: "A pale sofa beside a column radiator in a quiet room.",
    },
    {
      src: "https://images.pexels.com/photos/16028536/pexels-photo-16028536.jpeg",
      alt: "A bentwood chair beside a marble table against panelling.",
    },
  ],
};

export const OUR_APPROACH: StatementContent = {
  heading: [{ text: "Most of our work, you will never see." }],
  lead: "Clients come to us by introduction and tend to stay for years. We keep what we know to ourselves, we do not discuss one client with another, and we would rather deal with a problem before it reaches you.",
};

export const CLOSING: StatementContent = {
  heading: [
    { text: "Most conversations begin with an introduction. Some begin with an email." },
  ],
  cta: { label: "Enquire", href: "/contact" },
};
