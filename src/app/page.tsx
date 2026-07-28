import { Faq } from "@/features/home/components/faq";
import { Hero } from "@/features/home/components/hero";
import { OurApproach } from "@/features/home/components/our-approach";
import { WhoWeSupport } from "@/features/home/components/who-we-support";
import { ServicesBand } from "@/features/services/components/services-band";
import { Main } from "@/shared/layout/main";

/*
 * The hero fills the viewport and the header floats on it. At lg the
 * photograph is the right half only, so both marks cluster into the left half
 * and land on bone; below lg the picture is the whole ground and there is no
 * safe side to move to, so they stay at opposite ends and take the scrim.
 */
export default function HomePage() {
  return (
    <Main
      ground={{ base: "photo", lg: "bone" }}
      menuSpan={{ base: "full", lg: "1/2" }}
    >
      <Hero />
      <WhoWeSupport />
      <ServicesBand />
      <OurApproach />
      <Faq />
    </Main>
  );
}
