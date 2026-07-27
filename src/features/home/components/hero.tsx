import { HOME_HERO } from "@/data/home";
import { Button } from "@/shared/ui/button";
import { Container } from "@/shared/ui/container";
import { Heading } from "@/shared/ui/heading";
import { ImageFrame } from "@/shared/ui/image-frame";
import { Section } from "@/shared/ui/section";
import { Text } from "@/shared/ui/text";

export function Hero() {
  const { heading, lead, cta, image } = HOME_HERO;

  return (
    <Section spacing="none" className="relative overflow-hidden">
      <ImageFrame
        src={image.src}
        alt={image.alt}
        isPriority
        sizes="(min-width: 1024px) 52vw, 100vw"
        className="absolute inset-0 aspect-auto h-full w-full lg:left-auto lg:w-[52%]"
      />

      {/* Scrim carries the copy on mobile only, where text sits on the photo. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/50 to-ink/10 lg:hidden"
      />

      <Container className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col justify-end pt-16 pb-16 text-bone lg:grid lg:grid-cols-12 lg:items-center lg:py-24 lg:text-ink">
        <div className="lg:col-span-5">
          <Heading as="h1" size="display" className="text-balance">
            {heading}
          </Heading>
          <Text size="lead" className="mt-6 max-w-md lg:mt-8">
            {lead}
          </Text>
          <Button
            href={cta.href}
            className="mt-8 max-lg:bg-bone max-lg:text-ink max-lg:hover:bg-sand max-sm:w-full lg:mt-12"
          >
            {cta.label}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
