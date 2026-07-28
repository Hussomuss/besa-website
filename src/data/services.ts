import type {
  HeroContent,
  SectionContent,
  ServiceContent,
  StatementContent,
} from "@/shared/types/content";

/**
 * The one photograph on this site that is ours rather than a placeholder: a
 * still life shot for BESA, 1808x1024, with the whole subject in the right
 * third and nothing but wall in the left half. Both of those facts are load
 * bearing in ServicesHero, which stands the heading on the empty half and
 * crops from the right when it has to.
 */
export const SERVICES_HERO: HeroContent = {
  heading: [
    { text: "Three parts of a life, kept " },
    { text: "running", isAccent: true },
    { text: "." },
  ],
  lead: "Households, travel, and moving between countries. The same office runs all three, week after week, so nothing has to be explained twice.",
  cta: { label: "Enquire", href: "/contact" },
  image: {
    src: "/images/services-hero.avif",
    alt: "A BESA card resting against a ceramic vase of dried gypsophila on a stone shelf.",
  },
};

export const SERVICES_INTRO: SectionContent = {
  heading: [{ text: "What we take on." }],
  lead: "Most clients arrive with one of these and hand us the other two within the year. The parts stop being separate quite quickly.",
};

/**
 * Images are development placeholders on Pexels and must be replaced with
 * licensed photography before launch. All three currently point at /services;
 * per-service routes do not exist yet, which is why the index rows on this
 * page are not links.
 */
export const SERVICES: readonly ServiceContent[] = [
  {
    title: "Lifestyle and household management",
    description:
      "Staff, maintenance, contractors, security, and the ordinary weekly running of the house.",
    detail:
      "Staff, contractors, maintenance and security, and the ordinary weekly running of the house. We hold the schedules, the keys and the history of the building, which is why most of it never reaches you.",
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
    detail:
      "Flights, private aviation, accommodation and the cars at either end. Booked once and then watched, so a delayed leg is rearranged while you are still in the air rather than after you land.",
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
    detail:
      "Property search, schools, registrations, and the introductions that make a new city workable. We stay well past the move itself, through the first month, which is when the small problems actually turn up.",
    href: "/services",
    image: {
      src: "https://images.pexels.com/photos/17273253/pexels-photo-17273253.jpeg",
      alt: "An empty reception room with tall windows and a chandelier.",
    },
  },
];

export const SERVICES_CLOSING: StatementContent = {
  heading: [
    { text: "Tell us what a normal week looks like, and we will tell you what we would " },
    { text: "take", isAccent: true },
    { text: " off it." },
  ],
  cta: { label: "Enquire", href: "/contact" },
};
