import { Faq } from "@/features/home/components/faq";
import { Hero } from "@/features/home/components/hero";
import { OurApproach } from "@/features/home/components/our-approach";
import { WhoWeSupport } from "@/features/home/components/who-we-support";
import { ServicesBand } from "@/features/services/components/services-band";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <WhoWeSupport />
      <ServicesBand />
      <OurApproach />
      <Faq />
    </main>
  );
}
