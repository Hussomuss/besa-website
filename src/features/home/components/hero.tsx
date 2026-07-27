import { HOME_HERO } from "@/data/home";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

export function Hero() {
  const { heading, lead, cta, image } = HOME_HERO;

  // `isolate` keeps the scrim's multiply blend inside the hero.
  return (
    <Section spacing="none" className="relative isolate overflow-hidden">
      <ImageFrame
        src={image.src}
        alt={image.alt}
        isPriority
        hasIntro
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="absolute inset-0 aspect-auto h-full w-full lg:left-auto lg:w-[52%]"
      />

      {/* Scrim carries the copy on mobile only, where text sits on the photo. */}
      <div
        aria-hidden
        className="scrim-hero absolute inset-0 lg:hidden"
      />

      <Container className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col justify-end pt-16 pb-16 text-bone lg:grid lg:grid-cols-12 lg:items-center lg:py-24 lg:text-ink">
        <div className="max-lg:text-shadow-scrim lg:col-span-5">
          <Heading as="h1" size="display" className="text-balance">
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
          <Text size="lead" className="mt-6 max-w-[26rem] text-balance lg:mt-8">
            {lead}
          </Text>
          <Button
            href={cta.href}
            variant="default"
            className="mt-8 max-lg:[--wipe-fill:var(--color-bone)] max-lg:border-bone/40 max-lg:text-bone max-lg:hover:text-ink max-sm:w-full lg:mt-12"
          >
            {cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
