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

        {/*
          Below lg this is a scroll-snap row rather than a stack: three square
          images stacked make a very long scroll, and a peeking next card is a
          clearer affordance than a scrollbar. The negative margin plus matching
          padding lets cards scroll to the screen edge while still starting on
          the container's text alignment; scroll-px keeps snapped cards on that
          same line. At lg it reverts to a plain three-column grid.
        */}
        <ul className="no-scrollbar -mx-6 mt-16 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 md:-mx-10 md:scroll-px-10 md:px-10 lg:mx-0 lg:mt-20 lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {/* h-full has to run through li and Reveal or the cards' mt-auto has
              no height to push against and the buttons stop aligning. */}
          {SERVICES.map((service, index) => (
            <li
              key={service.title}
              className="h-full w-[78vw] shrink-0 snap-start sm:w-[58vw] lg:w-auto"
            >
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
