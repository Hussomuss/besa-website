import { SERVICES, SERVICES_INTRO } from "@/data/services";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";
import { ServiceCard } from "./service-card";

export function ServicesBand() {
  const { heading, lead } = SERVICES_INTRO;

  return (
    <Section id="services" tone="moss" spacing="none">
      <Container className="flex min-h-screen flex-col justify-center py-24 lg:py-28">
        <div className="max-w-xl">
          <Heading as="h2" size="h2">
            {heading.map((segment) =>
              segment.isAccent ? (
                <em key={segment.text} className="font-normal italic">
                  {segment.text}
                </em>
              ) : (
                segment.text
              ),
            )}
          </Heading>
          {lead ? (
            <Text size="lead" className="mt-6 max-w-md opacity-80">
              {lead}
            </Text>
          ) : null}
        </div>

        <ul className="mt-16 grid gap-x-5 gap-y-14 lg:mt-20 lg:grid-cols-3">
          {/* h-full has to run through li and Reveal or the cards' mt-auto
              has no height to push against and the buttons stop aligning. */}
          {SERVICES.map((service, index) => (
            <li key={service.title} className="h-full">
              <Reveal delay={index * 90} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
