import type { FaqContent } from "@/shared/types/content";

/**
 * Draft answers written to fill the evidential gaps in the page: how an
 * engagement starts, confidentiality, coverage, continuity of contact, limits,
 * and charging. Every one of these is a claim about how BESA operates and must
 * be confirmed with the client before launch.
 */
export const FAQ: FaqContent = {
  heading: [{ text: "What people ask first." }],
  items: [
    {
      question: "How does an engagement begin?",
      answer:
        "Usually with an introduction from someone we already look after, though not always. The first conversation is about whether we are the right fit for each other, and it costs nothing.",
    },
    {
      question: "How do you handle confidentiality?",
      answer:
        "Everyone who works here signs a non-disclosure agreement before they meet a client. We do not discuss one client with another, we are not on social media, and we do not use client names in conversation or in writing.",
    },
    {
      question: "Who will I actually deal with?",
      answer:
        "One person, and a deputy who knows your household for when they are away. You will not be passed to a rota, and the person who answers is the person who already knows the context.",
    },
    {
      question: "Where do you work?",
      answer:
        "London is home. We run households and travel across the UK and Europe, and we keep people we trust in most of the cities our clients pass through.",
    },
    {
      question: "What do you not do?",
      answer:
        "We are not investment advisers, lawyers or accountants, and we will not pretend otherwise. We work alongside the people who already advise you, and we can introduce you to others where you need them.",
    },
    {
      question: "How is it charged?",
      answer:
        "An annual retainer, agreed after the first conversation and set by how much of a life we are asked to hold. There is no hourly billing, and we take no commission on anything we book on your behalf.",
    },
  ],
};
