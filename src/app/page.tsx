import { Hero } from "@/features/home/components/hero";
import { ServicesBand } from "@/features/services/components/services-band";

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <ServicesBand />
    </main>
  );
}
