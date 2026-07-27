import type { SectionContent, ServiceContent } from "@/shared/types/content";

export const SERVICES_INTRO: SectionContent = {
  heading: [{ text: "What we take on." }],
  lead: "Three parts of a life, held continuously rather than handled task by task.",
};

/**
 * Images are development placeholders on Pexels and must be replaced with
 * licensed photography before launch. All three currently point at /services;
 * per-service routes do not exist yet.
 */
export const SERVICES: readonly ServiceContent[] = [
  {
    title: "Lifestyle and household management",
    description:
      "Staff, maintenance, contractors, security, and the ordinary weekly running of the house.",
    href: "/services",
    image: {
      src: "https://images.pexels.com/photos/16101858/pexels-photo-16101858.jpeg",
      alt: "Folded linen bedding in soft daylight.",
    },
  },
  {
    title: "Travel and itinerary management",
    description:
      "Flights, private aviation, accommodation and ground arrangements, watched while you travel.",
    href: "/services",
    image: {
      src: "https://images.pexels.com/photos/17969920/pexels-photo-17969920.jpeg",
      alt: "The cream leather interior of a classic car.",
    },
  },
  {
    title: "Relocation and settling in",
    description:
      "Property search, schools, registrations and introductions, from the first viewing to the first month.",
    href: "/services",
    image: {
      src: "https://images.pexels.com/photos/17273253/pexels-photo-17273253.jpeg",
      alt: "An empty reception room with tall windows and a chandelier.",
    },
  },
];
