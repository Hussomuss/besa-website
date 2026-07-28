import { SERVICES, SERVICES_INTRO } from "@/data/services";
import { BranchBackdrop } from "@/shared/ui/branch-backdrop";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { Reveal } from "@/shared/ui/reveal";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";
import { ServiceCard } from "./service-card";

export function ServicesBand() {
  const { heading, lead } = SERVICES_INTRO;

  // isolate is what lets BranchBackdrop's -z-10 sit above bg-moss instead of
  // behind it; overflow-hidden is scoped to lg because that is the only width
  // the backdrop exists at, and clipping the phone's snap row would be a
  // change for nothing.
  return (
    <Section
      id="services"
      tone="moss"
      spacing="none"
      className="relative isolate lg:overflow-hidden"
    >
      <BranchBackdrop />

      <Container className="flex flex-col py-24 lg:py-28">
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
        <ul className="no-scrollbar -mx-6 mt-16 flex snap-x snap-mandatory scroll-px-6 gap-6 lg:gap-8 overflow-x-auto px-6 md:-mx-10 md:scroll-px-10 md:px-10 lg:mx-0 lg:mt-20 lg:grid lg:snap-none lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {/*
            The li must NOT carry h-full. A flex item whose cross size is
            specified opts out of align-items: stretch, so each card collapses
            to its own content height and mt-auto has no free space to push the
            button into — a two-line title drops that card's button a line below
            its neighbours. Left alone, stretch gives the li the flex line's
            height, and a stretched cross size is definite, which is exactly
            what the h-full on Reveal and on the card below it resolve against.

            The grid at lg stretches its items either way, which is why this
            only ever showed up in the carousel.
          */}
          {SERVICES.map((service, index) => (
            <li
              key={service.title}
              className="w-[78vw] shrink-0 snap-start sm:w-[58vw] lg:w-auto"
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
