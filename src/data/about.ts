import type {
  HeroContent,
  NumberedItem,
  StatementContent,
} from "@/shared/types/content";

/**
 * Images are development placeholders on Pexels and must be replaced with
 * licensed photography before launch. The hero frame is shared with
 * WHO_WE_SUPPORT on the home page for now; they should not stay the same
 * picture once the real set arrives.
 */
export const ABOUT_HERO: HeroContent = {
  heading: [
    { text: "A private office, kept deliberately " },
    { text: "small", isAccent: true },
    { text: "." },
  ],
  lead: "BESA was set up to run households, diaries and travel for a handful of clients at a time. We take on few, and we tend to stay for years.",
  cta: { label: "Why we stay small", href: "#why" },
  image: {
    src: "https://images.pexels.com/photos/15571805/pexels-photo-15571805.jpeg",
    alt: "A pale sofa beside a column radiator in a quiet room.",
  },
};

/**
 * Sets up the panels below and, more usefully, gives the page somewhere to
 * breathe between the hero and the band. Deliberately a heading and nothing
 * else: a lead here would be a third block of prose before the reader has
 * reached the argument.
 */
export const ABOUT_STATEMENT: StatementContent = {
  heading: [
    { text: "There is a version of this work that " },
    { text: "scales", isAccent: true },
    { text: ". We did not want to build it." },
  ],
};

export const ABOUT_CLOSING: StatementContent = {
  heading: [
    { text: "If you are looking for someone to " },
    { text: "hold", isAccent: true },
    { text: " all of it, we should talk." },
  ],
  cta: { label: "Enquire", href: "/contact" },
};

/**
 * Why the practice exists, not how an engagement runs. The distinction is
 * load-bearing: process copy belongs on /services, and an about page that
 * describes its own procedure has said nothing about itself.
 *
 * Order is the argument — a claim, the thing that claim is really about, and
 * what it costs us — so these do not reorder without being rewritten.
 */
export const THE_PRACTICE: readonly NumberedItem[] = [
  {
    heading: [
      { text: "Anyone can be capable " },
      { text: "once", isAccent: true },
      { text: "." },
    ],
    body: "There is no shortage of people who will solve a problem on the day it appears. We would rather have noticed it a month earlier.",
  },
  {
    heading: [
      { text: "Knowing a house for six years is a " },
      { text: "different", isAccent: true },
      { text: " kind of service." },
    ],
    body: "Which boiler goes in January, which neighbour keeps the spare key, how a family really likes to travel rather than how they describe it. None of that is written down, and it does not come across when someone new takes over.",
  },
  {
    heading: [
      { text: "Growing would " },
      { text: "break", isAccent: true },
      { text: " it." },
    ],
    body: "There is only so much one office can keep in its head. Every household we add means slightly less attention for the ones already here, so we add them rarely, and never faster than we can learn them.",
    image: {
      src: "https://images.pexels.com/photos/16028536/pexels-photo-16028536.jpeg",
      alt: "A bentwood chair beside a marble table against panelling.",
    },
  },
];
