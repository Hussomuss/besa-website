import type { Metadata } from "next";
import { AboutClosing } from "@/features/about/components/about-closing";
import { AboutHero } from "@/features/about/components/about-hero";
import { AboutStatement } from "@/features/about/components/about-statement";
import { ThePractice } from "@/features/about/components/the-practice";
import { Main } from "@/shared/layout/main";

export const metadata: Metadata = { title: "About" };

/*
 * Bone either side of the band, so the page reads loud, quiet, structured,
 * quiet rather than running two full-bleed grounds straight into each other.
 *
 * Below lg the hero's moss panel runs under the header, and the menu is pulled
 * in to two thirds so it stays on that panel rather than crossing onto the
 * photograph beside it. At lg the composition insets itself below the header
 * and both marks stand on bone canvas.
 */
export default function AboutPage() {
  return (
    <Main
      ground={{ base: "moss", lg: "bone" }}
      menuSpan={{ base: "2/3", lg: "full" }}
    >
      <AboutHero />
      <AboutStatement />
      <ThePractice />
      <AboutClosing />
    </Main>
  );
}
