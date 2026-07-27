import type { HeroContent } from "@/shared/types/content";

export const HOME_HERO: HeroContent = {
  heading: [
    { text: "Private lifestyle management for people whose time is " },
    { text: "already", isAccent: true },
    { text: " spoken for." },
  ],
  lead: "We run the household, the diary and the travel, and we do it without needing to be chased.",
  cta: { label: "Our services", href: "/services" },
  image: {
    src: "https://images.pexels.com/photos/17154881/pexels-photo-17154881.jpeg",
    alt: "The facade and front door of a Georgian townhouse in central London.",
  },
};
