import type { Metadata } from "next";
import { ServicesClosing } from "@/features/services/components/services-closing";
import { ServicesHero } from "@/features/services/components/services-hero";
import { ServicesIndex } from "@/features/services/components/services-index";
import { Main } from "@/shared/layout/main";

export const metadata: Metadata = { title: "Services" };

/*
 * `pale` at every width: the hero photograph is a bone wall in daylight, so
 * the header floats over it keeping ink marks. It sits on the picture below
 * `wide` and on the picture again above it, which is why there is no
 * responsive pair here.
 *
 * The span is why this page needs one at all. The dried stems own the right
 * edge of the frame, and they are near-ink hairlines: in the right gutter the
 * trigger measures 2.0:1 to 2.7:1 at its fifth percentile across every
 * desktop size, on a mean of 5.6:1 that hides the problem entirely. 2/3 lands
 * its right edge on the vertical where the still life begins, which is bare
 * wall, and it holds from 1024 to 3440 with 9.4:1 as the worst case.
 *
 * Below `lg` the trigger goes back to the gutter, because below `lg` the hero
 * has moved the photograph out from under the header and both marks stand on
 * flat linen. Nothing there needs moving, and a span on a phone would only
 * push the trigger into the wordmark.
 */
export default function ServicesPage() {
  return (
    <Main ground="pale" menuSpan={{ base: "full", lg: "2/3" }}>
      <ServicesHero />
      <ServicesIndex />
      <ServicesClosing />
    </Main>
  );
}
